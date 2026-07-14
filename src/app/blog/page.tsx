
import Link from "next/link";


export default async function Page() {
  return (
    <>
      

<header className="bg-surface/80 shadow-sm docked full-width top-0 sticky z-50 transition-all duration-300 backdrop-blur-md">
<div className="flex justify-between items-center w-full px-base md:px-margin-desktop max-w-container-max mx-auto h-20">

<div className="flex items-center gap-2">
<a className="font-headline-lg text-primary tracking-tight" href="#">Ivonne Marin</a>
</div>

<nav className="hidden md:flex gap-6 items-center">
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Inicio</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Inmuebles</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Vender</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Arrendar</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Proyectos</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Nosotros</a>
<a className="text-primary border-b-2 border-primary font-bold hover:text-primary transition-colors duration-300 font-label-md text-label-md" href="#">Blog</a>
</nav>

<div className="flex items-center gap-4">
<a className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="chat">chat</span>
</a>
<a className="hidden md:block font-label-md text-label-md text-primary bg-surface-container-high px-4 py-2 rounded-full hover:bg-surface-container transition-colors" href="#">Contacto</a>
<a className="font-label-md text-label-md text-on-primary bg-primary px-6 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm" href="#">Publicar</a>

<button className="md:hidden text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</div>
</header>
<main className="w-full">

<section className="w-full bg-surface pt-section-gap pb-12 px-margin-mobile md:px-margin-desktop text-center">
<div className="max-w-container-max mx-auto max-w-3xl">
<h1 className="font-display-lg text-display-lg text-primary mb-6">Blog Inmobiliario</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Consejos expertos, análisis de mercado y guías prácticas para la compra, venta e inversión de propiedades exclusivas en el Eje Cafetero.</p>
</div>
</section>

<section className="w-full px-margin-mobile md:px-margin-desktop mb-12">
<div className="max-w-container-max mx-auto flex flex-wrap justify-center gap-4">
<button className="px-6 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container shadow-[0_4px_16px_rgba(92,18,18,0.15)] transition-all">Todos</button>
<button className="px-6 py-2 rounded-full font-label-md text-label-md border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">Comprar</button>
<button className="px-6 py-2 rounded-full font-label-md text-label-md border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">Vender</button>
<button className="px-6 py-2 rounded-full font-label-md text-label-md border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">Inversión</button>
<button className="px-6 py-2 rounded-full font-label-md text-label-md border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">Trámites</button>
</div>
</section>

<section className="w-full px-margin-mobile md:px-margin-desktop pb-section-gap">
<div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<article className="bg-surface-lowest rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-[0_4px_16px_rgba(92,18,18,0.08)] transition-all duration-300 group flex flex-col h-full bg-[#eff6ed]">
<div className="relative w-full h-64 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A highly detailed photograph of a luxurious modern villa nestled in the lush green mountains of the Coffee Axis in Colombia. The architecture features large glass windows and clean lines, glowing with warm interior lighting at twilight. The mood is serene, exclusive, and inviting, reflecting a premium real estate lifestyle. Soft, ambient shadows contrast with the pristine white walls." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGyeIVmAxIC4Rdud7_RDgQ_hWhsP0C-1wQ28hN6yMq646hulrDY7QXYShVEao8TtpdHGwOAra_-nCPu-V0o60wZn3O--XN7oFrGKoSoaJAEwPusUril6RXvjqXbW7Yig3f-w3Qm1WnfA9olVMRDqhKIhBYb3TATuALM8Zc_Duq8C1EET-TnIKxLJxoIlA_jSV7InuaK4t-QPvlmRKnYAchPCE5ra-RUa0AkOxLC_ZN1EukhRsC8EiVdKRzemaUsEIpZZbgXRRzlqk"/>
<div className="absolute top-4 left-4 bg-surface-container/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-[12px] text-primary">Inversión</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<div className="font-label-md text-[12px] text-on-surface-variant mb-2">15 Octubre, 2024</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">Por qué invertir en Pereira es la mejor decisión este 2024</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">Descubre los indicadores económicos y el desarrollo de infraestructura que posicionan a la perla del Otún como el destino número uno para inversiones inmobiliarias de alto perfil en Colombia.</p>
<div className="mt-auto">
<a className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-surface-tint transition-colors" href="#">
                                Leer más <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-lowest rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-[0_4px_16px_rgba(92,18,18,0.08)] transition-all duration-300 group flex flex-col h-full bg-[#eff6ed]">
<div className="relative w-full h-64 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A sophisticated, high-end interior design shot of a spacious living room. The room is styled with elegant, minimalist furniture in warm beige and soft white tones, accented by subtle hints of deep vinotinto red. Large floor-to-ceiling windows look out onto a vibrant green landscape. The lighting is natural and bright, creating a welcoming, premium residential atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxr7eGbP21V6zgBIG0lrqvYjyJi4QoL8JZR3aU23ATKLbodC1_WaoVu5qEbr6j1Zu__IcpCbshHNqfpDZ0h8mOCTnqYXSXo0gi89KQXvwQo6YYo9KFRk0HmhRmd0wNfgahgoBMEjz0y6a1l7NXvrtSF0HTdwFXyWwluGU8snE2MEnr7_qvQ-CJfEZh6NtxXang7EI7uGSGERiV_IwOy1gjZKS-9vtTJaRqjMcjWjzCP2cmuq5wvu90r4WxzFcwiveScqwUEjgT9qQ"/>
<div className="absolute top-4 left-4 bg-surface-container/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-[12px] text-primary">Comprar</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<div className="font-label-md text-[12px] text-on-surface-variant mb-2">08 Octubre, 2024</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">Guía definitiva para comprar tu primera propiedad de lujo</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">Todo lo que necesitas saber antes de dar el gran paso: desde la evaluación de acabados premium hasta la revisión de la zona y los servicios exclusivos de los condominios campestres.</p>
<div className="mt-auto">
<a className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-surface-tint transition-colors" href="#">
                                Leer más <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-lowest rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-[0_4px_16px_rgba(92,18,18,0.08)] transition-all duration-300 group flex flex-col h-full bg-[#eff6ed]">
<div className="relative w-full h-64 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A close-up, professional photograph of a pristine legal document resting on a polished wooden desk, accompanied by a sleek silver fountain pen. The lighting is warm and focused, highlighting the texture of the paper and the elegance of the setting. The mood conveys trust, expertise, and careful attention to detail in a premium consulting environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-3gDV-ApWHQRdjDuQogUShoBIzKS13J0NUloeMgoZUvfIRVar1LfanqSmoFfhLa_8F5UhxDN-B7enbrtaN0o4iEPe4U1yHywdUpyiPdOtQKBIbH5ODABfhg6wbSKpa4JU4VGsC5Aq5BCuLN8N-osa1UZ2f-_5Nskbt1VHFHbVYdIGzjygddBv79H-uFa2qXm3A34NPnPhVAarS1SildFG_Kg-5OxivNZB-7ZR6pY7CB2vJz1He-n7-aUZxTelkStilUKITl0S6hg"/>
<div className="absolute top-4 left-4 bg-surface-container/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-[12px] text-primary">Trámites</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<div className="font-label-md text-[12px] text-on-surface-variant mb-2">28 Septiembre, 2024</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">5 errores legales comunes al vender tu inmueble</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">Evita retrasos y complicaciones en el cierre de tu venta. Conoce los documentos indispensables y las actualizaciones normativas para un traspaso seguro y eficiente en Colombia.</p>
<div className="mt-auto">
<a className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-surface-tint transition-colors" href="#">
                                Leer más <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
</article>
</div>
</section>
</main>

<footer className="bg-primary py-section-gap full-width">
<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

<div className="col-span-1 md:col-span-2">
<h2 className="font-headline-md text-headline-md text-on-primary mb-4">Ivonne Marin</h2>
<p className="font-body-md text-body-md text-on-primary/80 max-w-sm mb-6">Asesoría inmobiliaria de alto nivel en el Eje Cafetero. Encontramos el espacio perfecto que resuena con su estilo de vida.</p>
</div>

<div className="col-span-1">
<h3 className="font-label-md text-label-md text-on-primary mb-4 uppercase tracking-wider">Navegación</h3>
<ul className="space-y-3 flex flex-col">
<a className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors opacity-90" href="#">Inicio</a>
<a className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors opacity-90" href="#">Servicios</a>
<a className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors opacity-90" href="#">Cobertura</a>
<a className="font-body-md text-body-md text-secondary-fixed underline transition-colors opacity-90" href="#">Blog</a>
</ul>
</div>

<div className="col-span-1">
<h3 className="font-label-md text-label-md text-on-primary mb-4 uppercase tracking-wider">Legal</h3>
<ul className="space-y-3 flex flex-col">
<a className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors opacity-90" href="#">Privacidad</a>
<a className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors opacity-90" href="#">Legal</a>
</ul>
</div>
</div>

<div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-12 pt-8 border-t border-on-primary/20">
<p className="font-body-md text-body-md text-on-primary/60 text-center md:text-left">© 2024 Ivonne Marin Asesora Inmobiliaria. Todos los derechos reservados.</p>
</div>
</footer>

    </>
  );
}
    