import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ExportReportsButton from "./ExportReportsButton";

const prisma = new PrismaClient();

export default async function Page() {
  // ---- Real DB queries ----
  const [
    totalLeads,
    totalVisits,
    totalProperties,
    activeProperties,
    soldProperties,
    allLeads,
    allProperties,
  ] = await Promise.all([
    prisma.lead.count({ where: { type: "CONTACT" } }),
    prisma.lead.count({ where: { type: "VISIT" } }),
    prisma.property.count(),
    prisma.property.count({ where: { status: "DISPONIBLE" } }),
    prisma.property.count({ where: { status: "VENDIDO" } }),
    prisma.lead.findMany({ orderBy: { createdAt: "asc" }, select: { createdAt: true, type: true } }),
    prisma.property.findMany({
      orderBy: { price: "desc" },
      take: 5,
      select: { id: true, title: true, city: true, price: true, mainImage: true, status: true },
    }),
  ]);

  // ---- Monthly chart data (last 6 months) ----
  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const nextD = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const monthLeads = allLeads.filter((l) => {
      const ld = new Date(l.createdAt);
      return ld >= d && ld < nextD;
    }).length;
    return {
      label: d.toLocaleString("es-CO", { month: "short" }),
      leads: monthLeads,
    };
  });

  const maxLeads = Math.max(...monthlyData.map((m) => m.leads), 1);

  // ---- Status breakdown for donut chart ----
  const contactLeads = totalLeads;
  const visitLeads = totalVisits;
  const otherLeads = await prisma.lead.count({ where: { type: { notIn: ["CONTACT", "VISIT"] } } });
  
  const totalSum = contactLeads + visitLeads + otherLeads;
  const divisor = totalSum || 1; // prevent division by zero

  const donutSegments = [
    { label: "Contactos Web", count: contactLeads, color: "#5c1212", pct: Math.round((contactLeads / divisor) * 100) },
    { label: "Visitas", count: visitLeads, color: "#e5c09b", pct: Math.round((visitLeads / divisor) * 100) },
    { label: "Otros", count: otherLeads, color: "#7a5d3f", pct: Math.round((otherLeads / divisor) * 100) },
  ];

  const conicParts = donutSegments.reduce<{ start: number; parts: string[] }>(
    (acc, seg) => {
      const end = acc.start + seg.pct;
      acc.parts.push(`${seg.color} ${acc.start}% ${end}%`);
      acc.start = end;
      return acc;
    },
    { start: 0, parts: [] }
  );
  const conicGradient = `conic-gradient(${conicParts.parts.join(", ")})`;

  // Serialize properties for client
  const topProperties = allProperties.map((p) => ({
    ...p,
    formattedPrice: new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(p.price),
  }));

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Reportes Analíticos</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Resumen de rendimiento y métricas clave — datos en tiempo real.</p>
        </div>
        <ExportReportsButton 
          data={{
            activeProperties,
            soldProperties,
            totalProperties,
            contactLeads,
            visitLeads,
            totalLeads,
            allProperties
          }} 
        />
      </header>

      {/* KPI Grid - Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">person_add</span>
            </div>
            <span className="flex items-center text-sm font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>Activo
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">Leads Totales</h3>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{(totalLeads + totalVisits).toLocaleString("es-CO")}</p>
        </div>

        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">sell</span>
            </div>
            <span className="flex items-center text-sm font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>Total
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">Vendidos / Cerrados</h3>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{soldProperties}</p>
        </div>

        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">visibility</span>
            </div>
            <span className="flex items-center text-sm font-semibold text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm mr-1">remove</span>Histórico
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">Visitas Agendadas</h3>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{totalVisits}</p>
        </div>

        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">real_estate_agent</span>
            </div>
            <span className="flex items-center text-sm font-semibold text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm mr-1">remove</span>Disponibles
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">Inmuebles Activos</h3>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{activeProperties}</p>
        </div>
      </div>

      {/* Charts + Top Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Bar Chart: Monthly Leads */}
        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Leads por Mes (Últimos 6)</h2>
            <Link href="/admin/leads" className="text-primary font-label-md text-sm hover:underline flex items-center gap-1">
              Ver todos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="flex-1 flex items-end gap-4 border-b border-outline-variant relative h-64 pt-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-outline pr-2 w-8">
              <span>{maxLeads}</span>
              <span>{Math.round(maxLeads * 0.75)}</span>
              <span>{Math.round(maxLeads * 0.5)}</span>
              <span>{Math.round(maxLeads * 0.25)}</span>
              <span>0</span>
            </div>
            <div className="ml-10 flex flex-1 items-end justify-between h-full gap-2">
              {monthlyData.map((m) => {
                const heightPct = maxLeads > 0 ? Math.max(4, (m.leads / maxLeads) * 100) : 4;
                return (
                  <div key={m.label} className="flex flex-col items-center w-full group">
                    <div className="w-full flex items-end justify-center h-full">
                      <div
                        className="w-3/5 bg-primary-container rounded-t-sm group-hover:opacity-80 transition-all duration-500 relative"
                        style={{ height: `${heightPct}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {m.leads} leads
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-outline mt-2 font-label-md capitalize">{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              <span className="text-sm font-label-md text-on-surface-variant">Leads por mes</span>
            </div>
          </div>
        </div>

        {/* Donut: Lead types */}
        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm flex flex-col min-h-[400px]">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Tipo de Leads</h2>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div
              className="relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{ background: conicGradient }}
            >
              <div className="w-32 h-32 bg-[#eff6ed] rounded-full flex flex-col items-center justify-center absolute shadow-inner">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{totalSum}</span>
                <span className="text-xs text-on-surface-variant">Total</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {donutSegments.map((seg) => (
              <div key={seg.label} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }}></div>
                  <span className="text-sm font-body-md text-on-surface">{seg.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-on-surface-variant">{seg.count}</span>
                  <span className="text-sm font-bold">{seg.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Properties from DB */}
        <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Inmuebles en Portafolio</h2>
            <Link href="/admin/properties" className="text-primary font-label-md text-sm hover:underline flex items-center gap-1">
              Ver todos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          {topProperties.length === 0 ? (
            <div className="text-center py-10 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl block mb-2">home_work</span>
              No hay inmuebles en la base de datos.{" "}
              <Link href="/admin/properties/new" className="text-primary hover:underline">Crea uno aquí</Link>.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="pb-3 font-label-md text-outline font-semibold">Propiedad</th>
                    <th className="pb-3 font-label-md text-outline font-semibold hidden md:table-cell">Ubicación</th>
                    <th className="pb-3 font-label-md text-outline font-semibold">Precio</th>
                    <th className="pb-3 font-label-md text-outline font-semibold">Estado</th>
                    <th className="pb-3 font-label-md text-outline font-semibold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="font-body-md">
                  {topProperties.map((p, idx) => (
                    <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 min-w-[250px]">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                            alt={p.title}
                            src={p.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60"}
                          />
                          <div>
                            <p className="font-semibold text-on-surface">{p.title}</p>
                            <p className="text-xs text-on-surface-variant">{p.formattedPrice}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-on-surface-variant">{p.city}</td>
                      <td className="py-4 font-semibold text-on-surface">{p.formattedPrice}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${p.status === "DISPONIBLE" ? "bg-green-100 text-green-800" : "bg-primary-container text-on-primary-container"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/propiedades/${p.id}`}
                            className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-surface-variant"
                            title="Ver publicación"
                          >
                            <span className="material-symbols-outlined">visibility</span>
                          </Link>
                          <Link
                            href={`/admin/properties`}
                            className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-surface-variant"
                            title="Ver en admin"
                          >
                            <span className="material-symbols-outlined">analytics</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
