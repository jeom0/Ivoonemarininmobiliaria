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

    // Gallery state
    const [gallery, setGallery] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string>('');
    const [newImageUrl, setNewImageUrl] = useState<string>('');
    const [videos, setVideos] = useState<string[]>([]);
    const [documents, setDocuments] = useState<string[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState(false);

    useEffect(() => {
        fetch(`/api/properties/${unwrappedParams.id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data);
                
                // Parse gallery images
                let imgs: string[] = [];
                if (data.images) {
                    try {
                        const parsed = JSON.parse(data.images);
                        if (Array.isArray(parsed)) imgs = parsed;
                    } catch (e) {
                        imgs = [data.images];
                    }
                }
                const primary = data.mainImage || (imgs.length > 0 ? imgs[0] : '');
                if (primary && !imgs.includes(primary)) {
                    imgs.unshift(primary);
                }
                setGallery(imgs);
                setMainImage(primary);

                // Parse videos
                if (data.videos) {
                    try {
                        const parsed = JSON.parse(data.videos);
                        if (Array.isArray(parsed)) setVideos(parsed);
                        else setVideos([data.videos]);
                    } catch (e) {
                        setVideos([data.videos]);
                    }
                }

                // Parse documents
                if (data.documents) {
                    try {
                        const parsed = JSON.parse(data.documents);
                        if (Array.isArray(parsed)) setDocuments(parsed);
                        else setDocuments([data.documents]);
                    } catch (e) {
                        setDocuments([data.documents]);
                    }
                }

                setInitialLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert("Error cargando inmueble.");
                router.push('/admin/properties');
            });
    }, [unwrappedParams.id, router]);

    // Handle direct file upload via + card
    const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploadingFiles(true);
        const files = Array.from(e.target.files);
        const newUploaded: string[] = [];

        for (const originalFile of files) {
            let file = originalFile;
            try {
                file = await imageCompression(originalFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
            } catch (err) {
                console.error("Error compressing image", err);
            }
            const uploadFormData = new FormData();
            uploadFormData.append("file", file, originalFile.name);
            try {
                const res = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (res.ok) {
                    const uploadData = await res.json();
                    newUploaded.push(uploadData.url);
                }
            } catch (err) {
                console.error("Error uploading file", err);
            }
        }

        if (newUploaded.length > 0) {
            setGallery(prev => {
                const updated = [...prev, ...newUploaded];
                if (!mainImage && updated.length > 0) {
                    setMainImage(updated[0]);
                }
                return updated;
            });
        }
        setUploadingFiles(false);
        e.target.value = '';
    };

    // Handle adding URL image directly to gallery
    const handleAddImageUrl = () => {
        if (!newImageUrl.trim()) return;
        const url = newImageUrl.trim();
        if (!gallery.includes(url)) {
            const updated = [...gallery, url];
            setGallery(updated);
            if (!mainImage) setMainImage(url);
        }
        setNewImageUrl('');
    };

    // Handle setting main image
    const handleSetMain = (url: string) => {
        setMainImage(url);
    };

    // Handle deleting an image from gallery
    const handleRemoveImage = (url: string) => {
        const updated = gallery.filter(img => img !== url);
        setGallery(updated);
        if (mainImage === url) {
            setMainImage(updated.length > 0 ? updated[0] : '');
        }
    };

    // Remove video
    const handleRemoveVideo = (index: number) => {
        setVideos(prev => prev.filter((_, i) => i !== index));
    };

    // Remove document
    const handleRemoveDocument = (index: number) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            setUploadingFiles(true);
            let currentGallery = [...gallery];

            // 1. Upload new image files if selected
            const imagesInput = form.querySelector('input[name="imagesFiles"]') as HTMLInputElement;
            if (imagesInput && imagesInput.files && imagesInput.files.length > 0) {
                const newUploaded: string[] = [];
                for (let i = 0; i < imagesInput.files.length; i++) {
                    const originalFile = imagesInput.files[i];
                    let file = originalFile;
                    try {
                        file = await imageCompression(originalFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
                    } catch (e) {
                        console.error('Error compressing image', e);
                    }
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file, originalFile.name);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        newUploaded.push(uploadData.url);
                    }
                }
                if (newUploaded.length > 0) {
                    currentGallery = [...currentGallery, ...newUploaded];
                }
            }

            let currentMainImage = mainImage;
            if (!currentMainImage && currentGallery.length > 0) {
                currentMainImage = currentGallery[0];
            }

            // 2. Upload new videos if selected
            let currentVideos = [...videos];
            const videoInput = form.querySelector('input[name="videoFiles"]') as HTMLInputElement;
            if (videoInput && videoInput.files && videoInput.files.length > 0) {
                for (let i = 0; i < videoInput.files.length; i++) {
                    const file = videoInput.files[i];
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        currentVideos.push(uploadData.url);
                    }
                }
            }

            // 3. Upload new PDFs if selected
            let currentDocuments = [...documents];
            const pdfInput = form.querySelector('input[name="pdfFiles"]') as HTMLInputElement;
            if (pdfInput && pdfInput.files && pdfInput.files.length > 0) {
                for (let i = 0; i < pdfInput.files.length; i++) {
                    const file = pdfInput.files[i];
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        currentDocuments.push(uploadData.url);
                    }
                }
            }

            setUploadingFiles(false);

            // Construct payload
            const propertyData: any = {
                ...data,
                mainImage: currentMainImage,
                images: JSON.stringify(currentGallery),
                videos: currentVideos.length > 0 ? JSON.stringify(currentVideos) : null,
                documents: currentDocuments.length > 0 ? JSON.stringify(currentDocuments) : null,
            };

            delete propertyData.imagesFiles;
            delete propertyData.videoFiles;
            delete propertyData.pdfFiles;

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
            alert(`Error de red o conexión: ${error.message}`);
        } finally {
            setLoading(false);
            setUploadingFiles(false);
        }
    }

    if (initialLoading) {
        return (
            <main className="min-h-screen bg-surface p-12 text-center text-on-surface flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-label-lg text-primary">Cargando datos del inmueble...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface p-6 md:p-12 text-on-surface">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/properties">
                        <span className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-colors cursor-pointer">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="font-display-lg text-[32px] text-primary">Editar Inmueble</h1>
                        <p className="text-on-surface-variant font-body-md">Actualiza los detalles, fotos y características de la propiedad.</p>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/30 ambient-shadow">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Información Básica */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">info</span>
                                Información Básica
                            </h3>
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
                                        <option value="Local">Local Comercial</option>
                                        <option value="Oficina">Oficina</option>
                                        <option value="Bodega">Bodega</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Precio (COP) <span className="text-xs text-on-surface-variant font-normal">(Opcional, 0 para "Consultar")</span></label>
                                    <input name="price" type="number" defaultValue={property?.price !== 0 ? property?.price : ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 450000000" />
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

                        {/* Galería de Fotos */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-2 border-b border-outline-variant/30 pb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">photo_library</span>
                                Galería de Fotos ({gallery.length})
                            </h3>
                            <p className="text-xs text-on-surface-variant mb-4">
                                Haz clic en **"Establecer como Principal"** para definir la foto de portada. Usa el icono de papelera para eliminar fotos no deseadas.
                            </p>

                            {/* Grid de imágenes actuales y botón + de carga */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                                {gallery.map((url, idx) => {
                                    const isMain = url === mainImage;
                                    return (
                                        <div key={idx} className={`relative group rounded-xl overflow-hidden border-2 transition-all shadow-sm ${isMain ? 'border-primary ring-2 ring-primary/30' : 'border-outline-variant/50 hover:border-primary/50'}`}>
                                            <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-32 object-cover" />
                                            
                                            {/* Badge Principal */}
                                            {isMain && (
                                                <span className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                    Principal
                                                </span>
                                            )}

                                            {/* Overlay de acciones */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-2">
                                                {!isMain && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetMain(url)}
                                                        className="bg-surface text-primary text-xs font-semibold px-2 py-1 rounded shadow hover:bg-primary hover:text-on-primary transition-colors"
                                                    >
                                                        Hacer Principal
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(url)}
                                                    className="bg-error/90 text-white p-1.5 rounded-full hover:bg-error transition-colors"
                                                    title="Eliminar foto"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Cuadro con el icono + para agregar foto */}
                                <div className="relative group rounded-xl border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center justify-center p-4 cursor-pointer h-32 text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        disabled={uploadingFiles}
                                        onChange={handleDirectFileUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 disabled:cursor-not-allowed"
                                        title="Agregar foto"
                                    />
                                    {uploadingFiles ? (
                                        <div className="flex flex-col items-center gap-1 text-primary">
                                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-[11px] font-semibold">Subiendo...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-[24px]">add</span>
                                            </div>
                                            <span className="text-xs font-bold text-primary">Agregar Foto</span>
                                            <span className="text-[10px] text-on-surface-variant">Clic o arrastra aquí</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Agregar nuevas imágenes */}
                            <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 space-y-4">
                                <h4 className="font-label-lg text-secondary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                                    Agregar Fotos a la Galería
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-label-md text-secondary block mb-1">Subir Archivos desde tu Equipo (Multi-selección)</label>
                                        <input
                                            name="imagesFiles"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="w-full border border-outline-variant rounded-lg p-2.5 bg-surface text-sm focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-label-md text-secondary block mb-1">O Agregar Foto por Enlace URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                value={newImageUrl}
                                                onChange={e => setNewImageUrl(e.target.value)}
                                                placeholder="https://..."
                                                className="flex-1 border border-outline-variant rounded-lg p-2.5 bg-surface text-sm focus:ring-primary focus:border-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddImageUrl}
                                                className="bg-secondary hover:bg-secondary/90 text-on-secondary font-bold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">add</span>
                                                Añadir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Características Técnicas */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">other_houses</span>
                                Características
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Habitaciones</label>
                                    <input name="bedrooms" type="number" defaultValue={property?.bedrooms ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 3" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Baños</label>
                                    <input name="bathrooms" type="number" defaultValue={property?.bathrooms ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 2" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Parqueaderos</label>
                                    <input name="parking" type="number" defaultValue={property?.parking ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 1" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Área Construida (m²)</label>
                                    <input name="builtArea" type="number" step="0.01" defaultValue={property?.builtArea ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 85.5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Área Lote (m²)</label>
                                    <input name="lotArea" type="number" step="0.01" defaultValue={property?.lotArea ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 120" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Estrato</label>
                                    <input name="stratum" type="number" defaultValue={property?.stratum ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 4" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Antigüedad (Años)</label>
                                    <input name="antiquity" type="number" defaultValue={property?.antiquity ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-secondary">Administración (COP)</label>
                                    <input name="adminFee" type="number" defaultValue={property?.adminFee ?? ''} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Ej: 250000" />
                                </div>
                            </div>
                        </div>

                        {/* Descripciones */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Descripciones
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="font-label-md text-secondary block mb-1">Descripción Corta (Resumen para catálogo)</label>
                                    <textarea name="shortDesc" defaultValue={property?.shortDesc || ''} rows={2} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Resumen breve del inmueble..."></textarea>
                                </div>
                                <div>
                                    <label className="font-label-md text-secondary block mb-1">Descripción Completa / Detallada</label>
                                    <textarea name="fullDesc" defaultValue={property?.fullDesc || ''} rows={6} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary" placeholder="Detalles de acabados, distribución, zonas comunes..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Videos y Documentos */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">videocam</span>
                                Videos y Archivos Adjuntos
                            </h3>
                            <div className="space-y-6">
                                {/* Videos */}
                                <div>
                                    <label className="font-label-md text-secondary block mb-2">Videos Guardados ({videos.length})</label>
                                    {videos.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mb-3">
                                            {videos.map((vUrl, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant text-xs">
                                                    <span className="material-symbols-outlined text-primary text-[16px]">movie</span>
                                                    <span className="max-w-[200px] truncate">{vUrl}</span>
                                                    <button type="button" onClick={() => handleRemoveVideo(i)} className="text-error hover:text-error/80">
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <label className="font-label-sm text-on-surface-variant block mb-1">Subir Nuevos Videos (MP4, WEBM, etc.)</label>
                                    <input name="videoFiles" type="file" accept="video/*" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary text-sm" />
                                </div>

                                {/* PDFs */}
                                <div className="pt-4 border-t border-outline-variant/30">
                                    <label className="font-label-md text-secondary block mb-2">Documentos PDF Guardados ({documents.length})</label>
                                    {documents.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mb-3">
                                            {documents.map((dUrl, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant text-xs">
                                                    <span className="material-symbols-outlined text-primary text-[16px]">picture_as_pdf</span>
                                                    <a href={dUrl} target="_blank" rel="noreferrer" className="max-w-[200px] truncate underline hover:text-primary">Ver Documento {i + 1}</a>
                                                    <button type="button" onClick={() => handleRemoveDocument(i)} className="text-error hover:text-error/80">
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <label className="font-label-sm text-on-surface-variant block mb-1">Subir Nuevos Documentos (PDF, Brochures, Planos)</label>
                                    <input name="pdfFiles" type="file" accept="application/pdf" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Visibilidad y Secciones del Inicio / Hero */}
                        <div className="bg-surface-container/30 p-6 rounded-2xl border border-outline-variant/40 space-y-4">
                            <div>
                                <h3 className="font-headline-md text-primary mb-1 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                    Visibilidad en Secciones del Inicio (Portada / Hero)
                                </h3>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Configura en qué partes de la página principal (Home) aparecerá este inmueble para que los visitantes lo vean de inmediato.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                {/* Destacar en Inicio / Hero */}
                                <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary/30 bg-primary/5 hover:border-primary/60 transition-all cursor-pointer group shadow-sm">
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        value="true"
                                        defaultChecked={property?.isFeatured}
                                        className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary mt-0.5"
                                    />
                                    <div>
                                        <div className="font-label-lg text-primary font-bold flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">star</span>
                                            Destacar en Inicio (Hero / Carrusel Principal)
                                        </div>
                                        <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                                            💡 <strong>¿Para qué sirve?</strong> Al marcar esta casilla, el inmueble aparecerá en el <strong>Hero principal (portada de la web)</strong> y en el catálogo destacado del inicio.
                                        </p>
                                    </div>
                                </label>

                                {/* Oportunidad de Inversión */}
                                <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-outline-variant/50 bg-surface hover:border-secondary/50 transition-all cursor-pointer group shadow-sm">
                                    <input
                                        type="checkbox"
                                        name="isInvestment"
                                        value="true"
                                        defaultChecked={property?.isInvestment}
                                        className="w-5 h-5 rounded text-secondary focus:ring-secondary accent-secondary mt-0.5"
                                    />
                                    <div>
                                        <div className="font-label-lg text-secondary font-bold flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                            Oportunidad de Inversión
                                        </div>
                                        <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                                            💡 <strong>¿Para qué sirve?</strong> Clasifica la propiedad en la sección especial de <strong>Inmuebles de Alta Rentabilidad e Inversiones</strong>.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-outline-variant/30">
                            <Link href="/admin/properties" className="px-6 py-3 border border-outline-variant rounded-lg text-secondary hover:bg-surface-container transition-colors text-sm font-semibold">
                                Cancelar
                            </Link>
                            <button type="submit" disabled={loading || uploadingFiles} className="bg-primary hover:bg-primary-container hover:text-primary transition-all text-on-primary font-bold py-3.5 px-8 rounded-lg flex items-center gap-2 shadow-lg disabled:opacity-50">
                                {loading || uploadingFiles ? "Guardando Cambios..." : "Guardar Cambios"}
                                <span className="material-symbols-outlined">save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
