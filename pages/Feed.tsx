
import React from 'react';
import { Category, Product } from '../types';
import { Star, Shield, MapPin, Clock } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro - Blue Titanium',
    description: 'Perfect condition, 128GB. Includes bill and box.',
    price: 82000,
    category: Category.PHONES,
    images: ['https://picsum.photos/id/160/600/400'],
    seller: { 
      id: 'u1', 
      name: 'Arjun K.', 
      isVerified: true, 
      rating: 4.8, 
      location: 'Indiranagar', 
      joinedDate: '2023',
      soldCount: 14,
      avgResponseTime: 'under 1 hour'
    },
    createdAt: '2 hours ago',
    isSold: false,
    condition: 'Used - Like New'
  },
  {
    id: '2',
    title: 'Royal Enfield Hunter 350',
    description: 'Dapper Grey, 4500km driven only. 1st service done.',
    price: 145000,
    category: Category.BIKES,
    images: ['https://picsum.photos/id/211/600/400'],
    seller: { 
      id: 'u2', 
      name: 'Sahil M.', 
      isVerified: true, 
      rating: 4.5, 
      location: 'Koramangala', 
      joinedDate: '2022',
      soldCount: 5,
      avgResponseTime: '3 hours'
    },
    createdAt: '5 hours ago',
    isSold: false,
    condition: 'Used - Good'
  },
  {
    id: '3',
    title: 'MacBook Air M2 13"',
    description: 'Silver, 8GB/256GB. Warranty till Dec 2024.',
    price: 78000,
    category: Category.LAPTOPS,
    images: ['https://picsum.photos/id/119/600/400'],
    seller: { 
      id: 'u3', 
      name: 'Priya R.', 
      isVerified: false, 
      rating: 4.9, 
      location: 'Whitefield', 
      joinedDate: '2024',
      soldCount: 2,
      avgResponseTime: 'under 30 mins'
    },
    createdAt: '1 day ago',
    isSold: false,
    condition: 'Used - Like New'
  },
  {
    id: '4',
    title: 'Sony WH-1000XM5',
    description: 'Industry leading noise cancellation. Barely used.',
    price: 22000,
    category: Category.ELECTRONICS,
    images: ['https://picsum.photos/id/2/600/400'],
    seller: { 
      id: 'u4', 
      name: 'Nikhil S.', 
      isVerified: true, 
      rating: 4.2, 
      location: 'HSR Layout', 
      joinedDate: '2023',
      soldCount: 8,
      avgResponseTime: '2 hours'
    },
    createdAt: '3 hours ago',
    isSold: false,
    condition: 'Used - Good'
  }
];

export const Feed: React.FC<{ onSelectProduct: (p: Product) => void }> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const categories = ['All', ...Object.values(Category)];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white">
        <div className="relative z-10 space-y-4 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            The Safest Local <br /><span className="text-indigo-200">Marketplace in India.</span>
          </h1>
          <p className="text-indigo-100 text-lg opacity-90">
            Every seller is KYC verified. Every deal is protected by Escrow. Smart AI pricing helps you sell faster.
          </p>
          <div className="flex space-x-4 pt-4">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
              <Shield size={18} className="text-emerald-400" />
              <span className="text-sm font-medium">100% Secure</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
              <Star size={18} className="text-amber-400" />
              <span className="text-sm font-medium">Top Rated</span>
            </div>
          </div>
        </div>
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* Category Filter */}
      <section className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="flex space-x-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory).map((product) => (
          <div 
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-sm">
                ₹{product.price.toLocaleString()}
              </div>
              {product.seller.isVerified && (
                <div className="absolute top-3 left-3 bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg">
                  <Shield size={16} />
                </div>
              )}
            </div>
            
            <div className="p-4 flex-1 flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {product.title}
                </h3>
              </div>
              
              <div className="flex items-center text-xs text-slate-400 space-x-4">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{product.seller.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{product.createdAt}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{product.seller.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-medium text-slate-400">{product.seller.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  {product.condition}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
