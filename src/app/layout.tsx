/**
 * @file layout.tsx
 * @description Next.js Root Layout - Tüm sayfaları saran ana kalıp
 *
 * Bu dosya Next.js App Router'da "Root Layout" olarak görev yapar.
 * Tüm sayfalar bu layout'un içinde render edilir.
 * 
 * İçerdiği yapılar:
 * - HTML temel yapısı (<html>, <body>)
 * - Font yüklemesi (Inter)
 * - Meta veriler (title, description, viewport)
 * - Tema sistemi (ThemeProvider)
 * - Global stiller (Tailwind CSS)
 * - FOUC (Flash of Unstyled Content) önleme scripti
 */

import React from 'react';

// Next.js core modülleri
import type { Metadata, Viewport } from 'next'; // Meta veri tipleri
import { Inter } from 'next/font/google'; // Google Font (Inter)

// Uygulama hook'ları ve stiller
import { ThemeProvider } from '@/hooks/useTheme'; // Karanlık/Açık tema yönetimi
import '../styles/tailwind.css'; // Tailwind CSS ve tema değişkenleri

/**
 * Inter font yapılandırması
 * @property subsets - Latin karakter seti
 * @property weight - 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
 * @property variable - CSS değişkeni adı (--font-inter)
 * @property display - Font swap stratejisi (FOIT'i önler)
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Viewport yapılandırması
 * Mobil cihazlar için responsive davranış
 */
export const viewport: Viewport = {
  width: 'device-width', // Cihaz genişliğine göre ayarla
  initialScale: 1, // Başlangıç zoom seviyesi
};

/**
 * Sayfa meta verileri (SEO)
 * Tarayıcı sekmesi başlığı, arama motoru açıklaması, favicon
 */
export const metadata: Metadata = {
  title: 'DevToolkit — Curated Dev Stack & Tools',
  description:
    "A developer's curated technology stack and favorite tools — everything needed to build, ship, and iterate fast in 2026.",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

/**
 * Root Layout Props
 * @property children - Sayfa içeriği (React alt elemanları)
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout Bileşeni
 * 
 * Bu bileşen tüm sayfaları sarar. Yapısı:
 * 
 * <html>
 *   <head>
 *     <script> /* Tema FOUC önleyici * / </script>
 *   </head>
 *   <body>
 *     <ThemeProvider>
 *       {/* Sayfa içeriği buraya gelir * /}
 *     </ThemeProvider>
 *   </body>
 * </html>
 * 
 * @param {RootLayoutProps} props - Layout props
 * @returns {JSX.Element} HTML yapısı
 */
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html 
      lang="en" // Sayfa dili (İngilizce)
      suppressHydrationWarning // Tema mismatch uyarılarını engelle
    >
      <head>
        {/* 
          FOUC (Flash of Unstyled Content) Önleyici Script
          
          Sayfa yüklenirken tema değişikliği yaparken oluşan "beyaz ekran" 
          veya tema yanıp sönmesi sorununu çözer.
          
          Çalışma mantığı:
          1. localStorage'dan kayıtlı tema tercihini okur
          2. Eğer tema yoksa, sistem tercihini kontrol eder (prefers-color-scheme)
          3. Karanlık tema seçiliyse <html> elementine 'dark' class'ı ekler
          4. Bu işlem head'de sync olarak çalışır, render önce tamamlanır
          
          IIFE (Immediately Invoked Function Expression) kullanımı:
          - Script yüklenir yüklenmez çalışır
          - Global namespace'i kirletmez
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||((!t)&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      
      {/* 
        BODY
        - inter.variable: CSS değişkeni olarak font tanımı
        - inter.className: Font uygulaması
        - ThemeProvider: Tema context'i - tüm uygulamaya tema durumunu sağlar
      */}
      <body className={`${inter.variable} ${inter.className}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
