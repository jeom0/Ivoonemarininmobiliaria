
import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Page() {
  return (
    <>
      

<aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container dark:bg-surface-container-low shadow-md flex flex-col h-full p-4 z-50">
<div className="mb-10 px-2 flex items-center gap-3">
<div className="flex flex-col">
<span className="font-headline-md text-primary dark:text-primary-fixed-dim brand-logo">ivonne</span>
<span className="font-headline-md text-primary dark:text-primary-fixed-dim brand-logo -mt-1">marin.</span>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container dark:bg-primary-container text-on-primary-container dark:text-on-primary-container rounded-lg font-bold translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="home_work">home_work</span>
<span className="font-label-md text-label-md">Inmuebles</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="person_search">person_search</span>
<span className="font-label-md text-label-md">Leads</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
<span className="font-label-md text-label-md">Visitas</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-label-md text-label-md">Reportes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-label-md text-label-md">Configuración</span>
</a>
</nav>
<div className="mt-auto border-t border-outline-variant/30 pt-4">
<button className="w-full mb-6 py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
        Crear Inmueble
      </button>
<div className="space-y-1">
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span className="font-label-md text-label-md">Ayuda</span>
</a>
<a className="flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/20 transition-all rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span className="font-label-md text-label-md">Cerrar Sesión</span>
</a>
</div>
<div className="mt-6 flex items-center gap-3 px-2">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border-2 border-primary-fixed">
<img className="w-full h-full object-cover" data-alt="A professional portrait of Ivonne Marin, a high-end real estate advisor, with a warm and empathetic expression. She is in an elegant, well-lit modern office setting in Colombia's Eje Cafetero. The lighting is soft and residential, highlighting her professional demeanor. The image uses a warm-gallery aesthetic with soft beige and vinotinto tones consistent with her luxury brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiCKwGOtkk343QkPmPCkiiRkHMc4lH1L6pLk8IjPUKdWPR-32vZ_G-_hJuayECobSR4L48_4quJDKpA-DD8n7PvoN3KPDT831foyITR8wgy62MTTbMgqKdRRl0_UBDLNBCG8_oCWAyhWZJR27uGvJc6ZMUUnBlLINZziHKeVHeDJJVO9KL1fSg3by0Gv1Pva-j0WYjOrljwmUUiuYrGspL-ESDnphd8CHXN20uAkSfSy6-5HvDiVyg_xO89uwam_Ec9n_EwQ6AgOg"/>
</div>
<div className="flex flex-col">
<span className="font-label-md text-on-surface font-bold">Ivonne Marin</span>
<span className="text-[12px] text-on-surface-variant">Administrador</span>
</div>
</div>
</div>
</aside>

<main className="ml-64 min-h-screen">

<header className="h-20 bg-surface/80 backdrop-blur-md sticky top-0 z-40 px-margin-desktop flex items-center justify-between border-b border-outline-variant/20">
<div>
<h1 className="font-headline-md text-headline-md text-primary">Administración de Inmuebles</h1>
<p className="text-[14px] text-on-surface-variant">Gestiona tu catálogo de propiedades exclusivas</p>
</div>
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
<span className="material-symbols-outlined" data-icon="chat">chat</span>
</button>
</div>
</header>
<div className="p-margin-desktop space-y-8">

<section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-label-md text-label-md">Total Inmuebles</span>
<span className="material-symbols-outlined text-primary-container" data-icon="home">home</span>
</div>
<span className="text-display-lg font-display-lg text-primary">124</span>
<span className="text-[12px] text-secondary font-medium">+12% este mes</span>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-label-md text-label-md">Disponibles</span>
<span className="material-symbols-outlined text-green-700" data-icon="check_circle">check_circle</span>
</div>
<span className="text-display-lg font-display-lg text-primary">86</span>
<span className="text-[12px] text-on-surface-variant font-medium">69% del inventario</span>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-label-md text-label-md">Vendidos / Arrendados</span>
<span className="material-symbols-outlined text-secondary" data-icon="sell">sell</span>
</div>
<span className="text-display-lg font-display-lg text-primary">38</span>
<span className="text-[12px] text-on-surface-variant font-medium">Histórico anual</span>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-label-md text-label-md">Vistas Totales</span>
<span className="material-symbols-outlined text-tertiary-fixed-dim" data-icon="visibility">visibility</span>
</div>
<span className="text-display-lg font-display-lg text-primary">14.2k</span>
<span className="text-[12px] text-secondary font-medium">+2.4k esta semana</span>
</div>
</section>

<section className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center gap-gutter">

<div className="relative flex-1 group">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-body-md transition-all" placeholder="Buscar por código, título o ubicación..." type="text"/>
</div>

<div className="flex items-center gap-3 w-full md:w-auto">
<select className="bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md font-label-md text-on-surface-variant min-w-[140px] focus:ring-2 focus:ring-primary/20 cursor-pointer">
<option>Estado: Todos</option>
<option>Disponible</option>
<option>Vendido</option>
<option>Arrendado</option>
<option>Reservado</option>
</select>
<select className="bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md font-label-md text-on-surface-variant min-w-[140px] focus:ring-2 focus:ring-primary/20 cursor-pointer">
<option>Tipo: Todos</option>
<option>Casa</option>
<option>Apartamento</option>
<option>Finca</option>
<option>Lote</option>
</select>
<button className="flex items-center gap-2 px-4 py-3 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
<span className="font-label-md">Más filtros</span>
</button>
</div>
</section>

<div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
<div className="overflow-x-auto custom-scrollbar">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant/20">
<th className="p-4 w-12 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary/40" type="checkbox"/>
</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Imagen</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Código</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Inmueble</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Tipo / Operación</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Precio</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Estado</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-center">Destacado</th>
<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-right">Acciones</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">

<tr className="property-row transition-colors group">
<td className="p-4 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary/40" type="checkbox"/>
</td>
<td className="p-4">
<div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm">
<img className="w-full h-full object-cover" data-alt="High-quality architectural photograph of a luxury modern mansion in the Eje Cafetero region of Colombia. The property features large glass windows, warm wooden accents, and is surrounded by lush green tropical vegetation and coffee plantations. The lighting is golden hour, creating a warm and sophisticated atmosphere consistent with the Ivonne Marin brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS9cE2RL1HIR4-1uzAKXBt_FDoFhyw6zvYr7TPTawvt2HxGPJdZ-ujswLmMhfK4Jen79l9uECzeQ5kho9pOhcUDTtmiUvvUqVfpUaCQGJ0XIZGsQqCpexsoudJAVNiLoYBtBmddRKlrKFYd3ExvDboNH9Lg6s0OwcP7P_eZ16Rbfjk-x0aUm7tKiCPgVN5lC1s2yKCbg1kXEm2qVrE-Zk58KJsJIptfX8USmva8aNVChA4WmvFFDlAEyi9PCcwdw_CaFBIDr4a264"/>
</div>
</td>
<td className="p-4 font-label-md text-on-surface-variant">IM-1042</td>
<td className="p-4">
<div className="flex flex-col">
<span className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors">Reserva de la Sierra - Casa 14</span>
<span className="text-[12px] text-on-surface-variant">Pereira, Risaralda</span>
</div>
</td>
<td className="p-4">
<div className="flex flex-col">
<span className="text-body-md">Casa de Lujo</span>
<span className="text-[12px] text-secondary-fixed-variant font-medium">Venta</span>
</div>
</td>
<td className="p-4">
<span className="font-bold text-on-surface">$2.450M</span>
</td>
<td className="p-4">
<span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-bold uppercase">Disponible</span>
</td>
<td className="p-4 text-center">
<button className="w-10 h-6 bg-primary rounded-full relative inline-flex items-center px-1 transition-all">
<span className="w-4 h-4 bg-white rounded-full translate-x-4"></span>
</button>
</td>
<td className="p-4">
<div className="flex items-center justify-end gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all" title="Ver">
<span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all" title="Editar">
<span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all" title="Compartir">
<span className="material-symbols-outlined text-[20px]" data-icon="share">share</span>
</button>
<button className="p-2 hover:bg-error-container/20 rounded-lg text-error transition-all" title="Eliminar">
<span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>

<tr className="property-row transition-colors group">
<td className="p-4 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary/40" type="checkbox"/>
</td>
<td className="p-4">
<div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm">
<img className="w-full h-full object-cover" data-alt="Interior view of a luxury penthouse in Manizales, Colombia. High ceilings, marble floors, and contemporary furniture with warm color palettes of beige and burgundy. Large windows overlooking the city mountains. Professional real estate photography style, airy, clean, and elegant, conveying trust and premium lifestyle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0TD3HZOOv-u86CiP1nZnqEtRXtr4N6E2pdsF1UG7UyD9TxV1V11ih1hrSBw8mXC9RqmSjLiDBTCSOlF19OOM1bIBF_2N7VbX4EENfuTjD3xp7IHqPXUaGGjsvgMSkTjQBtkkBETCyORx1LLTDC2WcVa_Dq8jpyLet354UPI418xYxpZxdmqLUBkxC83IXvpH-jZkM3JUzbEXqTtkFk8OvwijiVA_3vS_oifUXIh3NNhf_v0rwPRuLKlO6-C1UUbfmZt5Yab3C32c"/>
</div>
</td>
<td className="p-4 font-label-md text-on-surface-variant">IM-1058</td>
<td className="p-4">
<div className="flex flex-col">
<span className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors">Penthouse Edificio Avignon</span>
<span className="text-[12px] text-on-surface-variant">Manizales, Caldas</span>
</div>
</td>
<td className="p-4">
<div className="flex flex-col">
<span className="text-body-md">Apartamento</span>
<span className="text-[12px] text-secondary font-medium">Arriendo</span>
</div>
</td>
<td className="p-4">
<span className="font-bold text-on-surface">$8.5M/mes</span>
</td>
<td className="p-4">
<span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase">Reservado</span>
</td>
<td className="p-4 text-center">
<button className="w-10 h-6 bg-surface-container-highest rounded-full relative inline-flex items-center px-1 transition-all">
<span className="w-4 h-4 bg-white rounded-full translate-x-0"></span>
</button>
</td>
<td className="p-4">
<div className="flex items-center justify-end gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span></button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="share">share</span></button>
<button className="p-2 hover:bg-error-container/20 rounded-lg text-error transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span></button>
</div>
</td>
</tr>

<tr className="property-row transition-colors group">
<td className="p-4 text-center">
<input className="rounded border-outline-variant text-primary focus:ring-primary/40" type="checkbox"/>
</td>
<td className="p-4">
<div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm">
<img className="w-full h-full object-cover" data-alt="Traditional coffee farm estate (Finca) exterior in Quindio, Colombia. Red and white wooden balconies, tile roofs, and colorful flower pots. The background shows sprawling coffee hills under a soft misty sky. The visual style is warm, welcoming, and captures the heritage of the Colombian Eje Cafetero region through a high-end luxury lens." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCwDnC6xG-N1Y6b8knDycScPrGOJa63gwjUWEdGsgIHLDcT_-zOf_MFQ2i0YGqkctM5jhjeFWuKratlVFZG0WA3khDhGFO5zOk5aQfbjIsCPPyMKe9FDco1pUXi2hxM-SKqNeyEhmlti-X3jsNvimmi7zm9TteS1lAa1RnHEMJv9Kk7_qowMzTcRQOORqVL-tsrr34lvi-0OjjSH7PWbyp1v0ORrZQEWAdN_Uq3UZr0IGzl62cWEfTImYrWktdeuxscB-XRueWQcY"/>
</div>
</td>
<td className="p-4 font-label-md text-on-surface-variant">IM-0982</td>
<td className="p-4">
<div className="flex flex-col">
<span className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors">Finca El Descanso - Tradicional</span>
<span className="text-[12px] text-on-surface-variant">Salento, Quindío</span>
</div>
</td>
<td className="p-4">
<div className="flex flex-col">
<span className="text-body-md">Finca</span>
<span className="text-[12px] text-secondary-fixed-variant font-medium">Venta</span>
</div>
</td>
<td className="p-4">
<span className="font-bold text-on-surface">$1.200M</span>
</td>
<td className="p-4">
<span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold uppercase">Vendido</span>
</td>
<td className="p-4 text-center">
<button className="w-10 h-6 bg-surface-container-highest rounded-full relative inline-flex items-center px-1 transition-all">
<span className="w-4 h-4 bg-white rounded-full translate-x-0"></span>
</button>
</td>
<td className="p-4">
<div className="flex items-center justify-end gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span></button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="share">share</span></button>
<button className="p-2 hover:bg-error-container/20 rounded-lg text-error transition-all"><span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-6 py-4 flex items-center justify-between bg-surface-container-low/50">
<div className="flex items-center gap-4">
<span className="text-[13px] text-on-surface-variant">Mostrando 1 a 10 de 124 resultados</span>
<div className="flex items-center gap-2">
<span className="text-[13px] text-on-surface-variant">Filas por página:</span>
<select className="bg-transparent border-none text-[13px] font-bold py-0 pl-0 pr-8 focus:ring-0">
<option>10</option>
<option>25</option>
<option>50</option>
</select>
</div>
</div>
<div className="flex items-center gap-2">
<button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-white disabled:opacity-30 transition-all" disabled>
<span className="material-symbols-outlined text-[20px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-[13px]">1</button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-white text-[13px] transition-all">2</button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-white text-[13px] transition-all">3</button>
<span className="text-on-surface-variant">...</span>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-white text-[13px] transition-all">13</button>
<button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-white transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-8 py-4 rounded-full shadow-xl flex items-center gap-8 z-50 transform translate-y-24 transition-transform duration-300" id="bulkActions">
<span className="font-label-md"><span id="selectedCount">0</span> inmuebles seleccionados</span>
<div className="h-6 w-[1px] bg-outline-variant/30"></div>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 hover:text-primary-fixed-dim transition-colors">
<span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
<span className="text-label-md">Editar</span>
</button>
<button className="flex items-center gap-2 hover:text-primary-fixed-dim transition-colors">
<span className="material-symbols-outlined text-[20px]" data-icon="sell">sell</span>
<span className="text-label-md">Cambiar Estado</span>
</button>
<button className="flex items-center gap-2 hover:text-error transition-colors">
<span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
<span className="text-label-md">Eliminar</span>
</button>
</div>
<button className="p-1 hover:bg-white/10 rounded-full"  >
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
</div>
</main>


    </>
  );
}
    