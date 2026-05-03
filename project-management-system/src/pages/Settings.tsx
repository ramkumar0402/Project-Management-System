import { useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Eye,
  Monitor,
  Globe,
  Shield,
  CreditCard,
  Mail,
  Camera,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'preferences';

export const Settings = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Public Profile', icon: User },
    { id: 'security', label: 'Security & Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings and set your email preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-gray-600 hover:bg-white hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Settings Content */}
        <main className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'profile' && <ProfileSettings user={user} />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'preferences' && <PreferenceSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

const ProfileSettings = ({ user }: { user: any }) => (
  <div className="p-8 space-y-8">
    <div className="flex items-center gap-6">
      <div className="relative group">
        <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-blue-600" />
          )}
        </div>
        <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg shadow-md border border-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
          <Camera className="w-4 h-4" />
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
        <p className="text-sm text-gray-600">{user?.role} • {user?.email}</p>
        <button 
          onClick={() => toast.info('Avatar upload coming soon!')}
          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Change profile picture
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Display Name</label>
        <input 
          type="text" 
          defaultValue={user?.name}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Email Address</label>
        <input 
          type="email" 
          defaultValue={user?.email}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
          disabled
        />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <label className="text-sm font-semibold text-gray-700">Bio</label>
        <textarea 
          placeholder="Write a short bio about yourself..."
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
        />
      </div>
    </div>

    <div className="flex justify-end pt-6 border-t border-gray-50">
      <button 
        onClick={() => toast.success('Profile updated successfully!')}
        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
      >
        Save Changes
      </button>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div className="p-8 space-y-8">
    <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
      <div className="flex gap-3">
        <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-yellow-800 italic">Security Checkup</p>
          <p className="text-xs text-yellow-700 mt-0.5">Your account is 75% secure. Complete the steps below to strengthen it.</p>
        </div>
      </div>
      <button className="text-sm font-bold text-yellow-800 hover:underline">Fix now</button>
    </div>

    <div className="space-y-6">
      <h4 className="text-lg font-bold text-gray-900">Change Password</h4>
      <div className="grid grid-cols-1 gap-4">
        <input 
          type="password" 
          placeholder="Current password"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        />
        <input 
          type="password" 
          placeholder="New password"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        />
        <input 
          type="password" 
          placeholder="Confirm new password"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all">
        Update Password
      </button>
    </div>

    <div className="pt-8 border-t border-gray-50 space-y-4">
      <h4 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h4>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
        <div className="flex gap-4">
          <Globe className="w-6 h-6 text-gray-400" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Authenticator App</p>
            <p className="text-xs text-gray-500">Use an app like Google Authenticator or 1Password.</p>
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
          Enable
        </button>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="p-8 space-y-8">
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-gray-900">Email Notifications</h4>
      <div className="space-y-4">
        <NotificationToggle 
          title="Product Updates" 
          description="Receive emails about new features and major updates."
          defaultChecked={true}
        />
        <NotificationToggle 
          title="Team Activity" 
          description="Get notified when someone mentions you or assigns a task."
          defaultChecked={true}
        />
        <NotificationToggle 
          title="Billing Reports" 
          description="Monthly usage and payment reports."
          defaultChecked={false}
        />
      </div>
    </div>

    <div className="pt-8 border-t border-gray-50 space-y-4">
      <h4 className="text-lg font-bold text-gray-900">Push Notifications</h4>
      <div className="space-y-4">
        <NotificationToggle 
          title="Task Deadlines" 
          description="Alerts for upcoming or overdue tasks."
          defaultChecked={true}
        />
        <NotificationToggle 
          title="Direct Messages" 
          description="In-app alerts for private messages."
          defaultChecked={true}
        />
      </div>
    </div>
  </div>
);

const NotificationToggle = ({ title, description, defaultChecked }: any) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const PreferenceSettings = () => (
  <div className="p-8 space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900">Appearance</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 border-2 border-blue-600 rounded-xl bg-white shadow-sm cursor-pointer">
            <div className="w-full aspect-square bg-gray-50 rounded-lg mb-2" />
            <p className="text-xs font-bold text-center">Light</p>
          </div>
          <div className="p-3 border-2 border-transparent hover:border-gray-200 rounded-xl bg-gray-900 cursor-pointer">
            <div className="w-full aspect-square bg-gray-800 rounded-lg mb-2" />
            <p className="text-xs font-bold text-center text-white">Dark</p>
          </div>
          <div className="p-3 border-2 border-transparent hover:border-gray-200 rounded-xl bg-gray-100 cursor-pointer">
            <div className="w-full aspect-square bg-gray-300 rounded-lg mb-2" />
            <p className="text-xs font-bold text-center">Auto</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900">Language</h4>
        <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-no-repeat bg-right pr-10">
          <option>English (US)</option>
          <option>Spanish (ES)</option>
          <option>French (FR)</option>
          <option>German (DE)</option>
          <option>Japanese (JP)</option>
        </select>
      </div>
    </div>

    <div className="pt-8 border-t border-gray-50">
      <h4 className="text-lg font-bold text-gray-900 mb-4">Storage Usage</h4>
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-gray-600">
          <span>24.5 GB of 50 GB used</span>
          <span>49%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '49%' }} />
        </div>
      </div>
    </div>
  </div>
);
