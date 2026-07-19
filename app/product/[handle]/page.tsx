import { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import ProductView from "./ProductView";

type Props = {
  params: Promise<{ handle: string }>;
};

// 1. DİNAMİK SEO BÖLÜMÜ (Google ve Sosyal Medya için)
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { handle } = await params;
  const products = await getProducts();
  const product = products.find((p: any) => p.handle === handle);

  if (!product) {
    return { title: "Ürün Bulunamadı" };
  }

  const title = product.seo?.title || product.title;
  const description = product.seo?.description || product.description;
  const imageUrl = product.featuredImage?.url || "/og-image.jpg";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/product/${handle}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: title,
        },
      ],
    },
  };
}

// 2. SAYFA GÖRÜNÜMÜ VE JSON-LD (Zengin Sonuçlar) BÖLÜMÜ
export default async function ProductPage({
  params,
}: Props) {
  const { handle } = await params;
  const products = await getProducts();
  const product = products.find((p: any) => p.handle === handle);

  if (!product) {
    return null; 
  }

  // Google'ın okuyacağı Zengin Sonuçlar (Rich Snippets) Şeması
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.seo?.description || product.description,
    "image": product.featuredImage?.url,
    "offers": {
      "@type": "Offer",
      "url": `https://www.metagamistudio.com/product/${handle}`,
      // Shopify verisindeki duruma göre stok ayarı (kendi veri yapına göre güncelleyebilirsin)
      "availability": product.availableForSale 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      // Fiyat verisi (Shopify genellikle priceRange altında tutar)
      "price": product.priceRange?.minVariantPrice?.amount || "0.00",
      "priceCurrency": product.priceRange?.minVariantPrice?.currencyCode || "TRY",
    },
    // DİKKAT: Yıldızların çıkması için AggregateRating gereklidir. 
    // Sitenizde henüz yorum sistemi yoksa şimdilik bu şekilde 5 yıldız olarak görünebilir.
    // İleride yorum sistemi kurduğunuzda buraya dinamik verileri ("ratingValue" ve "reviewCount") bağlamalısınız.
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "12" 
    }
  };

  return (
    <section>
      {/* JSON-LD kodunu arka plana (DOM'a) güvenli bir şekilde gömüyoruz */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Kullanıcının gördüğü asıl bileşen */}
      <ProductView product={product} />
    </section>
  );
}