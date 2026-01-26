"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const DecorativeHookSvg = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={`w-24 h-24 absolute z-0 pointer-events-none ${className}`}
    fill="none"
  >
    <path
      d="M 90 10 Q 90 90, 50 90"
      stroke="#b08d57"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polygon points="55,85 55,95 45,90" fill="#b08d57" />
  </svg>
);

export default function CtaClient({ cta }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!cta) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
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
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="w-full bg-white py-20 md:py-32 px-4 sm:px-6">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-black max-w-[1400px] mx-auto py-20 px-6 sm:px-12 md:px-24 text-center shadow-2xl shadow-[#b08d57]/20 relative overflow-hidden"
      >
        <motion.div
          variants={itemVariants}
          className="absolute inset-0 bg-gradient-to-r from-[#ad8a56]/10 via-transparent to-[#ad8a56]/10"
        />

        {/* Decorative Hooks */}
        <motion.div
          variants={itemVariants}
          className="absolute top-[-20px] left-[-20px] transform scale-x-[-1] opacity-40 hidden md:block"
        >
          <DecorativeHookSvg />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-[-20px] right-[-20px] transform scale-y-[-1] opacity-40 hidden md:block"
        >
          <DecorativeHookSvg />
        </motion.div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-10">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white z-10 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cta.heading}
          </motion.h2>
          {cta.subheading && (
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg md:text-xl z-10 font-light max-w-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cta.subheading}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4 z-10"
          >
            {cta.primary_button_text && (
              <Link
                href={cta.primary_button_url || "#"}
                className="group relative px-10 py-4 bg-[#ad8a56] text-white font-medium uppercase tracking-widest text-sm overflow-hidden shadow-lg transition-transform hover:-translate-y-1"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {cta.primary_button_text}
                </span>
                <span className="absolute inset-0 bg-[#916f45] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            )}

            {cta.secondary_button_text && (
              <Link
                href={cta.secondary_button_url || "#"}
                className="group relative px-10 py-4 border border-white text-white font-medium uppercase tracking-widest text-sm overflow-hidden hover:border-transparent transition-transform hover:-translate-y-1"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {cta.secondary_button_text}
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
