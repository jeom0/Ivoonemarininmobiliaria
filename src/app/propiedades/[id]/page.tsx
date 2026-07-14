import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id }
  })

  if (!property) {
    notFound()
  }

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
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-10 w-full py-12">
        <div className="mb-6">
          <Link href="/propiedades" className="text-secondary hover:text-primary font-semibold text-sm">&larr; Volver al catálogo</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-primary mb-4">{property.title}</h1>
            <p className="text-on-surface-variant text-lg mb-8">{property.city} {property.sector && `- ${property.sector}`}</p>
            
            <div className="w-full h-[400px] md:h-[500px] bg-surface-variant rounded-2xl mb-8 overflow-hidden relative">
              {property.mainImage ? (
                <img src={property.mainImage} alt={property.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-xl">Sin Imagen</div>
              )}
            </div>

            <div className="prose prose-lg max-w-none text-on-surface">
              <h2 className="text-2xl font-bold text-primary mb-4">Descripción</h2>
              <p>{property.shortDesc}</p>
              {property.fullDesc && <p className="mt-4">{property.fullDesc}</p>}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-8 border border-outline-variant/30 sticky top-28 ambient-shadow">
              <div className="mb-6">
                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">{property.modality}</span>
                <h3 className="text-3xl font-bold text-primary">
                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between pb-4 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant font-semibold">Tipo</span>
                  <span className="text-on-surface font-bold">{property.propertyType}</span>
                </div>
                {property.bedrooms && (
                  <div className="flex justify-between pb-4 border-b border-outline-variant/20">
                    <span className="text-on-surface-variant font-semibold">Habitaciones</span>
                    <span className="text-on-surface font-bold">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex justify-between pb-4 border-b border-outline-variant/20">
                    <span className="text-on-surface-variant font-semibold">Baños</span>
                    <span className="text-on-surface font-bold">{property.bathrooms}</span>
                  </div>
                )}
                {property.builtArea && (
                  <div className="flex justify-between pb-4 border-b border-outline-variant/20">
                    <span className="text-on-surface-variant font-semibold">Área</span>
                    <span className="text-on-surface font-bold">{property.builtArea} m²</span>
                  </div>
                )}
              </div>

              <a 
                href={`https://wa.me/573000000000?text=Hola, estoy interesado en el inmueble: ${property.title}`}
                target="_blank"
                rel="noreferrer"
                className="w-full block text-center bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </aside>
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
