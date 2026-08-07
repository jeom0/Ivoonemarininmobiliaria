const fs = require('fs');
let nav = fs.readFileSync('src/components/PublicNavbar.tsx', 'utf8');

nav = nav.replace(
  'export default function PublicNavbar() {',
  'export default function PublicNavbar({ settings }: { settings?: any }) {\n  const s = settings || {};'
);

const oldLogoHTML = `<span className="text-headline-md font-headline-lg text-primary tracking-tight cursor-pointer">
              Ivonne Marin
            </span>`;
const newLogoHTML = `{s.logoUrl ? (
              <img src={s.logoUrl} alt={s.agencyName || "Logo"} className="h-12 w-auto object-contain" />
            ) : (
              <span className="text-headline-md font-headline-lg text-primary tracking-tight cursor-pointer">
                {s.agencyName || "Ivonne Marin"}
              </span>
            )}`;

nav = nav.replace(oldLogoHTML, newLogoHTML);

fs.writeFileSync('src/components/PublicNavbar.tsx', nav);
console.log("Updated Public Navbar Logo");
