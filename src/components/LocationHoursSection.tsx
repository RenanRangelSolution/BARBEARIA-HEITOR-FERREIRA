import React, { useState } from 'react';
import { BARBERSHOP_INFO } from '../data/barbershopData';
import { MapPin, Clock, Phone, ChevronDown, CreditCard, MessageSquare } from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funciona a tolerância de horário e pontualidade?',
      answer: 'Trabalhamos com pontualidade rigorosa para que você nunca fique esperando. Recomendamos chegar com 5 a 10 minutos de antecedência para desfrutar com calma do nosso café espresso ou chopp cortesia. Há uma tolerância de 10 minutos de atraso.',
    },
    {
      question: 'Quais formas de pagamento são aceitas na barbearia?',
      answer: 'Aceitamos PIX, cartões de crédito e débito (todas as bandeiras), dinheiro em espécie e carteiras digitais (Apple Pay / Google Pay). O pagamento é realizado diretamente na recepção ao final do atendimento.',
    },
    {
      question: 'Posso remarcar ou cancelar meu agendamento?',
      answer: 'Sim! Você pode cancelar diretamente pelo site na aba "Meus Agendamentos" ou nos avisar pelo WhatsApp com pelo menos 2 horas de antecedência para que possamos liberar a vaga para outro cliente.',
    },
    {
      question: 'Há estacionamento disponível no local?',
      answer: 'Sim, dispomos de convênio com serviço de manobrista (valet) exatamente em frente à barbearia na Rua Oscar Freire com tarifa especial para clientes.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Location & Hours */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
              05. Onde Estamos
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              Localização & Horários
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8">
              Localizados no coração dos Jardins, oferecemos um refúgio acolhedor e privativo com fácil acesso e comodidade.
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Localização Oficial</h4>
                    <p className="text-xs text-neutral-300 mt-0.5">Barbearia Heitor Ferreira</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Acesso rápido via GPS (Google Maps & Waze)</p>
                  </div>
                </div>

                <a
                  href={BARBERSHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 py-2.5 px-4 rounded-lg text-xs font-bold transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Abrir no Google Maps & Traçar Rota</span>
                </a>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="w-full">
                  <h4 className="text-sm font-bold text-white mb-2">Horários de Atendimento</h4>
                  <div className="space-y-1.5 text-xs">
                    {BARBERSHOP_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between border-b border-neutral-800/60 pb-1 last:border-0 last:pb-0">
                        <span className="text-neutral-400">{h.days}</span>
                        <span className="text-neutral-200 font-medium tabular-nums">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Contato Direto & WhatsApp</h4>
                  <p className="text-xs text-neutral-300 mt-0.5">{BARBERSHOP_INFO.phoneDisplay}</p>
                  <a
                    href={`https://wa.me/${BARBERSHOP_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold mt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Falar no WhatsApp com nossa recepção</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
              Dúvidas Frequentes
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-6">
              Perguntas & Respostas
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-neutral-200">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Payment Info */}
            <div className="mt-8 p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/20 flex items-center gap-3 text-xs text-neutral-400">
              <CreditCard className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                Aceitamos PIX, Cartões de Crédito e Débito, Apple Pay e Dinheiro. Pagamento no local.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
