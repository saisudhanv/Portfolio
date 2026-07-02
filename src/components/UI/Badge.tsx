import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "cyan" | "purple" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  let colorStyles = "";
  switch (variant) {
    case "blue":
      colorStyles = "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.1)]";
      break;
    case "cyan":
      colorStyles = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.1)]";
      break;
    case "purple":
      colorStyles = "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_8px_rgba(139,92,246,0.1)]";
      break;
    default:
      colorStyles = "bg-white/5 text-slate-300 border-white/10";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 hover:scale-105 ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
}
