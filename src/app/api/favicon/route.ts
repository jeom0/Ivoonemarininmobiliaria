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

    // Return a manual 302 redirect with relative path so it works behind reverse proxies
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: finalUrl
      }
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
