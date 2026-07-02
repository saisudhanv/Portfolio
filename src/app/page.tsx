import Loader from "@/components/Loader";
import CanvasBackground from "@/components/CanvasBackground";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Sections/Hero";
import About from "@/components/Sections/About";
import Experience from "@/components/Sections/Experience";
import Projects from "@/components/Sections/Projects";
import Skills from "@/components/Sections/Skills";
import Achievements from "@/components/Sections/Achievements";
import Contact from "@/components/Sections/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import FloatingQuickActions from "@/components/FloatingQuickActions";

export default function Home() {
  return (
    <>
      {/* Premium Loader/Boot sequence */}
      <Loader />

      {/* Interactive canvas background of particles & glowing gradients */}
      <CanvasBackground />

      {/* Custom mouse trailing cursor effect */}
      <CursorGlow />

      {/* Keyboard shortcuts panel (Ctrl + K) */}
      <CommandPalette />
      
      {/* Primary container */}
      <div className="flex flex-col min-h-screen relative z-10 font-sans text-slate-100 antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
        
        {/* Sticky menu nav */}
        <Navbar />
        
        {/* Core sections content */}
        <main className="flex-1 w-full relative">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
        
        {/* Footer info shell */}
        <Footer />

        {/* Dynamic actions: scroll-to-top */}
        <FloatingQuickActions />
      </div>
    </>
  );
}
