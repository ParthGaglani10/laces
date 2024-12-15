'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Bell, Clock, MapPin } from 'lucide-react'

// Mock data for releases
const releases = [
  {
    id: 1,
    name: 'Nike Air Max Pulse',
    brand: 'Nike',
    image: '/releases/airmax.jpg',
    releaseDate: '2024-02-15',
    price: '$180',
    description: 'The Air Max Pulse brings a new beat to the streets.',
    stores: ['Downtown Store', 'Mall Location', 'City Center'],
    notification: false
  },
  {
    id: 2,
    name: 'Adidas Forum 84',
    brand: 'Adidas',
    image: '/releases/forum.jpg',
    releaseDate: '2024-02-20',
    price: '$150',
    description: 'A classic returns with modern comfort technology.',
    stores: ['Flagship Store', 'Outlet Center', 'Sports Complex'],
    notification: false
  },
  {
    id: 3,
    name: 'New Balance 990v6',
    brand: 'New Balance',
    image: '/releases/990v6.jpg',
    releaseDate: '2024-02-25',
    price: '$200',
    description: 'Premium craftsmanship meets ultimate comfort.',
    stores: ['Premium Store', 'Fashion District', 'Sneaker Hub'],
    notification: false
  }
]

export default function ReleasesPage() {
  const [notifications, setNotifications] = useState<number[]>([])

  const toggleNotification = (id: number) => {
    setNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] 
                     border border-white/10 text-white/60 mb-6"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Release Calendar</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Upcoming Releases
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            Stay ahead of the game with our curated list of upcoming sneaker releases
          </motion.p>
        </div>

        {/* Releases Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {releases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.03] rounded-3xl border border-white/10 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image Section */}
                  <div className="aspect-square relative">
                    <Image
                      src={release.image}
                      alt={release.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-sm text-white/60 mb-2">{release.brand}</div>
                        <h2 className="text-2xl font-medium text-white mb-2">{release.name}</h2>
                        <p className="text-white/60">{release.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(release.id)}
                        className={`p-3 rounded-xl border transition-colors ${
                          notifications.includes(release.id)
                            ? 'bg-white text-black border-white'
                            : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        <Bell className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 text-white/60 mb-1">
                          <Clock className="w-4 h-4" />
                          <span>Release Date</span>
                        </div>
                        <div className="text-white">
                          {new Date(release.releaseDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                        <div className="text-white/60 mb-1">Retail Price</div>
                        <div className="text-white">{release.price}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4" />
                        <span>Available at</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {release.stores.map((store) => (
                          <div
                            key={store}
                            className="px-4 py-3 text-sm text-white bg-white/[0.03] rounded-xl 
                                     border border-white/10"
                          >
                            {store}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mt-24 p-12 bg-white/[0.03] rounded-3xl border border-white/10 
                   text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Never Miss a Drop</h2>
          <p className="text-white/60 mb-8">
            Get notified about release dates and availability in your preferred stores
          </p>
          <button
            className="px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 
                     transition-colors"
          >
            Set Release Reminders
          </button>
        </motion.div>
      </div>
    </div>
  )
} 