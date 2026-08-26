import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';

export interface LoaderProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  message = 'Loading Ayurvedic wellness...',
  size = 'large',
  fullScreen = false,
  style,
}) => {
  const { theme } = useTheme();

  const containerStyle = fullScreen ? styles.fullScreen : styles.inline;

  return (
    <View
      style={[
        containerStyle,
        { backgroundColor: fullScreen ? theme.colors.background : 'transparent' },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={message}
    >
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {message ? (
        <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: theme.colors.surfaceSubtle,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  inline: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  skeleton: {
    marginVertical: 4,
    opacity: 0.7,
  },
});
