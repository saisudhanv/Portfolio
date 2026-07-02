"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, BrainCircuit, Cloud, Cpu, Layers, Star } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";
import Card from "../UI/Card";

// Helper Component for Animated Stats Counter
function AnimatedCounter({ value, isDecimal = false, target }: { value: string; isDecimal?: boolean; target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentVal = start + easeProgress * (end - start);

      if (isDecimal) {
        setCount(Number(currentVal.toFixed(2)));
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target, isDecimal]);

  // Extract non-numeric parts (like "+" or text)
  const nonNumeric = value.replace(/[0-9.]/g, "");

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
      {count}
      {nonNumeric}
    </span>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  const passions = [
    { name: "Full Stack Development", icon: <Layers className="w-5 h-5 text-cyan-400" />, desc: "Crafting end-to-end applications using modern architectures." },
    { name: "AI Applications", icon: <BrainCircuit className="w-5 h-5 text-purple-400" />, desc: "Integrating Large Language Models and automated workflows." },
    { name: "Backend Engineering", icon: <Cpu className="w-5 h-5 text-blue-400" />, desc: "Designing bulletproof and optimized API structures." },
    { name: "Cloud Technologies", icon: <Cloud className="w-5 h-5 text-emerald-400" />, desc: "Deploying and managing microservices in scale." },
    { name: "DevOps", icon: <BookOpen className="w-5 h-5 text-amber-400" />, desc: "Automating validation testing and CI/CD pipelines." },
    { name: "Scalable Software", icon: <Star className="w-5 h-5 text-rose-400" />, desc: "Focusing on performance optimization and design patterns." }
  ];

  return (
    <section id="about" className="py-24 relative max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">
          About Me
        </h2>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
          Architecting Scalable Solutions
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Side: Summary and Stats */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <motion.div variants={itemVariants}>
            <Card glowColor="rgba(59, 130, 246, 0.15)" className="p-8">
              <h4 className="text-xl font-display font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                Professional Summary
              </h4>
              <p className="text-slate-400 leading-relaxed font-sans mb-6">
                {personalDetails.aboutText}
              </p>
              
              {/* Highlight Undergraduate degree */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-slate-200">
                    {personalDetails.education.degree}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Focused on computer systems, web application design, and distributed architectures.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {personalDetails.stats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="text-center p-6 flex flex-col items-center justify-center h-full">
                  <AnimatedCounter 
                    value={stat.value} 
                    isDecimal={stat.isDecimal} 
                    target={stat.target} 
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-2 block leading-none">
                    {stat.label}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Focus Areas / Passions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.h4 variants={itemVariants} className="text-lg font-display font-bold text-slate-200 pl-2">
            Areas of Passion
          </motion.h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {passions.map((passion, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  glowColor="rgba(139, 92, 246, 0.12)"
                  className="flex items-start gap-4 p-5 hover:border-purple-500/20"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
                    {passion.icon}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-200">
                      {passion.name}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {passion.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
