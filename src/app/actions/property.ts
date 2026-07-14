"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProperty(formData: FormData) {
  const title = formData.get("title") as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  const propertyType = formData.get("propertyType") as string
  const modality = formData.get("modality") as string
  const price = parseFloat(formData.get("price") as string)
  const city = formData.get("city") as string
  const status = formData.get("status") as string || "DISPONIBLE"
  const shortDesc = formData.get("shortDesc") as string || ""

  const newProperty = await prisma.property.create({
    data: {
      title,
      slug,
      propertyType,
      modality,
      price,
      city,
      status,
      shortDesc,
      currency: "COP",
      isFeatured: false,
      isInvestment: false
    }
  })

  revalidatePath("/admin/properties")
  revalidatePath("/")
  redirect("/admin/properties")
}

export async function deleteProperty(id: string) {
  await prisma.property.delete({ where: { id } })
  revalidatePath("/admin/properties")
  revalidatePath("/")
}
