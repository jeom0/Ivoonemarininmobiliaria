"use client";

import { useState } from "react";

export default function ArrendarForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    city: "",
    area: "",
    price: "",
    comments: "",
  });
  
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("LOADING");
    setErrorMessage("");
    
    const message = `Tipo: ${formData.propertyType}\nCiudad: ${formData.city}\nÁrea: ${formData.area} m²\nCanon Sugerido: ${formData.price}\nComentarios: ${formData.comments}`;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "RENT",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("SUCCESS");
      setFormData({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
        city: "",
        area: "",
        price: "",
        comments: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
      setErrorMessage("Ocurrió un error al enviar tu solicitud. Intenta de nuevo.");
    }
  };

  if (status === "SUCCESS") {
    return (
      <div className="bg-primary-container/20 border border-primary-container p-8 rounded-xl text-center">
        <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl">check</span>
        </div>
        <h4 className="font-headline-md text-primary mb-2">¡Solicitud Enviada!</h4>
        <p className="text-on-surface-variant font-body-md">
          Hemos recibido los detalles de tu propiedad para arrendar. Un asesor se comunicará contigo en menos de 24 horas.
        </p>
        <button 
          onClick={() => setStatus("IDLE")} 
          className="mt-6 text-primary font-label-md hover:underline"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === "ERROR" && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg font-body-md text-[14px]">
          {errorMessage}
        </div>
      )}
      
      <div>
        <h4 className="font-label-md text-label-md text-primary mb-4 border-b border-outline-variant/30 pb-2">Información del Propietario</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Nombre Completo *</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              placeholder="Ej. Juan Pérez" 
              type="text"
            />
          </div>
          <div>
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Teléfono Móvil *</label>
            <input 
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              placeholder="Ej. 300 123 4567" 
              type="tel"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Correo Electrónico *</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              placeholder="su@correo.com" 
              type="email"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-label-md text-label-md text-primary mb-4 border-b border-outline-variant/30 pb-2 mt-8">Detalles Básicos del Inmueble</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Tipo de Inmueble *</label>
            <select 
              required
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
            >
              <option value="">Seleccione...</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="lote">Lote / Terreno</option>
              <option value="finca">Finca</option>
              <option value="local">Local Comercial</option>
            </select>
          </div>
          <div>
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Ciudad / Municipio *</label>
            <input 
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              placeholder="Ej. Pereira" 
              type="text"
            />
          </div>
          <div>
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Área Estimada (m²)</label>
            <input 
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              type="number"
            />
          </div>
          <div>
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Canon Sugerido (COP)</label>
            <input 
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              placeholder="$" 
              type="text"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-label-md text-[13px] text-on-surface-variant mb-1">Comentarios Adicionales</label>
            <textarea 
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/50" 
              placeholder="Cuéntenos si tiene amoblamiento, restricciones, o características especiales..." 
              rows={3}
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <label className="flex items-start gap-2 cursor-pointer">
          <input required className="mt-1 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
          <span className="font-body-md text-[13px] text-on-surface-variant leading-tight">Acepto la <a className="underline text-primary" href="#">política de tratamiento de datos personales</a>.</span>
        </label>
        <button 
          disabled={status === "LOADING"}
          className="w-full md:w-auto font-label-md text-label-md bg-primary text-on-primary px-8 py-3.5 rounded-lg hover:bg-surface-tint transition-all ambient-shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
          type="submit"
        >
          {status === "LOADING" ? "Enviando..." : "Enviar Solicitud"}
          {status !== "LOADING" && <span className="material-symbols-outlined text-[18px]">send</span>}
        </button>
      </div>
    </form>
  );
}
