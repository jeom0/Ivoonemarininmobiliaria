
import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Page() {
  return (
    <>
      

<aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant/20 z-50">
<div className="flex flex-col h-full p-4">

<div className="flex items-center gap-3 mb-10 px-2">
<div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-white" style={{"fontVariationSettings":"\"FILL\" 1"}}>home_work</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md text-primary tracking-tight leading-none">ivonne marin.</h1>
<p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Administrador</p>
</div>
</div>

<nav className="flex-1 space-y-1">

<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-bold translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">home_work</span>
<span className="font-label-md text-label-md">Inmuebles</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">person_search</span>
<span className="font-label-md text-label-md">Leads</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="font-label-md text-label-md">Visitas</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-md text-label-md">Reportes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md text-label-md">Configuración</span>
</a>
</nav>

<button className="mt-4 mb-8 bg-primary text-on-primary font-label-md text-label-md py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/10">
<span className="material-symbols-outlined text-[20px]">add</span>
                Crear Inmueble
            </button>

<div className="pt-4 border-t border-outline-variant/30 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label-md text-label-md">Ayuda</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-md text-label-md">Cerrar Sesión</span>
</a>
</div>
</div>
</aside>

<main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop bg-background min-h-screen">

<header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
<div>
<h2 className="font-display-lg text-display-lg text-primary tracking-tighter">Bienvenida, Ivonne</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Aquí tienes el resumen de tu actividad para hoy.</p>
</div>
<div className="flex items-center gap-3">
<div className="relative group">
<button className="w-12 h-12 rounded-full border-2 border-primary/20 p-1 overflow-hidden transition-transform group-hover:scale-105">
<img className="w-full h-full object-cover rounded-full" data-alt="A professional headshot of a real estate executive, Ivonne Marin, smiling warmly with a soft blur background of a high-end modern interior. She wears a cream-colored professional blouse that reflects the warm beige tones of the brand identity. The lighting is soft and flattering, emphasizing a trustworthy and elegant persona." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2_gL929Y-4pF03IW9z-RI4u1oLCWCxd4o1u_H72CAE5BNlZhGFJMyqSD5YF0SYJ-vEKnpJXUZPbXV_aN0vczoc1VyB7v__uG8YxxB943x89ib1msbR0ob--TNNWy6OV5LOrlySBpBnrsb25BiesHk5lKSeJDYgK7B1mZj4Nxw08BrdJmwbajQZQsch3rrxF__aSZs0c_AS0cAlQOpygoJUlO0USAGKeS2w1NYJV3rbAYitByYkpGfBF5mebboJMY5e6UNoDfIw0c"/>
</button>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
</div>
<div className="hidden sm:block">
<p className="font-label-md text-label-md text-on-surface leading-tight">Ivonne Marin</p>
<p className="text-[11px] text-on-surface-variant">Asesora Principal</p>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant ml-2">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</header>

<section className="flex flex-wrap gap-4 mb-section-gap">
<button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-label-md text-label-md shadow-md hover:shadow-lg transition-all active:scale-95">
<span className="material-symbols-outlined">add_home</span>
                Crear Inmueble
            </button>
<button className="flex items-center gap-2 px-6 py-3 bg-white border border-outline-variant text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95">
<span className="material-symbols-outlined">person_add</span>
                Registrar Lead
            </button>
<button className="flex items-center gap-2 px-6 py-3 bg-white border border-outline-variant text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95">
<span className="material-symbols-outlined">event</span>
                Agendar Visita
            </button>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-section-gap">

<div className="bento-card p-6 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined">apartment</span>
</div>
<div className="sparkline">
<div className="spark-bar h-[40%]"></div>
<div className="spark-bar h-[60%]"></div>
<div className="spark-bar h-[50%]"></div>
<div className="spark-bar h-[80%]"></div>
<div className="spark-bar h-[90%]"></div>
</div>
</div>
<p className="text-on-surface-variant font-label-md text-label-md">Total Inmuebles</p>
<div className="flex items-end gap-2">
<h3 className="text-[32px] font-bold text-primary leading-none">142</h3>
<span className="text-green-600 text-xs font-bold pb-1">+12%</span>
</div>
</div>

<div className="bento-card p-6 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined">group</span>
</div>
<div className="sparkline">
<div className="spark-bar h-[30%]"></div>
<div className="spark-bar h-[40%]"></div>
<div className="spark-bar h-[70%]"></div>
<div className="spark-bar h-[60%]"></div>
<div className="spark-bar h-[85%]"></div>
</div>
</div>
<p className="text-on-surface-variant font-label-md text-label-md">Leads del Mes</p>
<div className="flex items-end gap-2">
<h3 className="text-[32px] font-bold text-primary leading-none">84</h3>
<span className="text-green-600 text-xs font-bold pb-1">+24%</span>
</div>
</div>

<div className="bento-card p-6 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined">pending_actions</span>
</div>
<div className="sparkline">
<div className="spark-bar h-[80%]"></div>
<div className="spark-bar h-[60%]"></div>
<div className="spark-bar h-[50%]"></div>
<div className="spark-bar h-[30%]"></div>
<div className="spark-bar h-[20%]"></div>
</div>
</div>
<p className="text-on-surface-variant font-label-md text-label-md">Visitas Pendientes</p>
<div className="flex items-end gap-2">
<h3 className="text-[32px] font-bold text-primary leading-none">12</h3>
<span className="text-amber-600 text-xs font-bold pb-1">-5%</span>
</div>
</div>

<div className="bento-card p-6 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>stars</span>
</div>
<div className="sparkline">
<div className="spark-bar h-[20%]"></div>
<div className="spark-bar h-[40%]"></div>
<div className="spark-bar h-[30%]"></div>
<div className="spark-bar h-[70%]"></div>
<div className="spark-bar h-[95%]"></div>
</div>
</div>
<p className="text-on-surface-variant font-label-md text-label-md">Inmuebles Vendidos</p>
<div className="flex items-end gap-2">
<h3 className="text-[32px] font-bold text-primary leading-none">38</h3>
<span className="text-green-600 text-xs font-bold pb-1">+8%</span>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

<div className="lg:col-span-2 bento-card rounded-2xl p-8 overflow-hidden">
<div className="flex items-center justify-between mb-8">
<h4 className="font-headline-md text-headline-md text-primary">Últimos Leads</h4>
<button className="text-secondary font-label-md text-label-md hover:underline">Ver todos</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-md text-[12px] uppercase tracking-wider">
<th className="pb-4 font-semibold">Cliente</th>
<th className="pb-4 font-semibold">Interés</th>
<th className="pb-4 font-semibold">Estado</th>
<th className="pb-4 font-semibold">Fecha</th>
<th className="pb-4 font-semibold text-right">Acción</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md">
<tr className="group hover:bg-surface-container-low transition-colors">
<td className="py-4 border-b border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">AC</div>
<div>
<p className="font-semibold text-primary">Alejandro Cano</p>
<p className="text-xs text-on-surface-variant">+57 310 445 221</p>
</div>
</div>
</td>
<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant">Apartamento Luxury Pereira</td>
<td className="py-4 border-b border-outline-variant/10">
<span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded-full">Nuevo</span>
</td>
<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm">Hoy, 10:45 AM</td>
<td className="py-4 border-b border-outline-variant/10 text-right">
<button className="text-primary hover:bg-primary-fixed p-1 rounded-full"><span className="material-symbols-outlined">chat</span></button>
</td>
</tr>
<tr className="group hover:bg-surface-container-low transition-colors">
<td className="py-4 border-b border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center text-xs font-bold">MP</div>
<div>
<p className="font-semibold text-primary">Mariana Posada</p>
<p className="text-xs text-on-surface-variant">+57 312 889 443</p>
</div>
</div>
</td>
<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant">Casa Campestre Armenia</td>
<td className="py-4 border-b border-outline-variant/10">
<span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-full">En Proceso</span>
</td>
<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm">Ayer, 4:20 PM</td>
<td className="py-4 border-b border-outline-variant/10 text-right">
<button className="text-primary hover:bg-primary-fixed p-1 rounded-full"><span className="material-symbols-outlined">call</span></button>
</td>
</tr>
<tr className="group hover:bg-surface-container-low transition-colors">
<td className="py-4 border-b border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold">JR</div>
<div>
<p className="font-semibold text-primary">Juan Ricardo</p>
<p className="text-xs text-on-surface-variant">+57 321 009 332</p>
</div>
</div>
</td>
<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant">Oficina Centro Manizales</td>
<td className="py-4 border-b border-outline-variant/10">
<span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase rounded-full">Frío</span>
</td>
<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm">24 Oct, 2024</td>
<td className="py-4 border-b border-outline-variant/10 text-right">
<button className="text-primary hover:bg-primary-fixed p-1 rounded-full"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bento-card rounded-2xl p-8 bg-surface-container-low">
<div className="flex items-center justify-between mb-8">
<h4 className="font-headline-md text-headline-md text-primary">Próximas Visitas</h4>
<span className="bg-primary-container text-on-primary-container text-[10px] font-bold py-1 px-2 rounded">3 HOY</span>
</div>
<div className="space-y-6">

<div className="flex gap-4 p-4 rounded-xl bg-white border-l-4 border-primary shadow-sm">
<div className="flex-shrink-0 flex flex-col items-center justify-center bg-surface-container w-14 h-14 rounded-lg">
<span className="text-xs font-bold text-primary">OCT</span>
<span className="text-lg font-bold text-primary">26</span>
</div>
<div className="flex-1">
<p className="font-label-md text-label-md text-primary">Andrés Valencia</p>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mb-2">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                                Penthouse El Poblado
                            </p>
<div className="flex items-center justify-between">
<span className="text-[11px] font-bold text-secondary uppercase">2:30 PM</span>
<button className="text-xs text-primary font-bold hover:underline">Recordatorio</button>
</div>
</div>
</div>

<div className="flex gap-4 p-4 rounded-xl bg-white/60 border-l-4 border-outline-variant">
<div className="flex-shrink-0 flex flex-col items-center justify-center bg-surface-container w-14 h-14 rounded-lg opacity-60">
<span className="text-xs font-bold text-primary">OCT</span>
<span className="text-lg font-bold text-primary">26</span>
</div>
<div className="flex-1">
<p className="font-label-md text-label-md text-on-surface">Beatriz Helena</p>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mb-2">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                                Local Unicentro
                            </p>
<div className="flex items-center justify-between">
<span className="text-[11px] font-bold text-on-surface-variant uppercase">4:00 PM</span>
<button className="text-xs text-on-surface-variant hover:underline">Ver mapa</button>
</div>
</div>
</div>

<div className="flex gap-4 p-4 rounded-xl bg-white/60 border-l-4 border-outline-variant">
<div className="flex-shrink-0 flex flex-col items-center justify-center bg-surface-container w-14 h-14 rounded-lg opacity-60">
<span className="text-xs font-bold text-primary">OCT</span>
<span className="text-lg font-bold text-primary">27</span>
</div>
<div className="flex-1">
<p className="font-label-md text-label-md text-on-surface">Carlos Gómez</p>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mb-2">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                                Lote Campestre Condina
                            </p>
<div className="flex items-center justify-between">
<span className="text-[11px] font-bold text-on-surface-variant uppercase">10:00 AM</span>
</div>
</div>
</div>
<button className="w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                        + Agendar nueva visita
                    </button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container h-16 flex items-center justify-around px-4 border-t border-outline-variant/20 z-50">
<button className="flex flex-col items-center text-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>dashboard</span>
<span className="text-[10px] font-bold">Inicio</span>
</button>
<button className="flex flex-col items-center text-on-surface-variant">
<span className="material-symbols-outlined">home_work</span>
<span className="text-[10px] font-medium">Inmuebles</span>
</button>
<div className="-mt-8 bg-primary w-12 h-12 rounded-full flex items-center justify-center text-on-primary shadow-lg">
<span className="material-symbols-outlined">add</span>
</div>
<button className="flex flex-col items-center text-on-surface-variant">
<span className="material-symbols-outlined">person_search</span>
<span className="text-[10px] font-medium">Leads</span>
</button>
<button className="flex flex-col items-center text-on-surface-variant">
<span className="material-symbols-outlined">menu</span>
<span className="text-[10px] font-medium">Más</span>
</button>
</nav>


    </>
  );
}
    