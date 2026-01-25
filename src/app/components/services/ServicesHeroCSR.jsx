"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { normalizeImageUrl } from "../../lib/api";

export default function ServicesHeroCSR({ initialData }) {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const ROTATE_INTERVAL = 5000;

  useEffect(() => {
    if (!initialData?.is_active) return;

    const activeImages = (initialData.content_items || [])
      .filter((it) => it?.is_active && it?.image)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    setImages(activeImages);
  }, [initialData]);

  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, ROTATE_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    images.forEach((img) => {
      const i = new window.Image();
      i.src = normalizeImageUrl(img.image);
    });
  }, [images]);

  if (!initialData?.is_active || images.length === 0) return null;

  return (
    <section className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((it, i) => {
          const src = normalizeImageUrl(it.image);
          return (
            <div
              key={it.id ?? i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
                i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={src}
                alt={it.title || `services-hero-${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/45 pointer-events-none" />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-12">
        <div className="text-center max-w-6xl w-full">
          {initialData.heading && (
            <div className="flex justify-center">
              <h1
                className="text-white uppercase leading-none font-serif drop-shadow-lg
                         text-5xl sm:text-6xl md:text-[104px] lg:text-[150px]"
              >
                {initialData.heading}
              </h1>
            </div>
          )}

          {initialData.description && (
            <p className="mt-4 text-white text-base md:text-lg max-w-3xl mx-auto">
              {initialData.description}
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {initialData.primary_button_text &&
              initialData.primary_button_url && (
                <a
                  href={initialData.primary_button_url}
                  className="button px-6 py-3 text-lg rounded-none whitespace-nowrap inline-block"
                  aria-label={initialData.primary_button_text}
                >
                  {initialData.primary_button_text}
                </a>
              )}

            {initialData.secondary_button_text &&
              initialData.secondary_button_url && (
                <a
                  href={initialData.secondary_button_url}
                  className="px-6 py-3 border border-white text-white inline-block"
                  aria-label={initialData.secondary_button_text}
                >
                  {initialData.secondary_button_text}
                </a>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
