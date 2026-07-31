const fs = require('fs');
let code = fs.readFileSync('src/app/admin/properties/new/page.tsx', 'utf8');

// Replace the image upload logic
const oldImgLogic = `// Si el usuario seleccionó un archivo
            const fileInput = e.currentTarget.querySelector('input[name="mainImageFile"]') as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const uploadFormData = new FormData();
                uploadFormData.append("file", file);
                
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    mainImageUrl = uploadData.url;
                } else {
                    alert("Error al subir la imagen. Procediendo sin imagen.");
                }
            }`;

const newImgLogic = `// Multiple images upload
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
                    mainImageUrl = uploadedImages[0];
                    data.images = JSON.stringify(uploadedImages);
                } else {
                    alert("Error al subir las imágenes. Procediendo sin imágenes.");
                }
            }`;

code = code.replace(oldImgLogic, newImgLogic);

// Replace video upload logic
const oldVideoLogic = `// Video upload
            const videoInput = e.currentTarget.querySelector('input[name="videoFile"]') as HTMLInputElement;
            if (videoInput && videoInput.files && videoInput.files.length > 0) {
                const file = videoInput.files[0];
                const uploadFormData = new FormData();
                uploadFormData.append("file", file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    data.videos = JSON.stringify([uploadData.url]);
                }
            }`;

const newVideoLogic = `// Multiple video upload
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
                if (uploadedVideos.length > 0) data.videos = JSON.stringify(uploadedVideos);
            }`;
code = code.replace(oldVideoLogic, newVideoLogic);

// Replace pdf upload logic
const oldPdfLogic = `// PDF upload
            const pdfInput = e.currentTarget.querySelector('input[name="pdfFile"]') as HTMLInputElement;
            if (pdfInput && pdfInput.files && pdfInput.files.length > 0) {
                const file = pdfInput.files[0];
                const uploadFormData = new FormData();
                uploadFormData.append("file", file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    data.documents = JSON.stringify([uploadData.url]);
                }
            }`;

const newPdfLogic = `// Multiple PDF upload
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
                if (uploadedPdfs.length > 0) data.documents = JSON.stringify(uploadedPdfs);
            }`;
code = code.replace(oldPdfLogic, newPdfLogic);

// Cleanup fields
code = code.replace('delete propertyData.mainImageFile;', 'delete propertyData.imagesFiles;');
code = code.replace('delete propertyData.videoFile;', 'delete propertyData.videoFiles;');
code = code.replace('delete propertyData.pdfFile;', 'delete propertyData.pdfFiles;');

// UI Inputs replace
code = code.replace(
  '<label className="font-label-md text-secondary">Imagen Principal *</label>',
  '<label className="font-label-md text-secondary">Imágenes del Inmueble * (Selecciona varias)</label>'
);
code = code.replace(
  'name="mainImageFile" type="file" accept="image/*" required className="w-full bg-surface"',
  'name="imagesFiles" type="file" accept="image/*" multiple required className="w-full bg-surface border border-outline-variant p-2 rounded-lg"'
);
code = code.replace(
  '<label className="font-label-md text-secondary">Video Promocional (Opcional)</label>',
  '<label className="font-label-md text-secondary">Videos Promocionales (Opcional)</label>'
);
code = code.replace(
  'name="videoFile" type="file" accept="video/*" className="w-full bg-surface border border-outline-variant p-2 rounded-lg"',
  'name="videoFiles" type="file" accept="video/*" multiple className="w-full bg-surface border border-outline-variant p-2 rounded-lg"'
);
code = code.replace(
  '<label className="font-label-md text-secondary">Brochure / PDF (Opcional)</label>',
  '<label className="font-label-md text-secondary">Brochures / PDFs (Opcional)</label>'
);
code = code.replace(
  'name="pdfFile" type="file" accept=".pdf" className="w-full bg-surface border border-outline-variant p-2 rounded-lg"',
  'name="pdfFiles" type="file" accept=".pdf" multiple className="w-full bg-surface border border-outline-variant p-2 rounded-lg"'
);

fs.writeFileSync('src/app/admin/properties/new/page.tsx', code);
console.log("Upgraded New Property Form");
