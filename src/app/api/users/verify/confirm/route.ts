import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newEmail, code } = await request.json();
    if (!newEmail || !code) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.emailChanged) {
      return NextResponse.json({ error: 'No se permite cambiar el correo' }, { status: 400 });
    }

    if (user.verificationCode !== code) {
      return NextResponse.json({ error: 'Código incorrecto' }, { status: 400 });
    }

    if (user.verificationExpiry && new Date() > user.verificationExpiry) {
      return NextResponse.json({ error: 'El código ha expirado' }, { status: 400 });
    }

    // Update email and lock further changes
    await prisma.user.update({
      where: { id: userId },
      data: { 
        email: newEmail, 
        emailChanged: true, 
        verificationCode: null, 
        verificationExpiry: null 
      }
    });

    return NextResponse.json({ success: true, message: 'Correo actualizado correctamente' });
  } catch (error) {
    console.error('Error confirming code:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
