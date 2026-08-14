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
    const [videoPreviews, setVideoPreviews] = useState<{file: File, url: string}[]>([]);
    const [pdfPreviews, setPdfPreviews] = useState<{file: File, name: string}[]>([]);

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
            if (originalFile.type.startsWith('image/')) {
                try {
                    file = await imageCompression(originalFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
                } catch (err) {
                    console.error("Error compressing image", err);
                }
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
                    if (originalFile.type.startsWith('image/')) {
                        try {
                            file = await imageCompression(originalFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
                        } catch (e) {
                            console.error('Error compressing image', e);
                        }
                    }
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file, originalFile.name);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        newUploaded.push(uploadData.url);
                    } else {
                        alert(`Error al subir la imagen ${originalFile.name}. Verifica su tamaño.`);
                        setUploadingFiles(false);
                        return;
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
            if (videoPreviews.length > 0) {
                for (let i = 0; i < videoPreviews.length; i++) {
                    const file = videoPreviews[i].file;
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        currentVideos.push(uploadData.url);
                    } else {
                        alert(`Error al subir el video ${file.name}. Es posible que el archivo sea demasiado pesado para el servidor (Límite sugerido: 50MB).`);
                        setUploadingFiles(false);
                        return;
                    }
                }
            }

            // 3. Upload new PDFs if selected
            let currentDocuments = [...documents];
            if (pdfPreviews.length > 0) {
                for (let i = 0; i < pdfPreviews.length; i++) {
                    const file = pdfPreviews[i].file;
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
                    const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        currentDocuments.push(uploadData.url);
                    } else {
                        alert(`Error al subir el documento ${file.name}. Es posible que el archivo sea demasiado pesado.`);
                        setUploadingFiles(false);
                        return;
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
                        {/* Básicos - Bento Style */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-headline-md text-primary mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined bg-primary/10 p-2 rounded-lg">info</span>
                                Información Básica
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-8 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Título de la Publicación *</label>
                                    <input name="title" required defaultValue={property?.title || ''} className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Ej: Penthouse en Pinares" />
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Tipo de Operación *</label>
                                    <select name="modality" required defaultValue={property?.modality || 'VENTA'} className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg">
                                        <option value="VENTA">Venta</option>
                                        <option value="ARRIENDO">Arriendo</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Tipo de Inmueble *</label>
                                    <select name="propertyType" required defaultValue={property?.propertyType || 'Apartamento'} className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg">
                                        <option value="Apartamento">Apartamento</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Finca">Finca</option>
                                        <option value="Lote">Lote</option>
                                        <option value="Local">Local Comercial</option>
                                        <option value="Oficina">Oficina</option>
                                        <option value="Bodega">Bodega</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Precio (COP) <span className="text-xs text-on-surface-variant font-normal">(Opcional)</span></label>
                                    <input name="price" type="number" defaultValue={property?.price !== 0 ? property?.price : ''} className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Ej: 450000000" />
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Ciudad *</label>
                                    <input list="cityOptions" name="city" required defaultValue={property?.city || ''} className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Escribe o selecciona..." autoComplete="off" />
                                    <datalist id="cityOptions">
                                        <option value="Santa Rosa de Cabal" />
                                        <option value="Pereira" />
                                        <option value="Dosquebradas" />
                                        <option value="Armenia" />
                                        <option value="Manizales" />
                                    </datalist>
                                </div>
                                <div className="md:col-span-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Dirección / Sector (Opcional)</label>
                                    <input name="address" type="text" defaultValue={property?.address || ''} className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Ej: Condominio Las Palmas" />
                                </div>
                                <div className="md:col-span-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Coordenadas (Latitud, Longitud)</label>
                                    <input 
                                        type="text" 
                                        defaultValue={property?.lat && property?.lng ? `${property.lat}, ${property.lng}` : ''}
                                        onChange={(e) => {
                                            const parts = e.target.value.split(',');
                                            const latInput = document.getElementById('lat_input') as HTMLInputElement;
                                            const lngInput = document.getElementById('lng_input') as HTMLInputElement;
                                            if (latInput && lngInput) {
                                                if (parts.length >= 2) {
                                                    latInput.value = parts[0].trim();
                                                    lngInput.value = parts[1].trim();
                                                } else {
                                                    latInput.value = '';
                                                    lngInput.value = '';
                                                }
                                            }
                                        }}
                                        className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" 
                                        placeholder="Ej: 4.804204, -75.738502" 
                                    />
                                    <input type="hidden" name="lat" id="lat_input" defaultValue={property?.lat || ''} />
                                    <input type="hidden" name="lng" id="lng_input" defaultValue={property?.lng || ''} />
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

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                                {gallery.map((url, idx) => {
                                    const isMain = url === mainImage;
                                    return (
                                        <div key={idx} className={`relative group rounded-xl overflow-hidden border-2 transition-all shadow-sm ${isMain ? 'border-primary ring-2 ring-primary/30' : 'border-outline-variant/50 hover:border-primary/50'}`}>
                                            {url.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                                                <video src={url} className="w-full h-32 object-cover bg-black" muted loop autoPlay playsInline />
                                            ) : (
                                                <img src={url} alt={`Media ${idx + 1}`} className="w-full h-32 object-cover" />
                                            )}
                                            
                                            {isMain && (
                                                <span className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                    Principal
                                                </span>
                                            )}

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

                                <div className="relative group rounded-xl border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center justify-center p-4 cursor-pointer h-32 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
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
                                            <span className="text-xs font-bold text-primary">Subir Archivos</span>
                                            <span className="text-[10px] text-on-surface-variant">Clic o arrastra</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Detalles Bento */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow mt-6">
                            <h3 className="font-headline-md text-primary mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined bg-primary/10 p-2 rounded-lg">tune</span>
                                Características Técnicas
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">bed</span>
                                    <label className="font-label-md text-secondary mb-2">Habitaciones</label>
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.nextElementSibling as HTMLInputElement; i.stepDown(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">-</button>
                                        <input name="bedrooms" type="number" min="0" className="w-12 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue={property?.bedrooms || 0} />
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.previousElementSibling as HTMLInputElement; i.stepUp(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">+</button>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">shower</span>
                                    <label className="font-label-md text-secondary mb-2">Baños</label>
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.nextElementSibling as HTMLInputElement; i.stepDown(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">-</button>
                                        <input name="bathrooms" type="number" min="0" className="w-12 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue={property?.bathrooms || 0} />
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.previousElementSibling as HTMLInputElement; i.stepUp(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">+</button>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">directions_car</span>
                                    <label className="font-label-md text-secondary mb-2">Parqueaderos</label>
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.nextElementSibling as HTMLInputElement; i.stepDown(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">-</button>
                                        <input name="parking" type="number" min="0" className="w-12 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue={property?.parking || 0} />
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.previousElementSibling as HTMLInputElement; i.stepUp(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">+</button>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">straighten</span>
                                    <label className="font-label-md text-secondary mb-2">Área (m²)</label>
                                    <input name="builtArea" type="number" step="0.01" className="w-20 md:w-28 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue={property?.builtArea || 0} />
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
                                    <textarea name="shortDesc" defaultValue={property?.shortDesc || ''} rows={2} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"></textarea>
                                </div>
                                <div>
                                    <label className="font-label-md text-secondary block mb-1">Descripción Completa / Detallada</label>
                                    <textarea name="fullDesc" defaultValue={property?.fullDesc || ''} rows={6} className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Videos y Archivos Adjuntos */}
                        <div className="mt-6">
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
                                    {videoPreviews.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                            {videoPreviews.map((vp, i) => (
                                                <div key={i} className="relative rounded-xl overflow-hidden border border-primary/50 aspect-video group shadow-sm">
                                                    <video src={vp.url} className="w-full h-full object-cover opacity-60 bg-black" muted autoPlay loop playsInline />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white transition-opacity">
                                                        <span className="text-[10px] text-center px-2 truncate w-full mb-1 font-medium">{vp.file.name}</span>
                                                        <button type="button" onClick={() => {
                                                            const newPreviews = [...videoPreviews];
                                                            newPreviews.splice(i, 1);
                                                            setVideoPreviews(newPreviews);
                                                        }} className="px-2 py-1 bg-error hover:bg-error/80 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg transition-colors cursor-pointer">
                                                            <span className="material-symbols-outlined text-[14px]">delete</span>
                                                            Quitar
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <label className="relative flex flex-col items-center justify-center p-2 rounded-xl border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group aspect-video">
                                                <span className="material-symbols-outlined text-xl text-primary">add</span>
                                                <span className="text-[10px] text-primary text-center">Agregar más videos</span>
                                                <input name="videoFiles" type="file" accept="video/*" multiple className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={(e) => {
                                                    if (e.target.files) {
                                                        const newFiles = Array.from(e.target.files).map(f => ({file: f, url: URL.createObjectURL(f)}));
                                                        setVideoPreviews([...videoPreviews, ...newFiles]);
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    ) : (
                                        <label className="relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group shadow-sm mt-4">
                                            <span className="material-symbols-outlined text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">movie</span>
                                            <span className="font-label-lg text-primary font-bold mb-1">Subir Nuevos Videos</span>
                                            <span className="text-xs text-on-surface-variant text-center">Formatos .mp4, .webm (Max 50MB)</span>
                                            <input name="videoFiles" type="file" accept="video/*" multiple className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={(e) => {
                                                if (e.target.files) {
                                                    const newFiles = Array.from(e.target.files).map(f => ({file: f, url: URL.createObjectURL(f)}));
                                                    setVideoPreviews(newFiles);
                                                }
                                            }} />
                                        </label>
                                    )}
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
                                    {pdfPreviews.length > 0 ? (
                                        <div className="flex flex-col gap-2 mt-4">
                                            {pdfPreviews.map((pp, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-secondary/10 px-3 py-2 rounded-lg border border-secondary/30 text-xs shadow-sm">
                                                    <span className="material-symbols-outlined text-secondary text-[16px]">task</span>
                                                    <span className="truncate w-full font-medium text-secondary">{pp.name}</span>
                                                    <button type="button" onClick={() => {
                                                        const newPreviews = [...pdfPreviews];
                                                        newPreviews.splice(i, 1);
                                                        setPdfPreviews(newPreviews);
                                                    }} className="text-error hover:text-error/80 p-1 flex items-center justify-center cursor-pointer">
                                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="relative flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-secondary/40 hover:border-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer group mt-2">
                                                <span className="material-symbols-outlined text-lg text-secondary">add</span>
                                                <span className="text-xs text-secondary font-medium">Agregar más archivos</span>
                                                <input name="pdfFiles" type="file" accept="application/pdf" multiple className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={(e) => {
                                                    if (e.target.files) {
                                                        const newFiles = Array.from(e.target.files).map(f => ({file: f, name: f.name}));
                                                        setPdfPreviews([...pdfPreviews, ...newFiles]);
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    ) : (
                                        <label className="relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-secondary/40 hover:border-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer group shadow-sm mt-4">
                                            <span className="material-symbols-outlined text-4xl text-secondary mb-2 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                                            <span className="font-label-lg text-secondary font-bold mb-1">Subir Nuevos Documentos</span>
                                            <span className="text-xs text-on-surface-variant text-center">PDF, Brochures, Planos (Max 10MB)</span>
                                            <input name="pdfFiles" type="file" accept="application/pdf" multiple className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={(e) => {
                                                if (e.target.files) {
                                                    const newFiles = Array.from(e.target.files).map(f => ({file: f, name: f.name}));
                                                    setPdfPreviews(newFiles);
                                                }
                                            }} />
                                        </label>
                                    )}
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
