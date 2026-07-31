const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix Hero Text
content = content.replace(
  'h1 className="font-display-lg text-display-lg max-w-3xl mb-6"',
  'h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg max-w-3xl mb-6 leading-tight"'
);

// Fix other text-display-lg that cause overflow on mobile
content = content.replace(
  'h2 className="font-display-lg text-display-lg text-primary">"Donde los sueños<br/>encuentran su lugar."</h2>',
  'h2 className="font-display-lg text-3xl md:text-5xl lg:text-display-lg text-primary leading-tight">"Donde los sueños<br/>encuentran su lugar."</h2>'
);

content = content.replace(
  'h2 className="font-display-lg text-display-lg text-primary mb-6">Servicios diseñados para tu tranquilidad</h2>',
  'h2 className="font-display-lg text-3xl md:text-5xl lg:text-display-lg text-primary mb-6 leading-tight">Servicios diseñados para tu tranquilidad</h2>'
);

content = content.replace(
  'h2 className="font-display-lg text-display-lg text-primary mb-6 relative z-10">¿Listo para encontrar o vender tu inmueble?</h2>',
  'h2 className="font-display-lg text-3xl md:text-5xl lg:text-display-lg text-primary mb-6 relative z-10 leading-tight">¿Listo para encontrar o vender tu inmueble?</h2>'
);

content = content.replace(
  'h2 className="font-display-lg text-display-lg">¿Por qué confiar en nosotros?</h2>',
  'h2 className="font-display-lg text-3xl md:text-5xl lg:text-display-lg leading-tight">¿Por qué confiar en nosotros?</h2>'
);

// Search bar in hero: fix the grid for mobile (grid-cols-1 is fine, but buttons might overflow if not padded properly, though it has p-6)

fs.writeFileSync('src/app/page.tsx', content);
console.log("Fixed page.tsx text sizing.");
