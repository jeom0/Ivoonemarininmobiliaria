import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Home() {
  const properties = await prisma.property.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    where: { status: "DISPONIBLE" }
  })

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 glass-header border-b border-white/20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-[80px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-container">Ivonne Marín</h1>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/propiedades">Propiedades</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/nosotros">Nosotros</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/blog">Blog</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[870px] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-[#e8c39e]/20">
           {/* Fallback pattern bg if image missing */}
           <div className="absolute inset-0 pattern-bg pointer-events-none"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 h-full flex flex-col justify-center items-start text-primary">
          <h1 className="text-5xl md:text-6xl font-bold max-w-3xl mb-6 tracking-tight">
            Encuentra el inmueble ideal con una asesoría cercana, segura y profesional.
          </h1>
          <p className="text-lg max-w-2xl mb-10 text-on-surface-variant">
            Te acompañamos en la compra, venta y arriendo de inmuebles en Pereira, Dosquebradas, Santa Rosa de Cabal y el Eje Cafetero.
          </p>

          {/* Search Widget */}
          <div className="w-full max-w-5xl bg-surface/95 backdrop-blur-xl rounded-xl p-6 md:p-8 ambient-shadow border border-secondary/30">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Operación</label>
                <select className="w-full border border-outline-variant rounded-lg py-2 px-3 bg-surface focus-ring">
                  <option>Venta</option>
                  <option>Arriendo</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Tipo</label>
                <select className="w-full border border-outline-variant rounded-lg py-2 px-3 bg-surface focus-ring">
                  <option>Apartamento</option>
                  <option>Casa</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Ciudad</label>
                <select className="w-full border border-outline-variant rounded-lg py-2 px-3 bg-surface focus-ring">
                  <option>Pereira</option>
                  <option>Dosquebradas</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-on-surface-variant">Precio Máximo</label>
                <input type="number" placeholder="$0" className="w-full border border-outline-variant rounded-lg py-2 px-3 bg-surface focus-ring" />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-primary text-white h-[42px] rounded-lg font-semibold hover:opacity-90 shadow-md">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-[80px] max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-secondary text-sm font-bold tracking-widest block mb-2">OPORTUNIDADES EXCLUSIVAS</span>
            <h2 className="text-3xl font-bold text-primary">Propiedades Destacadas</h2>
          </div>
          <Link href="/propiedades" className="text-primary font-bold hover:underline">Ver todas</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="text-on-surface-variant">No hay propiedades destacadas disponibles en este momento.</p>
          ) : (
            properties.map(prop => (
              <div key={prop.id} className="group bg-surface border border-outline-variant/30 rounded-xl overflow-hidden ambient-shadow transition-transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden bg-surface-variant">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{prop.modality}</span>
                  </div>
                  {/* Image placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                     [Imagen Inmueble]
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-on-surface">{prop.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-4">{prop.city}</p>
                  <div className="flex justify-between items-center py-4 border-t border-outline-variant/30">
                    <p className="font-bold text-primary text-lg">
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: prop.currency }).format(prop.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      
      {/* Footer minimalista */}
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
