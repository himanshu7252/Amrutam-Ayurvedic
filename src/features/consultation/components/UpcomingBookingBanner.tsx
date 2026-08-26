import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { Card, Badge } from '@shared/components';
import { ConsultationBooking } from '../types';

export interface UpcomingBookingBannerProps {
  booking: ConsultationBooking;
}

export const UpcomingBookingBanner: React.FC<UpcomingBookingBannerProps> = ({ booking }) => {
  const { theme } = useTheme();

  return (
    <Card variant="elevated" style={styles.upcomingBanner}>
      <View style={styles.upcomingHeader}>
        <Badge label="Upcoming Consultation" variant="success" icon="checkmark-circle" />
        <Text style={[styles.refText, { color: theme.colors.textMuted }]}>
          Ref: {booking.bookingReference}
        </Text>
      </View>
      <Text style={[styles.upcomingDoc, { color: theme.colors.text }]}>
        {booking.doctorName}
      </Text>
      <Text style={[styles.upcomingTime, { color: theme.colors.textSecondary }]}>
        📅 {booking.date} at {booking.time}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  upcomingBanner: {
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
    padding: 12,
    marginBottom: 10,
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refText: {
    fontSize: 11,
    fontWeight: '600',
  },
  upcomingDoc: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  upcomingTime: {
    fontSize: 12,
    marginTop: 2,
  },
});
