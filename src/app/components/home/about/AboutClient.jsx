"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function AboutClient({ about }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!about) return null;

  const imageVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="w-full px-4 sm:px-6 py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {about.primary_image && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center items-center w-full relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[500px] aspect-[4/5] relative overflow-hidden shadow-2xl"
            >
              <Image
                src={about.primary_image}
                alt={about.heading || "About image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Decor Element */}
            <div className="absolute -z-10 top-[-20px] left-[-20px] w-full h-full border border-gray-100 hidden lg:block" />
          </motion.div>
        )}

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col justify-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block"
          >
            About Me
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight"
            style={{
              color: "#ad8a56",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {about.heading}
          </motion.h2>

          {about.subheading && (
            <motion.h3
              variants={itemVariants}
              className="text-xl md:text-2xl font-light mb-8 text-gray-600 italic font-serif"
            >
              {about.subheading}
            </motion.h3>
          )}

          {about.description && (
            <motion.div
              variants={itemVariants}
              className="text-gray-500 leading-relaxed text-base md:text-lg mb-8 font-light max-w-xl"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: about.description }}
            />
          )}

          {about.primary_button_text && about.primary_button_url && (
            <motion.div variants={itemVariants}>
              <Link href={about.primary_button_url} className="inline-block group">
                <span
                  className="inline-block px-8 py-3 text-white text-sm uppercase font-medium tracking-widest bg-[#ad8a56] transition-all duration-300 shadow-lg hover:shadow-[#ad8a56]/40 hover:-translate-y-1"
                >
                  {about.primary_button_text}
                </span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
