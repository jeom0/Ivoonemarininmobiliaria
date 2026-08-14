import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    let faviconUrl = null;
    const [admin, faviconSetting, logoSetting] = await Promise.all([
      prisma.user.findFirst({ where: { role: "ADMIN" } }),
      prisma.setting.findUnique({ where: { key: "faviconUrl" } }),
      prisma.setting.findUnique({ where: { key: "logoUrl" } })
    ]);
    
    if (faviconSetting?.value) {
      faviconUrl = faviconSetting.value;
    } else if (logoSetting?.value) {
      faviconUrl = logoSetting.value;
    } else if (admin?.image) {
      faviconUrl = admin.image;
    }

    if (!faviconUrl) {
      return new NextResponse(null, { status: 404 });
    }

    // Append cache buster so browser gets the latest image
    const finalUrl = `${faviconUrl}?v=${Date.now()}`;

    // Redirect to the actual image URL
    // If it's a relative URL (like /uploads/image.png), URL constructor needs a base URL
    const baseUrl = new URL(request.url).origin;
    return NextResponse.redirect(new URL(finalUrl, baseUrl));
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
