'use client';
import { useState, useEffect } from 'react';

export default function WebsiteTab() {
  const [homeHeroTitle, setHomeHeroTitle] = useState("");
  const [homeHeroSubtitle, setHomeHeroSubtitle] = useState("");
  const [homeAboutTitle, setHomeAboutTitle] = useState("");
  const [homeAboutText, setHomeAboutText] = useState("");
  const [homeSections, setHomeSections] = useState([
    { id: 'hero', name: 'Buscador Principal (Hero)' },
    { id: 'featured', name: 'Propiedades Destacadas' },
    { id: 'about', name: 'Sección Conócenos' },
    { id: 'novedades', name: 'Novedades (Nuevos Inmuebles)' },
    { id: 'investment', name: 'Oportunidades de Inversión' },
    { id: 'blog', name: 'Blog Inmobiliario' },
    { id: 'valor', name: 'Valor Diferencial (Confianza)' },
    { id: 'servicios', name: 'Soluciones Integrales' },
    { id: 'zonas', name: 'Explora Nuestras Zonas' },
    { id: 'cta', name: 'Banner Final (Llamado a la acción)' }
  ]);
  const [navLinks, setNavLinks] = useState([
    { label: "Inicio", href: "/", icon: "home" },
    { label: "Inmuebles", href: "/propiedades", icon: "domain" },
    { label: "Nosotros", href: "/nosotros", icon: "groups" },
    { label: "Vender", href: "/vender", icon: "sell" },
    { label: "Arrendar", href: "/arrendar", icon: "key" },
    { label: "Blog", href: "/blog", icon: "article" }
  ]);
  const [zones, setZones] = useState<{name: string, subtitle: string, image: string}[]>([
    { name: "Santa Rosa de Cabal", subtitle: "Sede Principal", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Pereira", subtitle: "El corazón del Eje", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_L0yirY1K-zQ9Rz61Iw9XrgwEOFOYHsz9Mi4C2GL8iMlUk_7DKzJxq4WEuwF45iYPUrfjyGzV8aLQsVJuWb_VMhpzMDmO8P0SfgipYahQLy4sLsU97cD7jfgBeWpcKARpB95kDvRsW9_v97y1rbCzwKWHhgkcO6FakcTLb9mY3Nr_iUCMoTKBiHBSYxYEs2nU-woY8NESiX3BQMkIZFFnrttSqrnC0JfiIv4lv13mNQ_2rKUpzMdDXCkEFQ0d919ch-mo-zIBq4I" },
    { name: "Cerritos", subtitle: "Exclusividad y naturaleza", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPz50Z_yrUQy_PEMzeJA2eT4nypHRgxNRk-0T-vFLVb39xuLpnMfHTonvsMRjqB2THZvSxRAYxEWhvByzcg4WohUG3N0sGrC4dAm8-aj_ibb7u7gFrvOb1B1nAhp9RHG4vLpGCxTM4iFxI-XyRYNg9LyIPlO8Co1yST8yYfQi7Sr1Tnp1I5L8fNFHNx_OwLUKV0BvtrWKviQub-4PpeJrGDMDuFUe7hLI_fG0XEK1SQ31arPzqVCh7zmsWKeNDLR6e4pYkztEeg4" },
    { name: "Dosquebradas", subtitle: "Crecimiento residencial", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKqj1ingSzkGRB-XKNQQfj48LN2rQQAusPghCy0vMX7bylVfR_CLzlPDAcSAm5ekKFLOS9a1T9MgiaYA-vyO0Uygl7WtoqIhPii4oAbcLWt6hBElIFrykUxjD_191VB5HZ7jvZs1YxTAEoFMkKWJcPXBI6NIVmpRlqBERrRCAOCtQ-bOSwsSCQd99FGv0np91wa-6mOMi85DH2tV3wVOUI7qzOa2R1oy8C5tb2_OYZWMZQnIK9hwDsY0G-kXXDOA4DqFfn7SNcq7U" }
  ]);
  const [uploadingImage, setUploadingImage] = useState<number | null>(null);

  
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
        setHomeHeroTitle(data.home_hero_title || "Encuentra el inmueble ideal con una asesoría cercana, segura y profesional.");
        setHomeHeroSubtitle(data.home_hero_subtitle || "Te acompañamos en la compra, venta y arriendo de inmuebles en Pereira, Dosquebradas, Santa Rosa de Cabal y el Eje Cafetero.");
        setHomeAboutTitle(data.home_about_title || '"Donde los sueños encuentran su lugar."');
        setHomeAboutText(data.home_about_text || "Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso.");
        if (data.home_sections_order) {
          try { setHomeSections(JSON.parse(data.home_sections_order)); } catch(e){}
        }
        if (data.navbar_links) {
          try { setNavLinks(JSON.parse(data.navbar_links)); } catch(e){}
        }
        if (data.home_zones) {
          try { setZones(JSON.parse(data.home_zones)); } catch(e){}
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const moveSection = (index: number, dir: number) => {
    const newArr = [...homeSections];
    const temp = newArr[index];
    newArr[index] = newArr[index + dir];
    newArr[index + dir] = temp;
    setHomeSections(newArr);
  };
  const moveLink = (index: number, dir: number) => {
    const newArr = [...navLinks];
    const temp = newArr[index];
    newArr[index] = newArr[index + dir];
    newArr[index + dir] = temp;
    setNavLinks(newArr);
  };
  const moveZone = (index: number, dir: number) => {
    const newArr = [...zones];
    const temp = newArr[index];
    newArr[index] = newArr[index + dir];
    newArr[index + dir] = temp;
    setZones(newArr);
  };
  const handleUploadImage = async (file: File, index: number) => {
    setUploadingImage(index);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        const newZones = [...zones];
        newZones[index].image = data.url;
        setZones(newZones);
      } else {
        alert("Error al subir imagen");
      }
    } catch (err) {
      alert("Error de red al subir imagen");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          home_hero_title: homeHeroTitle,
          home_hero_subtitle: homeHeroSubtitle,
          home_about_title: homeAboutTitle,
          home_about_text: homeAboutText,
          home_sections_order: JSON.stringify(homeSections),
          navbar_links: JSON.stringify(navLinks),
          home_zones: JSON.stringify(zones)
        })
      });
      if (res.ok) {
        alert("Configuración del sitio guardada con éxito.");
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
    <div className="space-y-8 fade-in" id="content-sitio">
      <div className="bg-surface-container-lowest rounded-xl p-8 border border-secondary-fixed-dim/30 shadow-sm space-y-6">
        <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4">Textos de Inicio (Hero)</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block font-label-md text-label-md text-on-background mb-2">Título Principal (Hero)</label>
            <input 
              value={homeHeroTitle} 
              onChange={e => setHomeHeroTitle(e.target.value)} 
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" 
              type="text" 
              placeholder="Ej: Encuentra el inmueble ideal con una asesoría..."
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-background mb-2">Subtítulo (Hero)</label>
            <textarea 
              value={homeHeroSubtitle} 
              onChange={e => setHomeHeroSubtitle(e.target.value)} 
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all min-h-[100px]" 
              placeholder="Ej: Te acompañamos en la compra, venta y arriendo..."
            />
          </div>
        </div>

        <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4">Textos de Inicio (Conócenos)</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block font-label-md text-label-md text-on-background mb-2">Título (Nosotros)</label>
            <input 
              value={homeAboutTitle} 
              onChange={e => setHomeAboutTitle(e.target.value)} 
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" 
              type="text" 
              placeholder='Ej: "Donde los sueños encuentran su lugar."'
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-background mb-2">Texto (Nosotros)</label>
            <textarea 
              value={homeAboutText} 
              onChange={e => setHomeAboutText(e.target.value)} 
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all min-h-[150px]" 
              placeholder="Ej: Transformar vidas conectando personas..."
            />
          </div>
        </div>
      
        <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4">Orden de Secciones (Inicio)</h3>
        <p className="text-body-md text-on-surface-variant">Cambia el orden en el que aparecen las secciones en la página principal.</p>
        <div className="space-y-2">
          {homeSections.map((section, idx) => (
            <div key={section.id} className="flex justify-between items-center bg-background border border-outline-variant p-3 rounded-lg">
              <span className="font-label-md">{idx + 1}. {section.name}</span>
              <div className="flex gap-2">
                <button 
                  disabled={idx === 0} 
                  onClick={() => moveSection(idx, -1)} 
                  className="disabled:opacity-30 p-1 hover:bg-surface-container rounded"
                ><span className="material-symbols-outlined text-sm">arrow_upward</span></button>
                <button 
                  disabled={idx === homeSections.length - 1} 
                  onClick={() => moveSection(idx, 1)} 
                  className="disabled:opacity-30 p-1 hover:bg-surface-container rounded"
                ><span className="material-symbols-outlined text-sm">arrow_downward</span></button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4">Menú de Navegación (Navbar)</h3>
        <div className="space-y-3">
          {navLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-3 bg-background border border-outline-variant p-3 rounded-lg items-center">
              <div className="flex gap-1 mr-2">
                <button disabled={idx === 0} onClick={() => moveLink(idx, -1)} className="disabled:opacity-30 p-1 hover:bg-surface-container rounded"><span className="material-symbols-outlined text-xs">arrow_upward</span></button>
                <button disabled={idx === navLinks.length - 1} onClick={() => moveLink(idx, 1)} className="disabled:opacity-30 p-1 hover:bg-surface-container rounded"><span className="material-symbols-outlined text-xs">arrow_downward</span></button>
              </div>
              <input value={link.label} onChange={e => {
                const newLinks = [...navLinks]; newLinks[idx].label = e.target.value; setNavLinks(newLinks);
              }} className="flex-1 border border-outline-variant rounded p-2 text-sm" placeholder="Nombre" />
              <input value={link.href} onChange={e => {
                const newLinks = [...navLinks]; newLinks[idx].href = e.target.value; setNavLinks(newLinks);
              }} className="flex-1 border border-outline-variant rounded p-2 text-sm" placeholder="URL (/ruta)" />
              <input value={link.icon} onChange={e => {
                const newLinks = [...navLinks]; newLinks[idx].icon = e.target.value; setNavLinks(newLinks);
              }} className="w-24 border border-outline-variant rounded p-2 text-sm" placeholder="Icono" />
              <button onClick={() => {
                const newLinks = [...navLinks]; newLinks.splice(idx, 1); setNavLinks(newLinks);
              }} className="text-error hover:bg-error-container p-2 rounded ml-2"><span className="material-symbols-outlined text-sm">delete</span></button>
            </div>
          ))}
          <button onClick={() => setNavLinks([...navLinks, {label: 'Nuevo', href: '/nuevo', icon: 'star'}])} className="text-primary font-label-md flex items-center gap-2 hover:underline p-2">
            <span className="material-symbols-outlined text-sm">add</span> Agregar Link
          </button>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4">Zonas de Cobertura</h3>
        <p className="text-body-md text-on-surface-variant">Configura las zonas que se muestran en el carrusel/grid de la página de inicio. Te recomendamos poner Santa Rosa de Cabal primero.</p>
        <div className="space-y-4">
          {zones.map((zone, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 bg-background border border-outline-variant p-4 rounded-lg items-start">
              <div className="flex gap-1 mr-2 mt-2">
                <button disabled={idx === 0} onClick={() => moveZone(idx, -1)} className="disabled:opacity-30 p-1 hover:bg-surface-container rounded"><span className="material-symbols-outlined text-xs">arrow_upward</span></button>
                <button disabled={idx === zones.length - 1} onClick={() => moveZone(idx, 1)} className="disabled:opacity-30 p-1 hover:bg-surface-container rounded"><span className="material-symbols-outlined text-xs">arrow_downward</span></button>
              </div>
              <div className="flex-1 space-y-3">
                <input value={zone.name} onChange={e => {
                  const newZones = [...zones]; newZones[idx].name = e.target.value; setZones(newZones);
                }} className="w-full border border-outline-variant rounded p-2 text-sm" placeholder="Nombre (Ej: Santa Rosa de Cabal)" />
                <input value={zone.subtitle} onChange={e => {
                  const newZones = [...zones]; newZones[idx].subtitle = e.target.value; setZones(newZones);
                }} className="w-full border border-outline-variant rounded p-2 text-sm" placeholder="Subtítulo (Ej: Sede Principal)" />
              </div>
              <div className="w-full md:w-32 h-24 border border-dashed border-outline-variant rounded-lg relative overflow-hidden flex-shrink-0 bg-surface-container flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
                {zone.image ? (
                  <img src={zone.image} alt={zone.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-outline">image</span>
                )}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white mb-1">upload</span>
                  <span className="text-[10px] text-white">Cambiar</span>
                </div>
                {uploadingImage === idx && (
                   <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs z-10">Cargando...</div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadImage(e.target.files[0], idx);
                    }
                  }}
                />
              </div>
              <button onClick={() => {
                const newZones = [...zones]; newZones.splice(idx, 1); setZones(newZones);
              }} className="text-error hover:bg-error-container p-2 rounded mt-2"><span className="material-symbols-outlined text-sm">delete</span></button>
            </div>
          ))}
          <button onClick={() => setZones([...zones, {name: 'Nueva Zona', subtitle: 'Descripción', image: ''}])} className="text-primary font-label-md flex items-center gap-2 hover:underline p-2">
            <span className="material-symbols-outlined text-sm">add</span> Agregar Zona
          </button>
        </div>


      </div>
      <div className="flex justify-end pt-6">
        <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2">
          {saving ? 'Guardando...' : 'Guardar Textos'}
        </button>
      </div>
    </div>
  );
}
