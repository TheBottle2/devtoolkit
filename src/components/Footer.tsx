/**
 * @file Footer.tsx
 * @description Alt Bilgi Bileşeni - Telif Hakkı ve Navigasyon Linkleri
 *
 * Bu bileşen sayfanın en altında yer alır ve:
 * - Telif hakkı bilgisi (dinamik yıl)
 * - Footer navigasyon linkleri (Stack, Tools)
 * 
 * Responsive tasarım: Mobilde dikey, desktop'ta yatay
 */

import React from 'react';
import Link from 'next/link'; // Next.js navigasyon bileşeni

/**
 * Footer Bileşeni
 * 
 * Alt bilgiyi render eder.
 * 
 * Yapı:
 * - Sol: Telif hakkı (© 2024 DevToolkit)
 * - Sağ: Navigasyon linkleri (Stack, Tools)
 * 
 * Responsive:
 * - Mobil: Dikey sıralama (flex-col)
 * - Desktop: Yatay sıralama (sm:flex-row)
 * 
 * @returns {JSX.Element} Footer bölümü
 */

export default function Footer() {
  // Dinamik yıl - Her yıl otomatik güncellenir
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      {/*
        İÇERİK KAPSAYICI
        max-w-6xl: 1152px maksimum
        py-10: Dikey padding (40px)
      */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/*
          TELİF HAKKI
          text-sm: Küçük metin
          text-muted-foreground: İkincil renk
        */}
        <p className="text-sm font-medium text-muted-foreground">
          {/* &copy;: © sembolü (HTML entity) */}
          &copy; {year} DevToolkit
        </p>

        {/*
          FOOTER NAVİGASYON
          
          aria-label="Footer navigation": Erişilebilirlik
          role="navigation": Alternatif olarak eklenebilir (nav elementi zaten var)
        */}
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6">
            {/* Stack Link */}
            <li>
              <Link
                href="#stack"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                Stack
              </Link>
            </li>
            
            {/* Tools Link */}
            <li>
              <Link
                href="#tools"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded focus:outline-none focus:ring-ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                Tools
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
