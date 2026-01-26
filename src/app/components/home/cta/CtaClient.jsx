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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
    <section ref={ref} className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-black max-w-7xl mx-auto py-16 px-6 sm:px-12 text-center rounded-none shadow-2xl shadow-[#b08d57]/30 relative overflow-hidden"
      >
        <motion.div
          variants={itemVariants}
          className="absolute inset-0 bg-gradient-to-r from-[#ad8a56]/10 via-transparent to-[#ad8a56]/10"
        />
        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-4">
          <motion.div
            variants={itemVariants}
            className="absolute top-[-30px] left-[-30px] transform scale-x-[-1] hidden md:block"
          >
            <DecorativeHookSvg className="opacity-60" />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="absolute bottom-[-30px] right-[-30px] transform scale-y-[-1] hidden md:block"
          >
            <DecorativeHookSvg className="opacity-60" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-white z-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cta.heading}
          </motion.h2>
          {cta.subheading && (
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-base md:text-lg z-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cta.subheading}
            </motion.p>
          )}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 z-10"
          >
            {cta.primary_button_text && (
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(173, 138, 86, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={cta.primary_button_url || "#"}
                  className="w-full sm:w-auto bg-[#ad8a56] hover:bg-[#ad8a56] text-black font-semibold text-sm uppercase tracking-wider px-8 py-3 transition duration-300 border border-[#b08d57] inline-block"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cta.primary_button_text} →
                </Link>
              </motion.div>
            )}
            {cta.secondary_button_text && (
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={cta.secondary_button_url || "#"}
                  className="w-full sm:w-auto bg-transparent border border-[#ad8a56] text-[#ffffff] hover:bg-[#fefefe] hover:text-[#ad8a56] font-semibold text-sm uppercase tracking-wider px-8 py-3 transition duration-300 inline-block"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cta.secondary_button_text} →
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
