import type { Metadata, Viewport } from "next";
import { Kalam, Mukta, Rozha_One } from "next/font/google";
import { site } from "@/site.config";
import { BasketProvider } from "@/components/BasketProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PlaceholderStrip } from "@/components/PlaceholderStrip";
import "./globals.css";

const display = Rozha_One({ weight: "400", subsets: ["latin", "devanagari"], variable: "--font-display", display: "swap" });
const body = Mukta({ weight: ["400", "600", "700"], subsets: ["latin", "devanagari"], variable: "--font-body", display: "swap" });
const hand = Kalam({ weight: "400", subsets: ["latin", "devanagari"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} · Homemade pahadi pickles and sharbat`, template: `%s · ${site.brand}` },
  description:
    "Galgal, lingad, lasoda and buransh: pickles and sharbats made by hand in small batches by Neelam Verma and the women of Sanet, Himachal. Order on WhatsApp.",
  openGraph: { siteName: site.brand, locale: "en_IN", type: "website", images: ["/images/lifestyle/banner-range-1.webp"] },
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = { themeColor: "#0C612D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <BasketProvider>
          <PlaceholderStrip />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </BasketProvider>
      </body>
    </html>
  );
}
