"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })
    
    if (res?.error) {
      setError("Credenciales inválidas")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <div className="absolute inset-0 pattern-bg pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <main className="flex-grow flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-container mb-2">Ivonne Marín</h1>
            <p className="text-on-surface-variant">Panel de Administración</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-xl ambient-shadow border border-surface-variant">
            {error && <div className="mb-4 text-error text-sm text-center">{error}</div>}
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-on-surface">Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest" 
                placeholder="admin@ivonnemarin.com"
                required 
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2 text-on-surface">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus-ring bg-surface-container-lowest" 
                placeholder="••••••••"
                required 
              />
            </div>
            
            <button type="submit" className="w-full bg-primary-container text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors">
              Ingresar
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
