const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const mapKeys = [
  'hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'
];

for (const key of mapKeys) {
  // Replace `key: (` with `key: (<>`
  code = code.replace(`    ${key}: (\n`, `    ${key}: (<>\n`);
  // But wait, the end `),` needs to be `</>),`
  // We can't just globally replace `),\n` because it might match other things.
}
// Actually, since I generated the code uniformly, it's easier to do:
code = code.replace(/    \w+: \(\n/g, match => {
  return match.replace('(\n', '(<>\n');
});

// Now replace `    ),\n` with `    </>),\n`
code = code.replace(/    \),\n/g, '    </>),\n');

// The last one is `    )\n  };`
code = code.replace(/    \)\n  \};\n/g, '    </>)\n  };\n');

fs.writeFileSync('src/app/page.tsx', code);
console.log("Fixed JSX syntax");
