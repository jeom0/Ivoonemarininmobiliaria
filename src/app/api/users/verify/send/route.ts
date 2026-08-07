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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px 20px; border-radius: 12px; border: 1px solid #e0e0e0;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #1a1a1a; margin: 0; font-size: 24px;">Ivonne Marin Inmobiliaria</h2>
          <p style="color: #666; margin-top: 8px; font-size: 16px; font-weight: bold;">Verificación de Seguridad</p>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #eeeeee; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">
          <h3 style="color: #333; margin-top: 0;">Cambio de Correo Electrónico</h3>
          <p style="color: #555; line-height: 1.6;">Has solicitado cambiar tu correo de acceso en la plataforma inmobiliaria. Para confirmar que eres tú, ingresa el siguiente código de seguridad:</p>
          
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px dashed #d1b06b;">
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1a1a1a;">
              ${code}
            </div>
          </div>
          
          <p style="color: #error; font-size: 14px;"><em>Este código expirará en 15 minutos. Si no solicitaste este cambio, puedes ignorar este correo.</em></p>
        </div>
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 13px;">
          <p style="margin: 5px 0;">Este correo fue generado automáticamente.</p>
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Ivonne Marin Inmobiliaria.</p>
        </div>
      </div>
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
