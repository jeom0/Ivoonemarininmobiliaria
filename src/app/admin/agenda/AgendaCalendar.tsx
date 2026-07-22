"use client";

import { useState } from "react";

type Visit = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  createdAt: string; // ISO string
};

interface AgendaCalendarProps {
  initialVisits: Visit[];
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function AgendaCalendar({ initialVisits }: AgendaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [propertyId, setPropertyId] = useState('');
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

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }

  // Next month leading days (fill grid up to 35 or 42 cells)
  const remainingCells = (days.length % 7 === 0) ? 0 : 7 - (days.length % 7);
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getVisitsForDate = (date: Date) => {
    return initialVisits.filter(v => {
      const vDate = new Date(v.createdAt);
      return vDate.getDate() === date.getDate() &&
             vDate.getMonth() === date.getMonth() &&
             vDate.getFullYear() === date.getFullYear();
    });
  };

  const handleCreateVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Create a date object from the input date and time
      const scheduledDate = new Date(`${date}T${time}`);
      
      const payload = {
        type: 'VISIT',
        name,
        email,
        phone,
        message: propertyId ? `Visita para propiedad ID: ${propertyId}` : 'Visita General',
        propertyId: propertyId || undefined,
        createdAt: scheduledDate.toISOString() // We hack createdAt as the scheduled date for simplicity in this MVP
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        window.location.reload(); // Refresh to get new server data
      } else {
        alert("Error al agendar visita");
      }
    } catch (err) {
      alert("Error de red");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary">Agenda de Visitas</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Gestiona tus recorridos y reuniones con clientes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-3 rounded-full hover:opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">event_available</span>
          Agendar Nueva Visita
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
            <button onClick={handlePrevMonth} className="p-2 rounded-lg border border-secondary-fixed-dim/50 text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={handleNextMonth} className="p-2 rounded-lg border border-secondary-fixed-dim/50 text-secondary hover:bg-surface-container transition-colors">
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
            const dayVisits = getVisitsForDate(dayObj.date);
            const isToday = dayObj.date.toDateString() === new Date().toDateString();

            return (
              <div 
                key={idx} 
                className={`h-24 p-2 rounded-lg relative overflow-y-auto \${
                  isToday 
                    ? 'border-2 border-primary-container bg-surface-bright shadow-sm text-primary-container font-bold' 
                    : dayObj.isCurrentMonth
                      ? 'border border-surface-variant bg-surface-container-lowest text-on-surface'
                      : 'border border-surface-variant bg-surface-container-lowest text-on-surface-variant opacity-50'
                }`}
              >
                <span className="block mb-1">{dayObj.date.getDate()}</span>
                {dayVisits.map((v, vIdx) => (
                  <div 
                    key={v.id} 
                    className={`mt-1 w-full text-xs rounded px-1 py-0.5 truncate cursor-pointer hover:opacity-80 \${
                      vIdx % 2 === 0 
                        ? 'bg-primary-container text-on-primary-container' 
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}
                    title={v.name}
                  >
                    {new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {v.name.split(' ')[0]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Visits List */}
      <section className="lg:col-span-5 flex flex-col gap-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-headline-md text-headline-md text-primary">Próximas Visitas</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Agendar
          </button>
        </div>
        {initialVisits.length === 0 ? (
          <div className="p-6 bg-surface-container-low rounded-xl text-center text-on-surface-variant border border-outline-variant/30">
            No hay visitas programadas.
          </div>
        ) : (
          initialVisits.slice(0, 5).map((v, idx) => {
            const isConfirmed = v.status !== 'NEW';
            
            return (
              <div key={v.id} className="bg-[rgba(239,246,237,0.7)] backdrop-blur-md border border-[rgba(232,195,158,0.3)] rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-xs mb-2">
                      {new Date(v.createdAt).toLocaleString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <h3 className="font-headline-md text-body-lg text-primary font-bold">{v.message?.substring(0, 30) || 'Visita General'}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">person</span> {v.name}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full border font-label-md text-xs \${
                    isConfirmed 
                      ? 'border-primary-container text-primary-container bg-primary-container/10' 
                      : 'border-tertiary-container text-tertiary-container bg-tertiary-container/10'
                  }`}>
                    {isConfirmed ? 'Confirmada' : 'Pendiente'}
                  </span>
                </div>
                <div className="flex gap-3 mt-2">
                  <button className="flex-1 bg-surface-container border border-secondary-fixed-dim/50 text-secondary font-label-md text-label-md py-2 rounded-lg hover:bg-surface-container-high transition-colors flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-sm">info</span> Detalles
                  </button>
                  <a 
                    href={v.phone ? `https://wa.me/\${v.phone.replace(/[^0-9]/g, '')}?text=Hola \${v.name}, te escribo para confirmar tu visita.` : '#'} 
                    target="_blank"
                    className="flex-1 bg-[#25D366]/10 border border-[#25D366]/30 text-[#075E54] font-label-md text-label-md py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span> Recordatorio
                  </a>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Modal Agendar Visita */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-8 max-w-md w-full">
            <h2 className="font-headline-md text-primary mb-6">Agendar Nueva Visita</h2>
            
            <form onSubmit={handleCreateVisit} className="space-y-4">
              <div>
                <label className="block text-sm font-label-md text-on-surface mb-1">Nombre del Cliente</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label-md text-on-surface mb-1">Correo</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface mb-1">Teléfono</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label-md text-on-surface mb-1">Fecha</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface mb-1">Hora</label>
                  <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-label-md text-on-surface mb-1">ID Propiedad (Opcional)</label>
                <input type="text" value={propertyId} onChange={e => setPropertyId(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" placeholder="Dejar en blanco para consulta general" />
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-outline-variant/30">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  {saving ? 'Agendando...' : 'Guardar Visita'}
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
