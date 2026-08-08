'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import imageCompression from 'browser-image-compression';

export default function EditProperty({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [property, setProperty] = useState<any>(null);
    
    useEffect(() => {
        fetch(`/api/properties/${unwrappedParams.id}`)
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
    }, [unwrappedParams.id, router]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            let mainImageUrl = data.mainImage || property.mainImage;
            
            // Multiple images upload
            let imagesArr = [];
            try { imagesArr = JSON.parse(property?.images || '[]'); } catch(e){}
            const imagesInput = form.querySelector('input[name="imagesFiles"]') as HTMLInputElement;
            if (imagesInput && imagesInput.files && imagesInput.files.length > 0) {
                const uploadedImages = [];
                for (let i = 0; i < imagesInput.files.length; i++) {
                    const originalFile = imagesInput.files[i];
                    let file = originalFile;
                    try {
                        file = await imageCompression(originalFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
                    } catch (e) { console.error('Error compressing', e); }
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file, originalFile.name);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        uploadedImages.push(uploadData.url);
                    }
                }
                if (uploadedImages.length > 0) {
                    // Update mainImage if they uploaded new ones
                    mainImageUrl = uploadedImages[0];
                    imagesArr = uploadedImages;
                }
            }

            // Multiple video upload
            let videosUrl = property.videos;
            const videoInput = form.querySelector('input[name="videoFiles"]') as HTMLInputElement;
            if (videoInput && videoInput.files && videoInput.files.length > 0) {
                const uploadedVideos = [];
                for (let i = 0; i < videoInput.files.length; i++) {
                    const file = videoInput.files[i];
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        uploadedVideos.push(uploadData.url);
                    }
                }
                if (uploadedVideos.length > 0) videosUrl = JSON.stringify(uploadedVideos);
            }

            // Multiple PDF upload
            let pdfsUrl = property.documents;
            const pdfInput = form.querySelector('input[name="pdfFiles"]') as HTMLInputElement;
            if (pdfInput && pdfInput.files && pdfInput.files.length > 0) {
                const uploadedPdfs = [];
                for (let i = 0; i < pdfInput.files.length; i++) {
                    const file = pdfInput.files[i];
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        uploadedPdfs.push(uploadData.url);
                    }
                }
                if (uploadedPdfs.length > 0) pdfsUrl = JSON.stringify(uploadedPdfs);
            }

            const propertyData: any = { ...data, mainImage: mainImageUrl, images: JSON.stringify(imagesArr), videos: videosUrl, documents: pdfsUrl };
            delete propertyData.imagesFiles;
            delete propertyData.videoFiles;
            delete propertyData.pdfFiles;
            
            // Set price to 0 if not provided
            if (!propertyData.price) {
                propertyData.price = 0;
            } else {
                propertyData.price = parseFloat(propertyData.price as string);
            }
            
            if (propertyData.lat) propertyData.lat = parseFloat(propertyData.lat as string);
            else propertyData.lat = null;
            if (propertyData.lng) propertyData.lng = parseFloat(propertyData.lng as string);
            else propertyData.lng = null;
            
            propertyData.isFeatured = propertyData.isFeatured === 'true';
            propertyData.isInvestment = propertyData.isInvestment === 'true';

            const res = await fetch(`/api/properties/${unwrappedParams.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
            
            if (res.ok) {
                router.push('/admin/properties');
                router.refresh();
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert(`Error del servidor al editar: ${errorData.error || res.statusText}`);
            }
        } catch (error: any) {
            console.error(error);
            alert(`Error de red o conexión: ${error.message}. Si subiste imágenes, asegúrate de que pesen menos de 2MB.`);
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
                                    <input list="cityOptions" name="city" required defaultValue={property?.city} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Escribe o selecciona..." autoComplete="off" />
                                    <datalist id="cityOptions">
                                        <option value="Santa Rosa de Cabal" />
                                        <option value="Pereira" />
                                        <option value="Dosquebradas" />
                                        <option value="Armenia" />
                                        <option value="Manizales" />
                                    </datalist>
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div className="space-y-2 md:col-span-1">
                                    <label className="font-label-md text-secondary">Dirección / Sector (Opcional)</label>
                                    <input name="address" type="text" defaultValue={property?.address || ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: Condominio Las Palmas" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Latitud (Mapa)</label>
                                    <input name="lat" type="number" step="any" defaultValue={property?.lat || ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 4.8690" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Longitud (Mapa)</label>
                                    <input name="lng" type="number" step="any" defaultValue={property?.lng || ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: -75.6231" />
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
                                        <label className="font-label-md text-secondary block mb-2">Reemplazar Imágenes (Selecciona varias)</label>
                                        <input name="imagesFiles" type="file" accept="image/*" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">O Enlace de Imagen (URL)</label>
                                        <input name="mainImage" type="url" defaultValue={property?.mainImage} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/30">
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">Reemplazar Videos (Subir varios)</label>
                                        <input name="videoFiles" type="file" accept="video/*" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                        {property?.videos && <p className="text-xs text-on-surface-variant mt-1">Ya hay un video guardado.</p>}
                                    </div>
                                    <div>
                                        <label className="font-label-md text-secondary block mb-2">Reemplazar PDFs de Información (Varios)</label>
                                        <input name="pdfFiles" type="file" accept="application/pdf" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" />
                                        {property?.documents && <p className="text-xs text-on-surface-variant mt-1">Ya hay un PDF guardado.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visibilidad */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2">Secciones de Inicio</h3>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="isFeatured" value="true" defaultChecked={property?.isFeatured} className="w-5 h-5 rounded text-primary focus:ring-primary" />
                                    <span className="font-label-md text-secondary">Destacar en Inicio (Propiedades Destacadas)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="isInvestment" value="true" defaultChecked={property?.isInvestment} className="w-5 h-5 rounded text-primary focus:ring-primary" />
                                    <span className="font-label-md text-secondary">Oportunidad de Inversión</span>
                                </label>
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
