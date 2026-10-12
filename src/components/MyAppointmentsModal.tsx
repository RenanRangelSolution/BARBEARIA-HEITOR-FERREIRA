import React from 'react';
import { Appointment } from '../types';
import { formatDateBr, generateICS, generateWhatsAppLink } from '../utils/calendar';
import { X, Calendar, Clock, User, Scissors, MessageSquare, Download, AlertTriangle } from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        {/* Mobile drag handle bar */}
        <div className="sm:hidden w-12 h-1 bg-neutral-700/80 rounded-full mx-auto mt-2.5 mb-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 sm:py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-500">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display">
                Meus Agendamentos
              </h2>
              <div className="text-[11px] text-neutral-400">
                Histórico e reservas ativas salvas no seu dispositivo
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 font-body">
          {appointments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Você ainda não possui nenhum horário marcado. Escolha o serviço e barbeiro agora mesmo.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-md shadow-amber-950/40 cursor-pointer"
              >
                Agendar Novo Horário
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => {
                const isCancelled = apt.status === 'cancelled';
                return (
                  <div
                    key={apt.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCancelled
                        ? 'bg-neutral-950/40 border-neutral-800/60 opacity-60'
                        : 'bg-neutral-950/90 border-neutral-800 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400 font-display tabular-nums">
                          {apt.code}
                        </span>
                        <span className="text-neutral-600">·</span>
                        <span className="text-xs text-neutral-300 font-medium">
                          {apt.customerName}
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                            : apt.status === 'completed'
                            ? 'bg-neutral-800 text-neutral-400'
                            : 'bg-red-950/60 text-red-400 border border-red-800/50'
                        }`}
                      >
                        {apt.status === 'confirmed'
                          ? 'Confirmado'
                          : apt.status === 'completed'
                          ? 'Concluído'
                          : 'Cancelado'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-neutral-300">
                      <div className="font-semibold text-white text-sm">
                        {apt.serviceName}
                      </div>

                      {apt.addOnsNames.length > 0 && (
                        <div className="text-neutral-400 text-[11px]">
                          + {apt.addOnsNames.join(', ')}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-4 pt-1 text-neutral-400 text-[11px]">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-neutral-500" />
                          {apt.barberName}
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {formatDateBr(apt.date)} às {apt.timeSlot}
                        </span>
                        <span className="font-display font-bold text-amber-400 tabular-nums ml-auto text-xs">
                          R$ {apt.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Actions if confirmed */}
                    {!isCancelled && (
                      <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={generateWhatsAppLink(apt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:text-emerald-300 transition-colors text-xs flex items-center gap-1"
                            title="Conversar no WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>
                          <button
                            onClick={() => generateICS(apt)}
                            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                            title="Baixar para Calendário"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">iCal</span>
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`Deseja cancelar o agendamento ${apt.code}?`)) {
                              onCancelAppointment(apt.id);
                            }
                          }}
                          className="text-[11px] text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded hover:bg-red-950/30 cursor-pointer flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>Cancelar Horário</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-neutral-300 hover:text-white px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
