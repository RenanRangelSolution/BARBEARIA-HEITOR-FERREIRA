import React from 'react';
import { TOOLS_IMAGE, BARBERSHOP_INFO } from '../data/barbershopData';
import { Sparkles, Shield, Coffee, Award, Check } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experiencia" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Visual Asset side */}
          <div className="relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src={TOOLS_IMAGE}
                alt="Instrumentos artesanais da Barbearia Heitor Ferreira"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            </div>

            {/* Quiet caption badge */}
            <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-6 sm:right-6 bg-neutral-900/95 border border-amber-500/30 backdrop-blur-md p-3.5 sm:p-4 rounded-xl shadow-xl sm:max-w-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>O Ritual Heitor Ferreira</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-tight">
                Toalhas quentes aromatizadas com óleo de eucalipto e navalha afiada à mão.
              </p>
            </div>
          </div>

          {/* Copy & Narrative side */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
              03. Tradição & Conforto
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 sm:mb-6 [text-wrap:balance]">
              Mais do que um corte, um momento para desacelerar seu dia.
            </h2>
            <p className="text-neutral-300 text-xs sm:text-base leading-relaxed mb-6 font-body">
              Fundada por Heitor Ferreira há mais de uma década nos Jardins, nossa barbearia foi
              pensada para resgatar a nobreza do cuidado masculino clássico. Aqui você não é apenas
              mais um na cadeira: entendemos o seu estilo, sua rotina e a geometria do seu rosto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <Shield className="w-4 h-4 text-amber-500" />
                  Biossegurança Total
                </div>
                <p className="text-xs text-neutral-400">
                  Lâminas 100% descartáveis e esterilização hospitalar em autoclave.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <Coffee className="w-4 h-4 text-amber-500" />
                  Bar & Lounge Privativo
                </div>
                <p className="text-xs text-neutral-400">
                  Aprecie um café especial ou chopp artesanal cortesia enquanto relaxa.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Nossos Diferenciais
              </div>
              {BARBERSHOP_INFO.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
