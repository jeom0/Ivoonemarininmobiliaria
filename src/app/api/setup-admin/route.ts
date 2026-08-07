import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@ivonnemarin.com' },
      update: {
        password: hashedPassword,
      },
      create: {
        email: 'admin@ivonnemarin.com',
        name: 'Ivonne Marín',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return NextResponse.json({ success: true, message: "Administrador creado o actualizado con éxito", admin: admin.email });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
