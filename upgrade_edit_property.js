const fs = require('fs');
let code = fs.readFileSync('src/app/admin/properties/[id]/edit/page.tsx', 'utf8');

// Replace the image upload logic
const oldImgLogic = `// Si el usuario seleccionó un archivo de imagen
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
            }`;

const newImgLogic = `// Multiple images upload
            let imagesArr = [];
            try { imagesArr = JSON.parse(property?.images || '[]'); } catch(e){}
            const imagesInput = e.currentTarget.querySelector('input[name="imagesFiles"]') as HTMLInputElement;
            if (imagesInput && imagesInput.files && imagesInput.files.length > 0) {
                const uploadedImages = [];
                for (let i = 0; i < imagesInput.files.length; i++) {
                    const file = imagesInput.files[i];
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", file);
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
            }`;

code = code.replace(oldImgLogic, newImgLogic);

// Replace video upload logic
const oldVideoLogic = `// Video upload
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
            }`;

const newVideoLogic = `// Multiple video upload
            let videosUrl = property.videos;
            const videoInput = e.currentTarget.querySelector('input[name="videoFiles"]') as HTMLInputElement;
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
            }`;
code = code.replace(oldVideoLogic, newVideoLogic);

// Replace pdf upload logic
const oldPdfLogic = `// PDF upload
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
            }`;

const newPdfLogic = `// Multiple PDF upload
            let pdfsUrl = property.documents;
            const pdfInput = e.currentTarget.querySelector('input[name="pdfFiles"]') as HTMLInputElement;
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
            }`;
code = code.replace(oldPdfLogic, newPdfLogic);

// Add images back to data
code = code.replace(
  'const propertyData: any = { ...data, mainImage: mainImageUrl, videos: videosUrl, documents: pdfsUrl };',
  'const propertyData: any = { ...data, mainImage: mainImageUrl, images: JSON.stringify(imagesArr), videos: videosUrl, documents: pdfsUrl };'
);

// Cleanup fields
code = code.replace('delete propertyData.mainImageFile;', 'delete propertyData.imagesFiles;');
code = code.replace('delete propertyData.videoFile;', 'delete propertyData.videoFiles;');
code = code.replace('delete propertyData.pdfFile;', 'delete propertyData.pdfFiles;');

// UI Inputs replace
code = code.replace(
  '<label className="font-label-md text-secondary block mb-2">Cambiar Imagen Principal (Subir Archivo)</label>',
  '<label className="font-label-md text-secondary block mb-2">Reemplazar Imágenes (Selecciona varias)</label>'
);
code = code.replace(
  'name="mainImageFile" type="file" accept="image/*" className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"',
  'name="imagesFiles" type="file" accept="image/*" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"'
);
code = code.replace(
  '<label className="font-label-md text-secondary block mb-2">Cambiar Video (Subir .mp4, etc)</label>',
  '<label className="font-label-md text-secondary block mb-2">Reemplazar Videos (Subir varios)</label>'
);
code = code.replace(
  'name="videoFile" type="file" accept="video/*" className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"',
  'name="videoFiles" type="file" accept="video/*" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"'
);
code = code.replace(
  '<label className="font-label-md text-secondary block mb-2">Cambiar PDF de Información Extendida</label>',
  '<label className="font-label-md text-secondary block mb-2">Reemplazar PDFs de Información (Varios)</label>'
);
code = code.replace(
  'name="pdfFile" type="file" accept="application/pdf" className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"',
  'name="pdfFiles" type="file" accept="application/pdf" multiple className="w-full border-outline-variant rounded-lg p-3 bg-surface focus:ring-primary focus:border-primary"'
);

fs.writeFileSync('src/app/admin/properties/[id]/edit/page.tsx', code);
console.log("Upgraded Edit Property Form");
