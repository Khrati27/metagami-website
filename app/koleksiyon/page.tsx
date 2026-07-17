import { getProducts } from "@/lib/shopify";
import CollectionView from "@/components/CollectionView";


interface KoleksiyonPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}


export default async function KoleksiyonPage({
  searchParams,
}: KoleksiyonPageProps) {


  const products = await getProducts();


  const params = await searchParams;


  const searchQuery =
    params.search || "";



  return (
    <CollectionView
      products={products}
      searchQuery={searchQuery}
    />
  );

}