
import Link from "next/link";


export default async function Page() {
  return (
    <>
      
<nav className="bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
<div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
<div className="flex items-center gap-4">
<span className="text-headline-md font-headline-lg text-primary tracking-tight">ivonne marin.</span>
</div>
<div className="hidden md:flex items-center gap-8">
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Inicio</a>
<a className="font-label-md text-label-md text-primary border-b-2 border-primary font-bold" href="#">Inmuebles</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Vender</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Arrendar</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Nosotros</a>
</div>
<div className="flex items-center gap-4">
<button className="hidden lg:flex px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 active:scale-95 transition-all">Contacto</button>
<button className="p-2 text-primary md:hidden">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</div>
</nav>
<main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
<nav className="flex mb-8 items-center gap-2 font-label-md text-label-md text-on-surface-variant overflow-x-auto whitespace-nowrap">
<a className="hover:text-primary" href="#">Inicio</a>
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
<a className="hover:text-primary" href="#">Inmuebles</a>
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
<span className="text-primary font-bold">Apartamento en venta en Guaduales del Otún</span>
</nav>
<section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
<div className="lg:col-span-2 space-y-10">
<div className="property-grid-asymmetric rounded-2xl overflow-hidden shadow-sm">
<div className="row-span-2 relative group cursor-pointer overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A sprawling luxury apartment living room featuring floor-to-ceiling windows overlooking a lush Colombian mountain landscape. The interior is styled with warm beige fabrics, rich vinotinto accents, and contemporary wooden furniture under soft, natural golden-hour lighting, creating a serene and sophisticated residential atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXi_mvYjCXmrOX1oD0hCc1AtnH8p5GkVk4kHVsR3qjP6-SN6pEUrxpYT8Of3LTqMDl7N3dfKZ2b4lTxDXA7kENzPv9rq409QowdMnSeVU6IS_7NU1YdRTc_YqXu8dw9o7eylXwcM8RW3VuiKkyJ0OBzulCHsfl864-icpX3WOzw8Gd4_6m5CQZWQUfSvui0pUFduRkMQIfp3jFeGbt5R6w1wmxOP6kPZA9oKj_PoHjd6xRsf8hXibPRjsehpVOJp5V8timQgbw7Ls"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
<span className="text-white font-label-md">Ver más fotos</span>
</div>
</div>
<div className="relative overflow-hidden cursor-pointer group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A modern kitchen with minimalist white cabinetry and a warm marble island. Subtle vinotinto decorative elements like a vase and textiles complement the high-end appliances. The lighting is bright and clean, emphasizing a premium architectural photography style in a light-mode color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqSMRHxPSOYjee_WPgYAM526qfvitvbSXQAsInVePgGzLitl1yh0gBf7p1zoN9gvMVUeZZ3c1nw7hqxPKf4db2gl15k6cKxhs7baRmrF2isCF9HO2EiOBjvuW_qiYSxnNbXM9Bcf6AcH09I8MnEO6vvY1W16luWkAUhr1iPcvSpXhXh8mJD54wDCFsZ84hutlIyOi9x9UdmdjsfnYPUkxbKgd1rBHi66E4rzVE59OJKg0UU-keANqHtcAxxfLAVu2L7QoKnttBNXM"/>
</div>
<div className="relative overflow-hidden cursor-pointer group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A master bedroom suite with a wide balcony access, showcasing high-quality linens in warm white and earth tones. The morning light spills across the room, highlighting the professional interior design and empathetic, welcoming ambiance of the luxury real estate brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy3HITxy6C1OgR-NhRfK40qSmiVeOgBIA17j533UH37TadPB_2dUgz-qZiG3KR8A4LfbFWKA4UejyelGgxNsSmt0Gpi-8ZJUQ--FZ9VZycV8DP5w7YSI9Kmk_1-fKHolHEfXnAmEbzibDv6FI4KwZ821NLb4Wugv8pK2nRw9AZz__00JZovaTiLY63T7CkhIvDdz6IXhHrd5tZMVWhTY_Cr4vBtcM9FvmQhqkz1q0kH0ihTZcvKMuqi6t032ZUfFDygF2NkwvYqAk"/>
<div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span className="text-on-primary font-headline-md">+12 Fotos</span>
</div>
</div>
</div>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant pb-8">
<div className="space-y-2">
<span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-md text-[12px] rounded-full uppercase tracking-wider">Disponible</span>
<h1 className="font-headline-lg text-headline-lg text-primary">Apartamento Guaduales del Otún</h1>
<p className="flex items-center gap-1 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]" data-icon="location_on">location_on</span>
                            Dosquebradas, Risaralda
                        </p>
</div>
<div className="text-right">
<p className="text-on-surface-variant font-label-md uppercase tracking-tighter">Precio de Venta</p>
<p className="font-display-lg text-display-lg text-primary">$450.000.000</p>
<p className="text-[12px] text-on-surface-variant font-body-md">Cód: IM-8821</p>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-primary mb-2" data-icon="square_foot">square_foot</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Área Total</span>
<span className="font-headline-md text-[18px]">98m²</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
<span className="material-symbols-outlined text-primary mb-2" data-icon="aspect_ratio">aspect_ratio</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Área Privada</span>
<span className="font-headline-md text-[18px]">92m²</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
<span className="material-symbols-outlined text-primary mb-2" data-icon="bed">bed</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Habitaciones</span>
<span className="font-headline-md text-[18px]">3</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
<span className="material-symbols-outlined text-primary mb-2" data-icon="bathtub">bathtub</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Baños</span>
<span className="font-headline-md text-[18px]">2</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
<span className="material-symbols-outlined text-primary mb-2" data-icon="directions_car">directions_car</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Parqueadero</span>
<span className="font-headline-md text-[18px]">1</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
<span className="material-symbols-outlined text-primary mb-2" data-icon="layers">layers</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Estrato</span>
<span className="font-headline-md text-[18px]">4</span>
</div>
<div className="flex flex-col items-center p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-center">
<span className="material-symbols-outlined text-primary mb-2" data-icon="payments">payments</span>
<span className="text-[12px] font-label-md text-on-surface-variant">Admin</span>
<span className="font-headline-md text-[18px]">$280k</span>
</div>
</div>
<div className="space-y-6">
<h2 className="font-headline-md text-headline-md text-primary">Descripción Comercial</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                        Este sofisticado apartamento ubicado en el corazón de Dosquebradas ofrece una experiencia de vida inigualable. Con acabados de alta gama y una iluminación natural excepcional, cada rincón ha sido diseñado para brindar confort y elegancia. La propiedad cuenta con una amplia zona social integrada que se conecta armoniosamente con un balcón privado, ideal para disfrutar de los atardeceres del Eje Cafetero.
                        <br/><br/>
                        Situado en Guaduales del Otún, usted tendrá acceso a las mejores zonas comunes del sector y una ubicación estratégica cerca de centros comerciales, colegios y vías principales, manteniendo siempre la tranquilidad de un entorno residencial exclusivo.
                    </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
<div className="space-y-6">
<h3 className="font-headline-md text-headline-md text-primary border-l-4 border-secondary pl-4">Características Internas</h3>
<ul className="grid grid-cols-1 gap-3">
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span> Sala y Comedor independientes
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span> Cocina integral tipo americana
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span> Zona de lavandería cubierta
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span> Pisos en porcelanato de gran formato
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span> Closets en madera de cedro
                            </li>
</ul>
</div>
<div className="space-y-6">
<h3 className="font-headline-md text-headline-md text-primary border-l-4 border-secondary pl-4">Zonas Comunes</h3>
<ul className="grid grid-cols-1 gap-3">
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="pool">pool</span> Piscina para adultos y niños
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="security">security</span> Vigilancia privada 24/7
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="fitness_center">fitness_center</span> Gimnasio totalmente dotado
                            </li>
<li className="flex items-center gap-3 font-body-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary" data-icon="celebration">celebration</span> Salón social climatizado
                            </li>
</ul>
</div>
</div>
<div className="space-y-6">
<h2 className="font-headline-md text-headline-md text-primary">Ubicación</h2>
<div className="w-full h-80 bg-surface-container rounded-2xl overflow-hidden shadow-inner relative">
<div className="absolute inset-0 bg-cover bg-center" data-alt="A stylized professional map display showing a neighborhood in Dosquebradas, Pereira. The map is rendered in warm, soft colors matching the brand's primary vinotinto and beige palette, with a prominent but elegant marker highlighting the property's location near local landmarks and green areas." style={{"backgroundImage":"url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuBgLW5kfd0pSAmOJDmTvWaCzVkhZUy5-Oeno5aFRjGKOTbkMJY6e7n078utxKW94p_IU4DGRxi4L0rH4kTwQhgU4ez2n2TmaD_TagyibUGuXPoMxHpphwXZsgvkWTNhHrmH0CuYRhPdQkBAH7V-c2qQP9sIuQ6dBdwNlBsWP2iYU6WgcWeJKBxF13JD5geuxUR02PygHTtgp6QM71KTdmdMjfFApmBKRWFWyKvsTQI-27X2El4FyGT3Af8Z9zPDb1QenbSH3ieW7XQ\")"}}></div>
<div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/0 transition-colors pointer-events-none">
<span className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="zoom_in">zoom_in</span> Ampliar Mapa
                            </span>
</div>
</div>
</div>
</div>
<aside className="space-y-gutter lg:sticky lg:top-24">
<div className="bg-surface border border-outline-variant/50 rounded-2xl p-8 shadow-sm">
<div className="flex items-center gap-4 mb-6">
<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary p-0.5">
<img className="w-full h-full object-cover rounded-full" data-alt="A professional headshot of Ivonne Marin, a high-end real estate advisor in her 40s with a warm and empathetic smile. She is wearing a cream-colored professional blouse that reflects the brand identity, photographed in a high-key studio setting with a clean, soft-focus architectural background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgZcfdPi_n0TAneC3N3wNfETdI8oO_G8QIPcsWa34_-98wnMr-m5RZQHICFsdciNAf2VLZZL3RkumToH7vrXWuozf0hInLZaGyF6lGXKOYDqmSjwITTmLqO7oLzDv_NqBTEzGBIEC-293iwhGjLJ6l22s1Hh9BxY-bjG8CudzkuWoKZkN2746Z-94jtta0xzNY9iv7o2Y7c-mWcOqmJCUpbG7QFOIoHu_kpCloGebH6kRR3hPJAX2d6QR6g-LUlCdd1kSrRt6Qj0w"/>
</div>
<div>
<h4 className="font-headline-md text-[18px] text-primary">Ivonne Marin</h4>
<p className="text-on-surface-variant font-label-md text-[12px]">Asesora Inmobiliaria</p>
</div>
</div>
<form className="space-y-4">
<div className="space-y-1">
<label className="font-label-md text-[12px] text-on-surface-variant">Nombre completo</label>
<input className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" placeholder="Ej. Juan Perez" type="text"/>
</div>
<div className="space-y-1">
<label className="font-label-md text-[12px] text-on-surface-variant">Correo electrónico</label>
<input className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" placeholder="email@ejemplo.com" type="email"/>
</div>
<div className="space-y-1">
<label className="font-label-md text-[12px] text-on-surface-variant">WhatsApp / Teléfono</label>
<input className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" placeholder="+57 300 000 0000" type="tel"/>
</div>
<div className="space-y-1">
<label className="font-label-md text-[12px] text-on-surface-variant">Mensaje</label>
<textarea className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" rows={4}>Hola, estoy interesado en el apartamento Guaduales del Otún (Cód: IM-8821). ¿Podrían darme más información?</textarea>
</div>
<button className="w-full py-4 bg-primary text-on-primary font-headline-md text-[16px] rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                            Enviar Solicitud
                        </button>
</form>
<div className="mt-6 flex flex-col gap-3">
<a className="flex items-center justify-center gap-2 w-full py-3 border-2 border-secondary text-primary font-label-md rounded-xl hover:bg-secondary-fixed transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span> Agendar Visita
                        </a>
<a className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-label-md rounded-xl hover:opacity-90 transition-opacity" href="#">
<span className="material-symbols-outlined" data-icon="chat">chat</span> WhatsApp Directo
                        </a>
</div>
</div>
<div className="bg-primary p-6 rounded-2xl text-on-primary space-y-4">
<h5 className="font-headline-md text-[18px]">¿Necesitas vender tu propiedad?</h5>
<p className="font-body-md text-on-primary/80">Ofrecemos asesoría integral y posicionamiento premium para tu inmueble en el Eje Cafetero.</p>
<button className="px-6 py-2 bg-secondary text-on-primary font-label-md rounded-lg w-full">Más información</button>
</div>
</aside>
</section>
<section className="mt-section-gap">
<div className="flex justify-between items-end mb-8">
<h2 className="font-headline-lg text-headline-lg text-primary">Inmuebles Similares</h2>
<a className="text-secondary font-label-md flex items-center gap-1 hover:underline" href="#">Ver todos <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span></a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A bright, luxury 3-bedroom house in Dosquebradas with modern architectural lines, white stone facades, and large balconies. The property is surrounded by manicured tropical gardens under a clear blue sky, presenting a high-end real estate opportunity in a prestigious neighborhood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA48eAHdLrV1vtCeewi3AJtZSEy5I44jD5e3MElUgpLktmjrTUvh9iS7kTHFziww4HrS6Re93Y6RcPiqmD8Al7YXGQIEIg47KikEiSA_TNkbnKk0d39WD8UeHcqms8QQ9D7hQl_0PZp2ye0jDODN3jmh5NylqftYqqduIQg9IOZgqiWEqSUBm_qxqKZUTH61ePQrNwZZBG36hhhZ3bFejk179l0MCYHnjBV3xqxUV-w63ha_PPwGLT6xChrb_2OGeG2rL8kr8HxnVs"/>
<div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-label-md uppercase">Venta</div>
</div>
<div className="p-6 space-y-3">
<h3 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors">Casa Campestre El Jordan</h3>
<p className="text-on-surface-variant font-body-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]" data-icon="location_on">location_on</span> Dosquebradas</p>
<div className="flex items-center gap-4 text-on-surface-variant border-y border-outline-variant/30 py-3 my-4">
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="bed">bed</span> 3</span>
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="bathtub">bathtub</span> 3</span>
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="square_foot">square_foot</span> 120m²</span>
</div>
<p className="font-headline-md text-primary">$620.000.000</p>
</div>
</div>
<div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An elegant apartment building penthouse in Pereira with a large rooftop terrace featuring a private hot tub and outdoor lounge area. The image captures the twilight mood with warm interior lights glowing against a dark blue sky, highlighting a luxurious and empathetic lifestyle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzQHEKeF0ipvn_LeZ_enjuqhRp8NqoVsc4oshjKiupvCnTJhpIweDtKAhb8dHzG-NZt8TMRupVpj872h2LlG5Rp7HOtm8g6b91K64va901Y_5C60or-3ummsHr2EyP1lDDnaQs6ICoLgO6Vnz2B61NsglfDdVDrAzS73gaERAVmgM9yW-L9w_7AvYjBH1QIe4sTe44VT4kGQQB0w5o7Kw-iGFmQWEIxdOQ9n375G9qNhtBKRiFEk2x1mychIamws24h9Uwpv-4WN4"/>
<div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-label-md uppercase">Venta</div>
</div>
<div className="p-6 space-y-3">
<h3 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors">Apartamento Mirador de la Colina</h3>
<p className="text-on-surface-variant font-body-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]" data-icon="location_on">location_on</span> Pereira, Pinares</p>
<div className="flex items-center gap-4 text-on-surface-variant border-y border-outline-variant/30 py-3 my-4">
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="bed">bed</span> 2</span>
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="bathtub">bathtub</span> 2</span>
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="square_foot">square_foot</span> 85m²</span>
</div>
<p className="font-headline-md text-primary">$385.000.000</p>
</div>
</div>
<div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A modern open-concept apartment with high ceilings and wood-plank flooring. The interior features a neutral warm palette with vinotinto textile accents, showing a spacious living and dining area with a high-end designer kitchen in the background, professional staging for real estate." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbQm4vhr1evcgKG4qFc7yw1_OOyaNxC-0Zk_pZ1zd0xJbonxBX__OGpO-KpAtmCYyedEpsgmBH3u_B94CMgMLxEYRx5Petljv-TuDH7vMN6AV4Nq8XqIrnqqjZHbvZ_wzmb7epkN2Rmn6AqC2vva0nUPQbyoxf2dMdrNy4iHl6t3gOfco6khxwOyTPjMujXBYABeE1UGb8RYqgTzzYr6L9C4-m41jL-3e93SjelPJDTMEu8TGUjBS-b2-jmmPSdRT19s2FGr8Hr_I"/>
<div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[12px] font-label-md uppercase">Venta</div>
</div>
<div className="p-6 space-y-3">
<h3 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors">Penthouse Guaduales Reservado</h3>
<p className="text-on-surface-variant font-body-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]" data-icon="location_on">location_on</span> Dosquebradas</p>
<div className="flex items-center gap-4 text-on-surface-variant border-y border-outline-variant/30 py-3 my-4">
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="bed">bed</span> 4</span>
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="bathtub">bathtub</span> 4</span>
<span className="flex items-center gap-1 text-[13px]"><span className="material-symbols-outlined text-[18px]" data-icon="square_foot">square_foot</span> 155m²</span>
</div>
<p className="font-headline-md text-primary">$720.000.000</p>
</div>
</div>
</div>
</section>
</main>
<footer className="bg-primary dark:bg-primary-container text-on-primary mt-section-gap py-section-gap">
<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div className="space-y-6">
<span className="font-headline-md text-on-primary tracking-tight">ivonne marin.</span>
<p className="font-body-md text-on-primary/80 max-w-xs">Especialista en propiedad raíz de lujo en el Eje Cafetero. Tu sueño de hogar, asesorado con empatía y profesionalismo.</p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" href="#"><span className="material-symbols-outlined text-[20px]" data-icon="public">public</span></a>
<a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" href="#"><span className="material-symbols-outlined text-[20px]" data-icon="chat">chat</span></a>
</div>
</div>
<div className="space-y-4">
<h6 className="font-headline-md text-[18px]">Navegación</h6>
<ul className="space-y-2 font-label-md text-on-primary/70">
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Inicio</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Propiedades</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Vender</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Proyectos</a></li>
</ul>
</div>
<div className="space-y-4">
<h6 className="font-headline-md text-[18px]">Legal</h6>
<ul className="space-y-2 font-label-md text-on-primary/70">
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Términos y condiciones</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Política de privacidad</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Aviso legal</a></li>
</ul>
</div>
<div className="space-y-4">
<h6 className="font-headline-md text-[18px]">Newsletter</h6>
<p className="font-body-md text-on-primary/80">Recibe las mejores ofertas inmobiliarias del mes.</p>
<div className="flex">
<input className="bg-white/10 border-transparent rounded-l-lg p-3 text-on-primary focus:ring-0 w-full placeholder:text-white/40" placeholder="Tu email" type="email"/>
<button className="bg-secondary px-4 rounded-r-lg hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined" data-icon="send">send</span>
</button>
</div>
</div>
</div>
<div className="border-t border-white/10 mt-16 pt-8 text-center px-margin-mobile">
<p className="font-label-md text-[12px] text-on-primary/60">© 2024 Ivonne Marin Asesora Inmobiliaria. Todos los derechos reservados.</p>
</div>
</footer>


    </>
  );
}
    