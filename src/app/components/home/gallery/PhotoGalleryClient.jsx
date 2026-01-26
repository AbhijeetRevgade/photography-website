"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function PhotoGalleryClient({ gallery }) {
  const [hoveredId, setHoveredId] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (!gallery) return null;

  const images = gallery.content_items?.filter(
    (item) => item.is_active && item.image
  );

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-6 py-20 md:py-32 bg-white text-black">
      <div ref={ref} className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 space-y-4"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
            Portfolio
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {gallery.heading}
          </h2>
          {gallery.subheading && (
            <p className="text-gray-500 text-lg md:text-xl font-light italic max-w-2xl mx-auto font-serif">
              {gallery.subheading}
            </p>
          )}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="break-inside-avoid relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative w-full overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-500 hover:shadow-xl">
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title || "gallery image"}
                  width={800}
                  height={1200} // Aspect ratio is handled by height-auto of the image itself in CSS columns
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${hoveredId === item.id ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-8 text-white transition-opacity duration-500 ${hoveredId === item.id ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3
                      className="text-2xl font-serif italic mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                    <div className="w-12 h-px bg-white/60 mb-3" />
                    <p className="text-sm tracking-widest uppercase text-white/80">
                      View Project
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
