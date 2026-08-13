const fs = require('fs');
let nav = fs.readFileSync('src/components/PublicNavbar.tsx', 'utf8');

// Replace the desktop link rendering to NOT use icons
const desktopLinkOld = `<div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  {link.label}
                </div>`;
const desktopLinkNew = `{link.label}`;

// Wait, the string exists twice (one for desktop, one for mobile).
// Let's use regex to replace ONLY the one inside the desktop block.
// The desktop block is inside `<div className="hidden md:flex items-center space-x-8">`
// Let's replace only the first occurrence (desktop), because mobile is below.
nav = nav.replace(desktopLinkOld, desktopLinkNew);

fs.writeFileSync('src/components/PublicNavbar.tsx', nav);
console.log("Fixed Public Navbar Icons");
