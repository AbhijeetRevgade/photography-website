"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120;

export default function HeroClient({ hero }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress for a high-end feel
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Map scroll (0 to 1) to frame index (1 to 120)
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const loadedImages = [];
      const promises = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i}_delay-0.04s.jpg`;
        const promise = new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            resolve(null); // Resolve with null on error
          };
        });
        promises.push(promise);
      }

      const results = await Promise.all(promises);

      if (isMounted) {
        // Filter out nulls (failed loads)
        const validImages = results.filter(img => img !== null);
        setImages(validImages);
        setIsLoading(false);
      }
    };
    loadImages();
    return () => {
      isMounted = false;
    };
  }, []);

  // Draw logic
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use the first image to determine aspect ratio if available
    // Ensure index is within bounds of valid images
    const safeIndex = Math.min(images.length - 1, Math.max(0, Math.floor(index) - 1));
    const img = images[safeIndex];

    // Safety check: Don't draw if image is broken or not loaded
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // "Cover" logic: fill the screen
    let drawWidth, drawHeight, offsetX, offsetY;
    const scale = Math.max(rect.width / img.width, rect.height / img.height);
    drawWidth = img.width * scale;
    drawHeight = img.height * scale;
    offsetX = (rect.width - drawWidth) / 2;
    offsetY = (rect.height - drawHeight) / 2;

    // Clear and Draw
    ctx.clearRect(0, 0, rect.width, rect.height);
    try {
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } catch (err) {
      console.error("Error drawing frame:", err);
    }
  };

  // React to frame index changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      // Re-render current frame on resize
      renderFrame(frameIndex.getCallback ? frameIndex.get() : 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]); // Re-bind if images reload

  // Initial render when loaded
  useEffect(() => {
    if (!isLoading && images.length > 0) {
      renderFrame(1);
    }
  }, [isLoading, images]);

  // Common container with ref for useScroll
  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      {isLoading ? (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium tracking-widest uppercase">Loading Experience</p>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Text Overlays */}
          <OverlaySection progress={smoothProgress} />

          {/* Helper/Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Scroll to Explore
          </motion.div>
        </div>
      )}
    </section>
  );
}

function OverlaySection({ progress }) {
  // 1. Start (0%) - Center
  const opacity1 = useTransform(progress, [0, 0.15], [1, 0]);
  const y1 = useTransform(progress, [0, 0.15], [0, -50]);

  // 2. 25% Scroll (Left)
  const opacity2 = useTransform(progress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const x2 = useTransform(progress, [0.15, 0.25, 0.35], [-50, 0, -50]);

  // 3. 60% Scroll (Right)
  const opacity3 = useTransform(progress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const x3 = useTransform(progress, [0.5, 0.6, 0.7], [50, 0, 50]);

  // 4. 90% Scroll (Center CTA)
  const opacity4 = useTransform(progress, [0.8, 0.9, 1], [0, 1, 1]);
  const scale4 = useTransform(progress, [0.8, 0.9], [0.9, 1]);

  return (
    <>
      {/* 0% Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 p-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">Hrushikesh Warule</h1>
        <p className="text-lg md:text-xl tracking-widest uppercase text-gray-300">Visual Storyteller</p>
      </motion.div>

      {/* 25% Left */}
      <motion.div
        style={{ opacity: opacity2, x: x2 }}
        className="absolute top-1/2 left-[10%] -translate-y-1/2 text-left pointer-events-none z-10 max-w-sm p-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white/90">Capturing Moments</h2>
        <p className="text-md md:text-lg text-gray-300">Transforming vision into reality</p>
      </motion.div>

      {/* 60% Right */}
      <motion.div
        style={{ opacity: opacity3, x: x3 }}
        className="absolute top-1/2 right-[10%] -translate-y-1/2 text-right pointer-events-none z-10 max-w-sm p-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white/90">Art in Motion</h2>
        <p className="text-md md:text-lg text-gray-300">Portrait. Landscape. Life.</p>
      </motion.div>

      {/* 90% Center CTA */}
      <motion.div
        style={{ opacity: opacity4, scale: scale4 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Explore the Portfolio</h2>
        <button
          className="px-8 py-3 bg-[#ad8a56] text-white uppercase tracking-widest text-sm hover:bg-[#916f3f] transition-colors shadow-lg cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Scroll back to replay
        </button>
      </motion.div>
    </>
  );
}
