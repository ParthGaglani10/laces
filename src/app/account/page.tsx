'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReservations } from '@/components/Providers'
import Link from 'next/link'
import { Clock, MapPin, Settings, User, LogOut, Bell, Shield } from 'lucide-react'

interface UserPreferences {
  notifications: boolean
  size: string
  location: string
}

interface UserData {
  name: string
  email: string
  joinDate: string
  preferences: UserPreferences
}

export default function AccountPage() {
  const { reservations } = useReservations()
  const [activeTab, setActiveTab] = useState<'profile' | 'reservations' | 'settings'>('profile')
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: 'January 2024',
    preferences: {
      notifications: true,
      size: 'US 10',
      location: 'New York'
    }
  })

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: e.target.checked
      }
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-8 h-8 text-white/60" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-white">{userData.name}</h2>
                <p className="text-white/60">Member since {userData.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-medium text-white">Notifications</h3>
                </div>
                <label className="flex items-center justify-between">
                  <span className="text-white/60">Email notifications</span>
                  <input
                    type="checkbox"
                    checked={userData.preferences.notifications}
                    onChange={handleNotificationChange}
                    className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-white checked:border-white"
                  />
                </label>
              </div>

              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-medium text-white">Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Default Size</span>
                    <span className="text-white">{userData.preferences.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Location</span>
                    <span className="text-white">{userData.preferences.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'reservations':
        return (
          <div className="space-y-6">
            {reservations.length > 0 ? (
              reservations.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.03] rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{item.name}</h3>
                      <p className="text-white/60">Size: US {item.size}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-white/60 mb-1">{item.storeName}</div>
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>48h hold</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{item.storeName}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 mb-6">No active reservations</p>
                <Link
                  href="/shop"
                  className="inline-flex px-6 py-3 bg-white text-black rounded-xl font-medium
                           hover:bg-white/90 transition-colors"
                >
                  Browse Sneakers
                </Link>
              </div>
            )}
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-6">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 bg-white/5 text-white placeholder-white/30
                             rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07]
                             focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 bg-white/5 text-white placeholder-white/30
                             rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07]
                             focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 text-red-500 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-12 pb-px border-b border-white/10">
            {(['profile', 'reservations', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm transition-colors capitalize ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 