const fs = require('fs');

let content = fs.readFileSync('src/app/admin/login/page.tsx', 'utf8');

// Ensure it is a client component
if (!content.includes('"use client"')) {
    content = '"use client";\n' + content;
}

// Add useRouter
if (!content.includes('useRouter')) {
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useRouter } from "next/navigation";');
}

// Replace the component export to use the hook
content = content.replace('export default function Page() {', `export default function Page() {\n  const router = useRouter();\n  const handleLogin = (e) => { e.preventDefault(); router.push('/admin'); };\n`);

// Replace the form action with onSubmit
content = content.replace('<form className="space-y-6" action="/admin">', '<form className="space-y-6" onSubmit={handleLogin}>');

fs.writeFileSync('src/app/admin/login/page.tsx', content);
