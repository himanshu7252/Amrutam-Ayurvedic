import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';
import { ToastType } from '@shared/context/ToastContext';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration: number;
}

interface ToastComponentProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastComponent: React.FC<ToastComponentProps> = ({ toasts, onDismiss }) => {
  const { theme } = useTheme();

  if (toasts.length === 0) return null;

  const getToastStyle = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          bg: theme.colors.successLight,
          border: theme.colors.success,
          text: theme.colors.success,
          icon: 'checkmark-circle' as const,
        };
      case 'error':
        return {
          bg: theme.colors.errorLight,
          border: theme.colors.error,
          text: theme.colors.error,
          icon: 'alert-circle' as const,
        };
      case 'warning':
        return {
          bg: theme.colors.warningLight,
          border: theme.colors.warning,
          text: theme.colors.warning,
          icon: 'warning' as const,
        };
      case 'info':
      default:
        return {
          bg: theme.colors.infoLight,
          border: theme.colors.info,
          text: theme.colors.info,
          icon: 'information-circle' as const,
        };
    }
  };

  return (
    <SafeAreaView style={styles.container} pointerEvents="box-none" edges={['top']}>
      <View style={styles.toastList}>
        {toasts.map((toast) => {
          const config = getToastStyle(toast.type);
          return (
            <TouchableOpacity
              key={toast.id}
              style={[
                styles.toastCard,
                {
                  backgroundColor: config.bg,
                  borderColor: config.border,
                  ...theme.shadows.elevated,
                },
              ]}
              onPress={() => onDismiss(toast.id)}
              activeOpacity={0.85}
              accessibilityRole="alert"
              accessibilityLabel={`${toast.type} notification: ${toast.message}`}
            >
              <Ionicons name={config.icon} size={22} color={config.text} style={styles.icon} />
              <View style={styles.textContainer}>
                {toast.title ? (
                  <Text style={[styles.title, { color: config.text }]}>{toast.title}</Text>
                ) : null}
                <Text style={[styles.message, { color: theme.colors.text }]}>{toast.message}</Text>
              </View>
              <Ionicons name="close" size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 24 : 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  toastList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});
