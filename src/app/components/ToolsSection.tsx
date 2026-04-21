/**
 * @file ToolsSection.tsx
 * @description Günlük Araçlar Listesi Bölümü
 *
 * Bu bileşen kullanıcının günlük olarak kullandığı 5 aracı
 * liste formatında gösterir:
 * - Warp (Terminal)
 * - Linear (Project Management)
 * - Raycast (Productivity)
 * - Hoppscotch (API Testing)
 * - Excalidraw (Diagramming)
 * 
 * Her satır: numara, isim/kategori, açıklama, "Visit" butonu içerir
 * Liste düzeni, hover etkileri ve dış bağlantılar
 */

import React from 'react';

/**
 * Araç Veri Tipi
 * @property name - Araç adı
 * @property description - Kısa açıklaması
 * @property category - Kategorisi (Terminal, Productivity, vb.)
 * @property url - Dış bağlantı URL'si
 */

interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
}

/**
 * Araçlar verisi - Sabit dizi
 * Günlük kullanılan geliştirme araçları
 */

const tools: Tool[] = [
  {
    name: 'Warp',
    description:
      'A Rust-based terminal with AI command suggestions and collaborative sessions built in.',
    category: 'Terminal',
    url: 'https://warp.dev',
  },
  {
    name: 'Linear',
    description:
      'Issue tracking that feels like a product, not a spreadsheet. Built for fast-moving teams.',
    category: 'Project Management',
    url: 'https://linear.app',
  },
  {
    name: 'Raycast',
    description:
      'macOS launcher that replaces Spotlight — extensions for everything from GitHub to Vercel.',
    category: 'Productivity',
    url: 'https://raycast.com',
  },
  {
    name: 'Hoppscotch',
    description:
      'Lightweight open-source API testing. Faster than Postman, runs in the browser.',
    category: 'API Testing',
    url: 'https://hoppscotch.io',
  },
  {
    name: 'Excalidraw',
    description:
      'Virtual whiteboard for quick architecture diagrams with a hand-drawn aesthetic.',
    category: 'Diagramming',
    url: 'https://excalidraw.com',
  },
];

/**
 * ToolsSection Bileşeni
 * 
 * Araçları liste formatında görüntüler.
 * 
 * Layout:
 * - Bölüm başlığı
 * - Bölünmüş liste (divider çizgileri)
 * - Her satır: Index | Ad/Kategori | Açıklama | Visit butonu
 * - Alt CTA (GitHub linki)
 * 
 * Erişilebilirlik:
 * - role="list" ve role="listitem": Liste yapısı
 * - Yeni sekme uyarısı: "(opens in new tab)"
 * 
 * @returns {JSX.Element} Tools bölümü
 */

export default function ToolsSection() {
  return (
    <section id="tools" className="py-16 sm:py-24" aria-labelledby="tools-heading">
      <div className="max-w-6xl mx-auto px-6">
        {/*
          BÖLÜM BAŞLIĞI
          Animasyon: section-reveal stagger-1
        */}
        <div className="section-reveal stagger-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-16">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
              aria-hidden="true"
            >
              Favorite Tools
            </p>
            <h2
              id="tools-heading"
              className="font-sans font-bold text-3xl sm:text-4xl text-foreground leading-tight tracking-tight"
            >
              Daily Drivers.
            </h2>
          </div>
          <p className="text-sm font-medium text-muted-foreground max-w-xs leading-relaxed">
            Tools I actually open every day — not just ones I installed once.
          </p>
        </div>

        {/*
          ARAÇLAR LİSTESİ
          
          role="list": Erişilebilir liste bildirimi
          divide-y: Öğeler arası dikey çizgi
          border-t border-border: Üst çizgi
          
          Erişilebilirlik:
          - aria-label: Liste amacı açıklanır
        */}
        <div
          className="flex flex-col divide-y divide-border border-t border-border"
          role="list"
          aria-label="Favorite tools list"
        >
          {/* Her bir araç için map ile döngü */}
{tools.map((tool, index) => (
          <article
              key={tool.name}
              role="listitem"
              className={`section-reveal stagger-${index + 1} group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 hover:bg-muted active:bg-muted transition-colors duration-200 px-2 -mx-2 rounded`}
            >
              {/*
                İNDEKS NUMARASI
                
                shrink-0: Küçülme, sabit genişlik
                w-8: 32px genişlik
                tabular-nums: Monospace sayılar (hizalı)
                group-hover:text-primary: Hover'da primary renk
                
                aria-hidden="true": Numara dekoratif
              */}
              <span
                className="shrink-0 w-8 text-xs font-bold tabular-nums text-muted-foreground group-hover:text-primary transition-colors duration-200"
                aria-hidden="true"
              >
                {/* padStart: 01, 02, 03... formatı */}
                {String(index + 1).padStart(2, '0')}
              </span>

              {/*
                AD + KATEGORİ
                
                shrink-0: Sabit genişlik
                sm:w-48: 192px genişlik (desktop)
              */}
              <div className="shrink-0 sm:w-44 md:w-48">
                <h3 className="font-sans font-semibold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                  {tool.name}
                </h3>
                <span className="text-[11px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {tool.category}
                </span>
              </div>

              {/* AÇIKLAMA: Esnek genişlik */}
              <p className="flex-1 text-sm font-normal text-muted-foreground leading-7">
                {tool.description}
              </p>

              {/*
                ZİYARET LİNKİ
                
                target="_blank": Yeni sekmede aç
                rel="noopener noreferrer": Güvenlik
                
                Erişilebilirlik:
                - aria-label: Yeni sekme uyarısı
              */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider border border-border rounded hover:border-primary hover:text-primary active:border-primary active:text-primary text-muted-foreground transition-all duration-200 group/link focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Visit ${tool.name} website (opens in new tab)`}
              >
                Visit
                {/*
                  DIŞ LİNK İKONU
                  group-hover/link: Link hover'ında hareket
                */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-200"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/*
          ALT CTA
          GitHub linki ve son güncelleme bilgisi
        */}
        <div className="section-reveal mt-8 sm:mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground max-w-sm leading-7">
            This list updates as I discover better tools. Last updated April 2026.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 border-b border-transparent hover:border-primary pb-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded active:scale-[0.97]"
            aria-label="View full dotfiles on GitHub (opens in new tab)"
          >
            View full dotfiles on GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
