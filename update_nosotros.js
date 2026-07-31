const fs = require('fs');

const code = `import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <>
      <PublicNavbar />
      
      <main className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
        {/* Hero / Propósito Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-10 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1 fade-in">
              <span className="text-secondary font-label-md tracking-widest uppercase mb-[-10px] block">Nuestro Propósito</span>
              <h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg text-primary leading-tight">
                "Donde los sueños <br />encuentran su lugar."
              </h1>
              <div className="w-16 h-1 bg-secondary-fixed-dim rounded-full"></div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-medium">
                Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Creemos que un inmueble no es solo una propiedad; es el lugar donde nacen proyectos de vida, se construyen sueños y se generan oportunidades de inversión.
              </p>
              
              <div className="flex gap-4 mt-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/20 flex-1 hover:-translate-y-1 transition-transform">
                    <h4 className="font-headline-md text-primary mb-1">+10</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Años de experiencia</p>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/20 flex-1 hover:-translate-y-1 transition-transform">
                    <h4 className="font-headline-md text-primary mb-1">100%</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Transparencia</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 lg:col-start-8 h-[450px] order-1 lg:order-2 slide-up relative">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white group">
                <img 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                  alt="Retrato Ivonne Marin" 
                  src="/perfil.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent flex items-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-headline-md text-headline-md tracking-tight">Ivonne Marin</h3>
                    <span className="text-secondary font-body-md block mt-1">Fundadora & Asesora</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:12px_12px] -z-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:12px_12px] -z-10"></div>
            </div>
          </div>
        </section>

        {/* Misión y Visión Rediseñadas */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-10 relative">
              <div className="absolute -top-16 -left-8 text-[100px] md:text-[180px] font-display-lg text-surface-container-high/40 font-bold -z-10 select-none">01</div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-10 md:p-14 shadow-xl border border-outline-variant/30 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
                  </div>
                  <div>
                    <h3 className="font-display-md text-3xl md:text-4xl lg:text-display-md text-primary mb-6 flex items-center gap-4">
                      Nuestra Misión
                      <div className="h-px bg-outline-variant flex-grow"></div>
                    </h3>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      Brindar soluciones inmobiliarias integrales que generen confianza, seguridad y valor para nuestros clientes, acompañándolos en cada etapa de la compra, venta, e inversión de bienes raíces. Nos apoyamos en la innovación, la tecnología y un equipo humano comprometido para ofrecer un servicio cercano, transparente y eficiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-10 lg:col-start-3 relative mt-4 lg:-mt-12">
              <div className="absolute -top-16 -right-8 text-[100px] md:text-[180px] font-display-lg text-surface-container-high/40 font-bold -z-10 select-none text-right">02</div>
              <div className="bg-primary text-on-primary rounded-2xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                  </div>
                  <div>
                    <h3 className="font-display-md text-3xl md:text-4xl lg:text-display-md mb-6 flex items-center gap-4">
                      Nuestra Visión
                      <div className="h-px bg-white/20 flex-grow"></div>
                    </h3>
                    <p className="font-body-lg text-body-lg text-on-primary/90 leading-relaxed font-light">
                      Ser la inmobiliaria líder del Eje Cafetero, reconocida por transformar la experiencia inmobiliaria mediante la innovación, el servicio personalizado y el uso de herramientas tecnológicas, consolidándonos como el aliado estratégico de familias, inversionistas y empresas que buscan crecer con seguridad y confianza.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Nuestros Valores</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                <div className="flex flex-col gap-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">verified_user</span> Integridad
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Actuamos con honestidad, ética y transparencia en cada proceso y decisión.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">handshake</span> Compromiso
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Asumimos cada proyecto como propio, ofreciendo acompañamiento permanente y soluciones oportunas.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">lightbulb</span> Innovación
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Incorporamos tecnología y estrategias modernas para brindar una experiencia inmobiliaria más ágil, segura y eficiente.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">support_agent</span> Servicio
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Escuchamos, entendemos y superamos las expectativas de nuestros clientes con atención personalizada.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">diversity_1</span> Confianza
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Construimos relaciones duraderas basadas en el cumplimiento de nuestra palabra y la calidad de nuestro trabajo.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">star</span> Excelencia
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Buscamos mejorar continuamente nuestros procesos para ofrecer un servicio de alto nivel.</p>
                </div>
                <div className="flex flex-col gap-3 lg:col-start-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">gavel</span> Responsabilidad
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Cumplimos nuestros compromisos con profesionalismo y respeto hacia clientes, aliados y colaboradores.</p>
                </div>
            </div>
        </section>

        {/* Promesa de Valor y Filosofía */}
        <section className="relative mt-20 mb-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80" 
              alt="Arquitectura moderna" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="bg-surface/90 backdrop-blur-2xl rounded-3xl p-10 md:p-14 shadow-2xl border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-1 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-label-md tracking-widest uppercase block">Lo que nos hace diferentes</span>
                  </div>
                  
                  <h2 className="font-display-md text-3xl md:text-4xl lg:text-display-md text-primary mb-8">Nuestra Filosofía y Promesa</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-headline-sm text-primary mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">verified</span> Promesa de Valor
                      </h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed font-bold mb-2">
                        Más que vender inmuebles, construimos relaciones de confianza.
                      </p>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Acompañamos a nuestros clientes con asesoría especializada, estrategias de comercialización de alto impacto, herramientas tecnológicas y un equipo comprometido para garantizar procesos seguros, ágiles y exitosos.
                      </p>
                    </div>
                    
                    <div className="h-px bg-outline-variant/50 w-full"></div>
                    
                    <div>
                      <h4 className="font-headline-sm text-primary mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">psychology</span> Nuestra Filosofía
                      </h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
                        Creemos que el éxito de una operación inmobiliaria no depende únicamente de encontrar un comprador o un inmueble, sino de comprender las necesidades de cada cliente y ofrecer soluciones que generen tranquilidad, confianza y resultados.
                      </p>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Trabajamos con pasión, cercanía e innovación, convencidos de que las mejores relaciones comerciales nacen del servicio excepcional, la transparencia y el compromiso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
          <div className="bg-primary-container rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            
            <h2 className="font-headline-lg text-headline-lg text-on-primary-container relative z-10 mb-4 max-w-2xl">
              Comience su próximo capítulo con nosotros
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
`;

fs.writeFileSync('src/app/nosotros/page.tsx', code);
console.log("Updated nosotros page successfully.");
