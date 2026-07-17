"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {

  const { t } = useLanguage();

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">

        <Image
          src="/hero-bg.png"
          alt="Metagami Hero Background"
          fill
          priority
          className="object-cover object-center opacity-50 filter grayscale hover:grayscale-0 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-metagami-bg/60 via-transparent to-metagami-bg/80" />

      </div>


      <div className="max-w-4xl text-center z-10 space-y-6">


        <p className="text-sm tracking-[0.3em] text-metagami-muted uppercase font-medium font-display">
          {t("home.studio")}
        </p>


        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-metagami-text font-display uppercase">
          {t("home.heroTitle")}
        </h1>


        <p className="text-metagami-text/80 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          {t("home.heroDescription")}
        </p>


        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">


          <Link href="/koleksiyon">

            <button className="px-8 py-3 bg-metagami-text text-metagami-bg rounded-full">
              {t("home.exploreCollection")}
            </button>

          </Link>


          <button className="px-8 py-3 border border-metagami-text/30 rounded-full">
            {t("home.bespoke")}
          </button>


        </div>


      </div>

    </section>
  );
}