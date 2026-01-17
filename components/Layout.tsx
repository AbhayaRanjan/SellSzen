
import React from 'react';
import { 
  Search, 
  PlusSquare, 
  MessageSquare, 
  User, 
  MapPin, 
  Bell, 
  ShieldCheck,
  Zap,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const NavItem = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button 
      onClick={() => {
        onTabChange(id);
        setIsMenuOpen(false);
      }}
      className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
        activeTab === id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <Icon size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto shadow-2xl bg-white lg:rounded-3xl lg:my-4">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-100 px-4 py-3 lg:px-8 flex items-center justify-between lg:rounded-t-3xl">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onTabChange('feed')}>
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Zap className="text-white" size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">SellSzen</span>
        </div>

        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search gadgets, bikes, and more..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <MapPin size={16} className="text-indigo-500" />
            <span className="font-medium">Bangalore, IN</span>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
        <NavItem id="feed" icon={Zap} label="Explore" />
        <NavItem id="messages" icon={MessageSquare} label="Chats" />
        <div className="relative -top-6">
          <button 
            onClick={() => onTabChange('sell')}
            className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            <PlusSquare size={28} />
          </button>
        </div>
        <NavItem id="notifications" icon={Bell} label="Alerts" />
        <NavItem id="profile" icon={User} label="Profile" />
      </nav>

      {/* Desktop Navigation (Floating or Side) - Simplified for MVP UX */}
      <div className="hidden md:flex flex-col items-center fixed right-10 bottom-10 space-y-4">
         <button 
            onClick={() => onTabChange('sell')}
            className="flex items-center space-x-2 px-6 py-4 bg-indigo-600 rounded-2xl text-white font-bold shadow-xl hover:scale-105 transition-transform"
          >
            <PlusSquare size={24} />
            <span>Post Ad</span>
          </button>
      </div>

      {/* Safety Badge Floating */}
      <div className="hidden lg:flex fixed left-10 bottom-10 items-center space-x-3 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-2xl border border-emerald-100">
        <ShieldCheck size={20} className="text-emerald-500" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider">Verified Only</p>
          <p className="text-[10px] opacity-80">All users KYC checked</p>
        </div>
      </div>
    </div>
  );
};
