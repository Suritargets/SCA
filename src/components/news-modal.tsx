"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { NewsItem } from "@/lib/news-data";

export function NewsModal({
  item,
  onClose,
}: {
  item: NewsItem;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4 text-gray-700" />
        </button>

        {/* Video */}
        {item.video && (
          <video
            src={item.video}
            controls
            className="w-full rounded-t-xl"
          />
        )}

        {/* Image */}
        {item.image && !item.video && (
          <img
            src={item.image}
            alt={item.title}
            className={`w-full rounded-t-xl ${item.content ? "object-cover max-h-72" : "object-contain"}`}
          />
        )}

        {/* Content */}
        <div className="p-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sca-orange">
            {item.date}
          </p>
          <h2 className="text-xl font-bold text-sca-navy">{item.title}</h2>
          {item.content ? (
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {item.content}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Meer informatie volgt binnenkort.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
