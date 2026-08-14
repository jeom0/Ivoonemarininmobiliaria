import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import VenderForm from "@/components/VenderForm";
import Link from "next/link";

export default function VenderPage() {
  return (
    <>
      <PublicNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="pr-0 lg:pr-12">
              <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
                Confíe su propiedad a <span className="text-primary">expertos</span> del Eje Cafetero.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
                Maximizamos el valor de su inmueble con una estrategia de marketing de alto nivel, fotografía profesional y una red de clientes exclusivos. Su tranquilidad es nuestra prioridad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="inline-flex justify-center items-center gap-2 font-label-md text-label-md bg-primary text-on-primary px-8 py-4 rounded-xl hover:bg-surface-tint transition-all ambient-shadow" href="#formulario-captacion">
                  Comenzar el proceso
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link href="/contacto" className="inline-flex justify-center items-center gap-2 font-label-md text-label-md border border-outline-variant text-on-surface px-8 py-4 rounded-xl hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Hablar con un asesor
                </Link>
              </div>
            </div>
            <div className="h-[400px] lg:h-[500px] rounded-[24px] overflow-hidden ambient-shadow relative mt-12 lg:mt-0">
              <img className="w-full h-full object-cover" alt="Luxury living room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs59mzEGhg1OWF8G47q7hzuTuINz_dXBiBm1QhAeyES1qreUXW4k_aOR8fC90MGvE00ay4wFu6kAlaDCrrS_epwcwOTTfoFYVJVidClZ33MEFqaRT1ggJPi2o4VSdIYifcuNpjmqOxT7XlzYBRtnimEA9mp5o73XED8jxvHPGRLLoYukrUL-LtnW2EvUtaGZ7ZuXTrJXNRz4S-0Q2-6xGZ8dtdaU08DLZyHRhVeUHSD7rP8JDhm2H0LyLueICvxCKcvzLRuse6JD0"/>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bento-card p-4 backdrop-blur-md bg-surface-container-lowest/90 border-none flex items-center gap-4 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">real_estate_agent</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface m-0">Valoración Precisa</p>
                  <p className="font-body-md text-[14px] text-on-surface-variant m-0">Conocemos el mercado actual</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Benefits Section */}
        <section className="bg-surface-container-low py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">¿Por qué vender con nosotros?</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Un servicio integral diseñado para proteger su patrimonio y encontrar al comprador ideal en el menor tiempo posible.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Benefit 1 */}
              <div className="bento-card p-8 ambient-shadow-hover flex flex-col h-full rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>camera</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Producción Visual Premium</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  Su inmueble destacará. Realizamos fotografía arquitectónica, recorridos virtuales 360° y tomas aéreas con dron para mostrar cada detalle con elegancia.
                </p>
              </div>
              {/* Benefit 2 */}
              <div className="bento-card p-8 ambient-shadow-hover flex flex-col h-full rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <div className="w-14 h-14 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>filter_alt</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Filtro Riguroso de Interesados</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  Protegemos su tiempo y privacidad. Calificamos a cada prospecto financiera y legalmente antes de programar cualquier visita a su propiedad.
                </p>
              </div>
              {/* Benefit 3 */}
              <div className="bento-card p-8 ambient-shadow-hover flex flex-col h-full rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Acompañamiento Legal</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  Gestión documental segura. Redactamos promesas de compraventa y le acompañamos hasta la firma de escrituras, minimizando cualquier riesgo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
          <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-12">Un proceso transparente y eficiente</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Line connecting steps */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-outline-variant/50 z-0"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-primary text-primary rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4 ambient-shadow">1</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Análisis y Valoración</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Estudio de mercado para definir el precio óptimo.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-outline-variant text-on-surface-variant rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4">2</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Estrategia y Publicación</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Creación de material visual y difusión multicanal.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-outline-variant text-on-surface-variant rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4">3</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Gestión de Visitas</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Recorridos con clientes pre-calificados.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-outline-variant text-on-surface-variant rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4">4</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Cierre y Legalización</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Acompañamiento hasta la entrega formal.</p>
            </div>
          </div>
        </section>

        {/* Capture Form Section */}
        <section className="bg-surface-container py-section-gap" id="formulario-captacion">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="bento-card overflow-hidden ambient-shadow flex flex-col lg:flex-row rounded-xl bg-surface-container-lowest border border-outline-variant/30">
              {/* Form Image/Info Side */}
              <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
                <img className="absolute inset-0 w-full h-full object-cover" alt="Real estate contract" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-LWqIVq84771cEQOMlwLLbmYLNMIYqXSe2rlYcuaL1ammQuys6A0CaHetXY2dszKV3s3LWlVjTdyEcV-ZJECHR0RIZVIQio-z3yQk_QDyugVKSsbfMDsIMvpvKdn1a9btWVmpXBEsSNkFg7BjecpWffpoP-ZtG6r9Tl0apA2yoUZvUdVmixSfBRvlbN4T7uD8v5r3_V8d-mgY6TrzU8VdetUKhpzNzB6208MHui-1sM0XnRpY6LwpJPRIFyzotHVehNAsHn4aIVk"/>
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <h3 className="font-headline-lg text-headline-lg text-on-primary mb-4">Cuéntenos sobre su propiedad</h3>
                  <p className="font-body-md text-body-md text-on-primary/90">
                    Complete este formulario preliminar y un asesor especializado se pondrá en contacto con usted en menos de 24 horas para agendar una visita técnica.
                  </p>
                </div>
              </div>
              {/* Form Side */}
              <div className="lg:w-3/5 p-8 md:p-12 bg-surface-bright">
                <VenderForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
