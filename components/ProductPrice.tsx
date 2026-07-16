"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface ProductPriceProps {
  price: number;
  className?: string;
}

export default function ProductPrice({ price, className = "" }: ProductPriceProps) {
  const { formatPrice } = useCurrency();

  return <span className={className}>{formatPrice(price)}</span>;
}