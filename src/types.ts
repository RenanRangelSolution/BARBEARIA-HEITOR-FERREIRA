export type ServiceCategory = 'todos' | 'cabelo' | 'barba' | 'combos' | 'spa';

export interface Service {
  id: string;
  name: string;
  category: 'cabelo' | 'barba' | 'combos' | 'spa';
  description: string;
  price: number;
  durationMinutes: number;
  popular?: boolean;
  tag?: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  avatar: string;
  specialties: string[];
  daysWorking: number[]; // 0=domingo, 1=seg, 2=ter, 3=qua, 4=qui, 5=sex, 6=sab
}

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  code: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  addOnIds: string[];
  addOnsNames: string[];
  totalPrice: number;
  totalDuration: number;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}
