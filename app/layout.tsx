import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/Newsletter";

import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

import Cart from "@/components/Cart";

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
  title: "Metagami Studio | Architectural Metal Sculptures",
  description: "Lüks mekanlar için geometrik metal heykeller.",
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

      </body>
    </html>
  );
}