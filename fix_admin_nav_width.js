const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

layout = layout.replace(
  "-translate-x-full w-full md:w-64 md:translate-x-0 md:w-20",
  "-translate-x-full w-full md:w-20 md:translate-x-0"
);

// We should also center the items now, because a 20-unit (80px) sidebar with `pl-2` might look weird if not centered, but let's see. `pl-2` is padding-left: 0.5rem (8px). 80px wide means 8px padding, icon is 24px... 8+24 = 32px. Center is 40px. 
// Let's restore the `justify-center` for collapsed state, because it was probably right! The issue was the sidebar wasn't collapsing!
// Let's revert my previous `pl-2` back to `justify-center px-0`
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 px-4' : 'pl-2 px-0'}",
  "${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}"
);
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 px-4' : 'pl-2 px-0'}",
  "${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}"
);
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 px-4' : 'pl-2 px-0'}",
  "${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}"
);
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 hover:bg-surface-container-high py-2 rounded-xl' : 'pl-2'}",
  "${sidebarOpen ? 'gap-3 hover:bg-surface-container-high py-2 rounded-xl' : 'justify-center'}"
);
layout = layout.replace(
  "${sidebarOpen ? 'justify-between px-2' : 'pl-2 w-full'}",
  "${sidebarOpen ? 'justify-between px-2' : 'justify-center w-full'}"
);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed Admin Layout Nav Width");
