import { Appointment } from '../types';

export function getUpcomingDays(count = 14): { dateStr: string; dayOfWeek: string; dayNumber: string; monthName: string; isClosed: boolean }[] {
  const days = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const dayIndex = d.getDay(); // 0 is Sunday, 1 is Monday
    const isClosed = dayIndex === 0 || dayIndex === 1; // Dom e Seg fechado

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    days.push({
      dateStr,
      dayOfWeek: dayNames[dayIndex],
      dayNumber: day,
      monthName: monthNames[d.getMonth()],
      isClosed,
    });
  }

  return days;
}

export function formatDateBr(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function isSlotBooked(
  appointments: Appointment[],
  date: string,
  timeSlot: string,
  barberId: string
): boolean {
  return appointments.some((apt) => {
    if (apt.status === 'cancelled') return false;
    if (apt.date !== date || apt.timeSlot !== timeSlot) return false;
    // If barber is specified, check exact match
    if (barberId && barberId !== 'any') {
      return apt.barberId === barberId;
    }
    // If 'any' is selected, a slot is considered fully booked if all 3 barbers are booked at that slot
    return false;
  });
}

export function generateICS(appointment: {
  code: string;
  serviceName: string;
  barberName: string;
  date: string;
  timeSlot: string;
  totalDuration: number;
  totalPrice: number;
}): void {
  const [year, month, day] = appointment.date.split('-');
  const [hour, minute] = appointment.timeSlot.split(':');

  const startDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  const endDate = new Date(startDate.getTime() + appointment.totalDuration * 60000);

  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Barbearia Heitor Ferreira//Agendamento//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${appointment.serviceName} - Barbearia Heitor Ferreira`,
    `DESCRIPTION:Agendamento com ${appointment.barberName}. Código: ${appointment.code}. Valor: R$ ${appointment.totalPrice.toFixed(2)}`,
    'LOCATION:Barbearia Heitor Ferreira - https://share.google/7oVaDuILBP4xgQVvs',
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `UID:${appointment.code}@heitorferreira.com.br`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Agendamento-HeitorFerreira-${appointment.code}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateWhatsAppLink(appointment: {
  code: string;
  serviceName: string;
  barberName: string;
  date: string;
  timeSlot: string;
  customerName: string;
  totalPrice: number;
}): string {
  const text = encodeURIComponent(
    `Olá Barbearia Heitor Ferreira! Gostaria de confirmar meu agendamento:\n\n` +
    `✂️ Serviço: ${appointment.serviceName}\n` +
    `💈 Profissional: ${appointment.barberName}\n` +
    `📅 Data: ${formatDateBr(appointment.date)} às ${appointment.timeSlot}\n` +
    `👤 Cliente: ${appointment.customerName}\n` +
    `🏷️ Código: ${appointment.code}\n` +
    `💰 Valor Total: R$ ${appointment.totalPrice.toFixed(2)}\n\n` +
    `Obrigado!`
  );

  return `https://wa.me/5511999998888?text=${text}`;
}
