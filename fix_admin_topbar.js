const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// Replace the solitary mobile hamburger toggle with a proper sticky top bar
const oldHamburger = `{/* Mobile Hamburger Toggle (Visible only on mobile) */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-surface-container rounded-lg shadow-md text-on-surface-variant hover:text-primary transition-colors md:hidden"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>`;

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
        <div className="w-10"></div> {/* Spacer to center the logo */}
      </div>`;

layout = layout.replace(oldHamburger, newTopBar);

// We should also adjust the main container padding to account for the sticky top bar.
// Instead of `pt-20 md:pt-8` we can use `pt-24 md:pt-8` just to be safe.
layout = layout.replace('md:p-8 p-4 pt-20 md:pt-8', 'md:p-8 p-4 pt-24 md:pt-8');

// Ensure the sidebar overlay is z-50 and the sidebar is z-50 so they cover the top bar
// The sidebar overlay is currently z-40. Let's make it z-50.
layout = layout.replace('className={`fixed inset-0 bg-black/50 z-40', 'className={`fixed inset-0 bg-black/50 z-[45]');

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed admin top bar");
