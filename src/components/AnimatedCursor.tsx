"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Cursor hareketi
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX - 15,
          y: clientY - 15,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
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
  );
}
