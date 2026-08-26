import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params;
    const isProd = process.env.NODE_ENV === 'production';

    const candidateDirs: string[] = [];

    if (process.env.UPLOAD_DIR) {
      candidateDirs.push(process.env.UPLOAD_DIR);
    }

    if (isProd) {
      candidateDirs.push('/home/u351811476/uploads');
      candidateDirs.push('/home/u351811476/domains/ivonnemarininmobiliaria.com/uploads');
      candidateDirs.push('/home/u351811476/domains/ivonnemarininmobiliaria.com/public_html/uploads');
    }

    // Always include project public/uploads as fallback
    candidateDirs.push(path.join(process.cwd(), "public", "uploads"));

    let resolvedPath: string | null = null;

    for (const dir of candidateDirs) {
      try {
        const safePath = path.normalize(path.join(dir, filename));
        if (fs.existsSync(safePath)) {
          resolvedPath = safePath;
          break;
        }
      } catch (e) {}
    }

    if (!resolvedPath) {
      return new NextResponse("File not found", { status: 404 });
    }

    const stat = fs.statSync(resolvedPath);
    const fileStream = fs.createReadStream(resolvedPath);
    
    // Basic mime type mapping
    const ext = path.extname(resolvedPath).toLowerCase();
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
