import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { Card, Ionicons } from '@shared/components';
import { CartItem } from '../types';

export interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQuantity }) => {
  const { theme } = useTheme();

  return (
    <Card variant="elevated" style={styles.cartItemCard}>
      <View style={styles.cartItemRow}>
        <Image source={{ uri: item.product.imageUrl }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={[styles.cartItemTitle, { color: theme.colors.text }]}>
            {item.product.name}
          </Text>
          <Text style={[styles.cartItemPrice, { color: theme.colors.primary }]}>
            ₹{item.product.price}
          </Text>

          {/* Quantity Counter */}
          <View style={styles.counterRow}>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.product.id, -1)}
              style={[styles.counterBtn, { borderColor: theme.colors.border }]}
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
            >
              <Ionicons name="remove" size={14} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.counterVal, { color: theme.colors.text }]}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.product.id, 1)}
              style={[styles.counterBtn, { borderColor: theme.colors.border }]}
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
            >
              <Ionicons name="add" size={14} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cartItemCard: {
    padding: 12,
    marginBottom: 8,
  },
  cartItemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cartItemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '800',
    marginVertical: 4,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  counterBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterVal: {
    fontSize: 13,
    fontWeight: '700',
  },
});
