

import { useCurrency } from "@/context/CurrencyContext";
import { getProducts } from "@/lib/shopify";
import CollectionView from "@/components/CollectionView";

export default async function KoleksiyonPage() {

  const products = await getProducts();

  return (
    <CollectionView
      products={products}
    />
  );

}