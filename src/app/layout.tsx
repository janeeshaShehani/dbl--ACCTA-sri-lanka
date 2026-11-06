import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
        <Header />

        <main className="min-h-screen pt-[150px]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}