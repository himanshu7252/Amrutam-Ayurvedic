import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';
import { useToast } from '@shared/context/ToastContext';
import { Modal, Badge, Button } from '@shared/components';
import { HealthRecord } from '../types';

export interface RecordDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  record: HealthRecord | null;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  isVisible,
  onClose,
  record,
}) => {
  const { theme } = useTheme();
  const toast = useToast();

  if (!record) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Record Details">
      <View style={styles.recordModalContent}>
        <Badge label={record.type} variant="success" size="md" />
        <Text style={[styles.recModalTitle, { color: theme.colors.text }]}>
          {record.title}
        </Text>
        <Text style={[styles.recModalDoc, { color: theme.colors.textSecondary }]}>
          Attending Vaidya: {record.doctorName}
        </Text>
        <Text style={[styles.recModalNotes, { color: theme.colors.text }]}>
          {record.notes}
        </Text>

        {record.prescribedMedicines && (
          <View style={styles.prescBox}>
            <Text style={[styles.prescTitle, { color: theme.colors.primary }]}>
              🌿 Prescribed Ayurvedic Medicines:
            </Text>
            {record.prescribedMedicines.map((med, idx) => (
              <Text key={idx} style={[styles.prescItem, { color: theme.colors.text }]}>
                • {med}
              </Text>
            ))}
          </View>
        )}

        <Button
          title="Download Attachment PDF"
          variant="outline"
          size="md"
          leftIcon={<Ionicons name="download-outline" size={16} color={theme.colors.primary} />}
          onPress={() => {
            onClose();
            toast.showSuccess('Attachment downloaded to device storage');
          }}
          style={{ marginTop: 16 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  recordModalContent: {
    paddingVertical: 8,
  },
  recModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  recModalDoc: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  recModalNotes: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  prescBox: {
    backgroundColor: '#F0F7EE',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  prescTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  prescItem: {
    fontSize: 12,
    marginVertical: 2,
  },
});
