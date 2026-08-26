import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';

export interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'subtle';
  isPressable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  isPressable = false,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          ...theme.shadows.none,
        };
      case 'subtle':
        return {
          backgroundColor: theme.colors.surfaceSubtle,
          borderWidth: 1,
          borderColor: theme.colors.borderSubtle,
          ...theme.shadows.none,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.borderSubtle,
          ...theme.shadows.card,
        };
    }
  };

  const containerStyle = [
    styles.card,
    {
      borderRadius: theme.spacing.borderRadiusMd,
      padding: theme.spacing.lg,
    },
    getVariantStyles(),
    style,
  ];

  if (isPressable) {
    return (
      <TouchableOpacity activeOpacity={0.85} style={containerStyle} {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 6,
  },
});
