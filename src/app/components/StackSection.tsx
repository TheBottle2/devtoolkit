/**
 * @file StackSection.tsx
 * @description Teknoloji Stack Kartları Bölümü - Kullanılan teknolojiler
 *
 * Bu bileşen kullanıcının kullandığı 6 temel teknolojiyi
 * kartlar halinde görsel olarak sunar:
 * - Next.js (Framework)
 * - TypeScript (Language)
 * - Tailwind CSS (Styling)
 * - PostgreSQL (Database)
 * - Vercel (Deploy)
 * - Figma (Design)
 * 
 * Her kart: emoji, isim, açıklama ve kategori etiketi içerir
 * Animasyonlu giriş (stagger) ve hover etkileri
 */

import React from 'react';

/**
 * Stack Kartı Veri Tipi
 * @property emoji - Görsel sembol (örn: ▲, TS, 🎨)
 * @property emojiLabel - Erişilebilirlik için emoji açıklaması (screen reader)
 * @property name - Teknoloji adı
 * @property description - Kısa açıklaması
 * @property tag - Kategori etiketi (Framework, Language, vb.)
 */

interface StackCard {
  emoji: string;
  emojiLabel: string;
  name: string;
  description: string;
  tag: string;
}

/**
 * Stack verileri - Sabit dizi
 * Bu veriler API'den de gelebilir, şu an statik tanımlı
 */

const stackItems: StackCard[] = [
  {
    emoji: '▲',
    emojiLabel: 'Triangle logo representing Next.js framework',
    name: 'Next.js',
    description: 'Full-stack React framework for production-grade apps.',
    tag: 'Framework',
  },
  {
    emoji: 'TS',
    emojiLabel: 'TS monogram representing TypeScript language',
    name: 'TypeScript',
    description: 'Typed JavaScript that catches bugs before they ship.',
    tag: 'Language',
  },
  {
    emoji: '🎨',
    emojiLabel: 'Artist palette emoji representing Tailwind CSS styling',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS — design directly in markup.',
    tag: 'Styling',
  },
  {
    emoji: '🐘',
    emojiLabel: 'Elephant emoji representing PostgreSQL database',
    name: 'PostgreSQL',
    description: 'Battle-tested relational database for serious data.',
    tag: 'Database',
  },
  {
    emoji: '⚡',
    emojiLabel: 'Lightning bolt emoji representing Vercel fast deployments',
    name: 'Vercel',
    description: 'Zero-config deployments with global edge network.',
    tag: 'Deploy',
  },
  {
    emoji: '✏️',
    emojiLabel: 'Pencil emoji representing Figma design tool',
    name: 'Figma',
    description: 'From wireframe to pixel-perfect design in one tool.',
    tag: 'Design',
  },
];

/**
 * StackSection Bileşeni
 * 
 * Teknoloji kartlarını grid içinde görüntüler.
 * 
 * Layout:
 * - Bölüm başlığı ("My Stack" eyebrow + "What I Build With" heading)
 * - 2 kolon (mobil) / 3 kolon (desktop) grid
 * - 6 adet kart
 * 
 * Erişilebilirlik:
 * - Her kart kendi başlık ve açıklamasını taşır
 * - aria-labelledby ile bölüm tanımlanır
 * 
 * @returns {JSX.Element} Stack bölümü
 */

export default function StackSection() {
  return (
    <section
      id="stack"
      className="py-24 border-b border-border"
      aria-labelledby="stack-heading"
    >
      {/*
        İÇERİK KAPSAYICI
        max-w-6xl: 1152px maksimum genişlik
        mx-auto: Ortalanmış
      */}
      <div className="max-w-6xl mx-auto px-6">
        {/*
          BÖLÜM BAŞLIĞI
          
          Animasyon: section-reveal stagger-1
          Layout: Mobil'de dikey, desktop'ta yatay (sm:flex-row)
        */}
        <div className="section-reveal stagger-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            {/* EYEBROW: Üst küçük başlık */}
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
              aria-hidden="true"
            >
              My Stack
            </p>
            {/* ANA BAŞLIK: H2 seviyesi */}
            <h2
              id="stack-heading"
              className="font-sans font-bold text-3xl sm:text-4xl text-foreground leading-tight tracking-tight"
            >
              What I Build With.
            </h2>
          </div>
          {/* Açıklama metni */}
          <p className="text-sm font-medium text-muted-foreground max-w-xs leading-relaxed">
            Six technologies I reach for on every serious project.
          </p>
        </div>

        {/*
          KARTLAR GRİDİ
          
          grid-cols-2: 2 kolon (mobil)
          lg:grid-cols-3: 3 kolon (1024px+)
          gap-4: Kartlar arası boşluk (16px)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/*
            Her bir kart için map ile döngü
            
            index: Stagger animasyonu için kullanılır (stagger-1'den stagger-6'ya)
          */}
{stackItems.map((item, index) => (
          <article
              key={item.name}
              className={`section-reveal stagger-${index + 1} group relative bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-200`}
              aria-label={`${item.name} — ${item.tag}: ${item.description}`}
            >
              {/*
                KATEGORİ ETİKETİ
                
                absolute: Kart içinde mutlak konum
                top-5 right-5: Sağ üst köşe
                
                Görünürlük:
                - opacity-0: Başlangıçta gizli
                - group-hover:opacity-100: Hover'da görünür
                
                aria-hidden="true": Dekoratif, ekran okuyucular için gizli
              */}
              <span
                className="absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-hidden="true"
              >
                {item.tag}
              </span>

              {/*
                EMOJI/İKON
                
                w-10 h-10: 40x40px boyut
                bg-muted: Arka plan rengi
                border border-border: Çerçeve
                
                Erişilebilirlik:
                - role="img": Görsel olarak işaretle
                - aria-label: Emoji açıklaması (screen reader)
              */}
              <div
                className="w-10 h-10 rounded flex items-center justify-center text-lg font-bold border border-border bg-muted text-foreground"
                role="img"
                aria-label={item.emojiLabel}
              >
                {item.emoji}
              </div>

              {/* TEKNOLOJİ ADI: H3 seviyesi */}
              <h3 className="font-sans font-semibold text-lg text-foreground tracking-tight">
                {item.name}
              </h3>

              {/* AÇIKLAMA: text-sm - küçük metin */}
              <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
