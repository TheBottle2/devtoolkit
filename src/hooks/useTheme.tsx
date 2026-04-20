/**
 * @file useTheme.tsx
 * @description Tema Yönetimi Hook'u ve Context Provider'ı
 *
 * Bu dosya React Context API kullanarak uygulama genelinde
 * karanlık/açık tema yönetimi sağlar.
 *
 * Özellikler:
 * - localStorage persistence (tercih hatırlanır)
 * - Sistem teması tespiti (prefers-color-scheme)
 * - FOUC (Flash of Unstyled Content) önleme
 * - TypeScript tip güvenliği
 *
 * Kullanım:
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * const { theme, toggleTheme } = useTheme();
 */

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import React from 'react';

/**
 * Tema tipi
 * 'light': Açık tema
 * 'dark': Karanlık tema
 */
type Theme = 'light' | 'dark';

/**
 * Tema Context Değeri Arayüzü
 * @property theme - Mevcut tema
 * @property toggleTheme - Temayı değiştirme fonksiyonu
 */
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Context varsayılan değeri
 * (Provider dışında kullanılırsa bu değerler geçerli olur)
 */
const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {}, // Boş fonksiyon
});

/**
 * ThemeProvider Bileşeni
 *
 * Uygulamayı sarar ve tema durumunu sağlar.
 *
 * İşlevler:
 * 1. localStorage'dan kayıtlı tema tercihini okur
 * 2. Sistem tercihini tespit eder (kayıt yoksa)
 * 3. HTML elementine 'dark' class'ını ekler/kaldırır
 * 4. Değişiklikleri localStorage'a yazar
 * 5. Hydration mismatch önleme (mounted state)
 *
 * @param {Object} props - Provider props
 * @param {React.ReactNode} props.children - Alt bileşenler
 * @returns {JSX.Element} Context Provider
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Mevcut tema durumu
  const [theme, setTheme] = useState<Theme>('light');
  
  // Hydration kontrolü (client-side mount tamamlandı mı?)
  const [mounted, setMounted] = useState(false);

  /**
   * İlk yükleme - Tema tespiti
   * 
   * localStorage'dan tema oku, yoksa sistem tercihini kontrol et
   */
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    setMounted(true);
  }, []);

  /**
   * Tema değişikliği - DOM ve storage güncelleme
   * 
   * 1. HTML elementine 'dark' class'ı ekle/kaldır
   * 2. localStorage'a kaydet
   */
  useEffect(() => {
    if (!mounted) return; // İlk mount tamamlanmadan çalıştırma
    
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  /**
   * Temayı değiştir (Light ↔ Dark)
   * useCallback ile memoize edilmiş
   */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Hydration tamamlanmadan boş render (FOUC önleme)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook'u
 *
 * Tema context'ine erişim sağlar.
 *
 * @returns {ThemeContextValue} { theme, toggleTheme }
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 * <button onClick={toggleTheme}>Toggle Theme</button>
 * <p>Current theme: {theme}</p>
 */
export function useTheme() {
  return useContext(ThemeContext);
}
