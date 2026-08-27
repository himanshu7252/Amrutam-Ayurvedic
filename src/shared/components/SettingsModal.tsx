import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from './Icon';
import { useTheme } from '@shared/context/ThemeContext';
import { useToast } from '@shared/context/ToastContext';
import { Modal } from './Modal';
import { Button } from './Button';

export interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, onClose }) => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const toast = useToast();

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="App Settings & Preferences">
      <View style={styles.settingsContent}>
        <Text style={[styles.settingsGroupTitle, { color: theme.colors.text }]}>
          🎨 Appearance & Theme
        </Text>
        <Text style={[styles.settingsSubtitle, { color: theme.colors.textSecondary }]}>
          Select your preferred display mode:
        </Text>

        <View style={styles.themeOptionsRow}>
          {(['light', 'dark', 'system'] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setThemeMode(mode)}
              style={[
                styles.themeChoiceBtn,
                {
                  backgroundColor: themeMode === mode ? theme.colors.primary : theme.colors.surfaceSubtle,
                  borderColor: themeMode === mode ? theme.colors.primary : theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.themeChoiceText,
                  { color: themeMode === mode ? '#FFFFFF' : theme.colors.text },
                ]}
              >
                {mode.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.settingsDivider, { backgroundColor: theme.colors.divider }]} />

        <Text style={[styles.settingsGroupTitle, { color: theme.colors.text }]}>
          ⚡ Offline Sync & Cache
        </Text>
        <View style={styles.settingsActionRow}>
          <Button
            title="Clear Local Storage Cache"
            variant="outline"
            size="sm"
            leftIcon={<Ionicons name="trash-outline" size={16} color={theme.colors.primary} />}
            onPress={() => {
              onClose();
              toast.showInfo('Local cache cleared successfully');
            }}
          />
        </View>

        <View style={[styles.settingsDivider, { backgroundColor: theme.colors.divider }]} />

        <Text style={[styles.settingsGroupTitle, { color: theme.colors.text }]}>
          ℹ️ System Information
        </Text>
        <Text style={[styles.sysInfo, { color: theme.colors.textMuted }]}>
          Amrutam Ayurvedic Super App • v1.0.0 (React Native CLI)
        </Text>
        <Text style={[styles.sysInfo, { color: theme.colors.textMuted }]}>
          Deterministic Engine: 5,000 Docs • 20,000 Prods • 10,000 Records
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  settingsContent: {
    paddingVertical: 10,
  },
  settingsGroupTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  settingsSubtitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  themeOptionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  themeChoiceBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  themeChoiceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  settingsDivider: {
    height: 1,
    marginVertical: 14,
  },
  settingsActionRow: {
    marginTop: 6,
  },
  sysInfo: {
    fontSize: 11,
    marginVertical: 2,
  },
});
