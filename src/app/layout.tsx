import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hacienda",
  description: "AI powered farm management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased w-full`}>{children}</body>
        </html>
      </SidebarProvider>
      <Toaster />
    </ClerkProvider>
  );
}
