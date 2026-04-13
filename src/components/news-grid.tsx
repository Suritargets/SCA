"use client";

import { useState } from "react";
import { newsItems, type NewsItem } from "@/lib/news-data";
import { NewsModal } from "@/components/news-modal";
import { Calendar, Play } from "lucide-react";

export function NewsGrid() {
  const [selected, setSelected] = useState<NewsItem | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((n) => (
          <button
            key={n.title}
            onClick={() => setSelected(n)}
            className="group text-left rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Card image / video thumbnail */}
            {n.image ? (
              <img
                src={n.image}
                alt={n.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : n.video ? (
              <div className="w-full h-44 bg-gray-900 flex items-center justify-center relative overflow-hidden">
                <video src={n.video} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-sca-orange shadow-lg">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            ) : (
              <div className="w-full h-44 bg-gradient-to-br from-sca-orange/20 to-sca-orange/5 flex items-center justify-center">
                <span className="text-3xl font-black text-sca-orange/30">SCA</span>
              </div>
            )}

            {/* Card body */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {n.date}
              </div>
              <p className="font-semibold text-sca-navy group-hover:text-sca-orange transition-colors leading-snug">
                {n.title}
              </p>
              {n.content && (
                <p className="text-xs text-muted-foreground line-clamp-2">{n.content}</p>
              )}
              <span className="inline-block text-xs font-semibold text-sca-orange mt-1">
                Read more →
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <NewsModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
