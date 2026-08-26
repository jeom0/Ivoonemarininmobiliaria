import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

function getUploadDirectories(): string[] {
  const isProd = process.env.NODE_ENV === 'production';
  const dirs: string[] = [];

  if (process.env.UPLOAD_DIR) {
    dirs.push(process.env.UPLOAD_DIR);
  }

  if (isProd) {
    // Persistent directory OUTSIDE public_html so git deployments NEVER delete files
    dirs.push('/home/u351811476/uploads');
    dirs.push('/home/u351811476/domains/ivonnemarininmobiliaria.com/public_html/uploads');
  } else {
    dirs.push(path.join(process.cwd(), "public", "uploads"));
  }

  // Ensure all directories exist
  dirs.forEach(dir => {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch (e) {
      console.error("Error creating directory:", dir, e);
    }
  });

  return dirs;
}

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

    const uploadDirs = getUploadDirectories();
    const primaryDir = uploadDirs[0];

    if (chunk && fileId && chunkIndex >= 0 && totalChunks > 0) {
      // Chunked upload logic
      const safeFileId = fileId.replace(/[^a-zA-Z0-9.-]/g, '');
      const filepath = path.join(primaryDir, safeFileId);
      
      try {
        const arrayBuffer = await chunk.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Append chunk to the primary file
        if (chunkIndex === 0) {
          await writeFile(filepath, buffer);
        } else {
          fs.appendFileSync(filepath, buffer);
        }

        // If this is the last chunk, rename & copy to secondary persistent directories
        if (chunkIndex === totalChunks - 1) {
          const finalFilename = `${safeFileId}-${originalFileName.replace(/[^a-zA-Z0-9.-]/g, '')}`;
          const finalFilepath = path.join(primaryDir, finalFilename);
          fs.renameSync(filepath, finalFilepath);

          // Copy to secondary directories for safety & persistence
          for (let i = 1; i < uploadDirs.length; i++) {
            try {
              const destPath = path.join(uploadDirs[i], finalFilename);
              fs.copyFileSync(finalFilepath, destPath);
            } catch (e) {
              console.error("Error copying file to secondary dir:", uploadDirs[i], e);
            }
          }
          
          return NextResponse.json({ success: true, url: `/api/uploads/${finalFilename}` });
        } else {
          return NextResponse.json({ success: true, partial: true });
        }
      } catch (e) {
        console.error("Chunk saving failed:", e);
        return NextResponse.json({ success: false, message: "Chunk processing error" }, { status: 500 });
      }
    } else if (file) {
      // Whole-file upload logic
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        for (const dir of uploadDirs) {
          try {
            const filepath = path.join(dir, filename);
            await writeFile(filepath, buffer);
          } catch (e) {
            console.error("Error writing to dir:", dir, e);
          }
        }
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
