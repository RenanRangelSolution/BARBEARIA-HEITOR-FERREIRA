import React from 'react';
import { BARBERSHOP_INFO, LOGO_IMAGE } from '../data/barbershopData';
import { Instagram, MapPin, Phone, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-900 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-neutral-900">
        <div className="flex items-center gap-3.5">
          <img
            src={LOGO_IMAGE}
            alt="Logo Barbearia Heitor Ferreira"
            className="w-12 h-12 rounded-full object-cover border border-amber-500/40 shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="font-display text-base sm:text-lg font-bold tracking-wider text-amber-50">
              HEITOR FERREIRA
            </span>
            <div className="text-[11px] text-amber-400/90 font-medium tracking-wide">
              Barba, Cabelo e Bigode · {BARBERSHOP_INFO.instagram}
            </div>
            <a
              href={BARBERSHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-amber-400 text-xs mt-0.5 block transition-colors"
            >
              Ver Localização no Google Maps
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
          <a href="#servicos" className="hover:text-amber-400 transition-colors">
            Serviços
          </a>
          <a href="#profissionais" className="hover:text-amber-400 transition-colors">
            Profissionais
          </a>
          <a href="#experiencia" className="hover:text-amber-400 transition-colors">
            O Ritual
          </a>
          <button
            onClick={onOpenMyAppointments}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Meus Agendamentos
          </button>
          <button
            onClick={onOpenAdmin}
            className="hover:text-amber-400 transition-colors cursor-pointer text-neutral-500"
          >
            Acesso Recepção / Barbeiros
          </button>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${BARBERSHOP_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href={BARBERSHOP_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
            aria-label="Instagram @heitoor_barber"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 text-[11px]">
        <div>
          © {new Date().getFullYear()} Barbearia Heitor Ferreira. Todos os direitos reservados.
        </div>
        <div>
          CNPJ: 28.914.832/0001-19 · Jardins, São Paulo - SP
        </div>
      </div>
    </footer>
  );
};
