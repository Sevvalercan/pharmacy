"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function AnimatedImages() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const imgs = document.querySelectorAll("img.cursor-anim");
      const width = window.innerWidth;
      const height = window.innerHeight;
      const xNorm = (clientX / width) * 2 - 1;
      const yNorm = (clientY / height) * 2 - 1;

      imgs.forEach((img, i) => {
        const movement = 15 + i * 10;
        const movePx = 10 + i * 5;

        gsap.to(img, {
          duration: 0.3,
          ease: "power3.out",
          transformOrigin: "center center",
          transform: `
            perspective(500px)
            rotateY(${xNorm * movement}deg)
            rotateX(${-yNorm * movement}deg)
            translateX(${xNorm * movePx}px)
            translateY(${yNorm * movePx}px)
          `,
          filter: `drop-shadow(${xNorm * 5}px ${-yNorm * 5}px 5px rgba(0,0,0,0.3))`,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* İlaç görselleri */}
      <div className="fixed top-1/2 left-8 -translate-y-1/2 z-10">
        <img
          src="/images/ilac-1.png"
          alt="İlaç Sol"
          className="w-100 h-100 object-contain drop-shadow-xl cursor-anim"
        />
      </div>
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-10">
        <img
          src="/images/ilac-2.png"
          alt="İlaç Sağ"
          className="w-90 h-100 object-contain drop-shadow-xl cursor-anim"
        />
      </div>
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-10">
        <img
          src="/images/ilac-3.png"
          alt="İlaç Orta"
          className="w-80 h-70 object-contain drop-shadow-xl cursor-anim"
        />
      </div>
    </>
  );
}
