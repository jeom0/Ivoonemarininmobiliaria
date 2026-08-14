const fs = require('fs');
let content = fs.readFileSync('src/app/admin/ayuda/page.tsx', 'utf8');

// 1. Page Padding
content = content.replace('className="p-8 max-w-[1400px]', 'className="p-4 md:p-8 max-w-[1400px]');
content = content.replace('space-y-24', 'space-y-16 md:space-y-24');

// 2. Fixed heights to min-heights for mobile
content = content.replace(/h-\[480px\]/g, 'min-h-[480px]');
content = content.replace(/h-\[460px\]/g, 'min-h-[460px]');
content = content.replace(/h-\[400px\]/g, 'min-h-[400px]');
content = content.replace(/h-\[320px\]/g, 'min-h-[320px]');
content = content.replace(/h-\[280px\]/g, 'min-h-[280px]');
content = content.replace(/h-\[260px\]/g, 'min-h-[260px]');
content = content.replace(/h-\[240px\]/g, 'min-h-[240px]');
content = content.replace(/h-\[220px\]/g, 'min-h-[220px]');
content = content.replace(/h-\[200px\]/g, 'min-h-[200px]');
content = content.replace(/h-\[180px\]/g, 'min-h-[180px]');

// 3. Prevent absolute cursors from breaking layout overflow
content = content.replace(/absolute z-20 animate-cursor/g, 'absolute z-20 animate-cursor hidden md:block');

// 4. Fix fixed widths that cause horizontal scrolling
content = content.replace(/w-\[130px\]/g, 'w-full max-w-[130px]');
content = content.replace(/w-\[180px\]/g, 'w-full max-w-[180px]');
content = content.replace(/w-\[160px\]/g, 'w-full max-w-[160px]');
content = content.replace(/w-\[120px\]/g, 'w-full max-w-[120px]');
content = content.replace(/w-\[200px\]/g, 'w-full max-w-[200px]');

// 5. Make the Leads Table mock scrollable
content = content.replace('div className="bg-surface w-full max-w-3xl rounded-xl shadow-2xl border border-outline-variant/50 overflow-hidden"', 'div className="bg-surface w-full max-w-3xl rounded-xl shadow-2xl border border-outline-variant/50 overflow-x-auto"><div className="min-w-[500px]"');
content = content.replace(/div className="absolute z-20 animate-cursor text-4xl" style={{top: '50%', right: '15%'}}>👆🏽<\/div>\n               <\/div>/g, 'div className="absolute z-20 animate-cursor text-4xl hidden md:block" style={{top: \'50%\', right: \'15%\'}}>👆🏽</div></div></div>'); // Fix the closing div

// 6. Fix text sizes for title headers
content = content.replace(/text-5xl/g, 'text-3xl md:text-5xl');
content = content.replace(/text-3xl/g, 'text-2xl md:text-3xl');

fs.writeFileSync('src/app/admin/ayuda/page.tsx', content);
console.log("Done fixing responsive classes.");
