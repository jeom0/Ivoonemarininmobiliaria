"use client";

import { useState } from "react";
import Link from "next/link";

interface PropertyLeadFormProps {
  propertyId: string;
  propertyCode: string;
  propertyName: string;
}

export default function PropertyLeadForm({ propertyId, propertyCode, propertyName }: PropertyLeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
      type: "CONTACT", // It's a general contact lead, could be VISIT later
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

  return (
    <div className="bg-surface border border-outline-variant/50 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary p-0.5">
          <img
            className="w-full h-full object-cover rounded-full"
            alt="Ivonne Marin"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgZcfdPi_n0TAneC3N3wNfETdI8oO_G8QIPcsWa34_-98wnMr-m5RZQHICFsdciNAf2VLZZL3RkumToH7vrXWuozf0hInLZaGyF6lGXKOYDqmSjwITTmLqO7oLzDv_NqBTEzGBIEC-293iwhGjLJ6l22s1Hh9BxY-bjG8CudzkuWoKZkN2746Z-94jtta0xzNY9iv7o2Y7c-mWcOqmJCUpbG7QFOIoHu_kpCloGebH6kRR3hPJAX2d6QR6g-LUlCdd1kSrRt6Qj0w"
          />
        </div>
        <div>
          <h4 className="font-headline-md text-[18px] text-primary">Ivonne Marin</h4>
          <p className="text-on-surface-variant font-label-md text-[12px]">Asesora Inmobiliaria</p>
        </div>
      </div>

      {success ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center mb-4">
          <span className="material-symbols-outlined block mb-2 text-3xl">check_circle</span>
          <p className="font-bold">¡Solicitud enviada!</p>
          <p className="text-sm">Ivonne se pondrá en contacto contigo pronto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-error text-sm font-bold bg-error-container p-2 rounded">{error}</div>}
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">Nombre completo</label>
            <input
              name="name"
              required
              className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary"
              placeholder="Ej. Juan Perez"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">Correo electrónico</label>
            <input
              name="email"
              required
              className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary"
              placeholder="email@ejemplo.com"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">WhatsApp / Teléfono</label>
            <input
              name="phone"
              required
              className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary"
              placeholder="+57 300 000 0000"
              type="tel"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[12px] text-on-surface-variant">Mensaje</label>
            <textarea
              name="message"
              required
              className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary"
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
        <Link
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-secondary text-primary font-label-md rounded-xl hover:bg-secondary-fixed transition-colors"
          href="/admin/agenda"
        >
          <span className="material-symbols-outlined">calendar_month</span> Agendar Visita
        </Link>
        <a
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-label-md rounded-xl hover:opacity-90 transition-opacity"
          href={`https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20${propertyName}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="material-symbols-outlined">chat</span> WhatsApp Directo
        </a>
      </div>
    </div>
  );
}
