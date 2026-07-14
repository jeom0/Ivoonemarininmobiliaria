const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(html) {
    let jsx = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')   // Remove styles
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/<img([^>]+)>/g, (match, attrs) => {
            if (!attrs.endsWith('/')) return `<img${attrs} />`;
            return match;
        })
        .replace(/<input([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) return `<input${attrs} />`;
            return match;
        })
        .replace(/<br([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) return `<br${attrs} />`;
            return match;
        })
        .replace(/<hr([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) return `<hr${attrs} />`;
            return match;
        })
        .replace(/style="([^"]*)"/g, (match, styles) => {
             const styleObj = {};
             styles.split(';').forEach(s => {
                 const [key, ...rest] = s.split(':');
                 if(key && rest.length > 0) {
                     const value = rest.join(':');
                     const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                     styleObj[camelKey] = value.trim().replace(/'/g, '"');
                 }
             });
             return `style={${JSON.stringify(styleObj)}}`;
        });
    return jsx;
}

const mappings = [
    { src: 'Home_Desktop_Final.html', dest: 'src/app/page.tsx', isPublic: true },
    { src: 'Catalogo_Inmuebles.html', dest: 'src/app/propiedades/page.tsx', isPublic: true },
    { src: 'Detalle_Inmueble.html', dest: 'src/app/propiedades/[id]/page.tsx', isPublic: true },
    { src: 'Blog_Inmobiliario.html', dest: 'src/app/blog/page.tsx', isPublic: true },
    { src: 'Dashboard_Principal.html', dest: 'src/app/admin/page.tsx', isAdmin: true },
    { src: 'Administracion_Inmuebles.html', dest: 'src/app/admin/properties/page.tsx', isAdmin: true },
    { src: 'Gestion_Leads.html', dest: 'src/app/admin/leads/page.tsx', isAdmin: true },
    { src: 'Configuracion_Usuarios.html', dest: 'src/app/admin/settings/page.tsx', isAdmin: true }
];

mappings.forEach(mapping => {
    const srcPath = path.join(__dirname, 'stitch_assets', mapping.src);
    if (!fs.existsSync(srcPath)) return;
    
    let html = fs.readFileSync(srcPath, 'utf8');
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : html;
    
    let jsx = convertHtmlToJsx(bodyContent);
    
    const imports = mapping.isAdmin 
       ? `import Link from "next/link";\nimport { prisma } from "@/lib/prisma";\n` 
       : `import Link from "next/link";\n`;
    
    const template = `
${imports}

export default async function Page() {
  return (
    <>
      ${jsx}
    </>
  );
}
    `;
    
    fs.mkdirSync(path.dirname(path.join(__dirname, mapping.dest)), { recursive: true });
    fs.writeFileSync(path.join(__dirname, mapping.dest), template);
    console.log(`Migrated ${mapping.src} to ${mapping.dest}`);
});
