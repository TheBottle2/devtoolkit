/**
 * @file page.tsx
 * @description Ana sayfa bileşeni - Tüm site bölümlerini bir araya getirir
 *
 * Bu dosya Next.js App Router yapısında ana sayfayı (/) temsil eder.
 * Sayfa içeriği şu sırayla oluşur:
 * 1. Skip to main content (Erişilebilirlik - klavye kullanıcıları için)
 * 2. Header (Üst menü)
 * 3. Main içerik (Hero + Stack + Tools bölümleri)
 * 4. Footer (Alt bilgi)
 * 5. AccessibilityToolbar (Sağ alt erişilebilirlik araçları)
 */

'use client';

import React from 'react';

// Sayfa bölümleri
import Header from '@/components/Header'; // Üst menü bileşeni
import Footer from '@/components/Footer'; // Alt bilgi bileşeni
import HeroSection from '@/app/components/HeroSection'; // Ana giriş/hero bölümü
import StackSection from '@/app/components/StackSection'; // Teknoloji stack kartları
import ToolsSection from '@/app/components/ToolsSection'; // Kullanılan araçlar listesi
import AccessibilityToolbar from '@/app/components/AccessibilityToolbar'; // Erişilebilirlik araç çubuğu

// Özel hook'lar
import { useSectionReveal } from '@/hooks/useSectionReveal'; // Scroll animasyonu hook'u

/**
 * Ana sayfa bileşeni
 * @returns {JSX.Element} Tam sayfa yapısı
 */
export default function Page() {
  // useSectionReveal: Sayfa kaydırıldıkça bölümlerin görünür olmasını sağlayan hook
  // revealRef: main elementine atanır, IntersectionObserver ile izlenir
  const revealRef = useSectionReveal();

  return (
    <>
      {/* 
        SKIP TO MAIN CONTENT LINK
        Erişilebilirlik özelliği: Klavye kullanıcıları için sayfanın başına eklenir
        - Tab ile odaklandığında görünür olur (sr-only focus:not-sr-only)
        - Tıklandığında doğrudan ana içeriğe atlar (#main-content)
        - Ekran okuyucu kullananlar için önemli
      */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:text-sm focus:font-semibold focus:rounded focus:ring-2 focus:ring-primary focus:outline-none"
      >
        Skip to main content
      </a>

      {/* HEADER: Üst menü - Logo, navigasyon, tema değiştirici */}
      <Header />

      {/* 
        MAIN CONTENT: Ana içerik alanı
        - id="main-content": Skip link hedefi
        - tabIndex={-1}: Skip link ile odaklanılabilir ama normal tab sırasına dahil değil
        - ref={revealRef}: Scroll animasyonu için IntersectionObserver bağlanır
      */}
      <main id="main-content" tabIndex={-1} ref={revealRef}>
        {/* HERO: Ana giriş bölümü - Başlık, açıklama, CTA butonu */}
        <HeroSection />
        
        {/* STACK: Teknoloji kartları bölümü (Next.js, TypeScript, vb.) */}
        <StackSection />
        
        {/* TOOLS: Günlük kullanılan araçlar listesi */}
        <ToolsSection />
      </main>

      {/* FOOTER: Alt bilgi - Telif hakkı, linkler */}
      <Footer />

      {/* 
        ACCESSIBILITY TOOLBAR: Sağ alttaki erişilebilirlik araçları
        - Font boyutu değiştirme (A+)
        - Karanlık/Açık tema toggle'ı
        - Her zaman görünür, sabit konumlu (fixed)
      */}
      <AccessibilityToolbar />
    </>
  );
}
