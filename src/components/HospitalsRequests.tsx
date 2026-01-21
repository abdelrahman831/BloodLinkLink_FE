import { useState } from 'react';
import { Card } from './ui/card';
import { Building2, Search, Filter } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const requestsData = [
  {
    id: 1,
    hospital: 'Cairo General Hospital',
    bloodType: 'A+',
    units: 15,
    status: 'pending',
    urgency: 'normal',
    requestDate: '2025-10-20',
    location: 'Cairo',
  },
  {
    id: 2,
    hospital: 'Al-Galaa Teaching Hospital',
    bloodType: 'O-',
    units: 8,
    status: 'urgent',
    urgency: 'urgent',
    requestDate: '2025-10-22',
    location: 'Cairo',
  },
  {
    id: 3,
    hospital: 'University Children Hospital',
    bloodType: 'B+',
    units: 12,
    status: 'fulfilled',
    urgency: 'normal',
    requestDate: '2025-10-19',
    location: 'Giza',
  },
  {
    id: 4,
    hospital: 'Dar El Fouad Hospital',
    bloodType: 'O+',
    units: 20,
    status: 'urgent',
    urgency: 'urgent',
    requestDate: '2025-10-22',
    location: 'Cairo',
  },
  {
    id: 5,
    hospital: 'Maadi Military Hospital',
    bloodType: 'A-',
    units: 6,
    status: 'pending',
    urgency: 'normal',
    requestDate: '2025-10-21',
    location: 'Cairo',
  },
  {
    id: 6,
    hospital: 'Nile Hospital',
    bloodType: 'AB+',
    units: 10,
    status: 'pending',
    urgency: 'high',
    requestDate: '2025-10-21',
    location: 'Giza',
  },
];

export function HospitalsRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requestsData.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || req.location === filterLocation;
    const matchesSearch = req.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesLocation && matchesSearch;
  });

  const handleAction = (request: any, type: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(type);
  };

  const pendingCount = requestsData.filter(r => r.status === 'pending').length;
  const urgentCount = requestsData.filter(r => r.status === 'urgent').length;
  const fulfilledCount = requestsData.filter(r => r.status === 'fulfilled').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-purple-500" />
          <span>Hospitals & Requests</span>
        </h1>
        <p className="text-gray-600 mt-1">Hospital list with request management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white border-l-4 border-l-yellow-500">
          <h3>{pendingCount}</h3>
          <p className="text-gray-600">Pending Requests</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-red-50 to-white border-l-4 border-l-red-500">
          <h3>{urgentCount}</h3>
          <p className="text-gray-600">Urgent Requests</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
          <h3>{fulfilledCount}</h3>
          <p className="text-gray-600">Fulfilled Requests</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Cairo">Cairo</SelectItem>
              <SelectItem value="Giza">Giza</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4>{request.hospital}</h4>
                    <Badge
                      className={
                        request.status === 'urgent'
                          ? 'bg-red-100 text-red-700'
                          : request.status === 'fulfilled'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {request.status === 'urgent' ? 'Urgent' : 
                       request.status === 'fulfilled' ? 'Fulfilled' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Required Type</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded text-white flex items-center justify-center text-xs">
                          {request.bloodType}
                        </div>
                        <span>{request.units} units</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="mt-1">{request.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Request Date</p>
                      <p className="mt-1">{request.requestDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="mt-1">
                        {request.status === 'urgent' ? '🚨 Urgent' :
                         request.status === 'fulfilled' ? '✅ Done' : '⏳ Pending'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAction(request, 'approve')}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={request.status === 'fulfilled'}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(request, 'approve')}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  disabled={request.status === 'fulfilled'}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(request, 'reject')}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  disabled={request.status === 'fulfilled'}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'approve' 
                ? `Are you sure you want to approve ${selectedRequest?.hospital}'s request for ${selectedRequest?.units} units of ${selectedRequest?.bloodType}?`
                : `Are you sure you want to reject ${selectedRequest?.hospital}'s request?`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={actionType === 'approve' ? 'bg-green-600' : 'bg-red-600'}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Note */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-white border-r-4 border-r-blue-500">
        <p className="text-sm text-gray-700">
          You can add top filters by blood type or region for better organization.
        </p>
      </Card>
    </div>
  );
}
