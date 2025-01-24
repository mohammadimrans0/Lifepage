import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lifepage",
  description: "Lifepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="m-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-3"><Sidebar/></div>
            <div className="col-span-4 lg:col-span-9">{children}</div>
          </div>
        </div>  
      </body>
    </html>
  );
}
