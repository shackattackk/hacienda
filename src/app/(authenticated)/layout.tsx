"use client";

import type React from "react";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full w-full">
            <Navbar />
            <main className="flex-1 w-full overflow-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
