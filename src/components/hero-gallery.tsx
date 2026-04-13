"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/home-banner.png", alt: "SCA Campus" },
  { src: "/home-1.png", alt: "SCA Students" },
  { src: "/home-banner-2.png", alt: "SCA Accounting" },
];

export function HeroGallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
          />
        </div>
      ))}
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
