import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Mail, Calendar, Settings, Activity, Zap } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    {
      label: 'Total Prompts',
      value: '47',
      icon: Activity,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Files Processed',
      value: '23',
      icon: Settings,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Account Status',
      value: 'Active',
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
            User Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 animate-slide-up">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Clustify Agent User
              </p>
            </div>
          </div>

          {/* User Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <User className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-4" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400 mr-4" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {new Date(user.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Usage Statistics
              </h3>
              
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center">
                    <stat.icon className={`w-6 h-6 ${stat.color} mr-4`} />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]">
              <Settings className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
            <button className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
              <Activity className="w-5 h-5 mr-2" />
              View Activity
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-slide-up">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Account Preferences
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Theme Preference</h4>
              <p className="text-gray-600 dark:text-gray-400">Automatically synced with system preference</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notifications</h4>
              <p className="text-gray-600 dark:text-gray-400">Email notifications enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;