const fs = require('fs');
const path = require('path');

const homeHtml = fs.readFileSync(path.join(__dirname, 'stitch_assets', 'Home.html'), 'utf8');

// 1. Extract tailwind config
const twMatch = homeHtml.match(/tailwind\.config = (\{[\s\S]*?\})\s*<\/script>/);
let colors = {}, borderRadius = {}, spacing = {}, fontFamily = {}, fontSize = {};
if (twMatch) {
    const configStr = twMatch[1]
        // Fix standard JSON issues (e.g. trailing commas, lack of quotes on keys if any)
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
        // Convert to evalable JS since it's a JS object, not strict JSON
        ;
    
    // Evaluate the object safely-ish (it's our own code)
    const config = eval('(' + twMatch[1] + ')');
    if (config.theme && config.theme.extend) {
        const ext = config.theme.extend;
        colors = ext.colors || {};
        borderRadius = ext.borderRadius || {};
        spacing = ext.spacing || {};
        fontFamily = ext.fontFamily || {};
        fontSize = ext.fontSize || {};
    }
}

// 2. Extract all unique <style> blocks from all HTML files
const files = fs.readdirSync(path.join(__dirname, 'stitch_assets')).filter(f => f.endsWith('.html'));
const allStyles = new Set();
files.forEach(f => {
    const html = fs.readFileSync(path.join(__dirname, 'stitch_assets', f), 'utf8');
    const styleMatches = html.matchAll(/<style>([\s\S]*?)<\/style>/g);
    for (const match of styleMatches) {
        allStyles.add(match[1].trim());
    }
});

// 3. Generate globals.css
let css = `@import "tailwindcss";

@theme inline {
`;

for (const [k, v] of Object.entries(colors)) {
    css += `  --color-${k}: ${v};\n`;
}
for (const [k, v] of Object.entries(spacing)) {
    css += `  --spacing-${k}: ${v};\n`;
}
for (const [k, v] of Object.entries(borderRadius)) {
    css += `  --radius-${k}: ${v};\n`;
}
// Font families
for (const [k, v] of Object.entries(fontFamily)) {
    css += `  --font-${k}: "${v[0]}", sans-serif;\n`;
}
// Font sizes (v4 uses text-*)
// Actually, font sizes mapped to class names in v4 might require --text-* or utilities.
// We'll define them as text sizes.
for (const [k, v] of Object.entries(fontSize)) {
    const size = v[0];
    const lineHeight = v[1] && v[1].lineHeight ? v[1].lineHeight : 'normal';
    const fontWeight = v[1] && v[1].fontWeight ? v[1].fontWeight : '400';
    const letterSpacing = v[1] && v[1].letterSpacing ? v[1].letterSpacing : 'normal';
    css += `  --text-${k}: ${size};\n`;
    css += `  --text-${k}--line-height: ${lineHeight};\n`;
    css += `  --text-${k}--font-weight: ${fontWeight};\n`;
    css += `  --text-${k}--letter-spacing: ${letterSpacing};\n`;
}

css += `}\n\n`;

css += `
body {
    background-color: var(--color-background, #fcf9f8);
    color: var(--color-on-surface, #1b1b1c);
    font-family: var(--font-body-md, sans-serif);
}

/* Base custom styles from templates */
`;

allStyles.forEach(styleBlock => {
    css += styleBlock + '\n\n';
});

fs.writeFileSync(path.join(__dirname, 'src/app/globals.css'), css);
console.log('Fixed globals.css');
