const fs = require('fs');
let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

// The line is: className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 ...`}
// Also the logout button has it. Also the help button. Also the profile link!
// Profile Link:
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 hover:bg-surface-container-high py-2 rounded-xl' : 'justify-center'}",
  "${sidebarOpen ? 'gap-3 hover:bg-surface-container-high py-2 rounded-xl' : 'pl-2'}"
);

// Nav Items:
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}",
  "${sidebarOpen ? 'gap-3 px-4' : 'pl-2 px-0'}"
);
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}", // For Help button
  "${sidebarOpen ? 'gap-3 px-4' : 'pl-2 px-0'}"
);
layout = layout.replace(
  "${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'}", // For Logout button
  "${sidebarOpen ? 'gap-3 px-4' : 'pl-2 px-0'}"
);

// Header Logo area:
layout = layout.replace(
  "${sidebarOpen ? 'justify-between px-2' : 'justify-center w-full'}",
  "${sidebarOpen ? 'justify-between px-2' : 'pl-2 w-full'}"
);

fs.writeFileSync('src/app/admin/layout.tsx', layout);
console.log("Fixed Admin Layout Nav Items Alignment");
