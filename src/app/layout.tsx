import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
//-----------upload-files-dependencies---------
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
//---------------------------------------------
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RisbeUI",
  description:
    "Find, Buy, and Sell with ease Tailwind UI components. A sleek marketplace to buy and sell Tailwind CSS web components. Join as a seller or buyer and start trading today with us.",
  keywords: [
    "risbeui",
    "Tailwind CSS components",
    "buy Tailwind components",
    "sell Tailwind components",
    "Tailwind UI marketplace",
    "modern Tailwind UI components",
    "customizable Tailwind CSS",
    "UI components marketplace",
    "responsive Tailwind templates",
    "premium Tailwind components",
    "Tailwind design resources",
    "reusable Tailwind UI",
    "buy CSS components",
    "sell CSS components",
    "UI marketplace for Tailwind",
    "frontend components Tailwind",
  ],
  authors: [{ name: "Risbel" }],
  creator: "Risbel",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-icon.png"],
    shortcut: ["/apple-icon.png"],
    other: [
      {
        rel: "mask-icon",
        url: "/RisbeUI-icon-og.svg",
        color: "#ffffff",
      },
    ],
  },
  openGraph: {
    title: "RisbeUI",
    description: "Find, Buy, and Sell with ease Tailwind UI components.",
    url: "https://risbeui-market.vercel.app",
    siteName: "RisbeUI",
    type: "website",
    locale: "en",
    images: [
      {
        url: "https://risbeui-market.vercel.app/Risbe-UI-marketplace-og.webp",
        height: 630,
        alt: "Risbe UI Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risbe UI",
    description: "Find, Buy, and Sell with ease Tailwind UI components.",
    images: ["https://risbeui-market.vercel.app/Risbe-UI-marketplace-og.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <div className="h-screen pt-20">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
