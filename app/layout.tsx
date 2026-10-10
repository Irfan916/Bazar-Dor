import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-bengali",
});

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body
        className={`${notoBengali.variable} font-sans bg-gray-50 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          data-rht-toaster
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#111827",
              border: "1px solid #e5e7eb",
            },
          }}
        />
      </body>
    </html>
  );
}