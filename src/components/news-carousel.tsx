"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { newsItems, type NewsItem } from "@/lib/news-data";
import { NewsModal } from "@/components/news-modal";

const VISIBLE = 4;
const INTERVAL = 4000;

export function NewsCarousel() {
  const [start, setStart] = useState(0);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const total = newsItems.length;

  const next = useCallback(() => {
    setStart((s) => (s + 1) % total);
  }, [total]);

  const prev = () => {
    setStart((s) => (s - 1 + total) % total);
  };

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => newsItems[(start + i) % total]);

  const pages = Math.ceil(total / VISIBLE);
  const activePage = Math.floor(start / VISIBLE) % pages;

  return (
    <>
      <div className="relative">
        {/* Cards */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {visible.map((item, i) => (
            <button
              key={`${item.title}-${i}`}
              onClick={() => setSelected(item)}
              className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow text-left"
            >
              {/* Thumbnail */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : item.video ? (
                <div className="h-36 w-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
                  <video src={item.video} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-sca-orange shadow">
                    <Play className="h-4 w-4 text-white fill-white" />
                  </div>
                </div>
              ) : (
                <div className="h-36 w-full bg-gradient-to-br from-sca-orange/20 to-sca-orange/5 flex items-center justify-center">
                  <span className="text-2xl font-black text-sca-orange/30">SCA</span>
                </div>
              )}

              {/* Body */}
              <div className="flex flex-col gap-1.5 p-3">
                <p className="text-xs font-semibold leading-snug text-sca-navy line-clamp-2 group-hover:text-sca-orange transition-colors">
                  {item.title}
                </p>
                <p className="text-[10px] text-muted-foreground">{item.date}</p>
                <span className="mt-1 inline-block w-fit rounded bg-sca-orange px-3 py-1 text-[10px] font-semibold text-white">
                  Read More
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute -left-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 border"
        >
          <ChevronLeft className="h-4 w-4 text-sca-navy" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 border"
        >
          <ChevronRight className="h-4 w-4 text-sca-navy" />
        </button>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i * VISIBLE)}
              aria-label={`Pagina ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activePage ? "bg-sca-orange" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {selected && (
        <NewsModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
