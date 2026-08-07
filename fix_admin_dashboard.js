const fs = require('fs');
let page = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Fix grid for cards (metrics): from grid-cols-1 to grid-cols-2 on mobile
page = page.replace(
  'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-section-gap"',
  'className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter mb-section-gap"'
);

// 2. Adjust quick action buttons to fill the screen evenly on mobile
page = page.replace(
  'className="flex flex-wrap gap-4 mb-section-gap"',
  'className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-section-gap"'
);
page = page.replace(/className="flex items-center gap-2 px-6 py-3/g, 'className="flex justify-center items-center gap-2 px-4 py-3');

// 3. Fix padding on the tables wrappers (p-8 is too big for mobile)
page = page.replace(
  'className="lg:col-span-2 bento-card rounded-2xl p-8 overflow-hidden bg-white border border-outline-variant/30 shadow-sm"',
  'className="lg:col-span-2 bento-card rounded-2xl p-4 md:p-8 overflow-hidden bg-white border border-outline-variant/30 shadow-sm"'
);
page = page.replace(
  'className="bento-card rounded-2xl p-8 bg-surface-container-low border border-outline-variant/30 shadow-sm"',
  'className="bento-card rounded-2xl p-4 md:p-8 bg-surface-container-low border border-outline-variant/30 shadow-sm"'
);

// 4. Adjust the font sizes inside the metric cards to fit 2-columns on mobile
page = page.replace(/text-\[32px\]/g, 'text-2xl md:text-[32px]');

fs.writeFileSync('src/app/admin/page.tsx', page);
console.log("Fixed dashboard metrics and tables");
