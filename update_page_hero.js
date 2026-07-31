const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const importStatement = `import PublicFooter from "@/components/PublicFooter";\nimport HeroCarousel from "@/components/HeroCarousel";`;
code = code.replace(`import PublicFooter from "@/components/PublicFooter";`, importStatement);

const oldHeroBlockStart = `<section className="relative min-h-[100svh] md:h-[870px] w-full overflow-hidden pb-12 md:pb-0">`;
const oldHeroBlockEnd = `</section>`;

// Extract the old hero block
const heroStartIndex = code.indexOf(oldHeroBlockStart);
if (heroStartIndex !== -1) {
  // Need to find the exact end. There's only one </section> in the hero block before the next key `featured: (<>`
  const nextKeyIndex = code.indexOf('featured: (<>');
  const heroBlock = code.substring(heroStartIndex, nextKeyIndex);
  
  // Actually, I can just replace from oldHeroBlockStart up to the next `featured: (<>`
  
  // Wait, I also need to parse `settings.hero_media`.
  const defaultZonesBlock = `  const defaultOrder = ['hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'];`;
  const mediaParseBlock = `  let heroMedia: string[] = [];
  if (settings.hero_media) {
    try {
      heroMedia = JSON.parse(settings.hero_media);
    } catch(e) {}
  }
  if (heroMedia.length === 0 && settings.heroImage) {
    heroMedia = [settings.heroImage];
  }
  
  const defaultOrder = ['hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'];`;
  
  code = code.replace(defaultZonesBlock, mediaParseBlock);
  
  // Replace the hero block in sectionsMap
  const newHeroJSX = `<HeroCarousel media={heroMedia} title={settings.home_hero_title} subtitle={settings.home_hero_subtitle} />\n    `;
  
  // Find where `hero: (<>` is
  const heroKeyIndex = code.indexOf('hero: (<>');
  if (heroKeyIndex !== -1) {
    const endOfHero = code.indexOf('</>),', heroKeyIndex);
    const beforeHero = code.substring(0, heroKeyIndex + 'hero: (<>\n'.length);
    const afterHero = code.substring(endOfHero);
    code = beforeHero + newHeroJSX + afterHero;
  }
}

fs.writeFileSync('src/app/page.tsx', code);
console.log("Hero updated in page.tsx");
