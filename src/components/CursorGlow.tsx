"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of cursor width (12px / 2 = 6px)
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);
    };

    window.addEventListener("mousemove", moveCursor);

    // Setup interactive hover listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("interactive-hover") ||
        target.closest(".interactive-hover");
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-25%",
          translateY: "-25%",
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.15)" : "rgba(6, 182, 212, 0)",
          borderColor: isHovered ? "rgba(139, 92, 246, 0.8)" : "rgba(6, 182, 212, 0.6)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      {/* Core glowing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "20%",
          translateY: "20%",
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
