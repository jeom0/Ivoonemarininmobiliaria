const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// 1. Add import
if (!layout.includes('NotificationsDropdown')) {
  layout = layout.replace('import { usePathname, useRouter } from "next/navigation"', 'import { usePathname, useRouter } from "next/navigation"\nimport NotificationsDropdown from "./components/NotificationsDropdown"');
}

// 2. Replace static button with component
const oldButton = `<button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface"></span>
        </button>`;
        
const newButton = `<NotificationsDropdown />`;

layout = layout.replace(oldButton, newButton);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed notifications icon in layout");
