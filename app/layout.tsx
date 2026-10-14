import type { Metadata, Viewport } from "next";
import { Cormorant, Inter } from "next/font/google";
import "./globals.css";

const serifFace = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-face",
  display: "swap",
});

const sansFace = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-face",
  display: "swap",
});

/**
 * Metadata is deliberately generic — the OG tags never reveal that this is
 * a couple's private site, let alone any names or details.
 */
export const metadata: Metadata = {
  title: "Our Little World",
  description: "A quiet corner of the universe.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Our Little World",
    description: "A quiet corner of the universe.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#10080D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serifFace.variable} ${sansFace.variable}`}>
      <body className="film-grain min-h-dvh antialiased">{children}</body>
    </html>
  );
}
