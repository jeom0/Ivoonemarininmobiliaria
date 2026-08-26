"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FeaturedProperty {
  id: string;
  title: string;
  price: number;
  city: string;
  mainImage?: string | null;
  images?: string | null;
}

export default function HeroCarousel({ 
  media, 
  title, 
  subtitle,
  featuredProperties = []
}: { 
  media: string[], 
  title: string, 
  subtitle: string,
  featuredProperties?: FeaturedProperty[]
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultMedia = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100"
  ];

  // Si hay inmuebles destacados seleccionados por el usuario, construir las diapositivas con sus imágenes y datos
  const propertySlides = featuredProperties.map(p => {
    let imgUrl = p.mainImage;
    if (!imgUrl && p.images) {
      try {
        const parsed = JSON.parse(p.images);
        if (Array.isArray(parsed) && parsed.length > 0) imgUrl = parsed[0];
      } catch (e) {}
    }
    return {
      url: imgUrl || defaultMedia[0],
      title: p.title,
      price: p.price,
      city: p.city,
      id: p.id
    };
  }).filter(s => s.url);

  // Si no hay destacados, usar las imágenes de configuración o por defecto
  const hasProperties = propertySlides.length > 0;
  const currentMediaUrls = hasProperties 
    ? propertySlides.map(s => s.url)
    : (media && media.length > 0 ? media : defaultMedia);

  useEffect(() => {
    if (currentMediaUrls.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % currentMediaUrls.length);
    }, 6000); // 6 seconds per slide
    
    return () => clearInterval(interval);
  }, [currentMediaUrls.length]);

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) !== null || url.includes('video');
  };

  const activeProperty = hasProperties ? propertySlides[activeIndex] : null;

  return (
    <section className="relative min-h-[100svh] md:h-[870px] w-full overflow-hidden pb-12 md:pb-0">
      
      {/* Fondo Carrusel Dinámico */}
      <div className="absolute inset-0 z-0 bg-black">
        {currentMediaUrls.map((url, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {isVideo(url) ? (
              <video 
                src={url} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-10000 scale-105" 
                style={{ backgroundImage: `url("${url}")` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85"></div>
          </div>
        ))}
        
        {/* Puntos de Navegación del Carrusel */}
        {currentMediaUrls.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
            {currentMediaUrls.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-3 rounded-full transition-all cursor-pointer ${idx === activeIndex ? 'bg-primary w-8' : 'bg-white/50 w-3 hover:bg-white/80'}`}
                aria-label={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contenido Principal sobre el Carrusel */}
      <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-start text-white pt-28 md:pt-20 pointer-events-none">
        
        {/* Badge Dinámico si la Diapositiva Pertenece a un Inmueble Destacado */}
        {activeProperty && (
          <Link 
            href={`/propiedades/${activeProperty.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-primary/40 text-white mb-4 pointer-events-auto hover:bg-surface transition-all shadow-lg text-xs md:text-sm group"
          >
            <span className="material-symbols-outlined text-sm text-[#D4AF37]">star</span>
            <span className="font-bold text-secondary">Destacado:</span>
            <span className="font-semibold line-clamp-1">{activeProperty.title}</span>
            <span className="font-bold text-white bg-primary px-2.5 py-0.5 rounded-md ml-1">
              ${activeProperty.price.toLocaleString('es-CO')}
            </span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        )}

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl mb-4 md:mb-6 leading-tight drop-shadow-lg">
          {title || "Encuentra el inmueble ideal con una asesoría cercana, segura y profesional."}
        </h1>
        <p className="text-base md:text-lg max-w-2xl mb-8 md:mb-10 text-white/90 font-medium drop-shadow-md">
          {subtitle || "Te acompañamos en la compra, venta y arriendo de inmuebles en Santa Rosa de Cabal, Pereira, Dosquebradas y el Eje Cafetero."}
        </p>

        {/* Buscador Rápido del Hero */}
        <form action="/propiedades" method="GET" className="w-full max-w-5xl bg-surface/95 backdrop-blur-xl rounded-xl p-6 md:p-8 luxury-shadow border border-secondary-fixed/30 text-on-surface pointer-events-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant font-bold">Operación</label>
              <select name="modality" className="w-full border-outline-variant rounded-lg font-body-md py-2 px-3 focus:ring-primary focus:border-primary text-sm">
                <option value="Todos">Todas</option>
                <option value="VENTA">Venta</option>
                <option value="ARRIENDO">Arriendo</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant font-bold">Tipo de Inmueble</label>
              <select name="type" className="w-full border-outline-variant rounded-lg font-body-md py-2 px-3 focus:ring-primary focus:border-primary text-sm">
                <option value="Todos">Todos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Finca">Finca</option>
                <option value="Lote">Lote</option>
                <option value="Local Comercial">Local Comercial</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant font-bold">Ciudad</label>
              <select name="city" className="w-full border-outline-variant rounded-lg font-body-md py-2 px-3 focus:ring-primary focus:border-primary text-sm">
                <option value="Todas">Todas</option>
                <option value="Santa Rosa de Cabal">Santa Rosa</option>
                <option value="Pereira">Pereira</option>
                <option value="Dosquebradas">Dosquebradas</option>
                <option value="Manizales">Manizales</option>
                <option value="Armenia">Armenia</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant font-bold">Habitaciones</label>
              <select name="rooms" className="w-full border-outline-variant rounded-lg font-body-md py-2 px-3 focus:ring-primary focus:border-primary text-sm">
                <option value="">Cualquiera</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="flex items-end col-span-2 md:col-span-1 mt-2 md:mt-0">
              <button type="submit" className="w-full bg-primary text-on-primary h-[42px] rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md font-bold text-sm cursor-pointer">
                <span className="material-symbols-outlined text-lg">search</span>
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
