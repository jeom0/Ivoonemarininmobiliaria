"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@prisma/client";
import imageCompression from "browser-image-compression";

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
  const [uploadingImage, setUploadingImage] = useState(false);
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

  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    setError("");
    const originalFile = e.target.files[0];
    let file = originalFile;
    try {
      file = await imageCompression(originalFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
    } catch (err) {
      console.error("Error compressing image", err);
    }
    const uploadFormData = new FormData();
    uploadFormData.append("file", file, originalFile.name);
    try {
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        setFormData(prev => ({ ...prev, mainImage: uploadData.url }));
      } else {
        setError("Error al subir la imagen. Por favor intenta con otra.");
      }
    } catch (err: any) {
      console.error("Error uploading image", err);
      setError("Error de red al subir la imagen.");
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleAction = async (actionStatus: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = initialData ? `/api/blog/${initialData.id}` : "/api/blog";
      const method = initialData ? "PUT" : "POST";
      
      let finalMainImage = formData.mainImage;
      
      // Handle file upload if present
      const fileInput = document.querySelector('input[name="mainImageFile"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        let file = fileInput.files[0];
        try {
          file = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
        } catch (e) {}
        const uploadFormData = new FormData();
        uploadFormData.append("file", file, file.name);
        
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
        if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            finalMainImage = uploadData.url;
        }
      }

      const payload = { ...formData, mainImage: finalMainImage, status: actionStatus };

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

  const handleDelete = async () => {
    if (!initialData) return;
    if (!confirm("¿Estás seguro de que deseas eliminar este artículo permanentemente?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${initialData.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        throw new Error("Error al eliminar");
      }
    } catch(err) {
      alert("Error al eliminar el artículo");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => handleAction("PUBLISHED", e)} className="space-y-6 max-w-4xl">
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

        <div>
          <label className="block font-label-md text-on-surface-variant mb-2">Imagen Principal del Artículo</label>
          <div className="flex flex-wrap gap-4 items-center mb-4">
            {formData.mainImage && (
              <div className="relative group rounded-xl overflow-hidden border-2 border-primary/50 shadow-sm w-40 h-32">
                <img src={formData.mainImage} alt="Portada" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mainImage: "" }))}
                    className="bg-error/90 text-white p-1.5 rounded-full hover:bg-error transition-colors"
                    title="Quitar foto"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            )}

            {/* Cuadro interactivo con icono + */}
            <div className="relative group rounded-xl border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center justify-center p-4 cursor-pointer w-40 h-32 text-center">
              <input
                type="file"
                accept="image/*"
                disabled={uploadingImage}
                onChange={handleDirectFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 disabled:cursor-not-allowed"
                title="Subir foto principal"
              />
              {uploadingImage ? (
                <div className="flex flex-col items-center gap-1 text-primary">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[11px] font-semibold">Subiendo...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">add</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{formData.mainImage ? "Cambiar Foto" : "Subir Foto"}</span>
                  <span className="text-[10px] text-on-surface-variant">Clic o arrastra</span>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-on-surface-variant mb-1">O usar Enlace de Imagen (URL)</label>
            <input
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none text-sm"
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

      <div className="bg-surface-bright rounded-xl border border-outline-variant/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm mt-8">
        <div className="flex w-full md:w-auto">
          {initialData && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-error/30 text-error rounded-xl font-label-md hover:bg-error-container transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Eliminar Artículo
            </button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            type="button"
            onClick={(e) => handleAction("DRAFT", e as any)}
            disabled={saving}
            className="w-full sm:w-auto px-6 py-3 bg-surface-container-high text-on-surface rounded-xl font-label-md hover:bg-surface-container-highest transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px]">edit_document</span>
            Guardar como Borrador
          </button>
          <button
            type="button"
            onClick={(e) => handleAction("PUBLISHED", e as any)}
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary rounded-xl font-label-md hover:opacity-90 shadow-sm transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            {initialData && initialData.status === "PUBLISHED" ? "Actualizar Publicación" : "Publicar Ahora"}
          </button>
        </div>
      </div>
    </form>
  );
}
