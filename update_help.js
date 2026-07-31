const fs = require('fs');
let code = fs.readFileSync('src/app/admin/ayuda/page.tsx', 'utf8');

const section6Regex = /\{\/\* ========================================================================= \*\/\}\s*\{\/\* SECCIÓN 6: CONFIGURACIÓN Y CMS \*\/\}\s*\{\/\* ========================================================================= \*\/\}\s*<section className="space-y-8">[\s\S]*?<\/section>/;

const newSection6 = `{/* ========================================================================= */}
      {/* SECCIÓN 6: CONFIGURACIÓN Y CMS */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#0081a7]/10 flex items-center justify-center text-[#0081a7] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">settings</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0081a7]">6. Configuración General Dinámica (7 Pasos)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Paso 1 Config */}
           <div className="bg-[#2b2d42] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: Módulo y Pestañas</span>
               <h3 className="text-xl font-bold mb-3">Ingresar y Navegar</h3>
               <p className="text-gray-300 leading-relaxed text-sm">
                 Entra a "Configuración" en el menú. Verás 2 pestañas principales: <strong>Perfil de Empresa</strong> (datos y logos) y <strong>Configuración del Sitio</strong> (textos, navbar, zonas y orden).
               </p>
             </div>
             <div className="bg-[#8d99ae] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto gap-3">
                <div className="flex items-center gap-3 px-3 py-2 mx-auto rounded-lg bg-[#5c1212] text-[#e17770] font-bold shadow-inner relative z-10 w-48 mb-4">
                 <span className="material-symbols-outlined text-sm">settings</span>
                 <span className="text-xs">Configuración</span>
               </div>
                <div className="flex border-b border-gray-300 text-[9px] font-bold text-gray-500 bg-white rounded-t-lg p-2 pb-0 w-full max-w-[220px] shadow-lg">
                  <div className="px-2 py-2 border-b-2 border-primary text-primary">Perfil Empresa</div>
                  <div className="px-2 py-2 border-b-2 border-transparent">Configuración Sitio</div>
                </div>
                <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '40%', left: '50%'}}>👆🏽</div>
             </div>
           </div>

           {/* Paso 2 Config */}
           <div className="bg-[#8d99ae] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Perfil Empresa</span>
               <h3 className="text-xl font-bold mb-3">Datos Básicos y Logos</h3>
               <p className="text-gray-100 leading-relaxed text-sm">
                 En esta pestaña configuras el nombre, descripción, número de WhatsApp para el botón flotante y subes el <strong>Logo Principal</strong> de la página.
               </p>
             </div>
             <div className="bg-[#edf2f4] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto gap-3">
                <div className="bg-white p-3 rounded-lg w-full max-w-[200px] shadow-lg space-y-2 border border-gray-200">
                  <label className="text-[8px] font-bold text-gray-500">Nombre de la Agencia</label>
                  <div className="w-full bg-gray-50 border border-gray-200 rounded p-1 text-[8px] font-mono text-gray-800">
                    <div className="animate-typing">Ivonne Marin Inmobiliaria</div>
                  </div>
                  <label className="text-[8px] font-bold text-gray-500 mt-2 block">Logo Principal</label>
                  <div className="w-full border-2 border-dashed border-primary/40 rounded p-3 text-center bg-primary/5 text-primary text-[8px] font-bold cursor-pointer hover:bg-primary/10">
                    <span className="material-symbols-outlined text-sm block mb-1">upload</span>
                    Subir Nuevo Logo
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 3 Config */}
           <div className="bg-[#f4a261] text-[#5c3a1a] rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Perfil Empresa</span>
               <h3 className="text-xl font-bold mb-3">Redes Sociales</h3>
               <p className="text-[#5c3a1a]/80 leading-relaxed text-sm">
                 Puedes agregar redes sociales dinámicamente. Escoge el ícono y pon la URL. Aparecerán automáticamente en el pie de página (footer).
               </p>
             </div>
             <div className="bg-[#f4b684] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[220px] shadow-lg border border-gray-200 space-y-2">
                  <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 p-2 rounded">
                    <span className="material-symbols-outlined text-[10px] bg-white p-1 shadow-sm rounded">public</span>
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-[7px] font-mono text-gray-500">instagram</span>
                      <span className="text-[7px] font-mono text-gray-800">instagram.com/ivonne</span>
                    </div>
                    <span className="material-symbols-outlined text-error text-[12px] cursor-pointer">delete</span>
                  </div>
                  <button className="text-primary text-[9px] font-bold flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined text-[12px]">add</span> Agregar Red Social
                  </button>
                </div>
             </div>
           </div>

           {/* Paso 4 Config */}
           <div className="bg-[#e76f51] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 4: Configuración Sitio</span>
               <h3 className="text-xl font-bold mb-3">Textos y Misión</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Cambia a la segunda pestaña. Aquí puedes modificar el título principal del Hero y los textos de la sección "Nosotros" y "Propósito".
               </p>
             </div>
             <div className="bg-[#f4a261] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[200px] shadow-lg border border-gray-200 space-y-2">
                  <label className="text-[8px] font-bold text-gray-500">Título Principal (Hero)</label>
                  <div className="w-full bg-gray-50 border border-gray-200 rounded p-1 text-[8px] font-mono text-gray-800">
                    <div className="animate-typing">Donde los sueños encuentran...</div>
                  </div>
                  <label className="text-[8px] font-bold text-gray-500 mt-2 block">Texto de Inicio (Conócenos)</label>
                  <div className="w-full bg-gray-50 border border-gray-200 rounded p-1 text-[7px] font-mono text-gray-800 h-10">
                    Transformar vidas conectando...
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 5 Config */}
           <div className="bg-[#2a9d8f] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 5: Configuración Sitio</span>
               <h3 className="text-xl font-bold mb-3">Menú (Navbar) y Orden</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Ordena las secciones de la página arrastrando hacia arriba o abajo. También puedes modificar los enlaces del menú principal de navegación (Navbar).
               </p>
             </div>
             <div className="bg-[#48b3a5] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[220px] shadow-lg border border-gray-200 space-y-2">
                  <span className="text-[9px] font-bold text-gray-600 border-b pb-1 block">Orden del Menú (Navbar)</span>
                  <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 p-1.5 rounded">
                    <div className="flex flex-col gap-0">
                      <span className="material-symbols-outlined text-[8px] text-gray-400 cursor-pointer hover:text-gray-800">arrow_upward</span>
                      <span className="material-symbols-outlined text-[8px] text-gray-400 cursor-pointer hover:text-gray-800">arrow_downward</span>
                    </div>
                    <span className="material-symbols-outlined text-[10px] text-primary">home</span>
                    <span className="text-[8px] font-mono text-gray-800 flex-1">Inicio</span>
                  </div>
                  <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 p-1.5 rounded">
                    <div className="flex flex-col gap-0">
                      <span className="material-symbols-outlined text-[8px] text-gray-400 cursor-pointer hover:text-gray-800">arrow_upward</span>
                      <span className="material-symbols-outlined text-[8px] text-gray-400 cursor-pointer hover:text-gray-800">arrow_downward</span>
                    </div>
                    <span className="material-symbols-outlined text-[10px] text-primary">domain</span>
                    <span className="text-[8px] font-mono text-gray-800 flex-1">Inmuebles</span>
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 6 Config */}
           <div className="bg-[#118ab2] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 6: Configuración Sitio</span>
               <h3 className="text-xl font-bold mb-3">Zonas de Cobertura</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Abajo encontrarás las <strong>Zonas de Cobertura</strong>. Puedes agregar cuantas ciudades quieras, cambiar su foto de fondo y reordenarlas. La primera será la principal.
               </p>
             </div>
             <div className="bg-[#2a9df4] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[220px] shadow-lg border border-gray-200 space-y-2">
                  <div className="flex gap-2 bg-gray-50 border border-gray-200 p-2 rounded">
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-[8px] font-bold text-gray-800">Santa Rosa de Cabal</span>
                      <span className="text-[7px] text-gray-500">Sede Principal</span>
                    </div>
                    <div className="w-12 h-10 bg-gray-300 rounded overflow-hidden relative flex items-center justify-center">
                       <span className="material-symbols-outlined text-[10px] text-white">image</span>
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100">
                         <span className="material-symbols-outlined text-white text-[8px]">upload</span>
                       </div>
                    </div>
                  </div>
                  <button className="text-primary text-[9px] font-bold flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined text-[12px]">add</span> Agregar Zona
                  </button>
                </div>
             </div>
           </div>

           {/* Paso 7 Config */}
           <div className="bg-[#073b4c] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl md:col-span-2 lg:col-span-3">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 7: Configuración Sitio</span>
               <h3 className="text-2xl font-bold mb-3">Hero Carrusel (Imágenes y Videos)</h3>
               <p className="text-gray-300 leading-relaxed text-sm max-w-4xl">
                 Al final de la página verás <strong>Imagen Principal (Inicio)</strong>. Aquí puedes subir múltiples imágenes y videos (.mp4). Éstos se agruparán automáticamente en un <strong>carrusel animado de fondo</strong> en la portada de tu sitio web. Si subes videos, se reproducirán solos, dándole un impacto altísimo.
               </p>
             </div>
             <div className="bg-[#115a75] min-h-[180px] p-6 relative flex items-center justify-center mt-auto">
                <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl border border-gray-200 p-4">
                  <span className="text-[10px] font-bold text-gray-600 border-b pb-2 mb-3 block">Hero Media (Múltiple)</span>
                  <div className="flex gap-4">
                    <div className="w-20 h-14 bg-gray-200 rounded relative group border border-gray-300 flex items-center justify-center">
                       <span className="material-symbols-outlined text-[14px] text-gray-400">image</span>
                       <button className="absolute -top-1 -right-1 bg-error text-white w-4 h-4 rounded-full text-[8px] items-center justify-center flex shadow opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-[10px]">close</span></button>
                    </div>
                    <div className="w-20 h-14 bg-gray-200 rounded relative group border border-gray-300 flex items-center justify-center">
                       <span className="material-symbols-outlined text-[14px] text-gray-400">movie</span>
                       <button className="absolute -top-1 -right-1 bg-error text-white w-4 h-4 rounded-full text-[8px] items-center justify-center flex shadow opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-[10px]">close</span></button>
                    </div>
                    <div className="w-20 h-14 bg-primary/5 rounded relative group border-2 border-dashed border-primary flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors">
                       <span className="material-symbols-outlined text-[14px] text-primary">add_photo_alternate</span>
                       <span className="text-[7px] text-primary font-bold mt-1">Agregar</span>
                    </div>
                  </div>
                  <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '40%', left: '50%'}}>👆🏽</div>
                </div>
             </div>
           </div>
        </div>
      </section>`;

if (section6Regex.test(code)) {
  code = code.replace(section6Regex, newSection6);
  fs.writeFileSync('src/app/admin/ayuda/page.tsx', code);
  console.log("Section 6 successfully replaced!");
} else {
  console.error("Section 6 not found via regex!");
}
