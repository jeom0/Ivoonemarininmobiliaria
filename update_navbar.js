const fs = require('fs');
let code = fs.readFileSync('src/components/PublicNavbar.tsx', 'utf8');

const oldNavLinks = `  const navLinks = [
    { label: "Inicio", href: "/", icon: "home" },
    { label: "Inmuebles", href: "/propiedades", icon: "domain" },
    { label: "Nosotros", href: "/nosotros", icon: "groups" },
    { label: "Vender", href: "/vender", icon: "sell" },
    { label: "Arrendar", href: "/arrendar", icon: "key" },
    { label: "Blog", href: "/blog", icon: "article" },
  ];`;

const newNavLinks = `  let navLinks = [
    { label: "Inicio", href: "/", icon: "home" },
    { label: "Inmuebles", href: "/propiedades", icon: "domain" },
    { label: "Nosotros", href: "/nosotros", icon: "groups" },
    { label: "Vender", href: "/vender", icon: "sell" },
    { label: "Arrendar", href: "/arrendar", icon: "key" },
    { label: "Blog", href: "/blog", icon: "article" },
  ];
  if (s.navbar_links) {
    try {
      navLinks = JSON.parse(s.navbar_links);
    } catch(e) {}
  }`;

code = code.replace(oldNavLinks, newNavLinks);

fs.writeFileSync('src/components/PublicNavbar.tsx', code);
console.log("Navbar updated");
