import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maxnate.africa'),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "African Technology",
    "Software Development",
    "Digital Transformation",
    "AI Solutions",
    "Cloud Infrastructure",
    "Cybersecurity",
    "South Africa",
    "Maxnate Africa",
  ],
  authors: [{ name: "Maxnate Africa" }],
  creator: "Maxnate Africa",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://maxnate.africa",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1628",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-primary-navy text-text-primary`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
