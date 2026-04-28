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
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/**
 * Sayfa meta verileri (SEO)
 * Tarayıcı sekmesi başlığı, arama motoru açıklaması, favicon
 * Open Graph, Twitter Card, Canonical URL dahil
 */
export const metadata: Metadata = {
  title: {
    default: 'DevToolkit — Curated Dev Stack & Tools',
    template: '%s | DevToolkit',
  },
  description:
    "A developer's curated technology stack and favorite tools — everything needed to build, ship, and iterate fast in 2026.",
  metadataBase: new URL('https://devtoolkit.com'),
  alternates: {
    canonical: 'https://devtoolkit.com',
  },
  openGraph: {
    title: 'DevToolkit — Curated Dev Stack & Tools',
    description:
      "A developer's curated technology stack and favorite tools — everything needed to build, ship, and iterate fast in 2026.",
    url: 'https://devtoolkit.com',
    siteName: 'DevToolkit',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevToolkit — Curated Dev Stack & Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolkit — Curated Dev Stack & Tools',
    description:
      "A developer's curated technology stack and favorite tools — everything needed to build, ship, and iterate fast in 2026.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
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
      {/* Theme color for mobile browser address bar */}
      <meta name="theme-color" content="#4f46e5" />
      <meta name="color-scheme" content="light dark" />

      {/* JSON-LD Structured Data - Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                name: 'DevToolkit',
                url: 'https://devtoolkit.com',
                description:
                  "A developer's curated technology stack and favorite tools — everything needed to build, ship, and iterate fast in 2026.",
              },
              {
                '@type': 'Person',
                name: 'DevToolkit',
                url: 'https://devtoolkit.com',
                sameAs: ['https://github.com/TheBottle2'],
              },
            ],
          }),
        }}
      />

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
