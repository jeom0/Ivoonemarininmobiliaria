const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// 1. Fix the top padding so the hamburger button doesn't overlap the content, and content isn't cut off.
layout = layout.replace(
  'md:p-margin-desktop p-margin-mobile',
  'md:p-8 p-4 pt-20 md:pt-8'
);

// 2. Fix the scroll lock for iOS/Safari
const oldScrollLock = `
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

const newScrollLock = `
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // iOS Safari hack
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = \`-\${window.scrollY}px\`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [sidebarOpen]);
`;

layout = layout.replace(oldScrollLock.trim(), newScrollLock.trim());

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed admin layout");
