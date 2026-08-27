import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from './Icon';
import { useTheme } from '@shared/context/ThemeContext';

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'center' | 'bottomSheet';
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  variant = 'bottomSheet',
  style,
}) => {
  const { theme } = useTheme();

  const isCenter = variant === 'center';

  return (
    <RNModal
      visible={isVisible}
      transparent
      animationType={isCenter ? 'fade' : 'slide'}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                isCenter ? styles.centerContent : styles.bottomSheetContent,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.borderSubtle,
                  ...theme.shadows.modal,
                },
                style,
              ]}
              accessibilityViewIsModal
            >
              {/* Bottom Sheet Drag Indicator */}
              {!isCenter && (
                <View
                  style={[
                    styles.dragHandle,
                    { backgroundColor: theme.colors.border },
                  ]}
                />
              )}

              {/* Header */}
              {title || onClose ? (
                <View style={styles.header}>
                  <Text
                    style={[
                      styles.title,
                      theme.typography.h3,
                      { color: theme.colors.text },
                    ]}
                  >
                    {title}
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                    accessibilityRole="button"
                    accessibilityLabel="Close Modal"
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={26}
                      color={theme.colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              {/* Body */}
              <SafeAreaView style={styles.body}>{children}</SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    maxHeight: '85%',
  },
  centerContent: {
    marginHorizontal: 24,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  body: {
    width: '100%',
  },
});
