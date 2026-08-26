import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'gold';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  icon,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getVariantStyles = (): { bg: string; text: string; border: string } => {
    switch (variant) {
      case 'success':
        return {
          bg: theme.colors.successLight,
          text: theme.colors.success,
          border: theme.colors.success,
        };
      case 'warning':
        return {
          bg: theme.colors.warningLight,
          text: theme.colors.warning,
          border: theme.colors.warning,
        };
      case 'error':
        return {
          bg: theme.colors.errorLight,
          text: theme.colors.error,
          border: theme.colors.error,
        };
      case 'info':
        return {
          bg: theme.colors.infoLight,
          text: theme.colors.info,
          border: theme.colors.info,
        };
      case 'gold':
        return {
          bg: theme.isDark ? '#3D3410' : '#FFF9E6',
          text: theme.isDark ? '#F4D03F' : '#B78103',
          border: theme.colors.accent,
        };
      case 'neutral':
      default:
        return {
          bg: theme.colors.badgeBackground,
          text: theme.colors.badgeText,
          border: theme.colors.borderSubtle,
        };
    }
  };

  const colors = getVariantStyles();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingHorizontal: isSmall ? 6 : 10,
          paddingVertical: isSmall ? 2 : 4,
          borderRadius: theme.spacing.borderRadiusFull,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Badge: ${label}`}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={isSmall ? 10 : 13}
          color={colors.text}
          style={styles.icon}
        />
      ) : null}
      <Text
        style={[
          styles.label,
          {
            color: colors.text,
            fontSize: isSmall ? 10 : 11,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
