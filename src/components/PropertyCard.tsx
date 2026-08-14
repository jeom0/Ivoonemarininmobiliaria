"use client";
import { useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  modality: string;
  status: string;
  title: string;
  price: number;
  city: string;
  sector?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  builtArea?: number | null;
  mainImage?: string | null;
  images?: string | null;
  isInvestment?: boolean;
}

export default function PropertyCard({ p, isInvestment = false }: { p: Property, isInvestment?: boolean }) {
  const [currentImg, setCurrentImg] = useState(0);
  
  let mediaList: string[] = [];
  if (p.images) {
    try {
      mediaList = JSON.parse(p.images);
    } catch(e) {}
  }
  
  if (mediaList.length === 0 && p.mainImage) {
    mediaList = [p.mainImage];
  }

  // Prepend mainImage if it's not already in mediaList
  if (p.mainImage && !mediaList.includes(p.mainImage)) {
    mediaList.unshift(p.mainImage);
  }

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % mediaList.length);
  };
  
  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const goToImg = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg(idx);
  };

  return (
    <Link href={`/propiedades/${p.id}`} className="block h-full group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden luxury-shadow transition-transform hover:-translate-y-2 relative flex flex-col">
      <div className="relative h-64 overflow-hidden shrink-0 group/carousel">
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
          <span className={`${p.modality === 'VENTA' ? 'bg-primary' : 'bg-secondary'} text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>{p.modality}</span>
          {(isInvestment || p.isInvestment) && (
            <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> Inversión
            </span>
          )}
          {p.status === 'NUEVO' && (
            <span className="bg-secondary-fixed text-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">Nuevo</span>
          )}
        </div>
        
        {mediaList.length > 0 ? (
          mediaList[currentImg]?.match(/\.(mp4|webm|ogg|mov)$/i) ? (
            <video className="w-full h-full object-cover transition-transform duration-700 bg-black" src={mediaList[currentImg]} muted loop autoPlay playsInline />
          ) : (
            <img className="w-full h-full object-cover transition-transform duration-700" alt={p.title} src={mediaList[currentImg]}/>
          )
        ) : (
          <div className="w-full h-full bg-surface-container flex flex-col items-center justify-center text-on-surface-variant/60">
            <span className="material-symbols-outlined text-4xl mb-2">no_photography</span>
            <span className="font-label-md text-xs">Sin foto disponible</span>
          </div>
        )}
        
        {mediaList.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-black/70">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-black/70">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </>
        )}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
          {mediaList.map((_, idx) => (
            <div 
              key={idx} 
              onClick={(e) => goToImg(e, idx)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors shadow-sm ${currentImg === idx ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-headline-md text-headline-md text-primary line-clamp-3 leading-tight">{p.title}</h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-headline-md font-bold text-on-surface whitespace-nowrap">${p.price.toLocaleString('es-CO')}</span>
            {p.modality === 'ARRIENDO' && <span className="text-[12px] text-on-surface-variant">/mes</span>}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-on-surface-variant mb-4 shrink-0">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span className="text-body-md">{p.city} {p.sector ? '- ' + p.sector : ''}</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between text-on-surface-variant shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">bed</span>
            <span className="text-label-md">{p.bedrooms || 0} Hab</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">bathtub</span>
            <span className="text-label-md">{p.bathrooms || 0} Baños</span>
          </div>
          {p.builtArea ? (
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">square_foot</span>
              <span className="text-label-md">{p.builtArea}m²</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
