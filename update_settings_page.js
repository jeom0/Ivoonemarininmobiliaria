const fs = require('fs');
let page = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf8');

// 1. Import WebsiteTab
if (!page.includes("import WebsiteTab")) {
  page = page.replace(
    'import UsersTab from "./UsersTab";',
    'import UsersTab from "./UsersTab";\nimport WebsiteTab from "./WebsiteTab";'
  );
}

// 2. Replace the placeholder for "sitio"
const placeholder = `{activeTab === 'sitio' && (
  <div className="p-8 text-center text-on-surface-variant bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
    <p>Próximamente: Integración SEO y Scripts.</p>
  </div>
)}`;
page = page.replace(placeholder, "{activeTab === 'sitio' && <WebsiteTab />}");

fs.writeFileSync('src/app/admin/settings/page.tsx', page);
console.log("Updated Settings Page");
