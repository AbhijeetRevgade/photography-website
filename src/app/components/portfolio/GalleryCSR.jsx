"use client";

import { normalizeImageUrl } from "@/app/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function GalleryCSR({ initialData }) {
  const data = initialData || {};
  const contentItems = Array.isArray(data.content_items)
    ? data.content_items
    : [];

  const activeItems = contentItems.filter(
    (item) =>
      item &&
      (item.is_active ?? true) &&
      item.category &&
      (item.category.is_active ?? true)
  );

  const grouped = useMemo(() => {
    const map = new Map();
    for (let i = 0; i < activeItems.length; i++) {
      const item = activeItems[i];
      const cat = item.category || {};
      const slug = cat.slug || `cat-${cat.id ?? i}`;
      const name = cat.name || "Untitled Category";

      if (!map.has(slug)) {
        map.set(slug, {
          slug,
          name,
          view_more_url: cat.view_more_url || null,
          order: cat.order ?? 999,
          items: [],
        });
      }
      map.get(slug).items.push(item);
    }

    const arr = Array.from(map.values()).sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
    arr.forEach((c) => {
      c.items.sort((x, y) => (x.order ?? 0) - (y.order ?? 0));
    });
    return arr;
  }, [activeItems]);

  // Dynamic PAGE_SIZE based on screen width
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    function updatePageSize() {
      if (window.innerWidth < 640) setPageSize(1); // mobile: 1 image
      else if (window.innerWidth < 768) setPageSize(2); // sm: 2 images
      else if (window.innerWidth < 1024) setPageSize(3); // md: 3 images
      else setPageSize(4); // lg: 4 images
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const [indices, setIndices] = useState(() => {
    const init = {};
    for (const g of grouped) init[g.slug] = 0;
    return init;
  });

  function handlePrev(slug) {
    setIndices((prev) => {
      const start = prev[slug] ?? 0;
      const nextStart = Math.max(start - pageSize, 0);
      return { ...prev, [slug]: nextStart };
    });
  }

  function handleNext(slug) {
    setIndices((prev) => {
      const g = grouped.find((g) => g.slug === slug);
      if (!g) return prev;
      const total = g.items.length;
      const start = prev[slug] ?? 0;
      const nextStart = start + pageSize >= total ? start : start + pageSize;
      return { ...prev, [slug]: nextStart };
    });
  }

  if (!(data.is_active ?? true)) return null;

  return (
    <section className="bg-black text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="mb-6 md:mb-8 text-center">
          {data.heading && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair-display uppercase text-muted-bronze">
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className="mt-2 text-sm sm:text-base text-white/80 px-2">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="space-y-8 md:space-y-12">
          {grouped.map((g) => {
            const start = indices[g.slug] ?? 0;
            const total = g.items.length;

            return (
              <div key={g.slug}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <h3 className="uppercase tracking-widest text-base sm:text-lg md:text-xl font-playfair-display text-muted-bronze text-center sm:text-left">
                    {g.name}
                  </h3>

                  <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                    {g.view_more_url && (
                      <Link
                        href={g.view_more_url}
                        className="button px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-none whitespace-nowrap"
                      >
                        View More
                      </Link>
                    )}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => handlePrev(g.slug)}
                        disabled={start === 0}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${
                          start === 0 ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                      >
                        <ChevronLeft
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                        />
                      </button>
                      <button
                        onClick={() => handleNext(g.slug)}
                        disabled={start + pageSize >= total}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${
                          start + pageSize >= total
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal carousel */}
                <div className="overflow-hidden relative">
                  <div
                    className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${(start * 100) / pageSize}%)`,
                    }}
                  >
                    {g.items
                      .filter((item) => item.image)
                      .map((item) => {
                        const imgUrl = normalizeImageUrl(item.image || "");
                        if (!imgUrl) return null;
                        return (
                          <figure
                            key={item.id}
                            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[320px]"
                          >
                            <div className="w-full overflow-hidden rounded-none">
                              <Image
                                src={imgUrl}
                                alt={item.title || ""}
                                width={500}
                                height={500}
                                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-none"
                              />
                          </div>
                          <figcaption className="mt-2 sm:mt-3">
                            {item.title && (
                              <div className="text-xs sm:text-sm md:text-base font-playfair-display text-white line-clamp-2">
                                {item.title}
                              </div>
                            )}
                            {item.date && (
                              <div className="text-xs text-white/70 mt-1">
                                {item.date}
                              </div>
                            )}
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
