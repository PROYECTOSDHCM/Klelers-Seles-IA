import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PHASES } from '../types';
import { ContactFormSection } from './ContactFormSection';
import { Brain, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

const data = [
  { name: 'Prev', ventas: 65 },
  { name: 'Mes 3', ventas: 85 },
  { name: 'Mes 6', ventas: 105 }, // +40% approx
];

export const CardsSection = () => {
  return (
    <div id="cards-section" className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col gap-16 md:gap-24">

      {/* CARD 1: ROI & Case Study */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center min-h-[600px] pt-8 md:pt-0">
        <div className="order-2 lg:order-1 space-y-6 bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/20">
          <div className="inline-block px-4 py-2 border-2 border-klelers-cyan text-klelers-cyan text-sm font-mono rounded-full font-bold">
            CASO DE ÉXITO: TECNO MARKETING
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-none font-black">
            Modelo que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-klelers-cyan to-blue-400">
              Optimiza y Cuida
            </span>
          </h2>
          <p className="font-inter text-white text-lg md:text-xl leading-relaxed">
            No solo aumentamos números; reducimos la rotación un 25% mediante <strong className="text-klelers-cyan">Biocoaching</strong>.
            Integramos mente, cuerpo y emociones para crear resiliencia.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-gradient-to-br from-klelers-orange/20 to-klelers-orange/5 backdrop-blur-sm p-6 rounded-xl border-l-4 border-klelers-orange shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white font-mono">30-40%</div>
              <div className="text-sm md:text-base text-white font-semibold mt-1">Aumento en Ventas</div>
            </div>
            <div className="bg-gradient-to-br from-klelers-cyan/20 to-klelers-cyan/5 backdrop-blur-sm p-6 rounded-xl border-l-4 border-klelers-cyan shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white font-mono">600x</div>
              <div className="text-sm md:text-base text-white font-semibold mt-1">ROI Proyectado</div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-3xl p-8 shadow-2xl shadow-klelers-cyan/20 mt-8 lg:mt-0">
          <h3 className="text-white font-mono text-lg mb-6 flex items-center gap-2 font-bold">
            <TrendingUp className="text-klelers-orange w-6 h-6" />
            CRECIMIENTO SEMESTRAL
          </h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#FFFFFF" fontSize={14} tickLine={false} axisLine={false} fontWeight="bold" />
                <YAxis stroke="#FFFFFF" fontSize={14} tickLine={false} axisLine={false} fontWeight="bold" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#000', border: '2px solid #FF4B00', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  cursor={{ fill: 'rgba(255, 75, 0, 0.1)' }}
                />
                <Bar dataKey="ventas" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#FF4B00' : '#475569'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-sm text-center text-gray-300 font-mono font-semibold">
            *Datos reales basados en implementación Tecno Marketing
          </p>
        </div>
      </div>

      {/* CARD 2: Methodology */}
      <div className="w-full bg-black/80 backdrop-blur-md border-2 border-white/20 rounded-3xl p-6 md:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div>
            <h2 className="font-montserrat text-3xl md:text-5xl text-white mb-2 font-black">BIOCOACHING + 4 FASES</h2>
            <p className="text-klelers-cyan font-mono text-base font-bold">ROADMAP 2026</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white bg-gray-800/80 border-2 border-gray-600 px-5 py-3 rounded-lg font-semibold">
            <Brain className="w-5 h-5 text-klelers-orange" />
            <span>Salesforce Einstein + n8n Integration</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHASES.map((phase, idx) => (
            <div key={phase.id} className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/90 hover:to-gray-800/90 transition-all p-6 rounded-2xl border-2 border-gray-700 hover:border-klelers-orange/50 shadow-lg hover:shadow-klelers-orange/20">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-klelers-orange border-2 border-white rounded-full flex items-center justify-center text-white font-bold font-mono text-lg shadow-lg">
                {idx + 1}
              </div>
              <h3 className="mt-4 font-montserrat text-2xl text-white mb-2 font-bold">{phase.title}</h3>
              <div className="h-px w-full bg-gradient-to-r from-klelers-cyan to-transparent mb-4" />
              <p className="text-base text-white mb-4 font-inter leading-relaxed min-h-[60px]">{phase.desc}</p>
              <div className="flex items-center gap-2 text-sm font-mono text-white bg-klelers-cyan/20 border border-klelers-cyan/50 p-3 rounded-lg font-semibold">
                <Zap className="w-4 h-4 text-klelers-cyan" />
                {phase.tech}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 3: Contact Form */}
      <div className="pb-10">
        <ContactFormSection />
      </div>

    </div>
  );
};