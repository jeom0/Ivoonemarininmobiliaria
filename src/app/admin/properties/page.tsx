import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary">Gestión de Inmuebles</h2>
        <Link 
          href="/admin/properties/new" 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-container transition-colors font-semibold"
        >
          <Plus size={18} /> Nuevo Inmueble
        </Link>
      </div>

      <div className="bg-surface rounded-2xl border border-surface-variant overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Título</th>
              <th className="px-6 py-4 font-semibold">Tipo</th>
              <th className="px-6 py-4 font-semibold">Precio</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {properties.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                  No hay inmuebles registrados.
                </td>
              </tr>
            )}
            {properties.map((prop) => (
              <tr key={prop.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-semibold text-primary">{prop.title}</td>
                <td className="px-6 py-4 text-on-surface">{prop.propertyType} - {prop.modality}</td>
                <td className="px-6 py-4 text-on-surface font-semibold">
                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: prop.currency }).format(prop.price)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    prop.status === 'DISPONIBLE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {prop.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/properties/${prop.id}/edit`} className="text-secondary hover:text-primary transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button className="text-error hover:text-error/80 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
