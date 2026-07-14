"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { LayoutDashboard, Home, Users, Settings, LogOut, FileText, Menu, X } from "lucide-react"
import { useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Redirect to login if unauthenticated (should be handled by middleware mostly, but good for client side)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p>Cargando...</p></div>
  }

  if (status === "unauthenticated" || !session) {
    return null; // Will redirect
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { label: "Inmuebles", href: "/admin/properties", icon: <Home size={20} /> },
    { label: "Leads / Visitas", href: "/admin/leads", icon: <Users size={20} /> },
    { label: "Blog", href: "/admin/blog", icon: <FileText size={20} /> },
    { label: "Configuración", href: "/admin/settings", icon: <Settings size={20} /> },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-outline-variant">
        <h1 className="font-bold text-primary-container text-xl">Ivonne Marín</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-on-surface">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-surface border-r border-outline-variant/30 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 hidden md:block">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-primary-container tracking-tight">Ivonne Marín</h1>
            <p className="text-[10px] uppercase tracking-widest text-secondary mt-1 font-semibold">Premium Real Estate</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">Menú Principal</p>
          {menuItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-semibold text-sm ${
                pathname === item.href 
                  ? "bg-primary text-white shadow-md" 
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant/30">
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 w-full rounded-lg transition-all font-semibold text-sm"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8 hidden md:flex">
          <div>
            <h2 className="text-2xl font-bold text-primary tracking-tighter">Bienvenida, {session.user?.name || 'Admin'}</h2>
            <p className="text-sm text-on-surface-variant">Aquí tienes el resumen de tu actividad.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">
               IM
             </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}
