import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <>
      <PublicNavbar />
      
      <main className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        {/* Hero / History Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Content Area */}
            <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1 fade-in">
              <h1 className="font-display-lg text-display-lg text-primary">
                Conocimiento, <br />Elegancia y Confianza.
              </h1>
              <div className="w-16 h-1 bg-secondary-fixed-dim"></div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Con más de una década de experiencia en el Eje Cafetero, me dedico a conectar a clientes exigentes con propiedades excepcionales. Mi enfoque va más allá de una simple transacción; se trata de comprender sus sueños y materializarlos a través de un servicio personalizado y confidencial.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Cada propiedad cuenta una historia, y mi pasión es encontrar el escenario perfecto para su próximo capítulo de vida, asegurando una experiencia fluida, transparente y altamente profesional en cada etapa del proceso inmobiliario.
              </p>
            </div>
            
            {/* Image Area */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full min-h-[500px] order-1 lg:order-2 slide-up">
              <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-xl relative border border-outline-variant/30 group">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Retrato profesional Ivonne Marin" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_mdCQTXoKNLcSLtmWVxpT9G-_9J_1kb8Tb-N9_TZ40m_6J-IcQGmdCOd1EyU7Hvd3GTZEdbzkreTaXa_aKqqWL2mZOd1RzVDvBM7qMaVM9-jk6PF4qv7D_Li9mpWmRYByMETjXKMyHcCtCxsp3wA79O3pGcOllPsa-i7y51i_zVY2jBETXzOW8os2uiUJmzU4yIXplsEnMtRGnRmN4vqS7vQoNRRg80UskuBZs1qw5Fr4Uxp4yUYzgSJJk04yQeDoeDRrP2LFov8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-section-gap bg-surface-container-low relative overflow-hidden mt-10">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-fixed-dim/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Nuestra Filosofía</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Los pilares que sostienen cada asesoría y cada relación construida a lo largo de los años.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Value: Cercanía */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-secondary-fixed-dim/30 flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Cercanía</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Un trato humano y empático. Entendemos que adquirir una propiedad es una decisión de vida vital, por lo que acompañamos cada paso con calidez y comprensión genuina.
                </p>
              </div>

              {/* Value: Transparencia */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-secondary-fixed-dim/30 flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Transparencia</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Claridad absoluta en cada detalle. Proveemos información precisa, honesta y oportuna, garantizando que cada decisión se tome sobre una base de confianza total.
                </p>
              </div>

              {/* Value: Profesionalismo */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-secondary-fixed-dim/30 flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Profesionalismo</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Excelencia en la ejecución. Aplicamos nuestro profundo conocimiento del mercado y altos estándares éticos para asegurar resultados óptimos y seguros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zonas de Experiencia */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="order-2 lg:order-1 h-[400px] rounded-xl overflow-hidden relative shadow-lg border border-outline-variant/30 group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Vista aérea del Eje Cafetero" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpMvk0dl6EsGv5KQsJVAzwFsHV3yAHMJyQteyHvOuRny-qcBpNNIeRPgBD2_067WvUPBpX2wctU-j0HS3Bx23zwQ-04fZEdNlIty8MCXZk7VV_eVdOfeyPu5L4xdDeYPfq4F9c90CuDHwsMAfuVEhmS1AmckC8sthTUMAZGGL4FtC1tOaH4AOGIUWzSOhv_OmtHUilm-VhznKaAEIDoIjEell-gLnl-388i1HU6rPuFmnb95UrEZqJ_95osTAzaTtadKN2Ue2Dn8o"
              />
              {/* Overlay Glass Box */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/80 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h4 className="font-label-md text-label-md text-primary tracking-widest uppercase mb-2">Cobertura Principal</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-secondary-fixed-dim/40 text-on-surface px-3 py-1 rounded-full font-label-md text-[12px]">Pereira</span>
                  <span className="bg-secondary-fixed-dim/40 text-on-surface px-3 py-1 rounded-full font-label-md text-[12px]">Armenia</span>
                  <span className="bg-secondary-fixed-dim/40 text-on-surface px-3 py-1 rounded-full font-label-md text-[12px]">Manizales</span>
                  <span className="bg-secondary-fixed-dim/40 text-on-surface px-3 py-1 rounded-full font-label-md text-[12px]">Cerritos</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6 lg:pl-12">
              <h2 className="font-headline-lg text-headline-lg text-primary">El Eje Cafetero: <br />Nuestro Lienzo</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Conocemos profundamente el territorio. Desde las exclusivas parcelaciones en Cerritos hasta los elegantes penthouses en el corazón de Pereira y Armenia.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Nuestra red de contactos y conocimiento específico de cada sector nos permite identificar oportunidades únicas de inversión y espacios de vivienda que superan las expectativas, siempre respetando la estética y el entorno natural privilegiado de nuestra región.
              </p>
              <div className="mt-4">
                <Link href="/propiedades" className="bg-transparent border border-outline-variant text-primary hover:bg-primary hover:text-white transition-colors rounded px-6 py-3 font-label-md text-label-md inline-flex items-center gap-2">
                  Explorar Inmuebles
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-section-gap bg-surface-bright border-t border-surface-container">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-12">Experiencias de nuestros clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto text-left">
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-secondary-fixed-dim/20 relative">
                <span className="material-symbols-outlined text-secondary-fixed-dim absolute top-6 right-6 opacity-30" style={{ fontSize: "40px" }}>format_quote</span>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10 italic">
                  "La asesoría de Ivonne fue impecable. Entendió exactamente lo que buscábamos para nuestra casa de retiro en el Eje Cafetero. Su discreción y conocimiento del mercado de lujo son invaluables."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">FR</div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Familia Restrepo</h4>
                    <span className="font-body-md text-[13px] text-on-surface-variant">Inversores Inmobiliarios</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-secondary-fixed-dim/20 relative">
                <span className="material-symbols-outlined text-secondary-fixed-dim absolute top-6 right-6 opacity-30" style={{ fontSize: "40px" }}>format_quote</span>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10 italic">
                  "Vender nuestra propiedad de alta gama parecía un reto, pero el equipo de Ivonne manejó todo con un nivel de profesionalismo superior. Una transacción transparente y sin contratiempos."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">CG</div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Carlos G.</h4>
                    <span className="font-body-md text-[13px] text-on-surface-variant">Propietario en Cerritos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
          <div className="bg-primary-container rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Subtle background blur */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            
            <h2 className="font-headline-lg text-headline-lg text-on-primary-container relative z-10 mb-4 max-w-2xl">
              Comience su próximo capítulo con la asesoría correcta
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary-container/80 relative z-10 mb-8 max-w-xl">
              Permítanos escuchar sus requerimientos y diseñar una estrategia a medida para la compra, venta o alquiler de su propiedad.
            </p>
            <a 
              href="https://wa.me/573000000000?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa" 
              target="_blank"
              className="bg-white text-primary-container hover:bg-secondary-fixed transition-colors rounded-xl px-8 py-4 font-label-md text-label-md relative z-10 shadow-lg flex items-center gap-2 hover:scale-105"
            >
              <span className="material-symbols-outlined">chat</span>
              Agendar Asesoría Personalizada
            </a>
          </div>
        </section>
      </main>
      
      <PublicFooter />
    </>
  );
}
