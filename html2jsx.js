const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(html) {
    // Basic conversions for React
    let jsx = html
        .replace(/class=/g, 'className=')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/<img([^>]+)>/g, (match, attrs) => {
            if (!attrs.endsWith('/')) {
                return `<img${attrs} />`;
            }
            return match;
        })
        .replace(/<input([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) {
                return `<input${attrs} />`;
            }
            return match;
        })
        .replace(/<br([^>]+)>/g, (match, attrs) => {
             if (!attrs.endsWith('/')) {
                return `<br${attrs} />`;
            }
            return match;
        })
        .replace(/style="([^"]*)"/g, (match, styles) => {
             // Basic style parser (not perfect but handles simple cases like background-image)
             const styleObj = {};
             styles.split(';').forEach(s => {
                 const [key, value] = s.split(':');
                 if(key && value) {
                     const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                     styleObj[camelKey] = value.trim().replace(/'/g, '"');
                 }
             });
             return `style={${JSON.stringify(styleObj)}}`;
        });
    return jsx;
}

const templates = [
    { src: 'Home_Desktop_Final.html', dest: 'src/app/page.tsx', isDynamic: true },
    { src: 'Catalogo_Inmuebles.html', dest: 'src/app/propiedades/page.tsx', isDynamic: true },
];

for (const t of templates) {
    const srcPath = path.join(__dirname, 'stitch_assets', t.src);
    if (!fs.existsSync(srcPath)) continue;
    
    let html = fs.readFileSync(srcPath, 'utf8');
    // Extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : html;
    
    let jsx = convertHtmlToJsx(bodyContent);
    
    // We will output the raw JSX string and then I will manually insert it with Prisma in the file
    fs.writeFileSync(path.join(__dirname, 'scratch', `jsx_${t.src}.txt`), jsx);
    console.log(`Converted ${t.src}`);
}
