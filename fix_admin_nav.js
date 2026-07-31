const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// Remove the `hidden md:block` logic from main
layout = layout.replace(
  'md:p-8 p-4 pt-24 md:pt-8 ${sidebarOpen ? "hidden md:block" : "block"}',
  'md:p-8 p-4 pt-24 md:pt-8'
);

// Add the bulletproof iOS scroll lock logic to useEffect based on sidebarOpen
// We already have a sidebarOpen state and useEffects. We will inject one more useEffect for scroll lock.

const scrollEffect = `
  // iOS Safari bulletproof scroll lock
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + window.scrollY + 'px';
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [sidebarOpen, isMobile]);
`;

layout = layout.replace('export default function AdminLayout({ children }: { children: React.ReactNode }) {', 'export default function AdminLayout({ children }: { children: React.ReactNode }) {\n' + scrollEffect);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed AdminLayout scroll lock");
