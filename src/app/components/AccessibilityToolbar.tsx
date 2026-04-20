/**
 * @file AccessibilityToolbar.tsx
 * @description Erişilebilirlik Araç Çubuğu - Sağ alt köşede sabit
 *
 * Bu bileşen kullanıcıların:
 * 1. Font boyutunu değiştirmesine (3 seviye)
 * 2. Karanlık/Açık tema arasında geçiş yapmasına
 * olanak tanır.
 *
 * Konum: Sağ alt köşe (fixed position)
 * Görünürlük: Her zaman görünür
 * Erişilebilirlik: role="toolbar", aria-orientation
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme'; // Tema context'i

/**
 * Font ölçek adımları
 *
 * CSS rem değişkeni olarak uygulanır (--font-size-scale)
 * 1.0 = Normal (16px)
 * 1.15 = Büyük (18.4px)
 * 1.3 = Ekstra Büyük (20.8px)
 */
const FONT_SCALE_STEPS = [1, 1.15, 1.3];

/**
 * Font boyutu etiketleri (screen reader için)
 */
const FONT_SIZE_LABELS = ['Normal text size', 'Large text size', 'Extra large text size'];

/**
 * Accessibility Toolbar Bileşeni
 *
 * Sağ alt köşede sabit duran erişilebilirlik araçları.
 * Butonlar:
 * - A+: Font boyutu değiştirici (döngü: Normal → Büyük → Ekstra Büyük)
 * - Güneş/Ay ikonu: Tema değiştirici (Light ↔ Dark)
 *
 * @returns {JSX.Element} Erişilebilirlik araç çubuğu
 */
export default function AccessibilityToolbar() {
  // Font boyutu indeksi (0: Normal, 1: Büyük, 2: Ekstra Büyük)
  const [fontSizeIndex, setFontSizeIndex] = useState(0);

  // Tema hook'undan mevcut tema ve değiştirici fonksiyon
  const { theme, toggleTheme } = useTheme();

  /**
   * Font boyutunu değiştir
   * Döngüsel olarak ilerler: 0 → 1 → 2 → 0
   */
  const increaseFontSize = useCallback(() => {
    setFontSizeIndex((prev) => (prev + 1) % FONT_SCALE_STEPS.length);
  }, []);

  /**
   * Font boyutu değiştiğinde CSS değişkenini güncelle
   *
   * --font-size-scale değişkeni html elementine uygulanır
   * Tüm rem birimli boyutlar bundan etkilenir
   */
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-size-scale',
      String(FONT_SCALE_STEPS[fontSizeIndex])
    );
  }, [fontSizeIndex]);

  return (
    <div
      role="toolbar"
      aria-label="Accessibility options"
      aria-orientation="horizontal"
      className="fixed bottom-4 right-4 z-[9998] flex items-center gap-1 p-1.5 rounded-lg border border-border bg-background/95 backdrop-blur-sm shadow-lg"
    >
      {/* FONT BOYUTU BUTONU */}
      <button
        type="button"
        onClick={increaseFontSize}
        aria-label={`Change font size. Current: ${FONT_SIZE_LABELS[fontSizeIndex]}`}
        aria-pressed={fontSizeIndex > 0}
        title="Change font size"
        className="w-10 h-10 flex items-center justify-center rounded text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background"
      >
        <span aria-hidden="true" className="leading-none select-none">
          A+
        </span>
      </button>

      {/* AYRAÇ: İki buton arası dikey çizgi */}
      <span className="w-px h-5 bg-border" aria-hidden="true" />

      {/* TEMA DEĞİŞTİRİCİ BUTONU */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        className="w-10 h-10 flex items-center justify-center rounded text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background text-muted-foreground hover:text-foreground hover:bg-secondary"
      >
        {theme === 'dark' ? (
          // SUN ICON (Güneş)
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          // MOON ICON (Ay)
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
}
