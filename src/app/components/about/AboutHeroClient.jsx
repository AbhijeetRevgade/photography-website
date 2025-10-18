"use client";
import Image from "next/image";

export default function AboutHeroClient({ about }) {
  if (!about) return null;

  return (
    <section className="bg-white">
      <div className="relative w-full h-[380px] md:h-[340px]">
        {about.background_image && (
          <Image
            src={about.background_image}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 h-full bg-black/60" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex md:flex-col justify-end items-end h-full text-white max-w-7xl pb-10">
            <div className="flex items-center w-full">
              <div className="flex flex-col max-w-2xl overflow-hidden">
                {about.title && (
                  <p className="text-sm md:text-base tracking-widest font-light mb-1">
                    {about.title}
                  </p>
                )}

                <h1 className="text-[32px] md:text-[40px] font-serif font-light leading-tight ">
                  <span className="font-bold ">{about.heading}</span>
                </h1>

                {about.subheading && (
                  <p className=" text-base md:text-lg font-light ">
                    {about.subheading}
                  </p>
                )}
              </div>
            </div>
          </div>
          {about.primary_image && (
            <div className="hidden md:block absolute right-6 md:right-16 lg:right-24 bottom-[-180px] top-[100px] w-[380px] h-[480px] z-20">
              <Image
                src={about.primary_image}
                alt={about.heading}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-10 pb-24">
        <div className="max-w-lg">
          {about.description
            ?.split("\r\n")
            .filter((para) => para.trim() !== "")
            .map((para, i) => (
              <p
                key={i}
                className="mb-6 text-[15px] leading-relaxed text-gray-700"
              >
                {para.trim()}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}
