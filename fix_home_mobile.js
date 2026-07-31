const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix Hero section height
page = page.replace(
  'className="relative h-[870px] w-full overflow-hidden"',
  'className="relative min-h-[100svh] md:h-[870px] w-full overflow-hidden pb-12 md:pb-0"'
);

// 2. Fix Hero padding
page = page.replace(
  'relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-start text-white pt-20',
  'relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-start text-white pt-28 md:pt-20'
);

// 3. Fix Hero title
page = page.replace(
  'className="font-display-lg text-4xl md:text-5xl lg:text-display-lg max-w-3xl mb-6 leading-tight"',
  'className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl mb-4 md:mb-6 leading-tight"'
);

// 4. Fix Hero subtitle
page = page.replace(
  'className="font-body-lg text-body-lg max-w-2xl mb-10 text-white/90"',
  'className="text-base md:text-lg max-w-2xl mb-8 md:mb-10 text-white/90 font-medium"'
);

// 5. Fix Conócenos title
page = page.replace(
  'className="font-display-lg text-3xl md:text-5xl lg:text-display-lg text-primary leading-tight"',
  'className="text-3xl md:text-5xl text-primary leading-tight font-bold"'
);

// 6. Fix Conócenos image height
page = page.replace(
  'className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 group"',
  'className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 group"'
);

// 7. Fix Conócenos text
page = page.replace(
  'className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-medium"',
  'className="text-base md:text-lg text-on-surface-variant leading-relaxed font-medium"'
);

// 8. Fix Services title
page = page.replace(
  'className="font-display-lg text-3xl md:text-5xl lg:text-display-lg text-primary mb-6 leading-tight"',
  'className="text-3xl md:text-5xl text-primary mb-4 md:mb-6 leading-tight font-bold"'
);

// 9. Fix Services text
page = page.replace(
  'className="font-body-lg text-body-lg text-on-surface-variant mb-8"',
  'className="text-base md:text-lg text-on-surface-variant mb-6 md:mb-8"'
);

// 10. Fix Call to Action title
page = page.replace(
  'className="font-display-lg text-3xl md:text-5xl lg:text-display-lg text-primary mb-6 relative z-10 leading-tight"',
  'className="text-3xl md:text-5xl text-primary mb-4 md:mb-6 relative z-10 leading-tight font-bold"'
);

// 11. Fix Call to Action text
page = page.replace(
  'className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10 relative z-10"',
  'className="text-base md:text-lg text-on-surface-variant max-w-2xl mb-8 md:mb-10 relative z-10"'
);

fs.writeFileSync('src/app/page.tsx', page);
console.log("Fixed homepage mobile proportions");
