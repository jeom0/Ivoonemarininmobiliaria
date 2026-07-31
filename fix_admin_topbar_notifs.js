const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

const oldTopBar = `{/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant/30 z-40 flex items-center justify-between px-4 shadow-sm">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col items-center justify-center">
          <span className="font-headline-md text-primary font-bold tracking-tighter text-lg leading-none">ivonne</span>
          <span className="font-headline-md text-primary font-bold tracking-tighter text-lg leading-none -mt-1">marin.</span>
        </div>
        <div className="w-10"></div> {/* Spacer to center the logo */}
      </div>`;

const newTopBar = `{/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant/30 z-40 flex items-center justify-between px-4 shadow-sm">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col items-center justify-center">
          <span className="font-headline-md text-primary font-bold tracking-tighter text-lg leading-none">ivonne</span>
          <span className="font-headline-md text-primary font-bold tracking-tighter text-lg leading-none -mt-1">marin.</span>
        </div>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface"></span>
        </button>
      </div>`;

layout = layout.replace(oldTopBar, newTopBar);
fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Added notifications icon to mobile navbar");
