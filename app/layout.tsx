import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/hooks/use-user-role";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MediVfy | Secure Medical Verification",
  description: "Institutional-grade medical verification and health information platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlex.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
