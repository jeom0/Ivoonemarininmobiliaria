const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// The default texts:
const defaultHeroTitle = "Encuentra el inmueble ideal con una asesoría cercana, segura y profesional.";
const defaultHeroSubtitle = "Te acompañamos en la compra, venta y arriendo de inmuebles en Pereira, Dosquebradas, Santa Rosa de Cabal y el Eje Cafetero.";
const defaultAboutTitle = '"Donde los sueños<br/>encuentran su lugar."';
const defaultAboutText = "Transformar vidas conectando personas con oportunidades inmobiliarias que impulsen su bienestar, patrimonio y crecimiento, construyendo relaciones basadas en la confianza, la transparencia y el compromiso.";

page = page.replace(
  defaultHeroTitle,
  `{settings.home_hero_title || "${defaultHeroTitle}"}`
);

page = page.replace(
  defaultHeroSubtitle,
  `{settings.home_hero_subtitle || "${defaultHeroSubtitle}"}`
);

// For the about title, it has a <br/> inside, we can just replace it entirely or allow setting to be simple text without HTML.
page = page.replace(
  `"Donde los sueños<br/>encuentran su lugar."`,
  `{settings.home_about_title || '"Donde los sueños encuentran su lugar."'}`
);

page = page.replace(
  defaultAboutText,
  `{settings.home_about_text || "${defaultAboutText}"}`
);

fs.writeFileSync('src/app/page.tsx', page);
console.log("Wired CMS to Homepage");
