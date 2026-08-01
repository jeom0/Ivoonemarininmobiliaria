import { PrismaClient } from '@prisma/client';
import AgendaCalendar from './AgendaCalendar';

const prisma = new PrismaClient();

export default async function Page() {
  const visits = await prisma.lead.findMany({ 
    where: { type: 'VISIT' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      message: true,
      status: true,
      createdAt: true
    }
  });

  // Convert Date objects to ISO strings for Client Component serialization
  const serializedVisits = visits.map(v => ({
    ...v,
    createdAt: v.createdAt.toISOString()
  }));

  return (
    <AgendaCalendar initialVisits={serializedVisits} />
  );
}

export const dynamic = 'force-dynamic';
