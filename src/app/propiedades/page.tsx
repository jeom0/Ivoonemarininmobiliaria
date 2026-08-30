import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SortSelect from "@/components/SortSelect";
import PropertyCard from "@/components/PropertyCard";
import { Prisma } from '@prisma/client';

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

  // Regla de 2 Semanas (14 Días) para Novedades
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  // Filtros Especiales desde URL ("Ver todas" de Secciones del Home)
  const isFeatured = params.featured === 'true';
  const isInvestment = params.investment === 'true';
  const isNovedades = params.novedades === 'true' || params.status === 'NUEVO';
  const statusParam = typeof params.status === 'string' && params.status !== 'Todos' ? params.status : undefined;
  
  const where: Prisma.PropertyWhereInput = {};
  if (modality) where.modality = modality;
  if (type) where.propertyType = type;
  if (city) where.city = city;
  if (rooms) where.bedrooms = { gte: rooms };
  if (bathrooms) where.bathrooms = { gte: bathrooms };
  if (stratum) where.stratum = { gte: stratum };
  if (isFeatured) where.isFeatured = true;
  if (isInvestment) where.isInvestment = true;
  
  if (isNovedades) {
    // Solo inmuebles creados en los últimos 14 días
    where.createdAt = { gte: twoWeeksAgo };
  } else if (statusParam) {
    where.status = statusParam;
  }

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
    dbCities = distinctCities.map(c => c.city).filter(Boolean);
  } catch (error: any) {
    dbError = error.message || String(error);
    console.error("Database Error on /propiedades:", error);
  }

  const defaultCities = ["Santa Rosa de Cabal", "Pereira", "Dosquebradas", "Armenia", "Manizales"];
  const allCities = Array.from(new Set([...defaultCities, ...dbCities])).sort();

  // Título y subtítulo adaptables según el filtro aplicado al hacer clic en "Ver todas"
  let pageTitle = "Inmuebles disponibles";
  let pageSubtitle = "Explora propiedades exclusivas en venta y arriendo en el Eje Cafetero.";
  let filterBadge = null;

  if (isFeatured) {
    pageTitle = "Inmuebles Destacados";
    pageSubtitle = "Mostrando todas las propiedades seleccionadas como destacadas por su ubicación y valor exclusivo.";
    filterBadge = "Destacadas";
  } else if (isInvestment) {
    pageTitle = "Oportunidades de Inversión";
    pageSubtitle = "Mostrando propiedades catalogadas de alta rentabilidad e inversión estratégica.";
    filterBadge = "Alta Rentabilidad";
  } else if (isNovedades) {
    pageTitle = "Nuevos Inmuebles (Últimas 2 Semanas)";
    pageSubtitle = "Mostrando inmuebles incorporados a nuestro catálogo en los últimos 14 días.";
    filterBadge = "Novedades (< 14 días)";
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <PublicNavbar />

      {/* Contenedor Expandido de Borde a Borde */}
      <main className="pt-8 md:pt-10 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 w-full max-w-[1750px] mx-auto flex-grow overflow-x-hidden">
        
        {/* Banner de Encabezado Adaptable */}
        <header className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            {filterBadge && (
              <span className="inline-flex items-center gap-1 text-secondary font-label-md text-xs tracking-widest block uppercase mb-1 font-bold">
                <span className="material-symbols-outlined text-sm">filter_alt</span>
                Filtro Activo: {filterBadge}
              </span>
            )}
            <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary mb-2 tracking-tight">
              {pageTitle}
            </h1>
            <p className="font-body-lg text-on-surface-variant text-sm md:text-base max-w-2xl">
              {pageSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary font-label-md text-xs md:text-sm font-semibold">
              <span className="material-symbols-outlined text-sm">home_work</span>
              {properties.length} inmueble{properties.length !== 1 ? 's' : ''} encontrado{properties.length !== 1 ? 's' : ''}
            </span>
          </div>
        </header>

        {/* Layout Principal: Filtro hacia el borde + Grilla de 3 Inmuebles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Database Error Alert */}
          {dbError && (
            <div className="lg:col-span-12 bg-red-100 text-red-800 p-6 rounded-2xl border border-red-200 mb-6 font-mono text-sm overflow-x-auto shadow-sm">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Error de Base de Datos:
              </h3>
              <pre>{dbError}</pre>
            </div>
          )}

          {/* Panel de Filtros Lateral (Ubicado hacia los bordes) */}
          <aside className="lg:col-span-3 xl:col-span-3 2xl:col-span-2.5">
            <form 
              method="GET" 
              action="/propiedades" 
              className="bg-surface-container-lowest border border-outline-variant/40 p-6 rounded-2xl sticky top-28 shadow-sm space-y-6"
            >
              {/* Header Filtros */}
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <h3 className="font-headline-md text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">tune</span>
                  Filtros
                </h3>
                <Link 
                  href="/propiedades" 
                  className="text-xs font-label-md font-medium text-on-surface-variant hover:text-primary transition-colors bg-surface-container hover:bg-surface-container-high px-3 py-1.5 rounded-full"
                >
                  Limpiar todos
                </Link>
              </div>

              <div className="space-y-6 custom-scrollbar max-h-[calc(100vh-280px)] overflow-y-auto pr-1">

                {/* Colecciones Especiales */}
                <div>
                  <label className="font-label-md text-xs block mb-2.5 uppercase tracking-wider text-secondary font-bold">
                    Categoría Especial
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-surface-container/50 transition-colors">
                      <input 
                        type="checkbox" 
                        name="featured" 
                        value="true" 
                        defaultChecked={isFeatured} 
                        className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                      />
                      <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#D4AF37]">star</span>
                        Solo Destacadas
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-surface-container/50 transition-colors">
                      <input 
                        type="checkbox" 
                        name="investment" 
                        value="true" 
                        defaultChecked={isInvestment} 
                        className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                      />
                      <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-secondary">trending_up</span>
                        Oportunidad Inversión
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-surface-container/50 transition-colors">
                      <input 
                        type="checkbox" 
                        name="novedades" 
                        value="true" 
                        defaultChecked={isNovedades} 
                        className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                      />
                      <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-primary">new_releases</span>
                        Novedades (&lt; 2 semanas)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Operación (Venta / Arriendo) */}
                <div>
                  <label className="font-label-md text-xs block mb-2.5 uppercase tracking-wider text-secondary font-bold">
                    Operación
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="cursor-pointer">
                      <input 
                        type="radio" 
                        name="modality" 
                        value="VENTA" 
                        defaultChecked={modality === 'VENTA'} 
                        className="peer hidden" 
                      />
                      <div className="py-2.5 px-3 rounded-xl border border-outline-variant/60 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary text-xs font-semibold transition-all text-center hover:border-primary/50 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm">sell</span> Venta
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input 
                        type="radio" 
                        name="modality" 
                        value="ARRIENDO" 
                        defaultChecked={modality === 'ARRIENDO'} 
                        className="peer hidden" 
                      />
                      <div className="py-2.5 px-3 rounded-xl border border-outline-variant/60 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary text-xs font-semibold transition-all text-center hover:border-primary/50 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm">key</span> Arriendo
                      </div>
                    </label>
                  </div>
                </div>

                {/* Tipo de Propiedad */}
                <div>
                  <label className="font-label-md text-xs block mb-2 uppercase tracking-wider text-secondary font-bold">
                    Tipo de Propiedad
                  </label>
                  <select 
                    name="type" 
                    defaultValue={type || "Todos"} 
                    className="w-full rounded-xl border-outline-variant/60 bg-surface focus:ring-primary focus:border-primary text-sm py-2.5 px-3.5"
                  >
                    <option value="Todos">Todos los tipos</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Finca">Finca</option>
                    <option value="Lote">Lote</option>
                    <option value="Local Comercial">Local Comercial</option>
                  </select>
                </div>

                {/* Ciudad */}
                <div>
                  <label className="font-label-md text-xs block mb-2 uppercase tracking-wider text-secondary font-bold">
                    Ciudad
                  </label>
                  <select 
                    name="city" 
                    defaultValue={city || "Todas"} 
                    className="w-full rounded-xl border-outline-variant/60 bg-surface focus:ring-primary focus:border-primary text-sm py-2.5 px-3.5"
                  >
                    <option value="Todas">Todas las ciudades</option>
                    {allCities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Habitaciones & Baños */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-md text-xs block mb-2 uppercase tracking-wider text-secondary font-bold">
                      Habitaciones
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((r) => (
                        <label key={r} className="cursor-pointer flex-1">
                          <input 
                            type="radio" 
                            name="rooms" 
                            value={r} 
                            defaultChecked={rooms === r} 
                            className="peer hidden" 
                          />
                          <div className="h-9 flex items-center justify-center rounded-lg border border-outline-variant/60 peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary peer-checked:font-bold hover:border-primary text-xs transition-all">
                            {r}+
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-label-md text-xs block mb-2 uppercase tracking-wider text-secondary font-bold">
                      Baños
                    </label>
                    <div className="flex gap-1">
                      {[1, 2].map((b) => (
                        <label key={b} className="cursor-pointer flex-1">
                          <input 
                            type="radio" 
                            name="bathrooms" 
                            value={b} 
                            defaultChecked={bathrooms === b} 
                            className="peer hidden" 
                          />
                          <div className="h-9 flex items-center justify-center rounded-lg border border-outline-variant/60 peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary peer-checked:font-bold hover:border-primary text-xs transition-all">
                            {b}+
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estrato */}
                <div>
                  <label className="font-label-md text-xs block mb-2 uppercase tracking-wider text-secondary font-bold">
                    Estrato
                  </label>
                  <div className="flex gap-2">
                    {[4, 5, 6].map((s) => (
                      <label key={s} className="cursor-pointer flex-1">
                        <input 
                          type="radio" 
                          name="stratum" 
                          value={s} 
                          defaultChecked={stratum === s} 
                          className="peer hidden" 
                        />
                        <div className="py-1.5 flex items-center justify-center rounded-xl border border-outline-variant/60 peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary peer-checked:font-bold hover:border-primary text-xs transition-all">
                          {s}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Botón Buscar / Aplicar */}
              <button 
                type="submit" 
                className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-label-md text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">search</span>
                Buscar Inmuebles
              </button>
            </form>
          </aside>

          {/* Sección Principal de Inmuebles (3 por fila en Pantallas Grandes) */}
          <section className="lg:col-span-9 xl:col-span-9 2xl:col-span-9.5">
            
            {/* Barra de Conteo y Ordenamiento */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
              <span className="font-body-md text-on-surface-variant text-sm flex items-center gap-2">
                Mostrando <strong className="text-primary font-bold">{properties.length}</strong> propiedades disponibles
                {filterBadge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                    {filterBadge}
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <SortSelect />
              </div>
            </div>

            {/* Grilla de Inmuebles: 1 col en móvil, 2 en tablet, 3 EN DESKTOP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.length === 0 ? (
                <div className="col-span-full text-center py-16 px-4 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
                  <span className="material-symbols-outlined text-5xl text-primary/40">search_off</span>
                  <h3 className="font-headline-md text-lg text-primary font-bold">No encontramos inmuebles coincidentes</h3>
                  <p className="text-xs max-w-md mx-auto">Intenta ajustar los filtros de búsqueda o haz clic en "Limpiar todos" para ver toda la oferta disponible.</p>
                </div>
              ) : (
                properties.map(p => (
                  <PropertyCard key={p.id} p={p} />
                ))
              )}
            </div>

            {/* Paginación */}
            {properties.length > 0 && (
              <div className="mt-14 flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-on-primary font-bold shadow-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/40 text-on-surface hover:bg-surface-container transition-all cursor-pointer">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/40 text-on-surface hover:bg-surface-container transition-all cursor-pointer">3</button>
                <span className="px-2 text-outline-variant">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            )}
          </section>

        </div>
      </main>
      
      <PublicFooter />
    </div>
  );
}