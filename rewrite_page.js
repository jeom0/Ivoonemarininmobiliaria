const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// The original file structure has:
// return (
//   <>
//     <PublicNavbar settings={settings} />
//     <section ...> (hero)
//     <section ...> (featured)
//     <section ...> (about)
//     <section ...> (novedades)
//     {/* SECCIÓN OPORTUNIDADES DE INVERSIÓN */}
//     <section ...> (investment)
//     {/* SECCIÓN BLOG */}
//     <section ...> (blog)
//     <section ...> (valor)
//     <section ...> (servicios)
//     <section ...> (zonas)
//     <section ...> (cta)
//     <PublicFooter settings={settings} />
//     {/* Floating WhatsApp Button */}
// ...

const sectionsArrayCode = `
  const defaultOrder = ['hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'];
  let sectionsOrder = defaultOrder;
  if (settings.home_sections_order) {
    try {
      const parsed = JSON.parse(settings.home_sections_order);
      sectionsOrder = parsed.map((s: any) => s.id);
    } catch(e){}
  }

  const sectionsMap: Record<string, React.ReactNode> = {
    hero: (
`;

// To accurately slice, we will find the starting index of each section.
const i1 = code.indexOf('<section className="relative min-h-[100svh]');
const i2 = code.indexOf('<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">', i1 + 1);
const i3 = code.indexOf('<section className="py-section-gap bg-surface-container-low/50 relative overflow-hidden">', i2 + 1);
const i4 = code.indexOf('<section className="py-section-gap bg-surface-container-low/30">', i3 + 1);
const i5 = code.indexOf('{/* SECCIÓN OPORTUNIDADES DE INVERSIÓN */}', i4 + 1);
const i6 = code.indexOf('{/* SECCIÓN BLOG */}', i5 + 1);
const i7 = code.indexOf('<section className="bg-primary text-on-primary py-section-gap overflow-hidden relative">', i6 + 1);
const i8 = code.indexOf('<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">', i7 + 1);
const i9 = code.indexOf('<section className="py-section-gap bg-surface-container-low">', i8 + 1);
const i10 = code.indexOf('<section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">', i9 + 1);
const iEnd = code.indexOf('<PublicFooter settings={settings} />', i10 + 1);

const heroCode = code.substring(i1, i2);
const featuredCode = code.substring(i2, i3);
const aboutCode = code.substring(i3, i4);
const novedadesCode = code.substring(i4, i5);
const investmentCode = code.substring(i5, i6);
const blogCode = code.substring(i6, i7);
const valorCode = code.substring(i7, i8);
const serviciosCode = code.substring(i8, i9);
const zonasCode = code.substring(i9, i10);
const ctaCode = code.substring(i10, iEnd);

const beforeRender = code.substring(0, i1);
const afterRender = code.substring(iEnd);

const mappedSections = 
  sectionsArrayCode +
  heroCode + `    ),\n    featured: (\n` +
  featuredCode + `    ),\n    about: (\n` +
  aboutCode + `    ),\n    novedades: (\n` +
  novedadesCode + `    ),\n    investment: (\n` +
  investmentCode + `    ),\n    blog: (\n` +
  blogCode + `    ),\n    valor: (\n` +
  valorCode + `    ),\n    servicios: (\n` +
  serviciosCode + `    ),\n    zonas: (\n` +
  zonasCode + `    ),\n    cta: (\n` +
  ctaCode + `    )\n  };\n\n`;

const finalRenderCode = `
  return (
    <>
      <PublicNavbar settings={settings} />
      {sectionsOrder.map((id, index) => (
        <React.Fragment key={index}>
          {sectionsMap[id]}
        </React.Fragment>
      ))}
      <PublicFooter settings={settings} />
`;

// Wait, the original code had:
// return (
//   <>
//     <PublicNavbar settings={settings} />
// So `beforeRender` ends with `<PublicNavbar settings={settings} />\n\n`
// I need to properly remove the original `return (`.

const pureBeforeRender = code.substring(0, code.indexOf('return ('));
const pureAfterRender = code.substring(code.indexOf('<PublicFooter settings={settings} />') + '<PublicFooter settings={settings} />'.length);

const fullCode = pureBeforeRender + mappedSections + 
`  return (
    <>
      <PublicNavbar settings={settings} />
      {sectionsOrder.map((id, index) => (
        <div key={index}>
          {sectionsMap[id]}
        </div>
      ))}
      <PublicFooter settings={settings} />` + pureAfterRender;

// Need to import React for React.Fragment or just use div. I'll use div with key.
// Wait, wrapping in div might mess up some nth-child CSS if any, but since they are sections, it's fine.

fs.writeFileSync('src/app/page.tsx', fullCode);
console.log("page.tsx updated");
