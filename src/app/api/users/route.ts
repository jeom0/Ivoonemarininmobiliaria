import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Get all users
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Create a new user
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, password, role, permissions } = await request.json();

    const activeUsers = await prisma.user.count({ where: { isActive: true } });
    if (activeUsers >= 3) {
      return NextResponse.json({ error: 'Por favor contactese con el desarrollador para desbloquear mas usuarios de la base de datos' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'AGENT',
        permissions: permissions ? JSON.stringify(permissions) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
      }
    });

    // Send welcome email (non-blocking)
    import('@/lib/mailer').then(({ sendMail }) => {
      sendMail(
        email,
        "Bienvenido a Ivonne Marin Inmobiliaria",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px 20px; border-radius: 12px; border: 1px solid #e0e0e0;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #1a1a1a; margin: 0; font-size: 24px;">Ivonne Marin Inmobiliaria</h2>
            <p style="color: #666; margin-top: 8px; font-size: 16px; font-weight: bold;">¡Bienvenido a la plataforma!</p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #eeeeee; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h3 style="color: #333; margin-top: 0;">¡Hola ${name}!</h3>
            <p style="color: #555; line-height: 1.6;">Tu cuenta como Asesor Inmobiliario ha sido creada exitosamente. A partir de ahora podrás ingresar al panel administrativo para gestionar inmuebles y prospectos.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #d1b06b;">
              <h4 style="margin-top: 0; color: #333; margin-bottom: 15px;">Tus credenciales de acceso:</h4>
              <p style="margin: 8px 0; color: #555;"><strong>Correo:</strong> <span style="color: #1a1a1a;">${email}</span></p>
              <p style="margin: 8px 0; color: #555;"><strong>Contraseña:</strong> <span style="background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-family: monospace; color: #1a1a1a;">${password}</span></p>
            </div>
            
            <p style="color: #777; font-size: 14px;"><em>Nota de seguridad: Por favor, no compartas estas credenciales con nadie y te recomendamos cambiarlas desde la configuración de tu perfil al ingresar.</em></p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXTAUTH_URL || 'https://ivonnemarininmobiliaria.com'}/admin/login" style="background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; display: inline-block;">Ingresar al Panel</a>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 13px;">
            <p style="margin: 5px 0;">Este correo fue generado automáticamente.</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Ivonne Marin Inmobiliaria.</p>
          </div>
        </div>
        `
      ).catch(console.error);
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// Update a user
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, email, password, role, permissions, isActive } = await request.json();

    const dataToUpdate: any = { name, email, role };
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }
    if (permissions !== undefined) {
      dataToUpdate.permissions = permissions ? JSON.stringify(permissions) : null;
    }
    if (isActive !== undefined) {
      // If we are re-enabling a user, check the limit
      if (isActive === true) {
        const activeUsers = await prisma.user.count({ where: { isActive: true, id: { not: id } } });
        if (activeUsers >= 3) {
           return NextResponse.json({ error: 'Por favor contactese con el desarrollador para desbloquear mas usuarios de la base de datos' }, { status: 400 });
        }
      }
      dataToUpdate.isActive = isActive;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// Delete a user
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (id === (session.user as any).id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    // Instead of deleting, we disable
    await prisma.user.update({
      where: { id },
      data: { isActive: false }
    });

    return NextResponse.json({ success: true, message: 'Usuario deshabilitado' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
