import React, { useState } from 'react';
import { Calendar, UserCheck, Menu, X, Smartphone, Monitor, MessageSquare, Phone, MapPin, Instagram } from 'lucide-react';
import { BARBERSHOP_INFO, LOGO_IMAGE } from '../data/barbershopData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  onOpenAdmin: () => void;
  myAppointmentsCount: number;
  isAdminMode: boolean;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  onOpenAdmin,
  myAppointmentsCount,
  isAdminMode,
  isMobileSimulator,
  onToggleMobileSimulator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-3 sm:py-3.5">
          {/* Zone 1: Single element brand wordmark with official logo emblem */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#"
              className="flex items-center gap-2.5 group"
            >
              <img
                src={LOGO_IMAGE}
                alt="Logo Barbearia Heitor Ferreira"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-amber-500/40 shadow-sm shadow-amber-950/50 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display text-base sm:text-lg font-bold tracking-normal sm:tracking-wider text-amber-50 group-hover:text-amber-400 transition-colors whitespace-nowrap leading-none">
                  HEITOR FERREIRA
                </span>
                <span className="text-[9px] tracking-widest text-amber-500/90 font-medium uppercase mt-0.5 hidden xs:block sm:block">
                  Barba · Cabelo · Bigode
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4-5 clean single-line nav links (desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a
              href="#servicos"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Serviços
            </a>
            <a
              href="#profissionais"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Profissionais
            </a>
            <a
              href="#experiencia"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              O Espaço
            </a>
            <button
              onClick={onOpenMyAppointments}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Meus Agendamentos</span>
              {myAppointmentsCount > 0 && (
                <span className="text-xs font-semibold tabular-nums text-amber-400 ml-0.5">
                  ({myAppointmentsCount})
                </span>
              )}
            </button>
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer px-2.5 py-1 rounded border ${
                isAdminMode
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
              title="Painel de controle para barbeiros e recepção"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'Visão Barbeiro' : 'Painel Recepção'}</span>
            </button>
          </nav>

          {/* Zone 3: Actions + Mobile Simulator Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Simulator Viewport Toggle (Desktop <-> Mobile) */}
            <button
              onClick={onToggleMobileSimulator}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                isMobileSimulator
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
              title="Alternar entre visualização de computador e celular"
            >
              {isMobileSimulator ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Ver em Tela Cheia</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simular Celular</span>
                </>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-neutral-950 font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all shadow-md shadow-amber-950/50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Agendar Horário
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 cursor-pointer"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-50 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
          <div className="space-y-5">
            {/* Logo Badge in Drawer */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <img
                src={LOGO_IMAGE}
                alt="Logo Barbearia Heitor Ferreira"
                className="w-14 h-14 rounded-full object-cover border border-amber-500/50 shadow-md shadow-amber-950/40 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold text-white text-base leading-tight truncate">
                  HEITOR FERREIRA
                </div>
                <div className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold mt-0.5">
                  Barba · Cabelo · Bigode
                </div>
                <a
                  href={BARBERSHOP_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-amber-400 font-mono mt-1 inline-flex items-center gap-1 transition-colors"
                >
                  <Instagram className="w-3 h-3 text-pink-500" />
                  <span>{BARBERSHOP_INFO.instagram}</span>
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-amber-500 font-semibold">
                Navegação Rápida
              </div>
              <div className="divide-y divide-neutral-800/80">
                <a
                  href="#servicos"
                  onClick={handleNavClick}
                  className="block py-3.5 text-base font-semibold text-white hover:text-amber-400"
                >
                  Serviços & Valores
                </a>
                <a
                  href="#profissionais"
                  onClick={handleNavClick}
                  className="block py-3.5 text-base font-semibold text-white hover:text-amber-400"
                >
                  Nossos Barbeiros
                </a>
                <a
                  href="#experiencia"
                  onClick={handleNavClick}
                  className="block py-3.5 text-base font-semibold text-white hover:text-amber-400"
                >
                  O Ritual & Espaço Lounge
                </a>
                <button
                  onClick={() => {
                    handleNavClick();
                    onOpenMyAppointments();
                  }}
                  className="w-full text-left py-3.5 text-base font-semibold text-white hover:text-amber-400 flex items-center justify-between"
                >
                  <span>Meus Agendamentos</span>
                  {myAppointmentsCount > 0 && (
                    <span className="bg-amber-500 text-neutral-950 text-xs font-bold px-2 py-0.5 rounded-full">
                      {myAppointmentsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleNavClick();
                    onOpenAdmin();
                  }}
                  className="w-full text-left py-3.5 text-sm font-medium text-neutral-400 hover:text-amber-400 flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-amber-500" />
                  <span>Painel Operacional (Recepção)</span>
                </button>
              </div>
            </div>

            {/* Quick Contact & Location */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <a
                href={BARBERSHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Barbearia Heitor Ferreira (Ver no Maps)</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(11) 99999-8888</span>
              </div>
              <a
                href={`https://wa.me/${BARBERSHOP_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-700/80 hover:bg-emerald-600 text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-900">
            <button
              onClick={() => {
                handleNavClick();
                onOpenBooking();
              }}
              className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-3.5 rounded-xl text-sm transition-all text-center"
            >
              Agendar Meu Horário Agora
            </button>
          </div>
        </div>
      )}
    </>
  );
};
