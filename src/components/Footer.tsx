export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 py-8 mt-16 bg-slate-950/20 select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <p className="text-xs text-slate-500 font-sans leading-none">
          &copy; {currentYear} Challapalli Sai Sudhanv. All rights reserved.
        </p>
        <p className="text-[10px] text-slate-500 font-mono tracking-tight leading-none">
          Designed & Developed with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
