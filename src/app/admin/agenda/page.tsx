import { PrismaClient } from '@prisma/client';
import AgendaCalendar from './AgendaCalendar';

const prisma = new PrismaClient();

export default async function Page() {
  let appointments: any[] = [];
  let leads: any[] = [];
  let properties: any[] = [];

  try {
    // We wrap this in try-catch in case the user hasn't run prisma db push yet
    // @ts-ignore
    appointments = await prisma.appointment.findMany({
      orderBy: { date: 'asc' },
      include: {
        lead: true,
        property: {
          select: { title: true, mainImage: true }
        }
      }
    });
  } catch (error) {
    console.warn("Appointment model not found. Please run npx prisma db push.");
  }

  try {
    leads = await prisma.lead.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, email: true, phone: true, avatar: true }
    });
    properties = await prisma.property.findMany({
      where: { status: 'DISPONIBLE' },
      select: { id: true, title: true, price: true, currency: true, mainImage: true }
    });
  } catch (error) {
    console.error(error);
  }

  const serializedAppointments = appointments.map((a: any) => ({
    ...a,
    date: a.date.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  return (
    <AgendaCalendar 
      initialAppointments={serializedAppointments} 
      leads={leads}
      properties={properties}
    />
  );
}
