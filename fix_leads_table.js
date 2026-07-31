const fs = require('fs');
let content = fs.readFileSync('src/app/admin/leads/LeadsTable.tsx', 'utf8');

// Table min-width
content = content.replace('min-w-[800px]', 'min-w-full md:min-w-[800px]');

// Hide Mensaje column on mobile
content = content.replace('<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Mensaje</th>', '<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Mensaje</th>');
content = content.replace('<td className="py-4 px-6">\n                    <span className="text-[14px] text-on-surface-variant line-clamp-2 max-w-[200px]">\n                      {lead.message ? lead.message.substring(0, 60) + (lead.message.length > 60 ? \'...\' : \'\') : \'Sin mensaje\'}\n                    </span>\n                  </td>', '<td className="py-4 px-6 hidden md:table-cell">\n                    <span className="text-[14px] text-on-surface-variant line-clamp-2 max-w-[200px]">\n                      {lead.message ? lead.message.substring(0, 60) + (lead.message.length > 60 ? \'...\' : \'\') : \'Sin mensaje\'}\n                    </span>\n                  </td>');

// Hide Tipo column on mobile
content = content.replace('<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Tipo</th>', '<th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Tipo</th>');
content = content.replace('<td className="py-4 px-6">\n                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">\n                      <span className="material-symbols-outlined text-sm">language</span>\n                      {lead.type === "VISIT" ? "Visita" : "Contacto"}\n                    </span>\n                  </td>', '<td className="py-4 px-6 hidden md:table-cell">\n                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">\n                      <span className="material-symbols-outlined text-sm">language</span>\n                      {lead.type === "VISIT" ? "Visita" : "Contacto"}\n                    </span>\n                  </td>');

// Show Actions completely on mobile (remove opacity-0)
content = content.replace('className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"', 'className="flex justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity"');

fs.writeFileSync('src/app/admin/leads/LeadsTable.tsx', content);
console.log("Fixed LeadsTable");
