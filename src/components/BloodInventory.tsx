import { Card } from './ui/card';
import { Droplet, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Progress } from './ui/progress';

const inventoryData = [
  {
    bloodType: 'A+',
    unitsAvailable: 520,
    expiringSoon: 12,
    averageDemand: 400,
    status: 'adequate',
    fillPercentage: 85,
  },
  {
    bloodType: 'O-',
    unitsAvailable: 150,
    expiringSoon: 25,
    averageDemand: 210,
    status: 'low',
    fillPercentage: 45,
  },
  {
    bloodType: 'B+',
    unitsAvailable: 380,
    expiringSoon: 8,
    averageDemand: 280,
    status: 'adequate',
    fillPercentage: 72,
  },
  {
    bloodType: 'O+',
    unitsAvailable: 720,
    expiringSoon: 15,
    averageDemand: 550,
    status: 'adequate',
    fillPercentage: 90,
  },
  {
    bloodType: 'A-',
    unitsAvailable: 95,
    expiringSoon: 18,
    averageDemand: 120,
    status: 'low',
    fillPercentage: 38,
  },
  {
    bloodType: 'AB+',
    unitsAvailable: 180,
    expiringSoon: 6,
    averageDemand: 150,
    status: 'adequate',
    fillPercentage: 68,
  },
  {
    bloodType: 'B-',
    unitsAvailable: 65,
    expiringSoon: 22,
    averageDemand: 95,
    status: 'low',
    fillPercentage: 32,
  },
  {
    bloodType: 'AB-',
    unitsAvailable: 45,
    expiringSoon: 9,
    averageDemand: 75,
    status: 'critical',
    fillPercentage: 25,
  },
];

export function BloodInventory() {
  const totalUnits = inventoryData.reduce((sum, item) => sum + item.unitsAvailable, 0);
  const totalExpiring = inventoryData.reduce((sum, item) => sum + item.expiringSoon, 0);
  const criticalTypes = inventoryData.filter(item => item.status === 'critical' || item.status === 'low').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2">
          <Droplet className="w-6 h-6 text-blue-500" />
          <span>Blood Inventory</span>
        </h1>
        <p className="text-gray-600 mt-1">Interactive inventory table</p>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Units</p>
              <h3 className="mt-1">{totalUnits.toLocaleString()}</h3>
            </div>
            <Droplet className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Expiring Soon</p>
              <h3 className="mt-1">{totalExpiring}</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-white border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical Types</p>
              <h3 className="mt-1">{criticalTypes}</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Interactive Table */}
      <Card className="p-6">
        <h3 className="mb-4">Blood Inventory Details</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Blood Type</TableHead>
                <TableHead>Units Available</TableHead>
                <TableHead>Expiring Soon</TableHead>
                <TableHead>Average Demand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fill Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.bloodType} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white">
                        {item.bloodType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg">{item.unitsAvailable}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.expiringSoon}</span>
                      {item.expiringSoon > 15 && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.averageDemand}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.status === 'adequate'
                          ? 'bg-green-100 text-green-700 gap-1'
                          : item.status === 'low'
                          ? 'bg-yellow-100 text-yellow-700 gap-1'
                          : 'bg-red-100 text-red-700 gap-1'
                      }
                    >
                      {item.status === 'adequate' ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Adequate
                        </>
                      ) : item.status === 'low' ? (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          Low
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          Critical
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={item.fillPercentage} 
                        className="h-2 flex-1"
                        indicatorClassName={
                          item.fillPercentage > 60
                            ? 'bg-green-500'
                            : item.fillPercentage > 30
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }
                      />
                      <span className="text-sm text-gray-600 w-12">{item.fillPercentage}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Note */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-white border-r-4 border-r-purple-500">
        <p className="text-sm text-gray-700">
          Progress bars show fill percentage for each blood type. Colors indicate: Green (60%+), Yellow (30-60%), Red (&lt;30%)
        </p>
      </Card>
    </div>
  );
}
