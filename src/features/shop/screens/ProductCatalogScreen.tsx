import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { TextInput, EmptyState } from '@shared/components';
import { SAMPLE_PRODUCTS } from '@shared/services/sampleData';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export interface ProductCatalogScreenProps {
  onAddToCart: (product: Product) => void;
}

export const ProductCatalogScreen: React.FC<ProductCatalogScreenProps> = ({ onAddToCart }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_PRODUCTS;
    const q = searchQuery.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onAddToCart={onAddToCart} />
    ),
    [onAddToCart]
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search 120+ Ayurvedic Formulations..."
        isSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={[styles.listHeader, { color: theme.colors.text }]}>
        Ayurvedic Formulations ({filteredProducts.length})
      </Text>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No Formulations Found"
          description={`No products match "${searchQuery}".`}
          actionTitle="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews
          scrollEnabled={false}
        />
      )}
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
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
  },
});
