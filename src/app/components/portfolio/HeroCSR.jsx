// app/portfolio/components/home/hero/HeroCSR.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroCSR({ initialData }) {
  const data = initialData;
  if (!data) return null;

  const {
    heading,
    subheading,
    description,
    background_image,
    primary_image,
    primary_button_text,
    primary_button_url,
    secondary_button_text,
    secondary_button_url,
  } = data;

  const bgImage = background_image || primary_image || "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative min-h-[90vh] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Animated Zoom Effect for Background (simulated via container) */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 min-h-[90vh] flex items-center">
        <motion.div
          className="max-w-2xl text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {heading && (
            <motion.h1
              variants={itemVariants}
              className="main-heading mb-4 text-white"
            >
              {heading}
            </motion.h1>
          )}

          {description && (
            <motion.p
              variants={itemVariants}
              className="body-text mb-6 text-white"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            {primary_button_text && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={primary_button_url || "#"}
                  className="button px-6 py-3 rounded-none whitespace-nowrap inline-block"
                >
                  {primary_button_text}
                </Link>
              </motion.div>
            )}

            {secondary_button_text && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={secondary_button_url || "#"}
                  className="px-6 py-3 rounded-none whitespace-nowrap border border-white text-white 
                             hover:bg-white/20 hover:text-white transition-colors duration-200 inline-block"
                >
                  {secondary_button_text}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {subheading && (
          <motion.div
            className="absolute right-4"
            style={{ top: "86vh" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="text-white text-sm font-lato tracking-[0.2em] [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]">
              {subheading}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
