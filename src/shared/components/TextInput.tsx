import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSearch?: boolean;
  onClear?: () => void;
  debounceMs?: number;
  onDebouncedChange?: (text: string) => void;
  containerStyle?: ViewStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  isSearch = false,
  onClear,
  debounceMs = 0,
  onDebouncedChange,
  containerStyle,
  style,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [internalText, setInternalText] = useState(value || '');

  useEffect(() => {
    if (value !== undefined) {
      setInternalText(value);
    }
  }, [value]);

  useEffect(() => {
    if (debounceMs > 0 && onDebouncedChange) {
      const handler = setTimeout(() => {
        onDebouncedChange(internalText);
      }, debounceMs);
      return () => clearTimeout(handler);
    }
  }, [internalText, debounceMs, onDebouncedChange]);

  const handleChangeText = (text: string) => {
    setInternalText(text);
    onChangeText?.(text);
    if (!debounceMs && onDebouncedChange) {
      onDebouncedChange(text);
    }
  };

  const handleClear = () => {
    setInternalText('');
    onChangeText?.('');
    onDebouncedChange?.('');
    onClear?.();
  };

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.colors.surface,
            borderColor,
            borderRadius: theme.spacing.borderRadiusMd,
          },
        ]}
      >
        {isSearch ? (
          <Ionicons
            name="search-outline"
            size={20}
            color={isFocused ? theme.colors.primary : theme.colors.textMuted}
            style={styles.leftIcon}
          />
        ) : leftIcon ? (
          <View style={styles.leftIcon}>{leftIcon}</View>
        ) : null}

        <RNTextInput
          value={internalText}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontSize: 14,
            },
            style,
          ]}
          accessibilityLabel={label || placeholder || 'Text Input'}
          {...props}
        />

        {internalText.length > 0 && (isSearch || onClear) ? (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.rightIcon}
            accessibilityRole="button"
            accessibilityLabel="Clear text"
          >
            <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIcon}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
      ) : helperText ? (
        <Text style={[styles.helperText, { color: theme.colors.textMuted }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
    padding: 4,
  },
  errorText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 11,
    marginTop: 4,
  },
});
