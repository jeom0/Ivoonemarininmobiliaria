import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ContactoForm from "@/components/ContactoForm";
import Link from "next/link";

export default function ContactoPage() {
  return (
    <>
      <PublicNavbar />
      <main className="flex-grow bg-surface">
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-start">
            <div className="pr-0 lg:pr-12">
              <span className="text-secondary font-label-md text-label-md tracking-widest block mb-4 uppercase">Contacto</span>
              <h1 className="font-display-lg text-display-lg text-primary mb-6">
                Estamos aquí para ayudarle
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
                Ya sea que busque comprar, vender o arrendar una propiedad, o simplemente tenga preguntas sobre el mercado inmobiliario del Eje Cafetero, no dude en contactarnos.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-[18px] text-on-surface mb-1">Oficina Principal</h4>
                    <p className="font-body-md text-on-surface-variant">Pereira, Risaralda<br/>Colombia</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-[18px] text-on-surface mb-1">Teléfono</h4>
                    <p className="font-body-md text-on-surface-variant">+57 300 000 0000</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-[18px] text-on-surface mb-1">Correo Electrónico</h4>
                    <p className="font-body-md text-on-surface-variant">contacto@ivonnemarin.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4">
                <Link className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all" href="#">
                  <span className="material-symbols-outlined">public</span>
                </Link>
                <Link className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all" href="#">
                  <span className="material-symbols-outlined">share</span>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 p-8 md:p-12 bg-surface-container-lowest rounded-2xl ambient-shadow border border-outline-variant/30">
              <ContactoForm />
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
