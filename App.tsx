import React from 'react';
import { AppProvider } from '@core/providers/AppProvider';
import { MainLayout } from '@core/navigation/MainLayout';

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
