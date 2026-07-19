import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/Newsletter";
import CookieConsent from '@/components/CookieConsent';

import Cart from "@/components/Cart";

import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "700", "900"],
});



export const metadata: Metadata = {
 
  metadataBase: new URL('https://www.metagamistudio.com'), 
  
  title: {
    
    template: '%s | Metagami Studio',
    default: 'Metagami Studio | Mimari Metal Heykeller', 
  },
  
  description: 'Türkiye\'de hassas mühendislik ve el işçiliğiyle üretilen, modern ve lüks mekanlara karakter katan mimari metal heykeller.',
  
  
  openGraph: {
    title: 'Metagami Studio | Özel Mekanlar İçin Tasarlandı',
    description: 'Zamansız formlar ve premium el işçiliğiyle üretilen metal heykelleri keşfedin.',
    url: '/',
    siteName: 'Metagami Studio',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Metagami Studio Signature Collection',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  
  
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="bg-metagami-bg text-metagami-text bg-technical-grid font-sans antialiased flex flex-col min-h-screen">

        <LanguageProvider>

          <CurrencyProvider>

            <CartProvider>

              <Header />

              <main className="flex-grow pt-20">
                {children}
              </main>

              <Newsletter />

              <Footer />

              <Cart />

            </CartProvider>

          </CurrencyProvider>
<CookieConsent/>
        </LanguageProvider>
        
        

      </body>
    </html>
  );
}