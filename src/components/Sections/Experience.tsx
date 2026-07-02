"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import Card from "../UI/Card";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = (index: number) => ({
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -40 : 40,
      y: 20 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  });

  return (
    <section id="experience" className="py-24 relative max-w-7xl mx-auto px-6 overflow-hidden">
      
      {/* Background soft blob */}
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-blue-500/5 filter blur-3xl -top-10 left-[40%] -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">
          Timeline
        </h2>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
          Professional Experience
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
      </div>

      {/* Vertical Timeline container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative flex flex-col items-center justify-center max-w-4xl mx-auto"
      >
        {/* Central glowing vertical timeline line */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />

        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`w-full flex flex-col md:flex-row items-start md:items-center mb-12 relative ${
                isEven ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Central/Left timeline marker dot */}
              <div 
                className="absolute left-[21px] md:left-1/2 md:-ml-[10px] w-5 h-5 rounded-full border-2 border-cyan-400 bg-slate-950 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Timeline Item Content Card */}
              <motion.div
                variants={itemVariants(index)}
                className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                  isEven ? "md:pr-8 text-left" : "md:pl-8 text-left"
                }`}
              >
                <Card 
                  glowColor={isEven ? "rgba(59, 130, 246, 0.15)" : "rgba(139, 92, 246, 0.15)"}
                  className="hover:border-cyan-500/20"
                >
                  {/* Title & Organization */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1.5 uppercase">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      Internship
                    </span>
                    <h4 className="text-lg font-display font-black text-slate-100 leading-snug">
                      {exp.title}
                    </h4>
                    <h5 className="text-sm font-semibold text-cyan-400">
                      {exp.company}
                    </h5>
                    
                    {/* Period Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 mt-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg w-fit">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 mt-4 border-t border-white/5 pt-4">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
