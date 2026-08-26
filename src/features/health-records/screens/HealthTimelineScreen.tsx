import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { TextInput, EmptyState } from '@shared/components';
import { SAMPLE_HEALTH_RECORDS } from '@shared/services/sampleData';
import { HealthRecord } from '../types';
import { RecordTimelineCard } from '../components/RecordTimelineCard';
import { RecordDetailModal } from '../components/RecordDetailModal';

export const HealthTimelineScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_HEALTH_RECORDS;
    const q = searchQuery.toLowerCase();
    return SAMPLE_HEALTH_RECORDS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.doctorName?.toLowerCase().includes(q) ||
        r.notes.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const renderRecordItem = useCallback(
    ({ item }: { item: HealthRecord }) => (
      <RecordTimelineCard record={item} onPress={setSelectedRecord} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search 100+ Prescriptions, Lab Reports, Allergies..."
        isSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={[styles.listHeader, { color: theme.colors.text }]}>
        Patient Health Timeline ({filteredRecords.length} Records)
      </Text>

      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No Health Records Found"
          description={`No records match "${searchQuery}".`}
          actionTitle="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <FlatList
          data={filteredRecords}
          renderItem={renderRecordItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews
          scrollEnabled={false}
        />
      )}

      <RecordDetailModal
        isVisible={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
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
    marginVertical: 4,
  },
});
