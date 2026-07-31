import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const property = await prisma.property.findUnique({
            where: { id }
        });
        
        if (!property) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }
        
        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.error("Error fetching property:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await params;
        await prisma.property.delete({
            where: { id }
        });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting property:", error);
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
        const property = await prisma.property.update({
            where: { id },
            data
        });
        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
