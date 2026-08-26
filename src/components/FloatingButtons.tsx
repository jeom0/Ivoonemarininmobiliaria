"use client";

import { useState, useEffect } from "react";

export default function FloatingButtons() {
  const [whatsapp, setWhatsapp] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Carga el número de WhatsApp desde la API de ajustes
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        const raw = data.whatsapp || "+573000000000";
        const first = raw.split(/[\/\-\,]/)[0].trim();
        const clean = first.replace(/[^0-9]/g, '');
        setWhatsapp(clean);
      })
      .catch(() => setWhatsapp("573000000000"));
  }, []);

  // Muestra el botón de Scroll-to-top solo cuando el usuario ha bajado > 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ===== BOTÓN FLOTANTE WHATSAPP ===== */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola Ivonne, quisiera más información sobre un inmueble.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{ backgroundColor: "#25D366" }}
          title="Contactar por WhatsApp"
          aria-label="Contactar por WhatsApp"
        >
          {/* Pulso verde animado */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: "#25D366" }}
          />
          {/* Ícono SVG de WhatsApp */}
          <svg
            viewBox="0 0 32 32"
            className="w-7 h-7 relative z-10 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.003 2.667C8.64 2.667 2.667 8.639 2.667 16c0 2.344.634 4.638 1.836 6.649L2.667 29.333l6.876-1.804A13.29 13.29 0 0016.003 29.333C23.366 29.333 29.333 23.36 29.333 16S23.366 2.667 16.003 2.667zm0 2.4c5.988 0 10.93 4.942 10.93 10.933s-4.942 10.933-10.93 10.933a10.9 10.9 0 01-5.548-1.508l-.393-.237-4.08 1.07 1.092-3.964-.258-.41A10.89 10.89 0 015.07 16c0-5.991 4.942-10.933 10.933-10.933zm-3.24 5.44c-.24-.533-.491-.544-.72-.553l-.613-.007c-.213 0-.56.08-.854.4-.293.32-1.12 1.093-1.12 2.667 0 1.574 1.147 3.094 1.307 3.307.16.213 2.24 3.573 5.52 4.867 2.733 1.08 3.287.866 3.88.813.587-.053 1.907-.773 2.174-1.52.266-.746.266-1.386.186-1.52-.08-.133-.293-.213-.613-.373-.32-.16-1.893-.933-2.187-1.04-.293-.106-.506-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.32.24-.64.08-.32-.16-1.352-.499-2.573-1.587-.953-.849-1.596-1.896-1.786-2.217-.19-.32-.02-.492.143-.652.147-.143.32-.373.48-.56.16-.186.213-.32.32-.533.106-.213.053-.4-.026-.56-.08-.16-.72-1.747-.987-2.394z"/>
          </svg>

          {/* Tooltip */}
          <span className="absolute right-16 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md pointer-events-none">
            WhatsApp
          </span>
        </a>
      )}

      {/* ===== BOTÓN FLOTANTE SCROLL TO TOP ===== */}
      <button
        onClick={scrollToTop}
        aria-label="Volver al inicio"
        title="Volver al inicio"
        className={`fixed bottom-24 right-6 z-[9999] w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-xl">keyboard_arrow_up</span>
      </button>
    </>
  );
}
