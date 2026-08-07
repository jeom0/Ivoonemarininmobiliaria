import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendMail } from '@/lib/mailer';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const contentLength = parseInt(req.headers.get("content-length") || "0");
        if (contentLength > 1 * 1024 * 1024) { // 1MB limit for leads
            return NextResponse.json({ error: "Payload Too Large" }, { status: 413 });
        }
        
        const data = await req.json();
        
        if (!data.name || !data.email || !data.type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        
        const lead = await prisma.lead.create({
            data: {
                type: data.type, // 'CONTACT' or 'VISIT'
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                message: data.message || null,
                propertyId: data.propertyId || null,
                status: "NEW"
            }
        });

        // Find Admin email and send notification
        prisma.user.findFirst({ where: { role: 'ADMIN' } })
            .then(adminUser => {
                if (adminUser?.email) {
                    const subject = data.type === 'VISIT' ? 'Nueva Solicitud de Visita' : 'Nuevo Contacto en la Web';
                    const html = `
                        <h2>${subject}</h2>
                        <p><strong>Nombre:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Teléfono:</strong> ${data.phone || 'No especificado'}</p>
                        ${data.propertyId ? `<p><strong>ID Inmueble:</strong> ${data.propertyId}</p>` : ''}
                        <p><strong>Mensaje:</strong><br/>${data.message || 'Sin mensaje'}</p>
                        <hr/>
                        <p><small>Este correo fue generado automáticamente por Ivonne Marin Inmobiliaria.</small></p>
                    `;
                    sendMail(adminUser.email, subject, html).catch(console.error);
                }
            })
            .catch(console.error);
        
        return NextResponse.json(lead, { status: 201 });
    } catch (error) {
        console.error("Error creating lead:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // Optional filter by type
    const status = searchParams.get("status"); // Optional filter by status
    
    try {
        const whereClause: any = {};
        if (type) whereClause.type = type;
        if (status) whereClause.status = status;

        const leads = await prisma.lead.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(leads);
    } catch (error) {
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
