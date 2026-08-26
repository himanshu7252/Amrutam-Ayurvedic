export interface EnvironmentConfig {
  environment: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  apiTimeout: number;
  mockApiEnabled: boolean;
  mockDataDoctorCount: number;
  mockDataProductCount: number;
  mockDataRecordCount: number;
  enablePerfLogs: boolean;
  enableOfflineSync: boolean;
}

export const ENV: EnvironmentConfig = {
  environment: 'development',
  apiBaseUrl: 'https://api.amrutam.co.in/v1',
  apiTimeout: 15000,
  mockApiEnabled: true,
  mockDataDoctorCount: 5000,
  mockDataProductCount: 20000,
  mockDataRecordCount: 10000,
  enablePerfLogs: true,
  enableOfflineSync: true,
};
