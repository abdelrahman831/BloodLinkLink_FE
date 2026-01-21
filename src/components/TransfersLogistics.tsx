import { Card } from './ui/card';
import { Truck, Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const transfersData = [
  {
    id: 'TRF-001',
    from: 'Central Blood Bank',
    to: 'Cairo General Hospital',
    bloodType: 'O+',
    units: 15,
    status: 'in-transit',
    driver: 'Mohamed Ahmed',
    vehicle: 'ABC 1234',
    departureTime: '08:30 AM',
    estimatedArrival: '09:15 AM',
    date: '2025-10-22',
  },
  {
    id: 'TRF-002',
    from: 'Giza Blood Bank',
    to: 'Al-Galaa Hospital',
    bloodType: 'A-',
    units: 8,
    status: 'delivered',
    driver: 'Ahmed Hassan',
    vehicle: 'XYZ 5678',
    departureTime: '07:00 AM',
    estimatedArrival: '07:45 AM',
    date: '2025-10-22',
  },
  {
    id: 'TRF-003',
    from: 'Central Blood Bank',
    to: 'Children Hospital',
    bloodType: 'A+',
    units: 12,
    status: 'delayed',
    driver: 'Hassan Mahmoud',
    vehicle: 'DEF 9012',
    departureTime: '09:00 AM',
    estimatedArrival: '10:00 AM',
    date: '2025-10-22',
  },
  {
    id: 'TRF-004',
    from: 'Maadi Blood Bank',
    to: 'Dar El Fouad Hospital',
    bloodType: 'B+',
    units: 20,
    status: 'in-transit',
    driver: 'Karim Adel',
    vehicle: 'GHI 3456',
    departureTime: '10:15 AM',
    estimatedArrival: '11:00 AM',
    date: '2025-10-22',
  },
  {
    id: 'TRF-005',
    from: 'Central Blood Bank',
    to: 'Nile Hospital',
    bloodType: 'O-',
    units: 10,
    status: 'delivered',
    driver: 'Omar Saeed',
    vehicle: 'JKL 7890',
    departureTime: '06:30 AM',
    estimatedArrival: '07:15 AM',
    date: '2025-10-21',
  },
];

export function TransfersLogistics() {
  const inTransitCount = transfersData.filter(t => t.status === 'in-transit').length;
  const deliveredCount = transfersData.filter(t => t.status === 'delivered').length;
  const delayedCount = transfersData.filter(t => t.status === 'delayed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2">
          <Truck className="w-6 h-6 text-orange-500" />
          <span>Transfers & Logistics</span>
        </h1>
        <p className="text-gray-600 mt-1">Transfer log between blood banks</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3>{inTransitCount}</h3>
              <p className="text-gray-600">In Transit</p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3>{deliveredCount}</h3>
              <p className="text-gray-600">Delivered</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-red-50 to-white border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <h3>{delayedCount}</h3>
              <p className="text-gray-600">Delayed</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Transfers Table */}
      <Card className="p-6">
        <h3 className="mb-4">Transfer Log Between Banks</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Transfer ID</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Timing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfersData.map((transfer) => (
                <TableRow key={transfer.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                      {transfer.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{transfer.from}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{transfer.to}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-12 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded flex items-center justify-center text-white text-sm">
                      {transfer.bloodType}
                    </div>
                  </TableCell>
                  <TableCell>{transfer.units} units</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        transfer.status === 'delivered'
                          ? 'bg-green-100 text-green-700 gap-1'
                          : transfer.status === 'in-transit'
                          ? 'bg-blue-100 text-blue-700 gap-1'
                          : 'bg-red-100 text-red-700 gap-1'
                      }
                    >
                      {transfer.status === 'delivered' ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Delivered
                        </>
                      ) : transfer.status === 'in-transit' ? (
                        <>
                          <Truck className="w-3 h-3" />
                          In Transit
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          Delayed
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{transfer.driver}</p>
                      <p className="text-xs text-gray-500">Driver</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">{transfer.vehicle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span>{transfer.departureTime}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        ETA: {transfer.estimatedArrival}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Additional Info */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-white border-r-4 border-r-orange-500">
        <h4 className="mb-3">Vehicle + Driver Information (Optional):</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <Truck className="w-5 h-5 text-orange-600 mt-1" />
            <div>
              <p className="text-gray-900">Equipped Vehicles</p>
              <p className="text-gray-600">All vehicles have medical refrigeration</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="text-gray-900">Real-time Tracking</p>
              <p className="text-gray-600">GPS tracking system for shipments</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="text-gray-900">Trained Drivers</p>
              <p className="text-gray-600">Basic medical training certified</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
