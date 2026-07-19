'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext'; // Kendi yoluna göre güncelle

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Kullanıcının daha önce onay verip vermediğini kontrol et
    const consent = localStorage.getItem('metagami_cookie_consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('metagami_cookie_consent', 'accepted');
    setShowConsent(false);
    // İleride Google Analytics vb. kodları burada tetikleyebilirsin
  };

  const handleDecline = () => {
    localStorage.setItem('metagami_cookie_consent', 'declined');
    setShowConsent(false);
    // Çerezleri reddettiği durumu burada yönetebilirsin
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none flex justify-center md:justify-start">
      <div className="bg-white border border-gray-200 shadow-2xl p-6 rounded-xl max-w-sm w-full pointer-events-auto flex flex-col gap-4">
        
        <div>
  <h3 className="text-sm font-bold text-black tracking-widest mb-2">
    {t('cookie.title') || 'ÇEREZ POLİTİKASI'}
  </h3>
  
  
  <div className="text-sm text-gray-500 leading-relaxed inline-block">
    {t('cookie.description')}{' '}
    <Link 
      href="/bilgi?section=gizlilik" 
      className="text-black underline underline-offset-2 hover:text-gray-600 transition-colors"
    >
      {t('cookie.policyLink')}
    </Link>.
  </div>
</div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleAccept}
            className="flex-1 bg-black text-white text-xs font-bold tracking-widest py-3 rounded hover:bg-gray-800 transition-colors"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-gray-100 text-black text-xs font-bold tracking-widest py-3 rounded hover:bg-gray-200 transition-colors"
          >
            {t('cookie.decline')}
          </button>
        </div>

      </div>
    </div>
  );
}