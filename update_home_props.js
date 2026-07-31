const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace('<PublicFooter />', '<PublicFooter settings={settings} />');
page = page.replace('<PublicNavbar />', '<PublicNavbar settings={settings} />');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Updated Home Props");
