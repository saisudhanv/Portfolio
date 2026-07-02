"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, ArrowRight, Code } from "lucide-react";
import { Github, Linkedin } from "../UI/Icons";
import { personalDetails } from "@/data/portfolioData";
import Button from "../UI/Button";

// Custom typing animation hook
function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, delayBetween = 1500) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    // Word completed, wait before deleting
    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    }

    // Deletion completed, move to next word
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return currentText;
}

export default function Hero() {
  const typedText = useTypingEffect(personalDetails.roles);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden max-w-7xl mx-auto px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center relative z-10">
        
        {/* Left Info Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-xs tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Open to new opportunities
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-2 leading-none">
            Hi, I&apos;m
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight mb-6 leading-none bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]"
          >
            {personalDetails.name}
          </motion.h2>

          {/* Typing Text */}
          <motion.div 
            variants={itemVariants} 
            className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl md:text-3xl font-display font-bold text-slate-300 mb-6"
          >
            <span>A&nbsp;</span>
            <span className="text-gradient-cyan-blue">{typedText}</span>
            <span className="w-1.5 h-6 sm:h-8 bg-cyan-400 ml-1 animate-[pulse_1s_infinite] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </motion.div>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed max-w-xl mb-10">
            {personalDetails.bio}
          </motion.p>

          {/* Hero Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center mb-10">
            <Button variant="primary" glow onClick={handleScrollToContact}>
              Hire Me
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" onClick={handleScrollToProjects}>
              View Projects
            </Button>
            <Button variant="secondary" onClick={() => window.open("/Sudhanv_Resume.pdf", "_blank")}>
              <FileText className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Connect:</span>
            <div className="flex items-center gap-3">
              {[
                { icon: <Github className="w-5 h-5" />, href: personalDetails.socials.github, label: "GitHub" },
                { icon: <Linkedin className="w-5 h-5" />, href: personalDetails.socials.linkedin, label: "LinkedIn" },
                { icon: <Code className="w-5 h-5" />, href: personalDetails.socials.leetcode, label: "LeetCode" },
                { icon: <Mail className="w-5 h-5" />, href: personalDetails.socials.email, label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 shadow-sm cursor-pointer"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Graphic Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Glowing back orb for the illustration */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 filter blur-3xl -z-10 animate-pulse-slow" />
          
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            {/* Custom SVG Dashboard / Workspace Illustration */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated outer glowing orbit circles */}
              <circle cx="250" cy="250" r="220" stroke="url(#gradient-blue-purple)" strokeWidth="1" strokeDasharray="10 15" className="animate-spin-slow" />
              <circle cx="250" cy="250" r="180" stroke="url(#gradient-purple-cyan)" strokeWidth="1" strokeDasharray="5 10" className="animate-[spin_12s_linear_infinite_reverse]" />

              {/* Developer Workspace Layout */}
              {/* Laptop Shell */}
              <rect x="120" y="160" width="260" height="170" rx="10" fill="#0c0a24" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" />
              <rect x="135" y="175" width="230" height="140" rx="4" fill="#030014" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
              
              {/* Laptop Stand / Base */}
              <path d="M100 330 H400 V340 C400 345 395 350 390 350 H110 C105 350 100 345 100 340 Z" fill="#1b173c" />
              <rect x="220" y="331" width="60" height="5" fill="rgba(6, 182, 212, 0.6)" rx="2" />
              
              {/* Dashboard Elements inside screen */}
              {/* Code editor lines */}
              <rect x="150" y="195" width="80" height="8" rx="3" fill="#3b82f6" opacity="0.8" />
              <rect x="150" y="210" width="130" height="8" rx="3" fill="#8b5cf6" opacity="0.8" />
              <rect x="150" y="225" width="60" height="8" rx="3" fill="#06b6d4" opacity="0.8" />
              
              <rect x="170" y="240" width="100" height="8" rx="3" fill="#3b82f6" opacity="0.6" />
              <rect x="170" y="255" width="80" height="8" rx="3" fill="#8b5cf6" opacity="0.6" />
              
              <rect x="150" y="270" width="110" height="8" rx="3" fill="#06b6d4" opacity="0.8" />
              <rect x="150" y="285" width="50" height="8" rx="3" fill="#3b82f6" opacity="0.8" />

              {/* Graphical nodes surrounding laptop */}
              {/* Server-Sent Events node */}
              <g className="animate-float">
                <circle cx="90" cy="120" r="30" fill="rgba(10, 10, 25, 0.8)" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <path d="M83 115 L97 125 M83 125 L97 115" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="90" cy="120" r="15" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" />
              </g>

              {/* Gemini AI node */}
              <g className="animate-[float_7s_ease-in-out_infinite_2s]">
                <circle cx="410" cy="180" r="35" fill="rgba(10, 10, 25, 0.8)" stroke="#8b5cf6" strokeWidth="2" className="drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                {/* AI Sparkle */}
                <path d="M410 168 C410 175 413 178 420 180 C413 182 410 185 410 192 C410 185 407 182 400 180 C407 178 410 175 410 168 Z" fill="#8b5cf6" className="animate-pulse" />
              </g>

              {/* Docker/Cloud container node */}
              <g className="animate-[float_5s_ease-in-out_infinite_1s]">
                <circle cx="370" cy="380" r="30" fill="rgba(10, 10, 25, 0.8)" stroke="#06b6d4" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                <rect x="357" y="372" width="26" height="16" rx="2" stroke="#06b6d4" strokeWidth="2" />
                <line x1="362" y1="372" x2="362" y2="388" stroke="#06b6d4" strokeWidth="1.5" />
                <line x1="370" y1="372" x2="370" y2="388" stroke="#06b6d4" strokeWidth="1.5" />
                <line x1="378" y1="372" x2="378" y2="388" stroke="#06b6d4" strokeWidth="1.5" />
              </g>

              {/* Connecting glowing web lines */}
              <path d="M120 120 L160 175" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M375 180 L350 200" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M340 380 L300 325" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Definitions */}
              <defs>
                <linearGradient id="gradient-blue-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="gradient-purple-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
