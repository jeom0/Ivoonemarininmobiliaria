import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
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
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/propiedades">Propiedades</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/nosotros">Nosotros</Link>
            <Link className="text-primary font-bold transition-colors text-sm" href="/blog">Blog</Link>
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
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight">Blog Inmobiliario</h1>
          <p className="text-on-surface-variant text-lg">Noticias, consejos de inversión y tendencias del mercado inmobiliario en el Eje Cafetero.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <p className="text-on-surface-variant col-span-3 text-center py-10">Aún no hay artículos publicados en el blog.</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="group bg-surface border border-outline-variant/30 rounded-xl overflow-hidden ambient-shadow transition-transform hover:-translate-y-2 flex flex-col">
                <div className="relative h-56 overflow-hidden bg-surface-variant">
                  {post.mainImage ? (
                    <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant">Sin Imagen</div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  {post.category && <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">{post.category}</span>}
                  <h3 className="text-xl font-bold mb-3 text-primary line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-3">{post.summary}</p>
                  
                  <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                     <span className="text-xs text-on-surface-variant font-semibold">{new Date(post.createdAt).toLocaleDateString()}</span>
                     <span className="text-primary font-bold text-sm group-hover:underline">Leer más &rarr;</span>
                  </div>
                </div>
              </div>
            ))
          )}
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
