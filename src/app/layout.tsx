
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteLayout from "@/components/layout/SiteLayout";
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

        <SiteLayout>
          {children}
        </SiteLayout>

        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_ID || ""}
        />
      </body>
    </html>
  );
}
