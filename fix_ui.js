const fs = require('fs');

// 1. Fix Nosotros page
let nos = fs.readFileSync('src/app/nosotros/page.tsx', 'utf8');
nos = nos.replace('<main className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">', '<main className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container overflow-hidden">');
nos = nos.replace('h1 className="font-display-lg text-display-lg text-primary"', 'h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg text-primary leading-tight"');
nos = nos.replace(/text-\[180px\]/g, 'text-[100px] md:text-[180px]');
nos = nos.replace(/text-display-md/g, 'text-3xl md:text-4xl lg:text-display-md');
fs.writeFileSync('src/app/nosotros/page.tsx', nos);

// 2. Fix Footer text-justify
let foot = fs.readFileSync('src/components/PublicFooter.tsx', 'utf8');
foot = foot.replace('text-justify md:text-center', 'text-left md:text-center');
foot = foot.replace('px-margin-mobile flex flex-col', 'px-margin-mobile flex flex-col pb-8');
fs.writeFileSync('src/components/PublicFooter.tsx', foot);

// 3. Fix PublicNavbar
let nav = fs.readFileSync('src/components/PublicNavbar.tsx', 'utf8');
// Add useEffect import if not present
if (!nav.includes('useEffect')) {
    nav = nav.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";');
}

// Add scroll lock effect
const effectCode = `
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
`;

nav = nav.replace('const navLinks = [', effectCode + '\n  const navLinks = [');

// Add icons to navLinks
nav = nav.replace('{ label: "Inicio", href: "/" }', '{ label: "Inicio", href: "/", icon: "home" }');
nav = nav.replace('{ label: "Inmuebles", href: "/propiedades" }', '{ label: "Inmuebles", href: "/propiedades", icon: "domain" }');
nav = nav.replace('{ label: "Nosotros", href: "/nosotros" }', '{ label: "Nosotros", href: "/nosotros", icon: "groups" }');
nav = nav.replace('{ label: "Vender", href: "/vender" }', '{ label: "Vender", href: "/vender", icon: "sell" }');
nav = nav.replace('{ label: "Arrendar", href: "/arrendar" }', '{ label: "Arrendar", href: "/arrendar", icon: "key" }');
nav = nav.replace('{ label: "Blog", href: "/blog" }', '{ label: "Blog", href: "/blog", icon: "article" }');

// Replace mobile menu rendering to be full screen and beautiful with icons
const oldMobileMenu = `{isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface dark:bg-surface-container-highest shadow-lg border-t border-outline-variant/30 flex flex-col p-4 space-y-4">`;

const newMobileMenu = `{isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-surface dark:bg-surface-container-highest shadow-lg border-t border-outline-variant/30 flex flex-col p-6 space-y-4 z-40 pb-24">`;

nav = nav.replace(oldMobileMenu, newMobileMenu);

const oldLinkRender = `{link.label}
              </Link>`;
const newLinkRender = `<div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  {link.label}
                </div>
              </Link>`;
nav = nav.replace(new RegExp(oldLinkRender, 'g'), newLinkRender);

fs.writeFileSync('src/components/PublicNavbar.tsx', nav);
console.log("Applied UI fixes");
