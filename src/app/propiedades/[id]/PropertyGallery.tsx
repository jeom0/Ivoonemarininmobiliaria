"use client";

import { useState } from "react";

export default function PropertyGallery({ mainImage, imagesString }: { mainImage: string | null, imagesString: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  let additionalImages: string[] = [];
  try {
    if (imagesString) {
      additionalImages = JSON.parse(imagesString);
    }
  } catch (e) {}

  // Usar un Set para eliminar duplicados
  const uniqueUrls = new Set<string>();
  if (mainImage) uniqueUrls.add(mainImage);
  additionalImages.forEach(img => uniqueUrls.add(img));

  const allImages = Array.from(uniqueUrls);

  // If no images at all, fallback to a placeholder so it doesn't break
  if (allImages.length === 0) {
    allImages.push("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
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
          className="max-h-[90vh] max-w-[90vw] object-contain select-none"
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <img
        src={url}
        alt={`Vista ${currentIndex + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
      />
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-sm">
        <div 
          className="md:col-span-1 md:row-span-2 relative group cursor-pointer overflow-hidden h-[200px] md:h-full"
          onClick={() => openLightbox(0)}
        >
          {renderMedia(allImages[0], "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700", "Principal")}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-label-md">Ver galería completa</span>
          </div>
        </div>
        
        {allImages.length > 1 ? (
          <div 
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(1)}
          >
            {renderMedia(allImages[1], "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", "Adicional 1")}
          </div>
        ) : (
          <div className="relative bg-surface-container-high flex items-center justify-center">
             <span className="text-on-surface-variant font-label-md">Sin más archivos</span>
          </div>
        )}

        {allImages.length > 2 ? (
          <div 
            className="relative overflow-hidden cursor-pointer group"
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
          <div className="relative bg-surface-container-high flex items-center justify-center">
             <span className="text-on-surface-variant font-label-md">Sin más archivos</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={closeLightbox}>
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-50"
            onClick={closeLightbox}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-14 h-14 flex items-center justify-center transition-colors z-50"
            onClick={prevImage}
          >
            <span className="material-symbols-outlined text-4xl">chevron_left</span>
          </button>

          {renderLightboxMedia(allImages[currentIndex])}

          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-14 h-14 flex items-center justify-center transition-colors z-50"
            onClick={nextImage}
          >
            <span className="material-symbols-outlined text-4xl">chevron_right</span>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-label-md bg-black/50 px-4 py-2 rounded-full z-50">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
