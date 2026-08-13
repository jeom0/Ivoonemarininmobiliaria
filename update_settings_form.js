const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/SettingsForm.tsx', 'utf8');

// 1. Initial State changes
code = code.replace(
  'const [logoPreview, setLogoPreview] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuBZAmb0vC4unzvHS9v5JfK2ae35nKQyWZwGS4VO9SO4TMtHJyEcFhrmsvMNh2aDhTFWMggrEdFefRHgRI_WwN4iN3L89XOV1lodjrF6wgvgz8x2Hazlbte6wkjBMJHaVLD6IF_WJNH4BzckeDNBKphSbKbWRAbYnlUoElsOE-5CPoerW7fWSAEZmr9mUC9aD757Dqlo_ThhdsY-Qv_XGOWunAcYvHYNHAWpuJXqVO6vzLuMOkNAi0N2UB3L0kdFxqKZ-3ViR_I34To");',
  'const [logoPreview, setLogoPreview] = useState("");'
);
code = code.replace(
  'const [heroImagePreview, setHeroImagePreview] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuDpMvk0dl6EsGv5KQsJVAzwFsHV3yAHMJyQteyHvOuRny-qcBpNNIeRPgBD2_067WvUPBpX2wctU-j0HS3Bx23zwQ-04fZEdNlIty8MCXZk7VV_eVdOfeyPu5L4xdDeYPfq4F9c90CuDHwsMAfuVEhmS1AmckC8sthTUMAZGGL4FtC1tOaH4AOGIUWzSOhv_OmtHUilm-VhznKaAEIDoIjEell-gLnl-388i1HU6rPuFmnb95UrEZqJ_95osTAzaTtadKN2Ue2Dn8o");',
  'const [heroImagePreview, setHeroImagePreview] = useState("");'
);
code = code.replace(
  'const [address, setAddress] = useState("Pereira, Eje Cafetero, Colombia");',
  'const [address, setAddress] = useState("Santa Rosa de Cabal, Risaralda, Colombia");'
);
code = code.replace(
  'const [instagram, setInstagram] = useState("https://instagram.com/");\n  const [facebook, setFacebook] = useState("https://facebook.com/");',
  'const [socialLinks, setSocialLinks] = useState<{platform: string, url: string}[]>([]);'
);

// 2. Fetch changes
code = code.replace(
  'if (data.instagram) setInstagram(data.instagram);\n        if (data.facebook) setFacebook(data.facebook);',
  `if (data.social_links) {
          try {
            setSocialLinks(JSON.parse(data.social_links));
          } catch(e){}
        }`
);

// 3. Save changes
code = code.replace(
  'instagram,\n          facebook',
  'social_links: JSON.stringify(socialLinks)'
);

// 4. UI for Logo
const oldLogoUI = `<img className="w-full h-full object-cover" src={logoPreview} alt="Logo de empresa" />
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}`;
const newLogoUI = `{logoPreview ? (
              <img className="w-full h-full object-cover" src={logoPreview} alt="Logo de empresa" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="material-symbols-outlined text-outline text-3xl mb-1">image_not_supported</span>
                <span className="text-[10px] text-outline font-bold leading-tight">No hay logo.<br/>Por favor sube uno.</span>
              </div>
            )}
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}`;
code = code.replace(oldLogoUI, newLogoUI);

// 5. UI for Hero
const oldHeroUI = `<img className="w-full h-full object-cover" src={heroImagePreview} alt="Imagen principal" />
              {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}`;
const newHeroUI = `{heroImagePreview ? (
              <img className="w-full h-full object-cover" src={heroImagePreview} alt="Imagen principal" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center w-full bg-surface-container">
                <span className="material-symbols-outlined text-outline text-3xl mb-1">wallpaper</span>
                <span className="text-xs text-outline font-bold">No hay imagen Hero configurada. Sube una.</span>
              </div>
            )}
            {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">...</div>}`;
code = code.replace(oldHeroUI, newHeroUI);

// 6. UI for Social Links
const oldSocialUI = `<div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">link</span>
              <input value={instagram} onChange={e => setInstagram(e.target.value)} className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" placeholder="URL de Instagram" type="url" />
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">link</span>
              <input value={facebook} onChange={e => setFacebook(e.target.value)} className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" placeholder="URL de Facebook" type="url" />
            </div>
          </div>`;

const newSocialUI = `<div className="space-y-4">
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
          </div>`;
code = code.replace(oldSocialUI, newSocialUI);

fs.writeFileSync('src/app/admin/settings/SettingsForm.tsx', code);
console.log("Updated SettingsForm");
