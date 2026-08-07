import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import NotificationsDropdown from "./components/NotificationsDropdown";


const prisma = new PrismaClient();

export default async function Page() {
  const session = await getServerSession(authOptions);
  const propertiesCount = await prisma.property.count();
  const leadsCount = await prisma.lead.count({ where: { type: 'CONTACT' } });
  const visitsCount = await prisma.lead.count({ where: { type: 'VISIT', status: 'NEW' } });
  const soldCount = await prisma.property.count({ where: { status: 'VENDIDO' } });
  
  const latestLeads = await prisma.lead.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  
  const upcomingVisits = await prisma.lead.findMany({
    where: { type: 'VISIT' },
    take: 3,
    orderBy: { createdAt: 'asc' } // Assuming we want upcoming, ideally we filter by date >= now
  });

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
        <h2 className="font-display-lg text-display-lg text-primary tracking-tighter">Bienvenida, {session?.user?.name ? session.user.name.split(' ')[0] : 'Usuario'}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Aquí tienes el resumen de tu actividad para hoy.</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-section-gap">
        <Link href="/admin/properties/new" className="flex justify-center items-center gap-2 px-4 py-3 bg-primary text-on-primary rounded-full font-label-md text-label-md shadow-md hover:shadow-lg transition-all active:scale-95">
        <span className="material-symbols-outlined">add_home</span>
                        Crear Inmueble
                    </Link>
        <Link href="/admin/leads" className="flex justify-center items-center gap-2 px-4 py-3 bg-white border border-outline-variant text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95">
        <span className="material-symbols-outlined">person_add</span>
                        Registrar Lead
                    </Link>
        <Link href="/admin/agenda" className="flex justify-center items-center gap-2 px-4 py-3 bg-white border border-outline-variant text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95">
        <span className="material-symbols-outlined">event</span>
                        Agendar Visita
                    </Link>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter mb-section-gap">
        <Link href="/admin/properties" className="block bento-card p-6 rounded-xl relative overflow-hidden bg-white border border-outline-variant/30 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
        <span className="material-symbols-outlined">apartment</span>
        </div>
        </div>
        <p className="text-on-surface-variant font-label-md text-label-md">Total Inmuebles</p>
        <div className="flex items-end gap-2">
        <h3 className="text-2xl md:text-[32px] font-bold text-primary leading-none">{propertiesCount}</h3>
        </div>
        </Link>

        <Link href="/admin/leads" className="block bento-card p-6 rounded-xl relative overflow-hidden bg-white border border-outline-variant/30 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
        <span className="material-symbols-outlined">group</span>
        </div>
        </div>
        <p className="text-on-surface-variant font-label-md text-label-md">Leads del Mes</p>
        <div className="flex items-end gap-2">
        <h3 className="text-2xl md:text-[32px] font-bold text-primary leading-none">{leadsCount}</h3>
        </div>
        </Link>

        <Link href="/admin/agenda" className="block bento-card p-6 rounded-xl relative overflow-hidden bg-white border border-outline-variant/30 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
        <span className="material-symbols-outlined">pending_actions</span>
        </div>
        </div>
        <p className="text-on-surface-variant font-label-md text-label-md">Visitas Pendientes</p>
        <div className="flex items-end gap-2">
        <h3 className="text-2xl md:text-[32px] font-bold text-primary leading-none">{visitsCount}</h3>
        </div>
        </Link>

        <Link href="/admin/properties" className="block bento-card p-6 rounded-xl relative overflow-hidden bg-white border border-outline-variant/30 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
        <span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
        </div>
        </div>
        <p className="text-on-surface-variant font-label-md text-label-md">Inmuebles Vendidos</p>
        <div className="flex items-end gap-2">
        <h3 className="text-2xl md:text-[32px] font-bold text-primary leading-none">{soldCount}</h3>
        </div>
        </Link>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bento-card rounded-2xl p-4 md:p-8 overflow-hidden bg-white border border-outline-variant/30 shadow-sm">
        <div className="flex items-center justify-between mb-8">
        <h4 className="font-headline-md text-headline-md text-primary">Últimos Leads</h4>
        <Link href="/admin/leads" className="text-secondary font-label-md text-label-md hover:underline">Ver todos</Link>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
        <thead>
        <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-md text-[12px] uppercase tracking-wider">
        <th className="pb-4 font-semibold">Cliente</th>
        <th className="pb-4 font-semibold">Interés</th>
        <th className="pb-4 font-semibold">Estado</th>
        <th className="pb-4 font-semibold">Fecha</th>
        <th className="pb-4 font-semibold text-right">Acción</th>
        </tr>
        </thead>
        <tbody className="font-body-md text-body-md">
        {latestLeads.map(lead => (
        <tr key={lead.id} className="group hover:bg-surface-container-low transition-colors">
        <td className="py-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">{lead.name.substring(0,2).toUpperCase()}</div>
        <div>
        <p className="font-semibold text-primary">{lead.name}</p>
        <p className="text-xs text-on-surface-variant">{lead.phone || lead.email}</p>
        </div>
        </div>
        </td>
        <td className="py-4 border-b border-outline-variant/10 text-on-surface-variant">{lead.message ? lead.message.substring(0,30) + '...' : 'General'}</td>
        <td className="py-4 border-b border-outline-variant/10">
        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${lead.status === 'NEW' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{lead.status}</span>
        </td>
        <td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
        <td className="py-4 border-b border-outline-variant/10 text-right">
        <button className="text-primary hover:bg-primary-fixed p-1 rounded-full"><span className="material-symbols-outlined">chat</span></button>
        </td>
        </tr>
        ))}
        {latestLeads.length === 0 && (
            <tr>
              <td colSpan={5} className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl md:text-[32px] text-primary/40">person_add</span>
                  </div>
                  <p className="font-headline-md text-primary mb-1">Sin leads recientes</p>
                  <p className="text-sm text-on-surface-variant max-w-[200px]">Aún no has recibido mensajes o contactos. Cuando un cliente te escriba, aparecerá aquí.</p>
                </div>
              </td>
            </tr>
        )}
        </tbody>
        </table>
        </div>
        </div>

        <div className="bento-card rounded-2xl p-4 md:p-8 bg-surface-container-low border border-outline-variant/30 shadow-sm">
        <div className="flex items-center justify-between mb-8">
        <h4 className="font-headline-md text-headline-md text-primary">Próximas Visitas</h4>
        <span className="bg-primary-container text-on-primary-container text-[10px] font-bold py-1 px-2 rounded">{upcomingVisits.length} PENDIENTES</span>
        </div>
        <div className="space-y-6">
        {upcomingVisits.map((v, idx) => (
        <div key={v.id} className={`flex gap-4 p-4 rounded-xl shadow-sm ${idx === 0 ? 'bg-white border-l-4 border-primary' : 'bg-white/60 border-l-4 border-outline-variant'}`}>
        <div className={`flex-shrink-0 flex flex-col items-center justify-center bg-surface-container w-14 h-14 rounded-lg ${idx !== 0 ? 'opacity-60' : ''}`}>
        <span className="text-xs font-bold text-primary">{new Date(v.createdAt).toLocaleString('es-CO', { month: 'short' }).toUpperCase()}</span>
        <span className="text-lg font-bold text-primary">{new Date(v.createdAt).getDate()}</span>
        </div>
        <div className="flex-1">
        <p className="font-label-md text-label-md text-primary">{v.name}</p>
        <p className="text-xs text-on-surface-variant flex items-center gap-1 mb-2">
        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        {v.message ? v.message.substring(0, 20) : 'Consulta'}
                                    </p>
        <div className="flex items-center justify-between">
        <button className="text-xs text-primary font-bold hover:underline">Ver detalle</button>
        </div>
        </div>
        </div>
        ))}
        {upcomingVisits.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/50">
              <span className="material-symbols-outlined text-[40px] text-primary/30 mb-3">event_busy</span>
              <p className="font-label-md text-primary mb-1">Agenda libre</p>
              <p className="text-xs text-on-surface-variant max-w-[200px]">No tienes visitas programadas para los próximos días.</p>
            </div>
        )}
        <Link href="/admin/agenda" className="w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors flex justify-center mt-4">
                                + Agendar nueva visita
                            </Link>
        </div>
        </div>
      </div>
    </>
  );
}
