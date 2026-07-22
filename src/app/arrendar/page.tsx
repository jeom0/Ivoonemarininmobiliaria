import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ArrendarForm from "@/components/ArrendarForm";
import Link from "next/link";

export default function ArrendarPage() {
  return (
    <>
      <PublicNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="pr-0 lg:pr-12">
              <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
                Arriende su propiedad con <span className="text-primary">seguridad</span> y rentabilidad.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
                Nos encargamos de todo el proceso: desde la promoción y selección del inquilino ideal, hasta la gestión del contrato y aseguramiento de sus pagos mes a mes.
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
              <img className="w-full h-full object-cover" alt="Luxury apartment with balcony" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWtV7ZP8sh2RULYc0DZHTWAMtqfLUVPDWBDvcnXQgGlPwkQv_xtX27dlx4vi1fVW4BTKDE49b9T55PJzHSCZbD4BUXptzRHRBfpbV6FyUFH5OsBgMhpWrn5fRo_HI_iXkfGVHUEGQNWdTaWxvPRkoPT1CtbEjib7HDPbsUGRUKB8Gtor9X_ORRqViYMLS_jQq_nj753l8ht19iDy2XmNkp24ixLGJAAgeo56QvnqCiiZYpsgo5-AtOgI_cet2XYKmLgP5C31PDD3I"/>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bento-card p-4 backdrop-blur-md bg-surface-container-lowest/90 border-none flex items-center gap-4 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface m-0">Estudio Riguroso</p>
                  <p className="font-body-md text-[14px] text-on-surface-variant m-0">Inquilinos con capacidad comprobada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Benefits Section */}
        <section className="bg-surface-container-low py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">¿Por qué arrendar con nosotros?</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Un servicio integral diseñado para proteger su patrimonio y garantizar su flujo de ingresos sin preocupaciones.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Benefit 1 */}
              <div className="bento-card p-8 ambient-shadow-hover flex flex-col h-full rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Respaldo Jurídico</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  Contratos sólidos redactados por expertos legales. Pólizas de arrendamiento para proteger sus ingresos ante incumplimientos.
                </p>
              </div>
              {/* Benefit 2 */}
              <div className="bento-card p-8 ambient-shadow-hover flex flex-col h-full rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <div className="w-14 h-14 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>filter_alt</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Filtro Riguroso de Interesados</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  Calificamos a cada prospecto a través de centrales de riesgo y verificamos sus ingresos antes de programar visitas o firmar.
                </p>
              </div>
              {/* Benefit 3 */}
              <div className="bento-card p-8 ambient-shadow-hover flex flex-col h-full rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>handyman</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Gestión de Mantenimiento</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  Nos encargamos de coordinar las reparaciones necesarias durante el contrato, mediando entre usted y el inquilino.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
          <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-12">Arriende fácil y rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Line connecting steps */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-outline-variant/50 z-0"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-primary text-primary rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4 ambient-shadow">1</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Visita y Avalúo</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Fijamos un canon de arrendamiento competitivo.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-outline-variant text-on-surface-variant rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4">2</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Publicación Efectiva</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Promocionamos su propiedad en los mejores portales.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-outline-variant text-on-surface-variant rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4">3</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Estudio de Arrendatarios</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Evaluación financiera con aseguradora aliada.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-surface-bright border-2 border-outline-variant text-on-surface-variant rounded-full flex items-center justify-center font-headline-md text-headline-md mb-4">4</div>
              <h4 className="font-label-md text-label-md text-on-surface mb-2">Firma y Entrega</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">Inventario detallado y formalización legal del contrato.</p>
            </div>
          </div>
        </section>

        {/* Capture Form Section */}
        <section className="bg-surface-container py-section-gap" id="formulario-captacion">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="bento-card overflow-hidden ambient-shadow flex flex-col lg:flex-row rounded-xl bg-surface-container-lowest border border-outline-variant/30">
              {/* Form Image/Info Side */}
              <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
                <img className="absolute inset-0 w-full h-full object-cover" alt="Keys delivering" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-LWqIVq84771cEQOMlwLLbmYLNMIYqXSe2rlYcuaL1ammQuys6A0CaHetXY2dszKV3s3LWlVjTdyEcV-ZJECHR0RIZVIQio-z3yQk_QDyugVKSsbfMDsIMvpvKdn1a9btWVmpXBEsSNkFg7BjecpWffpoP-ZtG6r9Tl0apA2yoUZvUdVmixSfBRvlbN4T7uD8v5r3_V8d-mgY6TrzU8VdetUKhpzNzB6208MHui-1sM0XnRpY6LwpJPRIFyzotHVehNAsHn4aIVk"/>
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <h3 className="font-headline-lg text-headline-lg text-on-primary mb-4">Déjenos su propiedad</h3>
                  <p className="font-body-md text-body-md text-on-primary/90">
                    Complete este formulario y nos contactaremos para asesorarle en la estimación del canon y requisitos para arrendar con seguridad.
                  </p>
                </div>
              </div>
              {/* Form Side */}
              <div className="lg:w-3/5 p-8 md:p-12 bg-surface-bright">
                <ArrendarForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
