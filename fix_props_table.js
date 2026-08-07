const fs = require('fs');
let content = fs.readFileSync('src/app/admin/properties/PropertiesTable.tsx', 'utf8');

content = content.replace('min-w-[900px]', 'min-w-full md:min-w-[900px]');

// Hide Código
content = content.replace(
  '<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Código</th>',
  '<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] hidden md:table-cell">Código</th>'
);
content = content.replace(
  '<td className="p-4 font-label-md text-on-surface-variant">IM-{p.id.substring(0, 4).toUpperCase()}</td>',
  '<td className="p-4 font-label-md text-on-surface-variant hidden md:table-cell">IM-{p.id.substring(0, 4).toUpperCase()}</td>'
);

// Hide Tipo
content = content.replace(
  '<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Tipo / Operación</th>',
  '<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] hidden md:table-cell">Tipo / Operación</th>'
);
content = content.replace(
  '<td className="p-4">\n                    <div className="flex flex-col">\n                      <span className="text-body-md">{p.propertyType}</span>\n                      <span className="text-[12px] text-secondary-fixed-variant font-medium capitalize">{p.modality.toLowerCase()}</span>\n                    </div>\n                  </td>',
  '<td className="p-4 hidden md:table-cell">\n                    <div className="flex flex-col">\n                      <span className="text-body-md">{p.propertyType}</span>\n                      <span className="text-[12px] text-secondary-fixed-variant font-medium capitalize">{p.modality.toLowerCase()}</span>\n                    </div>\n                  </td>'
);

// Hide Destacado
content = content.replace(
  '<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-center">Destacado</th>',
  '<th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-center hidden md:table-cell">Destacado</th>'
);
content = content.replace(
  '<td className="p-4 text-center">\n                    <button \n                      onClick={() => handleToggleFeatured(p.id, p.isFeatured)}\n                      className={`w-10 h-6 rounded-full relative inline-flex items-center px-1 transition-all ${p.isFeatured ? \'bg-primary\' : \'bg-surface-container-highest\'}`}\n                    >\n                      <span className={`w-4 h-4 bg-white rounded-full transition-transform ${p.isFeatured ? \'translate-x-4\' : \'translate-x-0\'}`}></span>\n                    </button>\n                  </td>',
  '<td className="p-4 text-center hidden md:table-cell">\n                    <button \n                      onClick={() => handleToggleFeatured(p.id, p.isFeatured)}\n                      className={`w-10 h-6 rounded-full relative inline-flex items-center px-1 transition-all ${p.isFeatured ? \'bg-primary\' : \'bg-surface-container-highest\'}`}\n                    >\n                      <span className={`w-4 h-4 bg-white rounded-full transition-transform ${p.isFeatured ? \'translate-x-4\' : \'translate-x-0\'}`}></span>\n                    </button>\n                  </td>'
);

fs.writeFileSync('src/app/admin/properties/PropertiesTable.tsx', content);
console.log("Fixed PropertiesTable");
