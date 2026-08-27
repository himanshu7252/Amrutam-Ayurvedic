import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';
import { Card, Button, Ionicons } from '@shared/components';

export interface CheckoutSummaryProps {
  subtotal: number;
  discountTotal: number;
  shipping: number;
  total: number;
  onProceedCheckout: () => void;
}

export const CheckoutSummaryCard: React.FC<CheckoutSummaryProps> = ({
  subtotal,
  discountTotal,
  shipping,
  total,
  onProceedCheckout,
}) => {
  const { theme } = useTheme();

  return (
    <Card variant="elevated" style={styles.summaryCard}>
      <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Checkout Summary</Text>

      <View style={styles.summaryRow}>
        <Text style={{ color: theme.colors.textSecondary }}>Subtotal</Text>
        <Text style={{ color: theme.colors.text, fontWeight: '600' }}>₹{subtotal}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={{ color: theme.colors.textSecondary }}>Total Discounts</Text>
        <Text style={{ color: theme.colors.success, fontWeight: '600' }}>-₹{discountTotal}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={{ color: theme.colors.textSecondary }}>Shipping Fee</Text>
        <Text style={{ color: theme.colors.text, fontWeight: '600' }}>
          {shipping === 0 ? 'FREE' : `₹${shipping}`}
        </Text>
      </View>

      <View style={[styles.summaryDivider, { backgroundColor: theme.colors.divider }]} />

      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total Amount</Text>
        <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>₹{total}</Text>
      </View>

      <Button
        title="Proceed to Payment"
        size="lg"
        variant="primary"
        leftIcon={<Ionicons name="shield-checkmark-outline" size={18} color="#FFFFFF" />}
        style={styles.checkoutBtn}
        onPress={onProceedCheckout}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    padding: 16,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryDivider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '900',
  },
  checkoutBtn: {
    marginTop: 16,
  },
});
