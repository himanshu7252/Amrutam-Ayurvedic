import { BaseEntity } from '@shared/types';

export type ProductCategory =
  | 'Chyawanprash & Rasayana'
  | 'Herbal Oils & Ghee'
  | 'Digestive Care & Churnas'
  | 'Skin & Hair Wellness'
  | 'Immunity & Vitality'
  | 'Stress & Sleep Support'
  | 'Joint & Pain Relief';

export interface Product extends BaseEntity {
  name: string;
  sku: string;
  category: ProductCategory;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  inStock: boolean;
  stockQuantity: number;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  dosage: string;
  volumeOrWeight: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: number;
}

export type ProductSortOption =
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'newest'
  | 'popularity';

export interface ProductFilterCriteria {
  search?: string;
  category?: ProductCategory | 'All';
  brand?: string | 'All';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  sortBy?: ProductSortOption;
}

export interface CartSummary {
  subtotal: number;
  discountTotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}
