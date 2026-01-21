import { useState } from 'react';
import { Card } from './ui/card';
import { TrendingUp, Users, Droplet, Activity, MapPin, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dailyConsumption = [
  { day: 'Sat', consumption: 420, donations: 380 },
  { day: 'Sun', consumption: 380, donations: 450 },
  { day: 'Mon', consumption: 450, donations: 400 },
  { day: 'Tue', consumption: 390, donations: 520 },
  { day: 'Wed', consumption: 470, donations: 480 },
  { day: 'Thu', consumption: 520, donations: 510 },
  { day: 'Fri', consumption: 350, donations: 420 },
];

const weeklyDonations = [
  { bloodType: 'A+', count: 145 },
  { bloodType: 'O+', count: 198 },
  { bloodType: 'B+', count: 87 },
  { bloodType: 'AB+', count: 45 },
  { bloodType: 'A-', count: 62 },
  { bloodType: 'O-', count: 73 },
  { bloodType: 'B-', count: 38 },
  { bloodType: 'AB-', count: 21 },
];

const hospitals = [
  { 
    id: 1, 
    name: 'Cairo General Hospital', 
    lat: 30.0444, 
    lng: 31.2357, 
    inventory: 85, 
    status: 'adequate', 
    bloodTypes: ['A+', 'O+', 'B+', 'AB+', 'O-'],
    address: 'Downtown Cairo'
  },
  { 
    id: 2, 
    name: 'Al-Galaa Hospital', 
    lat: 30.0626, 
    lng: 31.2497, 
    inventory: 35, 
    status: 'low', 
    bloodTypes: ['A+', 'O+', 'B-'],
    address: 'Al-Galaa, Cairo'
  },
  { 
    id: 3, 
    name: 'Children Hospital', 
    lat: 30.0330, 
    lng: 31.2336, 
    inventory: 92, 
    status: 'adequate', 
    bloodTypes: ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'],
    address: 'Abdin, Cairo'
  },
  { 
    id: 4, 
    name: 'Dar El Fouad Hospital', 
    lat: 30.0876, 
    lng: 31.3421, 
    inventory: 15, 
    status: 'critical', 
    bloodTypes: ['O+', 'A-'],
    address: '6th October City'
  },
  { 
    id: 5, 
    name: 'Maadi Military Hospital', 
    lat: 29.9597, 
    lng: 31.2453, 
    inventory: 68, 
    status: 'adequate', 
    bloodTypes: ['A+', 'O+', 'B+', 'AB+', 'O-', 'B-'],
    address: 'Maadi, Cairo'
  },
];

const bloodTypeOptions = ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'];

export function DashboardOverview() {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [mapKey, setMapKey] = useState(0);

  const filteredHospitals = selectedBloodType 
    ? hospitals.filter(h => h.bloodTypes.includes(selectedBloodType))
    : hospitals;

  const handleHospitalClick = (hospital: typeof hospitals[0]) => {
    setSelectedHospital(hospital.id === selectedHospital ? null : hospital.id);
    // Update map to show selected hospital location
    setMapKey(prev => prev + 1);
  };

  const getMapUrl = () => {
    if (selectedHospital) {
      const hospital = hospitals.find(h => h.id === selectedHospital);
      if (hospital) {
        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${hospital.lat},${hospital.lng}&zoom=15`;
      }
    }
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Cairo,Egypt&zoom=11`;
  };

  const getStatusColor = (status: string) => {
    if (status === 'adequate') return { bg: '#10b981', text: '✅ Adequate Stock' };
    if (status === 'low') return { bg: '#f59e0b', text: '⚠️ Low Stock' };
    return { bg: '#ef4444', text: '🚨 Critical Level' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>Dashboard Overview</span>
          <Droplet className="w-8 h-8 text-red-500" />
        </h1>
        <p className="text-gray-600 mt-2">Monthly overview and analytics</p>
      </div>

      {/* Blood Type Search */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">Search for Blood Type</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBloodType('')}
              className={`px-5 py-2.5 rounded-lg font-bold transition-all ${
                selectedBloodType === '' 
                  ? 'bg-red-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-red-100 border-2 border-gray-200'
              }`}
            >
              All
            </button>
            {bloodTypeOptions.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedBloodType(type)}
                className={`px-5 py-2.5 rounded-lg font-bold transition-all ${
                  selectedBloodType === type 
                    ? 'bg-red-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-red-100 border-2 border-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {selectedBloodType && (
            <div className="p-4 bg-white rounded-lg border-2 border-red-300 shadow-sm">
              <p className="text-base text-gray-800">
                <span className="font-bold text-red-700 text-lg">{filteredHospitals.length} hospitals</span>
                {' '}have blood type{' '}
                <span className="font-bold text-red-800 text-lg">{selectedBloodType}</span>
                {' '}available
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Hospital List with Map */}
      <Card className="p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Hospital & Blood Bank Locations
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-sm font-medium text-gray-700">Adequate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-sm font-medium text-gray-700">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-sm font-medium text-gray-700">Critical</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hospital Cards */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredHospitals.map((hospital) => {
              const statusInfo = getStatusColor(hospital.status);
              return (
                <div
                  key={hospital.id}
                  onClick={() => handleHospitalClick(hospital)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedHospital === hospital.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{hospital.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                    </div>
                    <div className="text-2xl ml-2">🏥</div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="px-3 py-1 rounded-lg text-white font-bold text-sm"
                      style={{ backgroundColor: statusInfo.bg }}
                    >
                      {hospital.inventory}%
                    </span>
                    <span className="text-sm text-gray-600">{statusInfo.text}</span>
                  </div>

                  {selectedHospital === hospital.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-600 font-semibold mb-2">
                        Available Blood Types:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hospital.bloodTypes.map(type => (
                          <span 
                            key={type}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-xs font-bold"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-blue-600 font-semibold">
                        📍 Click to view on map →
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Google Maps Iframe */}
          <div className="rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg h-[500px] relative">
            {selectedHospital && (
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-800">
                    {hospitals.find(h => h.id === selectedHospital)?.name}
                  </span>
                </div>
              </div>
            )}
            <iframe
              key={mapKey}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapUrl()}
            ></iframe>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center font-medium">
          Click on hospital cards to view available blood types and location on map
        </p>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Units Available</p>
              <h3 className="text-3xl font-bold mt-2">12,450</h3>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-semibold">+8.2% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Droplet className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Requests</p>
              <h3 className="text-3xl font-bold mt-2">85</h3>
              <div className="flex items-center gap-2 mt-3">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-semibold">12 Urgent</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Donors This Week</p>
              <h3 className="text-3xl font-bold mt-2">669</h3>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600 font-semibold">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Hospitals</p>
              <h3 className="text-3xl font-bold mt-2">47</h3>
              <div className="flex items-center gap-2 mt-3">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">Greater Cairo</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <MapPin className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Daily Consumption Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyConsumption}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                stroke="#ef4444" 
                fill="#fecaca" 
                name="Consumption"
              />
              <Area 
                type="monotone" 
                dataKey="donations" 
                stroke="#10b981" 
                fill="#d1fae5" 
                name="Donations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">New Donations This Week</h3>
          <div className="space-y-3">
            {weeklyDonations.map((item) => (
              <div key={item.bloodType} className="flex items-center gap-4">
                <div className="w-16 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-center font-bold">
                  {item.bloodType}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 font-medium">{item.count} units</span>
                    <span className="text-xs text-gray-500 font-semibold">{((item.count / 669) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${(item.count / 200) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}