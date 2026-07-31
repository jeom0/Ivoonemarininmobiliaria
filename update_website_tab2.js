const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/WebsiteTab.tsx', 'utf8');

const oldSectionsState = `const [homeSections, setHomeSections] = useState([
    { id: 'hero', name: 'Buscador Principal (Hero)' },
    { id: 'featured', name: 'Propiedades Destacadas' },
    { id: 'investment', name: 'Para Inversionistas' },
    { id: 'blog', name: 'Noticias Inmobiliarias' },
    { id: 'about', name: 'Sección Nosotros' }
  ]);`;

const newSectionsState = `const [homeSections, setHomeSections] = useState([
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
  ]);`;

code = code.replace(oldSectionsState, newSectionsState);
fs.writeFileSync('src/app/admin/settings/WebsiteTab.tsx', code);
console.log("WebsiteTab sections updated");
