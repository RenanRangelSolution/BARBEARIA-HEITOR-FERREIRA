import React, { useState } from 'react';
import { Appointment, Barber } from '../types';
import { BARBERS } from '../data/barbershopData';
import { formatDateBr } from '../utils/calendar';
import {
  Calendar,
  Clock,
  User,
  DollarSign,
  CheckCircle2,
  XCircle,
  Filter,
  Phone,
  Scissors,
  ArrowLeft,
  Plus
} from 'lucide-react';

interface AdminScheduleViewProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => void;
  onOpenBooking: () => void;
  onCloseAdmin: () => void;
}

export const AdminScheduleView: React.FC<AdminScheduleViewProps> = ({
  appointments,
  onUpdateStatus,
  onOpenBooking,
  onCloseAdmin,
}) => {
  const [selectedBarberFilter, setSelectedBarberFilter] = useState<string>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');

  const filteredAppointments = appointments.filter((apt) => {
    if (selectedBarberFilter !== 'all' && apt.barberId !== selectedBarberFilter) {
      return false;
    }
    if (selectedDateFilter !== 'all' && apt.date !== selectedDateFilter) {
      return false;
    }
    return true;
  });

  // Calculate metrics
  const activeAppointments = appointments.filter((a) => a.status !== 'cancelled');
  const totalRevenue = activeAppointments.reduce((acc, a) => acc + a.totalPrice, 0);
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;

  // Distinct dates in appointments
  const uniqueDates = Array.from(new Set(appointments.map((a) => a.date))).sort();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top bar with back to client site */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <button
              onClick={onCloseAdmin}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site Principal</span>
            </button>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Painel Operacional · Barbearia Heitor Ferreira
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Gestão de agendamentos diários, escala de barbeiros e controle de caixa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-md shadow-amber-950/40 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Agendamento Manual</span>
            </button>
          </div>
        </div>

        {/* Operational Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">Agendamentos Totais</div>
            <div className="text-2xl font-bold text-white font-display tabular-nums mt-1">
              {appointments.length}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              {confirmedCount} pendentes · {completedCount} finalizados
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">Faturamento Previsto</div>
            <div className="text-2xl font-bold text-amber-400 font-display tabular-nums mt-1">
              R$ {totalRevenue.toFixed(2)}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              Receita de serviços ativos
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">Barbeiros na Escala</div>
            <div className="text-2xl font-bold text-white font-display tabular-nums mt-1">
              {BARBERS.length} Mestres
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              Heitor, Rafael e Lucas
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-xs text-neutral-400 font-medium">Taxa de Conclusão</div>
            <div className="text-2xl font-bold text-emerald-400 font-display tabular-nums mt-1">
              {appointments.length > 0
                ? `${Math.round((completedCount / appointments.length) * 100)}%`
                : '100%'}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              Atendimentos realizados
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filtrar Barbeiro:
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedBarberFilter('all')}
                className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  selectedBarberFilter === 'all'
                    ? 'bg-amber-600 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Todos
              </button>
              {BARBERS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBarberFilter(b.id)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    selectedBarberFilter === b.id
                      ? 'bg-amber-600 text-neutral-950 font-bold'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {b.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium">Data:</span>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">Todas as Datas</option>
              {uniqueDates.map((d) => (
                <option key={d} value={d}>
                  {formatDateBr(d)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Appointments Table / List */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-display">
              Escala de Agendamentos ({filteredAppointments.length})
            </h2>
            <span className="text-xs text-neutral-400">
              Ordenado por data e horário
            </span>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 text-sm">
              Nenhum agendamento encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="divide-y divide-neutral-800/80">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-neutral-900/50 transition-colors"
                >
                  {/* Left: Code, Time, Client */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-amber-400 text-sm tabular-nums">
                        {apt.code}
                      </span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs font-semibold text-white">
                        {apt.customerName}
                      </span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-neutral-500" />
                        {apt.customerPhone}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 font-medium">
                      {apt.serviceName}
                      {apt.addOnsNames.length > 0 && (
                        <span className="text-neutral-400 ml-1">
                          (+ {apt.addOnsNames.join(', ')})
                        </span>
                      )}
                    </div>

                    {apt.notes && (
                      <div className="text-[11px] text-amber-400/80 italic">
                        Obs: "{apt.notes}"
                      </div>
                    )}
                  </div>

                  {/* Middle: Barber, Date, Price */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300">
                    <div className="flex items-center gap-1 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                      <Scissors className="w-3.5 h-3.5 text-amber-500" />
                      <span>{apt.barberName}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800 font-semibold tabular-nums text-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        {formatDateBr(apt.date)} às {apt.timeSlot}
                      </span>
                    </div>

                    <div className="font-display font-bold text-sm text-amber-400 tabular-nums">
                      R$ {apt.totalPrice.toFixed(2)}
                    </div>
                  </div>

                  {/* Right: Status & Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        apt.status === 'confirmed'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                          : apt.status === 'completed'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                          : 'bg-red-950/60 text-red-400 border border-red-800/50'
                      }`}
                    >
                      {apt.status === 'confirmed'
                        ? 'Confirmado'
                        : apt.status === 'completed'
                        ? 'Concluído'
                        : 'Cancelado'}
                    </span>

                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'completed')}
                        className="p-1.5 rounded-lg bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-200 border border-emerald-800/50 text-xs flex items-center gap-1 cursor-pointer"
                        title="Marcar como Concluído"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Concluir</span>
                      </button>
                    )}

                    {apt.status !== 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'cancelled')}
                        className="p-1.5 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900/60 hover:text-red-200 border border-red-800/50 text-xs flex items-center gap-1 cursor-pointer"
                        title="Cancelar Atendimento"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Cancelar</span>
                      </button>
                    )}

                    {apt.status === 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'confirmed')}
                        className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs cursor-pointer"
                        title="Reativar Horário"
                      >
                        Reativar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
