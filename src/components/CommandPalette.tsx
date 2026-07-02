"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Terminal, User, Briefcase, 
  FolderGit2, Code2, Award, Mail, FileText, ArrowRight, Flame 
} from "lucide-react";
import { Github, Linkedin } from "./UI/Icons";
import { projects } from "@/data/portfolioData";

interface CommandItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: () => void;
  category: "Navigation" | "Projects" | "Actions";
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      setSearch("");
      setSelectedIndex(0);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    { icon: <Terminal className="w-4 h-4 text-cyan-400" />, title: "Go to Home", subtitle: "Scroll to the main hero section", category: "Navigation", action: () => jumpToSection("home") },
    { icon: <User className="w-4 h-4 text-blue-400" />, title: "Go to About", subtitle: "Learn more about background and stats", category: "Navigation", action: () => jumpToSection("about") },
    { icon: <Briefcase className="w-4 h-4 text-purple-400" />, title: "Go to Experience", subtitle: "View intern timeline and achievements", category: "Navigation", action: () => jumpToSection("experience") },
    { icon: <FolderGit2 className="w-4 h-4 text-pink-400" />, title: "Go to Projects", subtitle: "Browse personal apps and filters", category: "Navigation", action: () => jumpToSection("projects") },
    { icon: <Code2 className="w-4 h-4 text-emerald-400" />, title: "Go to Skills", subtitle: "Examine technology proficiencies", category: "Navigation", action: () => jumpToSection("skills") },
    { icon: <Award className="w-4 h-4 text-amber-400" />, title: "Go to Achievements", subtitle: "View certifications and ratings", category: "Navigation", action: () => jumpToSection("achievements") },
    { icon: <Mail className="w-4 h-4 text-rose-400" />, title: "Go to Contact", subtitle: "Send a message or find social handles", category: "Navigation", action: () => jumpToSection("contact") },
    
    // Actions
    { icon: <FileText className="w-4 h-4 text-indigo-400" />, title: "Download Resume", subtitle: "Open developer resume PDF", category: "Actions", action: () => window.open("#", "_blank") },
    { icon: <Mail className="w-4 h-4 text-rose-400" />, title: "Hire Me Directly", subtitle: "Open mail client to send offer", category: "Actions", action: () => window.open("mailto:saisu@example.com", "_self") },
    { icon: <Github className="w-4 h-4 text-slate-300" />, title: "Open GitHub Profile", subtitle: "View open-source repositories", category: "Actions", action: () => window.open("https://github.com", "_blank") },
    { icon: <Linkedin className="w-4 h-4 text-blue-500" />, title: "Open LinkedIn Profile", subtitle: "Connect on professional network", category: "Actions", action: () => window.open("https://linkedin.com", "_blank") },
    { icon: <Flame className="w-4 h-4 text-yellow-500" />, title: "Open LeetCode Profile", subtitle: "Inspect coding contest ratings", category: "Actions", action: () => window.open("https://leetcode.com", "_blank") }
  ];

  // Dynamically load projects into commands
  projects.forEach((proj) => {
    commands.push({
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      title: `View Project: ${proj.title}`,
      subtitle: `Open spec for ${proj.stack.slice(0, 3).join(", ")}`,
      category: "Projects",
      action: () => {
        jumpToSection("projects");
        // Optionally focus that project card
        setTimeout(() => {
          document.getElementById(proj.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    });
  });

  const filteredCommands = commands.filter((cmd) => {
    const searchVal = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchVal) ||
      cmd.subtitle.toLowerCase().includes(searchVal) ||
      cmd.category.toLowerCase().includes(searchVal)
    );
  });

  // Handle keyboard traversal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev === filteredCommands.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          handleAction(filteredCommands[selectedIndex].action);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Keep selected item in view
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const selectedElement = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    if (selectedElement) {
      const containerHeight = container.clientHeight;
      const elementHeight = selectedElement.clientHeight;
      const elementTop = selectedElement.offsetTop;
      const containerScrollTop = container.scrollTop;

      if (elementTop + elementHeight > containerScrollTop + containerHeight) {
        container.scrollTop = elementTop + elementHeight - containerHeight;
      } else if (elementTop < containerScrollTop) {
        container.scrollTop = elementTop;
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl mx-4 overflow-hidden rounded-2xl glass-panel shadow-2xl border border-white/10 z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 border-b border-white/5 bg-slate-950/20">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search sections..."
                className="w-full py-4 bg-transparent text-slate-100 placeholder-slate-500 font-sans text-sm focus:outline-none"
              />
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 text-slate-400 rounded text-xs shrink-0 select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div
              ref={listRef}
              className="max-h-[350px] overflow-y-auto py-2 divide-y divide-white/5"
            >
              {filteredCommands.length > 0 ? (
                // Grouping items visually by category
                ["Navigation", "Projects", "Actions"].map((cat) => {
                  const items = filteredCommands.filter((cmd) => cmd.category === cat);
                  if (items.length === 0) return null;

                  return (
                    <div key={cat} className="p-1">
                      <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase font-sans">
                        {cat}
                      </div>
                      {items.map((cmd) => {
                        // Find global index in the main filtered list
                        const globalIdx = filteredCommands.findIndex((c) => c.title === cmd.title);
                        const isSelected = globalIdx === selectedIndex;

                        return (
                          <div
                            key={cmd.title}
                            data-index={globalIdx}
                            onClick={() => handleAction(cmd.action)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                              isSelected
                                ? "bg-white/10 text-white shadow-lg border border-white/5"
                                : "text-slate-300 hover:text-white"
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${
                              isSelected ? "bg-white/5" : "bg-white/5"
                            }`}>
                              {cmd.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate leading-4">
                                {cmd.title}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate leading-3.5 mt-0.5">
                                {cmd.subtitle}
                              </p>
                            </div>
                            {isSelected && (
                              <ArrowRight className="w-4 h-4 text-cyan-400 animate-[bounce_1s_infinite_horizontal] shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
                  <Terminal className="w-8 h-8 text-slate-600" />
                  <p>No results found for &ldquo;{search}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Palette Footer Help Info */}
            <div className="px-4 py-2 border-t border-white/5 bg-slate-950/40 flex items-center justify-between text-[10px] text-slate-500 select-none">
              <div className="flex items-center gap-1.5">
                <span>Use arrows</span>
                <kbd className="px-1 py-0.5 bg-white/5 rounded border border-white/5">↑</kbd>
                <kbd className="px-1 py-0.5 bg-white/5 rounded border border-white/5">↓</kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5">Enter</kbd>
                <span>to run</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
