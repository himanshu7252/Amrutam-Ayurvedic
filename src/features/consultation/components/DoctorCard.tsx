import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { Card, Avatar, Badge, Button, Ionicons } from '@shared/components';
import { Doctor } from '../types';

export interface DoctorCardProps {
  doctor: Doctor;
  onBookPress: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookPress }) => {
  const { theme } = useTheme();

  return (
    <Card variant="elevated" style={styles.doctorCard}>
      <View style={styles.doctorRow}>
        <Avatar
          name={doctor.name}
          size="lg"
          isOnline={doctor.isAvailableToday}
          source={doctor.avatarUrl}
        />
        <View style={styles.docInfo}>
          <Text style={[styles.docName, { color: theme.colors.text }]}>{doctor.name}</Text>
          <Text style={[styles.docSpec, { color: theme.colors.textSecondary }]}>
            {doctor.specialization}
          </Text>
          <View style={styles.docMeta}>
            <Badge
              label={`${doctor.rating} ★ (${doctor.reviewCount})`}
              variant="gold"
              size="sm"
              icon="star"
            />
            <Text style={[styles.docExp, { color: theme.colors.textMuted }]}>
              {doctor.experienceYears} Yrs Exp
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.docDivider, { backgroundColor: theme.colors.divider }]} />

      <View style={styles.docFooter}>
        <View>
          <Text style={[styles.feeLabel, { color: theme.colors.textMuted }]}>
            Consultation Fee
          </Text>
          <Text style={[styles.feeAmount, { color: theme.colors.primary }]}>
            ₹{doctor.consultationFee}
          </Text>
        </View>

        <Button
          title="Book Slot"
          size="sm"
          variant="primary"
          leftIcon={<Ionicons name="calendar-outline" size={14} color="#FFFFFF" />}
          onPress={() => onBookPress(doctor)}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  doctorCard: {
    padding: 14,
    marginBottom: 10,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
  },
  docSpec: {
    fontSize: 12,
    marginTop: 2,
  },
  docMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  docExp: {
    fontSize: 11,
  },
  docDivider: {
    height: 1,
    marginVertical: 12,
  },
  docFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feeLabel: {
    fontSize: 11,
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: '800',
  },
});
