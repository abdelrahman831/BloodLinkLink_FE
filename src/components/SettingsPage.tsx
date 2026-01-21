import { Card } from './ui/card';
import { Settings, User, Bell, Shield, Database, Mail } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-500" />
          <span>Settings</span>
        </h1>
        <p className="text-gray-600 mt-1">System and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <Card className="p-6 lg:col-span-1">
          <nav className="space-y-2">
            {[
              { icon: User, label: 'Profile', active: true },
              { icon: Bell, label: 'Notifications', active: false },
              { icon: Shield, label: 'Security & Privacy', active: false },
              { icon: Database, label: 'Backup', active: false },
              { icon: Mail, label: 'Email', active: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-indigo-600" />
              <h3>Profile</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Mohamed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Ahmed" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="mohamed.ahmed@bloodbank.gov.eg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+20 123 456 7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Job Title</Label>
                <Input id="position" defaultValue="System Administrator" />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h3>Notification Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Urgent Request Notifications</p>
                  <p className="text-sm text-gray-500">Receive instant alert for urgent requests</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Low Stock Alerts</p>
                  <p className="text-sm text-gray-500">Alert when stock falls below minimum</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Campaign Updates</p>
                  <p className="text-sm text-gray-500">Notifications about campaign results</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Daily Reports</p>
                  <p className="text-sm text-gray-500">Receive daily summary via email</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-indigo-600" />
              <h3>Security & Privacy</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" />
              </div>
              <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Change Password
              </Button>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <p>Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Additional security layer for your account</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* System Info */}
          <Card className="p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">System Version:</span>
                <span className="text-gray-900">v2.5.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="text-gray-900">October 15, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">License:</span>
                <span className="text-gray-900">Ministry of Health - Egypt</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
