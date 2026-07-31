const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// Add useEffect import
if (!layout.includes('useEffect')) {
    layout = layout.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";');
}

// Replace overflow-hidden with overflow-y-auto on sidebar
layout = layout.replace('shrink-0 overflow-hidden', 'shrink-0 overflow-y-auto');

// Add scroll lock hook inside the component
const scrollLock = `
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen]);
`;

layout = layout.replace('const [sidebarOpen, setSidebarOpen] = useState(false);', 'const [sidebarOpen, setSidebarOpen] = useState(false);\n' + scrollLock);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed admin sidebar overflow");
