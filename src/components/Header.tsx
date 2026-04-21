/**
 * @file Header.tsx
 * @description Üst Menü Bileşeni - Logo, Navigasyon, Mobil Menü, Tema Değiştirici
 *
 * Bu bileşen sayfanın üstünde sabit duran menüyü oluşturur.
 * İçerik:
 * - Logo (AppLogo bileşeni + "DevToolkit" yazısı)
 * - Masaüstü navigasyon (Stack, Tools, GitHub)
 * - Dark mode toggle butonu
 * - Mobil hamburger menü
 * 
 * Konum: Fixed (sayfa kaydırılsa bile sabit)
 * Davranış: Backdrop blur efekti
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'; // Next.js client-side navigasyon
import AppLogo from '@/components/ui/AppLogo'; // Logo bileşeni
import { useTheme } from '@/hooks/useTheme'; // Tema hook'u

/**
 * Header Bileşeni
 * 
 * Üst menüyü render eder. İki görünüm modu vardır:
 * 1. Masaüstü (sm: 640px+): Yatay menü
 * 2. Mobil (< sm): Hamburger menü
 * 
 * @returns {JSX.Element} Üst menü
 */

export default function Header() {
  // Mobil menü açık/kapalı durumu
  const [menuOpen, setMenuOpen] = useState(false);

  // Menü animasyon durumu: 'closed' → 'opening' → 'open' → 'closing'
  const [menuState, setMenuState] = useState<'closed' | 'open'>('closed');
  
  // Tema hook'undan mevcut tema ve değiştirici
  const { theme, toggleTheme } = useTheme();

  /**
   * Mobil menü açıldığında body scroll'u engelle
   * 
   * Menü açıkken arka plandaki sayfanın kaydırılmasını önler
 * Menü kapandığında veya component unmount olduğunda resetlenir
 */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      setMenuState('open');
    } else {
      document.body.style.overflow = '';
      setMenuState('closed');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /**
   * Escape tuşu ile mobil menüyü kapat
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      {/*
        İÇERİK KAPSAYICI
        max-w-6xl: 1152px maksimum
        h-16: 64px yükseklik
      */}
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/*
          LOGO
          Link: Ana sayfaya (/) yönlendirir
          focus:ring: Klavye odak göstergesi
        */}
        <Link
          href="/"
          className="flex items-center gap-2 group rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="DevToolkit home"
        >
          <AppLogo size={28} />
          <span className="font-sans font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            DevToolkit
          </span>
        </Link>

        {/*
          MASAÜSTÜ NAVİGASYON
          hidden sm:block: Mobilde gizli, tablet+ görünür
        */}
        <nav aria-label="Main navigation" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {/* Stack Link */}
            <li>
              <Link
                href="#stack"
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                Stack
                {/* Alt çizgi hover animasyonu */}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
              </Link>
            </li>
            
            {/* Tools Link */}
            <li>
              <Link
                href="#tools"
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                Tools
                <span className="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
              </Link>
            </li>
            
            {/* GitHub Link - Dış bağlantı */}
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded hover:bg-primary/80 transition-colors duration-200 tracking-tight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:scale-[0.97]"
                aria-label="View GitHub profile (opens in new tab)"
              >
                GitHub ↗
              </a>
            </li>
            
            {/* Tema Değiştirici */}
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="ml-2 w-9 h-9 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/*
          MOBİL KONTROLLER
          sm:hidden: Tablet+ gizli
          Tema butonu + Hamburger menü
        */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Mobil Tema Butonu */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          
          {/* Hamburger Menü Butonu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="w-9 h-9 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {menuOpen ? (
              // X (Kapat) ikonu
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger (Menü) ikonu
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/*
        MOBİL MENÜ (Overlay)
        
        menuOpen &&: Menü açıkken render et
        sm:hidden: Tablet+ gizli
        fixed inset-0 top-16: Header altından tam ekran
        bg-background/95: %95 opak
        backdrop-blur-md: Blur efekti
        
        ARIA:
        - id="mobile-menu": aria-controls ile ilişki
        - aria-label: "Mobile navigation"
      */}
      {/*
        MOBİL MENÜ (Overlay)

        menuState ile kontrol edilen animasyonlu menü
        sm:hidden: Tablet+ gizli
        fixed inset-0 top-16: Header altından tam ekran
        bg-background/95: %95 opak
        backdrop-blur-md: Blur efekti

        Animasyon: opacity + translateY geçişi

        ARIA:
        - id="mobile-menu": aria-controls ile ilişki
        - aria-label: "Mobile navigation"
      */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`sm:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md transition-all duration-300 ease-out ${
          menuState === 'open'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        inert={menuState !== 'open'}
      >
        <ul className="flex flex-col items-center justify-center gap-8 h-full">
          <li>
            <Link
              href="#stack"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Stack
            </Link>
          </li>
          <li>
            <Link
              href="#tools"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Tools
            </Link>
          </li>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="View GitHub profile (opens in new tab)"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
