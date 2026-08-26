import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { useToast } from '@shared/context/ToastContext';
import { TextInput, EmptyState } from '@shared/components';
import { SAMPLE_DOCTORS, generateDoctorSlots } from '@shared/services/sampleData';
import { Doctor, TimeSlot, ConsultationBooking } from '../types';
import { DoctorCard } from '../components/DoctorCard';
import { SlotPickerModal } from '../components/SlotPickerModal';
import { UpcomingBookingBanner } from '../components/UpcomingBookingBanner';

export const DoctorListScreen: React.FC = () => {
  const { theme } = useTheme();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookedConsultations, setBookedConsultations] = useState<ConsultationBooking[]>([]);

  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_DOCTORS;
    const q = searchQuery.toLowerCase();
    return SAMPLE_DOCTORS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q) ||
        d.ayurvedaCategory.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenBooking = useCallback((doc: Doctor) => {
    setSelectedDoctor(doc);
    setSlots(generateDoctorSlots(doc.id));
    setSelectedSlot(null);
    setIsModalOpen(true);
  }, []);

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedSlot) {
      toast.showWarning('Please select an available consultation slot');
      return;
    }

    if (selectedSlot.isBooked) {
      toast.showError('Slot conflict: This slot was just booked by another patient.');
      return;
    }

    const newBooking: ConsultationBooking = {
      id: `book_${Date.now()}`,
      bookingReference: `AMR-${Math.floor(100000 + Math.random() * 900000)}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialization: selectedDoctor.specialization,
      doctorAvatarUrl: selectedDoctor.avatarUrl,
      slotId: selectedSlot.id,
      date: selectedSlot.date,
      time: selectedSlot.time,
      slotTimestamp: selectedSlot.timestamp,
      feePaid: selectedDoctor.consultationFee,
      status: 'upcoming',
      syncStatus: 'synced',
      createdAt: new Date().toISOString(),
    };

    setBookedConsultations((prev) => [newBooking, ...prev]);
    setIsModalOpen(false);
    toast.showSuccess(`Consultation booked with ${selectedDoctor.name} for ${selectedSlot.time}!`, {
      title: 'Booking Confirmed',
    });
  };

  const renderDoctorItem = useCallback(
    ({ item }: { item: Doctor }) => (
      <DoctorCard doctor={item} onBookPress={handleOpenBooking} />
    ),
    [handleOpenBooking]
  );

  return (
    <View style={styles.container}>
      {bookedConsultations.length > 0 && (
        <UpcomingBookingBanner booking={bookedConsultations[0]} />
      )}

      <TextInput
        placeholder="Search 120+ Ayurvedic Vaidyas..."
        isSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={[styles.listHeader, { color: theme.colors.text }]}>
        Verified Ayurvedic Vaidyas ({filteredDoctors.length})
      </Text>

      {filteredDoctors.length === 0 ? (
        <EmptyState
          title="No Vaidyas Found"
          description={`No doctors match "${searchQuery}". Try searching for Panchakarma, Women Health, or General Ayurveda.`}
          actionTitle="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <FlatList
          data={filteredDoctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews
          scrollEnabled={false} // Managed by MainLayout outer ScrollView
        />
      )}

      <SlotPickerModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
        slots={slots}
        selectedSlot={selectedSlot}
        onSelectSlot={setSelectedSlot}
        onConfirm={handleConfirmBooking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: '800',
    marginVertical: 6,
  },
});
