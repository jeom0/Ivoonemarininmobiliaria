const fs = require('fs');
const path = require('path');

function sanitizeHtmlToJsx(html, destRoute) {
    let jsx = html
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
        })
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        
        // JSX strict boolean fixes
        .replace(/disabled=""/g, 'disabled={true}')
        .replace(/checked=""/g, 'defaultChecked={true}')
        .replace(/readonly=""/g, 'readOnly={true}')
        .replace(/required=""/g, 'required={true}')
        
        // Remove inline events
        .replace(/on[a-z]+="[^"]*"/g, '')

        // Fix specific SVG props
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/tabindex=/g, 'tabIndex=')
        
        // Fix textarea rows
        .replace(/rows="([0-9]+)"/g, 'rows={$1}')

        // Automatic Links Routing
        .replace(/<a\s+([^>]*?)href="[#]*"([^>]*?)>([\s\S]*?)<\/a>/gi, (match, before, after, content) => {
            let targetHref = "#";
            const text = content.toLowerCase();
            if (text.includes("inicio")) targetHref = "/";
            else if (text.includes("inmueble") || text.includes("catálogo") || text.includes("ver todas")) targetHref = "/propiedades";
            else if (text.includes("blog")) targetHref = "/blog";
            else if (text.includes("publicar")) targetHref = "/admin/login";
            else if (text.includes("contacto")) targetHref = "/#contacto";
            else if (text.includes("dashboard")) targetHref = "/admin";
            else if (text.includes("leads")) targetHref = "/admin/leads";
            else if (text.includes("agenda")) targetHref = "/admin/agenda";
            else if (text.includes("reportes")) targetHref = "/admin/reports";
            else if (text.includes("configura")) targetHref = "/admin/settings";
            
            return `<Link ${before}href="${targetHref}"${after}>${content}</Link>`;
        })
        .replace(/<button([^>]*?)>([\s\S]*?Publicar[\s\S]*?)<\/button>/gi, (match, attrs, content) => {
            return `<Link href="/admin/login"><button${attrs}>${content}</button></Link>`;
        });
        
    // Specific fix for Dashboard menu
    if (destRoute.includes('/admin')) {
         jsx = jsx.replace(/href="[^"]*"/g, (match) => {
             return match;
         });
         
         // Manually force admin nav replacements
         jsx = jsx.replace(/<a([^>]*)>(.*?)Dashboard/gi, '<Link href="/admin"$1>$2Dashboard');
         jsx = jsx.replace(/<a([^>]*)>(.*?)Propiedades/gi, '<Link href="/admin/properties"$1>$2Propiedades');
         jsx = jsx.replace(/<a([^>]*)>(.*?)Leads/gi, '<Link href="/admin/leads"$1>$2Leads');
         jsx = jsx.replace(/<a([^>]*)>(.*?)Agenda/gi, '<Link href="/admin/agenda"$1>$2Agenda');
         jsx = jsx.replace(/<a([^>]*)>(.*?)Reportes/gi, '<Link href="/admin/reports"$1>$2Reportes');
         jsx = jsx.replace(/<a([^>]*)>(.*?)Configuración/gi, '<Link href="/admin/settings"$1>$2Configuración');
    }

    return jsx;
}

const mappings = [
    { src: 'Home.html', dest: 'src/app/page.tsx' },
    { src: 'Catalogo_Inmuebles.html', dest: 'src/app/propiedades/page.tsx' },
    { src: 'Detalle_Inmueble.html', dest: 'src/app/propiedades/[id]/page.tsx' },
    { src: 'Blog_Inmobiliario.html', dest: 'src/app/blog/page.tsx' },
    { src: 'Login_Administrativo.html', dest: 'src/app/admin/login/page.tsx' },
    { src: 'Dashboard_Principal.html', dest: 'src/app/admin/page.tsx' },
    { src: 'Administracion_Inmuebles.html', dest: 'src/app/admin/properties/page.tsx' },
    { src: 'Gestion_Leads.html', dest: 'src/app/admin/leads/page.tsx' },
    { src: 'Agenda_Visitas.html', dest: 'src/app/admin/agenda/page.tsx' },
    { src: 'Reportes_Analitica.html', dest: 'src/app/admin/reports/page.tsx' },
    { src: 'Configuracion_Usuarios.html', dest: 'src/app/admin/settings/page.tsx' }
];

mappings.forEach(mapping => {
    const srcPath = path.join(__dirname, 'stitch_assets', mapping.src);
    if (!fs.existsSync(srcPath)) {
        console.log("Missing:", srcPath);
        return;
    }
    
    let html = fs.readFileSync(srcPath, 'utf8');
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : html;
    
    // Convert to JSX safely
    let jsx = sanitizeHtmlToJsx(bodyContent, mapping.dest);
    
    // Prevent NextJS issues by making them Client components if they need it, but we stripped onClick so Server is fine.
    const template = `
import Link from "next/link";

export default function Page() {
  return (
    <>
      ${jsx}
    </>
  );
}
    `;
    
    fs.mkdirSync(path.dirname(path.join(__dirname, mapping.dest)), { recursive: true });
    fs.writeFileSync(path.join(__dirname, mapping.dest), template);
    console.log(`Successfully migrated ${mapping.src}`);
});
