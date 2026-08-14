const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/WebsiteTab.tsx', 'utf8');

// 1. Add states for Zones
const statesStr = `const [navLinks, setNavLinks] = useState([
    { label: "Inicio", href: "/", icon: "home" },
    { label: "Inmuebles", href: "/propiedades", icon: "domain" },
    { label: "Nosotros", href: "/nosotros", icon: "groups" },
    { label: "Vender", href: "/vender", icon: "sell" },
    { label: "Arrendar", href: "/arrendar", icon: "key" },
    { label: "Blog", href: "/blog", icon: "article" }
  ]);`;

const newStatesStr = statesStr + `
  const [zones, setZones] = useState<{name: string, subtitle: string, image: string}[]>([
    { name: "Santa Rosa de Cabal", subtitle: "Sede Principal", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Pereira", subtitle: "El corazón del Eje", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_L0yirY1K-zQ9Rz61Iw9XrgwEOFOYHsz9Mi4C2GL8iMlUk_7DKzJxq4WEuwF45iYPUrfjyGzV8aLQsVJuWb_VMhpzMDmO8P0SfgipYahQLy4sLsU97cD7jfgBeWpcKARpB95kDvRsW9_v97y1rbCzwKWHhgkcO6FakcTLb9mY3Nr_iUCMoTKBiHBSYxYEs2nU-woY8NESiX3BQMkIZFFnrttSqrnC0JfiIv4lv13mNQ_2rKUpzMdDXCkEFQ0d919ch-mo-zIBq4I" },
    { name: "Cerritos", subtitle: "Exclusividad y naturaleza", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPz50Z_yrUQy_PEMzeJA2eT4nypHRgxNRk-0T-vFLVb39xuLpnMfHTonvsMRjqB2THZvSxRAYxEWhvByzcg4WohUG3N0sGrC4dAm8-aj_ibb7u7gFrvOb1B1nAhp9RHG4vLpGCxTM4iFxI-XyRYNg9LyIPlO8Co1yST8yYfQi7Sr1Tnp1I5L8fNFHNx_OwLUKV0BvtrWKviQub-4PpeJrGDMDuFUe7hLI_fG0XEK1SQ31arPzqVCh7zmsWKeNDLR6e4pYkztEeg4" },
    { name: "Dosquebradas", subtitle: "Crecimiento residencial", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKqj1ingSzkGRB-XKNQQfj48LN2rQQAusPghCy0vMX7bylVfR_CLzlPDAcSAm5ekKFLOS9a1T9MgiaYA-vyO0Uygl7WtoqIhPii4oAbcLWt6hBElIFrykUxjD_191VB5HZ7jvZs1YxTAEoFMkKWJcPXBI6NIVmpRlqBERrRCAOCtQ-bOSwsSCQd99FGv0np91wa-6mOMi85DH2tV3wVOUI7qzOa2R1oy8C5tb2_OYZWMZQnIK9hwDsY0G-kXXDOA4DqFfn7SNcq7U" }
  ]);
  const [uploadingImage, setUploadingImage] = useState<number | null>(null);
`;
code = code.replace(statesStr, newStatesStr);

// 2. Add fetch logic
const fetchStr = `if (data.navbar_links) {
          try { setNavLinks(JSON.parse(data.navbar_links)); } catch(e){}
        }`;
const newFetchStr = fetchStr + `
        if (data.home_zones) {
          try { setZones(JSON.parse(data.home_zones)); } catch(e){}
        }`;
code = code.replace(fetchStr, newFetchStr);

// 3. Add save logic
const saveStr = `navbar_links: JSON.stringify(navLinks)`;
const newSaveStr = saveStr + `,\n          home_zones: JSON.stringify(zones)`;
code = code.replace(saveStr, newSaveStr);

// 4. Add uploadImage function
const funcStr = `const moveLink = (index: number, dir: number) => {
    const newArr = [...navLinks];
    const temp = newArr[index];
    newArr[index] = newArr[index + dir];
    newArr[index + dir] = temp;
    setNavLinks(newArr);
  };`;
const newFuncStr = funcStr + `
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
  };`;
code = code.replace(funcStr, newFuncStr);

// 5. Add UI block
const ctaBlock = `<button onClick={() => setNavLinks([...navLinks, {label: 'Nuevo', href: '/nuevo', icon: 'star'}])} className="text-primary font-label-md flex items-center gap-2 hover:underline p-2">
            <span className="material-symbols-outlined text-sm">add</span> Agregar Link
          </button>
        </div>`;

const zonesBlock = ctaBlock + `
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
`;
code = code.replace(ctaBlock, zonesBlock);

fs.writeFileSync('src/app/admin/settings/WebsiteTab.tsx', code);
console.log("Updated WebsiteTab");
