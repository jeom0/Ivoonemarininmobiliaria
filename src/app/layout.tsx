import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import GSAPInitializer from "@/components/GSAPInitializer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivonne Marin - Asesora Inmobiliaria",
  description: "Asesora inmobiliaria premium en el Eje Cafetero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jakarta.className}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
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
