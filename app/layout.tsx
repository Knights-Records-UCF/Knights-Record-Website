import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sfPro = localFont({
  src: [
    {
      path: "./fonts/SFPRODISPLAYREGULAR.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFPRODISPLAYMEDIUM.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFPRODISPLAYBOLD.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Knights Records",
  description: "Knights Records' website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.className} antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#1f1f1f] transition-all duration-300 ease-in-out p-4 pt-20 md:p-8">
            {children}
            <ThemeToggle />
          </main>
        </div>
      </body>
    </html>
  );
}