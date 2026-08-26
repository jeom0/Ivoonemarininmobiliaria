"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function PropertyGallery({ 
  mainImage, 
  imagesString, 
  videosString 
}: { 
  mainImage: string | null, 
  imagesString: string | null, 
  videosString?: string | null 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  let additionalImages: string[] = [];
  try {
    if (imagesString) {
      additionalImages = JSON.parse(imagesString);
    }
  } catch (e) {}

  let videoItems: string[] = [];
  try {
    if (videosString) {
      const parsed = JSON.parse(videosString);
      if (Array.isArray(parsed)) videoItems = parsed;
    }
  } catch (e) {}

  // Deduplicar URLs preservando el orden
  const uniqueUrls = new Set<string>();
  if (mainImage) uniqueUrls.add(mainImage);
  videoItems.forEach(vid => uniqueUrls.add(vid));
  additionalImages.forEach(img => uniqueUrls.add(img));

  const allImages = Array.from(uniqueUrls);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, allImages.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40; // minimum px required for swipe
    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderMedia = (url: string, className: string, alt: string) => {
    const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
    if (isVideo) {
      return (
        <video 
          src={url} 
          className={className} 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      );
    }
    return <img src={url} alt={alt} className={className} />;
  };

  const renderLightboxMedia = (url: string) => {
    const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
    if (isVideo) {
      return (
        <video 
          src={url} 
          controls 
          autoPlay
          className="max-h-[70dvh] sm:max-h-[75dvh] md:max-h-[82dvh] max-w-[95vw] md:max-w-[90vw] object-contain rounded-xl shadow-2xl select-none"
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <img
        src={url}
        alt={`Vista ${currentIndex + 1}`}
        className="max-h-[70dvh] sm:max-h-[75dvh] md:max-h-[82dvh] max-w-[95vw] md:max-w-[90vw] object-contain rounded-xl shadow-2xl select-none transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      />
    );
  };

  return (
    <>
      {/* Grid de Vista Previa */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 md:gap-4 h-[350px] sm:h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-sm">
        <div 
          className={`md:col-span-1 md:row-span-2 relative group overflow-hidden h-[220px] md:h-full ${allImages.length > 0 ? 'cursor-pointer' : 'bg-surface-container flex flex-col items-center justify-center text-on-surface-variant/60'}`}
          onClick={() => allImages.length > 0 && openLightbox(0)}
        >
          {allImages.length > 0 ? (
            <>
              {renderMedia(allImages[0], "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700", "Principal")}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                <span className="text-white font-label-md bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs md:text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">photo_library</span>
                  Ver galería ({allImages.length})
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-6xl mb-2">no_photography</span>
              <span className="font-label-md text-sm">No tiene foto disponible</span>
            </>
          )}
        </div>
        
        {allImages.length > 1 ? (
          <div 
            className="relative overflow-hidden cursor-pointer group hidden md:block"
            onClick={() => openLightbox(1)}
          >
            {renderMedia(allImages[1], "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", "Adicional 1")}
          </div>
        ) : (
          <div className="relative bg-surface-container-high hidden md:flex items-center justify-center">
             <span className="text-on-surface-variant font-label-md text-sm">Sin más archivos</span>
          </div>
        )}

        {allImages.length > 2 ? (
          <div 
            className="relative overflow-hidden cursor-pointer group hidden md:block"
            onClick={() => openLightbox(2)}
          >
            {renderMedia(allImages[2], "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", "Adicional 2")}
            {allImages.length > 3 && (
              <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-on-primary font-headline-md">+{allImages.length - 3}</span>
                <span className="text-on-primary text-sm">Ver Todos</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-surface-container-high hidden md:flex items-center justify-center">
             <span className="text-on-surface-variant font-label-md text-sm">Sin más archivos</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal con Portal */}
      {isOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between items-center w-screen h-[100dvh] overflow-hidden select-none p-3 md:p-6"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Header & Controls */}
          <div 
            className="w-full flex items-center justify-between z-50 pt-safe px-2 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-white font-label-md bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs md:text-sm">
              <span className="material-symbols-outlined text-sm md:text-base">collections</span>
              <span>{currentIndex + 1} / {allImages.length}</span>
            </div>

            <button 
              className="text-white bg-white/10 hover:bg-white/20 active:scale-95 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all z-50 cursor-pointer shadow-lg"
              onClick={closeLightbox}
              aria-label="Cerrar vista previa"
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl">close</span>
            </button>
          </div>
          
          {/* Center Area: Media & Desktop Arrows */}
          <div className="relative flex-1 w-full flex items-center justify-center my-auto overflow-hidden">
            {/* Desktop Previous Button */}
            {allImages.length > 1 && (
              <button 
                className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 active:scale-95 rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center transition-all z-50 backdrop-blur-sm cursor-pointer shadow-xl"
                onClick={prevImage}
                aria-label="Imagen anterior"
              >
                <span className="material-symbols-outlined text-3xl lg:text-4xl">chevron_left</span>
              </button>
            )}

            {/* Media Item */}
            <div className="flex items-center justify-center max-w-full max-h-full">
              {renderLightboxMedia(allImages[currentIndex])}
            </div>

            {/* Desktop Next Button */}
            {allImages.length > 1 && (
              <button 
                className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 active:scale-95 rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center transition-all z-50 backdrop-blur-sm cursor-pointer shadow-xl"
                onClick={nextImage}
                aria-label="Imagen siguiente"
              >
                <span className="material-symbols-outlined text-3xl lg:text-4xl">chevron_right</span>
              </button>
            )}
          </div>

          {/* Bottom Area: Mobile Nav Buttons & Thumbnails Strip */}
          <div 
            className="w-full flex flex-col items-center justify-center gap-3 z-50 pb-safe pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Nav Controls (Previous / Next) */}
            {allImages.length > 1 && (
              <div className="flex md:hidden items-center justify-between w-full max-w-xs px-4">
                <button 
                  className="flex items-center gap-1 bg-white/15 active:bg-white/30 text-white px-4 py-2 rounded-full font-label-md text-xs backdrop-blur-md transition-all shadow-md"
                  onClick={prevImage}
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Anterior
                </button>
                <span className="text-white/70 text-xs font-label-md">Desliza <span className="material-symbols-outlined text-xs align-middle">swipe</span></span>
                <button 
                  className="flex items-center gap-1 bg-white/15 active:bg-white/30 text-white px-4 py-2 rounded-full font-label-md text-xs backdrop-blur-md transition-all shadow-md"
                  onClick={nextImage}
                >
                  Siguiente
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            )}

            {/* Thumbnails Bar */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full px-4 py-1 no-scrollbar">
                {allImages.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === currentIndex 
                        ? 'border-primary ring-2 ring-primary/50 scale-105 opacity-100 z-10' 
                        : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                  >
                    {renderMedia(url, "w-full h-full object-cover", `Miniatura ${idx + 1}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
