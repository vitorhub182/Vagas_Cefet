// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "@/components/client-root-layout";
import { SidebarProvider } from "@/context/sidebar-context";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider>
            <ClientRootLayout>
              {children}
            </ClientRootLayout>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
