const fs = require('fs');
let nav = fs.readFileSync('src/components/PublicNavbar.tsx', 'utf8');

const oldEffect = `  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);`;

const newEffect = `  useEffect(() => {
    if (isMenuOpen) {
      // Bulletproof scroll lock for iOS Safari
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + window.scrollY + 'px';
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);`;

nav = nav.replace(oldEffect, newEffect);

fs.writeFileSync('src/components/PublicNavbar.tsx', nav);
console.log("Fixed PublicNavbar scroll lock");
