import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import HeroCarousel from "@/components/HeroCarousel";
import PropertyCard from "@/components/PropertyCard";
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function Page() {
  // Regla de 2 semanas (14 días) para Novedades
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const [novedadesProperties, featuredProperties, investmentProperties, blogPosts, settingsDb] = await Promise.all([
    prisma.property.findMany({ 
      where: { createdAt: { gte: twoWeeksAgo } }, 
      orderBy: { createdAt: 'desc' }, 
      take: 6 
    }),
    prisma.property.findMany({ 
      where: { isFeatured: true }, 
      orderBy: { createdAt: 'desc' }, 
      take: 6 
    }),
    prisma.property.findMany({ 
      where: { isInvestment: true }, 
      orderBy: { createdAt: 'desc' }, 
      take: 6 
    }),
    prisma.blogPost.findMany({ 
      where: { status: 'PUBLISHED' }, 
      orderBy: { publishedAt: 'desc' }, 
      take: 3 
    }),
    prisma.setting.findMany()
  ]);

  const settings = settingsDb.reduce((acc: any, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
  
  const heroImageUrl = settings.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100";
  const whatsappNumber = settings.whatsapp || "+573000000000";
  const firstWhatsapp = whatsappNumber.split(/[\/\-\,]/)[0].trim();
  const cleanWhatsapp = firstWhatsapp.replace(/[^0-9]/g, '');

  const defaultZones = [
    { name: "Santa Rosa de Cabal", subtitle: "Sede Principal", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Pereira", subtitle: "El corazón del Eje", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_L0yirY1K-zQ9Rz61Iw9XrgwEOFOYHsz9Mi4C2GL8iMlUk_7DKzJxq4WEuwF45iYPUrfjyGzV8aLQsVJuWb_VMhpzMDmO8P0SfgipYahQLy4sLsU97cD7jfgBeWpcKARpB95kDvRsW9_v97y1rbCzwKWHhgkcO6FakcTLb9mY3Nr_iUCMoTKBiHBSYxYEs2nU-woY8NESiX3BQMkIZFFnrttSqrnC0JfiIv4lv13mNQ_2rKUpzMdDXCkEFQ0d919ch-mo-zIBq4I" },
    { name: "Cerritos", subtitle: "Exclusividad y naturaleza", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPz50Z_yrUQy_PEMzeJA2eT4nypHRgxNRk-0T-vFLVb39xuLpnMfHTonvsMRjqB2THZvSxRAYxEWhvByzcg4WohUG3N0sGrC4dAm8-aj_ibb7u7gFrvOb1B1nAhp9RHG4vLpGCxTM4iFxI-XyRYNg9LyIPlO8Co1yST8yYfQi7Sr1Tnp1I5L8fNFHNx_OwLUKV0BvtrWKviQub-4PpeJrGDMDuFUe7hLI_fG0XEK1SQ31arPzqVCh7zmsWKeNDLR6e4pYkztEeg4" },
    { name: "Dosquebradas", subtitle: "Crecimiento residencial", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKqj1ingSzkGRB-XKNQQfj48LN2rQQAusPghCy0vMX7bylVfR_CLzlPDAcSAm5ekKFLOS9a1T9MgiaYA-vyO0Uygl7WtoqIhPii4oAbcLWt6hBElIFrykUxjD_191VB5HZ7jvZs1YxTAEoFMkKWJcPXBI6NIVmpRlqBERrRCAOCtQ-bOSwsSCQd99FGv0np91wa-6mOMi85DH2tV3wVOUI7qzOa2R1oy8C5tb2_OYZWMZQnIK9hwDsY0G-kXXDOA4DqFfn7SNcq7U" }
  ];
  let homeZones = defaultZones;
  if (settings.home_zones) {
    try {
      homeZones = JSON.parse(settings.home_zones);
    } catch(e){}
  }

  let heroMedia: string[] = [];
  if (settings.hero_media) {
    try {
      heroMedia = JSON.parse(settings.hero_media);
    } catch(e) {}
  }
  if (heroMedia.length === 0 && settings.heroImage) {
    heroMedia = [settings.heroImage];
  }
  
  const defaultOrder = ['hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'];
  let sectionsOrder = defaultOrder;
  if (settings.home_sections_order) {
    try {
      const parsed = JSON.parse(settings.home_sections_order);
      sectionsOrder = parsed.map((s: any) => s.id);
    } catch(e){}
  }

  const sectionsMap: Record<string, React.ReactNode> = {
    hero: (
      <HeroCarousel 
        media={heroMedia} 
        title={settings.home_hero_title} 
        subtitle={settings.home_hero_subtitle} 
        featuredProperties={featuredProperties}
      />
    ),
    featured: (
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-2 font-bold uppercase">OPORTUNIDADES EXCLUSIVAS</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Propiedades Destacadas</h2>
          </div>
          <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/propiedades?featured=true">
            Ver todas <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {featuredProperties.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-on-surface-variant">
              No hay propiedades destacadas en este momento.
            </div>
          ) : (
            featuredProperties.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))
          )}
        </div>
      </section>
    ),
    about: (
      <section className="py-section-gap bg-surface-container-low/50 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 group">
            <img 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              src={settings.agent_image || "/perfil.jpg"} 
              alt="Ivonne Marin Asesora" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent flex items-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-headline-md text-headline-md tracking-tight">Ivonne Marin</h3>
                <span className="text-secondary font-body-md block mt-1">Asesora Inmobiliaria Experta</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-secondary font-label-md text-label-md tracking-widest block uppercase">Conócenos</span>
            <h2 className="text-3xl md:text-5xl text-primary leading-tight font-bold">{settings.home_about_title || '"Donde los sueños encuentran su lugar."'}</h2>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-medium">
              {settings.home_about_text || "Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso."}
            </p>
            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                </div>
                <span className="font-body-md text-on-surface font-semibold">Conectamos personas con oportunidades</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <span className="font-body-md text-on-surface font-semibold">Invertir con confianza comienza aquí</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/nosotros" className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all shadow-md inline-flex items-center gap-2">
                Conocer más sobre nosotros
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    ),
    novedades: (
      <section className="py-section-gap bg-surface-container-low/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-secondary font-label-md text-label-md tracking-widest block mb-2 font-bold uppercase">NOVEDADES (Últimas 2 Semanas)</span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Nuevos Inmuebles</h2>
            </div>
            <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/propiedades?status=NUEVO">
              Ver catálogo completo <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {novedadesProperties.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-on-surface-variant">
                No hay nuevos inmuebles agregados en las últimas 2 semanas.
              </div>
            ) : (
              novedadesProperties.map(p => (
                <PropertyCard key={p.id} p={p} />
              ))
            )}
          </div>
        </div>
      </section>
    ),
    investment: (
      /* Reducimos el espacio superior (pt-4 pb-12) para quitar la brecha excesiva */
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-2 font-bold uppercase">ALTA RENTABILIDAD</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Oportunidades de Inversión</h2>
          </div>
          <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/propiedades?investment=true">
            Ver todas <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {investmentProperties.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-on-surface-variant">
              No hay propiedades de inversión destacadas en este momento.
            </div>
          ) : (
            investmentProperties.map((p) => (
              <PropertyCard key={p.id} p={p} isInvestment={true} />
            ))
          )}
        </div>
      </section>
    ),
    blog: (
      <section className="py-section-gap bg-surface-container-low/30 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-secondary font-label-md text-label-md uppercase tracking-widest block mb-2 font-bold">Blog Inmobiliario</span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Artículos y Consejos</h2>
            </div>
            <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/blog">
              Ver todos los artículos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {blogPosts.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-on-surface-variant">
                Próximamente más artículos en nuestro blog.
              </div>
            ) : (
              blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-outline-variant/30">
                  <div className="relative h-48 overflow-hidden bg-surface-container">
                    {post.mainImage ? (
                      <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant/40">
                        <span className="material-symbols-outlined text-4xl">article</span>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category || 'General'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs text-on-surface-variant mb-2">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h3 className="font-headline-md text-lg text-primary font-bold group-hover:text-secondary transition-colors line-clamp-2 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 font-normal flex-grow">
                      {post.summary || post.seoDesc || 'Leer más sobre este artículo.'}
                    </p>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto">
                      Leer artículo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    ),
    valor: (
      <section className="py-section-gap bg-surface-container-low/50 border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest block uppercase mb-2">Por qué elegirnos</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Nuestra Propuesta de Valor</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="font-headline-md text-xl text-primary font-bold">Asesoría Transparente</h3>
              <p className="text-on-surface-variant font-body-md">Acompañamiento honesto y claro en cada etapa del proceso de compra, venta o arriendo.</p>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">location_city</span>
              </div>
              <h3 className="font-headline-md text-xl text-primary font-bold">Conocimiento Local</h3>
              <p className="text-on-surface-variant font-body-md">Dominio experto del mercado en Santa Rosa de Cabal, Pereira y todo el Eje Cafetero.</p>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <h3 className="font-headline-md text-xl text-primary font-bold">Propiedades Exclusivas</h3>
              <p className="text-on-surface-variant font-body-md">Portafolio seleccionado con los mejores inmuebles residenciales e inversiones de la región.</p>
            </div>
          </div>
        </div>
      </section>
    ),
    servicios: (
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-label-md text-label-md tracking-widest block uppercase mb-2">Servicios Integrales</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Te acompañamos en todo el camino</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">real_estate_agent</span>
            <h3 className="font-headline-md text-xl text-primary font-bold mb-3">Ventas Inmobiliarias</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Promocionamos tu propiedad con las mejores estrategias digitales y de fotografía profesional para lograr el mejor precio de mercado.</p>
            <Link href="/vender" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              Vender mi propiedad <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">key</span>
            <h3 className="font-headline-md text-xl text-primary font-bold mb-3">Gestión de Arriendos</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Administramos tus inmuebles en renta con garantía de pago puntual, estudio riguroso de arrendatarios y cuidado del patrimonio.</p>
            <Link href="/arrendar" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              Arrendar mi inmueble <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">trending_up</span>
            <h3 className="font-headline-md text-xl text-primary font-bold mb-3">Asesoría de Inversión</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Te orientamos en la búsqueda de lotes, proyectos y propiedades con alta plusvalía y flujo de caja óptimo en el Eje Cafetero.</p>
            <Link href="/contacto" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              Contactar asesora <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    ),
    zonas: (
      <section className="py-section-gap bg-surface-container-low/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest block uppercase mb-2">Zonas de Cobertura</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Explora por Ubicación</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeZones.map((zone, idx) => (
              <Link key={idx} href={`/propiedades?city=${encodeURIComponent(zone.name)}`} className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <img src={zone.image} alt={zone.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-headline-md text-xl font-bold">{zone.name}</h3>
                  <p className="text-white/80 text-xs font-label-md">{zone.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    ),
    cta: (
      <section className="py-section-gap bg-primary text-on-primary relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-6">
          <h2 className="font-headline-lg text-3xl md:text-5xl font-bold tracking-tight">¿Listo para dar el siguiente paso?</h2>
          <p className="text-on-primary/80 font-body-lg text-base md:text-xl max-w-2xl mx-auto">
            Cuéntanos qué necesitas y te ayudaremos a encontrar el inmueble o comprador ideal de manera rápida y segura.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a 
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hola Ivonne, deseo recibir asesoría sobre inmuebles.')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-label-md font-bold hover:bg-secondary/90 transition-all shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
              Contactar por WhatsApp
            </a>
            <Link href="/propiedades" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-label-md font-bold transition-all border border-white/20">
              Ver todo el catálogo
            </Link>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <PublicNavbar />
      <main className="w-full flex-grow">
        {sectionsOrder.map((sectionId) => (
          <div key={sectionId}>
            {sectionsMap[sectionId] || null}
          </div>
        ))}
      </main>
      <PublicFooter />
    </div>
  );
}