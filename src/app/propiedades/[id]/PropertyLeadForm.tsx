"use client";

import { useState, useEffect } from "react";

interface PropertyLeadFormProps {
  propertyId: string;
  propertyCode: string;
  propertyName: string;
  agentImage?: string;
  whatsappNumber?: string;
}

export default function PropertyLeadForm({ propertyId, propertyCode, propertyName, agentImage, whatsappNumber }: PropertyLeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  
  const [propertyUrl, setPropertyUrl] = useState("");
  
  useEffect(() => {
    setPropertyUrl(window.location.href);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      type: "CONTACT",
      propertyId: propertyId,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAppointmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppointmentLoading(true);
    setAppointmentSuccess(false);

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!date || !time || !name || !email || !phone) {
      alert("Por favor, completa todos los campos requeridos.");
      setAppointmentLoading(false);
      return;
    }

    const message = `Desea agendar visita el día ${date} a las ${time}. ${(formData.get("message") as string) || ""}`;
    
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: message,
      type: "VISIT",
      propertyId: propertyId,
      scheduledDate: date && time ? new Date(`${date}T${time}`).toISOString() : undefined
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error");

      setAppointmentSuccess(true);
      setTimeout(() => {
        setShowAppointmentModal(false);
        setAppointmentSuccess(false);
      }, 3000);
    } catch (err: any) {
      alert("Ocurrió un error al agendar la cita.");
    } finally {
      setAppointmentLoading(false);
    }
  };

  const whatsappMessage = `🏡 *${propertyName}* (Cód: IM-${propertyCode})\n🔗 ${propertyUrl}\n\nHola, me gustaría recibir más información o 📅 agendar una cita.`;

  return (
    <div className="bg-surface border border-outline-variant/50 rounded-2xl p-8 shadow-sm relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary p-0.5">
          <img
            className="w-full h-full object-cover rounded-full"
            alt="Agente"
            src={agentImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBgZcfdPi_n0TAneC3N3wNfETdI8oO_G8QIPcsWa34_-98wnMr-m5RZQHICFsdciNAf2VLZZL3RkumToH7vrXWuozf0hInLZaGyF6lGXKOYDqmSjwITTmLqO7oLzDv_NqBTEzGBIEC-293iwhGjLJ6l22s1Hh9BxY-bjG8CudzkuWoKZkN2746Z-94jtta0xzNY9iv7o2Y7c-mWcOqmJCUpbG7QFOIoHu_kpCloGebH6kRR3hPJAX2d6QR6g-LUlCdd1kSrRt6Qj0w"}
          />
        </div>
        <div>
          <h4 className="font-headline-md text-[18px] text-primary">Asesor Inmobiliario</h4>
          <p className="text-on-surface-variant font-label-md text-[12px]">Contacto Directo</p>
        </div>
      </div>

      {success ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center mb-4">
          <span className="material-symbols-outlined block mb-2 text-3xl">check_circle</span>
          <p className="font-bold">¡Solicitud enviada!</p>
          <p className="text-sm">Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-error text-sm font-bold bg-error-container p-2 rounded">{error}</div>}
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">Nombre completo</label>
            <input
              name="name"
              required
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary focus:outline-none"
              placeholder="Ej. Juan Perez"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">Correo electrónico</label>
            <input
              name="email"
              required
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary focus:outline-none"
              placeholder="email@ejemplo.com"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">WhatsApp / Teléfono</label>
            <input
              name="phone"
              required
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary focus:outline-none"
              placeholder="+57 300 000 0000"
              type="tel"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">Mensaje</label>
            <textarea
              name="message"
              required
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary focus:outline-none"
              rows={4}
              defaultValue={`Hola, estoy interesado en ${propertyName} (Cód: IM-${propertyCode}). ¿Podrían darme más información?`}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-primary text-on-primary font-headline-md text-[16px] rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </button>
        </form>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setShowAppointmentModal(true)}
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-secondary text-primary font-label-md rounded-xl hover:bg-secondary-fixed transition-colors"
        >
          <span className="material-symbols-outlined">calendar_month</span> Agendar Visita
        </button>
        <a
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-label-md rounded-xl hover:opacity-90 transition-opacity"
          href={`https://wa.me/${whatsappNumber?.replace(/[^0-9]/g, '') || '573000000000'}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="material-symbols-outlined">chat</span> WhatsApp Directo
        </a>
      </div>
      
      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-md rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAppointmentModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface bg-surface-container rounded-full w-8 h-8 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <h3 className="text-xl font-headline-md text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">event</span> Agendar Visita
            </h3>
            <p className="text-on-surface-variant text-sm mb-6">Selecciona el día y la hora para visitar {propertyName}.</p>
            
            {appointmentSuccess ? (
              <div className="p-6 bg-green-100 text-green-800 rounded-xl text-center">
                <span className="material-symbols-outlined block mb-2 text-4xl">check_circle</span>
                <p className="font-bold text-lg">¡Visita Agendada!</p>
                <p className="text-sm">Revisaremos la disponibilidad y te confirmaremos en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-[12px] text-on-surface-variant">Día sugerido *</label>
                    <input name="date" type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-[12px] text-on-surface-variant">Hora sugerida *</label>
                    <input name="time" type="time" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-[12px] text-on-surface-variant">Nombre completo *</label>
                  <input name="name" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary outline-none" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-[12px] text-on-surface-variant">Teléfono / WhatsApp *</label>
                  <input name="phone" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary outline-none" type="tel" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-[12px] text-on-surface-variant">Correo *</label>
                  <input name="email" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary outline-none" type="email" />
                </div>
                <button
                  disabled={appointmentLoading}
                  type="submit"
                  className="w-full py-4 mt-2 bg-primary text-on-primary font-headline-md rounded-xl hover:opacity-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {appointmentLoading ? "Agendando..." : "Confirmar Visita"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
