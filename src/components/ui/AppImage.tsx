/**
 * @file AppImage.tsx
 * @description Gelişmiş Resim Bileşeni - Next.js Image wrapper
 *
 * Bu bileşen Next.js Image bileşenini genişletir ve ek özellikler ekler:
 * - Otomatik hata fallback'i (yükleme başarısız olursa yedek resim)
 * - Yükleme durumu yönetimi (loading state)
 * - Dış URL optimizasyonu (unoptimized)
 * - Placeholder ve blur desteği
 * - Tıklama desteği
 * 
 * memo() ile optimize edilmiştir (gereksiz re-render'ları önler)
 * 
 * Kullanım:
 * <AppImage src="/photo.jpg" alt="Açıklama" width={400} height={300} />
 * <AppImage src="https://example.com/img.jpg" alt="Dış resim" unoptimized />
 */

'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image'; // Next.js optimize edilmiş Image bileşeni

/**
 * AppImage Props Arayüzü
 * @extends Next.js Image props
 */
interface AppImageProps {
  src: string; // Resim kaynağı (URL veya yol)
  alt: string; // Erişilebilirlik için alternatif metin
  width?: number; // Genişlik (piksel)
  height?: number; // Yükseklik (piksel)
  className?: string; // Ek CSS sınıfları
  priority?: boolean; // LCP için öncelikli yükleme
  quality?: number; // Kalite (1-100), varsayılan: 85
  placeholder?: 'blur' | 'empty'; // Placeholder tipi
  blurDataURL?: string; // Base64 blur placeholder
  fill?: boolean; // Parent'a göre doldur
  sizes?: string; // Responsive sizes attribute
  onClick?: () => void; // Tıklama işleyici
  fallbackSrc?: string; // Hata durumunda gösterilecek yedek
  loading?: 'lazy' | 'eager'; // Yükleme stratejisi
  unoptimized?: boolean; // Optimizasyonu devre dışı bırak
  [key: string]: any; // Ek Next.js Image props
}

/**
 * AppImage Bileşeni
 * 
 * Next.js Image bileşenini geliştirilmiş özelliklerle sarar.
 * 
 * Özellikler:
 * 1. Hata yönetimi: Yükleme başarısız olursa fallbackSrc gösterilir
 * 2. Yükleme durumu: isLoading state'i (placeholder için)
 * 3. Dış URL'ler: http ile başlayan URL'ler unoptimized işlenir
 * 4. Memoization: Performans optimizasyonu
 * 
 * @param {AppImageProps} props - Resim props
 * @returns {JSX.Element} Optimize edilmiş resim
 */
const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  onClick,
  fallbackSrc = '/assets/images/no_image.png', // Varsayılan yedek
  loading = 'lazy',
  unoptimized = false,
  ...props
}: AppImageProps) {
  // === STATE YÖNETİMİ ===
  
  // Mevcut resim kaynağı (hata durumunda fallback'e geçer)
  const [imageSrc, setImageSrc] = useState(src);
  
  // Yükleme durumu (placeholder göstermek için)
  const [isLoading, setIsLoading] = useState(true);
  
  // Hata durumu (fallback kullanıldı mı?)
  const [hasError, setHasError] = useState(false);

  // === MEMOIZED DEĞERLER ===
  
  /**
   * Dış URL kontrolü
   * http veya https ile başlayan URL'ler dış kaynaklıdır
   */
  const isExternalUrl = useMemo(
    () => typeof imageSrc === 'string' && imageSrc.startsWith('http'),
    [imageSrc]
  );

  /**
   * Unoptimized kararı
   * - Props'tan gelen unoptimized
   * - VEYA dış URL (Next.js dış URL'leri optimize edemez)
   */
  const resolvedUnoptimized = unoptimized || isExternalUrl;

  // === CALLBACK'LER ===
  
  /**
   * Yükleme hatası işleyici
   * - Yedek resme geç
   * - Hata durumunu kaydet
   * - Yüklemeyi tamamla
   */
  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  }, [hasError, imageSrc, fallbackSrc]);

  /**
   * Yükleme başarı işleyici
   * - Yüklemeyi tamamla
   * - Hata durumunu sıfırla
   */
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  /**
   * CSS sınıf hesaplaması
   * - Yükleme durumu: bg-gray-200 (placeholder)
   * - Tıklanabilir: cursor-pointer + hover efekti
   */
  const imageClassName = useMemo(() => {
    const classes = [className];
    if (isLoading) classes.push('bg-gray-200');
    if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
    return classes.filter(Boolean).join(' ');
  }, [className, isLoading, onClick]);

  /**
   * Next.js Image props derlemesi
   * Tüm props'ları memoize ederek gereksiz re-render'ları önler
   */
  const imageProps = useMemo(() => {
    const baseProps: any = {
      src: imageSrc,
      alt,
      className: imageClassName,
      quality,
      placeholder,
      unoptimized: resolvedUnoptimized,
      onError: handleError,
      onLoad: handleLoad,
      onClick,
    };

    // Priority varsa loading lazy'i atla
    if (priority) {
      baseProps.priority = true;
    } else {
      baseProps.loading = loading;
    }

    // Blur placeholder varsa ekle
    if (blurDataURL && placeholder === 'blur') {
      baseProps.blurDataURL = blurDataURL;
    }

    return baseProps;
  }, [
    imageSrc,
    alt,
    imageClassName,
    quality,
    placeholder,
    blurDataURL,
    resolvedUnoptimized,
    priority,
    loading,
    handleError,
    handleLoad,
    onClick,
  ]);

  // === RENDER ===
  
  // FILL MODE: Parent container'a göre doldur
  if (fill) {
    return (
      <div className="relative" style={{ width: '100%', height: '100%' }}>
        <Image
          {...imageProps}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          style={{ objectFit: 'cover' }}
          {...props}
        />
      </div>
    );
  }

  // NORMAL MODE: Belirtilen boyutlarda
  return (
    <Image
      {...imageProps}
      width={width || 400} // Varsayılan: 400px
      height={height || 300} // Varsayılan: 300px
      sizes={sizes}
      {...props}
    />
  );
});

// React DevTools için displayName
AppImage.displayName = 'AppImage';

export default AppImage;
