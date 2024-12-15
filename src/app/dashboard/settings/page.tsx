'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Store, MapPin, Mail, Phone, Globe, Clock, Bell,
  Upload, Save, Building2
} from 'lucide-react'

interface StoreSettings {
  name: string
  description: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  state: string
  zipCode: string
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  notifications: {
    newReservations: boolean
    reservationUpdates: boolean
    lowStock: boolean
    customerMessages: boolean
  }
}

const initialSettings: StoreSettings = {
  name: "Nike Store Downtown",
  description: "Official Nike store offering the latest in athletic footwear and apparel.",
  email: "downtown@nikestore.com",
  phone: "(555) 123-4567",
  website: "www.nike.com/stores/downtown",
  address: "123 Sneaker Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  openingHours: {
    monday: "10:00 AM - 9:00 PM",
    tuesday: "10:00 AM - 9:00 PM",
    wednesday: "10:00 AM - 9:00 PM",
    thursday: "10:00 AM - 9:00 PM",
    friday: "10:00 AM - 10:00 PM",
    saturday: "9:00 AM - 10:00 PM",
    sunday: "11:00 AM - 7:00 PM"
  },
  notifications: {
    newReservations: true,
    reservationUpdates: true,
    lowStock: true,
    customerMessages: true
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(initialSettings)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("/store-logo.jpg")

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: keyof StoreSettings,
    key?: string
  ) => {
    const { name, value, type } = e.target
    
    if (section && key) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, any>),
          [key]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }))
    } else {
      setSettings(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleNotificationChange = (key: keyof StoreSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handleHoursChange = (day: keyof StoreSettings['openingHours'], value: string) => {
    setSettings(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(settings)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            Store Settings
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Store Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Store Logo</h2>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-2xl bg-white/[0.03] border border-white/10 
                           relative overflow-hidden">
                <Image
                  src={logoPreview}
                  alt="Store Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl 
                               cursor-pointer hover:bg-white/90 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>Upload New Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-white/60 mt-2">
                  Recommended: 400x400px or larger, PNG or JPG
                </p>
              </div>
            </div>
          </motion.div>

          {/* Store Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Store Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Store Name</label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleSettingChange}
                    className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Description</label>
                <textarea
                  name="description"
                  value={settings.description}
                  onChange={handleSettingChange}
                  className="w-full h-32 px-4 py-3 bg-white/[0.03] text-white rounded-xl border 
                           border-white/10 focus:border-white/20 focus:outline-none resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                 text-white/40 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleSettingChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                  text-white/40 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={settings.phone}
                      onChange={handleSettingChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                text-white/40 w-5 h-5" />
                  <input
                    type="url"
                    name="website"
                    value={settings.website}
                    onChange={handleSettingChange}
                    className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Location</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Street Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleSettingChange}
                    className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">City</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                     text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      name="city"
                      value={settings.city}
                      onChange={handleSettingChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={settings.state}
                    onChange={handleSettingChange}
                    className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={settings.zipCode}
                    onChange={handleSettingChange}
                    className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Business Hours</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.openingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-32 text-white capitalize">{day}</div>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => handleHoursChange(day as keyof StoreSettings['openingHours'], e.target.value)}
                    className="flex-1 h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`notification-${key}`}
                      checked={value}
                      onChange={() => handleNotificationChange(key as keyof StoreSettings['notifications'])}
                      className="sr-only peer"
                      aria-checked={value}
                      role="switch"
                      aria-label={`${key.replace(/([A-Z])/g, ' $1').trim()} notifications`}
                    />
                    <div className={`w-14 h-8 rounded-full transition-colors peer-focus:ring-2 
                                   peer-focus:ring-white/20 ${value ? 'bg-white' : 'bg-white/10'}`}>
                      <div className={`absolute w-6 h-6 rounded-full top-1 transition-transform ${
                        value ? 'right-1 bg-black' : 'left-1 bg-white/60'
                      }`} />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl 
                       font-medium hover:bg-white/90 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
} 