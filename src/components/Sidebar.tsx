import { 
  Home, 
  Droplet, 
  Building2, 
  Megaphone, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut
} from 'lucide-react';
import logo from 'figma:asset/2b873b7a4e58ed40d540d82b4af77defc36ae5c8.png';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Home, color: 'text-green-500' },
    { id: 'inventory', label: 'Blood Inventory', icon: Droplet, color: 'text-red-500' },
    { id: 'hospitals', label: 'Hospitals & Requests', icon: Building2, color: 'text-purple-500' },
    { id: 'donations', label: 'Donations & Campaigns', icon: Megaphone, color: 'text-blue-500' },
    { id: 'transfers', label: 'Transfers & Logistics', icon: Truck, color: 'text-orange-500' },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, color: 'text-indigo-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-500' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1.5">
            <img src={logo} alt="BloodLink Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg tracking-wide">BLOOD LINK</h1>
            <p className="text-xs text-gray-400">Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-white/10 border-l-4 border-red-500' 
                  : 'hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.color}`} />
              <span className="flex-1 text-left text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/20 transition-all text-red-400">
          <LogOut className="w-5 h-5" />
          <span className="flex-1 text-left text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
