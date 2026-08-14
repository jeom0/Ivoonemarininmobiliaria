'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import imageCompression from 'browser-image-compression';

export default function NewProperty() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState(false);
    const [gallery, setGallery] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string>('');
    const [newImageUrl, setNewImageUrl] = useState<string>('');
    const [pdfPreview, setPdfPreview] = useState<{file: File | null, name: string | null}>({file: null, name: null});

    // Direct file upload via + card
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

    // Add image by URL
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

    const handleSetMain = (url: string) => setMainImage(url);

    const handleRemoveImage = (url: string) => {
        const updated = gallery.filter(img => img !== url);
        setGallery(updated);
        if (mainImage === url) {
            setMainImage(updated.length > 0 ? updated[0] : '');
        }
    };
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            let currentGallery = [...gallery];
            
            // Multiple images upload fallback if any selected via traditional input
            const imagesInput = form.querySelector('input[name="imagesFiles"]') as HTMLInputElement;
            if (imagesInput && imagesInput.files && imagesInput.files.length > 0) {
                for (let i = 0; i < imagesInput.files.length; i++) {
                    const originalFile = imagesInput.files[i];
                    let file = originalFile;
                    
                    // Comprimir solo si es imagen
                    if (originalFile.type.startsWith('image/')) {
                        try {
                            file = await imageCompression(originalFile, {
                                maxSizeMB: 1,
                                maxWidthOrHeight: 1920,
                                useWebWorker: true,
                            });
                        } catch (error) {
                            console.error('Error compressing image:', error);
                        }
                    }

                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file, originalFile.name);
                    
                    const uploadRes = await fetch('/api/upload', {
                        method: 'POST',
                        body: uploadFormData
                    });

                    if (uploadRes.ok) {
                        const uploadData = await uploadRes.json();
                        currentGallery.push(uploadData.url);
                    } else {
                        alert(`Error al subir el archivo ${originalFile.name}. Verifica el tamaño.`);
                        setLoading(false);
                        return;
                    }
                }
            }

            let primaryImage = mainImage || data.mainImage as string;
            if (!primaryImage && currentGallery.length > 0) {
                primaryImage = currentGallery[0];
            }

            // Multiple video upload logic removed (handled by gallery now)


            // Multiple PDF upload
            let uploadedDocs: string[] = [];
            if (pdfPreview.file) {
                const uploadFormData = new FormData();
                uploadFormData.append("file", pdfPreview.file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    uploadedDocs.push(uploadData.url);
                } else {
                    alert(`Error al subir el documento ${pdfPreview.file.name}. Es posible que el archivo sea demasiado pesado.`);
                    setLoading(false);
                    return;
                }
                if (uploadedDocs.length > 0) data.documents = JSON.stringify(uploadedDocs);
            }

            const propertyData: any = {
                ...data,
                mainImage: primaryImage || null,
                images: currentGallery.length > 0 ? JSON.stringify(currentGallery) : null,
            };
            delete propertyData.mainImageFile;
            delete propertyData.videoFile;
            delete propertyData.pdfFile;
            
            // Set price to 0 if not provided
            if (!propertyData.price) {
                propertyData.price = 0;
            } else {
                propertyData.price = parseFloat(propertyData.price as string);
            }

            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
            if (res.ok) {
                router.push('/admin/properties');
                router.refresh();
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert(`Error del servidor al guardar: ${errorData.error || res.statusText}`);
            }
        } catch (error: any) {
            console.error(error);
            alert(`Error de red o conexión: ${error.message}`);
        }
        setLoading(false);
    }

    return (
        <main className="min-h-screen bg-surface p-8 md:p-12 text-on-surface">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/properties">
                        <span className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-colors cursor-pointer">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="font-display-lg text-[32px] text-primary">Subir Nuevo Inmueble</h1>
                        <p className="text-on-surface-variant font-body-md">Ingresa los detalles de la propiedad para agregarla al catálogo.</p>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 ambient-shadow">
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
                                    <input name="title" required className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Ej: Penthouse en Pinares" />
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Tipo de Operación *</label>
                                    <select name="modality" required className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg">
                                        <option value="VENTA">Venta</option>
                                        <option value="ARRIENDO">Arriendo</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Tipo de Inmueble *</label>
                                    <select name="propertyType" required className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg">
                                        <option value="Apartamento">Apartamento</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Finca">Finca</option>
                                        <option value="Lote">Lote</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Precio (COP) <span className="text-xs text-on-surface-variant font-normal">(Opcional)</span></label>
                                    <input name="price" type="number" className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Ej: 450000000" />
                                </div>
                                <div className="md:col-span-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Ciudad *</label>
                                    <input list="cityOptions" name="city" required className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Escribe o selecciona..." autoComplete="off" />
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
                                    <input name="address" type="text" className="w-full border-none bg-transparent p-0 focus:ring-0 text-on-surface font-body-lg placeholder-on-surface-variant/50" placeholder="Ej: Condominio Las Palmas" />
                                </div>
                                <div className="md:col-span-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                                    <label className="font-label-md text-secondary block mb-2">Coordenadas (Latitud, Longitud)</label>
                                    <input 
                                        type="text" 
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
                                    <input type="hidden" name="lat" id="lat_input" />
                                    <input type="hidden" name="lng" id="lng_input" />
                                </div>
                            </div>
                        </div>

                        {/* Detalles Bento */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-headline-md text-primary mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined bg-primary/10 p-2 rounded-lg">tune</span>
                                Características Técnicas
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">bed</span>
                                    <label className="font-label-md text-secondary mb-2">Habitaciones</label>
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.nextElementSibling as HTMLInputElement; i.stepDown(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">-</button>
                                        <input name="bedrooms" type="number" min="0" className="w-12 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue="0" />
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.previousElementSibling as HTMLInputElement; i.stepUp(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">+</button>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">shower</span>
                                    <label className="font-label-md text-secondary mb-2">Baños</label>
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.nextElementSibling as HTMLInputElement; i.stepDown(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">-</button>
                                        <input name="bathrooms" type="number" min="0" className="w-12 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue="0" />
                                        <button type="button" onClick={(e) => { const i = e.currentTarget.previousElementSibling as HTMLInputElement; i.stepUp(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary/10 text-primary transition-colors text-xl leading-none shadow-sm border border-outline-variant/30 font-medium pb-1">+</button>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-sm col-span-2 md:col-span-1">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-2">straighten</span>
                                    <label className="font-label-md text-secondary mb-2">Área (m²)</label>
                                    <input name="builtArea" type="number" step="0.01" className="w-20 md:w-28 text-center border-b-2 border-outline-variant bg-transparent focus:outline-none focus:border-primary font-bold text-xl pb-1" defaultValue="0" />
                                </div>
                            </div>
                        </div>

                        {/* Multimedia */}
                        <div>
                            <h3 className="font-headline-md text-primary mb-2 border-b border-outline-variant/30 pb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">photo_library</span>
                                Galería e Imagen Principal ({gallery.length})
                            </h3>
                            <p className="text-xs text-on-surface-variant mb-4">
                                Haz clic en **"Hacer Principal"** para definir la portada del inmueble. Las imágenes se cargarán y optimizarán de forma inmediata.
                            </p>

                            {/* Grid de imágenes y botón + */}
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

                                {/* Cuadro con icono + */}
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


                            <div className="grid grid-cols-1 gap-6 pt-6 border-t border-outline-variant/30 mt-6">

                                
                                {/* PDF Upload */}
                                <div className={`relative flex flex-col items-center justify-center min-h-[180px] rounded-2xl border-2 border-dashed ${pdfPreview.name ? 'border-secondary/80 bg-secondary/10' : 'border-secondary/40 hover:border-secondary bg-secondary/5 hover:bg-secondary/10'} transition-colors shadow-sm overflow-hidden`}>
                                    <input 
                                        id="pdf-upload-input"
                                        name="pdfFile" 
                                        type="file" 
                                        accept="application/pdf" 
                                        className="hidden" 
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setPdfPreview({file: e.target.files[0], name: e.target.files[0].name});
                                            } else {
                                                setPdfPreview({file: null, name: null});
                                            }
                                        }}
                                    />
                                    {pdfPreview.name ? (
                                        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-secondary/10 p-4">
                                            <span className="material-symbols-outlined text-4xl text-secondary mb-2">task</span>
                                            <span className="font-label-lg text-secondary font-bold mb-1">PDF Seleccionado</span>
                                            <span className="text-xs text-secondary text-center font-medium max-w-full truncate px-4">{pdfPreview.name}</span>
                                            <button type="button" onClick={() => {
                                                setPdfPreview({file: null, name: null});
                                                const input = document.getElementById('pdf-upload-input') as HTMLInputElement;
                                                if (input) input.value = '';
                                            }} className="mt-3 px-4 py-2 bg-error hover:bg-error/80 text-white rounded-full text-xs font-bold flex items-center gap-1 transition-colors z-20 cursor-pointer shadow-lg">
                                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                                Borrar PDF
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="pdf-upload-input" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group w-full h-full">
                                            <span className="material-symbols-outlined text-4xl text-secondary mb-2 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                                            <span className="font-label-lg text-secondary font-bold mb-1">Subir Brochure (Opcional)</span>
                                            <span className="text-xs text-on-surface-variant text-center">Formato .pdf (Max 10MB)</span>
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
                        <div className="flex justify-end pt-6">
                            <button type="submit" disabled={loading} className="bg-primary hover:bg-primary-container hover:text-primary transition-all text-on-primary font-bold py-4 px-10 rounded-lg flex items-center gap-2 shadow-lg disabled:opacity-50">
                                {loading ? "Guardando..." : "Guardar Inmueble"}
                                <span className="material-symbols-outlined">save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
