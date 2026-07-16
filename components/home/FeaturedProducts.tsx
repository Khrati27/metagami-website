import { getProducts } from "@/lib/shopify";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export default async function FeaturedProducts() {
  // Shopify'dan gerçek ürünlerimizi çekiyoruz
  const allProducts = await getProducts();

  // Anasayfada MAXIMUM 3 ÜRÜN gösteriyoruz
  const products = allProducts.slice(0, 3);

  if (products.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="text-metagami-muted text-sm font-sans tracking-wide">
          Shopify panelinizde henüz ürün bulunmuyor. <br />
          Ürünlerinizi Shopify Admin panelinden eklediğinizde burada listelenecektir.
        </p>
      </section>
    );
  }

  return (
    <section className="py-24 relative border-t border-metagami-border/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Bölüm Başlığı */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs tracking-[0.3em] text-metagami-muted uppercase font-medium font-display">
            Özel Seçki
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-metagami-text font-display uppercase">
            Öne Çıkan Heykeller
          </h2>
          <div className="w-12 h-[1px] bg-metagami-text/40 mx-auto" />
        </div>

        {/* Ürün Kartları Izgarası (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => {
            const mainImage = product.images?.[0]?.url || product.image;

            return (
              <div
                key={product.id}
                className="group relative bg-white/5 border border-metagami-border/40 p-4 transition-all duration-500 hover:border-metagami-text/60 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Görsel Alanı */}
                  <div className="relative aspect-square w-full overflow-hidden bg-metagami-bg/50">
                    {mainImage ? (
                      <Image
                        src={mainImage}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-metagami-muted font-mono">
                        GÖRSEL YOK
                      </div>
                    )}
                  </div>

                  {/* Ürün Bilgileri */}
                  <div className="mt-6 space-y-2">
                    <span className="text-[10px] text-metagami-muted uppercase tracking-widest font-display">
                      Signature Collection
                    </span>
                    <h3 className="text-xl font-bold text-metagami-text font-display uppercase tracking-wide group-hover:text-black transition-colors duration-300">
                      {product.title}
                    </h3>
                  </div>
                </div>

                {/* Varyant Seçenekleri, Döviz Fiyatı ve Sepete Ekle Butonu */}
                <div className="space-y-4 pt-6 border-t border-metagami-border/30 mt-6">
                  <AddToCartButton product={product} />

                  <Link
                    href={`/product/${product.handle}`}
                    className="block w-full py-3 bg-transparent hover:bg-metagami-text text-metagami-text hover:text-metagami-bg text-xs font-bold tracking-[0.2em] transition-all duration-300 border border-metagami-text text-center uppercase"
                  >
                    Detayları İncele
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}