
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}

      <main id="main-content" tabIndex={-1} className="min-h-screen">
        {children}
        {!isAdmin && <WhatsAppButton />}
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}
