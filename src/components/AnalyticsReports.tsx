import { Card } from './ui/card';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const monthlyData = [
  { month: 'Jan', donations: 2400, requests: 2100, inventory: 8500 },
  { month: 'Feb', donations: 2210, requests: 2300, inventory: 8200 },
  { month: 'Mar', donations: 2800, requests: 2400, inventory: 8800 },
  { month: 'Apr', donations: 2600, requests: 2200, inventory: 9100 },
  { month: 'May', donations: 3100, requests: 2600, inventory: 9500 },
  { month: 'Jun', donations: 2900, requests: 2800, inventory: 9200 },
  { month: 'Jul', donations: 3300, requests: 2900, inventory: 9800 },
  { month: 'Aug', donations: 3000, requests: 3100, inventory: 9400 },
  { month: 'Sep', donations: 3200, requests: 2850, inventory: 10200 },
  { month: 'Oct', donations: 3500, requests: 3200, inventory: 10500 },
];

const bloodTypeDistribution = [
  { type: 'A+', value: 32, color: '#ef4444' },
  { type: 'O+', value: 28, color: '#f97316' },
  { type: 'B+', value: 18, color: '#eab308' },
  { type: 'AB+', value: 8, color: '#84cc16' },
  { type: 'A-', value: 6, color: '#22c55e' },
  { type: 'O-', value: 4, color: '#10b981' },
  { type: 'B-', value: 3, color: '#14b8a6' },
  { type: 'AB-', value: 1, color: '#06b6d4' },
];

const donorAgeGroups = [
  { age: '18-25', count: 450 },
  { age: '26-35', count: 680 },
  { age: '36-45', count: 520 },
  { age: '46-55', count: 310 },
  { age: '56+', count: 180 },
];

export function AnalyticsReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <span>Analytics & Reports</span>
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive analytics and reports</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Donations</p>
              <h3 className="mt-1">29,140</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+15.3%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Requests</p>
              <h3 className="mt-1">26,450</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+8.7%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Satisfaction Rate</p>
              <h3 className="mt-1">96.5%</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+2.1%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Delivery Time</p>
              <h3 className="mt-1">45 min</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>-12%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Monthly Donations & Requests Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#10b981"
                strokeWidth={3}
                name="Donations"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Requests"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Blood Type Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={bloodTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {bloodTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Monthly Inventory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="inventory" fill="#8b5cf6" name="Inventory" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Donor Distribution by Age</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donorAgeGroups} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="age" type="category" stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#ef4444" name="Donor Count" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-white border-r-4 border-r-indigo-500">
        <h4 className="mb-3">Analytics Summary:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="mb-2">📈 Positive Points:</h5>
            <ul className="space-y-1 text-gray-700">
              <li>• Significant increase in donors by 15.3%</li>
              <li>• Improved delivery times by 12%</li>
              <li>• Very high satisfaction rate of 96.5%</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-2">⚠️ Areas for Improvement:</h5>
            <ul className="space-y-1 text-gray-700">
              <li>• Shortage in negative blood types</li>
              <li>• Increase in urgent requests by 8%</li>
              <li>• Need awareness campaigns for age group 46+</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
