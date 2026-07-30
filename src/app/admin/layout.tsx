"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import NotificationsDropdown from "./components/NotificationsDropdown"
import { useEffect, useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  // By default sidebar is open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  // iOS Safari bulletproof scroll lock
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + window.scrollY + 'px';
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [sidebarOpen, isMobile]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) setSidebarOpen(false)
    else setSidebarOpen(true)
  }, [isMobile])

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== '/admin/login') {
      router.push("/admin/login")
    }
  }, [status, pathname, router])

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p className="font-label-md text-primary">Cargando...</p></div>
  }

  if (status === "unauthenticated" || !session) {
    return null;
  }

  const allNavItems = [
    { id: 'dashboard', name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { id: 'inmuebles', name: 'Inmuebles', href: '/admin/properties', icon: 'home_work' },
    { id: 'leads', name: 'Leads', href: '/admin/leads', icon: 'person_search' },
    { id: 'agenda', name: 'Visitas', href: '/admin/agenda', icon: 'calendar_month' },
    { id: 'blog', name: 'Blog', href: '/admin/blog', icon: 'article' },
    { id: 'reportes', name: 'Reportes', href: '/admin/reports', icon: 'analytics' },
    { id: 'configuracion', name: 'Configuración', href: '/admin/settings', icon: 'settings' },
    { id: 'ayuda', name: 'Tutoriales', href: '/admin/ayuda', icon: 'local_library' },
  ];

  let permissions: string[] = [];
  try {
    const userPerms = (session.user as any).permissions;
    permissions = userPerms ? (typeof userPerms === 'string' ? JSON.parse(userPerms) : userPerms) : [];
  } catch(e) {}

  const navItems = (session.user as any).role === 'ADMIN' 
    ? allNavItems 
    : allNavItems.filter(item => item.id === 'dashboard' || item.id === 'ayuda' || permissions.includes(item.id));

  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Mobile Sidebar Overlay (Only on small screens) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[45] transition-opacity md:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant/30 z-40 flex items-center justify-between px-4 shadow-sm">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col items-center justify-center">
          <span className="font-headline-md text-primary font-bold tracking-tighter text-lg leading-none">ivonne</span>
          <span className="font-headline-md text-primary font-bold tracking-tighter text-lg leading-none -mt-1">marin.</span>
        </div>
        <NotificationsDropdown />
      </div>

      {/* SideNavBar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen bg-surface-container border-r border-outline-variant/20 shadow-md flex flex-col p-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] shrink-0 overflow-y-auto overscroll-contain ${
        sidebarOpen ? 'w-full md:w-64 translate-x-0' : '-translate-x-full w-full md:w-20 md:translate-x-0'
      }`}>
        {/* Header/Logo section */}
        <div className={`mb-10 mt-2 flex items-center h-12 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${sidebarOpen ? 'justify-between px-2' : 'justify-center w-full'}`}>
            {/* Desktop Full Logo */}
            <div className={`flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!sidebarOpen ? 'w-0 opacity-0' : 'w-24 opacity-100'}`}>
              <span className="font-headline-md text-primary font-bold tracking-tighter text-2xl">ivonne</span>
              <span className="font-headline-md text-primary font-bold tracking-tighter text-2xl -mt-2">marin.</span>
            </div>
            
            {/* Desktop Hamburger Toggle (Inside sidebar) */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-300 shrink-0"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            {/* Mobile Close Button */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden flex p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-300 shrink-0"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
        </div>
        
        <div className="mb-6 px-2">
            <Link href="/admin/profile" title={!sidebarOpen ? "Mi Perfil" : undefined} className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${sidebarOpen ? 'gap-3 hover:bg-surface-container-high py-2 rounded-xl' : 'justify-center'} w-full group cursor-pointer`}>
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center overflow-hidden border-2 border-primary-fixed shrink-0 group-hover:border-primary transition-colors">
                    {session.user?.image ? (
                        <img className="w-full h-full object-cover" src={session.user.image as string} alt={session.user.name || "Usuario"} />
                    ) : (
                        <span className="font-bold text-lg">{session.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "AD"}</span>
                    )}
                </div>
                <div className={`flex flex-col text-left overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!sidebarOpen ? 'opacity-0 w-0' : 'opacity-100 w-[140px]'}`}>
                    <span className="font-label-md text-on-surface font-bold truncate w-full group-hover:text-primary transition-colors">{session.user?.name || "Administrador"}</span>
                    <span className="text-[12px] text-on-surface-variant truncate w-full">{session.user?.email}</span>
                </div>
            </Link>
        </div>

        <nav className="flex-1 space-y-1">
            {navItems.map(item => {
                const isActive = pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin');
                return (
                    <Link 
                        key={item.name}
                        href={item.href}
                        onClick={() => { if (window.innerWidth < 768) setSidebarOpen(false) }}
                        title={!sidebarOpen ? item.name : undefined}
                        className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-lg transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isActive ? 'bg-[#5c1212] text-[#e17770] font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'} ${isActive && sidebarOpen ? 'translate-x-2' : ''}`}
                    >
                        <span className="material-symbols-outlined shrink-0 transition-transform duration-500">{item.icon}</span>
                        <span className={`font-label-md text-label-md whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!sidebarOpen ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>{item.name}</span>
                    </Link>
                )
            })}
        </nav>
        
        <div className="mt-auto border-t border-outline-variant/30 pt-4 w-full transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
            <div className="space-y-1">
                <a href="https://wa.me/573000000000?text=Hola,%20necesito%20ayuda%20con%20el%20panel%20de%20administraci%C3%B3n" target="_blank" rel="noopener noreferrer" title={!sidebarOpen ? "Ayuda" : undefined} className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-2 text-on-surface-variant hover:bg-surface-container-high transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-lg`}>
                    <span className="material-symbols-outlined shrink-0">help</span>
                    <span className={`font-label-md text-label-md whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!sidebarOpen ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>Ayuda</span>
                </a>
                <button onClick={() => signOut()} title={!sidebarOpen ? "Cerrar Sesión" : undefined} className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-2 text-error hover:bg-error-container/20 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-lg`}>
                    <span className="material-symbols-outlined shrink-0">logout</span>
                    <span className={`font-label-md text-label-md whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${!sidebarOpen ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>Cerrar Sesión</span>
                </button>
            </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className={`flex-1 min-h-screen bg-background overflow-x-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:p-8 p-4 pt-24 md:pt-8`}>
        {children}
      </main>
    </div>
  )
}
