"use client";

import React from 'react';

export default function AyudaPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-16 md:space-y-24 relative">
      
      {/* CSS Animaciones Globales para los tutoriales */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cursorPrecisionClick {
          0%, 10% { transform: scale(1.2); opacity: 0; }
          25% { transform: scale(1); opacity: 1; }
          40% { transform: scale(0.80); opacity: 1; filter: brightness(0.8); }
          50% { transform: scale(1); opacity: 1; filter: brightness(1); }
          60%, 100% { transform: scale(1.1); opacity: 0; }
        }
        .animate-precision-cursor { animation: cursorPrecisionClick 4s infinite ease-in-out; margin-top: -15px; margin-left: -15px; }
        @keyframes cursorMoveAndClick {
          0% { transform: translate(60px, 60px); opacity: 0; }
          15% { opacity: 1; transform: translate(60px, 60px); }
          35% { transform: translate(0, 0); }
          45% { transform: translate(0, 0) scale(0.85); }
          55% { transform: translate(0, 0) scale(1); }
          75% { transform: translate(20px, 30px); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes buttonPressEffect {
          0%, 35% { transform: scale(1); opacity: 1; }
          45% { transform: scale(0.95); filter: brightness(0.9); }
          55%, 100% { transform: scale(1); opacity: 1; }
        }
        @keyframes formTypeEffect {
          0%, 40% { width: 0%; opacity: 1; }
          60%, 100% { width: 100%; opacity: 1; }
        }
        @keyframes fadeInOut {
          0%, 50% { opacity: 0; transform: translateY(10px); }
          60%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes popUp {
          0%, 20% { transform: scale(0.9) translateY(20px); opacity: 0; }
          30%, 80% { transform: scale(1) translateY(0); opacity: 1; }
          90%, 100% { transform: scale(0.9) translateY(-20px); opacity: 0; }
        }
        .animate-cursor { animation: cursorMoveAndClick 4s infinite ease-in-out; }
        .animate-btn-press { animation: buttonPressEffect 4s infinite ease-in-out; }
        .animate-typing { overflow: hidden; white-space: nowrap; animation: formTypeEffect 4s infinite steps(20, end); }
        .animate-toast { animation: fadeInOut 4s infinite ease-in-out; }
        .animate-popup { animation: popUp 5s infinite ease-in-out; }
      `}} />

      {/* HEADER PRINCIPAL */}
      <div className="mb-12 border-b border-outline-variant/30 pb-12">
        <h1 className="text-2xl md:text-3xl md:text-5xl font-headline-lg text-primary mb-6 tracking-tight font-bold">Guía Maestra de Administración</h1>
        <p className="text-xl text-on-surface-variant max-w-4xl leading-relaxed">
          Bienvenido al manual definitivo. Las tarjetas a continuación contienen <strong>clones exactos</strong> de tu panel. Observa el cursor animado para saber exactamente dónde hacer clic y cómo se debe llenar la información.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: INICIO DE SESIÓN */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1554a6]/10 flex items-center justify-center text-[#1554a6] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">login</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1554a6]">1. Inicio de Sesión</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1554a6] text-white rounded-3xl overflow-hidden flex flex-col min-h-[480px] shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: La URL Exacta</span>
              <h3 className="text-2xl font-bold mb-3">Dónde Ingresar</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Abre tu navegador y entra a la dirección de tu administrador. Siempre terminará en <strong>/admin/login</strong>.
              </p>
            </div>
            <div className="bg-[#7ca7ed] min-h-[220px] p-6 relative overflow-hidden flex items-center justify-center mt-auto">
               <div className="w-full bg-white rounded-lg p-3 flex items-center gap-3 shadow-2xl relative z-10 border border-gray-200">
                 <span className="material-symbols-outlined text-gray-400 text-[10px]">lock</span>
                 <span className="text-gray-800 font-mono text-[9px] md:text-[10px] truncate">ivonnemarininmobiliaria.com<span className="text-primary font-bold">/admin/login</span></span>
               </div>
               <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '50%', left: '40%'}}>👆🏽</div>
            </div>
          </div>

          <div className="bg-[#ffe28a] text-[#5c490a] rounded-3xl overflow-hidden flex flex-col min-h-[480px] shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Formulario</span>
              <h3 className="text-2xl font-bold mb-3">Tus Credenciales</h3>
              <p className="text-[#5c490a]/80 leading-relaxed text-sm">
                Escribe tu correo de administrador y tu contraseña.
              </p>
            </div>
            <div className="bg-[#f0c243] min-h-[220px] p-6 relative overflow-hidden flex items-center justify-center mt-auto">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-[260px] space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 mb-1 block uppercase tracking-wide">Correo Electrónico</label>
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-2 text-[11px] font-mono text-gray-800">
                    <div className="animate-typing">admin@ivonnemarin.com</div>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 mb-1 block uppercase tracking-wide">Contraseña</label>
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-2 text-[11px] font-mono text-gray-800">
                    <div className="animate-typing">••••••••</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#c5e8ce] text-[#1b4b27] rounded-3xl overflow-hidden flex flex-col min-h-[480px] shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Botón</span>
              <h3 className="text-2xl font-bold mb-3">Ingresar</h3>
              <p className="text-[#1b4b27]/80 leading-relaxed text-sm">
                Haz clic en el botón principal para entrar al Dashboard Principal.
              </p>
            </div>
            <div className="bg-[#78c688] min-h-[220px] p-6 relative overflow-hidden flex items-center justify-center mt-auto">
              <button className="bg-primary text-on-primary w-full max-w-[220px] px-4 py-4 rounded-xl font-bold shadow-2xl flex items-center justify-center gap-2 relative z-10 animate-btn-press text-sm">
                Ingresar al dashboard
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '40%', left: '50%'}}>👆🏽</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 2: LECTURA DEL DASHBOARD */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">dashboard</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#00b4d8]">2. Entendiendo el Dashboard</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#023e8a] text-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-xl">
            <div className="p-8 lg:w-1/3 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: Las 4 Métricas</span>
              <h3 className="text-2xl font-bold mb-3">Tu Negocio en Números</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Al iniciar sesión verás 4 tarjetas blancas grandes. Éstas muestran tu rendimiento: Total Inmuebles, Leads del Mes, Visitas Pendientes y Vendidos.
              </p>
            </div>
            <div className="bg-[#0077b6] p-6 relative overflow-hidden flex flex-wrap items-center justify-center gap-2 lg:w-2/3 min-min-h-[220px]">
               <div className="bg-white rounded-xl p-3 shadow-xl w-full max-w-[130px] border border-outline-variant/30 animate-popup" style={{animationDelay: '0s'}}>
                 <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-2"><span className="material-symbols-outlined text-sm">apartment</span></div>
                 <p className="text-on-surface-variant text-[8px] font-label-md">Total Inmuebles</p>
                 <h3 className="text-xl font-bold text-primary leading-none mt-1">45</h3>
               </div>
               <div className="bg-white rounded-xl p-3 shadow-xl w-full max-w-[130px] border border-outline-variant/30 animate-popup" style={{animationDelay: '0.5s'}}>
                 <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-2"><span className="material-symbols-outlined text-sm">group</span></div>
                 <p className="text-on-surface-variant text-[8px] font-label-md">Leads del Mes</p>
                 <h3 className="text-xl font-bold text-primary leading-none mt-1">12</h3>
               </div>
               <div className="bg-white rounded-xl p-3 shadow-xl w-full max-w-[130px] border border-outline-variant/30 animate-popup" style={{animationDelay: '1s'}}>
                 <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-2"><span className="material-symbols-outlined text-sm">pending_actions</span></div>
                 <p className="text-on-surface-variant text-[8px] font-label-md">Visitas Pendientes</p>
                 <h3 className="text-xl font-bold text-primary leading-none mt-1">3</h3>
               </div>
               <div className="bg-white rounded-xl p-3 shadow-xl w-full max-w-[130px] border border-outline-variant/30 animate-popup" style={{animationDelay: '1.5s'}}>
                 <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center mb-2"><span className="material-symbols-outlined text-sm">stars</span></div>
                 <p className="text-on-surface-variant text-[8px] font-label-md">Inmuebles Vendidos</p>
                 <h3 className="text-xl font-bold text-primary leading-none mt-1">8</h3>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0096c7] text-white rounded-3xl overflow-hidden flex flex-col min-h-[400px] shadow-xl">
              <div className="p-8 flex-grow">
                <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Botones de Acción</span>
                <h3 className="text-2xl font-bold mb-3">Atajos de Trabajo</h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  Encima de las métricas hay 3 botones rápidos: Crear Inmueble, Registrar Lead y Agendar Visita.
                </p>
              </div>
              <div className="bg-[#48cae4] min-h-[180px] p-6 relative overflow-hidden flex flex-col items-center justify-center gap-2">
                <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-full font-label-md text-[10px] shadow-md animate-btn-press relative z-10 w-full max-w-[180px] justify-center">
                  <span className="material-symbols-outlined text-sm">add_home</span> Crear Inmueble
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-white text-primary rounded-full font-label-md text-[10px] shadow-md opacity-90 w-full max-w-[180px] justify-center">
                  <span className="material-symbols-outlined text-sm">person_add</span> Registrar Lead
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-white text-primary rounded-full font-label-md text-[10px] shadow-md opacity-90 w-full max-w-[180px] justify-center">
                  <span className="material-symbols-outlined text-sm">event</span> Agendar Visita
                </button>
                <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '20%', left: '50%'}}>👆🏽</div>
              </div>
            </div>
            
            <div className="bg-[#023e8a] text-white rounded-3xl overflow-hidden flex flex-col min-h-[400px] shadow-xl">
              <div className="p-8 flex-grow">
                <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Listas Inferiores</span>
                <h3 className="text-2xl font-bold mb-3">Última Actividad</h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  Debajo de las métricas verás dos bloques grandes: a la izquierda una tabla con los <strong>Últimos Leads</strong> y a la derecha las <strong>Próximas Visitas</strong>.
                </p>
              </div>
              <div className="bg-[#0077b6] min-h-[180px] p-4 relative overflow-hidden flex gap-2 justify-center">
                 <div className="bg-white rounded-xl p-2 w-full max-w-[160px] h-full shadow-lg border border-outline-variant/30 flex flex-col">
                   <h4 className="font-headline-md text-[8px] text-primary mb-2">Últimos Leads</h4>
                   <div className="flex gap-2 items-center border-b pb-1 mb-1">
                      <div className="w-5 h-5 rounded-full bg-secondary-container text-[6px] flex items-center justify-center font-bold text-on-secondary-container">CA</div>
                      <div className="flex flex-col"><span className="text-[7px] text-primary font-bold">Carlos</span><span className="text-[6px] text-gray-500">Nuevo</span></div>
                   </div>
                   <div className="flex gap-2 items-center">
                      <div className="w-5 h-5 rounded-full bg-secondary-container text-[6px] flex items-center justify-center font-bold text-on-secondary-container">MA</div>
                      <div className="flex flex-col"><span className="text-[7px] text-primary font-bold">María</span><span className="text-[6px] text-gray-500">Contactado</span></div>
                   </div>
                 </div>
                 <div className="bg-surface-container-low rounded-xl p-2 w-full max-w-[120px] h-full shadow-lg border border-outline-variant/30">
                    <h4 className="font-headline-md text-[8px] text-primary mb-2">Próximas Visitas</h4>
                    <div className="flex gap-1 items-center bg-white p-1 rounded shadow-sm border-l-2 border-primary mb-1">
                      <div className="bg-surface-container w-6 h-6 flex flex-col items-center justify-center rounded text-[5px] text-primary font-bold">AGO <span>15</span></div>
                      <span className="text-[6px] text-primary">Luis P.</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 3: GESTIÓN Y CREACIÓN REAL DE INMUEBLES */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#8b3dff]/10 flex items-center justify-center text-[#8b3dff] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">real_estate_agent</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#8b3dff]">3. Guía Completa: Crear y Editar Inmuebles</h2>
            <p className="text-sm text-on-surface-variant">Aprende a publicar propiedades, definir fotos principales, configurarlas en el Hero / Inicio y editar publicaciones existentes.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Paso 1 */}
          <div className="bg-[#8b3dff] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: Módulo</span>
              <h3 className="text-xl font-bold mb-3">Nuevo o Editar Inmueble</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Ve a <strong>Inmuebles</strong> en el menú lateral. Para crear uno nuevo haz clic en el botón superior <strong>"Nuevo Inmueble"</strong>. Para modificar uno existente, haz clic en el ícono de lápiz (Editar) en la tabla.
              </p>
            </div>
            <div className="bg-[#b380ff] min-h-[220px] p-6 relative overflow-hidden flex items-center justify-center mt-auto">
              <div className="bg-surface p-4 rounded-2xl shadow-2xl w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">Inmuebles</span>
                  <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md text-[10px] font-bold animate-btn-press relative z-10">
                    <span className="material-symbols-outlined text-[12px]">add</span>
                    Nuevo Inmueble
                  </button>
                </div>
                <div className="flex items-center justify-between bg-surface-container p-2 rounded text-[10px] text-on-surface">
                  <span>Penthouse Pinares</span>
                  <span className="material-symbols-outlined text-primary text-[14px]">edit</span>
                </div>
                <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '20%', right: '15%'}}>👆🏽</div>
              </div>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="bg-[#ff6b6b] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Datos Clave</span>
              <h3 className="text-xl font-bold mb-3">Información Básica Exacta</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Diligencia: <strong>Título, Tipo de Operación</strong> (Venta/Arriendo), <strong>Tipo de Inmueble</strong> (Apartamento, Casa, Finca, Lote, Local), <strong>Precio</strong> (0 para consultar) y <strong>Ciudad</strong>.
              </p>
            </div>
            <div className="bg-[#ff9494] min-h-[240px] p-4 relative overflow-hidden flex flex-col justify-end mt-auto">
              <div className="bg-surface-container-lowest p-4 rounded-t-xl shadow-2xl w-full max-w-sm mx-auto border border-outline-variant/30 space-y-3">
                 <h3 className="font-headline-md text-primary text-[10px] border-b border-outline-variant/30 pb-1 font-bold">Información Básica</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 space-y-0.5">
                      <label className="text-[8px] text-secondary font-label-md">Título de la Publicación *</label>
                      <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[9px] text-on-surface">
                        <div className="animate-typing">Penthouse en Pinares</div>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[8px] text-secondary font-label-md">Tipo Operación *</label>
                      <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[8px] text-on-surface flex justify-between font-bold">
                        VENTA <span className="material-symbols-outlined text-[8px]">expand_more</span>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[8px] text-secondary font-label-md">Tipo Inmueble *</label>
                      <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[8px] text-on-surface flex justify-between">
                        Apartamento <span className="material-symbols-outlined text-[8px]">expand_more</span>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[8px] text-secondary font-label-md">Precio (COP)</label>
                      <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[8px] text-on-surface font-mono">
                        450000000
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[8px] text-secondary font-label-md">Ciudad *</label>
                      <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[8px] text-on-surface flex justify-between">
                        Pereira <span className="material-symbols-outlined text-[8px]">expand_more</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="bg-[#f07167] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Galería de Fotos</span>
              <h3 className="text-xl font-bold mb-3">Subir Fotos con el Cuadro (+)</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Usa el cuadro interactivo con el símbolo <strong>(+)</strong> (ubicado de primero o al lado de tus fotos) para cargar fotos desde tu equipo. Haz clic en <strong>"Hacer Principal"</strong> en la foto deseada para fijar la portada.
              </p>
            </div>
            <div className="bg-[#f4978e] min-h-[240px] p-4 relative overflow-hidden flex flex-col justify-end mt-auto">
              <div className="bg-surface-container-lowest p-4 rounded-t-xl shadow-2xl w-full max-w-sm mx-auto border border-outline-variant/30 space-y-3">
                 <h3 className="font-headline-md text-primary text-[10px] border-b border-outline-variant/30 pb-1 font-bold flex items-center gap-1">
                   <span className="material-symbols-outlined text-[12px]">photo_library</span> Galería de Fotos
                 </h3>
                 <div className="grid grid-cols-3 gap-2">
                    <div className="relative rounded overflow-hidden border border-primary h-14 bg-gray-200">
                      <span className="absolute top-0.5 left-0.5 bg-primary text-white text-[6px] font-bold px-1 rounded-full">Principal</span>
                    </div>
                    <div className="rounded border border-dashed border-primary/50 bg-primary/10 h-14 flex flex-col items-center justify-center text-primary cursor-pointer relative">
                      <span className="material-symbols-outlined text-sm">add</span>
                      <span className="text-[7px] font-bold">Agregar Foto</span>
                      <div className="absolute z-20 animate-cursor hidden md:block text-2xl" style={{top: '20%', right: '10%'}}>👆🏽</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="bg-[#2a9d8f] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 4: Características</span>
              <h3 className="text-xl font-bold mb-3">Detalles Técnicos y Archivos</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Ingresa Habitaciones, Baños, Parqueaderos, Área Construida (m²), Estrato y Administración. También puedes adjuntar un <strong>Video (.mp4)</strong> y un <strong>PDF (Brochure/Planos)</strong>.
              </p>
            </div>
            <div className="bg-[#48b3a5] min-h-[240px] p-4 relative overflow-hidden flex flex-col justify-end mt-auto">
              <div className="bg-surface-container-lowest p-4 rounded-t-xl shadow-2xl w-full max-w-sm mx-auto border border-outline-variant/30 space-y-2">
                 <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="bg-surface border rounded p-1"><span className="text-[7px] block text-gray-400">Hab.</span><span className="text-[9px] font-bold text-primary">3</span></div>
                    <div className="bg-surface border rounded p-1"><span className="text-[7px] block text-gray-400">Baños</span><span className="text-[9px] font-bold text-primary">2</span></div>
                    <div className="bg-surface border rounded p-1"><span className="text-[7px] block text-gray-400">Parq.</span><span className="text-[9px] font-bold text-primary">1</span></div>
                    <div className="bg-surface border rounded p-1"><span className="text-[7px] block text-gray-400">m²</span><span className="text-[9px] font-bold text-primary">120</span></div>
                 </div>
                 <div className="space-y-1 pt-1">
                   <span className="text-[8px] font-bold text-primary block">Adjuntos</span>
                   <div className="flex gap-2">
                     <div className="flex-1 bg-surface border rounded p-1 text-[7px] text-gray-600 flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">movie</span> Subir Video</div>
                     <div className="flex-1 bg-surface border rounded p-1 text-[7px] text-gray-600 flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">picture_as_pdf</span> Plano.pdf</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Paso 5: Destacados y Hero (EXPLICACIÓN EXPLICITA DE BOTÓN Y CASILLA) */}
          <div className="bg-[#7b2cbf] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl md:col-span-2 lg:col-span-2">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 5: Visibilidad en Portada / Hero</span>
              <h3 className="text-2xl font-bold mb-3">¿Cómo hacer que un Inmueble aparezca en el HERO de la Web?</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Para que una propiedad aparezca en la <strong>pantalla de bienvenida principal (Hero de la web)</strong> y en el carrusel de <strong>Propiedades Destacadas</strong>, debes dirigirte a la sección inferior del formulario llamada <strong>"Visibilidad en Secciones del Inicio"</strong> y hacer clic en la casilla <strong>"Destacar en Inicio (Hero / Carrusel Principal)"</strong>.
              </p>
            </div>
            <div className="bg-[#9d4edd] min-h-[220px] p-6 relative overflow-hidden flex flex-col justify-end mt-auto items-center">
              <div className="bg-surface w-full max-w-md p-4 rounded-xl shadow-2xl flex flex-col gap-3 border border-outline-variant/50">
                 <h4 className="font-headline-md text-primary text-xs border-b border-outline-variant/30 pb-2 flex items-center gap-1 font-bold">
                   <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span> Secciones de Inicio / Portada Hero
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-on-surface">
                   <label className="flex items-start gap-2 bg-primary/10 p-2.5 rounded-lg cursor-pointer border-2 border-primary/50 relative shadow-sm">
                     <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary accent-primary mt-0.5" />
                     <div>
                       <span className="text-[10px] font-bold text-primary block">Destacar en Inicio (Hero / Carrusel)</span>
                       <span className="text-[8px] text-gray-500 block leading-tight">Muestra el inmueble en la gran portada principal.</span>
                     </div>
                     <div className="absolute z-20 animate-precision-cursor text-3xl" style={{top: '10%', right: '5%'}}>👆🏽</div>
                   </label>
                   <label className="flex items-start gap-2 bg-surface-container p-2.5 rounded-lg cursor-pointer border border-outline-variant/30">
                     <input type="checkbox" className="w-4 h-4 rounded text-primary accent-primary mt-0.5" />
                     <div>
                       <span className="text-[10px] font-bold text-secondary block">Oportunidad de Inversión</span>
                       <span className="text-[8px] text-gray-500 block leading-tight">Muestra en la sección de alta rentabilidad.</span>
                     </div>
                   </label>
                 </div>
              </div>
            </div>
          </div>

          {/* Paso 6: Confirmación */}
          <div className="bg-[#9c27b0] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 6: Publicar</span>
              <h3 className="text-xl font-bold mb-3">Guardar y Publicar</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Al finalizar, haz clic en el botón azul <strong>"Guardar Inmueble"</strong> (o "Guardar Cambios" si estás editando). La propiedad quedará disponible en el catálogo y en el Hero al instante.
              </p>
            </div>
            <div className="bg-[#ba68c8] min-h-[220px] p-6 relative overflow-hidden flex flex-col items-center justify-center mt-auto gap-3">
              <button className="bg-primary text-on-primary font-bold py-3 px-8 rounded-lg flex items-center gap-2 shadow-lg animate-btn-press relative z-10 text-xs">
                  Guardar Inmueble
                  <span className="material-symbols-outlined text-xs">save</span>
              </button>
              <div className="absolute z-20 animate-cursor hidden md:block text-3xl" style={{top: '30%', left: '50%'}}>👆🏽</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 4: GUÍA COMPLETA DEL BLOG (CREACIÓN Y EDICIÓN REAL) */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">article</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">4. Guía Detallada del Blog: Crear y Editar Artículos</h2>
            <p className="text-sm text-on-surface-variant">Aprende a redactar artículos, subir imágenes de portada con el cuadro (+), guardarlos como borrador o publicarlos.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Paso 1 Blog */}
          <div className="bg-[#ff9f1c] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: Navegación</span>
              <h3 className="text-xl font-bold mb-3">Entrar al Módulo de Blog</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Haz clic en <strong>"Blog"</strong> en el menú lateral. Para crear una nueva publicación presiona <strong>"Nuevo Artículo"</strong>. Para modificar uno existente, haz clic en el ícono de lápiz en la tabla de blogs.
              </p>
            </div>
            <div className="bg-[#ffbf69] min-h-[220px] p-4 relative overflow-hidden flex items-center justify-center mt-auto">
               <div className="w-full bg-surface rounded-xl p-3 shadow-xl border border-outline-variant/30 relative">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-primary font-bold text-xs">Blog</span>
                   <button className="bg-primary text-on-primary text-[9px] px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold animate-btn-press">
                      <span className="material-symbols-outlined text-[10px]">add</span> Nuevo Artículo
                   </button>
                 </div>
                 <div className="flex justify-between items-center bg-surface-container p-2 rounded text-[9px] text-on-surface">
                   <span>Guía de Inversión en Pereira</span>
                   <span className="material-symbols-outlined text-primary text-[12px]">edit</span>
                 </div>
                 <div className="absolute z-20 animate-cursor hidden md:block text-3xl" style={{top: '15%', right: '15%'}}>👆🏽</div>
               </div>
            </div>
          </div>

          {/* Paso 2 Blog */}
          <div className="bg-[#e71d36] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Datos del Artículo</span>
              <h3 className="text-xl font-bold mb-3">Título, Slug, Categoría y Resumen</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Diligencia el <strong>Título</strong> (el Slug se genera automáticamente), la <strong>Categoría</strong> (ej: Trámites, Inversión) y un <strong>Resumen corto</strong> para las tarjetas de vista previa.
              </p>
            </div>
            <div className="bg-[#ff4d6d] min-h-[220px] p-4 relative overflow-hidden flex flex-col justify-end mt-auto">
               <div className="bg-surface-bright w-full max-w-[280px] mx-auto p-3 rounded-t-xl shadow-2xl flex flex-col gap-2 border border-outline-variant/50">
                  <div className="space-y-0.5">
                     <label className="text-[8px] font-label-md text-on-surface-variant block">Título *</label>
                     <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[8px] text-on-surface">
                       <div className="animate-typing">Las mejores zonas de Pereira</div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="space-y-0.5">
                       <label className="text-[7px] font-label-md text-on-surface-variant block">Slug (URL) *</label>
                       <div className="w-full bg-surface-container border border-outline-variant rounded p-1 text-[7px] text-gray-500">las-mejores-zonas</div>
                     </div>
                     <div className="space-y-0.5">
                       <label className="text-[7px] font-label-md text-on-surface-variant block">Categoría</label>
                       <div className="w-full bg-surface border border-outline-variant rounded p-1 text-[7px] text-on-surface">Inversión</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Paso 3 Blog */}
          <div className="bg-[#0077b6] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Imagen de Portada</span>
              <h3 className="text-xl font-bold mb-3">Subir Foto Principal con (+)</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                En la sección "Imagen Principal del Artículo", haz clic en la casilla con el botón <strong>(+)</strong> para subir la foto de portada. Podrás cambiarla o quitarla cuando lo requieras.
              </p>
            </div>
            <div className="bg-[#00b4d8] min-h-[220px] p-4 relative overflow-hidden flex flex-col items-center justify-center mt-auto">
               <div className="bg-surface w-full max-w-[240px] p-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/50">
                  <div className="w-20 h-16 rounded border-2 border-dashed border-primary/50 bg-primary/10 flex flex-col items-center justify-center text-primary cursor-pointer relative">
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span className="text-[7px] font-bold">Subir Foto</span>
                    <div className="absolute z-20 animate-cursor hidden md:block text-2xl" style={{top: '10%', right: '10%'}}>👆🏽</div>
                  </div>
                  <span className="text-[8px] text-gray-500">O ingresa un enlace URL de imagen</span>
               </div>
            </div>
          </div>

          {/* Paso 4 Blog */}
          <div className="bg-[#0096c7] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl md:col-span-2 lg:col-span-2">
            <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 4: Redacción del Contenido</span>
              <h3 className="text-xl font-bold mb-3">Cuerpo del Artículo y Formato</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                En el campo grande <strong>"Contenido"</strong>, escribe toda la información del artículo. Soporta texto enriquecido, subtítulos y saltos de línea para dar un formato atractivo a tus lectores.
              </p>
            </div>
            <div className="bg-[#48cae4] min-h-[200px] p-4 relative overflow-hidden flex flex-col justify-end mt-auto">
               <div className="bg-surface w-full max-w-md mx-auto p-3 rounded-t-xl shadow-2xl border border-outline-variant/50">
                  <label className="text-[8px] font-bold text-primary block mb-1">Contenido (Soporta Markdown / HTML Básico) *</label>
                  <div className="h-16 w-full bg-surface border border-outline-variant rounded p-2 text-[8px] text-on-surface leading-tight font-sans">
                     Pinares y Álamos son dos de las mejores zonas residenciales de Pereira por su cercanía a centros comerciales y clínicas...
                  </div>
               </div>
            </div>
          </div>

          {/* Paso 5 Blog */}
          <div className="bg-[#8b3dff] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 5: Publicación</span>
              <h3 className="text-xl font-bold mb-3">Publicar, Borrador o Eliminar</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Al pie del formulario encontrarás: <strong>"Guardar como Borrador"</strong> (para continuar luego) y <strong>"Publicar Ahora / Actualizar Publicación"</strong>. En modo edición también tendrás el botón rojo <strong>"Eliminar Artículo"</strong>.
              </p>
            </div>
            <div className="bg-[#b380ff] min-h-[200px] p-4 relative overflow-hidden flex items-center justify-center mt-auto">
               <div className="bg-surface w-full max-w-[260px] p-3 rounded-xl shadow-xl flex gap-2">
                  <button className="flex-1 bg-surface-container text-on-surface text-[8px] py-2 rounded font-bold border border-outline-variant">Borrador</button>
                  <button className="flex-1 bg-primary text-on-primary text-[8px] py-2 rounded font-bold shadow animate-btn-press relative z-10">Publicar Ahora</button>
                  <div className="absolute z-20 animate-cursor hidden md:block text-3xl" style={{top: '30%', right: '20%'}}>👆🏽</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 5: LEADS PROFUNDO (RENOVADO 6 PASOS) */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#0081a7]/10 flex items-center justify-center text-[#0081a7] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">person_search</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0081a7]">5. Gestión Integral de Leads</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Paso 1 Leads */}
           <div className="bg-[#2b2d42] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: Análisis</span>
               <h3 className="text-xl font-bold mb-3">Tarjetas KPI</h3>
               <p className="text-gray-300 leading-relaxed text-sm">
                 Al entrar, verás 3 tarjetas arriba. Éstas resumen tu base de datos: Total Leads, Nuevos (Sin Contacto) y Contactados. Te ayudan a medir tu gestión diaria.
               </p>
             </div>
             <div className="bg-[#8d99ae] min-h-[180px] p-4 relative flex flex-col justify-center mt-auto">
               <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 flex flex-col gap-1 w-full max-w-full max-w-[200px] mx-auto shadow-lg">
                  <div className="flex justify-between items-center text-[8px] text-on-surface-variant font-bold">
                    Nuevos (Sin Contacto) <span className="material-symbols-outlined text-error text-[12px]">priority_high</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">12</span>
               </div>
             </div>
           </div>

           {/* Paso 2 Leads (NUEVO Filtros) */}
           <div className="bg-[#8d99ae] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Herramientas</span>
               <h3 className="text-xl font-bold mb-3">Buscar y Filtrar</h3>
               <p className="text-gray-100 leading-relaxed text-sm">
                 Tienes una barra de búsqueda para encontrar clientes por nombre o teléfono, y un menú desplegable para filtrar por "Estado" (ej: ver solo los Cerrados).
               </p>
             </div>
             <div className="bg-[#edf2f4] min-h-[180px] p-4 relative flex flex-col items-center justify-center mt-auto gap-3">
                <div className="bg-surface w-full max-w-[220px] rounded-lg border border-outline-variant/50 p-2 flex items-center gap-2 shadow-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">search</span>
                  <span className="text-[9px]">Buscar por nombre...</span>
                </div>
                <div className="bg-surface-container-lowest w-full max-w-[220px] rounded-lg border border-outline-variant/50 p-2 flex items-center justify-between shadow-sm text-on-surface">
                  <span className="text-[9px] font-bold">Estado: Todos</span>
                  <span className="material-symbols-outlined text-[14px]">expand_more</span>
                </div>
             </div>
           </div>

           {/* Paso 3 Leads */}
           <div className="bg-[#f4a261] text-[#5c3a1a] rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Registro Manual</span>
               <h3 className="text-xl font-bold mb-3">El Botón "Nuevo Lead"</h3>
               <p className="text-[#5c3a1a]/80 leading-relaxed text-sm">
                 Junto a los filtros está el botón azul de "Nuevo Lead". Sirve para agregar manualmente a un cliente que te haya llamado o escrito directo a tu celular.
               </p>
             </div>
             <div className="bg-[#f4b684] min-h-[180px] p-4 relative flex flex-col items-center justify-center mt-auto">
                <button className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-btn-press relative z-10 text-xs border border-primary/20">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Nuevo Lead
                </button>
             </div>
           </div>

           {/* Paso 4 Leads */}
           <div className="bg-[#d90429] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl lg:col-span-3">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 4: La Tabla</span>
               <h3 className="text-2xl font-bold mb-3">La Bandeja Central de Leads</h3>
               <p className="text-gray-200 leading-relaxed text-sm max-w-4xl">
                 Aquí ves todos los leads ingresando. Las columnas importantes son <strong>Cliente</strong> (con sus iniciales), <strong>Contacto</strong> (con su número), <strong>Mensaje</strong> (una vista previa), y <strong>Estado</strong>. Si pasas el mouse por encima de una fila, aparecerán a la derecha los íconos de acciones (Ver, WhatsApp, Editar, Eliminar).
               </p>
             </div>
             <div className="bg-[#ef233c] min-h-[220px] p-6 relative flex items-center justify-center mt-auto overflow-hidden">
               <div className="bg-surface w-full max-w-3xl rounded-xl shadow-2xl border border-outline-variant/50 overflow-x-auto"><div className="min-w-[500px]">
                  <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant text-[8px] font-bold text-on-surface-variant flex justify-between uppercase">
                    <span className="w-1/4">Cliente</span>
                    <span className="w-1/4">Contacto</span>
                    <span className="w-1/4">Mensaje</span>
                    <span className="w-1/4">Estado & Acciones</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center bg-primary/5 relative z-10 border-b border-outline-variant/20 group">
                    <div className="w-1/4 flex gap-2 items-center">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-[10px] flex items-center justify-center font-bold text-on-secondary-container">JP</div>
                      <div className="flex flex-col"><span className="text-on-surface font-bold text-[10px]">Juan Pérez</span><span className="text-on-surface-variant text-[8px]">Hace 2 horas</span></div>
                    </div>
                    <div className="w-1/4 flex flex-col text-[8px] text-on-surface-variant gap-0.5">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">call</span> 315 123 4567</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">mail</span> juan@ej.com</span>
                    </div>
                    <div className="w-1/4 text-on-surface-variant text-[8px] italic truncate pr-4">
                      "Hola, quiero saber si..."
                    </div>
                    <div className="w-1/4 flex items-center justify-between">
                       <span className="bg-tertiary-container text-on-tertiary text-[8px] px-2 py-0.5 rounded-full font-bold">Nuevo</span>
                       <div className="flex gap-1">
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant bg-surface-container p-1 rounded">visibility</span>
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant bg-surface-container p-1 rounded">chat</span>
                       </div>
                    </div>
                  </div>
                  <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '50%', right: '15%'}}>👆🏽</div>
               </div>
               </div>
             </div>
           </div>

           {/* Paso 5 Leads (NUEVO Inline Edit) */}
           <div className="bg-[#6c757d] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 5: Gestión Rápida</span>
               <h3 className="text-xl font-bold mb-3">Cambio de Estado</h3>
               <p className="text-gray-200 leading-relaxed text-sm">
                 No necesitas abrir el Lead para cambiar su estado. Puedes darle clic directamente al botón del estado en la tabla (ej: "Nuevo") y cambiarlo a "Contactado".
               </p>
             </div>
             <div className="bg-[#adb5bd] min-h-[180px] p-4 relative flex flex-col items-center justify-center mt-auto">
               <div className="bg-surface rounded-xl shadow-lg p-4 flex flex-col gap-2 items-center border border-outline-variant/50">
                  <span className="bg-tertiary-container text-on-tertiary text-[10px] px-3 py-1 rounded-full font-bold cursor-pointer">Nuevo</span>
                  <span className="material-symbols-outlined text-on-surface-variant">arrow_downward</span>
                  <div className="bg-surface-container border border-primary rounded p-1 text-[9px] text-on-surface font-bold animate-popup">
                     <span className="block px-2 py-1 bg-primary text-on-primary rounded">Contactado</span>
                     <span className="block px-2 py-1">En Negociación</span>
                  </div>
               </div>
             </div>
           </div>

           {/* Paso 6 Leads */}
           <div className="bg-[#00b4d8] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl lg:col-span-2">
             <div className="p-8">
               <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 6: Detalle y Contacto</span>
               <h3 className="text-2xl font-bold mb-3">El Modal de Atención</h3>
               <p className="text-gray-100 leading-relaxed text-sm max-w-4xl">
                 Al dar clic en el ícono del "Ojo", se oscurece la pantalla y aparece toda la información completa. Aquí lees el mensaje entero y oprimes el <strong>botón verde de WhatsApp</strong> para que se abra tu app y le hables inmediatamente al cliente.
               </p>
             </div>
             <div className="bg-[#48cae4] min-h-[280px] p-6 relative flex items-center justify-center mt-auto overflow-hidden">
                <div className="bg-surface w-full max-w-[400px] rounded-2xl shadow-2xl p-6 relative z-10 border border-outline-variant/30 animate-popup">
                   <div className="flex justify-between items-start mb-4 border-b pb-2">
                     <div className="flex gap-3">
                       <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg">JP</div>
                       <div className="flex flex-col">
                          <span className="font-bold text-primary text-sm">Juan Pérez</span>
                          <span className="text-[9px] text-on-surface-variant">Hace 2 horas</span>
                       </div>
                     </div>
                     <span className="material-symbols-outlined text-on-surface-variant text-sm">close</span>
                   </div>
                   
                   <div className="bg-surface-container-low p-3 rounded mb-4 text-[10px] text-on-surface border border-outline-variant/30">
                       <span className="font-bold block mb-1 text-on-surface-variant">Mensaje Completo:</span>
                       "Hola Ivonne, quiero saber si este apartamento acepta créditos preaprobados del FNA."
                   </div>

                   <button className="w-full bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-md animate-btn-press">
                     <span className="material-symbols-outlined text-[18px]">chat</span> Enviar WhatsApp a Juan
                   </button>
                   <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '70%', left: '50%'}}>👆🏽</div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 6: AGENDA CALENDARIO & MODAL EXACTO (RENOVADO 6 PASOS) */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-16">
          <div className="w-14 h-14 rounded-2xl bg-[#006d77]/10 flex items-center justify-center text-[#006d77] shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl">event_available</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#006d77]">6. El Calendario de Visitas Real</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Paso 1 */}
          <div className="bg-[#006d77] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 1: El Mes</span>
              <h3 className="text-xl font-bold mb-3">La Cuadrícula Principal</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Tu calendario mensual ocupa el lado izquierdo de la pantalla. Los días con visitas agendadas mostrarán pequeños cuadros de colores con la hora y el nombre del cliente. El día de hoy está resaltado.
              </p>
            </div>
            <div className="bg-[#83c5be] min-h-[220px] p-4 relative overflow-hidden flex items-center justify-center mt-auto">
              <div className="bg-surface w-full max-w-[220px] rounded-lg shadow-2xl p-3">
                <div className="flex justify-between items-center mb-2 border-b border-outline-variant/30 pb-1">
                   <span className="text-[10px] font-bold text-primary">Agosto 2026</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[7px] text-center text-on-surface-variant font-bold mb-1">
                   <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                   <div className="bg-surface-container-lowest text-on-surface text-[8px] p-1 rounded border border-outline-variant/50">10</div>
                   <div className="bg-surface-bright text-primary-container text-[8px] p-1 rounded border-2 border-primary-container font-bold relative">
                      11
                      <div className="mt-1 bg-primary-container text-on-primary-container text-[5px] truncate rounded px-0.5">3pm María</div>
                   </div>
                   <div className="bg-surface-container-lowest text-on-surface text-[8px] p-1 rounded border border-outline-variant/50">12</div>
                </div>
              </div>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="bg-[#83c5be] text-[#006d77] rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 2: Navegación</span>
              <h3 className="text-xl font-bold mb-3">Cambiar de Mes</h3>
              <p className="text-[#006d77]/80 leading-relaxed text-sm">
                En la esquina superior derecha del calendario hay dos flechas. Usalas para avanzar o retroceder meses (ej: de Agosto a Septiembre).
              </p>
            </div>
            <div className="bg-[#b0d8d4] min-h-[220px] p-4 relative overflow-hidden flex items-center justify-center mt-auto gap-4">
               <div className="bg-surface px-4 py-2 rounded-lg shadow-md font-bold text-primary text-xs flex items-center gap-4">
                 Agosto 2026
                 <div className="flex gap-2">
                    <span className="material-symbols-outlined bg-surface-container rounded p-1 text-secondary cursor-pointer hover:bg-surface-container-high transition-colors">chevron_left</span>
                    <span className="material-symbols-outlined bg-surface-container rounded p-1 text-secondary cursor-pointer hover:bg-surface-container-high transition-colors animate-btn-press relative z-10">chevron_right</span>
                 </div>
               </div>
               <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '40%', right: '15%'}}>👆🏽</div>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="bg-[#2a9d8f] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 3: Panel Lateral</span>
              <h3 className="text-xl font-bold mb-3">Lista de Próximas</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Al lado derecho de tu calendario hay una lista visual con tus **Próximas Visitas**. Te muestra fecha, propiedad y cliente de forma rápida.
              </p>
            </div>
            <div className="bg-[#8abeb7] min-h-[220px] p-4 relative overflow-hidden flex flex-col justify-end mt-auto">
               <div className="bg-[rgba(239,246,237,0.9)] backdrop-blur-md rounded-xl p-3 shadow-2xl w-full max-w-[220px] mx-auto border border-outline-variant/30 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                     <div>
                       <span className="bg-surface-container text-on-surface-variant text-[6px] px-2 py-0.5 rounded-full font-bold">11 Ago, 3:00 PM</span>
                       <h3 className="text-primary font-bold text-[9px] mt-1">Visita para propiedad...</h3>
                       <p className="text-[7px] text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[8px]">person</span> María G.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="bg-[#e9c46a] text-[#5c490a] rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 4: Acciones Directas</span>
              <h3 className="text-xl font-bold mb-3">Estado y WhatsApp</h3>
              <p className="text-[#5c490a]/80 leading-relaxed text-sm">
                En esa misma lista lateral, verás si la visita está "Confirmada" o "Pendiente", y tendrás un botón verde para enviarles un <strong>Recordatorio por WhatsApp</strong>.
              </p>
            </div>
            <div className="bg-[#f4e285] min-h-[220px] p-4 relative flex flex-col items-center justify-center mt-auto">
               <div className="bg-surface p-3 rounded-lg shadow-xl w-full max-w-[220px] flex flex-col gap-2 border border-outline-variant/30">
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-bold text-on-surface">Estado actual:</span>
                     <span className="bg-tertiary-container/20 border-tertiary-container border text-tertiary-container text-[8px] px-2 py-1 rounded-full font-bold">Pendiente</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                     <button className="flex-1 bg-surface-container text-secondary text-[8px] py-1.5 rounded flex items-center justify-center gap-1 font-bold">
                       Detalles
                     </button>
                     <button className="flex-1 bg-[#25D366]/10 text-[#075E54] text-[8px] py-1.5 rounded flex items-center justify-center gap-1 font-bold animate-btn-press relative z-10">
                       <span className="material-symbols-outlined text-[10px]">chat</span> Recordar
                     </button>
                  </div>
                  <div className="absolute z-20 animate-cursor hidden md:block text-4xl" style={{top: '60%', right: '25%'}}>👆🏽</div>
               </div>
            </div>
          </div>

          {/* Paso 5 */}
          <div className="bg-[#f4a261] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 5: Agendar</span>
              <h3 className="text-xl font-bold mb-3">Crear Visita</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                En la parte superior de la página, encontrarás el botón principal para registrar una visita de un cliente que quiera conocer un inmueble.
              </p>
            </div>
            <div className="bg-[#f8c59c] min-h-[220px] p-6 relative overflow-hidden flex flex-col items-center justify-center mt-auto">
              <button className="bg-primary-container text-on-primary-container font-bold px-6 py-4 rounded-full shadow-lg flex items-center gap-2 animate-btn-press relative z-10 text-sm border border-primary/20">
                <span className="material-symbols-outlined text-lg">event_available</span>
                Agendar Nueva Visita
              </button>
            </div>
          </div>

          {/* Paso 6 */}
          <div className="bg-[#e76f51] text-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-8">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2 block">Paso 6: El Formulario</span>
              <h3 className="text-xl font-bold mb-3">Llenar los Datos</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Este Modal oscuro te pedirá: <strong>Nombre, Correo, Teléfono, Fecha y Hora</strong>. Opcionalmente, puedes escribir el ID de la propiedad que van a ver.
              </p>
            </div>
            <div className="bg-[#ee9b83] min-h-[220px] p-4 relative overflow-hidden flex items-center justify-center mt-auto">
               <div className="bg-surface-container-lowest p-4 rounded-xl shadow-2xl w-full max-w-[240px] border border-outline-variant/30 space-y-2 relative z-10">
                 <h2 className="font-headline-md text-primary text-[10px] mb-2 border-b border-outline-variant/30 pb-1">Agendar Nueva Visita</h2>
                 <div className="space-y-1">
                   <label className="block text-[7px] font-label-md text-on-surface">Nombre del Cliente *</label>
                   <div className="w-full border border-outline-variant rounded p-1 text-[7px] text-on-surface bg-white"><div className="animate-typing">Carlos Ramírez</div></div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div className="space-y-1">
                     <label className="block text-[7px] font-label-md text-on-surface">Fecha *</label>
                     <div className="w-full border border-outline-variant rounded p-1 text-[7px] text-on-surface bg-surface-container">15/08/2026</div>
                   </div>
                   <div className="space-y-1">
                     <label className="block text-[7px] font-label-md text-on-surface">Hora *</label>
                     <div className="w-full border border-outline-variant rounded p-1 text-[7px] text-on-surface bg-surface-container">15:00</div>
                   </div>
                 </div>
                 <div className="flex justify-end pt-1 mt-1 border-t border-outline-variant/30">
                    <button className="bg-primary text-on-primary px-3 py-1 rounded text-[7px] font-bold">Guardar Visita</button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
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
      </section>

      {/* FOOTER SUPPORT */}
      <div className="mt-24 bg-surface-container rounded-3xl p-12 text-center shadow-lg border border-outline-variant/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
        <span className="material-symbols-outlined text-6xl text-primary mb-4 block animate-bounce">support_agent</span>
        <h3 className="text-2xl md:text-3xl font-headline-md text-on-surface mb-4">¿Necesitas ayuda adicional?</h3>
        <p className="text-on-surface-variant mb-8 max-w-2xl mx-auto text-lg">
          Este manual detallado y realista cubre el 95% de las funciones diarias. Si requieres asistencia en vivo o reportar una falla, el equipo de soporte técnico está disponible.
        </p>
        <a href="https://wa.me/573000000000?text=Hola,%20necesito%20soporte%20urgente%20con%20el%20panel" target="_blank" rel="noopener noreferrer">
          <button className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 mx-auto text-lg">
            <span className="material-symbols-outlined text-xl">chat</span>
            Contactar Soporte Técnico (WhatsApp)
          </button>
        </a>
      </div>

    </div>
  );
}
