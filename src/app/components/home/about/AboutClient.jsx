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
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
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
    <section ref={ref} className="w-full px-4 sm:px-6 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {about.primary_image && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center items-center h-full"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[380px] h-full relative overflow-hidden shadow-lg"
            >
              <Image
                src={about.primary_image}
                alt={about.heading || "About image"}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          </motion.div>
        )}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col justify-center h-full"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold uppercase mb-4 leading-snug"
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
              className="text-xl font-semibold mb-6 text-gray-800"
            >
              {about.subheading}
            </motion.h3>
          )}
          {about.description && (
            <motion.div
              variants={itemVariants}
              className="text-gray-700 leading-relaxed text-sm md:text-base max-h-[380px] md:max-h-[420px] overflow-y-auto pr-2"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: about.description }}
            />
          )}
          {about.primary_button_text && about.primary_button_url && (
            <motion.div variants={itemVariants}>
              <Link href={about.primary_button_url}>
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(173, 138, 86, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block mt-6 px-5 py-2 text-white text-sm uppercase font-medium tracking-wide bg-[#ad8a56] hover:bg-[#916f45] w-max transition cursor-pointer"
                >
                  {about.primary_button_text}
                </motion.span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
