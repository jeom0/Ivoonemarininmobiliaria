import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ avatars: [] });
    }

    const files = fs.readdirSync(uploadDir);
    // Sort files by modified time to show newest first
    const aiAvatars = files
      .filter(file => file.startsWith('avatar-ai-') && file.endsWith('.png'))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(uploadDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time)
      .map(f => `/uploads/${f.name}`);

    return NextResponse.json({ avatars: aiAvatars });
  } catch (error) {
    console.error("Error reading avatars:", error);
    return NextResponse.json({ avatars: [] });
  }
}
