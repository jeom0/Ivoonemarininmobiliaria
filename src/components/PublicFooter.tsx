import Link from "next/link";

export default function PublicFooter({ settings }: { settings?: any }) {
  const s = settings || {};
  const getIcon = (platform: string) => {
    switch(platform) {
      case 'facebook': return 'public';
      case 'instagram': return 'photo_camera';
      case 'tiktok': return 'music_note';
      case 'youtube': return 'play_arrow';
      case 'linkedin': return 'work';
      case 'whatsapp': return 'chat';
      default: return 'link';
    }
  };
  
  let socialLinks: {platform: string, url: string}[] = [];
  try {
    if (s.social_links) socialLinks = JSON.parse(s.social_links);
  } catch(e){}

  const getValidUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <footer className="full-width py-section-gap bg-primary text-on-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col gap-6">
          <span className="font-headline-md text-on-primary tracking-tight">{s.agencyName || "Ivonne Marin"}</span>
          <p className="font-body-md text-on-primary/80">Asesoría inmobiliaria integral en el Eje Cafetero. Seguridad, confianza y resultados.</p>
          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <Link key={idx} className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={getValidUrl(link.url)} target="_blank" title={link.platform}>
                <span className="material-symbols-outlined text-lg">{getIcon(link.platform)}</span>
              </Link>
            ))}
            {socialLinks.length === 0 && s.instagram && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={getValidUrl(s.instagram)} target="_blank">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </Link>
            )}
            {socialLinks.length === 0 && s.facebook && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={getValidUrl(s.facebook)} target="_blank">
                <span className="material-symbols-outlined text-lg">public</span>
              </Link>
            )}
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
            <li><Link className="text-primary-fixed hover:text-white transition-colors font-label-md font-bold" href="#">Santa Rosa de Cabal (Sede Principal)</Link></li>
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
              <span className="font-body-md">{s.whatsapp || "+57 300 000 0000"}</span>
            </li>
            <li className="flex items-center gap-3 text-on-primary/80">
              <span className="material-symbols-outlined">mail</span>
              <span className="font-body-md">{s.contactEmail || "contacto@ivonnemarin.com"}</span>
            </li>
            <li className="flex items-center gap-3 text-on-primary/80">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-body-md">{s.address || "Santa Rosa de Cabal, Risaralda, Colombia"}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-20 pt-10 border-t border-on-primary/10 text-center px-margin-mobile flex flex-col pb-8 items-center gap-6 max-w-4xl mx-auto">
        <div className="text-on-primary/70 font-body-md text-sm text-left md:text-center leading-relaxed">
          <strong>Política de Privacidad y Tratamiento de Datos Personales:</strong> Al contactarnos o dejarnos tus datos, autorizas a Ivonne Marin Inmobiliaria a recolectar, almacenar y utilizar tu información de contacto exclusivamente con el fin de enviarte información sobre futuros inmuebles, promociones u oportunidades de inversión que se ajusten a tu perfil. En ningún momento venderemos ni compartiremos tu información con terceros sin tu consentimiento explícito, garantizando el estricto cumplimiento de la ley de protección de datos.
        </div>
        <p className="text-on-primary/60 font-label-md">© {new Date().getFullYear()} Ivonne Marin Asesora Inmobiliaria. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
