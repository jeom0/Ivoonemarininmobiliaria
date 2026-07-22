import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="full-width py-section-gap bg-primary text-on-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col gap-6">
          <span className="font-headline-md text-on-primary tracking-tight">Ivonne Marin</span>
          <p className="font-body-md text-on-primary/80">Asesoría inmobiliaria integral en el Eje Cafetero. Seguridad, confianza y resultados.</p>
          <div className="flex gap-4">
            <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href="#">
              <span className="material-symbols-outlined text-lg">share</span>
            </Link>
            <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href="#">
              <span className="material-symbols-outlined text-lg">public</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="font-headline-md text-headline-md">Navegación</h5>
          <ul className="flex flex-col gap-3">
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="/">Inicio</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Servicios</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Cobertura</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Privacidad</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Legal</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="font-headline-md text-headline-md">Zonas</h5>
          <ul className="flex flex-col gap-3">
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Pereira</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Dosquebradas</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Cerritos</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Pinares</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="font-headline-md text-headline-md">Contacto</h5>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 text-on-primary/80">
              <span className="material-symbols-outlined">call</span>
              <span className="font-body-md">+57 300 000 0000</span>
            </li>
            <li className="flex items-center gap-3 text-on-primary/80">
              <span className="material-symbols-outlined">mail</span>
              <span className="font-body-md">contacto@ivonnemarin.com</span>
            </li>
            <li className="flex items-center gap-3 text-on-primary/80">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-body-md">Pereira, Risaralda, Colombia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-20 pt-10 border-t border-on-primary/10 text-center px-margin-mobile flex flex-col items-center gap-6 max-w-4xl mx-auto">
        <div className="text-on-primary/70 font-body-md text-sm text-justify md:text-center leading-relaxed">
          <strong>Política de Privacidad y Tratamiento de Datos Personales:</strong> Al contactarnos o dejarnos tus datos, autorizas a Ivonne Marin Inmobiliaria a recolectar, almacenar y utilizar tu información de contacto exclusivamente con el fin de enviarte información sobre futuros inmuebles, promociones u oportunidades de inversión que se ajusten a tu perfil. En ningún momento venderemos ni compartiremos tu información con terceros sin tu consentimiento explícito, garantizando el estricto cumplimiento de la ley de protección de datos.
        </div>
        <p className="text-on-primary/60 font-label-md">© {new Date().getFullYear()} Ivonne Marin Asesora Inmobiliaria. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
