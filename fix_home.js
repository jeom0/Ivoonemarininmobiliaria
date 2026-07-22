const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Make it async and import Prisma
content = content.replace('export default function Page() {', `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: 'desc' }, take: 6 });
`);

// Inject the "More Properties" dynamic section
const dynamicSection = `
<section className="py-section-gap bg-surface-container-low/30">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
    <div className="flex justify-between items-end mb-12">
        <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-2">NOVEDADES</span>
            <h2 className="font-display-lg text-display-lg text-primary">Nuevos Inmuebles</h2>
        </div>
        <Link className="text-primary font-bold font-label-md text-label-md flex items-center gap-1 hover:underline" href="/propiedades">
            Ver catálogo completo <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {properties.map(p => (
            <div key={p.id} className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:-translate-y-2 transition-all duration-300 shadow-md">
                <div className="relative h-64">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">{p.modality}</span>
                    </div>
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: \`url('\${p.mainImage}')\` }}></div>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline-md text-headline-md text-primary">{p.title}</h3>
                        <span className="text-headline-md font-bold text-on-surface">$\{p.price.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant mb-4">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        <span className="text-body-md">{p.city}</span>
                    </div>
                    <div className="flex justify-between py-4 border-t border-outline-variant/30 text-on-surface-variant">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">bed</span>
                            <span className="text-label-md">{p.bedrooms} Hab</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">bathtub</span>
                            <span className="text-label-md">{p.bathrooms} Baños</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
</section>
`;

content = content.replace(/<\/section>\s*<section className="bg-primary/, `</section>\n${dynamicSection}\n<section className="bg-primary`);
fs.writeFileSync('src/app/page.tsx', content);
