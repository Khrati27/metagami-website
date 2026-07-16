import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProcessSteps from "@/components/home/ProcessSteps";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* 1. GİRİŞ (HERO) EKRANI */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
        
        {/* ARKA PLAN GÖRSELİ (Opaklığı düşürülmüş arka plan) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/hero-bg.png" // public/hero-bg.png dosya yolunuz
            alt="Metagami Hero Background"
            fill
            priority
            className="object-cover object-center opacity-50 filter grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Yazıların okunabilirliğini artırmak için yumuşak degrade kaplama */}
          <div className="absolute inset-0 bg-gradient-to-b from-metagami-bg/60 via-transparent to-metagami-bg/80" />
        </div>

        {/* Arka plandaki loş ışık halkası */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/30 rounded-full blur-[120px] pointer-events-none" />

        {/* YAZI KAPSAYICISI (z-10 verilerek görselin üstünde kalması sağlandı) */}
        <div className="max-w-4xl text-center z-10 space-y-6">
          <p className="text-sm tracking-[0.3em] text-metagami-muted uppercase font-medium font-display">
            Metagami Studio
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-metagami-text font-display uppercase">
            Crafted for <br />
            <span className="font-light">Exceptional Spaces</span>
          </h1>
          
          <p className="text-metagami-text/80 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Türkiye'de hassas mühendislik ve el işçiliğiyle üretilen, modern ve lüks mekanlara karakter katan mimari metal heykeller.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center font-sans">
            <Link href="/koleksiyon">
              <button className="px-8 py-3 bg-metagami-text text-metagami-bg font-medium rounded-full hover:bg-metagami-text/80 transition-all duration-300 shadow-lg tracking-wide w-full sm:w-auto">
                Koleksiyonu İncele
              </button>
            </Link>
            <button className="px-8 py-3 bg-transparent border border-metagami-text/30 text-metagami-text font-medium rounded-full hover:border-metagami-text hover:bg-metagami-text/5 transition-all duration-300 tracking-wide w-full sm:w-auto">
              Özel Projelendirme (Bespoke)
            </button>
          </div>
        </div>
      </section>

      {/* 2. ÖNE ÇIKAN DİĞER HEYKELLER */}
      <FeaturedProducts />
    </>
  );
}