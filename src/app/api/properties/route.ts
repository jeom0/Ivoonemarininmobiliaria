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
        if (contentLength > 2 * 1024 * 1024) { // 2MB limit
            return NextResponse.json({ error: "Payload Too Large" }, { status: 413 });
        }
        
        const data = await req.json();
        
        // Basic validation
        if (!data.title || data.price === undefined || data.price === null || !data.city || !data.propertyType || !data.modality) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        
        // Generate a simple slug
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
        
        const property = await prisma.property.create({
            data: {
                title: data.title,
                slug,
                modality: data.modality,
                propertyType: data.propertyType,
                price: parseFloat(data.price),
                city: data.city,
                mainImage: data.mainImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDWtV7ZP8sh2RULYc0DZHTWAMtqfLUVPDWBDvcnXQgGlPwkQv_xtX27dlx4vi1fVW4BTKDE49b9T55PJzHSCZbD4BUXptzRHRBfpbV6FyUFH5OsBgMhpWrn5fRo_HI_iXkfGVHUEGQNWdTaWxvPRkoPT1CtbEjib7HDPbsUGRUKB8Gtor9X_ORRqViYMLS_jQq_nj753l8ht19iDy2XmNkp24ixLGJAAgeo56QvnqCiiZYpsgo5-AtOgI_cet2XYKmLgP5C31PDD3I",
                bedrooms: parseInt(data.bedrooms) || 0,
                bathrooms: parseInt(data.bathrooms) || 0,
                builtArea: parseFloat(data.builtArea) || 0,
                address: data.address || null,
                lat: data.lat ? parseFloat(data.lat) : null,
                lng: data.lng ? parseFloat(data.lng) : null,
                isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
                isInvestment: data.isInvestment === 'true' || data.isInvestment === true,
                status: "DISPONIBLE"
            }
        });
        
        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const properties = await prisma.property.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
