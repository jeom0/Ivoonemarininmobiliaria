"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setError("");
    setLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales inválidas. Por favor intente de nuevo.");
      } else {
        router.push('/admin');
        router.refresh(); // Refresh to update session state across client
      }
    } catch (err) {
      setError("Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute inset-0 pattern-bg pointer-events-none"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="min-h-screen bg-[#eff6ed] flex flex-col relative overflow-hidden">
        <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="w-full max-w-md">

            <div className="text-center mb-base">
              <div className="inline-flex items-center justify-center mb-8">
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2" style={{"fontVariationSettings":"\"FILL\" 1"}}>home_work</span>
                    <div className="flex flex-col items-start leading-none">
                      <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">ivonne marin.</h1>
                      <p className="font-label-md text-[10px] tracking-[0.2em] text-secondary opacity-80 mt-1 uppercase">asesora inmobiliaria</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl ambient-shadow border border-outline-variant/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <header className="mb-8">
                <h2 className="font-headline-md text-headline-md text-primary mb-2">Ingresar al sistema</h2>
                <p className="font-body-md text-body-md text-on-surface-variant opacity-80">Panel privado de administración inmobiliaria.</p>
              </header>
              
              {error && (
                <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-lg flex items-center gap-2 font-body-md text-sm">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Correo Electrónico</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50 group-focus-within:text-primary transition-colors">mail</span>
                    <input 
                      className="w-full pl-11 pr-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md focus-ring transition-all" 
                      id="email" 
                      placeholder="nombre@ivonnemarin.com" 
                      required 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Contraseña</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50 group-focus-within:text-primary transition-colors">lock</span>
                    <input 
                      className="w-full pl-11 pr-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md focus-ring transition-all" 
                      id="password" 
                      placeholder="••••••••" 
                      required 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input className="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all" type="checkbox"/>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">Recordarme</span>
                  </label>
                  <Link className="font-label-md text-label-md text-secondary hover:text-primary transition-colors hover:underline decoration-1 underline-offset-4" href="#">
                    Recuperar contraseña
                  </Link>
                </div>

                <button 
                  className="w-full bg-primary-container text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 py-4 rounded-lg font-headline-md text-[18px] shadow-lg shadow-primary/10 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? "Validando..." : "Ingresar al dashboard"}</span>
                  {!loading && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">login</span>}
                </button>
              </form>

            </div>

            <div className="mt-8 flex justify-center gap-8">
              <Link className="font-label-md text-[12px] text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Ayuda técnica</Link>
              <Link className="font-label-md text-[12px] text-on-surface-variant/70 hover:text-primary transition-colors" href="/">Ivonne Marin Web</Link>
              <Link className="font-label-md text-[12px] text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Privacidad</Link>
            </div>
          </div>
        </main>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <img className="w-full h-full object-cover" alt="Fondo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSSvwF1FY7ggI1RI-dqgo3-sCyA-T7pWjVQueK5hD1fuvqfX7vtjYpDcmSCDiyn7nTg5zYtFbsjbcTkA3nrIUcK2spSGR7ZPTIhue-AlGMpEbv7jYzi5v_ze1b6-GFKo2C3ZW28jP7zFYW_8MM-OLsOcVZk9PnNrmfh-JMEIFxnLaywUYsLy4mFp8WeAd8gP3mdAbygzpABYmtnYqD4madoQ1X42bfEexA4k7FOJu1hcaNKBk4cGIlTylO9aC2JSiY8S34CzbZS64"/>
      </div>
    </>
  );
}
    