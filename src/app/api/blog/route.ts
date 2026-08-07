import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const contentLength = parseInt(req.headers.get("content-length") || "0");
        if (contentLength > 10 * 1024 * 1024) { // 10MB limit
            return NextResponse.json({ error: "El contenido es demasiado grande (máximo 10MB)" }, { status: 413 });
        }
        
        const data = await req.json();
        
        if (!data.title || !data.content || !data.slug) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        
        const blogPost = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                summary: data.summary || null,
                content: data.content,
                mainImage: data.mainImage || null,
                author: data.author || null,
                category: data.category || null,
                tags: data.tags || null,
                status: data.status || "DRAFT",
                seoTitle: data.seoTitle || null,
                seoDesc: data.seoDesc || null,
                publishedAt: data.status === "PUBLISHED" ? new Date() : null,
            }
        });
        
        return NextResponse.json(blogPost, { status: 201 });
    } catch (error: any) {
        console.error("Error creating blog post:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "El enlace (slug) ya existe. Por favor cambie el título o el slug manualmente." }, { status: 400 });
        }
        return NextResponse.json({ error: "Error en el servidor al crear el artículo" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
