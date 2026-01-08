import React from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const scrollToContent = () => {
    const el = document.getElementById('cards-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center z-10 pt-20 px-4">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

      <div className="relative z-10 space-y-2 select-none">
        <h1 className="font-montserrat text-white leading-[0.85] tracking-tight drop-shadow-2xl font-black">
          <span className="block text-[clamp(60px,12vw,180px)]">KLELERS</span>
          <div className="flex justify-center items-center gap-4">
            <span className="text-[clamp(60px,12vw,180px)]">SALES</span>
            <span className="text-[clamp(60px,12vw,180px)] text-klelers-orange">AI</span>
          </div>
        </h1>
      </div>

      <p className="relative z-10 mt-8 max-w-2xl text-white text-xl md:text-2xl font-inter font-normal leading-relaxed drop-shadow-lg bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        El primer ecosistema que fusiona <span className="text-klelers-cyan font-bold">Biocoaching</span> con automatización IA.
        <br className="hidden md:block" />
        Construye equipos de ventas resilientes y sostenibles.
      </p>

      <button
        onClick={scrollToContent}
        className="relative z-10 mt-12 group flex flex-col items-center gap-2 text-klelers-orange hover:text-white transition-colors duration-300"
      >
        <span className="text-base font-mono tracking-widest uppercase font-bold drop-shadow-lg">Descubre el Modelo</span>
        <div className="p-3 border-2 border-klelers-orange rounded-full group-hover:bg-klelers-orange group-hover:text-black transition-all shadow-lg shadow-klelers-orange/30">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>
      </button>
    </section>
  );
};