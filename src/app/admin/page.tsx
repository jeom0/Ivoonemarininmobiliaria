import { prisma } from "@/lib/prisma"
import { Home, Users, Calendar, CheckCircle } from "lucide-react"

export default async function AdminDashboard() {
  const [totalProperties, totalLeads, activeProperties, recentLeads] = await Promise.all([
    prisma.property.count(),
    prisma.lead.count(),
    prisma.property.count({ where: { status: "DISPONIBLE" } }),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } })
  ])

  return (
    <div>
      {/* Quick Actions */}
      <section className="flex flex-wrap gap-4 mb-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all active:scale-95">
          <Home size={18} /> Crear Inmueble
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-outline-variant text-primary rounded-full font-semibold hover:bg-surface-container-low transition-all active:scale-95">
          <Users size={18} /> Registrar Lead
        </button>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-surface-variant relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Home size={20} />
            </div>
          </div>
          <p className="text-on-surface-variant font-semibold text-sm mb-1">Total Inmuebles</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-primary leading-none">{totalProperties}</h3>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-surface-variant relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <p className="text-on-surface-variant font-semibold text-sm mb-1">Total Leads</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-primary leading-none">{totalLeads}</h3>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-surface-variant relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
          </div>
          <p className="text-on-surface-variant font-semibold text-sm mb-1">Inmuebles Activos</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-primary leading-none">{activeProperties}</h3>
          </div>
        </div>
      </section>

      {/* Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-surface-variant shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-xl text-primary">Últimos Leads</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Cliente</th>
                  <th className="pb-3 font-semibold">Tipo</th>
                  <th className="pb-3 font-semibold">Estado</th>
                  <th className="pb-3 font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-on-surface-variant">
                      No hay leads recientes
                    </td>
                  </tr>
                )}
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{lead.name}</span>
                        <span className="text-xs text-on-surface-variant">{lead.phone || lead.email}</span>
                      </div>
                    </td>
                    <td className="py-4 text-on-surface">{lead.type}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 text-on-surface-variant">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
