"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HeroClient({ hero }) {
  const images = useMemo(() => {
    if (!hero?.content_items) return [];
    return hero.content_items
      .filter((item) => item.is_active && item.image)
      .map((item) => item.image);
  }, [hero?.content_items]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (!hero) return null;

  return (
    <section className="relative w-full  h-[790px] sm:h-[500px] md:h-[655px] lg:h-[655px] overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000  overflow-hidden ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            alt={hero.heading || "hero image"}
            fill
            priority={idx === 0}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              // filter: "brightness(0.5)",
            }}
            className="transform scale-100 animate-zoom "
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/70 z-5"></div>
      <div className="relative z-20 flex flex-col items-center justify-start h-full text-center px-6 pt-[28vh] sm:pt-[36vh] md:pt-[36vh] lg:pt-[42vh]">
        <h1 className="text-white uppercase tracking-[0.42em] mt-[270px] sm:mt-[100px] md:mt-[45px] lg:mt-[80px] font-serif text-[clamp(22px,6vw,36px)] sm:text-[clamp(26px,5vw,44px)] md:text-[clamp(28px,4.8vw,50px)] leading-tight">
          {hero.heading}
        </h1>

        {hero.subheading && (
          <p
            className="mt-4 text-white/90 text-sm sm:text-base"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {hero.subheading}
          </p>
        )}

        {hero.primary_button_text && hero.primary_button_url && (
          <div className="mt-8">
            <Link href={hero.primary_button_url}>
              <span
                className="inline-block px-8 py-3 text-sm sm:text-base tracking-wide"
                style={{
                  background: "#ad8a56",
                  color: "white",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                  fontWeight: "500",
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                {hero.primary_button_text}
              </span>
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-zoom {
          animation: zoom 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
