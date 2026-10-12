import React from 'react';
import { Home, Scissors, Users, Calendar, Plus } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  myAppointmentsCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  myAppointmentsCount,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800/80 px-2 pt-1 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {/* Home */}
        <a
          href="#"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Início</span>
        </a>

        {/* Serviços */}
        <a
          href="#servicos"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <Scissors className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Serviços</span>
        </a>

        {/* Central Raised Booking Button */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center -mt-5 min-w-[54px] min-h-[54px] group cursor-pointer"
          aria-label="Agendar Horário"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-950/60 border-2 border-neutral-950 group-active:scale-95 transition-transform">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-[10px] font-bold text-amber-400 mt-0.5">Agendar</span>
        </button>

        {/* Barbeiros */}
        <a
          href="#profissionais"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Equipe</span>
        </a>

        {/* Meus Agendamentos */}
        <button
          onClick={onOpenMyAppointments}
          className="relative flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Reservas</span>
          {myAppointmentsCount > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 text-[9px] font-extrabold flex items-center justify-center">
              {myAppointmentsCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
