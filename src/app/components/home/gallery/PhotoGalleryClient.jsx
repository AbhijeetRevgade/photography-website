"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PhotoGalleryClient({ gallery }) {
  const [hoveredId, setHoveredId] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!gallery) return null;

  const images = gallery.content_items?.filter(
    (item) => item.is_active && item.image
  );

  if (!images || images.length === 0) return null;

  // Create a masonry-style layout with varying heights
  const getImageHeight = (index) => {
    const heights = [400, 500, 450, 550, 420, 480];
    return heights[index % heights.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full px-4 sm:px-6 py-16 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide mb-4"
            style={{ color: "#ad8a56", fontFamily: "'Playfair Display', serif" }}
          >
            {gallery.heading}
          </h2>
          {gallery.subheading && (
            <p
              className="mt-2 text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {gallery.subheading}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                height: `${getImageHeight(index)}px`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title || "gallery image"}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    hoveredId === item.id ? "scale-110" : "scale-100"
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 ${
                    hoveredId === item.id ? "opacity-100" : "opacity-0"
                  }`}
                />
                {item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredId === item.id ? 1 : 0,
                      y: hoveredId === item.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-4 text-white"
                  >
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
