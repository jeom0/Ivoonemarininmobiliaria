import { createProperty } from "@/app/actions/property"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewPropertyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/properties" className="text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-2xl font-bold text-primary">Crear Inmueble</h2>
      </div>

      <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-sm">
        <form action={createProperty} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-on-surface">Título del Inmueble</label>
              <input 
                name="title"
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest" 
                placeholder="Ej. Apartamento de Lujo en Pinares"
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface">Tipo de Propiedad</label>
              <select name="propertyType" className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest">
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Lote">Lote</option>
                <option value="Finca">Finca</option>
                <option value="Local">Local</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface">Modalidad</label>
              <select name="modality" className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest">
                <option value="VENTA">Venta</option>
                <option value="ARRIENDO">Arriendo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface">Precio (COP)</label>
              <input 
                name="price"
                type="number" 
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest" 
                placeholder="Ej. 850000000"
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface">Ciudad</label>
              <input 
                name="city"
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest" 
                placeholder="Ej. Pereira"
                required 
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-on-surface">Descripción Corta</label>
              <textarea 
                name="shortDesc"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest" 
                placeholder="Breve descripción del inmueble"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-outline-variant/30">
            <Link 
              href="/admin/properties"
              className="px-6 py-3 border border-outline text-on-surface-variant font-semibold rounded-lg hover:bg-surface-container-high transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-container transition-colors shadow-md"
            >
              Guardar Inmueble
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
