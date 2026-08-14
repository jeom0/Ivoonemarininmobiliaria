import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    
    // Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);

    // Save to public/uploads using Streams to prevent memory overload with large files
    try {
      const { Readable } = await import("stream");
      const { pipeline } = await import("stream/promises");
      
      const nodeStream = Readable.fromWeb(file.stream() as any);
      const writeStream = fs.createWriteStream(filepath);
      await pipeline(nodeStream, writeStream);
    } catch (e) {
      console.error("Stream saving failed:", e);
      return NextResponse.json({ success: false, message: "File processing error" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      url: `/api/uploads/${filename}` 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
