import React from 'react';
import { HERO_IMAGE, BARBERSHOP_INFO, LOGO_IMAGE } from '../data/barbershopData';
import { Clock, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Interior clássico da Barbearia Heitor Ferreira"
          className="w-full h-full object-cover object-center opacity-30 filter contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          {/* Official Emblem & Brand Tagline */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            <img
              src={LOGO_IMAGE}
              alt="Brasão Oficial Barbearia Heitor Ferreira"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-amber-500/50 shadow-xl shadow-amber-950/60 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-500 font-bold">
                Barbearia Heitor Ferreira · Barber Shop
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300 mt-0.5">
                <span className="text-amber-400 font-semibold">Barba, Cabelo e Bigode</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <a
                  href={BARBERSHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ver Localização</span>
                </a>
              </div>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-5 [text-wrap:balance]">
            Cortes precisos, barba clássica e o tempo que você merece.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 max-w-2xl font-body">
            Na Barbearia Heitor Ferreira, cada atendimento é um ritual sob medida. Combinamos a
            elegância da navalha afiada à consultoria visagista contemporânea, em um ambiente
            clássico e acolhedor.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <button
              onClick={onOpenBooking}
              className="bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-neutral-950 font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base transition-all shadow-lg shadow-amber-950/40 text-center cursor-pointer whitespace-nowrap"
            >
              Agendar Horário Online
            </button>
            <a
              href="#servicos"
              className="border border-neutral-700 hover:border-neutral-500 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base transition-colors text-center whitespace-nowrap"
            >
              Ver Menu de Serviços
            </a>
          </div>

          {/* Social proof & real highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-8 border-t border-neutral-800/80">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-amber-400 font-display tabular-nums">
                12 Anos
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 leading-tight">
                De tradição artesanal
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-amber-400 font-display tabular-nums">
                4.9 / 5.0
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 leading-tight">
                No Google Avaliações
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-amber-400 font-display tabular-nums">
                100% Pontual
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 leading-tight">
                Sem filas de espera
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip below Hero */}
      <div className="relative z-10 border-t border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Ritual da Toalha Quente</h4>
              <p className="text-xs text-neutral-400">Óleos essenciais, massagem facial e navalha esterilizada</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Agendamento em 60 Segundos</h4>
              <p className="text-xs text-neutral-400">Escolha o serviço, barbeiro e horário sem complicações</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Espaço Lounge & Chopp Artesanal</h4>
              <p className="text-xs text-neutral-400">Café expresso moído na hora e cerveja gelada de cortesia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
