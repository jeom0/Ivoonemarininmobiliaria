import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await params;
        await prisma.lead.delete({
            where: { id }
        });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting lead:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await params;
        const rawData = await req.json();

        const dataToUpdate: any = {};
        if (rawData.name !== undefined) dataToUpdate.name = String(rawData.name);
        if (rawData.email !== undefined) dataToUpdate.email = String(rawData.email);
        if (rawData.phone !== undefined) dataToUpdate.phone = rawData.phone ? String(rawData.phone) : null;
        if (rawData.message !== undefined) dataToUpdate.message = rawData.message ? String(rawData.message) : null;
        if (rawData.type !== undefined) dataToUpdate.type = String(rawData.type);
        if (rawData.status !== undefined) dataToUpdate.status = String(rawData.status);
        if (rawData.avatar !== undefined) dataToUpdate.avatar = rawData.avatar ? String(rawData.avatar) : null;
        if (rawData.propertyId !== undefined) dataToUpdate.propertyId = rawData.propertyId ? String(rawData.propertyId) : null;

        const lead = await prisma.lead.update({
            where: { id },
            data: dataToUpdate
        });
        return NextResponse.json(lead, { status: 200 });
    } catch (error: any) {
        console.error("Error updating lead:", error);
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}

