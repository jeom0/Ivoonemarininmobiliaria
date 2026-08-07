const fs = require('fs');

const jsxHome = fs.readFileSync('./scratch/jsx_Home_Desktop_Final.html', 'utf8');

const finalHome = `import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const properties = await prisma.property.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    where: { status: "DISPONIBLE" }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation injected dynamically over static HTML */}
      <nav className="fixed w-full z-50 transition-all duration-300 glass-header border-b border-white/20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-[80px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-container">Ivonne Marín</h1>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/propiedades">Propiedades</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/nosotros">Nosotros</Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors text-sm" href="/blog">Blog</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
              Admin Login
            </Link>
          </div>
        </div>
      </nav>
      
      ${jsxHome}
    </div>
  );
}
`;

fs.writeFileSync('./src/app/page.tsx', finalHome);
