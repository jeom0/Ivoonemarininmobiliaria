const fs = require('fs');
let code = fs.readFileSync('src/app/admin/settings/WebsiteTab.tsx', 'utf8');

const defaultHeroTitle = "Encuentra el inmueble ideal con una asesoría cercana, segura y profesional.";
const defaultHeroSubtitle = "Te acompañamos en la compra, venta y arriendo de inmuebles en Pereira, Dosquebradas, Santa Rosa de Cabal y el Eje Cafetero.";
const defaultAboutTitle = '"Donde los sueños encuentran su lugar."';
const defaultAboutText = "Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso.";

code = code.replace(
  'if (data.home_hero_title) setHomeHeroTitle(data.home_hero_title);',
  `setHomeHeroTitle(data.home_hero_title || "${defaultHeroTitle}");`
);
code = code.replace(
  'if (data.home_hero_subtitle) setHomeHeroSubtitle(data.home_hero_subtitle);',
  `setHomeHeroSubtitle(data.home_hero_subtitle || "${defaultHeroSubtitle}");`
);
code = code.replace(
  'if (data.home_about_title) setHomeAboutTitle(data.home_about_title);',
  `setHomeAboutTitle(data.home_about_title || '${defaultAboutTitle}');`
);
code = code.replace(
  'if (data.home_about_text) setHomeAboutText(data.home_about_text);',
  `setHomeAboutText(data.home_about_text || "${defaultAboutText}");`
);

fs.writeFileSync('src/app/admin/settings/WebsiteTab.tsx', code);
console.log("Fixed Website Tab");
