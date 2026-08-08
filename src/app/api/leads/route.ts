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
        
        const AVATARS = [
            '/avatars/avatar1.png',
            '/avatars/avatar2.png',
            '/avatars/avatar3.png',
            '/avatars/avatar4.png',
            '/avatars/avatar5.png',
        ];
        
        const avatar = data.avatar || AVATARS[Math.floor(Math.random() * AVATARS.length)];
        
        const lead = await prisma.lead.create({
            data: {
                type: data.type, // 'CONTACT' or 'VISIT'
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                message: data.message || null,
                propertyId: data.propertyId || null,
                avatar: avatar,
                status: "NEW"
            }
        });

        // Find Admin email and send notification
        prisma.user.findFirst({ where: { role: 'ADMIN' } })
            .then(adminUser => {
                if (adminUser?.email) {
                    const subject = data.type === 'VISIT' ? 'Nueva Solicitud de Visita' : 'Nuevo Contacto en la Web';
                    const html = `
                      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px 20px; border-radius: 12px; border: 1px solid #e0e0e0;">
                        <div style="text-align: center; margin-bottom: 25px;">
                          <h2 style="color: #1a1a1a; margin: 0; font-size: 24px;">Ivonne Marin Inmobiliaria</h2>
                          <p style="color: #666; margin-top: 8px; font-size: 16px; font-weight: bold;">${subject}</p>
                        </div>
                        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #eeeeee; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                          <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #d1b06b; padding-bottom: 10px; display: inline-block;">Detalles del Contacto</h3>
                          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; width: 120px;"><strong>Nombre:</strong></td>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #222; font-weight: bold;">${data.name}</td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>Email:</strong></td>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #222;"><a href="mailto:${data.email}" style="color: #d1b06b; text-decoration: none;">${data.email}</a></td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>Teléfono:</strong></td>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${data.phone || 'No especificado'}</td>
                            </tr>
                            ${data.propertyId ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>ID Inmueble:</strong></td>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${data.propertyId}</td>
                            </tr>` : ''}
                          </table>
                          <div style="margin-top: 25px;">
                            <strong style="color: #666; display: block; margin-bottom: 8px;">Mensaje del cliente:</strong>
                            <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; color: #444; font-style: italic; border-left: 4px solid #d1b06b; line-height: 1.5;">
                              ${data.message || 'Sin mensaje adicional'}
                            </div>
                          </div>
                        </div>
                        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 13px;">
                          <p style="margin: 5px 0;">Este correo fue generado automáticamente por la plataforma de <strong>Ivonne Marin Inmobiliaria</strong>.</p>
                          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Todos los derechos reservados.</p>
                        </div>
                      </div>
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
