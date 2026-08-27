import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shared/context/ThemeContext';
import { useToast } from '@shared/context/ToastContext';
import { Header, SettingsModal, Ionicons } from '@shared/components';
import { DoctorListScreen } from '@features/consultation/screens/DoctorListScreen';
import { ProductCatalogScreen } from '@features/shop/screens/ProductCatalogScreen';
import { CartScreen } from '@features/shop/screens/CartScreen';
import { HealthTimelineScreen } from '@features/health-records/screens/HealthTimelineScreen';
import { SAMPLE_PRODUCTS } from '@shared/services/sampleData';
import { Product, CartItem } from '@features/shop/types';

export type MainTab = 'consultation' | 'shop' | 'health-records' | 'cart';

export const MainLayout: React.FC = () => {
  const { theme, isDark } = useTheme();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<MainTab>('consultation');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([
    { product: SAMPLE_PRODUCTS[0], quantity: 1, addedAt: Date.now() },
  ]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, addedAt: Date.now() }];
    });
    toast.showSuccess(`Added "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Top Header with Dark Mode & Settings Icon */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Super App Feature Tabs */}
      <View style={[styles.navTabs, { backgroundColor: theme.colors.surfaceSubtle }]}>
        <TouchableOpacity
          onPress={() => setActiveTab('consultation')}
          style={[styles.navTabItem, activeTab === 'consultation' && styles.activeNavTab]}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'consultation' }}
        >
          <Ionicons
            name="medkit-outline"
            size={16}
            color={activeTab === 'consultation' ? theme.colors.primary : theme.colors.textMuted}
          />
          <Text
            style={[
              styles.navTabText,
              {
                color: activeTab === 'consultation' ? theme.colors.primary : theme.colors.textMuted,
                fontWeight: activeTab === 'consultation' ? '700' : '500',
              },
            ]}
          >
            Consultation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('shop')}
          style={[styles.navTabItem, activeTab === 'shop' && styles.activeNavTab]}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'shop' }}
        >
          <Ionicons
            name="bag-handle-outline"
            size={16}
            color={activeTab === 'shop' ? theme.colors.primary : theme.colors.textMuted}
          />
          <Text
            style={[
              styles.navTabText,
              {
                color: activeTab === 'shop' ? theme.colors.primary : theme.colors.textMuted,
                fontWeight: activeTab === 'shop' ? '700' : '500',
              },
            ]}
          >
            Shop
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('health-records')}
          style={[styles.navTabItem, activeTab === 'health-records' && styles.activeNavTab]}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'health-records' }}
        >
          <Ionicons
            name="document-text-outline"
            size={16}
            color={activeTab === 'health-records' ? theme.colors.primary : theme.colors.textMuted}
          />
          <Text
            style={[
              styles.navTabText,
              {
                color: activeTab === 'health-records' ? theme.colors.primary : theme.colors.textMuted,
                fontWeight: activeTab === 'health-records' ? '700' : '500',
              },
            ]}
          >
            Records
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('cart')}
          style={[styles.navTabItem, activeTab === 'cart' && styles.activeNavTab]}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'cart' }}
        >
          <View style={styles.cartIconWrapper}>
            <Ionicons
              name="cart-outline"
              size={16}
              color={activeTab === 'cart' ? theme.colors.primary : theme.colors.textMuted}
            />
            {totalCartCount > 0 && (
              <View style={[styles.cartBadge, { backgroundColor: theme.colors.error }]}>
                <Text style={styles.cartBadgeText}>{totalCartCount}</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.navTabText,
              {
                color: activeTab === 'cart' ? theme.colors.primary : theme.colors.textMuted,
                fontWeight: activeTab === 'cart' ? '700' : '500',
              },
            ]}
          >
            Cart
          </Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'consultation' && <DoctorListScreen />}
        {activeTab === 'shop' && <ProductCatalogScreen onAddToCart={handleAddToCart} />}
        {activeTab === 'health-records' && <HealthTimelineScreen />}
        {activeTab === 'cart' && (
          <CartScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onNavigateToShop={() => setActiveTab('shop')}
          />
        )}
      </ScrollView>

      {/* App Settings Modal */}
      <SettingsModal
        isVisible={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navTabs: {
    flexDirection: 'row',
    padding: 4,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
  },
  navTabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  activeNavTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  navTabText: {
    fontSize: 11,
  },
  cartIconWrapper: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
});
