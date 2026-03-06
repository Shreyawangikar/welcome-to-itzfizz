"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── deterministic pseudo-random ─── */
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ─── data ─── */
const WELCOME = "WELCOME TO".split("");
const ITZFIZZ = "ITZFIZZ".split("");

const CONFETTI_COLORS = [
  "#FFD700", "#FF6B6B", "#4ECDC4", "#A78BFA",
  "#F472B6", "#FBBF24", "#34D399", "#FFF",
];

const CONFETTI = Array.from({ length: 60 }, (_, i) => {
  const angle = (i / 60) * Math.PI * 2 + rand(i) * 0.8;
  const dist = 100 + rand(i + 100) * 400;
  return {
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    endX: Math.cos(angle) * dist,
    endY: Math.sin(angle) * dist - 60,
    rotation: rand(i + 200) * 720 - 360,
    w: 4 + rand(i + 300) * 10,
    h: 6 + rand(i + 400) * 12,
  };
});

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: 5 + rand(i + 500) * 90,
  top: 5 + rand(i + 600) * 85,
  size: 10 + rand(i + 700) * 18,
  animDelay: rand(i + 800) * 2,
}));

const INFO_CARDS = [
  { value: "500+", text: "Guests Expected", accent: "#FFD700" },
  { value: "LIVE", text: "Entertainment", accent: "#FF6B6B" },
  { value: "10+", text: "Performances", accent: "#4ECDC4" },
  { value: "2026", text: "Grand Opening", accent: "#A78BFA" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const spotlightLRef = useRef<HTMLDivElement>(null);
  const spotlightRRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    /* ── Scroll hint entrance + fade on scroll ── */
    if (scrollHintRef.current) {
      gsap.fromTo(scrollHintRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 3.2 }
      );

      const handleScroll = () => {
        if (window.scrollY > 30 && scrollHintRef.current) {
          gsap.to(scrollHintRef.current, { opacity: 0, y: -15, duration: 0.5, ease: "power2.in" });
          window.removeEventListener("scroll", handleScroll);
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: trackRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      /* ── Curtains part open ── */
      tl.to(leftCurtainRef.current, { xPercent: -100, duration: 0.25, ease: "power3.inOut" }, 0);
      tl.to(rightCurtainRef.current, { xPercent: 100, duration: 0.25, ease: "power3.inOut" }, 0);

      /* ── Spotlights sweep in ── */
      tl.fromTo(spotlightLRef.current, { opacity: 0, rotate: -30 }, { opacity: 0.7, rotate: 0, duration: 0.22 }, 0.08);
      tl.fromTo(spotlightRRef.current, { opacity: 0, rotate: 30 }, { opacity: 0.7, rotate: 0, duration: 0.22 }, 0.08);

      /* ── Center glow expands ── */
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" }, 0.18);

      /* ── Golden ribbon stretches then snaps ── */
      tl.fromTo(ribbonRef.current, { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 1, duration: 0.16, ease: "power2.out" }, 0.26);
      tl.to(ribbonRef.current, { scaleY: 6, opacity: 0, duration: 0.05, ease: "power4.in" }, 0.43);

      /* ── White flash on ribbon cut ── */
      tl.fromTo(flashRef.current, { opacity: 0 }, { opacity: 0.7, duration: 0.02 }, 0.43);
      tl.to(flashRef.current, { opacity: 0, duration: 0.07 }, 0.45);

      /* ── "WELCOME TO" letters fly in ── */
      const wLetters = gsap.utils.toArray<HTMLSpanElement>(".welcome-letter");
      tl.from(wLetters, {
        opacity: 0,
        scale: 0,
        rotateX: -90,
        y: 50,
        stagger: 0.02,
        duration: 0.24,
        ease: "back.out(1.7)",
      }, 0.36);

      /* ── "ITZFIZZ" letters slam in ── */
      const iLetters = gsap.utils.toArray<HTMLSpanElement>(".itzfizz-letter");
      tl.from(iLetters, {
        opacity: 0,
        y: 100,
        scale: 2.5,
        rotateY: 90,
        stagger: 0.022,
        duration: 0.24,
        ease: "expo.out",
      }, 0.48);

      /* ── Tagline ── */
      tl.from(".tagline-text", { opacity: 0, y: 25, duration: 0.15, ease: "power2.out" }, 0.68);

      /* ── Confetti burst from center ── */
      const confettiEls = gsap.utils.toArray<HTMLDivElement>(".confetti-piece");
      confettiEls.forEach((el, i) => {
        const d = CONFETTI[i];
        tl.fromTo(
          el,
          { x: 0, y: 0, opacity: 0, scale: 0, rotation: 0 },
          {
            x: d.endX,
            y: d.endY,
            opacity: 1,
            scale: 1,
            rotation: d.rotation,
            duration: 0.2,
            ease: "power2.out",
          },
          0.44 + rand(i) * 0.14
        );
      });

      /* ── Sparkle stars pop in ── */
      const sparkleEls = gsap.utils.toArray<HTMLDivElement>(".sparkle-star");
      sparkleEls.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "elastic.out(1, 0.5)" },
          0.60 + i * 0.012
        );
      });

      /* ── Decorative frame ── */
      tl.from(".deco-frame", { opacity: 0, scale: 1.15, duration: 0.22, ease: "power2.out" }, 0.58);

      /* ── Info cards slide up ── */
      const cards = gsap.utils.toArray<HTMLDivElement>(".info-card");
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.13, ease: "power3.out" },
          0.76 + i * 0.045
        );
      });

      /* ── Stage floor glow ── */
      tl.fromTo(".stage-floor", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.25);

      /* ── Hold at end ── */
      tl.to({}, { duration: 0.08 }, 0.92);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="hero-section relative" style={{ height: "500vh" }}>
      <div ref={trackRef} className="h-screen w-full relative overflow-hidden bg-[#0a0a14]">

        {/* ── Background ambient ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1030_0%,_#0a0a14_70%)]" />

        {/* ── Left Curtain ── */}
        <div
          ref={leftCurtainRef}
          className="absolute inset-y-0 left-0 w-1/2 z-30"
          style={{
            background: "linear-gradient(90deg, #4a0808 0%, #8B0000 35%, #a01020 55%, #8B0000 75%, #5a0a0a 100%)",
            boxShadow: "inset -20px 0 60px rgba(0,0,0,0.5)",
          }}
        >
          <div className="absolute inset-0" style={{
            background: "repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.12) 25px, transparent 50px)",
          }} />
          <div className="absolute right-0 inset-y-0 w-[6px]" style={{
            background: "linear-gradient(180deg, #FFD700 0%, #B8860B 50%, #FFD700 100%)",
            boxShadow: "0 0 12px rgba(255,215,0,0.4)",
          }} />
        </div>

        {/* ── Right Curtain ── */}
        <div
          ref={rightCurtainRef}
          className="absolute inset-y-0 right-0 w-1/2 z-30"
          style={{
            background: "linear-gradient(270deg, #4a0808 0%, #8B0000 35%, #a01020 55%, #8B0000 75%, #5a0a0a 100%)",
            boxShadow: "inset 20px 0 60px rgba(0,0,0,0.5)",
          }}
        >
          <div className="absolute inset-0" style={{
            background: "repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.12) 25px, transparent 50px)",
          }} />
          <div className="absolute left-0 inset-y-0 w-[6px]" style={{
            background: "linear-gradient(180deg, #FFD700 0%, #B8860B 50%, #FFD700 100%)",
            boxShadow: "0 0 12px rgba(255,215,0,0.4)",
          }} />
        </div>

        {/* ── Spotlight Left ── */}
        <div
          ref={spotlightLRef}
          className="absolute z-10 pointer-events-none"
          style={{
            top: "-5%",
            left: "-5%",
            width: "70%",
            height: "115%",
            opacity: 0,
            transformOrigin: "top left",
            background: "conic-gradient(from 130deg at 5% 5%, transparent 0deg, rgba(255,248,220,0.07) 18deg, transparent 36deg)",
          }}
        />

        {/* ── Spotlight Right ── */}
        <div
          ref={spotlightRRef}
          className="absolute z-10 pointer-events-none"
          style={{
            top: "-5%",
            right: "-5%",
            width: "70%",
            height: "115%",
            opacity: 0,
            transformOrigin: "top right",
            background: "conic-gradient(from -165deg at 95% 5%, transparent 0deg, rgba(255,248,220,0.07) 18deg, transparent 36deg)",
          }}
        />

        {/* ── Center glow ── */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none"
          style={{
            width: "min(700px, 90vw)",
            height: "min(700px, 90vw)",
            opacity: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)",
          }}
        />

        {/* ── Golden Ribbon ── */}
        <div
          ref={ribbonRef}
          className="absolute top-1/2 left-0 w-full z-20 pointer-events-none -translate-y-1/2"
          style={{
            height: "5px",
            background: "linear-gradient(90deg, #B8860B, #FFD700, #FFF8DC, #FFD700, #B8860B)",
            transformOrigin: "center",
            boxShadow: "0 0 20px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.25)",
          }}
        />

        {/* ── Flash overlay ── */}
        <div ref={flashRef} className="absolute inset-0 z-[28] pointer-events-none bg-white" style={{ opacity: 0 }} />

        {/* ── Decorative frame ── */}
        <div className="deco-frame absolute z-[12] pointer-events-none" style={{
          top: "12%",
          left: "8%",
          right: "8%",
          bottom: "18%",
          border: "1px solid rgba(212,175,55,0.15)",
          borderRadius: "12px",
          opacity: 0,
        }}>
          <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-2 border-l-2 border-[#FFD700] rounded-tl-lg" />
          <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-2 border-r-2 border-[#FFD700] rounded-tr-lg" />
          <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-2 border-l-2 border-[#FFD700] rounded-bl-lg" />
          <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-2 border-r-2 border-[#FFD700] rounded-br-lg" />
        </div>

        {/* ── Text container ── */}
        <div className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none gap-1">
          {/* WELCOME TO */}
          <div className="flex flex-wrap justify-center" style={{ gap: "0.15em", perspective: "800px" }}>
            {WELCOME.map((char, i) => (
              <span
                key={`w-${i}`}
                className="welcome-letter inline-block"
                style={{
                  fontSize: "clamp(1rem, 3vw, 2.8rem)",
                  fontWeight: 300,
                  color: "#e8d5a3",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  textShadow: "0 0 20px rgba(212,175,55,0.3)",
                  willChange: "transform, opacity",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* ITZFIZZ */}
          <div className="flex flex-wrap justify-center mt-1" style={{ gap: "0.04em", perspective: "1000px" }}>
            {ITZFIZZ.map((char, i) => (
              <span
                key={`i-${i}`}
                className="itzfizz-letter inline-block"
                style={{
                  fontSize: "clamp(2.5rem, 11vw, 9rem)",
                  fontWeight: 800,
                  color: "#FFD700",
                  textShadow:
                    "0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.15), 0 4px 12px rgba(0,0,0,0.6)",
                  letterSpacing: "0.06em",
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p
            className="tagline-text mt-5 tracking-[0.5em] uppercase"
            style={{
              fontSize: "clamp(0.55rem, 1.2vw, 0.85rem)",
              color: "rgba(255,248,220,0.5)",
              fontWeight: 300,
              opacity: 0,
            }}
          >
            The Grand Inauguration
          </p>
        </div>

        {/* ── Confetti pieces ── */}
        {CONFETTI.map((piece) => (
          <div
            key={`c-${piece.id}`}
            className="confetti-piece absolute z-[18] pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: `${piece.w}px`,
              height: `${piece.h}px`,
              background: piece.color,
              borderRadius: piece.id % 3 === 0 ? "50%" : "2px",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* ── Sparkle stars ── */}
        {SPARKLES.map((s) => (
          <div
            key={`s-${s.id}`}
            className="sparkle-star absolute z-[16] pointer-events-none"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <svg viewBox="0 0 24 24" fill="#FFD700" className="w-full h-full animate-twinkle" style={{ animationDelay: `${s.animDelay}s` }}>
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
            </svg>
          </div>
        ))}

        {/* ── Info cards ── */}
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-[16] flex gap-3 md:gap-5 pointer-events-none">
          {INFO_CARDS.map((card, i) => (
            <div
              key={`card-${i}`}
              className="info-card flex flex-col items-center px-3 py-2.5 md:px-6 md:py-4 rounded-xl"
              style={{
                opacity: 0,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${card.accent}30`,
                minWidth: "80px",
                willChange: "transform, opacity",
              }}
            >
              <span className="text-xl md:text-3xl font-bold" style={{ color: card.accent }}>
                {card.value}
              </span>
              <span
                className="text-[9px] md:text-xs mt-1 tracking-widest uppercase text-center"
                style={{ color: "rgba(255,248,220,0.5)" }}
              >
                {card.text}
              </span>
            </div>
          ))}
        </div>

        {/* ── Stage floor gradient ── */}
        <div
          className="stage-floor absolute bottom-0 left-0 right-0 h-[22%] z-[2] pointer-events-none"
          style={{
            opacity: 0,
            background: "linear-gradient(0deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
          }}
        />

        {/* ── Scroll instruction overlay ── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-[3%] left-1/2 z-[35] flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: 0, transform: "translateX(-50%)" }}
        >
          <span
            className="text-[#e8d5a3]/70 text-[11px] tracking-[0.4em] uppercase font-light"
            style={{ textShadow: "0 0 12px rgba(212,175,55,0.3)" }}
          >
            Scroll to unveil
          </span>
          {/* Animated chevron */}
          <div className="scroll-hint-bounce" style={{ position: "relative", left: "50%", transform: "translateX(-50%)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </div>
          {/* Thin golden line */}
          <div
            className="w-[1px] h-8 mt-1"
            style={{ background: "linear-gradient(to bottom, rgba(255,215,0,0.5), transparent)" }}
          />
        </div>
      </div>
    </div>
  );
}
