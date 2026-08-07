const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/WebsiteTab.tsx', 'utf8');

// Add states
code = code.replace(
  'const [homeAboutText, setHomeAboutText] = useState("");',
  `const [homeAboutText, setHomeAboutText] = useState("");
  const [homeSections, setHomeSections] = useState([
    { id: 'hero', name: 'Buscador Principal (Hero)' },
    { id: 'featured', name: 'Propiedades Destacadas' },
    { id: 'investment', name: 'Para Inversionistas' },
    { id: 'blog', name: 'Noticias Inmobiliarias' },
    { id: 'about', name: 'Sección Nosotros' }
  ]);
  const [navLinks, setNavLinks] = useState([
    { label: "Inicio", href: "/", icon: "home" },
    { label: "Inmuebles", href: "/propiedades", icon: "domain" },
    { label: "Nosotros", href: "/nosotros", icon: "groups" },
    { label: "Vender", href: "/vender", icon: "sell" },
    { label: "Arrendar", href: "/arrendar", icon: "key" },
    { label: "Blog", href: "/blog", icon: "article" }
  ]);`
);

// Add fetch parsing
code = code.replace(
  `setHomeAboutText(data.home_about_text || "Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso.");`,
  `setHomeAboutText(data.home_about_text || "Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso.");
        if (data.home_sections_order) {
          try { setHomeSections(JSON.parse(data.home_sections_order)); } catch(e){}
        }
        if (data.navbar_links) {
          try { setNavLinks(JSON.parse(data.navbar_links)); } catch(e){}
        }`
);

// Add save logic
code = code.replace(
  'home_about_text: homeAboutText',
  `home_about_text: homeAboutText,
          home_sections_order: JSON.stringify(homeSections),
          navbar_links: JSON.stringify(navLinks)`
);

// Helper functions for UI
const helperFunctions = `
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
`;
code = code.replace('const handleSave = async () => {', helperFunctions + '\n  const handleSave = async () => {');

// Add UI Blocks
const uiBlocks = `
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
`;

code = code.replace('</div>\n      \n      <div className="flex justify-end pt-6">', uiBlocks + '\n      </div>\n      <div className="flex justify-end pt-6">');

fs.writeFileSync('src/app/admin/settings/WebsiteTab.tsx', code);
console.log("Updated WebsiteTab");
