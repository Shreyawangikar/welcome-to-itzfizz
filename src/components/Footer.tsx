"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0a0a0a] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">IF</span>
              </div>
              <span className="text-white text-sm tracking-[0.25em] uppercase font-medium">
                ITZFIZZ
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              Crafting premium digital experiences with cutting-edge animations
              and scroll-driven interactions that captivate and engage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/60 text-xs tracking-[0.3em] uppercase mb-6 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Features", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/30 text-sm hover:text-orange-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/60 text-xs tracking-[0.3em] uppercase mb-6 font-semibold">
              Connect
            </h4>
            <ul className="space-y-3">
              {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-white/30 text-sm hover:text-orange-400 transition-colors duration-300"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} ITZFIZZ. All rights reserved.
          </p>
          <p className="text-white/20 text-xs tracking-wider">
            Built with Next.js &bull; GSAP &bull; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
