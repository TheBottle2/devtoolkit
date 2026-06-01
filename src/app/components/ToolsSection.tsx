/**
 * @file ToolsSection.tsx
 * @description Günlük Araçlar Listesi Bölümü (Arama ve Filtreleme Destekli)
 *
 * Bu bileşen kullanıcının günlük olarak kullandığı araçları
 * liste formatında gösterir ve dinamik arama/filtreleme özellikleri sunar.
 */

"use client";

import React, { useState, useMemo } from 'react';

/**
 * Araç Veri Tipi
 */
interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
}

/**
 * Araçlar verisi - Sabit dizi
 */
const tools: Tool[] = [
  {
    name: 'Warp',
    description: 'A Rust-based terminal with AI command suggestions and collaborative sessions built in.',
    category: 'Terminal',
    url: 'https://warp.dev',
  },
  {
    name: 'Linear',
    description: 'Issue tracking that feels like a product, not a spreadsheet. Built for fast-moving teams.',
    category: 'Project Management',
    url: 'https://linear.app',
  },
  {
    name: 'Raycast',
    description: 'macOS launcher that replaces Spotlight — extensions for everything from GitHub to Vercel.',
    category: 'Productivity',
    url: 'https://raycast.com',
  },
  {
    name: 'Hoppscotch',
    description: 'Lightweight open-source API testing. Faster than Postman, runs in the browser.',
    category: 'API Testing',
    url: 'https://hoppscotch.io',
  },
  {
    name: 'Excalidraw',
    description: 'Virtual whiteboard for quick architecture diagrams with a hand-drawn aesthetic.',
    category: 'Diagramming',
    url: 'https://excalidraw.com',
  },
];

/**
 * ToolsSection Bileşeni
 */
export default function ToolsSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Kategorileri otomatik çıkar
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(tools.map((t) => t.category)))];
  }, []);

  // Filtreleme mantığı
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                            tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section id="tools" className="py-16 sm:py-24" aria-labelledby="tools-heading">
      <div className="max-w-6xl mx-auto px-6">
        {/* BAŞLIK VE FİLTRELER */}
        <div className="section-reveal stagger-1 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 sm:mb-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3" aria-hidden="true">
              Favorite Tools
            </p>
            <h2 id="tools-heading" className="font-sans font-bold text-3xl sm:text-4xl text-foreground leading-tight tracking-tight mb-4">
              Daily Drivers.
            </h2>
            <p className="text-sm font-medium text-muted-foreground max-w-sm leading-relaxed">
              Tools I actually open every day — not just ones I installed once.
            </p>
          </div>

          {/* Filtreleme Arayüzü */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group/input">
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/60"
                aria-label="Search tools"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
              aria-label="Filter category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-background text-foreground">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* LİSTE */}
        <div className="flex flex-col divide-y divide-border border-t border-border" role="list" aria-label="Favorite tools list">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <article
                key={tool.name}
                role="listitem"
                className={`section-reveal stagger-${index + 1} group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 hover:bg-muted/50 active:bg-muted/80 transition-colors duration-200 px-2 -mx-2 rounded-lg`}
              >
                <span className="shrink-0 w-8 text-xs font-bold tabular-nums text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="shrink-0 sm:w-44 md:w-48">
                  <h3 className="font-sans font-semibold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {tool.category}
                  </span>
                </div>

                <p className="flex-1 text-sm font-normal text-muted-foreground leading-7">
                  {tool.description}
                </p>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider border border-border rounded hover:border-primary hover:text-primary active:scale-95 text-muted-foreground transition-all duration-200 group/link focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Visit ${tool.name} website`}
                >
                  Visit
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" focusable="false">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </article>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground italic">Aradığınız kriterlere uygun araç bulunamadı.</p>
              <button 
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </div>

        {/* ALT BİLGİ */}
        <div className="section-reveal mt-8 sm:mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground max-w-sm leading-7">
            This list updates as I discover better tools. Last updated May 2026.
          </p>
          <a
            href="https://github.com/TheBottle2/devtoolkit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            View full dotfiles on GitHub
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
