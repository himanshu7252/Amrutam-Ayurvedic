/**
 * Shared Common Domain Types across Amrutam Ayurvedic App
 */

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  doshaProfile?: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic';
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
}
