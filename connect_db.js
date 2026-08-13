const fs = require('fs');

let propHtml = fs.readFileSync('src/app/propiedades/page.tsx', 'utf8');

propHtml = propHtml.replace('export default function Page() {', `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
`);

const dynamicCode = `
{properties.map(p => (
    <div key={p.id} className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 card-hover transition-all duration-300">
        <div className="relative h-64">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">{p.modality}</span>
                {p.status === 'NUEVO' && <span className="bg-secondary-fixed text-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">Nuevo</span>}
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
                <span className="text-body-md">{p.city} {p.sector ? '- ' + p.sector : ''}</span>
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
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">square_foot</span>
                    <span className="text-label-md">{p.builtArea}m²</span>
                </div>
            </div>
        </div>
    </div>
))}
`;

propHtml = propHtml.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">/, `<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">\n${dynamicCode}`);

fs.writeFileSync('src/app/propiedades/page.tsx', propHtml);


let adminHtml = fs.readFileSync('src/app/admin/properties/page.tsx', 'utf8');

adminHtml = adminHtml.replace('export default function Page() {', `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
`);

const dynamicAdminRow = `
{properties.map(p => (
<tr key={p.id} className="border-b border-outline-variant/20 hover:bg-surface-container-lowest transition-colors group cursor-pointer">
<td className="p-4">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover" src={p.mainImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDWtV7ZP8sh2RULYc0DZHTWAMtqfLUVPDWBDvcnXQgGlPwkQv_xtX27dlx4vi1fVW4BTKDE49b9T55PJzHSCZbD4BUXptzRHRBfpbV6FyUFH5OsBgMhpWrn5fRo_HI_iXkfGVHUEGQNWdTaWxvPRkoPT1CtbEjib7HDPbsUGRUKB8Gtor9X_ORRqViYMLS_jQq_nj753l8ht19iDy2XmNkp24ixLGJAAgeo56QvnqCiiZYpsgo5-AtOgI_cet2XYKmLgP5C31PDD3I"} />
</div>
<div>
<h4 className="font-headline-md text-primary text-[16px]">{p.title}</h4>
<span className="text-label-md text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
{p.city}
</span>
</div>
</div>
</td>
<td className="p-4">
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-[12px]">{p.modality}</span>
</td>
<td className="p-4 font-body-md text-on-surface-variant">
{new Date(p.createdAt).toLocaleDateString()}
</td>
<td className="p-4 font-headline-md text-primary text-[16px]">
$\{p.price.toLocaleString('es-CO')}
</td>
<td className="p-4">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
<span className="font-body-md text-on-surface">{p.status}</span>
</div>
</td>
<td className="p-4">
<div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="p-2 text-error hover:bg-error/10 transition-colors rounded-lg">
<span className="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
))}
`;

adminHtml = adminHtml.replace(/<tbody>[\s\S]*?<\/tbody>/, `<tbody>\n${dynamicAdminRow}\n</tbody>`);
fs.writeFileSync('src/app/admin/properties/page.tsx', adminHtml);

console.log('Connected pages to DB!');
