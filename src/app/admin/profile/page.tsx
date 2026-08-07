"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState("");

  useEffect(() => {
    fetch('/api/users/profile')
      .then(res => res.json())
      .then(data => {
        setUserProfile(data);
        if (data.email) setNewEmail(data.email);
      })
      .catch(console.error);
    if (session?.user) {
      setName(session.user.name || "");
      setImagePreview(session.user.image || "");
    }
  }, [session]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          setImagePreview(data.url);
        } else {
          alert("Error al subir imagen");
        }
      } catch (err) {
        alert("Error de red");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSendCode = async () => {
    if (!newEmail || newEmail === userProfile?.email) {
      alert("Ingresa un correo nuevo distinto al actual");
      return;
    }
    setEmailStatusMsg("Enviando código...");
    try {
      const res = await fetch('/api/users/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setIsVerifying(true);
        setEmailStatusMsg("Código enviado al nuevo correo.");
      } else {
        setEmailStatusMsg(data.error || "Error al enviar código.");
      }
    } catch (err) {
      setEmailStatusMsg("Error de red");
    }
  };

  const handleConfirmCode = async () => {
    if (!verificationCode) return;
    setEmailStatusMsg("Verificando...");
    try {
      const res = await fetch('/api/users/verify/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail, code: verificationCode })
      });
      const data = await res.json();
      if (res.ok) {
        alert("¡Correo cambiado con éxito!");
        setIsVerifying(false);
        setVerificationCode("");
        setEmailStatusMsg("");
        // Reload page to update session
        window.location.reload();
      } else {
        setEmailStatusMsg(data.error || "Código incorrecto.");
      }
    } catch (err) {
      setEmailStatusMsg("Error de red");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          image: imagePreview,
          password: password || undefined
        })
      });

      if (res.ok) {
        // Update local session
        await update({ name, image: imagePreview });
        alert("Perfil actualizado correctamente");
        setPassword("");
        setConfirmPassword("");
        router.refresh();
      } else {
        alert("Error al actualizar perfil");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red");
    } finally {
      setSaving(false);
    }
  };

  if (!session) return <p className="p-8 font-body-md text-on-surface-variant">Cargando perfil...</p>;

  return (
    <>
      <header className="mb-section-gap max-w-2xl mx-auto">
        <h2 className="font-display-lg text-display-lg text-primary mb-2">Mi Perfil</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Actualiza tu foto, nombre y contraseña de acceso.</p>
      </header>

      <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-sm">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center mb-4 overflow-hidden border-4 border-primary/20 relative group">
              {imagePreview ? (
                <img className="w-full h-full object-cover" src={imagePreview} alt="Perfil" />
              ) : (
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant">person</span>
              )}
              {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
              
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="material-symbols-outlined mb-1">photo_camera</span>
                <span className="text-xs font-label-md">Cambiar</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <p className="text-sm text-on-surface-variant text-center max-w-xs">Haz clic en la imagen para subir una nueva foto de perfil (PNG o JPG).</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-label-md text-on-surface mb-2">Nombre Completo</label>
              <input 
                required 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-label-md text-on-surface mb-2">
                Correo Electrónico 
                {userProfile?.emailChanged ? (
                  <span className="text-xs font-normal text-on-surface-variant ml-2">(Ya no se puede cambiar)</span>
                ) : (
                  <span className="text-xs font-normal text-primary ml-2">(Puedes cambiarlo 1 sola vez)</span>
                )}
              </label>
              
              <div className="flex gap-2 items-start">
                <div className="flex-1">
                  <input 
                    disabled={userProfile?.emailChanged || isVerifying} 
                    type="email" 
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)}
                    className={`w-full border border-outline-variant/50 text-on-surface rounded-xl px-4 py-3 ${userProfile?.emailChanged ? 'bg-surface-container cursor-not-allowed text-on-surface-variant' : 'bg-background focus:border-primary focus:ring-1 focus:ring-primary'}`} 
                  />
                  {emailStatusMsg && <p className="text-xs text-primary mt-1">{emailStatusMsg}</p>}
                </div>
                
                {!userProfile?.emailChanged && newEmail !== userProfile?.email && !isVerifying && (
                  <button 
                    type="button" 
                    onClick={handleSendCode}
                    className="bg-secondary text-on-secondary px-4 py-3 rounded-xl font-label-md whitespace-nowrap"
                  >
                    Verificar
                  </button>
                )}
              </div>

              {isVerifying && (
                <div className="mt-4 p-4 bg-primary-container/20 rounded-xl border border-primary/30 flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Código de 6 dígitos" 
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                    className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-2"
                  />
                  <button 
                    type="button" 
                    onClick={handleConfirmCode}
                    className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md"
                  >
                    Confirmar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsVerifying(false)}
                    className="text-on-surface-variant px-2 hover:text-error"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-outline-variant/30">
              <h4 className="font-headline-md text-primary mb-4">Cambiar Contraseña</h4>
              <p className="text-sm text-on-surface-variant mb-4">Deja estos campos en blanco si no deseas cambiar tu contraseña actual.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label-md text-on-surface mb-2">Nueva Contraseña</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface mb-2">Confirmar Contraseña</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    placeholder="Repite la contraseña"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
              {!saving && <span className="material-symbols-outlined text-[18px]">save</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
