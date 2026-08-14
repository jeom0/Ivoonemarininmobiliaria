"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
};

type Property = {
  id: string;
  title: string;
  price: number;
  currency: string;
  mainImage: string | null;
};

type Appointment = {
  id: string;
  leadId: string;
  propertyId: string | null;
  date: string;
  coverImage: string | null;
  status: string;
  createdAt: string;
  lead: Lead;
  property?: { title: string, mainImage: string | null } | null;
};

interface AgendaCalendarProps {
  initialAppointments: Appointment[];
  leads: Lead[];
  properties: Property[];
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const DEFAULT_TEXTURES = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80"
];

export default function AgendaCalendar({ initialAppointments, leads, properties }: AgendaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [coverImage, setCoverImage] = useState(DEFAULT_TEXTURES[0]);
  const [saving, setSaving] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar Math
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Adjust for Monday start (0=Mon, 6=Sun)
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  const remainingCells = (days.length % 7 === 0) ? 0 : 7 - (days.length % 7);
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  }

  const getAppointmentsForDate = (dateObj: Date) => {
    return initialAppointments.filter(a => {
      const aDate = new Date(a.date);
      return aDate.getDate() === dateObj.getDate() &&
             aDate.getMonth() === dateObj.getMonth() &&
             aDate.getFullYear() === dateObj.getFullYear();
    });
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setCoverImage(data.url);
      } else {
        alert("Error al subir portada");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red");
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) {
      alert("Por favor selecciona un Lead.");
      return;
    }
    
    setSaving(true);
    try {
      const scheduledDate = new Date(`${date}T${time}`);
      
      const payload = {
        leadId,
        propertyId: propertyId || undefined,
        date: scheduledDate.toISOString(),
        coverImage
      };

      const res = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setLeadId('');
        setPropertyId('');
        setDate('');
        setTime('');
        setCoverImage(DEFAULT_TEXTURES[0]);
        router.refresh(); 
      } else {
        alert("Error al agendar cita");
      }
    } catch (err) {
      alert("Error de red");
    } finally {
      setSaving(false);
    }
  };

  const selectedProperty = useMemo(() => properties.find(p => p.id === propertyId), [propertyId, properties]);
  const selectedLead = useMemo(() => leads.find(l => l.id === leadId), [leadId, leads]);

  return (
    <>
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary">Agenda de Citas</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Gestiona tus recorridos, eventos y reuniones con clientes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-3 rounded-full hover:opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">event_available</span>
          Agendar Nueva Cita
        </button>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
        {/* Calendar Section */}
        <section className="lg:col-span-7 bg-surface rounded-xl p-8 border border-secondary-fixed-dim/30 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-primary capitalize">
            {MONTH_NAMES[month]} {year}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-lg border border-secondary-fixed-dim/50 text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-lg border border-secondary-fixed-dim/50 text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
            <div key={d} className="text-center font-label-md text-label-md text-on-surface-variant">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {days.map((dayObj, idx) => {
            const dayAppts = getAppointmentsForDate(dayObj.date);
            const isToday = dayObj.date.toDateString() === new Date().toDateString();

            return (
              <div 
                key={idx} 
                className={`h-24 p-2 rounded-lg relative overflow-y-auto ${
                  isToday 
                    ? 'border-2 border-primary-container bg-surface-bright shadow-sm text-primary-container font-bold' 
                    : dayObj.isCurrentMonth
                      ? 'border border-surface-variant bg-surface-container-lowest text-on-surface'
                      : 'border border-surface-variant bg-surface-container-lowest text-on-surface-variant opacity-50'
                }`}
              >
                <span className="block mb-1">{dayObj.date.getDate()}</span>
                {dayAppts.map((a, aIdx) => (
                  <div 
                    key={a.id} 
                    className={`mt-1 w-full text-xs rounded px-1 py-0.5 truncate cursor-pointer hover:opacity-80 flex items-center gap-1 ${
                      aIdx % 2 === 0 
                        ? 'bg-primary-container text-on-primary-container' 
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}
                    title={a.lead?.name || 'Cita'}
                  >
                    {a.lead?.avatar ? (
                      <img src={a.lead.avatar} className="w-3 h-3 rounded-full object-cover shrink-0" alt="avatar" />
                    ) : (
                       <div className="w-3 h-3 rounded-full bg-black/20 flex items-center justify-center text-[8px] font-bold shrink-0">{a.lead?.name?.substring(0, 1).toUpperCase()}</div>
                    )}
                    {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming List */}
      <section className="lg:col-span-5 flex flex-col gap-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-headline-md text-headline-md text-primary">Próximas Citas</h2>
        </div>
        {initialAppointments.length === 0 ? (
          <div className="p-6 bg-surface-container-low rounded-xl text-center text-on-surface-variant border border-outline-variant/30">
            No hay citas programadas.
          </div>
        ) : (
          initialAppointments.slice(0, 5).map((a) => {
            const isConfirmed = a.status === 'CONFIRMED';
            
            return (
              <div key={a.id} className="rounded-xl overflow-hidden shadow-sm flex flex-col relative border border-outline-variant/30 bg-surface">
                {a.coverImage && (
                  <div className="h-24 w-full relative">
                    <img src={a.coverImage} className="w-full h-full object-cover" alt="Portada" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-2 left-4 text-white font-label-md text-sm">
                      {new Date(a.date).toLocaleString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
                
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container border border-outline-variant shrink-0">
                        {a.lead?.avatar ? (
                          <img src={a.lead.avatar} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-primary">{a.lead?.name?.substring(0,2).toUpperCase()}</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-headline-md text-body-lg text-primary font-bold">{a.lead?.name}</h3>
                        <p className="font-body-md text-xs text-on-surface-variant">{a.lead?.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full border font-label-md text-[10px] uppercase ${
                      isConfirmed 
                        ? 'border-primary-container text-primary-container bg-primary-container/10' 
                        : 'border-tertiary-container text-tertiary-container bg-tertiary-container/10'
                    }`}>
                      {a.status === 'PENDING' ? 'Pendiente' : (a.status === 'CONFIRMED' ? 'Confirmada' : 'Cancelada')}
                    </span>
                  </div>

                  {a.property && (
                    <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                       {a.property.mainImage ? (
                         <img src={a.property.mainImage} className="w-10 h-10 rounded object-cover" />
                       ) : (
                         <div className="w-10 h-10 rounded bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center"><span className="material-symbols-outlined">home</span></div>
                       )}
                       <div>
                         <p className="font-label-md text-xs text-on-surface-variant">Propiedad de Interés</p>
                         <p className="font-bold text-primary text-sm line-clamp-1">{a.property.title}</p>
                       </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-1">
                    <a 
                      href={a.lead?.phone ? `https://wa.me/${a.lead.phone.replace(/[^0-9]/g, '')}?text=Hola ${a.lead.name}, te escribo para confirmar tu cita de las ${new Date(a.date).toLocaleTimeString()}.` : '#'} 
                      target="_blank"
                      className="flex-1 bg-[#25D366]/10 border border-[#25D366]/30 text-[#075E54] font-label-md text-xs py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span> Enviar Recordatorio
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Modal Agendar Cita */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="font-headline-md text-primary mb-6">Agendar Nuevo Evento / Cita</h2>
            
            <form onSubmit={handleCreateAppointment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Columna Izquierda */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-label-md text-on-surface mb-2">Seleccionar Cliente (Lead)</label>
                    <select required value={leadId} onChange={e => setLeadId(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface text-on-surface outline-none focus:border-primary">
                      <option value="" disabled>-- Elige un lead --</option>
                      {leads.map(l => (
                        <option key={l.id} value={l.id}>{l.name} - {l.email}</option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedLead && (
                     <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        {selectedLead.avatar ? (
                          <img src={selectedLead.avatar} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl">{selectedLead.name.substring(0,2).toUpperCase()}</div>
                        )}
                        <div>
                          <p className="font-bold text-primary">{selectedLead.name}</p>
                          <p className="text-xs text-on-surface-variant">{selectedLead.phone || selectedLead.email}</p>
                        </div>
                     </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-label-md text-on-surface mb-1">Fecha</label>
                      <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-label-md text-on-surface mb-1">Hora</label>
                      <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface outline-none focus:border-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-label-md text-on-surface mb-2">Propiedad (Opcional)</label>
                    <select value={propertyId} onChange={e => setPropertyId(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface text-on-surface outline-none focus:border-primary">
                      <option value="">-- Sin propiedad específica --</option>
                      {properties.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  {selectedProperty && (
                    <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
                       {selectedProperty.mainImage ? (
                         <img src={selectedProperty.mainImage} className="w-16 h-16 rounded object-cover" />
                       ) : (
                         <div className="w-16 h-16 rounded bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center"><span className="material-symbols-outlined">home</span></div>
                       )}
                       <div>
                         <p className="font-bold text-primary line-clamp-1">{selectedProperty.title}</p>
                         <p className="text-sm text-secondary font-label-md">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: selectedProperty.currency, maximumFractionDigits: 0 }).format(selectedProperty.price)}</p>
                       </div>
                    </div>
                  )}
                </div>

                {/* Columna Derecha (Portada) */}
                <div>
                   <label className="block text-sm font-label-md text-on-surface mb-2">Portada del Evento</label>
                   
                   <div className="w-full h-40 rounded-xl overflow-hidden bg-surface-container relative mb-4 border border-outline-variant/50 shadow-sm">
                      <img src={coverImage} className="w-full h-full object-cover" alt="Cover Preview" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                         <label className="bg-surface text-primary px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-surface-container transition-colors flex items-center gap-2">
                           <span className="material-symbols-outlined">upload</span>
                           Subir Personalizada
                           <input type="file" className="hidden" accept="image/*" onChange={handleUploadCover} />
                         </label>
                      </div>
                   </div>

                   <p className="text-xs font-label-md text-on-surface-variant mb-2">O elige una textura predeterminada:</p>
                   <div className="grid grid-cols-5 gap-2">
                     {DEFAULT_TEXTURES.map((texture, idx) => (
                       <button 
                         key={idx}
                         type="button"
                         onClick={() => setCoverImage(texture)}
                         className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${coverImage === texture ? 'border-primary ring-2 ring-primary/30 scale-105 shadow-md' : 'border-transparent hover:scale-105'}`}
                       >
                         <img src={texture} className="w-full h-full object-cover" />
                       </button>
                     ))}
                   </div>
                </div>

              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-outline-variant/30">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md">
                  Cancelar
                </button>
                <button type="submit" disabled={saving || !leadId || !date || !time} className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-label-md disabled:opacity-50 flex items-center gap-2">
                  <span className="material-symbols-outlined">save</span>
                  {saving ? 'Guardando...' : 'Guardar Evento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
