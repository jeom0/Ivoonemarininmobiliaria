import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params;
    
    // Safely resolve path to avoid directory traversal
    const isProd = process.env.NODE_ENV === 'production';
    const uploadDir = process.env.UPLOAD_DIR || (isProd 
      ? '/home/u351811476/domains/ivonnemarininmobiliaria.com/public_html/uploads' 
      : path.join(process.cwd(), "public", "uploads"));
    const safePath = path.normalize(path.join(uploadDir, filename));
    
    if (!safePath.startsWith(uploadDir)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!fs.existsSync(safePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const stat = fs.statSync(safePath);
    const fileStream = fs.createReadStream(safePath);
    
    // Basic mime type mapping
    const ext = path.extname(safePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.pdf': 'application/pdf',
      '.mp4': 'video/mp4',
    };
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    // @ts-ignore - readable stream types are a bit messy between node and web streams
    return new NextResponse(fileStream, {
      headers: {
        "Content-Type": mimeType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
