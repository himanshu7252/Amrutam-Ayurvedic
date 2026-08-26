import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';
import { Badge } from './Badge';

export interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.header, { borderBottomColor: theme.colors.borderSubtle }]}>
      <View>
        <View style={styles.brandRow}>
          <Text style={[styles.brandTitle, { color: theme.colors.primary }]}>🌿 AMRUTAM</Text>
          <Badge label="Ayurveda" variant="gold" size="sm" style={styles.headerBadge} />
        </View>
        <Text style={[styles.brandSubtitle, { color: theme.colors.textSecondary }]}>
          Holistic Healthcare Super App
        </Text>
      </View>

      <View style={styles.headerActions}>
        {/* Dark / Light Toggle */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.iconBtn,
            {
              backgroundColor: theme.colors.surfaceSubtle,
              borderColor: theme.colors.border,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Toggle Dark/Light Mode"
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={18}
            color={isDark ? '#F4D03F' : theme.colors.primary}
          />
        </TouchableOpacity>

        {/* Settings Icon (Beside Dark Mode Icon) */}
        <TouchableOpacity
          onPress={onOpenSettings}
          style={[
            styles.iconBtn,
            {
              backgroundColor: theme.colors.surfaceSubtle,
              borderColor: theme.colors.border,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Open App Settings"
        >
          <Ionicons name="settings-outline" size={18} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerBadge: {
    marginLeft: 6,
  },
  brandSubtitle: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
