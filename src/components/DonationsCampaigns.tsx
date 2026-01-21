import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Megaphone, MapPin, Calendar, Users, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const campaignsData = [
  {
    id: 1,
    name: 'Cairo University Campaign',
    location: 'Faculty of Medicine - Cairo University',
    coords: [30.0266, 31.2099],
    date: '2025-10-25',
    donors: 156,
    target: 200,
    status: 'active',
    coordinator: 'Dr. Ahmed Mohamed',
  },
  {
    id: 2,
    name: 'Al-Noor Mosque Campaign',
    location: 'Al-Noor Mosque - Nasr City',
    coords: [30.0594, 31.3396],
    date: '2025-10-23',
    donors: 89,
    target: 100,
    status: 'active',
    coordinator: 'Mr. Mahmoud Hassan',
  },
  {
    id: 3,
    name: 'National Donation Day',
    location: 'Cairo International Stadium',
    coords: [30.0691, 31.3176],
    date: '2025-11-01',
    donors: 0,
    target: 500,
    status: 'upcoming',
    coordinator: 'Ministry of Health',
  },
  {
    id: 4,
    name: 'Telecom Egypt Campaign',
    location: 'Headquarters - Smart Village',
    coords: [30.0726, 30.9702],
    date: '2025-10-18',
    donors: 142,
    target: 150,
    status: 'completed',
    coordinator: 'HR Department',
  },
  {
    id: 5,
    name: 'Mall of Arabia Campaign',
    location: 'Mall of Arabia - Sheikh Zayed',
    coords: [30.0081, 30.9713],
    date: '2025-10-26',
    donors: 67,
    target: 120,
    status: 'active',
    coordinator: 'Mall Management',
  },
];

export function DonationsCampaigns() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const activeCount = campaignsData.filter(c => c.status === 'active').length;
  const totalDonors = campaignsData.reduce((sum, c) => sum + c.donors, 0);
  const upcomingCount = campaignsData.filter(c => c.status === 'upcoming').length;

  useEffect(() => {
    if (!mapRef.current) return;

    import('leaflet@1.9.4').then((L) => {
      const mapElement = mapRef.current;
      if (!mapElement || mapElement.children.length > 0) return;

      const map = L.map(mapElement).setView([30.0444, 31.2357], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      campaignsData.filter(c => c.status === 'active').forEach((campaign) => {
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: #3b82f6;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          ">📢</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker(campaign.coords as [number, number], { icon }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <strong style="font-size: 14px;">${campaign.name}</strong><br/>
            <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">${campaign.location}</p>
            <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="background-color: #10b981; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
                ${campaign.donors} donors
              </span>
            </div>
          </div>
        `);
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-blue-500" />
            <span>Donations & Campaigns</span>
          </h1>
          <p className="text-gray-600 mt-1">Active campaigns (name, location, date, donors count)</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              Create New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Enter the details for the new donation campaign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="e.g., Al-Azhar University Campaign" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Faculty of Medicine - Al-Azhar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target (number of donors)</Label>
                <Input id="target" type="number" placeholder="200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coordinator">Coordinator</Label>
                <Input id="coordinator" placeholder="Coordinator name" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
          <h3>{activeCount}</h3>
          <p className="text-gray-600">Active Campaigns</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500">
          <h3>{totalDonors}</h3>
          <p className="text-gray-600">Total Donors</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-l-4 border-l-purple-500">
          <h3>{upcomingCount}</h3>
          <p className="text-gray-600">Upcoming Campaigns</p>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {campaignsData.map((campaign) => (
          <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{campaign.name}</h3>
                      <Badge
                        className={
                          campaign.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : campaign.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {campaign.status === 'active' ? 'Active' :
                         campaign.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm">{campaign.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-sm">{campaign.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-purple-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Donors Count</p>
                      <p className="text-sm">{campaign.donors} / {campaign.target}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Megaphone className="w-4 h-4 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Coordinator</p>
                      <p className="text-sm">{campaign.coordinator}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">
                      {Math.round((campaign.donors / campaign.target) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min((campaign.donors / campaign.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap"
                  disabled={campaign.status === 'completed'}
                >
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Field Locations Map */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Campaign Locations Map
        </h3>
        <div 
          ref={mapRef} 
          className="w-full h-[400px] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100"
        />
        <p className="text-sm text-gray-600 mt-4">
          Interactive map showing all active campaign locations
        </p>
      </Card>
    </div>
  );
}
