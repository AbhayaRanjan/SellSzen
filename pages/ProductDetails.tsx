
import React from 'react';
import { Product } from '../types';
import { 
  ChevronLeft, 
  Share2, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  MessageCircle, 
  Star, 
  Info, 
  Phone, 
  User, 
  ShoppingBag, 
  Clock 
} from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-10 duration-500 pb-32">
      {/* Media Gallery */}
      <div className="relative aspect-[4/3] md:aspect-[16/6] bg-slate-100">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button onClick={onBack} className="p-2.5 glass-effect rounded-full shadow-lg text-slate-900">
            <ChevronLeft size={24} />
          </button>
          <div className="flex space-x-2">
            <button className="p-2.5 glass-effect rounded-full shadow-lg text-slate-900">
              <Share2 size={20} />
            </button>
            <button className="p-2.5 glass-effect rounded-full shadow-lg text-slate-900">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                  {product.condition}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">{product.title}</h1>
              <div className="flex items-center space-x-4 text-slate-500 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{product.seller.location}, Bangalore</span>
                </div>
                <span>•</span>
                <span>Posted {product.createdAt}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-extrabold text-indigo-600">₹{product.price.toLocaleString()}</div>
              <p className="text-slate-400 text-xs mt-1">Negotiable via Chat</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
            {/* Left: Description */}
            <div className="md:col-span-2 space-y-6">
              <section className="space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                  <span>Product Description</span>
                  <Info size={16} className="text-slate-400" />
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {product.description}
                </p>
              </section>

              {/* Safety Tips */}
              <section className="bg-amber-50 p-6 rounded-3xl border border-amber-100 space-y-3">
                <h4 className="font-bold text-amber-800 text-sm flex items-center space-x-2">
                  <ShieldCheck size={18} />
                  <span>Stay Safe on SellSzen</span>
                </h4>
                <ul className="text-xs text-amber-700 space-y-2 list-disc pl-4">
                  <li>Meet the seller in a public place.</li>
                  <li>Check the item thoroughly before finalizing.</li>
                  <li>Use SellSzen Escrow for the safest transaction.</li>
                  <li>Never pay any "security deposit" upfront.</li>
                </ul>
              </section>
            </div>

            {/* Right: Seller Profile */}
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-100">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h4 className="font-bold text-slate-900">{product.seller.name}</h4>
                      {product.seller.isVerified && <ShieldCheck size={16} className="text-emerald-500" fill="currentColor" />}
                    </div>
                    <p className="text-xs text-slate-500">Seller since