import Link from "next/link";
import { PrismaClient, Prisma } from '@prisma/client';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SortSelect from "@/components/SortSelect";
import PropertyCard from "@/components/PropertyCard";

const prisma = new PrismaClient();

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
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <PublicNavbar />
      
      <main className="pt-28 md:pt-32 pb-section-gap px-4 sm:px-6 md:px-8 xl:px-12 w-full max-w-[1750px] mx-auto flex-grow">
        
        {/* Encabezado Principal */}
        <header className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">Catálogo de Inmuebles</span>
              <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary">Inmuebles disponibles</h1>
              <p className="font-body-md text-on-surface-variant mt-1">Explora propiedades en venta y arriendo en el Eje Cafetero.</p>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs md:text-sm">
                {properties.length} {properties.length === 1 ? 'propiedad' : 'propiedades'}
              </span>
            </div>
          </div>
        </header>

        {dbError && (
          <div className="bg-red-100 text-red-800 p-6 rounded-xl border border-red-200 mb-8 font-mono text-sm overflow-x-auto">
            <h3 className="font-bold text-lg mb-2">Error de Base de Datos:</h3>
            <pre>{dbError}</pre>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">

          {/* Aside Filtros - Empujado más hacia el borde izquierdo */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <form method="GET" action="/propiedades" className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl sticky top-28 border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">tune</span>
                  <h3 className="font-headline-md text-lg md:text-xl text-primary font-bold">Filtros</h3>
                </div>
                <Link href="/propiedades" className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">restart_alt</span> Limpiar
                </Link>
              </div>

              <div className="space-y-6 custom-scrollbar max-h-[calc(100vh-380px)] overflow-y-auto pr-1">

                {/* Modalidad Operación */}
                <div>
                  <label className="text-[11px] font-bold block mb-2.5 uppercase tracking-wider text-secondary">Operación</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="cursor-pointer">
                      <input type="radio" name="modality" value="VENTA" defaultChecked={modality === 'VENTA'} className="peer hidden" />
                      <div className="py-2.5 px-3 rounded-xl border border-outline-variant/50 bg-surface peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary font-label-md text-xs md:text-sm transition-all text-center font-bold hover:border-primary shadow-xs">
                        Venta
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="modality" value="ARRIENDO" defaultChecked={modality === 'ARRIENDO'} className="peer hidden" />
                      <div className="py-2.5 px-3 rounded-xl border border-outline-variant/50 bg-surface peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary font-label-md text-xs md:text-sm transition-all text-center font-bold hover:border-primary shadow-xs">
                        Arriendo
                      </div>
                    </label>
                  </div>
                </div>

                {/* Tipo de Propiedad */}
                <div>
                  <label className="text-[11px] font-bold block mb-2.5 uppercase tracking-wider text-secondary">Tipo de Propiedad</label>
                  <select name="type" defaultValue={type || "Todos"} className="w-full rounded-xl border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm py-2.5 px-3.5 outline-none transition-all">
                    <option value="Todos">Todos los tipos</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Finca">Finca</option>
                    <option value="Local Comercial">Local Comercial</option>
                  </select>
                </div>

                {/* Ciudad */}
                <div>
                  <label className="text-[11px] font-bold block mb-2.5 uppercase tracking-wider text-secondary">Ciudad</label>
                  <select name="city" defaultValue={city || "Todas"} className="w-full rounded-xl border-outline-variant/50 bg-surface focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm py-2.5 px-3.5 outline-none transition-all">
                    <option value="Todas">Todas las ciudades</option>
                    {allCities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Habitaciones y Baños */}
                <div className="space-y-5 pt-2 border-t border-outline-variant/20">
                  <div>
                    <label className="text-[11px] font-bold block mb-2.5 uppercase tracking-wider text-secondary">Habitaciones mínimas</label>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(num => (
                        <label key={num} className="cursor-pointer flex-1">
                          <input type="radio" name="rooms" value={num} defaultChecked={rooms === num} className="peer hidden" />
                          <div className="py-2 flex items-center justify-center rounded-xl border border-outline-variant/50 bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-xs md:text-sm transition-all shadow-xs">
                            {num}+
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold block mb-2.5 uppercase tracking-wider text-secondary">Baños mínimos</label>
                    <div className="flex gap-2">
                      {[1, 2].map(num => (
                        <label key={num} className="cursor-pointer flex-1">
                          <input type="radio" name="bathrooms" value={num} defaultChecked={bathrooms === num} className="peer hidden" />
                          <div className="py-2 flex items-center justify-center rounded-xl border border-outline-variant/50 bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-xs md:text-sm transition-all shadow-xs">
                            {num}+
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estrato */}
                <div className="pt-2 border-t border-outline-variant/20">
                  <label className="text-[11px] font-bold block mb-2.5 uppercase tracking-wider text-secondary">Estrato</label>
                  <div className="flex flex-wrap gap-2">
                    {[4, 5, 6].map(num => (
                      <label key={num} className="cursor-pointer flex-1">
                        <input type="radio" name="stratum" value={num} defaultChecked={stratum === num} className="peer hidden" />
                        <div className="py-2 flex items-center justify-center rounded-xl border border-outline-variant/50 bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container peer-checked:font-bold hover:border-primary text-xs md:text-sm transition-all shadow-xs">
                          {num}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Botón Aplicar */}
              <button type="submit" className="w-full mt-6 bg-primary text-on-primary py-3.5 rounded-xl font-label-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer font-bold text-sm">
                <span className="material-symbols-outlined text-[18px]">search</span>
                Aplicar Filtros
              </button>

            </form>
          </aside>

          {/* Área Principal de Propiedades (3 por fila en pantallas de escritorio) */}
          <div className="lg:col-span-8 xl:col-span-9">
            
            {/* Control Superior de Conteo y Ordenamiento */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-xs">
              <span className="font-body-md text-on-surface-variant text-sm md:text-base">
                Mostrando <strong className="text-primary font-bold">{properties.length}</strong> inmuebles
              </span>
              <SortSelect />
            </div>

            {/* Grilla de 3 propiedades por fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {properties.length === 0 ? (
                <div className="col-span-1 sm:col-span-2 xl:col-span-3 text-center py-16 px-4 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm space-y-3">
                  <span className="material-symbols-outlined text-5xl text-outline-variant">search_off</span>
                  <h3 className="font-headline-md text-primary font-bold text-lg">No encontramos resultados</h3>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">No hay inmuebles que coincidan con los filtros seleccionados. Intenta cambiar de ciudad o limpiar los filtros.</p>
                  <Link href="/propiedades" className="inline-block mt-4 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-label-md text-xs font-bold transition-colors">
                    Ver todos los inmuebles
                  </Link>
                </div>
              ) : (
                properties.map(p => (
                  <PropertyCard key={p.id} p={p} />
                ))
              )}

            </div>

          </div>

        </div>

      </main>

      <PublicFooter />
    </div>
  );
}