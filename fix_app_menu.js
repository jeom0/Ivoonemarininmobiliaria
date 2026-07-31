const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// 1. Remove the messy iOS scroll hack and replace with a cleaner body overflow lock
const newScrollLock = `
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);
`;

// It might be hard to match the old scroll lock exactly due to whitespace, so let's use a regex
layout = layout.replace(/useEffect\(\(\) => \{\n    if \(sidebarOpen && window.innerWidth < 768\) \{[\s\S]*?\}, \[sidebarOpen\]\);/m, newScrollLock.trim());

// 2. Change the sidebar widths to be w-full on mobile
// Old: w-64 translate-x-0' : '-translate-x-full w-64 md:translate-x-0 md:w-20
layout = layout.replace(
  "sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full w-64 md:translate-x-0 md:w-20'",
  "sidebarOpen ? 'w-full md:w-64 translate-x-0' : '-translate-x-full w-full md:w-64 md:translate-x-0 md:w-20'"
);

// 3. Add a close button to the mobile sidebar header
const oldHeader = `{/* Desktop Hamburger Toggle (Inside sidebar) */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-300 shrink-0"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
        </div>`;

const newHeader = `{/* Desktop Hamburger Toggle (Inside sidebar) */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-300 shrink-0"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            {/* Mobile Close Button */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden flex p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-300 shrink-0"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
        </div>`;

layout = layout.replace(oldHeader, newHeader);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed mobile menu behavior");
