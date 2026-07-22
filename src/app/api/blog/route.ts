import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const contentLength = parseInt(req.headers.get("content-length") || "0");
        if (contentLength > 2 * 1024 * 1024) { // 2MB limit
            return NextResponse.json({ error: "Payload Too Large" }, { status: 413 });
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
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
