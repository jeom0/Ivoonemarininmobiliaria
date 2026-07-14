import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function PropiedadesPage({ searchParams }: { searchParams: { q?: string, type?: string } }) {
  const properties = await prisma.property.findMany({
    where: { 
      status: "DISPONIBLE",
      ...(searchParams?.type ? { propertyType: searchParams.type } : {})
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="min-h-screen flex flex-col bg-background pt-24">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass-header border-b border-outline-variant/20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-[80px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-container">Ivonne Marín</h1>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link className="text-primary font-bold transition-colors text-sm" href="/propiedades">Propiedades</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/nosotros">Nosotros</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/blog">Blog</Link>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/admin" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-10 w-full py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight">Catálogo de Inmuebles</h1>
          <p className="text-on-surface-variant text-lg">Encuentra la propiedad que estás buscando en las mejores zonas del Eje Cafetero.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30 sticky top-28 ambient-shadow">
              <h3 className="font-bold text-primary mb-6 text-lg border-b border-outline-variant/20 pb-4">Filtros Avanzados</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Tipo de Inmueble</label>
                  <select name="type" className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest">
                    <option value="">Todos</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Lote">Lote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Modalidad</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest">
                    <option value="">Ambas</option>
                    <option value="Venta">Venta</option>
                    <option value="Arriendo">Arriendo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Rango de Precio</label>
                  <input type="range" className="w-full accent-primary" />
                </div>
                <button className="w-full bg-primary-container text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors">
                  Aplicar Filtros
                </button>
              </form>
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.length === 0 ? (
                  <p className="text-on-surface-variant col-span-2 py-10">No se encontraron inmuebles con los criterios de búsqueda.</p>
                ) : (
                  properties.map(prop => (
                    <Link key={prop.id} href={`/propiedades/${prop.id}`}>
                      <div className="group h-full bg-surface border border-outline-variant/30 rounded-xl overflow-hidden ambient-shadow transition-transform hover:-translate-y-2 flex flex-col">
                        <div className="relative h-64 overflow-hidden bg-surface-variant">
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{prop.modality}</span>
                          </div>
                          {prop.mainImage ? (
                            <img src={prop.mainImage} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-on-surface-variant">Sin Imagen</div>
                          )}
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-on-surface line-clamp-2">{prop.title}</h3>
                          <p className="text-sm text-on-surface-variant mb-4">{prop.city} {prop.sector && `- ${prop.sector}`}</p>
                          <div className="mt-auto pt-4 border-t border-outline-variant/30">
                            <p className="font-bold text-primary text-xl">
                              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: prop.currency, maximumFractionDigits: 0 }).format(prop.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
             </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
           <h2 className="text-2xl font-bold mb-4">Ivonne Marín</h2>
           <p className="text-white/70 mb-8">Premium Real Estate - Eje Cafetero</p>
           <p className="text-xs text-white/50">© 2026 Ivonne Marín Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
