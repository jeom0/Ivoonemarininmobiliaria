const fs = require('fs');
let code = fs.readFileSync('src/app/admin/ayuda/page.tsx', 'utf8');

// 1. Add precise cursor animation to the style block
const styleBlock = `@keyframes cursorMoveAndClick`;
const newStyleBlock = `@keyframes cursorPrecisionClick {
          0%, 10% { transform: scale(1.2); opacity: 0; }
          25% { transform: scale(1); opacity: 1; }
          40% { transform: scale(0.80); opacity: 1; filter: brightness(0.8); }
          50% { transform: scale(1); opacity: 1; filter: brightness(1); }
          60%, 100% { transform: scale(1.1); opacity: 0; }
        }
        .animate-precision-cursor { animation: cursorPrecisionClick 4s infinite ease-in-out; margin-top: -15px; margin-left: -15px; }
        @keyframes cursorMoveAndClick`;

code = code.replace(styleBlock, newStyleBlock);

// 2. Add Section 6 (Profile) and replace Section 7 (Configuration)
const section6Regex = /\{\/\* ========================================================================= \*\/\}\s*\{\/\* SECCIÓN 6: CONFIGURACIÓN Y CMS \*\/\}\s*\{\/\* ========================================================================= \*\/\}\s*<section className="space-y-8">[\s\S]*?<\/section>/;

const newSections = `{/* ========================================================================= */}
      {/* SECCIÓN 6: MI PERFIL (CONTRASEÑA Y FOTO) */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#ff006e]/10 flex items-center justify-center text-[#ff006e] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">account_circle</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff006e]">6. Tu Perfil (Cambiar Foto y Contraseña)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-[#ff006e] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1</span>
               <h3 className="text-xl font-bold mb-3">Ir a tu Perfil</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 En la esquina inferior izquierda del menú, haz clic en tu nombre o foto para abrir la página de tu perfil personal.
               </p>
             </div>
             <div className="bg-[#ff5c9f] min-h-[180px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="flex items-center gap-3 bg-surface w-full max-w-[200px] p-3 rounded-xl shadow-lg border border-gray-200 relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">IM</div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-800">Ivonne Marin</span>
                    <span className="text-[8px] text-gray-500">Administradora</span>
                  </div>
                  <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '30%', left: '40%'}}>👆🏽</div>
                </div>
             </div>
           </div>

           <div className="bg-[#fb5607] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2</span>
               <h3 className="text-xl font-bold mb-3">Actualizar Foto</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Haz clic en "Cambiar Avatar" para subir una nueva foto tuya. Esta imagen aparecerá en el menú y en todo el sistema.
               </p>
             </div>
             <div className="bg-[#ff8f5c] min-h-[180px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-4 rounded-xl w-full max-w-[200px] shadow-lg border border-gray-200 flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">IM</div>
                  <button className="text-[9px] bg-surface-container border border-gray-300 text-gray-700 font-bold py-1.5 px-3 rounded-lg relative">
                    Cambiar Avatar
                    <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '10%', left: '30%'}}>👆🏽</div>
                  </button>
                </div>
             </div>
           </div>

           <div className="bg-[#8338ec] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3</span>
               <h3 className="text-xl font-bold mb-3">Cambiar Contraseña</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Llena el campo "Nueva Contraseña" y confírmala. Finalmente presiona "Guardar Cambios". La próxima vez iniciarás sesión con la nueva.
               </p>
             </div>
             <div className="bg-[#b480ff] min-h-[180px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-4 rounded-xl w-full max-w-[200px] shadow-lg border border-gray-200 space-y-2">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500">Nueva Contraseña</label>
                    <div className="w-full border border-gray-200 rounded p-1 text-[8px] text-gray-800 bg-gray-50">********</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500">Confirmar Contraseña</label>
                    <div className="w-full border border-gray-200 rounded p-1 text-[8px] text-gray-800 bg-gray-50">********</div>
                  </div>
                  <button className="bg-primary text-on-primary w-full text-[8px] font-bold py-2 rounded shadow-sm relative mt-2">
                    Guardar Cambios
                    <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '50%', left: '50%'}}>👆🏽</div>
                  </button>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 7: CONFIGURACIÓN Y CMS */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#0081a7]/10 flex items-center justify-center text-[#0081a7] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">settings</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0081a7]">7. Configuración General Dinámica (Sitio Web)</h2>
        </div>
        <p className="text-on-surface-variant max-w-4xl text-lg mb-8">
          El panel de configuración está dividido en 2 pestañas: <strong>Perfil de Empresa</strong> (donde manejas tus datos, logos y redes) y <strong>Configuración del Sitio</strong> (donde ajustas los textos de portada, menú, zonas y el carrusel principal). Sigue estos 7 subpasos:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Paso 1 Config */}
           <div className="bg-[#2b2d42] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">1. Perfil Empresa</span>
               <h3 className="text-xl font-bold mb-3">Subir el Logo Principal</h3>
               <p className="text-gray-300 leading-relaxed text-sm">
                 En la pestaña de Perfil de Empresa, encontrarás un recuadro punteado. Haz clic ahí para seleccionar el archivo PNG de tu logo. Se actualizará en la barra superior (Navbar) automáticamente.
               </p>
             </div>
             <div className="bg-[#8d99ae] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto gap-3">
                <div className="bg-white p-3 rounded-lg w-full max-w-[200px] shadow-lg space-y-2 border border-gray-200">
                  <label className="text-[8px] font-bold text-gray-500 block text-center">Logo Principal</label>
                  <div className="w-full border-2 border-dashed border-primary/40 rounded p-4 text-center bg-primary/5 text-primary text-[8px] font-bold hover:bg-primary/10 relative overflow-hidden">
                    <span className="material-symbols-outlined text-2xl block mb-1">upload</span>
                    Subir Nuevo Logo
                    <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '40%', left: '40%'}}>👆🏽</div>
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 2 Config */}
           <div className="bg-[#8d99ae] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">2. Perfil Empresa</span>
               <h3 className="text-xl font-bold mb-3">Redes Sociales Dinámicas</h3>
               <p className="text-gray-100 leading-relaxed text-sm">
                 Agrega cuantas redes sociales quieras (Instagram, Facebook, Tiktok). Estas aparecerán en el pie de página de toda la web.
               </p>
             </div>
             <div className="bg-[#edf2f4] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[220px] shadow-lg border border-gray-200 space-y-2">
                  <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 p-2 rounded">
                    <span className="material-symbols-outlined text-[10px] bg-white p-1 shadow-sm rounded">public</span>
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-[7px] font-mono text-gray-500">instagram</span>
                      <span className="text-[7px] font-mono text-gray-800">instagram.com/ivonne</span>
                    </div>
                  </div>
                  <button className="text-primary text-[9px] font-bold flex items-center gap-1 hover:underline relative">
                    <span className="material-symbols-outlined text-[12px]">add</span> Agregar Red Social
                    <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '20%', left: '30%'}}>👆🏽</div>
                  </button>
                </div>
             </div>
           </div>

           {/* Paso 3 Config */}
           <div className="bg-[#f4a261] text-[#5c3a1a] rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">3. Config. Sitio</span>
               <h3 className="text-xl font-bold mb-3">Textos del Hero (Inicio)</h3>
               <p className="text-[#5c3a1a]/80 leading-relaxed text-sm">
                 Cambia a la pestaña "Configuración del Sitio". Escribe un Título Principal llamativo. Se actualizará al instante en las letras grandes de la portada.
               </p>
             </div>
             <div className="bg-[#f4b684] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[200px] shadow-lg border border-gray-200 space-y-2">
                  <label className="text-[8px] font-bold text-gray-500">Título Principal (Hero)</label>
                  <div className="w-full bg-gray-50 border border-primary/50 rounded p-1 text-[8px] font-mono text-gray-800 shadow-inner relative">
                    <div className="animate-typing">Donde los sueños encuentran su lugar</div>
                    <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '40%', left: '60%'}}>👆🏽</div>
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 4 Config */}
           <div className="bg-[#e76f51] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">4. Config. Sitio</span>
               <h3 className="text-xl font-bold mb-3">Enlaces del Menú Principal</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Puedes organizar, renombrar, agregar o eliminar los botones que salen arriba en el menú (Inicio, Inmuebles, Nosotros, etc.). Haz clic en las flechas para subir/bajar.
               </p>
             </div>
             <div className="bg-[#f4a261] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[220px] shadow-lg border border-gray-200 space-y-2">
                  <span className="text-[9px] font-bold text-gray-600 border-b pb-1 block">Orden del Menú (Navbar)</span>
                  <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 p-1.5 rounded relative">
                    <div className="flex flex-col gap-0 relative">
                      <span className="material-symbols-outlined text-[8px] text-gray-400">arrow_upward</span>
                      <span className="material-symbols-outlined text-[8px] text-gray-800 font-bold">arrow_downward</span>
                      <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '-50%', left: '20%'}}>👆🏽</div>
                    </div>
                    <span className="material-symbols-outlined text-[10px] text-primary">domain</span>
                    <span className="text-[8px] font-mono text-gray-800 flex-1">Inmuebles</span>
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 5 Config */}
           <div className="bg-[#2a9d8f] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">5. Config. Sitio</span>
               <h3 className="text-xl font-bold mb-3">Zonas de Cobertura</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 En la sección Zonas, agrega ciudades (ej: Santa Rosa, Pereira). Sube una foto a cada una. La ciudad que subas de primera será la Zona Principal en la web.
               </p>
             </div>
             <div className="bg-[#48b3a5] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white p-3 rounded-lg w-full max-w-[220px] shadow-lg border border-gray-200 space-y-2">
                  <div className="flex gap-2 bg-gray-50 border border-gray-200 p-2 rounded">
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-[8px] font-bold text-gray-800">Pereira</span>
                      <span className="text-[7px] text-gray-500">Corazón del Eje</span>
                    </div>
                    <div className="w-12 h-10 bg-primary/10 rounded overflow-hidden relative flex items-center justify-center cursor-pointer border border-primary/30 hover:bg-primary/20">
                       <span className="material-symbols-outlined text-[10px] text-primary">upload</span>
                       <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '10%', left: '10%'}}>👆🏽</div>
                    </div>
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 6 Config */}
           <div className="bg-[#118ab2] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">6. Config. Sitio</span>
               <h3 className="text-xl font-bold mb-3">Hero Carrusel (Imágenes/Video)</h3>
               <p className="text-white/80 leading-relaxed text-sm">
                 Baja hasta "Imagen Principal". Allí verás las cajitas para subir multimedia. Puedes subir múltiples imágenes y videos MP4 al mismo tiempo.
               </p>
             </div>
             <div className="bg-[#2a9df4] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl border border-gray-200 p-3">
                  <span className="text-[9px] font-bold text-gray-600 mb-2 block">Hero Media (Múltiple)</span>
                  <div className="flex gap-2">
                    <div className="w-14 h-10 bg-gray-200 rounded relative border border-gray-300 flex items-center justify-center">
                       <span className="material-symbols-outlined text-[12px] text-gray-400">image</span>
                    </div>
                    <div className="w-14 h-10 bg-primary/5 rounded relative border-2 border-dashed border-primary flex flex-col items-center justify-center cursor-pointer">
                       <span className="material-symbols-outlined text-[12px] text-primary">add_photo_alternate</span>
                       <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '30%', left: '40%'}}>👆🏽</div>
                    </div>
                  </div>
                </div>
             </div>
           </div>

           {/* Paso 7 Config */}
           <div className="bg-[#073b4c] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl md:col-span-2 lg:col-span-3">
             <div className="p-8 flex flex-col h-full">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">7. Config. Sitio</span>
               <h3 className="text-2xl font-bold mb-3">Orden de las Secciones del Inicio</h3>
               <p className="text-gray-300 leading-relaxed text-sm max-w-4xl flex-grow mb-8">
                 Finalmente, en la parte inferior de la pestaña <strong>Configuración del Sitio</strong>, encontrarás una lista con todas las grandes áreas de tu página de inicio (Zonas, Propiedades Destacadas, Blog, etc). Moviéndolas con las flechas puedes reconstruir tu página de inicio entera como piezas de lego.
               </p>
               <div className="bg-[#115a75] p-6 rounded-2xl relative flex items-center justify-center">
                  <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl border border-gray-200 p-4">
                    <span className="text-[10px] font-bold text-gray-600 border-b pb-2 mb-3 block">Orden de las Secciones</span>
                    <div className="space-y-2">
                      <div className="flex gap-3 items-center bg-gray-50 border border-gray-200 p-2 rounded">
                        <div className="flex flex-col gap-0 relative">
                          <span className="material-symbols-outlined text-[10px] text-gray-800 font-bold">arrow_upward</span>
                          <span className="material-symbols-outlined text-[10px] text-gray-400">arrow_downward</span>
                          <div className="absolute z-20 animate-precision-cursor text-4xl" style={{top: '-30%', left: '10%'}}>👆🏽</div>
                        </div>
                        <span className="text-[10px] font-bold text-primary w-24">Inmuebles Destacados</span>
                      </div>
                      <div className="flex gap-3 items-center bg-gray-50 border border-gray-200 p-2 rounded opacity-50">
                        <div className="flex flex-col gap-0">
                          <span className="material-symbols-outlined text-[10px] text-gray-400">arrow_upward</span>
                          <span className="material-symbols-outlined text-[10px] text-gray-400">arrow_downward</span>
                        </div>
                        <span className="text-[10px] font-bold text-primary w-24">Zonas de Cobertura</span>
                      </div>
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </section>`;

if (section6Regex.test(code)) {
  code = code.replace(section6Regex, newSections);
  fs.writeFileSync('src/app/admin/ayuda/page.tsx', code);
  console.log("Section 6 (Profile) and 7 (Configuration) successfully replaced!");
} else {
  console.error("Section 6 regex not found!");
}
