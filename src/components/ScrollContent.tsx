"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Twin-Turbo V8",
    value: "710 HP",
    desc: "Raw power meets refined engineering with a hand-assembled 4.0L engine.",
    icon: "⚡",
  },
  {
    title: "0-60 mph",
    value: "2.8s",
    desc: "Lightning-fast acceleration that pins you to your seat.",
    icon: "🏁",
  },
  {
    title: "Top Speed",
    value: "212 mph",
    desc: "Uncompromised velocity on the straightaways.",
    icon: "💨",
  },
];

export default function ScrollContent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sections = sectionRef.current.querySelectorAll(".section-fade");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Stagger feature cards
    const featureCards = sectionRef.current.querySelectorAll(".feature-card");
    featureCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Section 1: About */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#121212] relative"
      >
        {/* Decorative side lines */}
        <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />

        <div className="section-fade max-w-4xl text-center">
          <span className="inline-block text-orange-500/60 text-xs tracking-[0.5em] uppercase mb-6 border border-orange-500/20 px-4 py-1.5 rounded-full">
            About the Project
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-wide leading-tight">
            ENGINEERED FOR
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mt-2">
              PERFORMANCE
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/35 max-w-2xl mx-auto leading-relaxed">
            Experience the thrill of precision engineering combined with
            breathtaking design. Every curve, every line, every detail has been
            meticulously crafted for ultimate performance and visual excellence.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="w-12 h-[1px] bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
            <div className="w-12 h-[1px] bg-white/10" />
          </div>
        </div>
      </section>

      {/* Section 2: Features Grid */}
      <section
        id="features"
        className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#0e0e0e] relative overflow-hidden"
      >
        {/* Background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/[0.02] blur-3xl pointer-events-none" />

        <div className="max-w-6xl w-full relative z-10">
          <div className="section-fade text-center mb-16 sm:mb-20">
            <span className="inline-block text-orange-500/60 text-xs tracking-[0.5em] uppercase mb-4 border border-orange-500/20 px-4 py-1.5 rounded-full">
              Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              KEY FEATURES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="feature-card group relative p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-700 hover:border-orange-500/20 overflow-hidden cursor-default"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <span className="text-2xl mb-4 block">{feature.icon}</span>
                  <div className="text-orange-500/70 text-xs font-semibold uppercase tracking-[0.3em] mb-5">
                    {feature.title}
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 group-hover:text-orange-400 transition-colors duration-500">
                    {feature.value}
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/30 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: CTA */}
      <section
        id="contact"
        className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-[#121212] relative"
      >
        <div className="section-fade text-center relative z-10">
          <span className="inline-block text-orange-500/60 text-xs tracking-[0.5em] uppercase mb-6 border border-orange-500/20 px-4 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-wide">
            READY TO DRIVE?
          </h2>
          <p className="text-base sm:text-lg text-white/30 mb-12 max-w-lg mx-auto leading-relaxed">
            Discover what it feels like to command the extraordinary. Start your
            journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm tracking-[0.15em] uppercase hover:scale-105 transform shadow-lg shadow-orange-500/20">
              EXPLORE MORE
            </button>
            <button className="px-10 py-4 border border-white/15 text-white/60 font-semibold rounded-full hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300 text-sm tracking-[0.15em] uppercase">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
