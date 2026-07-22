import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const post = await prisma.blogPost.findUnique({
            where: { id }
        });
        
        if (!post) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }
        
        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching blog post:", error);
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
        
        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                summary: data.summary,
                content: data.content,
                mainImage: data.mainImage,
                author: data.author,
                category: data.category,
                tags: data.tags,
                status: data.status,
                seoTitle: data.seoTitle,
                seoDesc: data.seoDesc,
                publishedAt: data.status === "PUBLISHED" ? new Date() : null,
            }
        });
        
        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating blog post:", error);
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
        await prisma.blogPost.delete({
            where: { id }
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
