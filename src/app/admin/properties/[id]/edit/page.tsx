'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProperty({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [property, setProperty] = useState<any>(null);
    
    useEffect(() => {
        fetch(`/api/properties/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data);
                setInitialLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert("Error cargando inmueble.");
                router.push('/admin/properties');
            });
    }, [params.id, router]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        try {
            let mainImageUrl = data.mainImage || property.mainImage;
            
            // Si el usuario seleccionó un archivo de imagen
            const fileInput = e.currentTarget.querySelector('input[name="mainImageFile"]') as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const uploadFormData = new FormData();
                uploadFormData.append("file", file);
                
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    mainImageUrl = uploadData.url;
                }
            }

            // Video upload
            let videosUrl = property.videos;
            const videoInput = e.currentTarget.querySelector('input[name="videoFile"]') as HTMLInputElement;
            if (videoInput && videoInput.files && videoInput.files.length > 0) {
                const file = videoInput.files[0];
                const uploadFormData = new FormData();
                uploadFormData.append("file", file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    videosUrl = JSON.stringify([uploadData.url]);
                }
            }

            // PDF upload
            let pdfsUrl = property.documents;
            const pdfInput = e.currentTarget.querySelector('input[name="pdfFile"]') as HTMLInputElement;
            if (pdfInput && pdfInput.files && pdfInput.files.length > 0) {
                const file = pdfInput.files[0];
                const uploadFormData = new FormData();
                uploadFormData.append("file", file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    pdfsUrl = JSON.stringify([uploadData.url]);
                }
            }

            const propertyData: any = { ...data, mainImage: mainImageUrl, videos: videosUrl, documents: pdfsUrl };
            delete propertyData.mainImageFile;
            delete propertyData.videoFile;
            delete propertyData.pdfFile;
            
            // Set price to 0 if not provided
            if (!propertyData.price) {
                propertyData.price = 0;
            } else {
                propertyData.price = parseFloat(propertyData.price as string);
            }

            const res = await fetch(`/api/properties/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
            
            if (res.ok) {
                router.push('/admin/properties');
                router.refresh();
            } else {
                alert("Error al editar inmueble.");
            }
        } catch (error) {
            console.error(error);
            alert("Error del servidor.");
        }
        setLoading(false);
    }

    if (initialLoading) return <div className="p-12 text-center text-on-surface">Cargando inmueble...</div>;

    return (
        <main className="min-h-screen bg-surface p-8 md:p-12 text-on-surface">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/properties">
                        <span className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-colors cursor-pointer">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="font-display-lg text-[32px] text-primary">Editar Inmueble</h1>
                        <p className="text-on-surface-variant font-body-md">Actualiza los detalles de la propiedad.</p>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 ambient-shadow">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Básicos */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2">Información Básica</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Título de la Publicación *</label>
                                    <input name="title" required defaultValue={property?.title} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Tipo de Operación *</label>
                                    <select name="modality" required defaultValue={property?.modality} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary">
                                        <option value="VENTA">Venta</option>
                                        <option value="ARRIENDO">Arriendo</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Tipo de Inmueble *</label>
                                    <select name="propertyType" required defaultValue={property?.propertyType} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary">
                                        <option value="Apartamento">Apartamento</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Finca">Finca</option>
                                        <option value="Lote">Lote</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Precio (COP) <span className="text-xs text-on-surface-variant font-normal">(Opcional)</span></label>
                                    <input name="price" type="number" defaultValue={property?.price !== 0 ? property?.price : ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Ciudad *</label>
                                    <select name="city" required defaultValue={property?.city} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary">
                                        <option value="Pereira">Pereira</option>
                                        <option value="Dosquebradas">Dosquebradas</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Manizales">Manizales</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Estado *</label>
                                    <select name="status" required defaultValue={property?.status} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary">
                                        <option value="DISPONIBLE">Disponible</option>
                                        <option value="VENDIDO">Vendido</option>
                                        <option value="ARRENDADO">Arrendado</option>
                                        <option value="INACTIVO">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Detalles */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2">Características</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Habitaciones</label>
                                    <input name="bedrooms" type="number" defaultValue={property?.bedrooms} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Baños</label>
                                    <input name="bathrooms" type="number" defaultValue={property?.bathrooms} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Área (m²)</label>
                                    <input name="builtArea" type="number" step="0.01" defaultValue={property?.builtArea} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Multimedia */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2">Multimedia</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">Cambiar Imagen Principal (Subir Archivo)</label>
                                        <input name="mainImageFile" type="file" accept="image/*" className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">O Enlace de Imagen (URL)</label>
                                        <input name="mainImage" type="url" defaultValue={property?.mainImage} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/30">
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">Cambiar Video (Subir .mp4, etc)</label>
                                        <input name="videoFile" type="file" accept="video/*" className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                        {property?.videos && <p className="text-xs text-on-surface-variant mt-1">Ya hay un video guardado.</p>}
                                    </div>
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">Cambiar PDF de Información Extendida</label>
                                        <input name="pdfFile" type="file" accept="application/pdf" className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                        {property?.documents && <p className="text-xs text-on-surface-variant mt-1">Ya hay un PDF guardado.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-6">
                            <button type="submit" disabled={loading} className="bg-primary hover:bg-primary-container hover:text-primary transition-all text-on-primary font-bold py-4 px-10 rounded-lg flex items-center gap-2 shadow-lg disabled:opacity-50">
                                {loading ? "Guardando..." : "Guardar Cambios"}
                                <span className="material-symbols-outlined">save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
