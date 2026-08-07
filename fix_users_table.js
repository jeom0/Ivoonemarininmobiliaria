const fs = require('fs');
let content = fs.readFileSync('src/app/admin/settings/UsersTab.tsx', 'utf8');

// Hide Rol, Fecha, Ultimo Acceso
content = content.replace(
  '<th className="pb-4 font-semibold">Rol</th>',
  '<th className="pb-4 font-semibold hidden md:table-cell">Rol</th>'
);
content = content.replace(
  '<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant">{user.role}</td>',
  '<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant hidden md:table-cell">{user.role}</td>'
);

content = content.replace(
  '<th className="pb-4 font-semibold">Fecha Registro</th>',
  '<th className="pb-4 font-semibold hidden md:table-cell">Fecha Registro</th>'
);
content = content.replace(
  '<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>',
  '<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>'
);

content = content.replace(
  '<th className="pb-4 font-semibold">Último Acceso</th>',
  '<th className="pb-4 font-semibold hidden md:table-cell">Último Acceso</th>'
);
content = content.replace(
  '<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm">Pronto</td>',
  '<td className="py-4 border-b border-outline-variant/10 text-on-surface-variant text-sm hidden md:table-cell">Pronto</td>'
);

fs.writeFileSync('src/app/admin/settings/UsersTab.tsx', content);
console.log("Fixed Users Table");
