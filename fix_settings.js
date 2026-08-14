const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/SettingsForm.tsx', 'utf8');

const oldBlock = `          <div className="w-full mt-8 border-t border-outline-variant/30 pt-8 flex flex-col items-center">
            <h3 className="font-headline-md text-headline-md text-on-background mb-2">Imagen Principal (Inicio)</h3>
            <div className="w-full h-32 rounded-lg bg-surface-container flex items-center justify-center mb-4 overflow-hidden border-2 border-outline-variant border-dashed relative">
              {heroImagePreview ? (
              <img className="w-full h-full object-cover" src={heroImagePreview} alt="Imagen principal" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center w-full bg-surface-container">
                <span className="material-symbols-outlined text-outline text-3xl mb-1">wallpaper</span>
                <span className="text-xs text-outline font-bold">No hay imagen Hero configurada. Sube una.</span>
              </div>
            )}
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}
            </div>
            
            <label className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined">upload</span>
              Cambiar Imagen Hero
              <input type="file" accept="image/*" className="hidden" onChange={handleHeroChange} />
            </label>
          </div>`;

code = code.replace(oldBlock, '');

// I also need to remove `handleHeroChange` if it's there
code = code.replace(/const handleHeroChange = async .*?};\n/s, '');

fs.writeFileSync('src/app/admin/settings/SettingsForm.tsx', code);
console.log("Fixed settings form");
