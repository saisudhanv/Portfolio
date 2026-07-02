"use client";

import Link from "next/link";
import { Terminal, Home, ArrowLeft } from "lucide-react";
import CanvasBackground from "@/components/CanvasBackground";
import Button from "@/components/UI/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Interactive canvas background */}
      <CanvasBackground />

      <div className="relative z-10 max-w-md w-full glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center">
        {/* Terminal Icon */}
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full mb-6">
          <Terminal className="w-10 h-10 animate-[pulse_2s_infinite]" />
        </div>

        <h1 className="text-7xl font-display font-black tracking-tight text-white mb-2 bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-display font-bold text-slate-200 mb-4">
          Route Not Found
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed font-sans mb-8">
          The segment you are trying to access does not exist or has been refactored. Check the URL or command path.
        </p>

        <Link href="/" passHref className="w-full">
          <Button variant="primary" glow className="w-full flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
