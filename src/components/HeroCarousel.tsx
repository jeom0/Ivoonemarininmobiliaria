"use client";

import { useState, useEffect } from "react";

export default function HeroCarousel({ 
  media, 
  title, 
  subtitle 
}: { 
  media: string[], 
  title: string, 
  subtitle: string 
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultMedia = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100"
  ];

  const currentMedia = media && media.length > 0 ? media : defaultMedia;

  useEffect(() => {
    if (currentMedia.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % currentMedia.length);
    }, 6000); // 6 seconds per slide
    
    return () => clearInterval(interval);
  }, [currentMedia.length]);

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i) !== null || url.includes('video');
  };

  return (
    <section className="relative min-h-[100svh] md:h-[870px] w-full overflow-hidden pb-12 md:pb-0">
      <div className="absolute inset-0 z-0 bg-black">
        {currentMedia.map((url, index) => (
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
          </div>
        ))}
        
        {/* Navigation Dots */}
        {currentMedia.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
            {currentMedia.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === activeIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-start text-white pt-28 md:pt-20 pointer-events-none">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl mb-4 md:mb-6 leading-tight drop-shadow-lg">
          {title || "Encuentra el inmueble ideal con una asesoría cercana, segura y profesional."}
        </h1>
        <p className="text-base md:text-lg max-w-2xl mb-8 md:mb-10 text-white/90 font-medium drop-shadow-md">
          {subtitle || "Te acompañamos en la compra, venta y arriendo de inmuebles en Santa Rosa de Cabal, Pereira, Dosquebradas y el Eje Cafetero."}
        </p>

        <div className="w-full max-w-5xl bg-surface/95 backdrop-blur-xl rounded-xl p-6 md:p-8 luxury-shadow border border-secondary-fixed/30 text-on-surface pointer-events-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant">Operación</label>
              <select className="w-full border-outline-variant rounded-lg font-body-md py-2 focus:ring-primary focus:border-primary">
                <option>Venta</option>
                <option>Arriendo</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant">Tipo de Inmueble</label>
              <select className="w-full border-outline-variant rounded-lg font-body-md py-2 focus:ring-primary focus:border-primary">
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Lote</option>
                <option>Local</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant">Ciudad</label>
              <select className="w-full border-outline-variant rounded-lg font-body-md py-2 focus:ring-primary focus:border-primary">
                <option>Santa Rosa</option>
                <option>Pereira</option>
                <option>Dosquebradas</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant">Sector</label>
              <input className="w-full border-outline-variant rounded-lg font-body-md py-2 focus:ring-primary focus:border-primary" placeholder="Ej: Cerritos" type="text"/>
            </div>
            <div className="flex items-end col-span-2 md:col-span-1 mt-2 md:mt-0">
              <button className="w-full bg-primary text-on-primary h-[42px] rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md">
                <span className="material-symbols-outlined">search</span>
                <span className="font-label-md text-label-md">Buscar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
