const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/SettingsForm.tsx', 'utf8');

const targetStr = `          <label className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">upload</span>
            Subir Nuevo Logo
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>


        </div>`;

const newHeroUI = `          <label className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2 cursor-pointer">
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
        </div>`;

code = code.replace(targetStr, newHeroUI);

fs.writeFileSync('src/app/admin/settings/SettingsForm.tsx', code);
console.log("Injected Hero UI");
