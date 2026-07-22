import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="docked full-width top-0 sticky z-50 glass-nav shadow-sm h-20 transition-all bg-surface/80 dark:bg-surface-container-highest/80 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-base md:px-margin-desktop max-w-container-max mx-auto h-full">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="text-headline-md font-headline-lg text-primary tracking-tight cursor-pointer">
              Ivonne Marin
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link className="font-bold text-primary hover:text-primary-fixed-dim transition-colors duration-300 font-label-md text-label-md" href="/">Inicio</Link>
          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="/propiedades">Inmuebles</Link>
          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="/blog">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">chat</span>
            <span className="font-label-md text-label-md">Contacto</span>
          </button>
          <Link href="/admin/login">
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-md">
              Publicar
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
