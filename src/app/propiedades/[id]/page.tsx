import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import PropertyLeadForm from "./PropertyLeadForm";
import PropertyGallery from "./PropertyGallery";

const prisma = new PrismaClient();

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const property = await prisma.property.findUnique({
    where: { id }
  });

  if (!property) {
    notFound();
  }

  // Format price
  const formattedPrice = property.price > 0 ? new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(property.price) : "Consultar precio";
  
  // Get admin info and settings
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  const settingsRecords = await prisma.setting.findMany();
  const settings = settingsRecords.reduce((acc, s) => { acc[s.key] = s.value; return acc; }, {} as Record<string, string>);
  
  const agentImage = settings.agent_image || adminUser?.image || settings.logoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBgZcfdPi_n0TAneC3N3wNfETdI8oO_G8QIPcsWa34_-98wnMr-m5RZQHICFsdciNAf2VLZZL3RkumToH7vrXWuozf0hInLZaGyF6lGXKOYDqmSjwITTmLqO7oLzDv_NqBTEzGBIEC-293iwhGjLJ6l22s1Hh9BxY-bjG8CudzkuWoKZkN2746Z-94jtta0xzNY9iv7o2Y7c-mWcOqmJCUpbG7QFOIoHu_kpCloGebH6kRR3hPJAX2d6QR6g-LUlCdd1kSrRt6Qj0w";
  const whatsappNumber = settings.whatsapp || "573000000000";

  // Parse Multimedia
  let videoUrl = null;
  if (property.videos) {
      try {
          const videos = JSON.parse(property.videos);
          if (videos.length > 0) videoUrl = videos[0];
      } catch(e) {}
  }
  
  let pdfUrl = null;
  if (property.documents) {
      try {
          const docs = JSON.parse(property.documents);
          if (docs.length > 0) pdfUrl = docs[0];
      } catch(e) {}
  }

  return (
    <>
      <PublicNavbar />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 min-h-screen">
        <nav className="flex mb-8 items-center gap-2 font-label-md text-label-md text-on-surface-variant overflow-x-auto whitespace-nowrap">
          <Link className="hover:text-primary" href="/">Inicio</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="hover:text-primary" href="/propiedades">Inmuebles</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold truncate max-w-[200px] md:max-w-none">{property.title}</span>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <PropertyGallery mainImage={property.mainImage} imagesString={property.images} />

            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant pb-8">
              <div className="space-y-2">
                <span className={`inline-block px-3 py-1 text-on-secondary-container font-label-md text-[12px] rounded-full uppercase tracking-wider ${property.status === 'DISPONIBLE' ? 'bg-secondary-container' : 'bg-surface-container-high'}`}>
                  {property.status === 'DISPONIBLE' ? 'Disponible' : 'Vendido'}
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary">{property.title}</h1>
                <p className="flex items-center gap-1 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  {property.city || 'Eje Cafetero, Colombia'}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-on-surface-variant font-label-md uppercase tracking-tighter">
                  {property.modality === 'VENTA' ? 'Precio de Venta' : 'Precio de Renta'}
                </p>
                <p className="font-display-lg text-display-lg text-primary">{formattedPrice}</p>
                <p className="text-[12px] text-on-surface-variant font-body-md">Cód: IM-{property.id.substring(0, 4).toUpperCase()}</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {property.builtArea && (
                <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-primary mb-2">square_foot</span>
                  <span className="text-[12px] font-label-md text-on-surface-variant">Área Total</span>
                  <span className="font-headline-md text-[18px]">{property.builtArea}m²</span>
                </div>
              )}
              {property.bedrooms && (
                <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
                  <span className="material-symbols-outlined text-primary mb-2">bed</span>
                  <span className="text-[12px] font-label-md text-on-surface-variant">Habitaciones</span>
                  <span className="font-headline-md text-[18px]">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
                  <span className="material-symbols-outlined text-primary mb-2">bathtub</span>
                  <span className="text-[12px] font-label-md text-on-surface-variant">Baños</span>
                  <span className="font-headline-md text-[18px]">{property.bathrooms}</span>
                </div>
              )}
              {property.parking !== null && property.parking !== undefined && (
                <div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
                  <span className="material-symbols-outlined text-primary mb-2">directions_car</span>
                  <span className="text-[12px] font-label-md text-on-surface-variant">Parqueadero</span>
                  <span className="font-headline-md text-[18px]">{property.parking}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary">Descripción Comercial</h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                {property.fullDesc || property.shortDesc || "Sin descripción"}
              </div>
            </div>

            {/* Información Extendida y Multimedia */}
            {(videoUrl || pdfUrl) && (
              <div className="space-y-6">
                <h2 className="font-headline-md text-headline-md text-primary">Información Extendida</h2>
                <div className="grid grid-cols-1 gap-6">
                  {pdfUrl && (
                    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                        </div>
                        <div>
                          <h4 className="font-label-md text-[16px] text-on-surface">Brochure del Inmueble</h4>
                          <p className="text-[13px] text-on-surface-variant">Descarga la ficha técnica detallada</p>
                        </div>
                      </div>
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-primary text-on-primary rounded-full font-label-md text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Descargar PDF
                      </a>
                    </div>
                  )}

                  {videoUrl && (
                    <div className="bg-black rounded-2xl overflow-hidden shadow-md aspect-video relative">
                      <video 
                        controls autoPlay muted loop playsInline 
                        className="w-full h-full object-cover"
                        src={videoUrl}
                      >
                        Tu navegador no soporta el formato de video.
                      </video>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Map Location */}
            <div className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary">Ubicación</h2>
              {property.lat && property.lng ? (
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center bg-surface-container">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&hl=es&z=15&output=embed`}
                  ></iframe>
                </div>
              ) : property.address ? (
                <div className="w-full h-40 rounded-2xl overflow-hidden shadow-inner relative flex flex-col items-center justify-center bg-surface-container gap-4">
                  <span className="material-symbols-outlined text-4xl text-primary">location_on</span>
                  <p className="font-body-lg">{property.address}</p>
                </div>
              ) : (
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner relative flex flex-col items-center justify-center bg-surface-container-high border-2 border-dashed border-outline-variant gap-4">
                  <span className="material-symbols-outlined text-4xl text-primary">map</span>
                  <p className="font-label-md text-on-surface-variant max-w-sm text-center">La ubicación exacta no está publicada. Contáctanos para consultar la ubicación.</p>
                  <a 
                    className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-xl font-label-md hover:opacity-90 transition-opacity"
                    href={`https://wa.me/573000000000?text=Hola,%20quisiera%20saber%20la%20ubicación%20exacta%20de%20la%20propiedad%20${property.title}%20(Cód:%20IM-${property.id.substring(0,4).toUpperCase()})`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined text-lg">location_on</span> Consultar Ubicación
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Lead Generation */}
          <aside className="space-y-gutter lg:sticky lg:top-24">
            <PropertyLeadForm 
              propertyId={property.id} 
              propertyCode={property.id.substring(0, 4).toUpperCase()} 
              propertyName={property.title} 
              agentImage={agentImage}
              whatsappNumber={whatsappNumber}
            />

            <div className="bg-primary p-6 rounded-2xl text-on-primary space-y-4">
              <h5 className="font-headline-md text-[18px]">¿Necesitas vender tu propiedad?</h5>
              <p className="font-body-md text-on-primary/80">Ofrecemos asesoría integral y posicionamiento premium para tu inmueble en el Eje Cafetero.</p>
              <button className="px-6 py-2 bg-secondary text-on-primary font-label-md rounded-lg w-full hover:opacity-90 transition-opacity">Más información</button>
            </div>
          </aside>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}

