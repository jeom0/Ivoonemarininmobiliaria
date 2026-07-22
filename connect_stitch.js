const fs = require('fs');
const path = require('path');

function processHtml(html, routeMap) {
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
        // Replace typical empty hrefs with functional ones based on text content
        .replace(/<a\s+([^>]*?)href="#"([^>]*?)>([\s\S]*?)<\/a>/gi, (match, before, after, content) => {
            let targetHref = "#";
            const text = content.toLowerCase();
            if (text.includes("inicio")) targetHref = "/";
            else if (text.includes("inmueble") || text.includes("catálogo")) targetHref = "/propiedades";
            else if (text.includes("blog")) targetHref = "/blog";
            else if (text.includes("publicar")) targetHref = "/admin/login";
            else if (text.includes("contacto")) targetHref = "/#contacto";
            else if (text.includes("dashboard")) targetHref = "/admin";
            else if (text.includes("leads")) targetHref = "/admin/leads";
            
            return `<Link ${before}href="${targetHref}"${after}>${content}</Link>`;
        })
        // Replace button 'Publicar' with a link to /admin/login
        .replace(/<button([^>]*?)>([\s\S]*?Publicar[\s\S]*?)<\/button>/gi, (match, attrs, content) => {
            return `<Link href="/admin/login"><button${attrs}>${content}</button></Link>`;
        });

    return jsx;
}

const mappings = [
    { src: 'Home.html', dest: 'src/app/page.tsx', isPublic: true },
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
    if (!fs.existsSync(srcPath)) {
        console.log("Missing:", srcPath);
        return;
    }
    
    let html = fs.readFileSync(srcPath, 'utf8');
    
    // Inject images into Blog cards if it's the blog page
    if (mapping.src === 'Blog_Inmobiliario.html') {
       html = html.replace(/<div class="p-6">/g, 
       `<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDszD48JO7vD08Epu-BQDWt1p5zBsqKycrIA5qm5nmBjoTRr-DEXhkWN6IuVRIV-Snvkp7ojpgDTYzBgcGVX7aYZRVk6SFtcZ6hx0ZWh1zWEYGEy2OWmUYTlsoK9_rg7eUOgUxLLOGLF1sosGkr3zs5ng3Yp79w604R5Zj1cGPjZkrPMecYil9cKbtID1PV1gnVbEmp6tp-g1V0rQUqAfScXot7FcALcTQ_guKcqx45tKKDzQAe4cwVZp0O9tiXSlxkjRN0iDCJXgU" class="w-full h-48 object-cover rounded-t-xl mb-4" /><div class="p-6">`);
    }

    // Add extra properties section to Home if it's Home
    if (mapping.src === 'Home.html') {
        const extraProperties = `
        <section class="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop bg-surface-container-low rounded-3xl mt-12 mb-12 luxury-shadow">
            <div class="text-center mb-10">
                <h2 class="font-headline-lg text-headline-lg text-primary">Nuevos Ingresos</h2>
                <p class="text-on-surface-variant mt-2">Propiedades recientemente añadidas a nuestro catálogo</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Mini Card 1 -->
                <div class="bg-surface rounded-xl overflow-hidden shadow-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWtV7ZP8sh2RULYc0DZHTWAMtqfLUVPDWBDvcnXQgGlPwkQv_xtX27dlx4vi1fVW4BTKDE49b9T55PJzHSCZbD4BUXptzRHRBfpbV6FyUFH5OsBgMhpWrn5fRo_HI_iXkfGVHUEGQNWdTaWxvPRkoPT1CtbEjib7HDPbsUGRUKB8Gtor9X_ORRqViYMLS_jQq_nj753l8ht19iDy2XmNkp24ixLGJAAgeo56QvnqCiiZYpsgo5-AtOgI_cet2XYKmLgP5C31PDD3I" class="w-full h-32 object-cover" />
                    <div class="p-4">
                        <h4 class="font-bold text-primary text-sm">Apto Centro</h4>
                        <p class="text-secondary font-bold">$320M</p>
                    </div>
                </div>
                 <!-- Mini Card 2 -->
                <div class="bg-surface rounded-xl overflow-hidden shadow-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnS93zbF09Ojzglr17rZQeX4dkHVRXt4ReJ0CnO5jhcPPy9tMM88IzbZj7On546BualC8tbOgxknoQtPfwoHVIaAo5Nkbc5RsiVwIuXPseespcJwlcZDYMXpEsXY4vq60UosGKi6Ksfj8R9eVAmhe7OgloYCn2uFsnrjeUjZppVxOfB25jWqXM3tTMzY8ymc-v-t34Y5QwVbId0gnywbwxpGvsCr3IfJQmLItDTZcIjZS2v5nZtudhjOi8xD9fGsyTgIi33pFqUYw" class="w-full h-32 object-cover" />
                    <div class="p-4">
                        <h4 class="font-bold text-primary text-sm">Casa Norte</h4>
                        <p class="text-secondary font-bold">$750M</p>
                    </div>
                </div>
                 <!-- Mini Card 3 -->
                <div class="bg-surface rounded-xl overflow-hidden shadow-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5XvYZnUVypQHwTSqeUU5LRBx1_MPhcDQvwm_RF5k1F_-Pk30MbKD6VlISpaveQefmDiBSYWHxpHr7gL0Ekr1TH9wuRFy_W3OEj9Brdrk-NIZFXzHPFnEsBoywTet5h2VONwK1PAqye_foqoE8dORbKkIU0OIhJjOf3RTctYkbpkXeiNeJJUW96P1GPMeFLVTQlgDkqPDE1t1SesfYc41lUIrpgS5QqEaGePggOB7R7IIlwgC-LdunMIBi_5jyn_Sf9EfigYFB8oc" class="w-full h-32 object-cover" />
                    <div class="p-4">
                        <h4 class="font-bold text-primary text-sm">Lote Sur</h4>
                        <p class="text-secondary font-bold">$180M</p>
                    </div>
                </div>
                 <!-- Mini Card 4 -->
                <div class="bg-surface rounded-xl overflow-hidden shadow-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM8FwjTQ6ieoloSvhF7rn__TwPNf2CzHGXpMjOhW28mGt1rKjEi1uMCpmTQDnZKPF6_9ATMs5IWRe3PF-sJ4lVFVxiBSADerPk7J6S2rra8O2tNEKTRgh-YKY22MwTsoEk0PnKhaTsAveGfVUpvoEKWRKDlWUraUarPpSSM0ewsL7vFudcjFGfx35e7y_7UTF9_BFPvoNJV3HfgLPOo5n_eExTOzZvp8c_55uLWJoimMTRA22vNjIa-f0-XyeZdNTbOhzzMvw6HU0" class="w-full h-32 object-cover" />
                    <div class="p-4">
                        <h4 class="font-bold text-primary text-sm">Finca Cerritos</h4>
                        <p class="text-secondary font-bold">$1.200M</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-6">
                <a href="/propiedades" class="text-primary font-bold hover:underline">Ver catálogo completo</a>
            </div>
        </section>
        `;
        html = html.replace('<!-- Blog Section -->', extraProperties + '\n<!-- Blog Section -->');
    }

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : html;
    
    let jsx = processHtml(bodyContent, mapping);
    
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
    console.log(`Migrated ${mapping.src} to ${mapping.dest}`);
});
