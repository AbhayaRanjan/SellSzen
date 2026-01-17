
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Feed } from './pages/Feed';
import { CreateListing } from './pages/CreateListing';
import { ProductDetails } from './pages/ProductDetails';
import { Product } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedProduct(null);
  };

  const renderContent = () => {
    if (selectedProduct) {
      return <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    }

    switch (activeTab) {
      case 'feed':
        return <Feed onSelectProduct={setSelectedProduct} />;
      case 'sell':
        return <CreateListing onBack={() => setActiveTab('feed')} />;
      case 'messages':
        return (
          <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="p-6 bg-slate-100 rounded-full text-slate-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">No active chats</h2>
            <p className="text-slate-500 max-w-xs">Once you start a conversation with a seller or buyer, it will appear here.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">V</div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Varun Gupta</h1>
                <p className="text-slate-500">Student @ IIT Bangalore</p>
                <div className="flex items-center space-x-2 mt-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 w-fit">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span>KYC Verified</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 p-6 rounded-3xl text-center space-y-1 shadow-sm">
                <div className="text-2xl font-extrabold text-slate-900">12</div>
                <div className="text-xs text-slate-400 font-medium uppercase">Listings</div>
              </div>
              <div className="bg-white border border-slate-100 p-6 rounded-3xl text-center space-y-1 shadow-sm">
                <div className="text-2xl font-extrabold text-slate-900">4.9</div>
                <div className="text-xs text-slate-400 font-medium uppercase">Rating</div>
              </div>
            </div>

            <section className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Settings</h3>
              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden divide-y divide-slate-50">
                {['Account Information', 'Transaction History', 'My Listings', 'KYC & Verification', 'Help & Support'].map((item) => (
                  <button key={item} className="w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors font-semibold text-slate-700 flex justify-between items-center">
                    <span>{item}</span>
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                ))}
              </div>
            </section>
          </div>
        );
      default:
        return <Feed onSelectProduct={setSelectedProduct} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </Layout>
  );
};

export default App;
