'use client';
import { useState, useEffect } from 'react';

export default function SettingsForm() {
  const [logoPreview, setLogoPreview] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuBZAmb0vC4unzvHS9v5JfK2ae35nKQyWZwGS4VO9SO4TMtHJyEcFhrmsvMNh2aDhTFWMggrEdFefRHgRI_WwN4iN3L89XOV1lodjrF6wgvgz8x2Hazlbte6wkjBMJHaVLD6IF_WJNH4BzckeDNBKphSbKbWRAbYnlUoElsOE-5CPoerW7fWSAEZmr9mUC9aD757Dqlo_ThhdsY-Qv_XGOWunAcYvHYNHAWpuJXqVO6vzLuMOkNAi0N2UB3L0kdFxqKZ-3ViR_I34To");
  const [heroImagePreview, setHeroImagePreview] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuDpMvk0dl6EsGv5KQsJVAzwFsHV3yAHMJyQteyHvOuRny-qcBpNNIeRPgBD2_067WvUPBpX2wctU-j0HS3Bx23zwQ-04fZEdNlIty8MCXZk7VV_eVdOfeyPu5L4xdDeYPfq4F9c90CuDHwsMAfuVEhmS1AmckC8sthTUMAZGGL4FtC1tOaH4AOGIUWzSOhv_OmtHUilm-VhznKaAEIDoIjEell-gLnl-388i1HU6rPuFmnb95UrEZqJ_95osTAzaTtadKN2Ue2Dn8o");
  const [agencyName, setAgencyName] = useState("Ivonne Marin Asesora Inmobiliaria");
  const [whatsapp, setWhatsapp] = useState("+57 300 000 0000");
  const [address, setAddress] = useState("Pereira, Eje Cafetero, Colombia");
  const [instagram, setInstagram] = useState("https://instagram.com/");
  const [facebook, setFacebook] = useState("https://facebook.com/");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.logoUrl) setLogoPreview(data.logoUrl);
        if (data.heroImage) setHeroImagePreview(data.heroImage);
        if (data.agencyName) setAgencyName(data.agencyName);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
        if (data.address) setAddress(data.address);
        if (data.instagram) setInstagram(data.instagram);
        if (data.facebook) setFacebook(data.facebook);
      }
    } catch (err) {
      console.error(err);
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
          alert("Error al subir logo");
        }
      } catch (err) {
        alert("Error de red");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleHeroChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setHeroImagePreview(data.url);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoUrl: logoPreview,
          heroImage: heroImagePreview,
          agencyName,
          whatsapp,
          address,
          instagram,
          facebook
        })
      });
      if (res.ok) {
        alert("Configuración de empresa guardada con éxito.");
      } else {
        alert("Error al guardar la configuración");
      }
    } catch (err) {
      alert("Error de red");
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
            <img className="w-full h-full object-cover" src={logoPreview} alt="Logo de empresa" />
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
          </div>
          <h3 className="font-headline-md text-headline-md text-on-background mb-2">Logo Principal</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">Formato recomendado: PNG transparente, 500x500px.</p>
          
          <label className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">upload</span>
            Subir Nuevo Logo
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>

          <div className="w-full mt-8 border-t border-outline-variant/30 pt-8 flex flex-col items-center">
            <h3 className="font-headline-md text-headline-md text-on-background mb-2">Imagen Principal (Inicio)</h3>
            <div className="w-full h-32 rounded-lg bg-surface-container flex items-center justify-center mb-4 overflow-hidden border-2 border-outline-variant border-dashed relative">
              <img className="w-full h-full object-cover" src={heroImagePreview} alt="Imagen principal" />
              {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
            </div>
            
            <label className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined">upload</span>
              Cambiar Imagen Hero
              <input type="file" accept="image/*" className="hidden" onChange={handleHeroChange} />
            </label>
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
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">link</span>
              <input value={instagram} onChange={e => setInstagram(e.target.value)} className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" placeholder="URL de Instagram" type="url" />
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">link</span>
              <input value={facebook} onChange={e => setFacebook(e.target.value)} className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" placeholder="URL de Facebook" type="url" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6">
        <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2">
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
}
