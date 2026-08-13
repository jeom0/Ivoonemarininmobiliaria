const fs = require('fs');
let content = fs.readFileSync('src/app/admin/blog/page.tsx', 'utf8');

// Header
content = content.replace(
  '<th className="p-4 font-label-md text-on-surface-variant font-medium">Categoría</th>',
  '<th className="p-4 font-label-md text-on-surface-variant font-medium hidden md:table-cell">Categoría</th>'
);
content = content.replace(
  '<th className="p-4 font-label-md text-on-surface-variant font-medium">Estado</th>',
  '<th className="p-4 font-label-md text-on-surface-variant font-medium hidden md:table-cell">Estado</th>'
);

// Body
content = content.replace(
  '<td className="p-4 font-body-md text-on-surface-variant">{post.category || "-"}</td>',
  '<td className="p-4 font-body-md text-on-surface-variant hidden md:table-cell">{post.category || "-"}</td>'
);
content = content.replace(
  '<td className="p-4">\n                      <span className={`px-2 py-1 rounded-full text-[12px] font-label-md ${post.status === \'PUBLISHED\' ? \'bg-primary-container text-on-primary-container\' : \'bg-surface-container-highest text-on-surface\'}`}>\n                        {post.status}\n                      </span>\n                    </td>',
  '<td className="p-4 hidden md:table-cell">\n                      <span className={`px-2 py-1 rounded-full text-[12px] font-label-md ${post.status === \'PUBLISHED\' ? \'bg-primary-container text-on-primary-container\' : \'bg-surface-container-highest text-on-surface\'}`}>\n                        {post.status}\n                      </span>\n                    </td>'
);

fs.writeFileSync('src/app/admin/blog/page.tsx', content);
console.log("Fixed Blog Table");
