"use client";

import { useState } from "react";

export default function SharePropertyButtons({
  propertyId,
  title,
  price,
}: {
  propertyId: string;
  title: string;
  price: number;
}) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => `${window.location.origin}/propiedades/${propertyId}`;

  const shareText = `🏡 ${title} — $${price.toLocaleString("es-CO")} COP`;

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + getUrl())}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="flex items-center gap-3 py-4 border-b border-outline-variant/30">
      <span className="text-sm font-semibold text-on-surface-variant">Compartir:</span>

      {/* Facebook */}
      <button
        onClick={handleFacebook}
        title="Compartir en Facebook"
        aria-label="Compartir en Facebook"
        className="w-10 h-10 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsApp}
        title="Compartir por WhatsApp"
        aria-label="Compartir por WhatsApp"
        className="w-10 h-10 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
      >
        <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.003 2.667C8.64 2.667 2.667 8.639 2.667 16c0 2.344.634 4.638 1.836 6.649L2.667 29.333l6.876-1.804A13.29 13.29 0 0016.003 29.333C23.366 29.333 29.333 23.36 29.333 16S23.366 2.667 16.003 2.667zm0 2.4c5.988 0 10.93 4.942 10.93 10.933s-4.942 10.933-10.93 10.933a10.9 10.9 0 01-5.548-1.508l-.393-.237-4.08 1.07 1.092-3.964-.258-.41A10.89 10.89 0 015.07 16c0-5.991 4.942-10.933 10.933-10.933zm-3.24 5.44c-.24-.533-.491-.544-.72-.553l-.613-.007c-.213 0-.56.08-.854.4-.293.32-1.12 1.093-1.12 2.667 0 1.574 1.147 3.094 1.307 3.307.16.213 2.24 3.573 5.52 4.867 2.733 1.08 3.287.866 3.88.813.587-.053 1.907-.773 2.174-1.52.266-.746.266-1.386.186-1.52-.08-.133-.293-.213-.613-.373-.32-.16-1.893-.933-2.187-1.04-.293-.106-.506-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.32.24-.64.08-.32-.16-1.352-.499-2.573-1.587-.953-.849-1.596-1.896-1.786-2.217-.19-.32-.02-.492.143-.652.147-.143.32-.373.48-.56.16-.186.213-.32.32-.533.106-.213.053-.4-.026-.56-.08-.16-.72-1.747-.987-2.394z" />
        </svg>
      </button>

      {/* Copiar enlace */}
      <button
        onClick={handleCopy}
        title={copied ? "¡Enlace copiado!" : "Copiar enlace"}
        aria-label="Copiar enlace"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-sm border ${
          copied
            ? "bg-green-500 text-white border-green-500"
            : "bg-surface-container border-outline-variant/50 hover:bg-primary hover:text-on-primary hover:border-primary text-on-surface-variant"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          {copied ? "check" : "content_copy"}
        </span>
      </button>

      {copied && (
        <span className="text-xs font-semibold text-green-600 animate-pulse">
          ¡Enlace copiado!
        </span>
      )}
    </div>
  );
}
