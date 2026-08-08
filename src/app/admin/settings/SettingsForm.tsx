'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsForm() {
  const [logoPreview, setLogoPreview] = useState("");
  const [heroMedia, setHeroMedia] = useState<string[]>([]);
  const [agencyName, setAgencyName] = useState("Ivonne Marin Asesora Inmobiliaria");
  const [whatsapp, setWhatsapp] = useState("+57 300 000 0000");
  const [address, setAddress] = useState("Santa Rosa de Cabal, Risaralda, Colombia");
  const [socialLinks, setSocialLinks] = useState<{platform: string, url: string}[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<{title: string, type: 'success' | 'error'} | null>(null);

  const showToast = (title: string, type: 'success' | 'error') => {
    setToastMessage({title, type});
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.logoUrl) setLogoPreview(data.logoUrl);
        if (data.hero_media) {
          try {
            const parsed = JSON.parse(data.hero_media);
            if (parsed && parsed.length > 0) {
              setHeroMedia(parsed);
            } else {
              setHeroMedia(["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100"]);
            }
          } catch(e){
            setHeroMedia(["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100"]);
          }
        } else if (data.heroImage) {
          setHeroMedia([data.heroImage]);
        } else {
          setHeroMedia(["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=100"]);
        }
        if (data.agencyName) setAgencyName(data.agencyName);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
        if (data.address) setAddress(data.address);
        if (data.social_links) {
          try {
            setSocialLinks(JSON.parse(data.social_links));
          } catch(e){}
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'logo' | 'hero') => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (type === 'logo') setLogoPreview(data.url);
        if (type === 'hero') setHeroMedia([...heroMedia, data.url]);
      } else {
        showToast("Error al subir archivo", 'error');
      }
    } catch (err) {
      showToast("Error de red", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setLogoPreview(data.url);
        } else {
          showToast("Error al subir logo", 'error');
        }
      } catch (err) {
        showToast("Error de red", 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoUrl: logoPreview,
          hero_media: JSON.stringify(heroMedia),
          agencyName,
          whatsapp,
          address,
          social_links: JSON.stringify(socialLinks)
        })
      });
      if (res.ok) {
        showToast("Configuración de empresa guardada con éxito.", 'success');
        router.refresh();
      } else {
        showToast("Error al guardar la configuración", 'error');
      }
    } catch (err) {
      showToast("Error de red", 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Cargando configuración...</p>;

  return (
    <div className="space-y-8 fade-in" id="content-empresa">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-secondary-fixed-dim/30 shadow-sm col-span-1 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center mb-6 overflow-hidden border-2 border-outline-variant border-dashed relative">
            {logoPreview ? (
              <img className="w-full h-full object-cover" src={logoPreview} alt="Logo de empresa" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="material-symbols-outlined text-outline text-3xl mb-1">image_not_supported</span>
                <span className="text-[10px] text-outline font-bold leading-tight">No hay logo.<br/>Por favor sube uno.</span>
              </div>
            )}
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
          </div>
          <h3 className="font-headline-md text-headline-md text-on-background mb-2">Logo Principal</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">Formato recomendado: PNG transparente, 500x500px.</p>
          
          <label className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">upload</span>
            Subir Nuevo Logo
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>

          <div className="w-full mt-8 border-t border-outline-variant/30 pt-8 flex flex-col">
            <h3 className="font-headline-md text-headline-md text-on-background mb-2">Imagen/Video Principal (Hero)</h3>
            <p className="text-[12px] text-on-surface-variant mb-4">Sube imágenes o videos (.mp4) para armar el carrusel de portada.</p>
            
            <div className="flex gap-4 overflow-x-auto pb-4">
              {heroMedia.map((media, idx) => (
                <div key={idx} className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden border border-outline-variant group">
                  {media.match(/\.(mp4|webm|ogg)$/i) || media.includes('video') ? (
                    <video src={media} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={media} className="w-full h-full object-cover" />
                  )}
                  <button 
                    onClick={() => {
                      const newMedia = [...heroMedia];
                      newMedia.splice(idx, 1);
                      setHeroMedia(newMedia);
                    }}
                    type="button"
                    className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
              
              <div className="relative w-40 h-24 shrink-0 rounded-lg border-2 border-dashed border-outline-variant bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-outline">add_photo_alternate</span>
                <span className="text-[10px] text-outline font-bold mt-1">Agregar</span>
                {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">...</div>}
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={(e) => { if(e.target.files) handleImageUpload(e.target.files[0], 'hero') }} 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-8 border border-secondary-fixed-dim/30 shadow-sm md:col-span-2 space-y-6">
          <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4">Información de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-md text-label-md text-on-background mb-2">Nombre de la Agencia</label>
              <input value={agencyName} onChange={e => setAgencyName(e.target.value)} className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" type="text" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-background mb-2">Número WhatsApp Principal</label>
              <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" type="tel" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-label-md text-on-background mb-2">Dirección de Oficina</label>
              <input value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" type="text" />
            </div>
          </div>
          <h4 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4">Redes Sociales</h4>
          <div className="space-y-4">
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-4 bg-background border border-outline-variant rounded-lg p-2">
                <select 
                  value={social.platform} 
                  onChange={e => {
                    const newLinks = [...socialLinks];
                    newLinks[index].platform = e.target.value;
                    setSocialLinks(newLinks);
                  }}
                  className="bg-transparent border-none focus:outline-none text-on-surface font-label-md max-w-[120px]"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                <input 
                  value={social.url} 
                  onChange={e => {
                    const newLinks = [...socialLinks];
                    newLinks[index].url = e.target.value;
                    setSocialLinks(newLinks);
                  }}
                  className="flex-1 bg-transparent border-l border-outline-variant pl-4 focus:outline-none text-body-md text-on-background" 
                  placeholder="URL de la red social" 
                  type="url" 
                />
                <button 
                  onClick={() => {
                    const newLinks = [...socialLinks];
                    newLinks.splice(index, 1);
                    setSocialLinks(newLinks);
                  }}
                  className="text-error hover:bg-error-container p-2 rounded-md transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))}
            <button 
              onClick={() => setSocialLinks([...socialLinks, {platform: 'instagram', url: ''}])}
              className="text-primary font-label-md flex items-center gap-2 hover:underline p-2"
            >
              <span className="material-symbols-outlined">add</span> Agregar Red Social
            </button>
          </div>

          <h4 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4 text-error">Seguridad</h4>
          <div className="bg-error-container/30 border border-error/30 p-6 rounded-xl">
            <h5 className="font-label-md text-label-md text-on-background mb-2">Cambiar Contraseña de Ingreso</h5>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input 
                type="password" 
                id="new-password"
                placeholder="Nueva Contraseña" 
                className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-error focus:ring-1 focus:ring-error font-body-md text-body-md text-on-background transition-all" 
              />
              <button 
                onClick={async () => {
                  const input = document.getElementById('new-password') as HTMLInputElement;
                  if (!input.value) return showToast('Por favor, escribe una nueva contraseña.', 'error');
                  try {
                    const res = await fetch('/api/users/profile', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ password: input.value })
                    });
                    if (res.ok) {
                      showToast('Contraseña actualizada con éxito.', 'success');
                      input.value = '';
                    } else {
                      showToast('Hubo un error al actualizar la contraseña.', 'error');
                    }
                  } catch (e) {
                    showToast('Error de red al actualizar contraseña.', 'error');
                  }
                }}
                className="bg-error text-white font-label-md text-label-md py-3 px-6 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Actualizar Contraseña
              </button>
            </div>
            <p className="text-[12px] text-on-surface-variant mt-2">Esta será la nueva contraseña que utilizarás para ingresar al panel administrativo con el correo givon676@gmail.com.</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6">
        <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2">
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <>
          <style>{`
            @keyframes slideUpFade {
              from { opacity: 0; transform: translate(-50%, 30px) scale(0.95); }
              to { opacity: 1; transform: translate(-50%, 0) scale(1); }
            }
            .animate-toast { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          `}</style>
          <div className="fixed bottom-10 left-1/2 z-[100] animate-toast pointer-events-none">
            <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border ${toastMessage.type === 'success' ? 'bg-primary text-on-primary border-primary/20' : 'bg-error text-on-error border-error/20'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toastMessage.type === 'success' ? 'bg-white/20' : 'bg-white/20'}`}>
                <span className="material-symbols-outlined text-2xl">
                  {toastMessage.type === 'success' ? 'check_circle' : 'error'}
                </span>
              </div>
              <div>
                <p className="font-label-lg font-bold tracking-wide">{toastMessage.type === 'success' ? '¡Éxito!' : 'Oops...'}</p>
                <p className="font-body-md opacity-90">{toastMessage.title}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
