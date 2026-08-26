import { BaseEntity } from '@shared/types';

export type AyurvedaCategory =
  | 'General Ayurveda'
  | 'Panchakarma'
  | 'Kayachikitsa (Internal Medicine)'
  | 'Dravyaguna (Herbal Medicine)'
  | 'Shalya Tantra (Surgical & Marma)'
  | 'Stri Roga & Prasuti (Women Health)'
  | 'Kaumarbhritya (Pediatrics)'
  | 'Rasayana & Agada (Rejuvenation & Detox)';

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM"
  timestamp: number; // Unix timestamp for exact comparison
  isBooked: boolean;
  isExpired?: boolean;
}

export interface Doctor extends BaseEntity {
  name: string;
  avatarUrl: string;
  specialization: string;
  ayurvedaCategory: AyurvedaCategory;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  currency: string;
  qualifications: string[];
  languages: string[];
  about: string;
  isAvailableToday: boolean;
  hospitalAffiliation: string;
  availableSlotCount: number;
}

export type ConsultationStatus = 'upcoming' | 'completed' | 'cancelled' | 'pending_sync';

export interface ConsultationBooking extends BaseEntity {
  bookingReference: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorAvatarUrl: string;
  slotId: string;
  date: string;
  time: string;
  slotTimestamp: number;
  feePaid: number;
  status: ConsultationStatus;
  patientNotes?: string;
  syncStatus: 'synced' | 'pending' | 'failed';
}

export interface DoctorFilterCriteria {
  searchQuery?: string;
  category?: AyurvedaCategory | 'All';
  minRating?: number;
  minExperience?: number;
  maxFee?: number;
  availableTodayOnly?: boolean;
  sortBy?: 'rating' | 'experience' | 'fee_asc' | 'fee_desc' | 'recommended';
}
