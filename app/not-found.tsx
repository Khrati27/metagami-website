'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 bg-grid-pattern">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-black text-gray-200 tracking-tighter">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {t('notFound.title') || 'Sayfa Bulunamadı'}
        </h2>
        
        <p className="text-gray-500">
          {t('notFound.desc') || 'Aradığınız ürün yayından kaldırılmış veya URL yanlış yazılmış olabilir.'}
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            {t('notFound.home') || 'Ana Sayfaya Dön'}
          </Link>
        </div>
      </div>
    </div>
  );
}