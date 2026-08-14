import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SortSelect from "@/components/SortSelect";
import PropertyCard from "@/components/PropertyCard";
const prisma = new PrismaClient();

import { Prisma } from '@prisma/client';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const modality = typeof params.modality === 'string' && params.modality !== 'Todos' ? params.modality : undefined;
  const type = typeof params.type === 'string' && params.type !== 'Todos' ? params.type : undefined;
  const city = typeof params.city === 'string' && params.city !== 'Todas' ? params.city : undefined;
  const rooms = typeof params.rooms === 'string' ? parseInt(params.rooms) : undefined;
  const bathrooms = typeof params.bathrooms === 'string' ? parseInt(params.bathrooms) : undefined;
  const stratum = typeof params.stratum === 'string' ? parseInt(params.stratum) : undefined;
  const sortParam = typeof params.sort === 'string' ? params.sort : 'desc';
  
  const where: Prisma.PropertyWhereInput = {};
  if (modality) where.modality = modality;
  if (type) where.propertyType = type;
  if (city) where.city = city;
  if (rooms) where.bedrooms = { gte: rooms };
  if (bathrooms) where.bathrooms = { gte: bathrooms };
  if (stratum) where.stratum = { gte: stratum };

  let properties: any[] = [];
  let dbError = null;

  let dbCities: string[] = [];

  try {
    properties = await prisma.property.findMany({ 
        where,
        orderBy: { createdAt: sortParam === 'asc' ? 'asc' : 'desc' } 
    });
    const distinctCities = await prisma.property.findMany({
        select: { city: true },
        distinct: ['city']
    });
    dbCities = distinctCities.map(c => c.city);
  } catch (error: any) {
    dbError = error.message || String(error);
    console.error("Database Error on /propiedades:", error);
  }

  const defaultCities = ["Santa Rosa de Cabal", "Pereira", "Dosquebradas", "Armenia", "Manizales"];
  const allCities = Array.from(new Set([...defaultCities, ...dbCities])).sort();

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
<PublicNavbar />
<main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex-grow">
<header className="mb-12">
<h1 className="font-display-lg text-display-lg text-primary mb-2">Inmuebles disponibles</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Explora propiedades en venta y arriendo en el Eje Cafetero.</p>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

{dbError && (
  <div className="lg:col-span-12 bg-red-100 text-red-800 p-6 rounded-xl border border-red-200 mb-8 font-mono text-sm overflow-x-auto">
    <h3 className="font-bold text-lg mb-2">Error de Base de Datos:</h3>
    <pre>{dbError}</pre>
  </div>
)}

<aside className="lg:col-span-3 space-y-8">
<form method="GET" action="/propiedades" className="bg-surface-container-low p-6 rounded-xl sticky top-32 border border-outline-variant/30">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md text-primary">Filtros</h3>
<Link href="/propiedades" className="text-outline text-label-md hover:text-primary transition-colors">Limpiar</Link>
</div>
<div className="space-y-6 custom-scrollbar max-h-[calc(100vh-400px)] overflow-y-auto pr-2">

<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Operación</label>
<div className="grid grid-cols-2 gap-2">
<label className="cursor-pointer">
<input type="radio" name="modality" value="VENTA" defaultChecked={modality === 'VENTA'} className="peer hidden" />
<div className="py-2 px-4 rounded-lg border border-outline-variant peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary text-label-md transition-all text-center hover:border-primary">Venta</div>
</label>
<label className="cursor-pointer">
<input type="radio" name="modality" value="ARRIENDO" defaultChecked={modality === 'ARRIENDO'} className="peer hidden" />
<div className="py-2 px-4 rounded-lg border border-outline-variant peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary text-label-md transition-all text-center hover:border-primary">Arriendo</div>
</label>
</div>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Tipo de Propiedad</label>
<select name="type" defaultValue={type || "Todos"} className="w-full rounded-lg border-outline-variant bg-surface focus:ring-primary focus:border-primary text-body-md py-3 px-4">
<option value="Todos">Todos</option>
<option value="Apartamento">Apartamento</option>
<option value="Casa">Casa</option>
<option value="Finca">Finca</option>
<option value="Local Comercial">Local Comercial</option>
</select>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Ciudad</label>
<select name="city" defaultValue={city || "Todas"} className="w-full rounded-lg border-outline-variant bg-surface focus:ring-primary focus:border-primary text-body-md py-3 px-4">
<option value="Todas">Todas</option>
{allCities.map(c => (
  <option key={c} value={c}>{c}</option>
))}
</select>
</div>

<div className="space-y-6">
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Habitaciones</label>
<div className="flex gap-1">
<label className="cursor-pointer"><input type="radio" name="rooms" value="1" defaultChecked={rooms === 1} className="peer hidden" /><div className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-body-md">1+</div></label>
<label className="cursor-pointer"><input type="radio" name="rooms" value="2" defaultChecked={rooms === 2} className="peer hidden" /><div className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-body-md">2+</div></label>
<label className="cursor-pointer"><input type="radio" name="rooms" value="3" defaultChecked={rooms === 3} className="peer hidden" /><div className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-body-md">3+</div></label>
</div>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Baños</label>
<div className="flex gap-1">
<label className="cursor-pointer"><input type="radio" name="bathrooms" value="1" defaultChecked={bathrooms === 1} className="peer hidden" /><div className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-body-md">1+</div></label>
<label className="cursor-pointer"><input type="radio" name="bathrooms" value="2" defaultChecked={bathrooms === 2} className="peer hidden" /><div className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-body-md">2+</div></label>
</div>
</div>
</div>
<div>
<label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-secondary">Estrato</label>
<div className="flex flex-wrap gap-2">
<label className="cursor-pointer"><input type="radio" name="stratum" value="4" defaultChecked={stratum === 4} className="peer hidden" /><div className="px-3 py-1 flex items-center justify-center rounded-full border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-label-md">4</div></label>
<label className="cursor-pointer"><input type="radio" name="stratum" value="5" defaultChecked={stratum === 5} className="peer hidden" /><div className="px-3 py-1 flex items-center justify-center rounded-full border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-label-md">5</div></label>
<label className="cursor-pointer"><input type="radio" name="stratum" value="6" defaultChecked={stratum === 6} className="peer hidden" /><div className="px-3 py-1 flex items-center justify-center rounded-full border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-label-md">6</div></label>
</div>
</div>

</div>
<button type="submit" className="w-full mt-8 bg-secondary text-on-secondary py-4 rounded-xl font-label-md hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/10">
<span className="material-symbols-outlined text-[20px]">search</span>
                        Aplicar Filtros
                    </button>
</form>
</aside>

<div className="lg:col-span-9">
<div className="flex justify-between items-center mb-6">
<span className="font-body-md text-on-surface-variant"><strong className="text-primary">{properties.length}</strong> inmuebles encontrados</span>
<SortSelect />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

{properties.length === 0 ? (
    <div className="col-span-1 md:col-span-2 text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-xl border border-outline-variant/20">
        No hay inmuebles que coincidan con tu búsqueda.
    </div>
) : (
    properties.map(p => (
        <PropertyCard key={p.id} p={p} />
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
</div>
  );
}