import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

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
        <h2>¡Hola ${name}!</h2>
        <p>Tu cuenta como Asesor Inmobiliario ha sido creada exitosamente.</p>
        <p><strong>Correo de acceso:</strong> ${email}</p>
        <p><strong>Contraseña:</strong> ${password}</p>
        <p>Por favor, no compartas estas credenciales con nadie.</p>
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
