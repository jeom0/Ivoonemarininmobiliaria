
import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Page() {
  return (
    <>
      

<nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container shadow-md flex flex-col h-full p-4 z-50">

<div className="mb-8 mt-4 px-2">
<h2 className="font-headline-md text-headline-md text-primary tracking-tight">Ivonne Marin</h2>
<p className="font-label-md text-label-md text-on-surface-variant mt-1">Administrador</p>
</div>

<div className="flex-1 overflow-y-auto flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 0"}}>dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 0"}}>home_work</span>
<span className="font-label-md text-label-md">Inmuebles</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-on-primary-container font-bold translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>person_search</span>
<span className="font-label-md text-label-md">Leads</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 0"}}>calendar_month</span>
<span className="font-label-md text-label-md">Visitas</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 0"}}>analytics</span>
<span className="font-label-md text-label-md">Reportes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 0"}}>settings</span>
<span className="font-label-md text-label-md">Configuración</span>
</a>
</div>

<div className="mt-auto mb-6 px-2">
<button className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex justify-center items-center gap-2">
<span className="material-symbols-outlined">add</span>
                Crear Inmueble
            </button>
</div>

<div className="border-t border-outline-variant/30 pt-4 px-2 flex flex-col gap-2">
<a className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all text-sm" href="#">
<span className="material-symbols-outlined text-sm">help</span>
<span className="font-body-md text-sm">Ayuda</span>
</a>
<a className="flex items-center gap-3 px-2 py-2 rounded-lg text-error hover:bg-error-container transition-all text-sm" href="#">
<span className="material-symbols-outlined text-sm">logout</span>
<span className="font-body-md text-sm">Cerrar Sesión</span>
</a>
</div>
</nav>

<main className="flex-1 ml-64 p-margin-desktop h-screen overflow-y-auto flex flex-col">

<header className="flex justify-between items-end mb-8">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestión de Leads</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Administra y haz seguimiento a tus prospectos inmobiliarios.</p>
</div>

<div className="flex items-center gap-4">
<button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="Professional headshot of a female real estate agent, wearing a chic beige blazer, smiling warmly in a bright, modern office with soft natural lighting and elegant decor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuACG1bE9jQLz3xHVYp987AyMQ-0Lt8-TEYweRPD0Fa-u1RQKJBsn44_B0Fg3MkilrBCMWllMqdaLSxPXv4uBbyWMW2ORsjC2VvOQpFfvJ2OE9K_smkNruttjQhnV_D9G0FyjRJxmemXDRx0Kv-GGxxdzek66r-547Rbp7qapv5VZIW7BTxTH3QtlLEJLKFojOQqY5sv9xgyn9aXUiHvXtdS836zVhCI1_uXDyriBq-MgkX_lCf3-1DDeDy6Ew8IEMzNr4_U2sSoaLI"/>
</div>
</div>
</header>

<div className="flex flex-wrap gap-4 mb-6 bg-surface-container-lowest p-4 rounded-xl ambient-shadow border border-outline-variant/20 items-center justify-between">

<div className="relative flex-1 min-w-[250px] max-w-md">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Buscar por nombre, teléfono o inmueble..." type="text"/>
</div>

<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md">
<span className="material-symbols-outlined text-sm">filter_list</span>
                    Estado
                </button>
<button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                    Fecha
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-lg hover:bg-secondary/90 transition-colors font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-sm">download</span>
                    Exportar
                </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/20 flex-1 overflow-hidden flex flex-col">
<div className="overflow-x-auto flex-1">
<table className="w-full text-left border-collapse min-w-[800px]">
<thead className="bg-surface-container-low border-b border-outline-variant/30 sticky top-0 z-10">
<tr>
<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Cliente</th>
<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Contacto</th>
<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Inmueble de Interés</th>
<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Fuente</th>
<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Estado</th>
<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold text-right">Acciones</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20 font-body-md text-body-md text-on-surface">

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-6">
<div className="font-medium text-on-surface">Carlos Arturo Velez</div>
<div className="text-sm text-on-surface-variant mt-0.5">Hace 2 horas</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm text-on-surface-variant">call</span>
                                    +57 300 123 4567
                                </div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-md overflow-hidden bg-surface-variant flex-shrink-0">
<img className="w-full h-full object-cover" data-alt="Exterior shot of a modern luxury villa in the Colombian coffee region, featuring large glass windows, a warm wooden facade, and a lush green mountain backdrop under clear daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfznC5SuxjRDJy_OAZJVGNEAKyG0AUvV_seimCYeUFmFJXQEE2n2RId5byKwYp7LtecJCcdikxd5jGFvnAbdMycWrjvZ-W4vbmqbjxjCw_8a2jtSX3UhLx4pCNnDmeqq8_di4Ng1xCXrERu8e6lMvWoc4ChzLz8SpzFV6PYsHtazEYzouFqo0YhtwbIqs7-o82CSwoGSf4VZGQBAlahkpzaP-g0pJdoowGZnKM74QLsweOpaxgr6fhjv2hieq9ubjflBZerC5JQ7o"/>
</div>
<div>
<div className="font-medium truncate max-w-[150px]">Villa Manizales</div>
<div className="text-sm text-on-surface-variant">Cod: 8472</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">
<span className="material-symbols-outlined text-sm">language</span>
                                    Web
                                </span>
</td>
<td className="py-4 px-6">

<span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-xs bg-tertiary-container text-on-tertiary">
                                    Nuevo
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Ver detalle">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Contactar WhatsApp">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Editar lead">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-6">
<div className="font-medium text-on-surface">María Fernanda López</div>
<div className="text-sm text-on-surface-variant mt-0.5">Ayer, 14:30</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm text-on-surface-variant">call</span>
                                    +57 311 987 6543
                                </div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-md overflow-hidden bg-surface-variant flex-shrink-0">
<img className="w-full h-full object-cover" data-alt="Interior view of a sleek, minimalist luxury apartment living room. Warm beige walls, elegant contemporary furniture, and a large window overlooking a misty Andean mountain landscape." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzwUGba-RXqKrU0gXuz0aEYKRthe_rrWgmVktho_quGFQEOFHDmwprnAjfEu0OqHmsUJP6O890g-yXJGdiELw9g5EijL1j4vv8dOw6mQp_aw8rySedLpBGaTYe1m86xtrEArDkQJW3ozzxsG0CIcxwFzzOBsbnCEEqSYfZ7X_WtpKk5e-rVU4SacpcRI6BFJ6gIiM6IobWnrHcHhurqZy-ES7YnMwXxW4SIv-wst7eVz6tFPcrB5NgXEI1NImLqm0Ijl930OiCkWo"/>
</div>
<div>
<div className="font-medium truncate max-w-[150px]">Apto Pereira Centro</div>
<div className="text-sm text-on-surface-variant">Cod: 9102</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">
<span className="material-symbols-outlined text-sm">chat</span>
                                    WhatsApp
                                </span>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-xs bg-surface-container-high text-on-surface">
                                    Contactado
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-6">
<div className="font-medium text-on-surface">Familia Gómez Restrepo</div>
<div className="text-sm text-on-surface-variant mt-0.5">Hace 3 días</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm text-on-surface-variant">mail</span>
                                    contacto@ejemplo.com
                                </div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-md overflow-hidden bg-surface-variant flex-shrink-0">
<img className="w-full h-full object-cover" data-alt="Wide shot of an expansive outdoor terrace in a high-end countryside estate. Features a pristine infinity pool, tasteful wooden lounge chairs, and warm late-afternoon sunlight casting soft shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNC0gOpm6wa9j1gJO3pRBGlks4ZfzkkMmkMccjUvQgGjUXFEPh7CxxAYzMFEca-BAQ_oiYiqwr2_LyXgeaViBs-amLeXx01CMmDbKKtNHVhwQ_pWf67jSbHHlBZGlJD7OfVaSow_GoqoJjzH_wJyRiXqvV8Z1s_M9cncr1VfBunDKhTZb-KiO8-_WIuTd988CcDShNO9f-N3vrAiL4xbeNXKgvDHrEPCeK_J3xI4tGKmozL2SpxM0MOkE-6dHsxpHw9U5tdcSSqgg"/>
</div>
<div>
<div className="font-medium truncate max-w-[150px]">Finca El Retiro</div>
<div className="text-sm text-on-surface-variant">Cod: 4421</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">
<span className="material-symbols-outlined text-sm">photo_camera</span>
                                    Instagram
                                </span>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-xs bg-secondary-container text-on-secondary-container">
                                    En Negociación
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-6">
<div className="font-medium text-on-surface">Inversiones Andinas SAS</div>
<div className="text-sm text-on-surface-variant mt-0.5">12 Oct, 2023</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm text-on-surface-variant">call</span>
                                    +57 320 555 8899
                                </div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-md overflow-hidden bg-surface-variant flex-shrink-0">
<span className="material-symbols-outlined w-full h-full flex items-center justify-center text-outline text-2xl">domain</span>
</div>
<div>
<div className="font-medium truncate max-w-[150px]">Lote Comercial Armenia</div>
<div className="text-sm text-on-surface-variant">Cod: 1055</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">
<span className="material-symbols-outlined text-sm">language</span>
                                    Web
                                </span>
</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-xs bg-outline-variant/30 text-on-surface-variant">
                                    Cerrado
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
<button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="border-t border-outline-variant/20 p-4 flex justify-between items-center bg-surface-container-lowest">
<p className="font-body-md text-sm text-on-surface-variant">Mostrando 1 a 4 de 24 leads</p>
<div className="flex gap-2">
<button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled>
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 rounded border border-primary bg-primary text-on-primary flex items-center justify-center font-label-md text-sm">
                        1
                    </button>
<button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low font-label-md text-sm">
                        2
                    </button>
<button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</main>

    </>
  );
}
    