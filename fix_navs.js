const fs = require('fs');

const pages = [
  'src/app/page.tsx',
  'src/app/propiedades/page.tsx',
  'src/app/propiedades/[id]/page.tsx',
  'src/app/blog/page.tsx'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Only inject import if not present
  if (!content.includes('import Navbar')) {
    content = content.replace('export default function', 'import Navbar from "@/components/Navbar";\n\nexport default function');
  }

  // Remove <nav>...</nav> block completely (first one)
  content = content.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/, '<Navbar />');
  
  // Remove <header>...</header> block completely IF it has z-50 or fixed (this targets the navbar headers, not internal section headers)
  content = content.replace(/<header\b[^>]*(fixed|z-50|sticky)[^>]*>[\s\S]*?<\/header>/, '<Navbar />');
  
  fs.writeFileSync(file, content);
});
