import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shared/context/ThemeContext';
import { Card, Badge } from '@shared/components';
import { HealthRecord } from '../types';

export interface RecordTimelineCardProps {
  record: HealthRecord;
  onPress: (record: HealthRecord) => void;
}

export const RecordTimelineCard: React.FC<RecordTimelineCardProps> = ({ record, onPress }) => {
  const { theme } = useTheme();

  return (
    <Card
      variant="elevated"
      isPressable
      onPress={() => onPress(record)}
      style={styles.recordCard}
    >
      <View style={styles.recordHeader}>
        <Badge
          label={record.type}
          variant={
            record.type === 'Prescription'
              ? 'success'
              : record.type === 'Lab Report'
              ? 'info'
              : 'warning'
          }
          icon="document-text"
        />
        <Text style={[styles.recordDate, { color: theme.colors.textMuted }]}>
          📅 {record.date}
        </Text>
      </View>

      <Text style={[styles.recordTitle, { color: theme.colors.text }]}>{record.title}</Text>
      <Text style={[styles.recordDoctor, { color: theme.colors.textSecondary }]}>
        {record.doctorName} • {record.facilityName}
      </Text>

      {record.attachments.length > 0 && (
        <View
          style={[styles.attachmentRow, { backgroundColor: theme.colors.surfaceSubtle }]}
        >
          <Ionicons name="attach-outline" size={16} color={theme.colors.primary} />
          <Text style={[styles.attachmentText, { color: theme.colors.primary }]}>
            {record.attachments[0].fileName} ({record.attachments[0].fileSizeFormatted})
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  recordCard: {
    padding: 14,
    marginBottom: 8,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  recordDate: {
    fontSize: 11,
    fontWeight: '500',
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  recordDoctor: {
    fontSize: 12,
    marginTop: 2,
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    gap: 6,
  },
  attachmentText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
