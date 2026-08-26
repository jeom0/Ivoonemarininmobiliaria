import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import GSAPInitializer from "@/components/GSAPInitializer";
import FloatingButtons from "@/components/FloatingButtons";
import { headers } from "next/headers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  await headers();
  const faviconUrl = `/api/favicon?v=${Date.now()}`;
  return {
    title: "Ivonne Marin - Asesora Inmobiliaria",
    description: "Asesora inmobiliaria premium en el Eje Cafetero",
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await headers();
  
  return (
    <html lang="es" className={jakarta.className}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-on-surface">
        <AuthProvider>
          <GSAPInitializer />
          {children}
          {/* Botones Flotantes Globales: WhatsApp + Scroll-to-Top */}
          <FloatingButtons />
        </AuthProvider>
      </body>
    </html>
  );
}
