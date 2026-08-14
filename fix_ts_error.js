const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

const injectedCode = `
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

// Remove the injected code that I just put at the top of the function
layout = layout.replace(injectedCode, '');

// Put it AFTER the useState declarations
const targetStr = 'const [isMobile, setIsMobile] = useState(false)';
layout = layout.replace(targetStr, targetStr + '\\n' + injectedCode);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed TS Error");
