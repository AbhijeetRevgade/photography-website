"use client";

import { normalizeImageUrl } from "@/app/lib/api";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ShowcaseCSR({ initialData }) {
  if (!initialData) return null;

  const {
    heading = "",
    subheading = "",
    primary_image = "",
    content_items = [],
  } = initialData;

  const primaryUrl = normalizeImageUrl(primary_image || "");

  if (!primaryUrl) return null;

  const textVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.0, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: {
      scale: 1.0,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full h-screen">
      {/* Scroll container */}
      <div
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Primary Image Section */}
        <div className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div variants={imageVariants} className="relative w-full h-full">
              <Image
                src={primaryUrl}
                alt="Primary"
                fill
                className="object-cover brightness-105 contrast-110 saturate-120"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {heading && (
                <motion.h1
                  variants={textVariants}
                  className="font-light leading-tight text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
                >
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {heading}
                  </span>
                </motion.h1>
              )}
              {subheading && (
                <motion.p
                  variants={textVariants}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide opacity-90 max-w-3xl mx-auto leading-relaxed mt-4"
                >
                  <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                    {subheading}
                  </span>
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>

        {/* Content Images */}
        {content_items
          .filter((item) => normalizeImageUrl(item.image || ""))
          .map((item, idx) => (
            <div
              key={item.id || idx}
              className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden"
            >
              <motion.div
                className="absolute inset-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div variants={imageVariants} className="relative w-full h-full">
                  <Image
                    src={normalizeImageUrl(item.image || "")}
                    alt={item.title || `Image ${idx + 1}`}
                    fill
                    className="object-cover brightness-105 contrast-110 saturate-120"
                  />
                </motion.div>
              </motion.div>

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

              {(item.title || item.description) && (
                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ staggerChildren: 0.2 }}
                    className="space-y-6 sm:space-y-8"
                  >
                    {item.title && (
                      <motion.h2
                        variants={textVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
                      >
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      </motion.h2>
                    )}
                    {item.description && (
                      <motion.p
                        variants={textVariants}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide opacity-90 max-w-3xl mx-auto leading-relaxed"
                      >
                        <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                          {item.description}
                        </span>
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              )}
            </div>
          ))}
      </div>

      <style jsx>{`
        div[class*="overflow-y-auto"]::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
