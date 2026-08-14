const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/SettingsForm.tsx', 'utf8');

const targetStr = `  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {`;

const newFunc = `  const handleImageUpload = async (file: File, type: 'logo' | 'hero') => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (type === 'logo') setLogoPreview(data.url);
        if (type === 'hero') setHeroMedia([...heroMedia, data.url]);
      } else {
        alert("Error al subir archivo");
      }
    } catch (err) {
      alert("Error de red");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {`;

code = code.replace(targetStr, newFunc);
fs.writeFileSync('src/app/admin/settings/SettingsForm.tsx', code);
console.log("Injected handleImageUpload");
