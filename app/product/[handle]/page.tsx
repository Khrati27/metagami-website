import { getProducts } from "@/lib/shopify";

import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const products = await getProducts();
  const product = products.find((p: any) => p.handle === handle);

  if (!product) return <div className="p-20 text-center">Ürün bulunamadı.</div>;

  return (
    <main className="min-h-screen bg-metagami-bg pt-24 px-6 md:px-12 pb-12">
      {/* 1. Üst Başlık Şeridi */}
      <div className="max-w-[1440px] mx-auto flex justify-between border-b border-metagami-border pb-4 mb-8">
        <span className="font-display font-bold tracking-widest text-xs text-metagami-muted">SIGNATURE COLLECTION</span>
        <span className="font-display font-medium text-xs tracking-wider">LOW-POLY METAL SCULPTURE</span>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* SOL: GÖRSEL GALERİSİ */}
        <div className="lg:col-span-5">
          <ProductGallery
            images={product.images}
            title={product.title}
          />
        </div>

        {/* ORTA: ÜRÜN BİLGİLERİ VE SEPET / FİYAT DİNAMİK ALANI */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h1 className="font-display font-black text-5xl tracking-tight uppercase leading-none">{product.title}</h1>
            <p className="font-display tracking-widest text-xs text-metagami-muted uppercase mt-2">Architectural Elegance</p>
            <div className="w-16 h-[2px] bg-metagami-text mt-4"></div>
          </div>

          <p className="text-sm leading-relaxed text-justify font-light">{product.description}</p>

          <AddToCartButton product={product} />
        </div>

        {/* SAĞ: Specifications */}
        <div className="lg:col-span-3 border-l border-metagami-border pl-8">
          <h3 className="font-display font-black text-lg uppercase tracking-widest mb-8">Specifications</h3>
          <div className="divide-y divide-metagami-border text-[11px] font-sans">
            {[
              { label: "MATERIAL", val: "STAINLESS STEEL" },
              { label: "FINISH", val: "MIRROR POLISH" },
              { label: "APPLICATION", val: "INDOOR / OUTDOOR" },
              { label: "PACKAGING", val: "EXPORT CRATE" }
            ].map((spec) => (
              <div key={spec.label} className="py-4 flex justify-between">
                <span className="font-bold text-metagami-muted tracking-wide">{spec.label}</span>
                <span className="font-mono">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER ŞERİDİ */}
      <div className="max-w-[1440px] mx-auto mt-16 pt-4 border-t border-metagami-border flex flex-col md:flex-row justify-between text-[10px] tracking-widest text-metagami-muted font-display uppercase">
        <div>METAGAMI STUDIO | metagamistudio.com</div>
        <div>Designed & Manufactured in Türkiye | Worldwide Shipping</div>
        <div>04/10</div>
      </div>
    </main>
  );
}