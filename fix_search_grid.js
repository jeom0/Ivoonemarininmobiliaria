const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix search form grid
page = page.replace(
  '<div className="grid grid-cols-1 md:grid-cols-5 gap-4">',
  '<div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">'
);
page = page.replace(
  '<div className="flex items-end">',
  '<div className="flex items-end col-span-2 md:col-span-1 mt-2 md:mt-0">'
);

fs.writeFileSync('src/app/page.tsx', page);
console.log("Fixed Search Grid");
