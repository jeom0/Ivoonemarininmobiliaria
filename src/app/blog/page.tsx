import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Page() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <PublicNavbar />
      <main className="w-full flex-grow">
        <section className="w-full bg-surface pt-section-gap pb-12 px-margin-mobile md:px-margin-desktop text-center">
          <div className="max-w-container-max mx-auto max-w-3xl">
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Blog Inmobiliario</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Consejos expertos, análisis de mercado y guías prácticas para la compra, venta e inversión de propiedades exclusivas en el Eje Cafetero.</p>
          </div>
        </section>

        <section className="w-full px-margin-mobile md:px-margin-desktop pb-section-gap mt-12">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {posts.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-on-surface-variant font-body-md">
                Próximamente publicaremos nuevos artículos. Vuelve a visitarnos.
              </div>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="bg-surface-lowest rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-[0_4px_16px_rgba(92,18,18,0.08)] transition-all duration-300 group flex flex-col h-full bg-[#eff6ed]">
                  <div className="relative w-full h-64 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} src={post.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}/>
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-surface-container/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-[12px] text-primary">{post.category}</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="font-label-md text-[12px] text-on-surface-variant mb-2">
                      {new Date(post.createdAt).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">{post.summary || post.content.substring(0, 150) + "..."}</p>
                    <div className="mt-auto">
                      <Link className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-surface-tint transition-colors" href={`/blog/${post.slug}`}>
                        Leer más <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
    