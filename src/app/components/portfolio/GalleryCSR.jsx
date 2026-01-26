"use client";

import { normalizeImageUrl } from "@/app/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="bg-black text-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16 text-center"
        >
          {data.heading && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair-display uppercase text-muted-bronze tracking-tight">
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className="mt-4 text-base sm:text-lg text-white/60 px-2 max-w-2xl mx-auto font-light">
              {data.subheading}
            </p>
          )}
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {grouped.map((g, idx) => {
            const start = indices[g.slug] ?? 0;
            const total = g.items.length;

            return (
              <motion.div
                key={g.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 sm:gap-0 border-b border-white/10 pb-4">
                  <h3 className="uppercase tracking-[0.2em] text-lg sm:text-xl font-playfair-display text-muted-bronze text-center sm:text-left">
                    {g.name}
                  </h3>

                  <div className="flex items-center justify-center sm:justify-end gap-4">
                    {g.view_more_url && (
                      <Link
                        href={g.view_more_url}
                        className="text-xs sm:text-sm uppercase tracking-widest hover:text-muted-bronze transition-colors"
                      >
                        View All
                      </Link>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePrev(g.slug)}
                        disabled={start === 0}
                        className={`w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors ${start === 0 ? "opacity-30 cursor-not-allowed" : ""
                          }`}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => handleNext(g.slug)}
                        disabled={start + pageSize >= total}
                        className={`w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors ${start + pageSize >= total
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                          }`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal carousel */}
                <div className="overflow-hidden relative">
                  <motion.div
                    className="flex gap-4 sm:gap-6"
                    initial={false}
                    animate={{
                      x: `-${(start * 100) / pageSize}%`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {g.items
                      .filter((item) => item.image)
                      .map((item) => {
                        const imgUrl = normalizeImageUrl(item.image || "");
                        if (!imgUrl) return null;
                        return (
                          <motion.figure
                            key={item.id}
                            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[320px] group cursor-pointer"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-full overflow-hidden relative aspect-[4/5]">
                              <Image
                                src={imgUrl}
                                alt={item.title || ""}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                            </div>
                            <figcaption className="mt-4 text-center sm:text-left">
                              {item.title && (
                                <h4 className="text-base sm:text-lg font-playfair-display text-white group-hover:text-muted-bronze transition-colors">
                                  {item.title}
                                </h4>
                              )}
                              {item.date && (
                                <p className="text-xs tracking-widest text-white/50 mt-1 uppercase">
                                  {item.date}
                                </p>
                              )}
                            </figcaption>
                          </motion.figure>
                        );
                      })}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
