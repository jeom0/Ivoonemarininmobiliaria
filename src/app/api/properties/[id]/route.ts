import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

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
        const rawData = await req.json();

        // Separate non-updatable and auxiliary fields
        const {
            id: _id,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            appointments: _appointments,
            imagesFiles: _imagesFiles,
            videoFiles: _videoFiles,
            pdfFiles: _pdfFiles,
            ...data
        } = rawData;

        const dataToUpdate: any = {};

        // String fields
        if (data.title !== undefined) dataToUpdate.title = String(data.title);
        if (data.slug !== undefined) dataToUpdate.slug = String(data.slug);
        if (data.internalCode !== undefined) dataToUpdate.internalCode = data.internalCode ? String(data.internalCode) : null;
        if (data.shortDesc !== undefined) dataToUpdate.shortDesc = data.shortDesc ? String(data.shortDesc) : null;
        if (data.fullDesc !== undefined) dataToUpdate.fullDesc = data.fullDesc ? String(data.fullDesc) : null;
        if (data.modality !== undefined) dataToUpdate.modality = String(data.modality);
        if (data.propertyType !== undefined) dataToUpdate.propertyType = String(data.propertyType);
        if (data.status !== undefined) dataToUpdate.status = String(data.status);
        if (data.currency !== undefined) dataToUpdate.currency = String(data.currency);
        if (data.city !== undefined) dataToUpdate.city = String(data.city);
        if (data.sector !== undefined) dataToUpdate.sector = data.sector ? String(data.sector) : null;
        if (data.address !== undefined) dataToUpdate.address = data.address ? String(data.address) : null;
        if (data.mainImage !== undefined) dataToUpdate.mainImage = data.mainImage ? String(data.mainImage) : null;
        if (data.images !== undefined) dataToUpdate.images = data.images ? String(data.images) : null;
        if (data.videos !== undefined) dataToUpdate.videos = data.videos ? String(data.videos) : null;
        if (data.documents !== undefined) dataToUpdate.documents = data.documents ? String(data.documents) : null;
        if (data.virtualTour !== undefined) dataToUpdate.virtualTour = data.virtualTour ? String(data.virtualTour) : null;
        if (data.amenities !== undefined) dataToUpdate.amenities = data.amenities ? String(data.amenities) : null;
        if (data.features !== undefined) dataToUpdate.features = data.features ? String(data.features) : null;
        if (data.customFields !== undefined) dataToUpdate.customFields = data.customFields ? String(data.customFields) : null;
        if (data.seoTitle !== undefined) dataToUpdate.seoTitle = data.seoTitle ? String(data.seoTitle) : null;
        if (data.seoDesc !== undefined) dataToUpdate.seoDesc = data.seoDesc ? String(data.seoDesc) : null;

        // Numeric fields: parse or set null/0 cleanly
        if (data.price !== undefined) {
            const parsedPrice = parseFloat(data.price);
            dataToUpdate.price = isNaN(parsedPrice) ? 0 : parsedPrice;
        }

        const parseNullableFloat = (val: any) => {
            if (val === null || val === undefined || val === '') return null;
            const parsed = parseFloat(val);
            return isNaN(parsed) ? null : parsed;
        };

        const parseNullableInt = (val: any) => {
            if (val === null || val === undefined || val === '') return null;
            const parsed = parseInt(val, 10);
            return isNaN(parsed) ? null : parsed;
        };

        if (data.builtArea !== undefined) dataToUpdate.builtArea = parseNullableFloat(data.builtArea);
        if (data.lotArea !== undefined) dataToUpdate.lotArea = parseNullableFloat(data.lotArea);
        if (data.adminFee !== undefined) dataToUpdate.adminFee = parseNullableFloat(data.adminFee);
        if (data.lat !== undefined) dataToUpdate.lat = parseNullableFloat(data.lat);
        if (data.lng !== undefined) dataToUpdate.lng = parseNullableFloat(data.lng);

        if (data.bedrooms !== undefined) dataToUpdate.bedrooms = parseNullableInt(data.bedrooms);
        if (data.bathrooms !== undefined) dataToUpdate.bathrooms = parseNullableInt(data.bathrooms);
        if (data.parking !== undefined) dataToUpdate.parking = parseNullableInt(data.parking);
        if (data.stratum !== undefined) dataToUpdate.stratum = parseNullableInt(data.stratum);
        if (data.antiquity !== undefined) dataToUpdate.antiquity = parseNullableInt(data.antiquity);

        // Booleans
        if (data.isFeatured !== undefined) {
            dataToUpdate.isFeatured = data.isFeatured === true || data.isFeatured === 'true';
        }
        if (data.isInvestment !== undefined) {
            dataToUpdate.isInvestment = data.isInvestment === true || data.isInvestment === 'true';
        }

        const property = await prisma.property.update({
            where: { id },
            data: dataToUpdate
        });
        return NextResponse.json(property, { status: 200 });
    } catch (error: any) {
        console.error("Error updating property:", error);
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}

