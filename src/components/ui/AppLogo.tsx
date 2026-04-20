/**
 * @file AppLogo.tsx
 * @description Logo Bileşeni - Resim veya İkon Desteği
 *
 * Bu bileşen logo için iki seçenek sunar:
 * 1. Resim (PNG, JPG, vb.) - Varsayılan
 * 2. İkon (Heroicons) - Resim yoksa
 * 
 * Özellikler:
 * - Otomatik resim/ikon seçimi
 * - Tıklama desteği (opsiyonel)
 * - Memoize edilmiş performans
 * 
 * Kullanım:
 * <AppLogo size={28} /> // Resim ile (varsayılan)
 * <AppLogo src={null} iconName="SparklesIcon" size={64} /> // İkon ile
 */

'use client';

import React, { memo, useMemo } from 'react';
import AppIcon from './AppIcon'; // İkon bileşeni
import AppImage from './AppImage'; // Resim bileşeni

/**
 * AppLogo Props Arayüzü
 * @property src - Resim kaynağı (yol), null ise ikon gösterilir
 * @property iconName - Heroicons ikon adı (resim yoksa kullanılır)
 * @property size - Boyut (piksel)
 * @property className - Ek CSS sınıfları
 * @property onClick - Tıklama işleyici
 */
interface AppLogoProps {
  src?: string | null; // Resim kaynağı (opsiyonel)
  iconName?: string; // İkon adı (resim yoksa)
  size?: number; // Boyut
  className?: string; // Ek sınıflar
  onClick?: () => void; // Tıklama
}

/**
 * AppLogo Bileşeni
 * 
 * Logo görselini render eder.
 * 
 * Mantık:
 * - src varsa: AppImage ile resim göster
 * - src yoksa: AppIcon ile ikon göster
 * 
 * memo() ile optimize edilmiştir.
 * 
 * @param {AppLogoProps} props - Logo props
 * @returns {JSX.Element} Logo (resim veya ikon)
 */
const AppLogo = memo(function AppLogo({
  src = '/assets/images/app_logo.png', // Varsayılan resim
  iconName = 'SparklesIcon', // Varsayılan ikon
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  /**
   * Container CSS sınıfları
   * - flex items-center: Ortalanmış
   * - onClick varsa: Tıklanabilir imleç + hover efekti
   */
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {/* 
        RESİM MODU
        src varsa resim göster
        priority: true - LCP için öncelikli
        unoptimized: SVG'ler için optimizasyonu kapat
      */}
      {src ? (
        <AppImage
          src={src}
          alt="Logo"
          width={size}
          height={size}
          className="flex-shrink-0"
          priority={true}
          unoptimized={src.endsWith('.svg')} // SVG'ler optimize edilmez
        />
      ) : (
        /* 
          İKON MODU
          src yoksa ikon göster
        */
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  );
});

// React DevTools için displayName
AppLogo.displayName = 'AppLogo';

export default AppLogo;
