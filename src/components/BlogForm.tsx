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
    <form onSubmit={(e) => handleAction("PUBLISHED", e)} className="max-w-5xl">
      {error && (
        <div className="bg-error/10 text-error p-4 rounded-xl font-body-md mb-6 flex items-center gap-2 border border-error/20">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Principal - Contenido */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-surface rounded-3xl border border-outline-variant/40 p-6 shadow-sm hover:border-primary/30 transition-colors">
            <h2 className="font-display-sm text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined bg-primary/10 p-2 rounded-xl">article</span>
              Datos Básicos
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block font-label-md text-secondary mb-2 flex items-center gap-1">Título del Artículo *</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-outline-variant px-2 py-3 font-body-lg focus:border-primary outline-none transition-colors"
                  type="text"
                  placeholder="Ej. Las 5 mejores zonas para invertir..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-secondary mb-2 flex items-center gap-1">URL (Slug) *</label>
                  <input
                    required
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-outline-variant px-2 py-3 font-body-md focus:border-secondary outline-none transition-colors"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-secondary mb-2 flex items-center gap-1">Categoría</label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-outline-variant px-2 py-3 font-body-md focus:border-secondary outline-none transition-colors"
                    type="text"
                    placeholder="Ej. Inversión, Guías..."
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-md text-secondary mb-2 flex items-center gap-1">Resumen / Extracto</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md focus:border-primary outline-none transition-colors"
                  rows={3}
                  placeholder="Un breve texto que aparecerá en la tarjeta del blog y ayudará al SEO..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-3xl border border-outline-variant/40 p-6 shadow-sm hover:border-primary/30 transition-colors">
            <h2 className="font-display-sm text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined bg-primary/10 p-2 rounded-xl">draw</span>
              Contenido Completo
            </h2>
            <div>
              <textarea
                required
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-5 py-4 font-body-md focus:border-primary outline-none transition-colors custom-scrollbar"
                rows={18}
                placeholder="Escribe aquí el contenido de tu artículo. Soporta formato Markdown (ej. **negrita**, # Título, etc.)"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Columna Lateral - Portada y Acciones */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-surface rounded-3xl border border-outline-variant/40 p-6 shadow-sm hover:border-secondary/30 transition-colors">
            <h2 className="font-display-sm text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined bg-secondary/10 p-2 rounded-xl text-secondary">image</span>
              Portada (Main Image)
            </h2>
            <p className="text-sm text-on-surface-variant mb-4">Esta imagen se mostrará en el listado del blog y en el inicio.</p>
            
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-container border-2 border-dashed border-outline-variant/50 group mb-4">
              {formData.mainImage ? (
                <>
                  <img src={formData.mainImage} alt="Portada" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mainImage: "" }))}
                      className="bg-error text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-error/80 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                      Quitar Portada
                    </button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-surface-container-high transition-colors">
                  {uploadingImage ? (
                    <div className="flex flex-col items-center text-primary">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="font-bold">Subiendo...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[28px]">add_photo_alternate</span>
                      </div>
                      <span className="font-bold text-primary">Subir Portada</span>
                      <span className="text-xs text-on-surface-variant mt-1">Formato 16:9 recomendado</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={handleDirectFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-outline-variant/30">
              <label className="block font-label-md text-secondary mb-1">O pega un Enlace (URL)</label>
              <input
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 font-body-sm focus:border-secondary outline-none"
                type="url"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="bg-surface rounded-3xl border border-outline-variant/40 p-6 shadow-sm sticky top-6">
             <h2 className="font-display-sm text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined bg-primary/10 p-2 rounded-xl">publish</span>
              Publicación
            </h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={(e) => handleAction("PUBLISHED", e as any)}
                disabled={saving}
                className="w-full px-6 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                {initialData && initialData.status === "PUBLISHED" ? "Actualizar Artículo" : "Publicar Ahora"}
              </button>
              
              <button
                type="button"
                onClick={(e) => handleAction("DRAFT", e as any)}
                disabled={saving}
                className="w-full px-6 py-3 bg-surface-container text-on-surface rounded-xl font-bold hover:bg-surface-variant transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">save</span>
                Guardar Borrador
              </button>

              {initialData && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 text-error hover:bg-error/10 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                  Eliminar Artículo
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
