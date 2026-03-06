"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = process.env.NODE_ENV === "production" ? "/car-scroll-animation" : "";

const LETTERS = "WELCOME ITZFIZZ".split("");

interface StatBox {
  id: string;
  value: string;
  text: string;
  bg: string;
  textColor: string;
  position: string;
  scrollStart: number;
  scrollEnd: number;
}

const STAT_BOXES: StatBox[] = [
  {
    id: "box1",
    value: "58%",
    text: "Increase in pick up point use",
    bg: "#def54f",
    textColor: "#111",
    position: "top-[5%] right-[30%]",
    scrollStart: 400,
    scrollEnd: 600,
  },
  {
    id: "box2",
    value: "23%",
    text: "Decreased in customer phone calls",
    bg: "#6ac9ff",
    textColor: "#111",
    position: "bottom-[5%] right-[35%]",
    scrollStart: 600,
    scrollEnd: 800,
  },
  {
    id: "box3",
    value: "27%",
    text: "Increase in pick up point use",
    bg: "#333",
    textColor: "#fff",
    position: "top-[5%] right-[10%]",
    scrollStart: 800,
    scrollEnd: 1000,
  },
  {
    id: "box4",
    value: "40%",
    text: "Decreased in customer phone calls",
    bg: "#fa7328",
    textColor: "#111",
    position: "bottom-[5%] right-[12.5%]",
    scrollStart: 1000,
    scrollEnd: 1200,
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const valueTextRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !carRef.current ||
      !trailRef.current ||
      !roadRef.current ||
      !valueTextRef.current
    )
      return;

    const car = carRef.current;
    const trail = trailRef.current;
    const letters = gsap.utils.toArray<HTMLSpanElement>(".value-letter");
    const valueAdd = valueTextRef.current;

    const valueRect = valueAdd.getBoundingClientRect();
    const letterOffsets = letters.map((letter) => letter.offsetLeft);

    const roadWidth = window.innerWidth;
    const carWidth = 150;
    const endX = roadWidth - carWidth;

    // Main car scroll animation
    gsap.to(car, {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".hero-track",
      },
      x: endX,
      ease: "none",
      onUpdate: function () {
        const carX = (gsap.getProperty(car, "x") as number) + carWidth / 2;

        // Reveal letters as car passes
        letters.forEach((letter, i) => {
          const letterX = valueRect.left + letterOffsets[i];
          if (carX >= letterX) {
            letter.style.opacity = "1";
          } else {
            letter.style.opacity = "0";
          }
        });

        // Update trail width
        gsap.set(trail, { width: carX });
      },
    });

    // Stat boxes fade in at scroll milestones
    STAT_BOXES.forEach((box, i) => {
      const el = boxRefs.current[i];
      if (!el) return;

      gsap.to(el, {
        scrollTrigger: {
          trigger: ".hero-section",
          start: `top+=${box.scrollStart} top`,
          end: `top+=${box.scrollEnd} top`,
          scrub: true,
        },
        opacity: 1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="hero-section relative" style={{ height: "200vh" }}>
      <div className="hero-track sticky top-0 h-screen w-full flex items-center justify-center bg-[#121212]">
        {/* Road */}
        <div
          ref={roadRef}
          className="relative w-screen overflow-hidden"
          style={{ height: "200px", backgroundColor: "#1e1e1e" }}
        >
          {/* Car image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={carRef}
            src={`${BASE_PATH}/car.png`}
            alt="car"
            className="absolute top-0 left-0 z-10"
            style={{ height: "200px" }}
          />

          {/* Green trail */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 z-[1]"
            style={{
              height: "200px",
              background: "#45db7d",
              width: 0,
            }}
          />

          {/* WELCOME ITZFIZZ letters on road */}
          <div
            ref={valueTextRef}
            className="absolute z-[5] flex"
            style={{
              top: "30%",
              left: "5%",
              fontSize: "8rem",
              fontWeight: "bold",
              gap: "0.3rem",
            }}
          >
            {LETTERS.map((char, i) => (
              <span
                key={i}
                className="value-letter"
                style={{ color: "#111", opacity: 0, transition: "opacity 0.1s" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        {/* Stat boxes */}
        {STAT_BOXES.map((box, i) => (
          <div
            key={box.id}
            ref={(el) => { boxRefs.current[i] = el; }}
            className={`absolute z-[5] flex flex-col justify-center items-start gap-[5px] rounded-[10px] m-4 ${box.position}`}
            style={{
              opacity: 0,
              background: box.bg,
              color: box.textColor,
              padding: "30px",
              fontSize: "18px",
              transition: "opacity 0.5s",
            }}
          >
            <span className="text-[58px] font-semibold leading-none">
              {box.value}
            </span>
            {box.text}
          </div>
        ))}
      </div>
    </div>
  );
}
