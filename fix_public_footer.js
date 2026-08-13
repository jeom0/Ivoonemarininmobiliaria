const fs = require('fs');
let footer = fs.readFileSync('src/components/PublicFooter.tsx', 'utf8');

footer = footer.replace(
  'export default function PublicFooter() {',
  'export default function PublicFooter({ settings }: { settings?: any }) {\n  const s = settings || {};'
);

footer = footer.replace(
  '<span className="font-headline-md text-on-primary tracking-tight">Ivonne Marin</span>',
  '<span className="font-headline-md text-on-primary tracking-tight">{s.agencyName || "Ivonne Marin"}</span>'
);

footer = footer.replace(
  '<span className="font-body-md">+57 300 000 0000</span>',
  '<span className="font-body-md">{s.whatsapp || "+57 300 000 0000"}</span>'
);

footer = footer.replace(
  '<span className="font-body-md">Pereira, Risaralda, Colombia</span>',
  '<span className="font-body-md">{s.address || "Pereira, Risaralda, Colombia"}</span>'
);

// For social networks:
footer = footer.replace(
  '<Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href="#">\n              <span className="material-symbols-outlined text-lg">share</span>\n            </Link>',
  `{s.instagram && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={s.instagram} target="_blank">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </Link>
            )}`
);

footer = footer.replace(
  '<Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href="#">\n              <span className="material-symbols-outlined text-lg">public</span>\n            </Link>',
  `{s.facebook && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={s.facebook} target="_blank">
                <span className="material-symbols-outlined text-lg">public</span>
              </Link>
            )}`
);

fs.writeFileSync('src/components/PublicFooter.tsx', footer);
console.log("Updated Public Footer");
