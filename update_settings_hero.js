const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/SettingsForm.tsx', 'utf8');

// Replace state
code = code.replace(
  `const [heroImagePreview, setHeroImagePreview] = useState("");`,
  `const [heroMedia, setHeroMedia] = useState<string[]>([]);`
);

// Replace fetch parsing
code = code.replace(
  `if (data.heroImage) setHeroImagePreview(data.heroImage);`,
  `if (data.hero_media) {
          try {
            setHeroMedia(JSON.parse(data.hero_media));
          } catch(e){}
        } else if (data.heroImage) {
          setHeroMedia([data.heroImage]);
        }`
);

// Replace save logic
code = code.replace(
  `heroImage: heroImagePreview,`,
  `hero_media: JSON.stringify(heroMedia),`
);

// Replace handleImageUpload for hero (which used setHeroImagePreview)
// I will create a new generic media uploader
const funcCode = `  const handleImageUpload = async (file: File, type: 'logo' | 'hero') => {
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
        if (type === 'hero') setHeroImagePreview(data.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };`;

const newFuncCode = `  const handleImageUpload = async (file: File, type: 'logo' | 'hero') => {
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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };`;
code = code.replace(funcCode, newFuncCode);

// UI replacement for Hero Section
const oldHeroUI = `<div className="flex flex-col gap-2 relative h-40">
            {heroImagePreview ? (
              <img className="w-full h-full object-cover" src={heroImagePreview} alt="Imagen principal" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center w-full bg-surface-container">
                <span className="material-symbols-outlined text-outline text-3xl mb-1">wallpaper</span>
                <span className="text-xs text-outline font-bold">No hay imagen Hero configurada. Sube una.</span>
              </div>
            )}
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white rounded p-1">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
            <input type="file" accept="image/*" onChange={(e) => { if(e.target.files) handleImageUpload(e.target.files[0], 'hero') }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>`;

const newHeroUI = `<div className="space-y-4">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {heroMedia.map((media, idx) => (
                <div key={idx} className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden border border-outline-variant group">
                  {media.match(/\\.(mp4|webm|ogg)$/i) || media.includes('video') ? (
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
                    className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
              
              <div className="relative w-40 h-24 shrink-0 rounded-lg border-2 border-dashed border-outline-variant bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-outline">add_photo_alternate</span>
                <span className="text-[10px] text-outline font-bold mt-1">Agregar</span>
                {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={(e) => { if(e.target.files) handleImageUpload(e.target.files[0], 'hero') }} 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                />
              </div>
            </div>
            <p className="text-[12px] text-on-surface-variant">Puedes subir imágenes o videos. Se mostrarán como un carrusel dinámico en la pantalla principal.</p>
          </div>`;

code = code.replace(oldHeroUI, newHeroUI);

fs.writeFileSync('src/app/admin/settings/SettingsForm.tsx', code);
console.log("Updated SettingsForm for Hero Carousel");
