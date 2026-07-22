import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import PropertiesTable from "./PropertiesTable";

const prisma = new PrismaClient();

export default async function Page() {
  // Fetch all properties to pass them to the client component
  const properties = await prisma.property.findMany({ 
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      city: true,
      propertyType: true,
      modality: true,
      price: true,
      status: true,
      mainImage: true,
      isFeatured: true
    }
  });

  const totalVisits = await prisma.lead.count({ where: { type: 'VISIT' } });
  
  return (
    <>
      <header className="flex items-center justify-between mb-8 border-b border-outline-variant/20 pb-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Administración de Inmuebles</h1>
          <p className="text-[14px] text-on-surface-variant">Gestiona tu catálogo de propiedades exclusivas</p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/admin/properties/new" className="py-2 px-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Crear Inmueble
            </Link>
        </div>
      </header>
      
      {/* Client Component that handles search, filters, bulk actions, and pagination */}
      <PropertiesTable initialProperties={properties} totalVisits={totalVisits} />
    </>
  );
}
