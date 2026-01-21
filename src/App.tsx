import { useState } from 'react';
import { DashboardOverview } from './components/DashboardOverview';
import { BloodInventory } from './components/BloodInventory';
import { HospitalsRequests } from './components/HospitalsRequests';
import { DonationsCampaigns } from './components/DonationsCampaigns';
import { TransfersLogistics } from './components/TransfersLogistics';
import { AnalyticsReports } from './components/AnalyticsReports';
import { SettingsPage } from './components/SettingsPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
console.log('Current Page:', currentPage);
console.log('Set Current Page Function:', setCurrentPage);
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'inventory':
        return <BloodInventory />;
      case 'hospitals':
        return <HospitalsRequests />;
      case 'donations':
        return <DonationsCampaigns />;
      case 'transfers':
        return <TransfersLogistics />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
