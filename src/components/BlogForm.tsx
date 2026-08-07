"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@prisma/client";

interface BlogFormProps {
  initialData?: BlogPost;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    mainImage: "",
    category: "",
    status: "DRAFT",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        summary: initialData.summary || "",
        content: initialData.content || "",
        mainImage: initialData.mainImage || "",
        category: initialData.category || "",
        status: initialData.status || "DRAFT",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug from title if we are creating new and user hasn't typed in slug manually
      if (name === "title" && !initialData) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = initialData ? `/api/blog/${initialData.id}` : "/api/blog";
      const method = initialData ? "PUT" : "POST";
      
      let finalMainImage = formData.mainImage;
      
      // Handle file upload if present
      const formElement = e.currentTarget as HTMLFormElement;
      const fileInput = formElement.querySelector('input[name="mainImageFile"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
        if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            finalMainImage = uploadData.url;
        }
      }

      const payload = { ...formData, mainImage: finalMainImage };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = "Ocurrió un error al guardar el artículo.";
        try {
          const errorData = await res.json();
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {}
        throw new Error(errorMessage);
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al guardar el artículo.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg font-body-md">
          {error}
        </div>
      )}

      <div className="bg-surface-bright rounded-xl border border-outline-variant/50 p-6 space-y-4">
        <h2 className="font-headline-sm text-primary mb-4">Información Básica</h2>
        
        <div>
          <label className="block font-label-md text-on-surface-variant mb-1">Título *</label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-md text-on-surface-variant mb-1">Slug (URL) *</label>
            <input
              required
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
              type="text"
            />
          </div>
          <div>
            <label className="block font-label-md text-on-surface-variant mb-1">Categoría</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
              type="text"
              placeholder="Ej. Inversión, Trámites..."
            />
          </div>
        </div>

        <div>
          <label className="block font-label-md text-on-surface-variant mb-1">Resumen (Para tarjetas y SEO)</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
            rows={2}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-md text-on-surface-variant mb-1">Subir Imagen Principal</label>
            <input
              name="mainImageFile"
              type="file"
              accept="image/*"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block font-label-md text-on-surface-variant mb-1">O usar URL de Imagen</label>
            <input
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
              type="url"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-bright rounded-xl border border-outline-variant/50 p-6 space-y-4">
        <h2 className="font-headline-sm text-primary mb-4">Contenido</h2>
        <div>
          <label className="block font-label-md text-on-surface-variant mb-1">Contenido (Soporta Markdown / HTML Básico) *</label>
          <textarea
            required
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
            rows={15}
          ></textarea>
        </div>
      </div>

      <div className="bg-surface-bright rounded-xl border border-outline-variant/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="font-label-md text-on-surface-variant">Estado:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none"
          >
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicado</option>
          </select>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="w-full md:w-auto px-6 py-2 border border-outline-variant rounded-lg font-label-md hover:bg-surface-container transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-surface-tint transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Artículo"}
          </button>
        </div>
      </div>
    </form>
  );
}
