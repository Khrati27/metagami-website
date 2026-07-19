'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext'; 

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error('Uygulama Hatası:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 bg-grid-pattern">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {t('error.title') || 'Beklenmedik bir sorun oluştu'}
        </h2>
        
        <p className="text-gray-500 text-sm">
          {t('error.desc') || 'Sayfayı yüklerken teknik bir pürüz yaşadık. Lütfen tekrar dene.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="flex-1 bg-black text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            {t('error.tryAgain') || 'Tekrar Dene'}
          </button>
          <Link
            href="/"
            className="flex-1 bg-gray-100 text-gray-900 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {t('error.home') || 'Ana Sayfaya Dön'}
          </Link>
        </div>
      </div>
    </div>
  );
}