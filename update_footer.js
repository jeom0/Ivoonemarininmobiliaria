const fs = require('fs');
let code = fs.readFileSync('src/components/PublicFooter.tsx', 'utf8');

// Helper to get icon name
const helperFunction = `  const getIcon = (platform: string) => {
    switch(platform) {
      case 'facebook': return 'public';
      case 'instagram': return 'photo_camera';
      case 'tiktok': return 'music_note';
      case 'youtube': return 'play_arrow';
      case 'linkedin': return 'work';
      case 'whatsapp': return 'chat';
      default: return 'link';
    }
  };
  
  let socialLinks: {platform: string, url: string}[] = [];
  try {
    if (s.social_links) socialLinks = JSON.parse(s.social_links);
  } catch(e){}
`;

code = code.replace('const s = settings || {};', 'const s = settings || {};\n' + helperFunction);

// Replace hardcoded socials with dynamic array
const oldSocials = `{s.instagram && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={s.instagram} target="_blank">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </Link>
            )}
            {s.facebook && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={s.facebook} target="_blank">
                <span className="material-symbols-outlined text-lg">public</span>
              </Link>
            )}`;

const newSocials = `{socialLinks.map((link, idx) => (
              <Link key={idx} className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={link.url} target="_blank" title={link.platform}>
                <span className="material-symbols-outlined text-lg">{getIcon(link.platform)}</span>
              </Link>
            ))}
            {socialLinks.length === 0 && s.instagram && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={s.instagram} target="_blank">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </Link>
            )}
            {socialLinks.length === 0 && s.facebook && (
              <Link className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-all" href={s.facebook} target="_blank">
                <span className="material-symbols-outlined text-lg">public</span>
              </Link>
            )}`;
code = code.replace(oldSocials, newSocials);

// Add Santa Rosa to zones
const oldZones = `<li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Pereira</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Dosquebradas</Link></li>`;
const newZones = `<li><Link className="text-primary-fixed hover:text-white transition-colors font-label-md font-bold" href="#">Santa Rosa de Cabal (Sede Principal)</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Pereira</Link></li>
            <li><Link className="text-on-primary/80 hover:text-secondary-fixed transition-colors font-label-md" href="#">Dosquebradas</Link></li>`;
code = code.replace(oldZones, newZones);

// Change default address
code = code.replace(
  's.address || "Pereira, Risaralda, Colombia"',
  's.address || "Santa Rosa de Cabal, Risaralda, Colombia"'
);

fs.writeFileSync('src/components/PublicFooter.tsx', code);
console.log("Footer updated");
