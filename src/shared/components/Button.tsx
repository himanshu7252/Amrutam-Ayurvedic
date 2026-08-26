import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@shared/context/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  enableHaptics?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
  enableHaptics = true,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();

  const handlePress = (e: any) => {
    if (disabled || isLoading) return;
    if (enableHaptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }
    onPress?.(e);
  };

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle; loaderColor: string } => {
    switch (variant) {
      case 'secondary':
        return {
          container: {
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.secondary,
          },
          text: {
            color: '#FFFFFF',
          },
          loaderColor: '#FFFFFF',
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderColor: theme.colors.primary,
            borderWidth: 1.5,
          },
          text: {
            color: theme.colors.primary,
          },
          loaderColor: theme.colors.primary,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
          text: {
            color: theme.colors.primary,
          },
          loaderColor: theme.colors.primary,
        };
      case 'danger':
        return {
          container: {
            backgroundColor: theme.colors.error,
            borderColor: theme.colors.error,
          },
          text: {
            color: '#FFFFFF',
          },
          loaderColor: '#FFFFFF',
        };
      case 'primary':
      default:
        return {
          container: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          },
          text: {
            color: '#FFFFFF',
          },
          loaderColor: '#FFFFFF',
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: theme.spacing.borderRadiusSm,
          },
          text: {
            fontSize: 12,
          },
        };
      case 'lg':
        return {
          container: {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: theme.spacing.borderRadiusMd,
          },
          text: {
            fontSize: 16,
          },
        };
      case 'md':
      default:
        return {
          container: {
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: theme.spacing.borderRadiusMd,
          },
          text: {
            fontSize: 14,
          },
        };
    }
  };

  const variantStyle = getVariantStyles();
  const sizeStyle = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      style={[
        styles.baseContainer,
        variantStyle.container,
        sizeStyle.container,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyle.loaderColor} size="small" />
      ) : (
        <>
          {leftIcon ? leftIcon : null}
          <Text
            style={[
              styles.baseText,
              theme.typography.button,
              variantStyle.text,
              sizeStyle.text,
              leftIcon ? styles.leftMargin : undefined,
              rightIcon ? styles.rightMargin : undefined,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon ? rightIcon : null}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 44, // Accessible minimum touch target
  },
  baseText: {
    textAlign: 'center',
  },
  leftMargin: {
    marginLeft: 8,
  },
  rightMargin: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
