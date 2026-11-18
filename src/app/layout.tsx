
import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACCTA Sri Lanka",
  description: "Association of Certified Chartered Tax Advisors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-white focus:p-3 focus:text-accta-navy"
        >
          Skip to content
        </a>

        <SiteLayout>{children}<WhatsAppButton /></SiteLayout>
      </body>
    </html>
  );
}
