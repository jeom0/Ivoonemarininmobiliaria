const fs = require('fs');

function convertHtmlToJsx(html) {
    let jsx = html
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/<img([^>]+)>/g, (match, attrs) => {
            if (!attrs.endsWith('/')) return `<img${attrs} />`;
            return match;
        })
        .replace(/<input([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) return `<input${attrs} />`;
            return match;
        })
        .replace(/<br([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) return `<br${attrs} />`;
            return match;
        })
        .replace(/<hr([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) return `<hr${attrs} />`;
            return match;
        })
        .replace(/style="([^"]*)"/g, (match, styles) => {
             const styleObj = {};
             styles.split(';').forEach(s => {
                 const [key, ...rest] = s.split(':');
                 if(key && rest.length > 0) {
                     const value = rest.join(':');
                     const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                     styleObj[camelKey] = value.trim().replace(/'/g, '"');
                 }
             });
             return `style={${JSON.stringify(styleObj)}}`;
        });
    // Remove scripts
    jsx = jsx.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    jsx = jsx.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    return jsx;
}

const templates = [
    { src: 'Home.html', dest: 'src/app/page.tsx' },
    { src: 'Catalogo_Inmuebles.html', dest: 'src/app/propiedades/page.tsx' }
];

templates.forEach(t => {
    let html = fs.readFileSync('stitch_assets/' + t.src, 'utf8');
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : html;
    let jsx = convertHtmlToJsx(bodyContent);
    
    let reactComponent = `
export default function Page() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
    fs.writeFileSync(t.dest, reactComponent);
});
console.log('Fixed pages.');
