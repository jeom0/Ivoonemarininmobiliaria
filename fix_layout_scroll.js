const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// 1. Remove the old messy body.overflow = 'hidden' useEffect since it doesn't work well on iOS.
// Find the useEffect block and comment it out or remove its internals.
layout = layout.replace(/useEffect\(\(\) => \{\n    if \(sidebarOpen && window\.innerWidth < 768\) \{[\s\S]*?\}, \[sidebarOpen\]\);/, '');

// 2. Hide the main content when sidebar is open on mobile
const oldMain = '<main className="flex-1 min-h-screen bg-background overflow-x-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:p-8 p-4 pt-24 md:pt-8">';
const newMain = '<main className={`flex-1 min-h-screen bg-background overflow-x-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:p-8 p-4 pt-24 md:pt-8 ${sidebarOpen ? "hidden md:block" : "block"}`}>';

layout = layout.replace(oldMain, newMain);

// 3. Make sure the aside has overscroll-contain
layout = layout.replace('shrink-0 overflow-y-auto', 'shrink-0 overflow-y-auto overscroll-contain');

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed layout scroll via hidden main");
