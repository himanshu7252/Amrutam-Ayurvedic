import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { Modal, Avatar, Button } from '@shared/components';
import { Doctor, TimeSlot } from '../types';

export interface SlotPickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  onConfirm: () => void;
}

export const SlotPickerModal: React.FC<SlotPickerModalProps> = ({
  isVisible,
  onClose,
  doctor,
  slots,
  selectedSlot,
  onSelectSlot,
  onConfirm,
}) => {
  const { theme } = useTheme();

  if (!doctor) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Select Consultation Slot">
      <View style={styles.bookingModalContent}>
        <View style={styles.bookingDocHeader}>
          <Avatar name={doctor.name} size="md" source={doctor.avatarUrl} />
          <View style={styles.bookingDocMeta}>
            <Text style={[styles.bookingDocName, { color: theme.colors.text }]}>
              {doctor.name}
            </Text>
            <Text style={[styles.bookingDocSpec, { color: theme.colors.textSecondary }]}>
              {doctor.specialization} • ₹{doctor.consultationFee}
            </Text>
          </View>
        </View>

        <Text style={[styles.slotSectionTitle, { color: theme.colors.text }]}>
          Available Time Slots:
        </Text>

        <View style={styles.slotGrid}>
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            return (
              <TouchableOpacity
                key={slot.id}
                onPress={() => onSelectSlot(slot)}
                disabled={slot.isBooked}
                style={[
                  styles.slotChip,
                  {
                    backgroundColor: slot.isBooked
                      ? theme.colors.surfaceSubtle
                      : isSelected
                      ? theme.colors.primary
                      : theme.colors.surface,
                    borderColor: slot.isBooked
                      ? theme.colors.borderSubtle
                      : isSelected
                      ? theme.colors.primary
                      : theme.colors.border,
                    opacity: slot.isBooked ? 0.4 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.slotTimeText,
                    {
                      color: isSelected
                        ? '#FFFFFF'
                        : slot.isBooked
                        ? theme.colors.textMuted
                        : theme.colors.text,
                    },
                  ]}
                >
                  {slot.time}
                </Text>
                {slot.isBooked ? (
                  <Text style={[styles.bookedText, { color: theme.colors.error }]}>Booked</Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title={`Confirm Appointment (₹${doctor.consultationFee})`}
          size="lg"
          variant="primary"
          onPress={onConfirm}
          style={styles.confirmSlotBtn}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bookingModalContent: {
    paddingVertical: 10,
  },
  bookingDocHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  bookingDocMeta: {
    flex: 1,
  },
  bookingDocName: {
    fontSize: 16,
    fontWeight: '700',
  },
  bookingDocSpec: {
    fontSize: 12,
    marginTop: 2,
  },
  slotSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  slotChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: '29%',
    alignItems: 'center',
  },
  slotTimeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookedText: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  confirmSlotBtn: {
    marginTop: 8,
  },
});
