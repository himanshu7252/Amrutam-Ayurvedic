import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected issue while communicating with the Ayurvedic service.',
  onRetry,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme.colors.errorLight,
            borderColor: theme.colors.error,
          },
        ]}
      >
        <Ionicons name="alert-circle-outline" size={38} color={theme.colors.error} />
      </View>
      <Text style={[styles.title, theme.typography.h3, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.message,
          theme.typography.body2,
          { color: theme.colors.textSecondary },
        ]}
      >
        {message}
      </Text>
      {onRetry ? (
        <Button
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          size="md"
          leftIcon={<Ionicons name="refresh" size={16} color="#FFFFFF" />}
          style={styles.retryButton}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 19,
    marginBottom: 20,
  },
  retryButton: {
    minWidth: 150,
  },
});
