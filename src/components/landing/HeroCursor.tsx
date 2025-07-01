"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedImages() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // İmleç hareketi
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX - 15,
          y: clientY - 15,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      // 3D hareketli ilaçlar
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
          filter: `drop-shadow(${xNorm * 5}px ${
            -yNorm * 5
          }px 5px rgba(0,0,0,0.3))`,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Özel fare imleci */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "2px solid rgb(216, 29, 29)",
          backgroundColor: "rgba(233, 135, 135, 0.3)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "normal",
        }}
      />

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
