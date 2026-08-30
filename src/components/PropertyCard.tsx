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

function ShareButtons({ propertyId, title, price }: { propertyId: string; title: string; price: number }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/propiedades/${propertyId}`;
    }
    return `/propiedades/${propertyId}`;
  };

  const shareText = encodeURIComponent(
    `🏡 ${title} — $${price.toLocaleString('es-CO')} COP`
  );

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFacebook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://wa.me/?text=${shareText}%20${encodeURIComponent(getUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-1.5" onClick={e => e.preventDefault()}>
      <span className="text-[11px] text-on-surface-variant font-medium mr-0.5">Compartir:</span>
      
      {/* Facebook */}
      <button
        onClick={handleFacebook}
        title="Compartir en Facebook"
        aria-label="Compartir en Facebook"
        className="w-8 h-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsApp}
        title="Compartir por WhatsApp"
        aria-label="Compartir por WhatsApp"
        className="w-8 h-8 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.003 2.667C8.64 2.667 2.667 8.639 2.667 16c0 2.344.634 4.638 1.836 6.649L2.667 29.333l6.876-1.804A13.29 13.29 0 0016.003 29.333C23.366 29.333 29.333 23.36 29.333 16S23.366 2.667 16.003 2.667zm0 2.4c5.988 0 10.93 4.942 10.93 10.933s-4.942 10.933-10.93 10.933a10.9 10.9 0 01-5.548-1.508l-.393-.237-4.08 1.07 1.092-3.964-.258-.41A10.89 10.89 0 015.07 16c0-5.991 4.942-10.933 10.933-10.933zm-3.24 5.44c-.24-.533-.491-.544-.72-.553l-.613-.007c-.213 0-.56.08-.854.4-.293.32-1.12 1.093-1.12 2.667 0 1.574 1.147 3.094 1.307 3.307.16.213 2.24 3.573 5.52 4.867 2.733 1.08 3.287.866 3.88.813.587-.053 1.907-.773 2.174-1.52.266-.746.266-1.386.186-1.52-.08-.133-.293-.213-.613-.373-.32-.16-1.893-.933-2.187-1.04-.293-.106-.506-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.32.24-.64.08-.32-.16-1.352-.499-2.573-1.587-.953-.849-1.596-1.896-1.786-2.217-.19-.32-.02-.492.143-.652.147-.143.32-.373.48-.56.16-.186.213-.32.32-.533.106-.213.053-.4-.026-.56-.08-.16-.72-1.747-.987-2.394z"/>
        </svg>
      </button>

      {/* Copiar enlace */}
      <button
        onClick={handleCopy}
        title={copied ? "¡Enlace copiado!" : "Copiar enlace"}
        aria-label="Copiar enlace"
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer ${
          copied
            ? "bg-green-500 text-white"
            : "bg-outline-variant/20 hover:bg-primary hover:text-on-primary text-on-surface-variant"
        }`}
      >
        <span className="material-symbols-outlined text-sm">
          {copied ? "check" : "content_copy"}
        </span>
      </button>
    </div>
  );
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
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/70">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/70">
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
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-headline-md text-headline-md text-primary line-clamp-3 leading-tight">{p.title}</h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-headline-md font-bold text-on-surface whitespace-nowrap">${p.price.toLocaleString('es-CO')}</span>
            {p.modality === 'ARRIENDO' && <span className="text-[12px] text-on-surface-variant">/mes</span>}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-on-surface-variant mb-3 shrink-0">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span className="text-body-md">{p.city} {p.sector ? '- ' + p.sector : ''}</span>
        </div>
        
        <div className="mt-auto pt-3 border-t border-outline-variant/30 flex flex-col gap-3 shrink-0">
          {/* Stats */}
          <div className="flex justify-between text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">bed</span>
              <span className="text-label-md">{p.bedrooms || 0} Hab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">bathtub</span>
              <span className="text-label-md">{p.bathrooms || 0} Baños</span>
            </div>
            {p.builtArea ? (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">square_foot</span>
                <span className="text-label-md">{p.builtArea}m²</span>
              </div>
            ) : null}
          </div>

          {/* Botones de Compartir */}
          <ShareButtons propertyId={p.id} title={p.title} price={p.price} />
        </div>
      </div>
    </Link>
  );
}
