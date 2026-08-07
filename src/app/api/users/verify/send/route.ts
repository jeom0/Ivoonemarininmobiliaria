import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { sendMail } from '@/lib/mailer';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newEmail } = await request.json();
    if (!newEmail) {
      return NextResponse.json({ error: 'Falta el nuevo correo' }, { status: 400 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.emailChanged) {
      return NextResponse.json({ error: 'No se permite cambiar el correo' }, { status: 400 });
    }

    // Check if email is already taken
    const existing = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existing) {
      return NextResponse.json({ error: 'El correo ya está en uso' }, { status: 400 });
    }

    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60000); // 15 mins

    await prisma.user.update({
      where: { id: userId },
      data: { verificationCode: code, verificationExpiry: expiry }
    });

    const emailSent = await sendMail(
      newEmail,
      "Código de Verificación - Cambio de Correo",
      `
      <h2>Cambio de Correo Electrónico</h2>
      <p>Has solicitado cambiar tu correo de acceso en la plataforma inmobiliaria.</p>
      <p>Tu código de verificación es: <strong>${code}</strong></p>
      <p>Este código expirará en 15 minutos.</p>
      `
    );

    if (!emailSent) {
      return NextResponse.json({ error: 'No se pudo enviar el correo de verificación. Revisa la configuración SMTP.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Código enviado' });
  } catch (error) {
    console.error('Error sending code:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
