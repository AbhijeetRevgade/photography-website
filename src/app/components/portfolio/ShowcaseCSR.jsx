"use client";

import { normalizeImageUrl } from "@/app/lib/api";
import Image from "next/image";

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

  return (
    <section className="relative w-full h-screen">
      {/* Scroll container with enhanced smooth snap */}
      <div
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Primary Image Section */}
        <div className="relative h-screen w-full snap-start flex items-center justify-center group">
          <Image
            src={primaryUrl}
            alt="Primary"
            fill
            className="object-cover brightness-105 contrast-110 saturate-120 transition-all duration-1000 ease-out scale-110 group-hover:scale-105"
            priority
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-all duration-1000 group-hover:via-black/40" />

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-8">
            {heading && (
              <h1 className="font-light leading-tight text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight animate-slideUp">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {heading}
                </span>
              </h1>
            )}
            {subheading && (
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide opacity-90 max-w-3xl mx-auto leading-relaxed animate-slideUp delay-300">
                <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {subheading}
                </span>
              </p>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content Images */}
        {content_items
          .filter((item) => normalizeImageUrl(item.image || ""))
          .map((item, idx) => (
            <div
              key={item.id || idx}
              className="relative h-screen w-full snap-start flex items-center justify-center group"
            >
              <Image
                src={normalizeImageUrl(item.image || "")}
                alt={item.title || `Image ${idx + 1}`}
                fill
                className="object-cover brightness-105 contrast-110 saturate-120 transition-all duration-1000 ease-out scale-110 group-hover:scale-105"
              />
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-all duration-1000 group-hover:via-black/40" />

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

            {(item.title || item.description) && (
              <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="space-y-6 sm:space-y-8">
                  {item.title && (
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight animate-slideUp">
                      <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {item.title}
                      </span>
                    </h2>
                  )}
                  {item.description && (
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide opacity-90 max-w-3xl mx-auto leading-relaxed animate-slideUp delay-200">
                      <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                        {item.description}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced CSS for scrollbar, animations and effects */}
      <style jsx>{`
        div[class*="overflow-y-auto"]::-webkit-scrollbar {
          display: none;
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced image hover effects */
        .group:hover .scale-110 {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
