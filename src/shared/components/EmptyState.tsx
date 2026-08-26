import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'leaf-outline',
  actionTitle,
  onAction,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme.colors.primaryMuted,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Ionicons name={icon} size={36} color={theme.colors.primary} />
      </View>
      <Text style={[styles.title, theme.typography.h3, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.description,
          theme.typography.body2,
          { color: theme.colors.textSecondary },
        ]}
      >
        {description}
      </Text>
      {actionTitle && onAction ? (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="outline"
          size="sm"
          style={styles.actionButton}
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
    marginBottom: 18,
  },
  actionButton: {
    minWidth: 140,
  },
});
