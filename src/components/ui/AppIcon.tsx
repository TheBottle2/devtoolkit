/**
 * @file AppIcon.tsx
 * @description Dinamik İkon Bileşeni - Heroicons wrapper
 *
 * Bu bileşen Heroicons ikonlarını dinamik olarak yükler.
 * İkon adı string olarak verilir, bileşen karşılık gelen
 * Heroicons bileşenini render eder.
 * 
 * Özellikler:
 * - Outline ve Solid varyant desteği
 * - Dinamik ikon adı (string tabanlı)
 * - Otomatik fallback (soru işareti ikonu)
 * - Tıklama ve disabled durum desteği
 * 
 * Kullanım:
 * <Icon name="ArrowLeftIcon" size={16} />
 * <Icon name="HomeIcon" variant="solid" onClick={handler} />
 */

'use client';

import React from 'react';

// Heroicons kütüphaneleri
import * as HeroIcons from '@heroicons/react/24/outline'; // Çizgi ikonlar
import * as HeroIconsSolid from '@heroicons/react/24/solid'; // Dolu ikonlar
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'; // Fallback ikonu

/**
 * İkon varyant tipi
 * - 'outline': Çizgi stili (varsayılan)
 * - 'solid': Dolu stili
 */
type IconVariant = 'outline' | 'solid';

/**
 * İkon Props Arayüzü
 * @property name - Heroicons ikon adı (örn: "HomeIcon", "ArrowLeftIcon")
 * @property variant - İkon stili ('outline' | 'solid')
 * @property size - Boyut (piksel), varsayılan: 24
 * @property className - Ek CSS sınıfları
 * @property onClick - Tıklama işleyici (opsiyonel)
 * @property disabled - Pasif durum
 * @property [key: string] - Diğer SVG props'ları
 */
interface IconProps {
  name: string; // Dinamik değerler için string
  variant?: IconVariant;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any; // Spread için ek özellikler
}

/**
 * Icon Bileşeni
 * 
 * Heroicons'tan dinamik ikon yükler.
 * 
 * Çalışma mantığı:
 * 1. variant'a göre iconSet seç (outline veya solid)
 * 2. name ile iconSet'ten bileşen bul
 * 3. Bulunamazsa QuestionMarkCircleIcon (fallback) göster
 * 4. Bileşeni props ile render et
 * 
 * @param {IconProps} props - İkon props
 * @returns {JSX.Element} SVG ikon
 */
function Icon({
  name,
  variant = 'outline', // Varsayılan: çizgi stili
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  // Varyanta göre icon set seçimi
  const iconSet = variant === 'solid' ? HeroIconsSolid : HeroIcons;
  
  // Dinamik ikon bileşeni arama
  const IconComponent = iconSet[name as keyof typeof iconSet] as React.ComponentType<any>;

  // Fallback: İkon bulunamazsa soru işareti göster
  if (!IconComponent) {
    return (
      <QuestionMarkCircleIcon
        width={size}
        height={size}
        className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={disabled ? undefined : onClick}
        {...props}
      />
    );
  }

  // İkon render
  return (
    <IconComponent
      width={size}
      height={size}
      // CSS sınıfları:
      // - disabled: Soluk ve pasif imleç
      // - onClick varsa: Tıklanabilir imleç ve hover efekti
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}

export default Icon;
