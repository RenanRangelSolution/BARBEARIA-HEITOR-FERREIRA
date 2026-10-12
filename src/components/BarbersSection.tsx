import React from 'react';
import { BARBERS } from '../data/barbershopData';
import { Barber } from '../types';
import { Award, CalendarCheck, CheckCircle2 } from 'lucide-react';

interface BarbersSectionProps {
  onSelectBarberAndBook: (barber: Barber) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarberAndBook }) => {
  return (
    <section id="profissionais" className="py-16 sm:py-24 bg-neutral-900/30 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
            02. Mestres da Lâmina & Tesoura
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Nossos Profissionais
          </h2>
          <p className="text-neutral-400 text-xs sm:text-base mt-2">
            Especialistas dedicados com certificações internacionais em barbearia clássica, visagismo e saúde capilar masculina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300"
            >
              <div>
                {/* Photo frame */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-amber-400 font-medium">
                    <span className="flex items-center gap-1 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800 text-neutral-300">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {barber.experience}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {barber.name}
                  </h3>
                  <div className="text-xs text-amber-500 font-medium mb-3">
                    {barber.role}
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {barber.bio}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-neutral-800/80">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                      Especialidades
                    </div>
                    {barber.specialties.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 mt-4">
                <button
                  onClick={() => onSelectBarberAndBook(barber)}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-amber-600 text-neutral-200 hover:text-neutral-950 py-2.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Agendar com {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
