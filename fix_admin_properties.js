const fs = require('fs');

const content = `import Link from "next/link";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Page() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
  
  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'DISPONIBLE').length;
  const soldProperties = properties.filter(p => p.status === 'VENDIDO' || p.status === 'ARRENDADO').length;
  // Vistas Totales can be dummy or we can add a views field to property model later, for now we will hardcode 14.2k or compute a sum if views existed.
  
  return (
    <>
      <header className="flex items-center justify-between mb-8 border-b border-outline-variant/20 pb-4">
        <div>
        <h1 className="font-headline-md text-headline-md text-primary">Administración de Inmuebles</h1>
        <p className="text-[14px] text-on-surface-variant">Gestiona tu catálogo de propiedades exclusivas</p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/admin/properties/new" className="py-2 px-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Crear Inmueble
            </Link>
        </div>
      </header>
      
      <div className="space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Total Inmuebles</span>
            <span className="material-symbols-outlined text-primary-container">home</span>
            </div>
            <span className="text-display-lg font-display-lg text-primary">{totalProperties}</span>
            <span className="text-[12px] text-secondary font-medium">Portafolio Activo</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Disponibles</span>
            <span className="material-symbols-outlined text-green-700">check_circle</span>
            </div>
            <span className="text-display-lg font-display-lg text-primary">{availableProperties}</span>
            <span className="text-[12px] text-on-surface-variant font-medium">{totalProperties > 0 ? Math.round((availableProperties/totalProperties)*100) : 0}% del inventario</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Vendidos / Arrendados</span>
            <span className="material-symbols-outlined text-secondary">sell</span>
            </div>
            <span className="text-display-lg font-display-lg text-primary">{soldProperties}</span>
            <span className="text-[12px] text-on-surface-variant font-medium">Histórico</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Vistas Totales</span>
            <span className="material-symbols-outlined text-tertiary-fixed-dim">visibility</span>
            </div>
            <span className="text-display-lg font-display-lg text-primary">14.2k</span>
            <span className="text-[12px] text-secondary font-medium">+2.4k esta semana</span>
            </div>
        </section>

        <section className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center gap-gutter">
            <div className="relative flex-1 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-body-md transition-all" placeholder="Buscar por código, título o ubicación..." type="text"/>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md font-label-md text-on-surface-variant min-w-[140px] focus:ring-2 focus:ring-primary/20 cursor-pointer">
            <option>Estado: Todos</option>
            <option>Disponible</option>
            <option>Vendido</option>
            </select>
            </div>
        </section>

        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
            <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/20">
            <th className="p-4 w-12 text-center"><input className="rounded border-outline-variant text-primary" type="checkbox"/></th>
            <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Imagen</th>
            <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Inmueble</th>
            <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Tipo / Operación</th>
            <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Precio</th>
            <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Estado</th>
            <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-right">Acciones</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
            {properties.map(p => (
            <tr key={p.id} className="property-row transition-colors group hover:bg-surface-container-low">
            <td className="p-4 text-center"><input className="rounded border-outline-variant text-primary" type="checkbox"/></td>
            <td className="p-4">
            <div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm">
            <img className="w-full h-full object-cover" src={p.mainImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDWtV7ZP8sh2RULYc0DZHTWAMtqfLUVPDWBDvcnXQgGlPwkQv_xtX27dlx4vi1fVW4BTKDE49b9T55PJzHSCZbD4BUXptzRHRBfpbV6FyUFH5OsBgMhpWrn5fRo_HI_iXkfGVHUEGQNWdTaWxvPRkoPT1CtbEjib7HDPbsUGRUKB8Gtor9X_ORRqViYMLS_jQq_nj753l8ht19iDy2XmNkp24ixLGJAAgeo56QvnqCiiZYpsgo5-AtOgI_cet2XYKmLgP5C31PDD3I"}/>
            </div>
            </td>
            <td className="p-4">
            <div className="flex flex-col">
            <span className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors">{p.title}</span>
            <span className="text-[12px] text-on-surface-variant">{p.city}</span>
            </div>
            </td>
            <td className="p-4">
            <div className="flex flex-col">
            <span className="text-body-md">{p.propertyType}</span>
            <span className="text-[12px] text-secondary-fixed-variant font-medium">{p.modality}</span>
            </div>
            </td>
            <td className="p-4">
            <span className="font-bold text-on-surface">$\{(p.price || 0).toLocaleString('es-CO')}</span>
            </td>
            <td className="p-4">
            <span className={\`px-3 py-1 rounded-full text-[11px] font-bold uppercase \${p.status === 'DISPONIBLE' ? 'bg-green-100 text-green-800' : 'bg-primary-container text-on-primary-container'}\`}>{p.status}</span>
            </td>
            <td className="p-4">
            <div className="flex items-center justify-end gap-1">
            <Link href={\`/propiedades/\${p.id}\`} className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all" title="Ver">
            <span className="material-symbols-outlined text-[20px]">visibility</span>
            </Link>
            <button className="p-2 hover:bg-error-container/20 rounded-lg text-error transition-all" title="Eliminar" onClick={() => {}}>
            <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
            </div>
            </td>
            </tr>
            ))}
            {properties.length === 0 && (
                <tr><td colSpan={7} className="text-center p-8 text-on-surface-variant">No hay inmuebles creados.</td></tr>
            )}
            </tbody>
            </table>
            </div>
        </div>
      </div>
    </>
  );
}
`;

fs.writeFileSync('src/app/admin/properties/page.tsx', content);
