import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

const MONSTERS = ["one-eyed alien monster", "cyclops alien", "friendly one-eyed beast"];
const COLORS = ["purple", "blue", "pink", "green", "orange", "teal", "red"];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      // Si el usuario usa las credenciales de respaldo (fallback), lo creamos en la base de datos
      // para poder llevar el conteo de avatares.
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || "Usuario",
          password: "fallback-generated-password", // Se ignora por el authOptions de respaldo
          role: "ADMIN"
        }
      });
    }

    // Rate Limiting Logic: 2 per day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentCount = user.avatarGenerationsCount;
    const lastGeneration = user.lastAvatarGeneration;

    if (!lastGeneration || lastGeneration < today) {
      // It's a new day, reset count
      currentCount = 0;
    }

    if (currentCount >= 5) {
      return NextResponse.json({ success: false, message: "Has alcanzado el límite diario de 5 avatares generados por IA." }, { status: 429 });
    }

    // Generate prompt
    const randomMonster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // Pollinations AI URL (free, no API key required)
    const prompt = `A cute extremely high quality 3D Pixar style avatar of a friendly little ${randomColor} ${randomMonster} wearing a small golden crown and a little superhero cape, isolated on a pure solid white background, soft studio lighting, vibrant colors, minimalist, facing forward, symmetrical, centered, profile picture`;
    const encodedPrompt = encodeURIComponent(prompt);
    // Add random seed to avoid caching
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${seed}`;

    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to generate image from AI");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Save locally
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `avatar-ai-${uniqueSuffix}.png`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Update user quota
    await prisma.user.update({
      where: { id: user.id },
      data: {
        avatarGenerationsCount: currentCount + 1,
        lastAvatarGeneration: new Date()
      }
    });

    const finalUrl = `/api/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: finalUrl,
      remainingGenerations: 5 - (currentCount + 1)
    });

  } catch (error) {
    console.error("Error generating AI avatar:", error);
    return NextResponse.json({ success: false, message: "Error interno del servidor al generar avatar" }, { status: 500 });
  }
}
