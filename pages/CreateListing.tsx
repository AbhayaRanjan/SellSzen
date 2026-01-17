
import React, { useState } from 'react';
import { Camera, Sparkles, ChevronLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { Category } from '../types';
import { getAIPriceSuggestion, moderateListingContent } from '../services/geminiService';

export const CreateListing: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: 'Used - Good',
    price: ''
  });
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  const [moderationResult, setModerationResult] = useState<any>(null);

  const handleAIHelp = async () => {
    if (!formData.title || !formData.category) return;
    setIsLoading(true);
    const suggestion = await getAIPriceSuggestion(
      formData.title,
      formData.description,
      formData.category,
      formData.condition
    );
    setAiSuggestion(suggestion);
    
    const mod = await moderateListingContent(formData.title + ' ' + formData.description);
    setModerationResult(mod);
    
    if (suggestion) {
      setFormData(prev => ({ ...prev, price: suggestion.suggestedPrice.toString() }));
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 pb-32 animate-in slide-in-from-bottom duration-500">
      <header className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Post an Ad</h1>
          <p className="text-slate-500 text-sm">Create a listing in under 30 seconds</p>
        </div>
      </header>

      <div className="space-y-6">
        {/* Photo Upload Placeholder */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Photos (Up to 10)</label>
          <div className="grid grid-cols-3 gap-4">
            <button className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all">
              <Camera size={32} />
              <span className="text-xs font-semibold mt-2">Add Photos</span>
            </button>
            {[1, 2].map(i => (
              <div key={i} className="aspect-square bg-slate-100 rounded-2xl"></div>
            ))}
          </div>
        </section>

        {/* Basic Details */}
        <section className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Ad Title</label>
            <input 
              type="text" 
              placeholder="e.g. iPhone 15 Pro Max 256GB"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.title}
              // Fixed: Corrected state update functional pattern
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <select 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none"
                value={formData.category}
                // Fixed: Corrected state update functional pattern
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select Category</option>
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Condition</label>
              <select 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none"
                value={formData.condition}
                // Fixed: Corrected state update functional pattern
                onChange={e => setFormData(prev => ({ ...prev, condition: e.target.value }))}
              >
                <option>New</option>
                <option>Used - Like New</option>
                <option>Used - Good</option>
                <option>Used - Fair</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea 
              rows={4}
              placeholder="Tell buyers about usage history, flaws, or why you are selling..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={formData.description}
              // Fixed: Corrected state update functional pattern
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </section>

        {/* Pricing Section with AI */}
        <section className="space-y-4 bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-indigo-600">
              <Sparkles size={18} fill="currentColor" />
              <span className="font-bold">Smart Pricing</span>
            </div>
            <button 
              onClick={handleAIHelp}
              disabled={isLoading || !formData.title || !formData.category}
              className="px-4 py-1.5 bg-white text-indigo-600 rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Get AI Suggestion"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Listing Price (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input 
                type="number" 
                placeholder="Set your price"
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"
                value={formData.price}
                // Fixed: Corrected state update functional pattern
                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>

          {aiSuggestion && (
            <div className="p-4 bg-white/60 rounded-2xl text-xs space-y-2">
              <p className="text-slate-600 italic">"{aiSuggestion.reasoning}"</p>
              <div className="flex justify-between font-bold text-indigo-600">
                <span>Fair Range: ₹{aiSuggestion.minPrice.toLocaleString()} - ₹{aiSuggestion.maxPrice.toLocaleString()}</span>
              </div>
            </div>
          )}

          {moderationResult && !moderationResult.isSafe && (
            <div className="p-3 bg-red-100 text-red-700 rounded-xl text-xs font-bold">
              Warning: {moderationResult.reason || "Content flagged for review."}
            </div>
          )}
        </section>

        {/* Footer Actions */}
        <section className="flex flex-col space-y-4 pt-4">
          <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            <ShieldCheck size={20} />
            <span className="text-xs font-medium">Your listing will be verified by SellSzen AI automatically.</span>
          </div>
          <button 
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
            onClick={() => alert('Listing Published! Verification in progress.')}
          >
            Publish Ad
          </button>
        </section>
      </div>
    </div>
  );
};
