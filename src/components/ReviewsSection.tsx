import React from 'react';
import { REVIEWS } from '../data/barbershopData';
import { Star, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
              04. Satisfação Comprovada
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              O que Dizem Nossos Clientes
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base mt-2">
              Avaliações reais de quem confia seu visual à nossa equipe semana após semana.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-base sm:text-lg font-bold text-white font-display tabular-nums">4.9 / 5.0</div>
              <div className="text-[11px] sm:text-xs text-neutral-400">Classificação Geral no Google</div>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500">{rev.date}</span>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-body italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  </div>
                  <div className="text-[11px] text-amber-400 mt-0.5">
                    {rev.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
