"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function PublicNavbar({ settings }: { settings?: any }) {
  const [s, setS] = useState<any>(settings || {});
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => setS(data))
        .catch(console.error);
    }
  }, [settings]);

  
  useEffect(() => {
    if (isMenuOpen) {
      // Bulletproof scroll lock for iOS Safari
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + window.scrollY + 'px';
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  let navLinks = [
    { label: "Inicio", href: "/", icon: "home" },
    { label: "Inmuebles", href: "/propiedades", icon: "domain" },
    { label: "Nosotros", href: "/nosotros", icon: "groups" },
    { label: "Vender", href: "/vender", icon: "sell" },
    { label: "Arrendar", href: "/arrendar", icon: "key" },
    { label: "Blog", href: "/blog", icon: "article" },
  ];
  if (s.navbar_links) {
    try {
      navLinks = JSON.parse(s.navbar_links);
    } catch(e) {}
  }

  return (
    <nav className="w-full top-0 md:sticky z-50 glass-nav shadow-sm h-20 transition-all bg-surface/80 dark:bg-surface-container-highest/80 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-base md:px-margin-desktop max-w-container-max mx-auto h-full">
        {/* Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {s.logoUrl ? (
              <img src={s.logoUrl} alt={s.agencyName || "Logo"} className="w-auto object-contain" style={{ height: s.logoSize ? `${s.logoSize}px` : '48px', maxHeight: '80px' }} />
            ) : (
              <span className="text-headline-md font-headline-lg text-primary tracking-tight cursor-pointer">
                {s.agencyName || "Ivonne Marin"}
              </span>
            )}
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-300 font-label-md text-label-md ${
                  isActive 
                    ? "font-bold text-primary hover:text-primary-fixed-dim" 
                    : "text-on-surface-variant font-medium hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/contacto" className="hidden lg:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">chat</span>
            <span className="font-label-md text-label-md">Contacto</span>
          </Link>
          <Link href="/vender">
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-md">
              Publicar
            </button>
          </Link>
          <Link href={session ? "/admin" : "/admin/login"} className="hidden lg:flex items-center justify-center w-auto px-4 h-10 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all gap-2" title={session ? "Ir al Dashboard" : "Acceso Administrativo"}>
            <span className="material-symbols-outlined text-[20px]">{session ? "dashboard" : "person"}</span>
            {session && <span className="font-label-md text-[13px]">Dashboard</span>}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary p-2 flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[28px]">{isMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-surface dark:bg-surface-container-highest shadow-lg border-t border-outline-variant/30 flex flex-col p-6 space-y-4 z-40 pb-24">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-label-md text-label-md py-2 px-4 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary font-bold" 
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            );
          })}
          <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-3">
            <Link 
              href={session ? "/admin" : "/admin/login"}
              onClick={() => setIsMenuOpen(false)}
              className="font-label-md text-label-md text-center py-3 border border-outline rounded-lg text-primary hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">{session ? "dashboard" : "person"}</span>
              {session ? "Dashboard" : "Acceso Admin"}
            </Link>
            <Link 
              href="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className="font-label-md text-label-md text-center py-3 border border-outline rounded-lg text-primary hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
