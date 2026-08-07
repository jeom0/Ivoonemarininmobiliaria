import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import GSAPInitializer from "@/components/GSAPInitializer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Ivonne Marin - Asesora Inmobiliaria",
  description: "Asesora inmobiliaria premium en el Eje Cafetero",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Opt out of static generation for the entire app to prevent build crashes
  // while ensuring CSS chunks are properly injected in the dynamic response
  await headers();
  
  let faviconUrl = "/favicon.ico";
  try {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (admin?.image) {
      faviconUrl = admin.image;
    }
  } catch (error) {
    console.error("Failed to load favicon from admin user");
  }

  return (
    <html lang="es" className={jakarta.className}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="icon" href={faviconUrl} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-on-surface">
        <AuthProvider>
          <GSAPInitializer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
