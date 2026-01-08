import React, { Suspense } from 'react';
import { Background3D } from './components/Background3D';
import { Hero } from './components/Hero';
import { CardsSection } from './components/CardsSection';

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-klelers-orange selection:text-black">

      {/* 3D Background Layer */}
      <Suspense fallback={<div className="fixed inset-0 bg-black z-0" />}>
        <Background3D />
      </Suspense>

      {/* Main Scroll Container */}
      <main className="relative z-10 w-full">

        {/* Navigation / Header */}
        <header className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5 shadow-lg transition-all duration-300">
          <div className="font-montserrat text-2xl tracking-wider text-white cursor-pointer font-bold">
            KLELERS<span className="text-klelers-orange">.AI</span>
          </div>
          <a
            href="#cards-section"
            className="hidden md:block font-mono text-xs text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            AGENDAR SESIÓN
          </a>
        </header>

        <Hero />

        <CardsSection />

        <footer className="w-full py-12 text-center text-gray-600 text-sm font-mono border-t border-gray-900 mt-20 bg-black">
          <p>&copy; 2026 Klelers Sales AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="hover:text-klelers-cyan cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-klelers-cyan cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-klelers-cyan cursor-pointer transition-colors">Biocoaching Protocol</span>
          </div>
        </footer>

      </main>
    </div>
  );
}