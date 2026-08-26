import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { useToast } from '@shared/context/ToastContext';
import { EmptyState } from '@shared/components';
import { CartItem } from '../types';
import { CartItemRow } from '../components/CartItemRow';
import { CheckoutSummaryCard } from '../components/CheckoutSummaryCard';

export interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onNavigateToShop: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQuantity,
  onNavigateToShop,
}) => {
  const { theme } = useTheme();
  const toast = useToast();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountTotal = cart.reduce(
    (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 70;
  const total = subtotal + shipping;

  return (
    <View style={styles.container}>
      <Text style={[styles.listHeader, { color: theme.colors.text }]}>
        My Cart ({itemCount} items)
      </Text>

      {cart.length === 0 ? (
        <EmptyState
          title="Your Cart is Empty"
          description="Explore our range of authentic Ayurvedic medicines, herbal oils, and Rasayanas."
          actionTitle="Browse Shop"
          onAction={onNavigateToShop}
        />
      ) : (
        <>
          {cart.map((item) => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}

          <CheckoutSummaryCard
            subtotal={subtotal}
            discountTotal={discountTotal}
            shipping={shipping}
            total={total}
            onProceedCheckout={() =>
              toast.showSuccess(`Payment simulation of ₹${total} complete!`)
            }
          />
        </>
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
});
