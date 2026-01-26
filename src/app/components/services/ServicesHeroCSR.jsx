"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { normalizeImageUrl } from "../../lib/api";

export default function ServicesHeroCSR({ initialData }) {
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    // Prioritize primary_image, fallback to first content item image
    let imgUrl = initialData.primary_image;
    if (!imgUrl && initialData.content_items?.length > 0) {
      imgUrl = initialData.content_items[0].image;
    }

    if (imgUrl) {
      setBgImage(normalizeImageUrl(imgUrl));
    }
  }, [initialData]);

  if (!initialData?.is_active) return null;

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-black text-white">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={bgImage}
              alt={initialData.heading || "Services Hero"}
              fill
              priority
              className="object-cover opacity-80"
              sizes="100vw"
              draggable={false}
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl space-y-8"
        >
          {initialData.heading && (
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none uppercase drop-shadow-2xl">
              {initialData.heading}
            </h1>
          )}

          {initialData.description && (
            <p className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed tracking-wide">
              {initialData.description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            {initialData.primary_button_text && (
              <a
                href={initialData.primary_button_url || "#"}
                className="group relative px-8 py-3 bg-white text-black font-medium tracking-widest text-sm uppercase overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {initialData.primary_button_text}
                </span>
                <span className="absolute inset-0 bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            )}

            {initialData.secondary_button_text && (
              <a
                href={initialData.secondary_button_url || "#"}
                className="group relative px-8 py-3 border border-white text-white font-medium tracking-widest text-sm uppercase overflow-hidden hover:border-transparent"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {initialData.secondary_button_text}
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
