/**
 * @file HeroSection.tsx
 * @description Ana giriş/hero bölümü - Sitenin ilk gözüken bölümü
 *
 * Bu bileşen sayfanın en üstünde yer alır ve:
 * - Sitenin amacını açıklayan başlık ve alt başlık
 * - CTA (Call-to-Action) butonu
 * - İstatistik gösterimi
 * - Scroll animasyonları (fade-in, stagger)
 * 
 * Server Component: Tarayıcıda JavaScript çalıştırmadan sunucuda render edilir
 */

import React from 'react';
import Link from 'next/link'; // Next.js client-side navigasyon bileşeni

/**
 * HeroSection Bileşeni
 * 
 * Sitenin ana giriş alanı. Yapısı:
 * - Eyebrow (küçük üst başlık): "Personal Toolkit · 2026"
 * - Ana başlık: "Build. Ship. Repeat."
 * - Açıklama metni
 * - CTA butonu ("Explore My Stack")
 * - İstatistikler (6 teknoloji, 5 araç, ∞ proje)
 * 
 * @returns {JSX.Element} Hero bölümü
 */

export default function HeroSection() {
  // İstatistik verileri - dinamik olarak eklenebilir
  const stats = [
    { value: '6', label: 'Core Technologies' },
    { value: '5', label: 'Favorite Tools' },
    { value: '\u221E', label: 'Things to Build' }, // Unicode infinity sembolü (∞)
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      {/*
        İÇERİK KAPSAYICI
        
        - relative z-10: Üst katman (z-index: 10)
        - max-w-6xl: Maksimum genişlik (72rem = 1152px)
        - mx-auto: Yatay ortalama
        - px-6: Responsive yan boşluk (24px)
        - w-full: Tam genişlik
      */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/*
          EYEBROW (Üst Küçük Başlık)
          
          Animasyon sınıfı: section-reveal stagger-1
          - section-reveal: Başlangıçta görünmez, scroll'da belirir
          - stagger-1: 0ms gecikme (ilk element)
          
          aria-hidden="true": Ekran okuyucular için gizli (dekoratif)
        */}
        <div 
          className="section-reveal stagger-1 flex items-center gap-3 mb-8" 
          aria-hidden="true"
        >
          {/* Çizgi dekorasyonu */}
          <span className="w-8 h-px bg-primary" />
          {/* Eyebrow metni */}
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Personal Toolkit · 2026
          </span>
        </div>

        {/*
          ANA BAŞLIK
          
          id="hero-heading": ARIA ilişkilendirme için ID
          Animasyon: section-reveal stagger-2 (80ms gecikme)
          
          Tipografi:
          - text-4xl sm:text-5xl: Mobil 36px, tablet+ 48px
          - font-sans: Inter font
          - tracking-tight: Sıkı letter-spacing
          - leading-tight: Sıkı line-height
        */}
        <h1
          id="hero-heading"
          className="section-reveal stagger-2 font-sans font-bold text-foreground leading-tight tracking-tight mb-8 text-4xl sm:text-5xl"
        >
          Build. Ship. Repeat.
        </h1>

        {/*
          AYRAÇ ÇİZGİSİ
          
          w-full: Tam genişlik
          h-px: 1px yükseklik
          bg-border: Temadan border rengi
          Animasyon: section-reveal stagger-3 (160ms gecikme)
        */}
        <div 
          className="section-reveal stagger-3 w-full h-px bg-border mb-8" 
          aria-hidden="true" 
        />

        {/*
          AÇIKLAMA + CTA SATIRI
          
          flex-col sm:flex-row: Mobil'de dikey, tablet+ yatay
          sm:items-end: İtems bottom-aligned
          sm:justify-between: Aralarında boşluk
          
          Animasyon: section-reveal stagger-4 (240ms gecikme)
        */}
        <div className="section-reveal stagger-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          {/*
            AÇIKLAMA METNİ
            
            max-w-md: Maksimum 448px genişlik
            text-muted-foreground: İkincil metin rengi
          */}
          <p className="text-base sm:text-lg font-normal leading-relaxed text-muted-foreground max-w-md">
            My curated stack of frameworks, databases, and tools — the exact setup I use to go from
            idea to production in days, not weeks.
          </p>

          {/*
            CTA BUTONU (Call-to-Action)
            
            href="#stack": Stack bölümüne smooth scroll
            
            Stil:
            - inline-flex: Satır içi flex
            - bg-primary text-primary-foreground: Birincil renk
            - hover:opacity-85: Hover'da %85 opaklık
            - active:scale-[0.97]: Basma hissi
            
            Erişilebilirlik:
            - aria-label: Ekran okuyucu için açıklama
          */}
          <Link
            href="#stack"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background bg-primary text-primary-foreground hover:opacity-85 transition-opacity duration-200 active:scale-[0.97]"
            aria-label="Explore My Stack — scroll to stack section"
          >
            Explore My Stack
            {/*
              OK İKONU (SVG)
              
              xmlns: SVG namespace
              viewBox: 24x24 koordinat sistemi
              stroke="currentColor": Metin rengini miras alır
              aria-hidden="true": Dekoratif, ekran okuyucular için gizli
            */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {/* Aşağı ok çizimi: Dikey çizgi + V şekli */}
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </div>

        {/*
          İSTATİSTİKLER SATIRI
          
          grid grid-cols-3: 3 eşit kolon
          gap-8: Kolonlar arası boşluk (32px)
          max-w-lg: Maksimum 512px genişlik
          
          Erişilebilirlik:
          - aria-label: "Quick stats" - Bölüm tanımı
          
          Animasyon: section-reveal stagger-5 (320ms gecikme)
        */}
        <div
          className="section-reveal stagger-5 mt-10 sm:mt-16 pt-8 border-t border-border grid grid-cols-3 gap-4 sm:gap-8 max-w-lg"
          aria-label="Quick stats"
        >
          {/*
            Her bir istatistik için map ile döngü
            
            Erişilebilirlik:
            - aria-hidden="true": Sayı dekoratif, sr-only'da okunur
            - sr-only: Ekran okuyucular için gizli metin
          */}
          {stats.map((stat) => (
            <div key={stat.label}>
              {/* Sayı değeri (görsel) */}
              <div
                className="font-sans font-bold text-2xl text-foreground mb-1"
                aria-hidden="true"
              >
                {stat.value}
              </div>
              {/* Etiket (görsel + screen reader) */}
              <div className="text-[11px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {/* sr-only: Screen reader için değer */}
                <span className="sr-only">{stat.value} </span>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
