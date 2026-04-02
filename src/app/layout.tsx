import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "White Tail | The Silent Canvas",
  description: "35 Acres of Unfiltered Silence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${notoSerif.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="bg-[#0c0a09] font-sans min-h-full flex flex-col">{children}</body>
    </html>
  );
}
