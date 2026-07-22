import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
const prisma = new PrismaClient();

export default async function Page() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <>
      

<PublicNavbar />
<main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<header className="mb-12">
<h1 className="font-display-lg text-display-lg text-primary mb-2">Inmuebles disponibles</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Explora propiedades en venta y arriendo en el Eje Cafetero.</p>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<aside className="lg:col-span-3 space-y-8">
<div className="bg-surface-container-low p-6 rounded-xl sticky top-32 border border-outline-variant/30">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md text-primary">Filtros</h3>
<button className="text-outline text-label-md hover:text-primary transition-colors">Limpiar</button>
</div>
<div className="space-y-6 custom-scrollbar max-h-[calc(100vh-400px)] overflow-y-auto pr-2">

<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Operación</label>
<div className="grid grid-cols-2 gap-2">
<button className="py-2 px-4 rounded-lg border border-primary bg-primary text-on-primary text-label-md transition-all">Venta</button>
<button className="py-2 px-4 rounded-lg border border-outline-variant hover:border-primary text-label-md transition-all">Arriendo</button>
</div>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Tipo de Propiedad</label>
<select className="w-full rounded-lg border-outline-variant bg-surface focus:ring-primary focus:border-primary text-body-md py-3 px-4">
<option>Todos</option>
<option>Apartamento</option>
<option>Casa</option>
<option>Finca</option>
<option>Local Comercial</option>
</select>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Ciudad</label>
<select className="w-full rounded-lg border-outline-variant bg-surface focus:ring-primary focus:border-primary text-body-md py-3 px-4">
<option>Pereira</option>
<option>Armenia</option>
<option>Manizales</option>
<option>Dosquebradas</option>
</select>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Rango de Precio</label>
<div className="space-y-3">
<input className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary" max="1000" min="0" type="range"/>
<div className="flex justify-between text-body-md text-on-surface-variant font-medium">
<span>$0</span>
<span>$1.000M+</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Habitaciones</label>
<div className="flex gap-1">
<button className="w-10 h-10 rounded-lg border border-outline-variant hover:border-primary text-body-md">1+</button>
<button className="w-10 h-10 rounded-lg border border-outline-variant hover:border-primary text-body-md">2+</button>
<button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold">3+</button>
</div>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Baños</label>
<div className="flex gap-1">
<button className="w-10 h-10 rounded-lg border border-outline-variant hover:border-primary text-body-md">1+</button>
<button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold">2+</button>
</div>
</div>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Estrato</label>
<div className="flex flex-wrap gap-2">
<button className="px-3 py-1 rounded-full border border-outline-variant text-label-md hover:border-primary">4</button>
<button className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-label-md">5</button>
<button className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-label-md">6</button>
</div>
</div>
</div>
<button className="w-full mt-8 bg-secondary text-on-secondary py-4 rounded-xl font-label-md hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/10">
<span className="material-symbols-outlined text-[20px]">search</span>
                        Aplicar Filtros
                    </button>
</div>
</aside>

<div className="lg:col-span-9">
<div className="flex justify-between items-center mb-6">
<span className="font-body-md text-on-surface-variant"><strong className="text-primary">{properties.length}</strong> inmuebles encontrados</span>
<div className="flex items-center gap-3">
<span className="text-label-md text-secondary">Ordenar por:</span>
<select className="border-none bg-transparent font-bold text-primary focus:ring-0 cursor-pointer">
<option>Precio: Mayor a Menor</option>
<option>Precio: Menor a Mayor</option>
<option>Más recientes</option>
<option>Área: Mayor a Menor</option>
</select>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

{properties.length === 0 ? (
    <div className="col-span-1 md:col-span-2 text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-xl border border-outline-variant/20">
        No hay inmuebles que coincidan con tu búsqueda.
    </div>
) : (
    properties.map(p => (
        <div key={p.id} className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 card-hover transition-all duration-300">
            <div className="relative h-64">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">{p.modality}</span>
                    {p.status === 'NUEVO' && <span className="bg-secondary-fixed text-primary px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest">Nuevo</span>}
                </div>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${p.mainImage}')` }}></div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-primary">{p.title}</h3>
                    <span className="text-headline-md font-bold text-on-surface">${p.price.toLocaleString('es-CO')}</span>
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
    ))
)}


</div>

<div className="mt-16 flex justify-center items-center gap-2">
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-md">1</button>
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">2</button>
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">3</button>
<span className="px-2 text-outline-variant">...</span>
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">12</button>
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</main>

<PublicFooter />


    </>
  );
}
    