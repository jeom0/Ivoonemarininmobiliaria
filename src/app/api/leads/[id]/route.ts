import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

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
        const data = await req.json();
        const lead = await prisma.lead.update({
            where: { id },
            data
        });
        return NextResponse.json(lead, { status: 200 });
    } catch (error) {
        console.error("Error updating lead:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
