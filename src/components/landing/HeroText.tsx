"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animatedText = "Sağlığa En Yakın Adım!";

export default function HeroText() {
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  // Typewriter effect
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const fullText = animatedText;
    const currentIndex = loopNum % (fullText.length + 1);

    if (!isDeleting) {
      setDisplayText(fullText.substring(0, currentIndex) + "|");
      if (currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else {
        typingTimeout = setTimeout(() => setLoopNum(currentIndex + 1), 150);
      }
    } else {
      setDisplayText(fullText.substring(0, currentIndex) + "|");
      if (currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(0);
        typingTimeout = setTimeout(() => setLoopNum(1), 500);
      } else {
        typingTimeout = setTimeout(() => setLoopNum(currentIndex - 1), 75);
      }
    }

    return () => clearTimeout(typingTimeout);
  }, [isDeleting, loopNum]);

  // Scroll animation
  useEffect(() => {
    const container = textRef.current;
    if (!container) return;
    const spans = container.querySelectorAll("span");
    gsap.fromTo(
      spans,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={textRef}
      className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-snug max-w-4xl mx-auto select-none"
    >
      {/* <div className="text-6xl font-bold text-blue-800 tracking-wide">
        <span className="text-red-700">İ</span>
        <span>lacım</span>
        <span className="text-red-700"> Yanımda</span>
      </div> */}

      <div className="w-[500px]  md:w-[350px]">
        <img
          src="/images/logo.svg" // Burada logo dosyanın yolu olmalı
          alt="İlacım Yanımda Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="pt-32 text-center">
        {displayText.split("").map((char, i) => (
          <span key={i} className="inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
