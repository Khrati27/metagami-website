export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-10 md:py-16">
      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
        
        {/* Sol Taraf: Görsel Galerisi İskeleti */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Ana Görsel */}
          <div className="aspect-[4/5] md:aspect-square w-full bg-gray-200 animate-pulse rounded-2xl" />
          
          {/* Alt Küçük Resimler (Thumbnails) */}
          <div className="flex gap-4 overflow-hidden">
            <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-xl shrink-0" />
            <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-xl shrink-0" />
            <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-xl shrink-0" />
            <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-xl shrink-0 hidden sm:block" />
          </div>
        </div>

        {/* Sağ Taraf: Ürün Detayları İskeleti */}
        <div className="w-full md:w-1/2 flex flex-col pt-2 lg:pt-8">
          
          {/* Başlık, Fiyat ve Değerlendirmeler */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md" /> {/* Marka/Kategori */}
            <div className="h-10 w-4/5 bg-gray-200 animate-pulse rounded-lg" /> {/* Ürün Adı */}
            <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-lg" /> {/* Fiyat */}
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Varyant Seçenekleri (Renk ve Boyut) */}
          <div className="space-y-8 mb-8">
            
            {/* Renk Seçenekleri İskeleti */}
            <div className="space-y-3">
              <div className="h-5 w-16 bg-gray-200 animate-pulse rounded" />
              <div className="flex gap-3">
                {/* Seçenek kutuları üniform bir yapıda */}
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
              </div>
            </div>

            {/* Boyut Seçenekleri İskeleti */}
            <div className="space-y-3">
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
              <div className="flex flex-wrap gap-3">
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-16 h-12 bg-gray-200 animate-pulse rounded-md" />
              </div>
            </div>
            
          </div>

          {/* Sepete Ekle Butonu İskeleti */}
          <div className="h-14 w-full bg-gray-200 animate-pulse rounded-xl mb-8" />

          {/* Akordiyon / Ürün Açıklaması İskeleti */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-11/12 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-4/5 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
          </div>

        </div>
      </div>
    </div>
  );
}