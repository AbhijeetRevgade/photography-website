"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion, useInView } from "framer-motion";

export default function TestimonialsClient({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const items = testimonials.content_items?.filter(
    (item) => item.is_active && item.image
  );

useEffect(() => {
    if (!items.length) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstItem = container.querySelector(".snap-start");
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth;
      const newCurrent = Math.round(container.scrollLeft / itemWidth);
      setCurrent(newCurrent % items.length);
    };


    let scrollTimeout;
    const debounced = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    container.addEventListener("scroll", debounced);
    return () => {
      container.removeEventListener("scroll", debounced);
      clearTimeout(scrollTimeout);
    };
  }, [items.length]);

    useEffect(() => {
    if (!items.length) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const firstItem = container.querySelector(".snap-start");
    if (!firstItem) return;

    container.scrollTo({
      left: current * firstItem.offsetWidth,
      behavior: "smooth",
    });
  }, [current, items.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

  const allItems = items;

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 py-16 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2
          className="text-3xl md:text-4xl font-bold uppercase tracking-wide"
          style={{ color: "#ad8a56", fontFamily: "'Playfair Display', serif" }}
        >
          {testimonials.heading}
        </h2>
        {testimonials.subheading && (
          <p
            className="mt-2 text-gray-600 text-base md:text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {testimonials.subheading}
          </p>
        )}
      </motion.div>

      <div className="relative max-w-4xl mx-auto flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="hidden md:flex absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-[#ad8a56] text-white hover:bg-[#8c6e42] transition shadow-lg"
        >
          <IoChevronBack size={24} />
        </motion.button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll snap-x snap-mandatory w-full hide-scrollbar cursor-default"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {allItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
              } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              className="flex-shrink-0 w-11/12 md:w-1/2 p-2 snap-start mx-auto"
            >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative shadow-lg overflow-hidden bg-white border border-gray-100 group"
                >
                  <div className="w-full h-[350px] sm:h-[400px] relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title || "client image"}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                    className="w-full bg-white/95 p-4 transition-all duration-500"
                  >
                    <div className="content-inner">
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        {item.button_url && item.button_text && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={item.button_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-700 hover:text-[#ad8a56] transition"
                          >
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ad8a56]/20">
                              ▶
                            </span>
                            <span className="text-sm">{item.button_text}</span>
                          </motion.a>
                        )}
                        <div className="flex space-x-3">
                          {item.facebook_url && (
                            <motion.a
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              href={item.facebook_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ad8a56]/20 hover:bg-[#ad8a56]/40 transition"
                            >
                              <FaFacebookF className="text-[#ad8a56]" size={14} />
                            </motion.a>
                          )}
                          {item.instagram_url && (
                            <motion.a
                              whileHover={{ scale: 1.2, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                              href={item.instagram_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ad8a56]/20 hover:bg-[#ad8a56]/40 transition"
                            >
                              <FaInstagram className="text-[#ad8a56]" size={14} />
                            </motion.a>
                          )}
                          {item.twitter_url && (
                            <motion.a
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              href={item.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ad8a56]/20 hover:bg-[#ad8a56]/40 transition"
                            >
                              <FaTwitter className="text-[#ad8a56]" size={14} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="hidden md:flex absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-[#ad8a56] text-white hover:bg-[#8c6e42] transition shadow-lg"
        >
          <IoChevronForward size={24} />
        </motion.button>
      </div>

      {/* Dots (Hidden on Desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center space-x-2 mt-8 md:hidden"
      >
        {items.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[#ad8a56] w-4 h-4"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (min-width: 768px) {
          .group > div:nth-child(2) {
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translateY(100%);
            transition: transform 0.5s ease;
          }
          .group:hover > div:nth-child(2) {
            transform: translateY(0);
          }
        }

        @media (max-width: 767px) {
          .group > div:nth-child(2) {
            position: static !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
