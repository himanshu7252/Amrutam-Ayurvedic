import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons, Card, Badge, Button } from '@shared/components';
import { Product } from '../types';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { theme } = useTheme();

  return (
    <Card variant="elevated" style={styles.productCard}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Badge
        label={`-${product.discountPercentage}% OFF`}
        variant="error"
        size="sm"
        style={styles.discountBadge}
      />
      <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={[styles.productCategory, { color: theme.colors.textMuted }]}>
        {product.category}
      </Text>

      <View style={styles.productPriceRow}>
        <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
          ₹{product.price}
        </Text>
        <Text style={[styles.originalPrice, { color: theme.colors.textMuted }]}>
          ₹{product.originalPrice}
        </Text>
      </View>

      <Button
        title="Add to Cart"
        size="sm"
        variant="outline"
        leftIcon={<Ionicons name="cart-outline" size={14} color={theme.colors.primary} />}
        onPress={() => onAddToCart(product)}
        style={styles.addCartBtn}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    padding: 10,
    position: 'relative',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    minHeight: 34,
  },
  productCategory: {
    fontSize: 11,
    marginTop: 2,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 6,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  addCartBtn: {
    marginTop: 4,
  },
});
