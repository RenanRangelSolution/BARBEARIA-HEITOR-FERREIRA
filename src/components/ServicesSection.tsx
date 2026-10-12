import React, { useState } from 'react';
import { SERVICES } from '../data/barbershopData';
import { Service, ServiceCategory } from '../types';
import { Clock, Scissors, ArrowRight, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceAndBook: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceAndBook }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'combos', label: 'Combos & Pacotes' },
    { id: 'cabelo', label: 'Cabelo & Cortes' },
    { id: 'barba', label: 'Barba & Navalha' },
    { id: 'spa', label: 'Spa & Tratamentos' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === 'todos') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="servicos" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
              01. Cardápio Exclusivo
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Serviços de Precisão & Cuidados Masculinos
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base mt-2 max-w-xl">
              Cada serviço inclui lavagem especial com massagem revigorante, toalha quente e finalização com cosméticos premium importados.
            </p>
          </div>

          {/* Interactive filter tabs / segmented controls - scrollable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] flex items-center ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between p-4 sm:p-6 rounded-xl border transition-all duration-200 ${
                service.popular
                  ? 'bg-neutral-900/80 border-amber-500/40 shadow-lg shadow-amber-950/20'
                  : 'bg-neutral-900/40 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/60'
              }`}
            >
              <div>
                {/* Header of card with quiet tag and duration */}
                <div className="flex items-center justify-between gap-2 mb-3 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span className="tabular-nums">{service.durationMinutes} min</span>
                  </div>
                  {service.tag && (
                    <span className="text-amber-400 font-semibold text-[11px] tracking-wide">
                      {service.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  {service.name}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4 mt-auto">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                    Investimento
                  </div>
                  <div className="text-xl font-bold text-amber-400 font-display tabular-nums">
                    R$ {service.price.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceAndBook(service)}
                  className="flex items-center gap-1.5 bg-neutral-800 hover:bg-amber-600 text-neutral-200 hover:text-neutral-950 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 group"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Complimentary Amenities Callout */}
        <div className="mt-12 p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Todos os atendimentos incluem cortesia exclusiva</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Café espresso, chopp artesanal gelado, água com gás e Wi-Fi de alta velocidade.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-amber-500" /> Esterilização Hospitalar</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-amber-500" /> Navalhas Descartáveis</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-amber-500" /> Cosméticos Importados</span>
          </div>
        </div>
      </div>
    </section>
  );
};
