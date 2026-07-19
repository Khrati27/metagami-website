'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Üst Kısım / Başlık Alanı */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-black mb-4 uppercase">
          {t('info.privacy.title') || 'Gizlilik Politikası'} & KVKK
        </h1>
        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
          Son Güncelleme: 14 Haziran 2026
        </p>
      </div>

      {/* İçerik Alanı */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-16">
        
        {/* Gizlilik Politikası Bölümü */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
            1. {t('info.privacy.title') || 'Gizlilik Politikası'}
          </h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {t('info.privacy.content')}
          </div>
        </section>

        {/* KVKK Bölümü */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
            2. {t('info.kvkk.title') || 'KVKK Aydınlatma Metni'}
          </h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {t('info.kvkk.content')}
          </div>
        </section>

        {/* Çerez Politikası Bölümü (Bonus) */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
            3. {t('cookie.title') || 'Çerez Politikası'}
          </h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {t('cookie.description')}
          </div>
        </section>

      </div>

      {/* Alt Yönlendirme */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-gray-50 p-8 rounded-2xl text-center">
          <p className="text-sm text-gray-500 mb-4">
            Bu politikalarla ilgili herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.
          </p>
          <Link 
            href="/iletisim" 
            className="inline-block bg-black text-white px-8 py-3 rounded-lg text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
          >
            {t('contact.title') || 'İLETİŞİM'}
          </Link>
        </div>
      </div>
    </div>
  );
}