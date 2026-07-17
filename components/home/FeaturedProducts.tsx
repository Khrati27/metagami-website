import { getProducts } from "@/lib/shopify";

import FeaturedProductsClient from "./FeaturedProductsClient";



export default async function FeaturedProducts() {


  // Shopify ürünlerini çekiyoruz

  const allProducts = await getProducts();



  // Anasayfada maksimum 3 ürün gösteriyoruz

  const products = allProducts.slice(0, 3);




  return (

    <FeaturedProductsClient
      products={products}
    />

  );


}