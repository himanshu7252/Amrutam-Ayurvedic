import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastComponent, ToastItem } from '@shared/components/Toast';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ShowToastOptions {
  title?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, options?: ShowToastOptions) => void;
  showSuccess: (message: string, options?: ShowToastOptions) => void;
  showError: (message: string, options?: ShowToastOptions) => void;
  showWarning: (message: string, options?: ShowToastOptions) => void;
  showInfo: (message: string, options?: ShowToastOptions) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, options?: ShowToastOptions) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastItem = {
        id,
        type,
        message,
        title: options?.title,
        duration: options?.duration || 3500,
      };

      setToasts((prev) => [...prev.slice(-2), newToast]); // Max 3 toasts at once

      setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
    },
    [hideToast]
  );

  const showSuccess = useCallback((msg: string, opt?: ShowToastOptions) => showToast('success', msg, opt), [showToast]);
  const showError = useCallback((msg: string, opt?: ShowToastOptions) => showToast('error', msg, opt), [showToast]);
  const showWarning = useCallback((msg: string, opt?: ShowToastOptions) => showToast('warning', msg, opt), [showToast]);
  const showInfo = useCallback((msg: string, opt?: ShowToastOptions) => showToast('info', msg, opt), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo, hideToast }}>
      {children}
      <ToastComponent toasts={toasts} onDismiss={hideToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
