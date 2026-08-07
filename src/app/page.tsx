import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import HeroCarousel from "@/components/HeroCarousel";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function Page() {
  const [properties, featuredProperties, investmentProperties, blogPosts, settingsDb] = await Promise.all([
    prisma.property.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.property.findMany({ where: { isFeatured: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.property.findMany({ where: { isInvestment: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.blogPost.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, take: 3 }),
    prisma.setting.findMany()
  ]);

  const settings = settingsDb.reduce((acc: any, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
  
  // Usar una imagen de alta calidad de Unsplash para el parallax (fachada moderna de lujo)
  const heroImageUrl = settings.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100";
  const whatsappNumber = settings.whatsapp || "+573000000000";
  // Extract just the first number if user entered multiple (e.g. "3113538193 / 320-7341484")
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
    hero: (<>
<HeroCarousel media={heroMedia} title={settings.home_hero_title} subtitle={settings.home_hero_subtitle} />
    </>),
    featured: (<>
<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-12">
<div>
<span className="text-secondary font-label-md text-label-md tracking-widest block mb-2">OPORTUNIDADES EXCLUSIVAS</span>
<h2 className="font-headline-lg text-headline-lg text-primary">Propiedades Destacadas</h2>
</div>
<Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/propiedades">
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
      <Link href={`/propiedades/${p.id}`} key={p.id} className="block group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden luxury-shadow transition-transform hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
        <span className={`${p.modality === 'VENTA' ? 'bg-primary' : 'bg-secondary'} text-white text-[10px] font-bold px-3 py-1 rounded-full`}>{p.modality}</span>
        </div>
        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} src={p.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}/>
        </div>
        <div className="p-6">
        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface hover:text-primary transition-colors line-clamp-1">{p.title}</h3>
        <div className="flex items-center gap-1 text-on-surface-variant mb-4">
        <span className="material-symbols-outlined text-sm">location_on</span>
        <span className="font-body-md text-body-md">{p.city}</span>
        </div>
        <div className="flex flex-col gap-4 py-4 border-t border-outline-variant/30">
        <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">bed</span>
        <span className="text-sm">{p.bedrooms || 0}</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">bathtub</span>
        <span className="text-sm">{p.bathrooms || 0}</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">square_foot</span>
        <span className="text-sm">{p.builtArea || 0}m²</span>
        </div>
        </div>
        <p className="font-bold text-primary text-lg whitespace-nowrap">${p.price.toLocaleString("es-CO")}{p.modality === 'ARRIENDO' ? '/mes' : ''}</p>
        </div>
        </div>
        </div>
      </Link>
    ))
  )}
</div>
</section>

    </>),
    about: (<>
<section className="py-section-gap bg-surface-container-low/50 relative overflow-hidden">
  <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 group">
      <img 
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
        src="/perfil.jpg" 
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

    </>),
    novedades: (<>
<section className="py-section-gap bg-surface-container-low/30">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-12">
        <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-2">NOVEDADES</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Nuevos Inmuebles</h2>
        </div>
        <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/propiedades">
            Ver catálogo completo <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {properties.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-on-surface-variant">
                No hay nuevos inmuebles disponibles en este momento.
            </div>
        ) : (
            properties.map(p => (
                <Link href={`/propiedades/${p.id}`} key={p.id} className="block bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-md group">
                    <div className="relative h-64 overflow-hidden">
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">{p.modality}</span>
                        </div>
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} src={p.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} />
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-headline-md text-headline-md text-primary">{p.title}</h3>
                            <span className="text-headline-md font-bold text-on-surface">${p.price.toLocaleString('es-CO')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant mb-4">
                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                            <span className="text-body-md">{p.city}</span>
                        </div>
                        <div className="flex justify-between py-4 border-t border-outline-variant/30 text-on-surface-variant">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined">bed</span>
                                <span className="text-label-md">{p.bedrooms} Hab</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined">bathtub</span>
                                <span className="text-label-md">{p.bathrooms} Baños</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        )}
    </div>
</div>
</section>

    </>),
    investment: (<>
{/* SECCIÓN OPORTUNIDADES DE INVERSIÓN */}
<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-12">
<div>
<span className="text-secondary font-label-md text-label-md tracking-widest block mb-2">ALTA RENTABILIDAD</span>
<h2 className="font-headline-lg text-headline-lg text-primary">Oportunidades de Inversión</h2>
</div>
<Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/propiedades">
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
      <Link href={`/propiedades/${p.id}`} key={p.id} className="block group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden luxury-shadow transition-transform hover:-translate-y-2 relative">
        <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className={`${p.modality === 'VENTA' ? 'bg-primary' : 'bg-secondary'} text-white text-[10px] font-bold px-3 py-1 rounded-full`}>{p.modality}</span>
        <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> Inversión</span>
        </div>
        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} src={p.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}/>
        </div>
        <div className="p-6">
        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface hover:text-primary transition-colors line-clamp-1">{p.title}</h3>
        <div className="flex items-center gap-1 text-on-surface-variant mb-4">
        <span className="material-symbols-outlined text-sm">location_on</span>
        <span className="font-body-md text-body-md">{p.city}</span>
        </div>
        <div className="flex flex-col gap-4 py-4 border-t border-outline-variant/30">
        <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">bed</span>
        <span className="text-sm">{p.bedrooms || 0}</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">bathtub</span>
        <span className="text-sm">{p.bathrooms || 0}</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined text-lg">square_foot</span>
        <span className="text-sm">{p.builtArea || 0}m²</span>
        </div>
        </div>
        <p className="font-bold text-primary text-lg whitespace-nowrap">${p.price.toLocaleString("es-CO")}{p.modality === 'ARRIENDO' ? '/mes' : ''}</p>
        </div>
        </div>
        </div>
      </Link>
    ))
  )}
</div>
</section>

    </>),
    blog: (<>
{/* SECCIÓN BLOG */}
<section className="py-section-gap bg-surface-container-low/30 relative overflow-hidden">
<div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-4 mb-12">
        <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-2 uppercase">Conocimiento</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Blog Inmobiliario</h2>
        </div>
        <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline shrink-0" href="/blog">
            Ver todos los artículos <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {blogPosts.length === 0 ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm">
                <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">article</span>
                <h3 className="font-headline-md text-primary mb-2">Próximamente nuevos artículos</h3>
                <p className="text-on-surface-variant max-w-md text-center">Estamos preparando contenido de valor sobre el mercado inmobiliario, consejos de inversión y tendencias. ¡Vuelve pronto!</p>
            </div>
        ) : (
            blogPosts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          src={post.mainImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                          alt={post.title}
                        />
                        {post.category && (
                          <div className="absolute top-4 left-4 z-10">
                              <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">{post.category}</span>
                          </div>
                        )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-3">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Publicado recientemente'}</span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">{post.title}</h3>
                        <p className="text-on-surface-variant text-body-md line-clamp-3 mb-6 flex-grow">{post.summary}</p>
                        <div className="flex items-center gap-2 text-primary font-bold text-label-md mt-auto">
                            Leer artículo <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </div>
                </Link>
            ))
        )}
    </div>
</div>
</section>

    </>),
    valor: (<>
<section className="bg-primary text-on-primary py-section-gap overflow-hidden relative">
<div className="absolute top-0 right-0 opacity-10 pointer-events-none">

</div>
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
<div className="text-center mb-16">
<span className="text-secondary-fixed font-label-md text-label-md tracking-widest block mb-4 uppercase">Valor Diferencial</span>
<h2 className="font-display-lg text-3xl md:text-5xl lg:text-display-lg leading-tight">¿Por qué confiar en nosotros?</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
<div className="flex flex-col items-center text-center p-8 bg-primary-container/30 rounded-2xl border border-on-primary/10 transition-all duration-300 hover:bg-primary-container/50 hover:-translate-y-2 hover:shadow-2xl">
<div className="w-16 h-16 bg-secondary-fixed/20 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-3xl text-secondary-fixed" style={{"fontVariationSettings":"\"FILL\" 1"}}>verified_user</span>
</div>
<h3 className="font-headline-md text-headline-md mb-4">Confianza</h3>
<p className="font-body-md text-on-primary/80">Operaciones transparentes y seguras respaldadas por años de trayectoria impecable en el mercado inmobiliario.</p>
</div>
<div className="flex flex-col items-center text-center p-8 bg-primary-container/30 rounded-2xl border border-on-primary/10 transition-all duration-300 hover:bg-primary-container/50 hover:-translate-y-2 hover:shadow-2xl">
<div className="w-16 h-16 bg-secondary-fixed/20 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-3xl text-secondary-fixed" style={{"fontVariationSettings":"\"FILL\" 1"}}>support_agent</span>
</div>
<h3 className="font-headline-md text-headline-md mb-4">Asesoría Personalizada</h3>
<p className="font-body-md text-on-primary/80">No solo vendemos casas, acompañamos sueños. Escuchamos tus necesidades para encontrar el lugar perfecto para ti.</p>
</div>
<div className="flex flex-col items-center text-center p-8 bg-primary-container/30 rounded-2xl border border-on-primary/10 transition-all duration-300 hover:bg-primary-container/50 hover:-translate-y-2 hover:shadow-2xl">
<div className="w-16 h-16 bg-secondary-fixed/20 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-3xl text-secondary-fixed" style={{"fontVariationSettings":"\"FILL\" 1"}}>location_city</span>
</div>
<h3 className="font-headline-md text-headline-md mb-4">Experiencia Local</h3>
<p className="font-body-md text-on-primary/80">Conocimiento profundo de cada sector del Eje Cafetero para garantizar la mejor inversión posible.</p>
</div>
</div>
</div>
</section>

    </>),
    servicios: (<>
<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div className="order-2 lg:order-1">
<div className="grid grid-cols-2 gap-6">
<div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
<span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform">shopping_bag</span>
<h4 className="font-headline-md text-headline-md mb-2">Comprar</h4>
<p className="text-on-surface-variant font-body-md">Portafolio exclusivo de inmuebles nuevos y usados en las mejores zonas.</p>
</div>
<div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
<span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform">sell</span>
<h4 className="font-headline-md text-headline-md mb-2">Vender</h4>
<p className="text-on-surface-variant font-body-md">Estrategia de marketing premium para vender tu inmueble al mejor precio.</p>
</div>
<div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
<span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform">key</span>
<h4 className="font-headline-md text-headline-md mb-2">Arrendar</h4>
<p className="text-on-surface-variant font-body-md">Gestión integral para propietarios e inquilinos, con seguridad contractual.</p>
</div>
<div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
<span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform">analytics</span>
<h4 className="font-headline-md text-headline-md mb-2">Inversión</h4>
<p className="text-on-surface-variant font-body-md">Análisis de rentabilidad y asesoría técnica para tus inversiones raíces.</p>
</div>
</div>
</div>
<div className="order-1 lg:order-2">
<span className="text-secondary font-label-md text-label-md tracking-widest block mb-2">SOLUCIONES INTEGRALES</span>
<h2 className="text-3xl md:text-5xl text-primary mb-4 md:mb-6 leading-tight font-bold">Servicios diseñados para tu tranquilidad</h2>
<p className="text-base md:text-lg text-on-surface-variant mb-6 md:mb-8">
                    En el competitivo mercado del Eje Cafetero, contar con una experta es la diferencia entre una transacción estresante y una experiencia exitosa. Me encargo de cada detalle legal y comercial.
                </p>
<button className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-2">
                    Descubrir más servicios
                    <span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</section>

    </>),
    zonas: (<>
<section className="py-section-gap bg-surface-container-low">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="mb-12">
<h2 className="font-headline-lg text-headline-lg text-primary">Explora nuestras zonas</h2>
<p className="text-on-surface-variant font-body-lg mt-2">Encuentra tu próximo hogar en las áreas más exclusivas y de mayor valorización.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
{homeZones.map((z: any, i: number) => (
  <div key={i} className="relative h-96 rounded-2xl overflow-hidden group">
    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={z.image || "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={z.name} />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
      <h4 className="text-white font-headline-md text-headline-md">{z.name}</h4>
      <p className="text-white/80 font-body-md">{z.subtitle}</p>
    </div>
  </div>
))}
</div>
</div>
</section>

    </>),
    cta: (<>
<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="bg-secondary-container/30 rounded-3xl p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden luxury-shadow">
<div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
<div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
<h2 className="text-3xl md:text-5xl text-primary mb-4 md:mb-6 relative z-10 leading-tight font-bold">¿Listo para encontrar o vender tu inmueble?</h2>
<p className="text-base md:text-lg text-on-surface-variant max-w-2xl mb-8 md:mb-10 relative z-10">
                Inicia hoy tu camino hacia tu nuevo hogar con el respaldo de una profesional que se preocupa por ti. Escríbeme y agendemos una cita.
            </p>
<div className="flex flex-col sm:flex-row gap-4 relative z-10">
<a href={`https://wa.me/${cleanWhatsapp}?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20inmobiliaria`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-lg">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>chat</span>
                    WhatsApp
                </a>
<Link href="/contacto" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg">
<span className="material-symbols-outlined">mail</span>
                    Contactar
                </Link>
</div>
</div>
</section>

    </>)
  };

  return (
    <>
      <PublicNavbar settings={settings} />
      {sectionsOrder.map((id, index) => (
        <div key={index}>
          {sectionsMap[id]}
        </div>
      ))}
      <PublicFooter settings={settings} />

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${cleanWhatsapp}?text=Hola,%20quisiera%20más%20información`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
        title="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </>
  );
}
    