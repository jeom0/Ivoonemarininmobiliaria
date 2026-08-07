const fs = require('fs');
let content = fs.readFileSync('src/app/admin/reports/page.tsx', 'utf8');

// Hide Ubicación, Tipo
content = content.replace(
  '<th className="pb-3 font-label-md text-outline font-semibold">Ubicación</th>',
  '<th className="pb-3 font-label-md text-outline font-semibold hidden md:table-cell">Ubicación</th>'
);
content = content.replace(
  '<td className="py-4 border-b border-outline-variant/30 text-on-surface-variant font-body-md">{prop.city}</td>',
  '<td className="py-4 border-b border-outline-variant/30 text-on-surface-variant font-body-md hidden md:table-cell">{prop.city}</td>'
);

content = content.replace(
  '<th className="pb-3 font-label-md text-outline font-semibold">Tipo</th>',
  '<th className="pb-3 font-label-md text-outline font-semibold hidden md:table-cell">Tipo</th>'
);
content = content.replace(
  '<td className="py-4 border-b border-outline-variant/30 text-on-surface-variant font-body-md">{prop.propertyType}</td>',
  '<td className="py-4 border-b border-outline-variant/30 text-on-surface-variant font-body-md hidden md:table-cell">{prop.propertyType}</td>'
);

fs.writeFileSync('src/app/admin/reports/page.tsx', content);
console.log("Fixed Reports Table");
