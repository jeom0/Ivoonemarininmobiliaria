
import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Page() {
  return (
    <>
      

<nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container shadow-md p-4 z-50">
<div className="mb-8 px-4 mt-4">
<h1 className="font-headline-md text-headline-md text-primary tracking-tight">Ivonne Marin</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Administrador</p>
</div>
<div className="flex-1 overflow-y-auto space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">home_work</span>
<span className="font-label-md text-label-md">Inmuebles</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">person_search</span>
<span className="font-label-md text-label-md">Leads</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="font-label-md text-label-md">Visitas</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-md text-label-md">Reportes</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-bold translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined icon-fill">settings</span>
<span className="font-label-md text-label-md">Configuración</span>
</a>
</div>
<div className="mt-auto space-y-2 pt-4 border-t border-surface-dim/30">
<button className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg mb-4 hover:opacity-90 transition-opacity">
                Crear Inmueble
            </button>
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-md text-label-md">Ayuda</span>
</a>
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-md text-label-md">Cerrar Sesión</span>
</a>
</div>
</nav>

<main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop bg-background min-h-screen">
<header className="mb-section-gap max-w-container-max mx-auto">
<h2 className="font-display-lg text-display-lg text-on-background mb-2">Configuración</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">Gestiona los ajustes generales de la plataforma y el perfil público.</p>
</header>
<div className="max-w-container-max mx-auto">

<div className="flex border-b border-surface-dim mb-8 overflow-x-auto hide-scrollbar">
<button className="px-6 py-4 font-label-md text-label-md border-b-2 border-primary text-primary font-bold whitespace-nowrap" id="tab-empresa">
                    Perfil de Empresa
                </button>
<button className="px-6 py-4 font-label-md text-label-md border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap" id="tab-sitio">
                    Configuración del Sitio
                </button>
<button className="px-6 py-4 font-label-md text-label-md border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap" id="tab-usuarios">
                    Usuarios y Roles
                </button>
</div>

<div className="space-y-8 fade-in" id="content-empresa">

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="bg-surface-container-lowest rounded-xl p-8 border border-secondary-fixed-dim/30 shadow-sm col-span-1 flex flex-col items-center justify-center text-center">
<div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center mb-6 overflow-hidden border-2 border-outline-variant border-dashed">
<img className="w-full h-full object-cover opacity-50" data-alt="A professional, minimalist brand logo for a luxury real estate agency, featuring elegant typography and warm earthy tones, displayed on a clean white background in a studio setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZAmb0vC4unzvHS9v5JfK2ae35nKQyWZwGS4VO9SO4TMtHJyEcFhrmsvMNh2aDhTFWMggrEdFefRHgRI_WwN4iN3L89XOV1lodjrF6wgvgz8x2Hazlbte6wkjBMJHaVLD6IF_WJNH4BzckeDNBKphSbKbWRAbYnlUoElsOE-5CPoerW7fWSAEZmr9mUC9aD757Dqlo_ThhdsY-Qv_XGOWunAcYvHYNHAWpuJXqVO6vzLuMOkNAi0N2UB3L0kdFxqKZ-3ViR_I34To"/>
</div>
<h3 className="font-headline-md text-headline-md text-on-background mb-2">Logo Principal</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Formato recomendado: PNG transparente, 500x500px.</p>
<button className="border border-secondary-fixed-dim text-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container transition-colors w-full flex items-center justify-center gap-2">
<span className="material-symbols-outlined">upload</span>
                            Subir Nuevo Logo
                        </button>
</div>

<div className="bg-surface-container-lowest rounded-xl p-8 border border-secondary-fixed-dim/30 shadow-sm md:col-span-2 space-y-6">
<h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4">Información de Contacto</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="block font-label-md text-label-md text-on-background mb-2">Nombre de la Agencia</label>
<input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" type="text" value="Ivonne Marin Asesora Inmobiliaria"/>
</div>
<div>
<label className="block font-label-md text-label-md text-on-background mb-2">Número WhatsApp Principal</label>
<input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" type="tel" value="+57 300 000 0000"/>
</div>
<div className="md:col-span-2">
<label className="block font-label-md text-label-md text-on-background mb-2">Dirección de Oficina</label>
<input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" type="text" value="Pereira, Eje Cafetero, Colombia"/>
</div>
</div>
<h4 className="font-headline-md text-headline-md text-on-background border-b border-surface-dim pb-4 mt-8 pt-4">Redes Sociales</h4>
<div className="space-y-4">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant">link</span>
<input className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" placeholder="URL de Instagram" type="url" value="https://instagram.com/"/>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant">link</span>
<input className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-background transition-all" placeholder="URL de Facebook" type="url" value="https://facebook.com/"/>
</div>
</div>
</div>
</div>
<div className="flex justify-end pt-6">
<button className="bg-primary text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
                        Guardar Cambios
                    </button>
</div>
</div>
</div>
</main>



    </>
  );
}
    