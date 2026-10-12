import React, { useState, useEffect } from 'react';
import { Service, Barber, AddOn, Appointment } from '../types';
import { SERVICES, BARBERS, ADD_ONS, TIME_SLOTS, BARBERSHOP_INFO, LOGO_IMAGE } from '../data/barbershopData';
import { getUpcomingDays, formatDateBr, isSlotBooked, generateICS, generateWhatsAppLink } from '../utils/calendar';
import {
  X,
  Check,
  Calendar,
  Clock,
  User,
  Scissors,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Download,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  MapPin
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated: (appointment: Appointment) => void;
  existingAppointments: Appointment[];
  preSelectedService?: Service | null;
  preSelectedBarber?: Barber | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onAppointmentCreated,
  existingAppointments,
  preSelectedService,
  preSelectedBarber,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>('heitor');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Customer form details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Confirmed appointment state
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Set default date when opened
  const upcomingDays = getUpcomingDays(14);

  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (preSelectedBarber) {
      setSelectedBarberId(preSelectedBarber.id);
    }
  }, [preSelectedBarber]);

  useEffect(() => {
    if (isOpen) {
      // Find first non-closed day
      const firstOpenDay = upcomingDays.find((d) => !d.isClosed);
      if (firstOpenDay && !selectedDate) {
        setSelectedDate(firstOpenDay.dateStr);
      }
    } else {
      // Reset flow if modal was closed after completion
      if (step === 5) {
        setStep(1);
        setConfirmedAppointment(null);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Pricing & duration calculations
  const addOnsTotal = selectedAddOns.reduce((acc, addOnId) => {
    const item = ADD_ONS.find((a) => a.id === addOnId);
    return acc + (item ? item.price : 0);
  }, 0);

  const addOnsDuration = selectedAddOns.reduce((acc, addOnId) => {
    const item = ADD_ONS.find((a) => a.id === addOnId);
    return acc + (item ? item.durationMinutes : 0);
  }, 0);

  const totalPrice = selectedService.price + addOnsTotal;
  const totalDuration = selectedService.durationMinutes + addOnsDuration;

  const currentBarber =
    selectedBarberId === 'any'
      ? { id: 'any', name: 'Primeiro Barbeiro Disponível' }
      : BARBERS.find((b) => b.id === selectedBarberId) || BARBERS[0];

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
      value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    setCustomerPhone(value);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe um telefone/WhatsApp válido.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setFormError('Por favor, informe um e-mail válido para confirmação.');
      return;
    }

    const assignedBarberName =
      selectedBarberId === 'any' ? 'Heitor Ferreira (Recomendado)' : currentBarber.name;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appointmentCode = `HF-${randomSuffix}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      code: appointmentCode,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      addOnIds: selectedAddOns,
      addOnsNames: selectedAddOns.map((id) => ADD_ONS.find((a) => a.id === id)?.name || ''),
      totalPrice,
      totalDuration,
      barberId: selectedBarberId === 'any' ? 'heitor' : selectedBarberId,
      barberName: assignedBarberName,
      date: selectedDate,
      timeSlot: selectedTime,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      notes: customerNotes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onAppointmentCreated(newAppointment);
    setConfirmedAppointment(newAppointment);
    setStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Mobile drag handle bar */}
        <div className="sm:hidden w-12 h-1 bg-neutral-700/80 rounded-full mx-auto mt-2.5 mb-0" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 sm:py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_IMAGE}
              alt="Logo Barbearia Heitor Ferreira"
              className="w-9 h-9 rounded-full object-cover border border-amber-500/50 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-sm font-bold text-white font-display">
                Agendamento Online
              </h2>
              <div className="text-[11px] text-amber-500/90 font-medium">
                Barbearia Heitor Ferreira · Barba, Cabelo e Bigode
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

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="grid grid-cols-4 border-b border-neutral-800 bg-neutral-950/30 text-xs">
            {[
              { num: 1, label: 'Serviço' },
              { num: 2, label: 'Barbeiro' },
              { num: 3, label: 'Horário' },
              { num: 4, label: 'Identificação' },
            ].map((s) => (
              <div
                key={s.num}
                className={`py-3 px-2 text-center border-b-2 transition-colors ${
                  step === s.num
                    ? 'border-amber-500 text-amber-400 font-semibold'
                    : step > s.num
                    ? 'border-neutral-700 text-neutral-300'
                    : 'border-transparent text-neutral-500'
                }`}
              >
                <span className="tabular-nums mr-1">{s.num}.</span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-body">
          {/* STEP 1: SELECT SERVICE & ADD-ONS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Selecione o Serviço Principal
                </h3>
                <p className="text-xs text-neutral-400">
                  Escolha o corte, barba ou combo desejado para o seu atendimento.
                </p>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isSelected = selectedService.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                          : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">
                            {s.name}
                          </span>
                          {s.popular && (
                            <span className="text-[10px] text-amber-400 font-medium">
                              ★ Recomendado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-1">
                          {s.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-neutral-400 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-neutral-500" />
                            <span className="tabular-nums">{s.durationMinutes} min</span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base font-bold text-amber-400 font-display tabular-nums">
                          R$ {s.price.toFixed(2)}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border mt-1 ml-auto flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500 text-neutral-950'
                              : 'border-neutral-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional Add-Ons */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Adicionais Opcionais
                  </h4>
                  <span className="text-[11px] text-neutral-500">
                    Opcional
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ADD_ONS.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          isChecked
                            ? 'border-amber-500 bg-amber-500/10'
                            : 'border-neutral-800 bg-neutral-900/30 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">
                            {addon.name}
                          </span>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked
                                ? 'border-amber-500 bg-amber-500 text-neutral-950'
                                : 'border-neutral-700'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <div className="text-[11px] text-amber-400 font-bold tabular-nums">
                          + R$ {addon.price.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-neutral-500 tabular-nums">
                          +{addon.durationMinutes} min
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Escolha o Profissional
                </h3>
                <p className="text-xs text-neutral-400">
                  Selecione seu barbeiro de preferência ou escolha o primeiro disponível.
                </p>
              </div>

              {/* Any barber option */}
              <div
                onClick={() => setSelectedBarberId('any')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                  selectedBarberId === 'any'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Primeiro Barbeiro Disponível
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Mais opções de horários e atendimento com qualquer um dos nossos mestres.
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedBarberId === 'any'
                      ? 'border-amber-500 bg-amber-500 text-neutral-950'
                      : 'border-neutral-700'
                  }`}
                >
                  {selectedBarberId === 'any' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Barber List */}
              <div className="space-y-3">
                {BARBERS.map((barber) => {
                  const isSelected = selectedBarberId === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={barber.avatar}
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">
                              {barber.name}
                            </h4>
                            <span className="text-[11px] text-amber-400 font-medium">
                              {barber.experience}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            {barber.role}
                          </p>
                          <div className="text-[11px] text-neutral-500 mt-1">
                            {barber.specialties.join(' · ')}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500 text-neutral-950'
                            : 'border-neutral-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SELECT DATE & TIME */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Escolha Data e Horário
                </h3>
                <p className="text-xs text-neutral-400">
                  Atendemos de terça a sábado, das 09:00 às 20:00.
                </p>
              </div>

              {/* 14-day horizontal strip */}
              <div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Dias Disponíveis
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 pt-1">
                  {upcomingDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        disabled={day.isClosed}
                        onClick={() => {
                          setSelectedDate(day.dateStr);
                          setSelectedTime(''); // Reset selected time when date changes
                        }}
                        className={`flex flex-col items-center justify-center min-w-[70px] py-2.5 px-2 rounded-xl border transition-all shrink-0 cursor-pointer ${
                          day.isClosed
                            ? 'opacity-30 border-neutral-900 bg-neutral-950/40 cursor-not-allowed'
                            : isSelected
                            ? 'border-amber-500 bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-950/40'
                            : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                        }`}
                      >
                        <span className="text-[11px] uppercase tracking-wider opacity-80">
                          {day.dayOfWeek}
                        </span>
                        <span className="text-lg font-bold font-display tabular-nums">
                          {day.dayNumber}
                        </span>
                        <span className="text-[10px] opacity-75">
                          {day.isClosed ? 'Fechado' : day.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Horários para {formatDateBr(selectedDate)}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Duração total estimada: {totalDuration} min
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {TIME_SLOTS.map((slot) => {
                      const booked = isSlotBooked(
                        existingAppointments,
                        selectedDate,
                        slot,
                        selectedBarberId
                      );
                      const isSelected = selectedTime === slot;

                      return (
                        <button
                          key={slot}
                          disabled={booked}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 rounded-lg border text-xs font-semibold transition-all tabular-nums text-center cursor-pointer ${
                            booked
                              ? 'border-neutral-900 bg-neutral-950/50 text-neutral-600 line-through cursor-not-allowed'
                              : isSelected
                              ? 'border-amber-500 bg-amber-600 text-neutral-950 font-bold shadow-sm'
                              : 'border-neutral-800 bg-neutral-900/50 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800'
                          }`}
                        >
                          {slot}
                          {booked && (
                            <span className="block text-[9px] no-underline font-normal text-neutral-600">
                              Ocupado
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: CUSTOMER CONTACT DETAILS */}
          {step === 4 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Seus Dados para Contato
                </h3>
                <p className="text-xs text-neutral-400">
                  Enviaremos a confirmação e lembretes do horário pelo WhatsApp.
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Gabriel Silveira"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    WhatsApp / Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={customerPhone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Observações ou Preferências (Opcional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Ex: Prefiro tesoura nas laterais, pele sensível, etc."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-xs">
                <div className="font-semibold text-neutral-300">Resumo do Agendamento</div>
                <div className="flex justify-between text-neutral-400">
                  <span>Serviço:</span>
                  <span className="text-white font-medium">{selectedService.name}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Adicionais:</span>
                    <span className="text-neutral-300">
                      {selectedAddOns
                        .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
                        .join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Barbeiro:</span>
                  <span className="text-white font-medium">{currentBarber.name}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Data & Horário:</span>
                  <span className="text-amber-400 font-semibold tabular-nums">
                    {formatDateBr(selectedDate)} às {selectedTime}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold">
                  <span className="text-neutral-300">Total a pagar no local:</span>
                  <span className="text-amber-400 font-display tabular-nums">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION VOUCHER / RECEIPT */}
          {step === 5 && confirmedAppointment && (
            <div className="space-y-6 text-center py-2 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  Agendamento Confirmado!
                </h3>
                <p className="text-xs text-neutral-400">
                  Seu horário foi reservado com sucesso na Barbearia Heitor Ferreira.
                </p>
              </div>

              {/* Digital Ticket / Voucher */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-neutral-950 border border-amber-500/30 shadow-xl text-left space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                      Código da Reserva
                    </span>
                    <div className="text-lg font-bold text-amber-400 font-display tabular-nums">
                      {confirmedAppointment.code}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                      Status
                    </span>
                    <div className="text-xs font-semibold text-emerald-400">
                      Confirmado
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Cliente:</span>
                    <span className="font-medium text-white">{confirmedAppointment.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Serviço:</span>
                    <span className="font-medium text-white">{confirmedAppointment.serviceName}</span>
                  </div>
                  {confirmedAppointment.addOnsNames.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Adicionais:</span>
                      <span className="text-neutral-300">
                        {confirmedAppointment.addOnsNames.join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Barbeiro:</span>
                    <span className="font-medium text-white">{confirmedAppointment.barberName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Data & Horário:</span>
                    <span className="font-semibold text-amber-400 tabular-nums">
                      {formatDateBr(confirmedAppointment.date)} às {confirmedAppointment.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Local:</span>
                    <a
                      href={BARBERSHOP_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>Barbearia Heitor Ferreira</span>
                      <MapPin className="w-3 h-3 text-amber-500" />
                    </a>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm">
                    <span className="text-neutral-300">Valor Total:</span>
                    <span className="text-amber-400 font-display tabular-nums">
                      R$ {confirmedAppointment.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Calendar ICS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppLink(confirmedAppointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Confirmação via WhatsApp</span>
                </a>

                <button
                  onClick={() => generateICS(confirmedAppointment)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold px-4 py-2.5 rounded-lg text-xs transition-all border border-neutral-700 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-amber-500" />
                  <span>Salvar no Calendário (.ics)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Back/Next controls */}
        {step < 5 && (
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 pb-safe border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-white px-3 py-2.5 min-h-[44px] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                disabled={step === 3 && (!selectedDate || !selectedTime)}
                onClick={() => setStep(step + 1)}
                className={`flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 min-h-[44px] rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  step === 3 && (!selectedDate || !selectedTime)
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-500 text-neutral-950 shadow-md shadow-amber-950/40 active:scale-[0.98]'
                }`}
              >
                <span>Avançar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-6 py-2.5 min-h-[44px] rounded-lg text-xs transition-all shadow-md shadow-amber-950/40 cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                Confirmar Agendamento
              </button>
            )}
          </div>
        )}

        {/* Close button on completed voucher */}
        {step === 5 && (
          <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/60 flex justify-center">
            <button
              onClick={onClose}
              className="text-xs font-bold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Concluir e Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
