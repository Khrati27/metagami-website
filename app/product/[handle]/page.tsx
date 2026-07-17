import { getProducts } from "@/lib/shopify";

import ProductView from "./ProductView";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {


  const { handle } = await params;


  const products = await getProducts();


  const product = products.find(
    (p:any)=>p.handle === handle
  );

  return (
    <ProductView product={product}/>
  );

}