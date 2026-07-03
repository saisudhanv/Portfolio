"use client";

import { motion } from "framer-motion";
import { Award, Code2, ShieldCheck, Flame, Star, ExternalLink } from "lucide-react";
import { achievementsData } from "@/data/portfolioData";
import Card from "../UI/Card";

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="achievements" className="py-24 relative max-w-7xl mx-auto px-6">
      
      {/* Background glowing blob */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl top-10 right-10 -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">
          Credentials
        </h2>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
          Achievements & Certifications
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
        {/* Coding Contests Left Side */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.h4 variants={itemVariants} className="text-lg font-display font-bold text-slate-200 pl-2">
            Coding Contest Metrics
          </motion.h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementsData.platforms.map((platform, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card 
                  glowColor={idx === 0 ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)"}
                  className="p-6 relative group overflow-hidden border-amber-500/10 hover:border-amber-500/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      {idx === 0 ? (
                        <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
                      ) : (
                        <Star className="w-6 h-6 text-emerald-500 animate-spin-slow" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      Platform
                    </span>
                  </div>

                  <h5 className="text-xl font-display font-black text-slate-100 mb-1">
                    {platform.name}
                  </h5>
                  <p className="text-sm font-semibold text-slate-400 mb-6">
                    {platform.problemsSolved}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs text-slate-500 font-medium">
                      {platform.ratingLabel}:
                    </span>
                    <span className={`font-mono text-lg font-black bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.ratingValue}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Right Side */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.h4 variants={itemVariants} className="text-lg font-display font-bold text-slate-200 pl-2">
            Certifications
          </motion.h4>
          
          <div className="flex flex-col gap-4">
            {achievementsData.certifications.map((cert, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  glowColor="rgba(6, 182, 212, 0.1)"
                  className="flex items-center gap-4 p-5 hover:border-cyan-500/20"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-slate-200 truncate">
                      {cert.name}
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Issued by {cert.issuer}
                    </p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 shrink-0 cursor-pointer"
                    aria-label={`View credentials for ${cert.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
