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
    const chunk: File | null = data.get("chunk") as unknown as File;
    const file: File | null = data.get("file") as unknown as File;
    const chunkIndex = parseInt(data.get("chunkIndex") as string || "-1");
    const totalChunks = parseInt(data.get("totalChunks") as string || "-1");
    const fileId = data.get("fileId") as string;
    const originalFileName = data.get("fileName") as string || (file ? file.name : "unknown");

    if (!file && !chunk) {
      return NextResponse.json({ success: false, message: "No file or chunk uploaded" }, { status: 400 });
    }

    const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (chunk && fileId && chunkIndex >= 0 && totalChunks > 0) {
      // Chunked upload logic
      const safeFileId = fileId.replace(/[^a-zA-Z0-9.-]/g, '');
      const filepath = path.join(uploadDir, safeFileId);
      
      try {
        const arrayBuffer = await chunk.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Append chunk to the file
        if (chunkIndex === 0) {
          // If first chunk, create/overwrite file
          await writeFile(filepath, buffer);
        } else {
          // Append to existing file
          fs.appendFileSync(filepath, buffer);
        }

        // If this is the last chunk, return success URL
        if (chunkIndex === totalChunks - 1) {
          // Rename the file to include the original extension if needed
          const finalFilename = `${safeFileId}-${originalFileName.replace(/[^a-zA-Z0-9.-]/g, '')}`;
          const finalFilepath = path.join(uploadDir, finalFilename);
          fs.renameSync(filepath, finalFilepath);
          
          return NextResponse.json({ success: true, url: `/api/uploads/${finalFilename}` });
        } else {
          return NextResponse.json({ success: true, partial: true });
        }
      } catch (e) {
        console.error("Chunk saving failed:", e);
        return NextResponse.json({ success: false, message: "Chunk processing error" }, { status: 500 });
      }
    } else if (file) {
      // Legacy whole-file upload logic
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filepath = path.join(uploadDir, filename);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await writeFile(filepath, buffer);
      } catch (e) {
        console.error("File saving failed:", e);
        return NextResponse.json({ success: false, message: "File processing error" }, { status: 500 });
      }

      return NextResponse.json({ success: true, url: `/api/uploads/${filename}` });
    }
    
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
