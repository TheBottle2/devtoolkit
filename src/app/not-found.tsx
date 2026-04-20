/**
 * @file not-found.tsx
 * @description 404 Hata Sayfası - Sayfa bulunamadığında gösterilir
 *
 * Next.js App Router'da, bir sayfa bulunamadığında (404) otomatik olarak
 * bu bileşen render edilir.
 * 
 * Özellikler:
 * - Görsel olarak belirgin 404 gösterimi
 * - Geri gitme ve ana sayfa butonları
 * - Klavye erişilebilirliği
 * - responsive tasarım
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js router hook'u
import Icon from '@/components/ui/AppIcon'; // Dinamik ikon bileşeni

/**
 * 404 Sayfası Bileşeni
 * 
 * Kullanıcı olmayan bir URL'ye gittiğinde gösterilir.
 * Geri gitme veya ana sayfaya dönme seçenekleri sunar.
 * 
 * @returns {JSX.Element} 404 hata sayfası
 */
export default function NotFound() {
  // useRouter: Programatik navigasyon için Next.js hook'u
  const router = useRouter();

  /**
   * Geri gitme işleyicisi
   * Tarayıcı geçmişinde bir önceki sayfaya döner
   */
  const handleGoBack = () => {
    // window.history.back(): Tarayıcının geri tuşu işlevi
    window.history.back();
  };

  /**
   * Ana sayfaya gitme işleyicisi
   * Next.js router ile ana sayfaya (/) yönlendirir
   */
  const handleGoHome = () => {
    // router.push('/'): Client-side navigasyon
    router.push('/');
  };

  return (
    // 
    // Ana container: Tam ekran yüksekliği, ortalanmış içerik
    // bg-background: Tema değişkeni (light/dark uyumlu)
    // p-4: Responsive padding
    //
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* 
        İçerik kutusu: Maksimum genişlik sınırlaması
        max-w-md: Maksimum 448px genişlik
        text-center: Metin ortalama
      */}
      <div className="text-center max-w-md">
        {/* 
          404 GÖRSELİ
          text-9xl: Çok büyük font (144px)
          text-primary: Marka rengi
          opacity-20: %20 opaklık (arka plan efekti)
        */}
        <div className="flex justify-center mb-6">
          <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
        </div>

        {/* 
          BAŞLIK
          text-2xl: 24px font boyutu
          text-foreground: Temel metin rengi (tema uyumlu)
        */}
        <h2 className="text-2xl font-medium text-foreground mb-2">Page Not Found</h2>

        {/* 
          AÇIKLAMA
          text-muted-foreground: İkincil metin rengi
          mb-8: Alt boşluk (32px)
        */}
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back!
        </p>

        {/* 
          BUTON GRUBU
          flex: Flexbox layout
          flex-col: Mobil'de dikey (column)
          sm:flex-row: Tablet+ yatay (row)
          gap-4: Butonlar arası boşluk (16px)
          justify-center: Ortalanmış
        */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* 
            GERİ DÖN BUTONU
            
            İkon: ArrowLeftIcon (Heroicons)
            Stil: Birincil renk, dolgulu buton
            active:scale-[0.97]: Basma hissi (mikro etkileşim)
            
            Erişilebilirlik:
            - onClick: Tıklama işleyici
            - focus:ring-2: Klavye odak göstergesi
          */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:scale-[0.97]"
          >
            {/* 
              Icon bileşeni: Dinamik ikon yükleme
              name="ArrowLeftIcon": Geri ok ikonu
              size={16}: 16x16 piksel
            */}
            <Icon name="ArrowLeftIcon" size={16} />
            Go Back
          </button>

          {/* 
            ANA SAYFA BUTONU
            
            İkon: HomeIcon (Heroicons)
            Stil: Çerçeveli buton (border)
            İkincil vurgu
            
            Hover: 
            - hover:bg-accent: Arka plan rengi değişimi
            - hover:text-accent-foreground: Metin rengi değişimi
          */}
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:scale-[0.97]"
          >
            <Icon name="HomeIcon" size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
