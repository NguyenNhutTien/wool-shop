// Product types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  tags: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  address?: string;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  customer: Customer;
  note?: string;
  status: 'new' | 'confirmed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  items: OrderItem[];
  customer: Customer;
  note?: string;
}

// Contact types
export interface Contact {
  _id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactInput {
  name: string;
  phone: string;
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Query types
export interface ProductQuery {
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Form validation types
export interface FormErrors {
  [key: string]: string;
}
