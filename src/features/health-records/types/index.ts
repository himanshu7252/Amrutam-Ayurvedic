import { BaseEntity } from '@shared/types';

export type HealthRecordType =
  | 'Lab Report'
  | 'Prescription'
  | 'Consultation'
  | 'Vaccination'
  | 'Allergy';

export interface RecordAttachment {
  id: string;
  fileName: string;
  fileType: 'image' | 'pdf';
  fileSizeFormatted: string;
  thumbnailUrl: string;
  fullUrl: string;
}

export interface HealthRecord extends BaseEntity {
  title: string;
  type: HealthRecordType;
  date: string; // YYYY-MM-DD
  doctorName?: string;
  facilityName?: string;
  notes: string;
  tags: string[];
  attachments: RecordAttachment[];
  year: number;
  month: string; // 'January', 'February', etc.
  diagnoses?: string[];
  prescribedMedicines?: string[];
}

export interface HealthRecordFilterCriteria {
  searchQuery?: string;
  recordTypes?: HealthRecordType[];
  selectedYear?: number | 'All';
  selectedTag?: string | 'All';
}

export interface TimelineMonthGroup {
  monthKey: string; // "2026-08"
  year: number;
  monthName: string;
  records: HealthRecord[];
}

export interface TimelineYearGroup {
  year: number;
  months: TimelineMonthGroup[];
  totalRecords: number;
}
