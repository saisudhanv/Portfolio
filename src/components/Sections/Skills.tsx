"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Terminal, Settings, ShieldAlert, Cpu, Sparkles } from "lucide-react";
import { skillsData } from "@/data/portfolioData";
import Card from "../UI/Card";

// Map category string to respective Lucide icon
function getCategoryIcon(catName: string) {
  switch (catName.toLowerCase()) {
    case "frontend":
      return <Code className="w-5 h-5 text-cyan-400" />;
    case "backend":
      return <Server className="w-5 h-5 text-blue-400" />;
    case "database":
      return <Database className="w-5 h-5 text-indigo-400" />;
    case "programming":
      return <Terminal className="w-5 h-5 text-emerald-400" />;
    case "devops":
      return <Settings className="w-5 h-5 text-purple-400" />;
    case "testing":
      return <ShieldAlert className="w-5 h-5 text-rose-400" />;
    case "automation":
      return <Cpu className="w-5 h-5 text-amber-400" />;
    case "ai/ml":
      return <Sparkles className="w-5 h-5 text-yellow-400" />;
    default:
      return <Code className="w-5 h-5 text-cyan-400" />;
  }
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <section id="skills" className="py-24 relative max-w-7xl mx-auto px-6">
      
      {/* Background glowing blur blob */}
      <div className="absolute w-[35rem] h-[35rem] rounded-full bg-purple-500/5 filter blur-3xl top-1/3 -left-20 -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">
          Skills
        </h2>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
          Technical Arsenal
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
      >
        {skillsData.map((categoryGroup, index) => (
          <motion.div key={index} variants={itemVariants} className="h-full">
            <Card
              glowColor="rgba(139, 92, 246, 0.12)"
              className="h-full hover:border-purple-500/20"
            >
              {/* Category title */}
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 shrink-0">
                  {getCategoryIcon(categoryGroup.category)}
                </div>
                <h4 className="text-base font-display font-bold text-slate-100 leading-none">
                  {categoryGroup.category}
                </h4>
              </div>

              {/* Skills lists inside category */}
              <div className="space-y-5">
                {categoryGroup.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col gap-1.5 group">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors duration-200">
                      <span>{skill.name}</span>
                      {/* <span className="text-[10px] text-slate-500 font-mono group-hover:text-cyan-400 transition-colors duration-200">
                        {skill.level}%
                      </span> */}
                    </div>

                    {/* Progress Bar Track */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
