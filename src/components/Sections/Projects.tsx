"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Database, GitBranch, FileSpreadsheet, ArrowRight, Layers, FileCode } from "lucide-react";
import { Github } from "../UI/Icons";
import { projects, Project } from "@/data/portfolioData";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import Button from "../UI/Button";

// Custom cover illustration helper based on project ID
function ProjectCover({ id }: { id: string }) {
  switch (id) {
    case "ai-bg-remover":
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
          <Sparkles className="w-12 h-12 text-cyan-400 opacity-60 animate-[pulse_3s_infinite]" />
          <div className="absolute w-28 h-28 border border-cyan-400/20 rounded-full animate-spin-slow" />
          <div className="absolute w-20 h-20 border border-purple-500/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-400/40 select-none">
            IMAGE_BG_REMOVER.EXE
          </div>
        </div>
      );
    case "rest-api-platform":
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 flex items-center justify-center overflow-hidden">
          <Database className="w-12 h-12 text-blue-400 opacity-60 animate-bounce" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4 opacity-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="h-6 bg-white rounded" />
            ))}
          </div>
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-blue-400/40 select-none">
            REST_API_CONTAINER_V2
          </div>
        </div>
      );
    case "ai-automation-assistant":
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-cyan-600/30 flex items-center justify-center overflow-hidden">
          <GitBranch className="w-12 h-12 text-purple-400 opacity-60 animate-pulse" />
          {/* Connector circles */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-cyan-400/60 animate-ping" />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-purple-400/60 animate-ping" style={{ animationDelay: "1s" }} />
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 100 Q 150 50, 250 100 T 450 100" fill="none" stroke="white" strokeWidth="2" />
          </svg>
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-purple-400/40 select-none">
            N8N_WORKFLOW_ORCHESTRATOR
          </div>
        </div>
      );
    case "doc-extraction-platform":
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 to-blue-600/30 flex items-center justify-center overflow-hidden">
          <FileSpreadsheet className="w-12 h-12 text-emerald-400 opacity-60" />
          {/* Glowing scanner line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-[scan_2.5s_ease-in-out_infinite]" />
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-emerald-400/40 select-none">
            GEMINI_OCR_PARSER
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
          <FileCode className="w-12 h-12 text-slate-500" />
        </div>
      );
  }
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Full Stack", "Backend/API", "Automation", "AI/ML"];

  const filteredProjects = projects.filter((proj) => {
    if (filter === "All") return true;
    return proj.category === filter;
  });

  return (
    <section id="projects" className="py-24 relative max-w-7xl mx-auto px-6">
      
      {/* Background neon dots */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/5 filter blur-3xl bottom-0 right-[20%] -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">
          Projects
        </h2>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
          Featured Engineering Work
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4.5 py-2 text-xs font-bold tracking-wider uppercase rounded-xl border transition-all duration-300 cursor-pointer ${
              filter === cat
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-105"
                : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid with layout animation */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              key={proj.id}
              id={proj.id}
              className="flex h-full"
            >
              <Card 
                glowColor="rgba(6, 182, 212, 0.15)"
                className="flex flex-col h-full w-full p-0 overflow-hidden hover:border-cyan-500/20"
              >
                {/* Visual Cover / Gradient placeholder */}
                <div className="w-full aspect-[16/9] relative border-b border-white/5 overflow-hidden">
                  <ProjectCover id={proj.id} />
                  
                  {/* Category overlay label */}
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur border border-white/10 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-cyan-400 shadow">
                    {proj.category}
                  </span>
                </div>

                {/* Card details body */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h4 className="text-xl font-display font-black text-slate-100 mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mb-6">
                    {proj.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mb-6 flex-1">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Highlights
                    </h5>
                    <ul className="space-y-1.5 pl-1.5">
                      {proj.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.stack.map((tech, tIdx) => (
                      <Badge 
                        key={tIdx} 
                        variant={tIdx % 3 === 0 ? "blue" : tIdx % 3 === 1 ? "cyan" : "purple"}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-5">
                    <Button
                      variant="primary"
                      className="px-4 py-2 text-xs flex-1"
                      onClick={() => window.open(proj.live, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Live Demo
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-4 py-2 text-xs flex-1 border border-white/5"
                      onClick={() => window.open(proj.github, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-1.5" />
                      GitHub Repo
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Embedded Scan CSS animation keyframes */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
