const fs = require('fs');

function getFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('login') && !fullPath.includes('new')) {
      files.push(fullPath);
    }
  });
  return files;
}

const adminFiles = getFiles('src/app/admin');

adminFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix Inmuebles -> /admin/properties
  content = content.replace(/<Link([^>]*href="[^"]*"[^>]*)>([\s\S]*?)Inmuebles/gi, (match, attrs, inner) => {
      return `<Link${attrs.replace(/href="[^"]*"/, 'href="/admin/properties"')}>${inner}Inmuebles`;
  });
  
  // Fix Leads -> /admin/leads
  content = content.replace(/<Link([^>]*href="[^"]*"[^>]*)>([\s\S]*?)Leads/gi, (match, attrs, inner) => {
      return `<Link${attrs.replace(/href="[^"]*"/, 'href="/admin/leads"')}>${inner}Leads`;
  });

  // Fix Visitas -> /admin/agenda
  content = content.replace(/<Link([^>]*href="[^"]*"[^>]*)>([\s\S]*?)Visitas/gi, (match, attrs, inner) => {
      return `<Link${attrs.replace(/href="[^"]*"/, 'href="/admin/agenda"')}>${inner}Visitas`;
  });

  // Fix Reportes -> /admin/reports
  content = content.replace(/<Link([^>]*href="[^"]*"[^>]*)>([\s\S]*?)Reportes/gi, (match, attrs, inner) => {
      return `<Link${attrs.replace(/href="[^"]*"/, 'href="/admin/reports"')}>${inner}Reportes`;
  });

  // Fix Ajustes -> /admin/settings
  content = content.replace(/<Link([^>]*href="[^"]*"[^>]*)>([\s\S]*?)Ajustes/gi, (match, attrs, inner) => {
      return `<Link${attrs.replace(/href="[^"]*"/, 'href="/admin/settings"')}>${inner}Ajustes`;
  });
  
  // Fix Dashboard -> /admin
  content = content.replace(/<Link([^>]*href="[^"]*"[^>]*)>([\s\S]*?)Dashboard/gi, (match, attrs, inner) => {
      return `<Link${attrs.replace(/href="[^"]*"/, 'href="/admin"')}>${inner}Dashboard`;
  });

  fs.writeFileSync(file, content);
});
console.log("Sidebar links fixed in: ", adminFiles.length, " files");
