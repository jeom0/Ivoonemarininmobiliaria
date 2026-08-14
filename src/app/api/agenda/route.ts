import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Verify leadId and date exist
    if (!data.leadId || !data.date) {
      return NextResponse.json({ success: false, message: "Missing leadId or date" }, { status: 400 });
    }

    // @ts-ignore
    const appointment = await prisma.appointment.create({
      data: {
        leadId: data.leadId,
        propertyId: data.propertyId || null,
        date: new Date(data.date),
        coverImage: data.coverImage || null,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
