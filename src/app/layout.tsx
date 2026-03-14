import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "designinteriør.no – Sammenlign møbelpriser og les anmeldelser",
    template: "%s | designinteriør.no",
  },
  description:
    "Norges uavhengige interiørguide. Sammenlign priser fra 30+ butikker og les ærlige anmeldelser av møbler og interiør.",
  metadataBase: new URL("https://xn--designinterir-mnb.no"),
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "designinteriør.no",
    title: "designinteriør.no – Sammenlign møbelpriser og les anmeldelser",
    description:
      "Sammenlign priser fra 30+ norske møbelbutikker. Les uavhengige anmeldelser av møbler og interiør.",
    images: [{ url: "/images/hero.jpg", width: 1920, height: 1080, alt: "designinteriør.no" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "designinteriør.no – Sammenlign møbelpriser",
    description: "Sammenlign priser fra 30+ norske møbelbutikker og spar penger.",
    images: ["/images/hero.jpg"],
  },
  alternates: {
    canonical: "https://xn--designinterir-mnb.no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
