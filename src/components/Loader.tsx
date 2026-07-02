"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "git clone portfolio-core.git...",
    "npm install framer-motion Three.js...",
    "compiling TypeScript structures...",
    "establishing secure shell session...",
    "bootstrapping responsive layout...",
    "rendering canvas particle mesh...",
    "system ready. welcome."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setVisible(false), 300); // Wait shortly before hiding loader
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Stagger log entries based on progress
    if (progress > 15 && logIndex === 0) setLogIndex(1);
    if (progress > 30 && logIndex === 1) setLogIndex(2);
    if (progress > 45 && logIndex === 2) setLogIndex(3);
    if (progress > 60 && logIndex === 3) setLogIndex(4);
    if (progress > 75 && logIndex === 4) setLogIndex(5);
    if (progress > 90 && logIndex === 5) setLogIndex(6);
  }, [progress, logIndex]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#030014] z-50 flex flex-col items-center justify-center select-none"
        >
          <div className="max-w-sm w-full px-8 flex flex-col items-start font-mono">
            
            {/* Logo spinner */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 animate-spin">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold tracking-wider text-sm">
                INITIALIZING...
              </span>
            </div>

            {/* Simulated terminal feed */}
            <div className="h-28 text-left w-full text-[10px] text-slate-500 mb-6 space-y-1">
              {logs.slice(0, logIndex + 1).map((log, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className={index === logIndex ? "text-cyan-400" : "text-slate-500"}>
                    {index === logIndex ? ">" : "✓"}
                  </span>
                  <span className={index === logIndex ? "text-slate-200" : "text-slate-600"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Percent */}
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="text-[10px] tracking-widest text-slate-500 uppercase">Load Progress</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>

            {/* Progress bar line */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-sm">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
