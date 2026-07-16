"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Currency = "TRY" | "EUR" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceTRY: number) => string;
  convertPrice: (priceTRY: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>("TRY");

  /*
    Shopify'dan gelen fiyatlar TL (TRY) cinsindendir.
    Aşağıdaki kurlar 1 TL'nin EUR ve USD karşılığını hesaplar:
    1 EUR = 46 TL
    1 USD = 39.3 TL (1.17 USD / 46 TL)
  */
  const rates = useMemo(
    () => ({
      TRY: 1,
      EUR: 1 / 46,
      USD: 1.17 / 46,
    }),
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null;

    if (saved) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    localStorage.setItem("currency", newCurrency);
    setCurrencyState(newCurrency);
  };

  const convertPrice = (priceTRY: number) => {
    if (isNaN(priceTRY)) return 0;
    return priceTRY * rates[currency];
  };

  const formatPrice = (priceTRY: number) => {
    if (isNaN(priceTRY)) return "";

    const converted = convertPrice(priceTRY);

    return new Intl.NumberFormat(
      currency === "TRY" ? "tr-TR" : "en-US",
      {
        style: "currency",
        currency,
        minimumFractionDigits: currency === "TRY" ? 0 : 2,
        maximumFractionDigits: currency === "TRY" ? 0 : 2,
      }
    ).format(converted);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrency must be used within CurrencyProvider"
    );
  }

  return context;
}