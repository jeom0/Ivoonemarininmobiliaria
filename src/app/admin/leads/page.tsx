import { PrismaClient } from '@prisma/client';
import LeadsTable from "./LeadsTable";

const prisma = new PrismaClient();

export default async function Page() {
  const leads = await prisma.lead.findMany({ 
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      message: true,
      type: true,
      status: true,
      propertyId: true,
      avatar: true,
      createdAt: true
    }
  });

  // Serialize Date to ISO string for Client Component
  const serializedLeads = leads.map(l => ({
    ...l,
    createdAt: l.createdAt.toISOString()
  }));

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-outline-variant/20 gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestión de Leads</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Administra y haz seguimiento a tus prospectos inmobiliarios.</p>
        </div>
      </header>
      <LeadsTable initialLeads={serializedLeads} />
    </>
  );
}

