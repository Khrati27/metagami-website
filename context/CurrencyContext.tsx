"use client";

import {
  createContext,
  useContext,
  useEffect,
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

  // 1. Kurları useMemo yerine state olarak tanımlıyoruz. 
  // Başlangıç değeri olarak senin sabit kurlarını (yedek senaryo) veriyoruz.
  const [rates, setRates] = useState({
    TRY: 1,
    EUR: 1 / 46,
    USD: 1.17 / 46,
  });

  // 2. Sayfa yüklendiğinde canlı kur verilerini çekiyoruz
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // TRY bazlı canlı döviz kurlarını getirir
        const response = await fetch("https://open.er-api.com/v6/latest/TRY");
        const data = await response.json();

        // API başarılı yanıt verdiyse kurları güncelle
        if (data && data.rates) {
          setRates({
            TRY: 1,
            EUR: data.rates.EUR,
            USD: data.rates.USD,
          });
        }
      } catch (error) {
        console.error("Canlı kur verileri çekilemedi, yedek kurlar kullanılıyor:", error);
      }
    };

    fetchRates();
  }, []);

  // 3. Kullanıcının son seçtiği para birimini LocalStorage'dan al
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
    // Artık dinamik state'ten (rates) gelen değerle çarpılıyor
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