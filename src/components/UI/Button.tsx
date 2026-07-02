"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  glow?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  glow = false,
  className = "",
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const { clientX, clientY } = e;
    const rect = button.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);

    // Apply a magnetic multiplier (pull the button by 30% of cursor distance)
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-all duration-200 cursor-pointer overflow-hidden select-none active:scale-95";
  
  let variantStyles = "";
  if (variant === "primary") {
    variantStyles = "bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white shadow-lg hover:shadow-cyan-500/20";
  } else if (variant === "secondary") {
    variantStyles = "bg-white/10 text-slate-100 hover:bg-white/15 border border-white/10";
  } else if (variant === "outline") {
    variantStyles = "bg-transparent text-slate-100 border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10";
  } else {
    variantStyles = "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5";
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
      className={`${baseStyles} ${variantStyles} ${className} interactive-hover`}
      {...props}
    >
      {/* Subtle shine effect */}
      {variant === "primary" && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      )}
      
      {/* Outer Glow Effect */}
      {glow && (
        <span className="absolute inset-0 -z-10 bg-cyan-500 blur-lg opacity-40 scale-105" />
      )}
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
