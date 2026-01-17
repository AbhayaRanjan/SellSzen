
export enum Category {
  PHONES = 'Phones & Tablets',
  LAPTOPS = 'Laptops & PCs',
  BIKES = 'Bikes & Scooters',
  ELECTRONICS = 'Electronics',
  BOOKS = 'Books',
  FASHION = 'Fashion'
}

export interface User {
  id: string;
  name: string;
  isVerified: boolean;
  rating: number;
  location: string;
  joinedDate: string;
  soldCount: number;
  avgResponseTime: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  seller: User;
  createdAt: string;
  isSold: boolean;
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
}

export interface AIPriceResponse {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  reasoning: string;
}
