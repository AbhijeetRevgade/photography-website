"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { normalizeImageUrl } from "../../lib/api";

export default function ServiceSectionCSR({ initialData }) {
  if (!initialData?.is_active) return null;

  const isEvenOrder = (initialData.order || 0) % 2 === 0;
  const imageSrc = initialData.primary_image ? normalizeImageUrl(initialData.primary_image) : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      className="py-20 md:py-32 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${isEvenOrder ? "" : "lg:flex-row-reverse"}`}>

          {/* Image Side */}
          <motion.div
            className="w-full lg:w-1/2 relative group"
            variants={itemVariants}
          >
            {imageSrc ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src={imageSrc}
                  alt={initialData.heading || "Service Section"}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Thin premium frame border */}
                <div className="absolute inset-0 border-[1px] border-white/20 pointer-events-none m-4 md:m-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ) : (
              <div className="aspect-[4/5] w-full bg-gray-50 flex items-center justify-center text-gray-300">
                No Image Available
              </div>
            )}

            {/* Decor elements */}
            <div className={`absolute -z-10 w-2/3 h-2/3 bg-gray-50 top-10 ${isEvenOrder ? "-left-10" : "-right-10"} hidden lg:block`} />
          </motion.div>

          {/* Text Side */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                {initialData.section_type || "Service"}
              </span>

              {initialData.heading && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-black leading-tight">
                  {initialData.heading}
                </h2>
              )}
            </div>

            {initialData.description && (
              <p className="text-lg text-gray-600 leading-relaxed font-light max-w-xl">
                {initialData.description}
              </p>
            )}

            <div className="pt-4 flex flex-wrap gap-6">
              {initialData.primary_button_text && (
                <a
                  href={initialData.primary_button_url || "#"}
                  className="pb-2 text-black border-b border-black text-sm uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition-colors"
                >
                  {initialData.primary_button_text}
                </a>
              )}

              {initialData.secondary_button_text && (
                <a
                  href={initialData.secondary_button_url || "#"}
                  className="pb-2 text-gray-500 border-b border-transparent hover:text-black hover:border-black text-sm uppercase tracking-widest transition-all"
                >
                  {initialData.secondary_button_text}
                </a>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
