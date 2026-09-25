"use client";

import { useEffect } from "react";
import { X, FileText, Download } from "lucide-react";
import type { NewsItem } from "@/lib/news-data";
import { isPdfUrl } from "@/lib/media";

function MediaBlock({ src, alt }: { src: string; alt: string }) {
  if (isPdfUrl(src)) {
    return (
      <div className="border-b bg-muted/20">
        <iframe src={src} title={alt} className="h-[70vh] w-full" />
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t bg-white py-2.5 text-sm font-medium text-sca-orange hover:bg-muted/40"
        >
          <FileText className="h-4 w-4" /> Open PDF in nieuw tabblad
          <Download className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="w-full h-auto" />;
}

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

        {/* Single image or PDF — shown in full, never cropped */}
        {item.image && !item.video && (
          <MediaBlock src={item.image} alt={item.title} />
        )}

        {/* Multiple images/PDFs — each shown in full */}
        {item.images && item.images.length > 0 && (
          <div className="flex flex-col gap-2 bg-muted/30 p-2">
            {item.images.map((src, i) => (
              <MediaBlock key={src} src={src} alt={`${item.title} ${i + 1}`} />
            ))}
          </div>
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
