import React, { useState, useEffect } from 'react';
import { Appointment, Service, Barber } from './types';
import { INITIAL_APPOINTMENTS } from './data/barbershopData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { AdminScheduleView } from './components/AdminScheduleView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileSimulatorFrame } from './components/MobileSimulatorFrame';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('hf_barbearia_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_APPOINTMENTS;
  });

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [preSelectedBarber, setPreSelectedBarber] = useState<Barber | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hf_barbearia_appointments', JSON.stringify(appointments));
    } catch {
      // Ignore
    }
  }, [appointments]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenBooking = (service?: Service, barber?: Barber) => {
    setPreSelectedService(service || null);
    setPreSelectedBarber(barber || null);
    setIsBookingOpen(true);
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Agendamento ${newAppointment.code} realizado com sucesso!`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    );
    showToast('Agendamento cancelado com sucesso.');
  };

  const handleUpdateStatus = (
    id: string,
    status: 'confirmed' | 'completed' | 'cancelled'
  ) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    const label =
      status === 'completed'
        ? 'marcado como concluído'
        : status === 'cancelled'
        ? 'cancelado'
        : 'reativado';
    showToast(`Atendimento ${label}.`);
  };

  // User's active appointments count
  const myActiveAppointmentsCount = appointments.filter(
    (a) => a.status === 'confirmed'
  ).length;

  const renderContent = () => (
    <div className="min-h-full bg-neutral-950 text-neutral-100 flex flex-col font-body selection:bg-amber-600/30 selection:text-amber-200 pb-20 md:pb-0">
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        onOpenAdmin={() => setIsAdminMode(true)}
        myAppointmentsCount={myActiveAppointmentsCount}
        isAdminMode={isAdminMode}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
      />

      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />

        <ServicesSection
          onSelectServiceAndBook={(service) => handleOpenBooking(service)}
        />

        <BarbersSection
          onSelectBarberAndBook={(barber) => handleOpenBooking(undefined, barber)}
        />

        <ExperienceSection />

        <ReviewsSection />

        <LocationHoursSection />
      </main>

      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        onOpenAdmin={() => setIsAdminMode(true)}
      />

      {/* Mobile Bottom Navigation Bar (Shown on actual mobile screens and in mobile simulator) */}
      <MobileBottomNav
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        myAppointmentsCount={myActiveAppointmentsCount}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-neutral-900 border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Mode vs Client Mode */}
      {isAdminMode ? (
        <AdminScheduleView
          appointments={appointments}
          onUpdateStatus={handleUpdateStatus}
          onOpenBooking={() => handleOpenBooking()}
          onCloseAdmin={() => setIsAdminMode(false)}
        />
      ) : isMobileSimulator ? (
        <MobileSimulatorFrame onExit={() => setIsMobileSimulator(false)}>
          {renderContent()}
        </MobileSimulatorFrame>
      ) : (
        renderContent()
      )}

      {/* Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onAppointmentCreated={handleAppointmentCreated}
        existingAppointments={appointments}
        preSelectedService={preSelectedService}
        preSelectedBarber={preSelectedBarber}
      />

      {/* Client's Saved Appointments Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
