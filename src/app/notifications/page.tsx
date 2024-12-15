'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Package, Tag, Store, Clock, X, Filter } from 'lucide-react'

// Mock data for demonstration
const mockNotifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Ready for Pickup',
    message: 'Your order #ORD-2023-1234 is ready for pickup at Nike Store Downtown',
    time: '2 hours ago',
    read: false,
    icon: Package
  },
  {
    id: 2,
    type: 'price',
    title: 'Price Drop Alert',
    message: 'Air Jordan 1 High OG is now available at a lower price',
    time: '5 hours ago',
    read: false,
    icon: Tag
  },
  {
    id: 3,
    type: 'store',
    title: 'New Store Added',
    message: 'Adidas Flagship Store is now available on our platform',
    time: '1 day ago',
    read: true,
    icon: Store
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Pickup Reminder',
    message: "Don't forget to pick up your order #ORD-2023-1235",
    time: '2 days ago',
    read: true,
    icon: Clock
  }
]

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Orders', value: 'order' },
  { label: 'Price Alerts', value: 'price' },
  { label: 'Store Updates', value: 'store' },
  { label: 'Reminders', value: 'reminder' }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filteredNotifications = notifications.filter(notification => {
    if (showUnreadOnly && notification.read) return false
    if (activeFilter === 'all') return true
    return notification.type === activeFilter
  })

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <Bell className="w-8 h-8 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex 
                              items-center justify-center">
                  <span className="text-xs text-black font-medium">{unreadCount}</span>
                </div>
              )}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Notifications
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Stay updated with your orders and favorite stores
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-white/60" />
            <h2 className="text-lg font-medium text-white">Filters</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  activeFilter === option.value
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
                }`}
              >
                {option.label}
              </button>
            ))}
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                showUnreadOnly
                  ? 'bg-white text-black border-white'
                  : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
              }`}
            >
              Unread Only
            </button>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`relative p-6 rounded-2xl border transition-colors ${
                    notification.read
                      ? 'bg-white/[0.03] border-white/10'
                      : 'bg-white/[0.05] border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      notification.read ? 'bg-white/[0.03]' : 'bg-white/[0.1]'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-white/60 mb-2">{notification.message}</p>
                      <div className="text-sm text-white/40">{notification.time}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-white/60 hover:text-white transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-white/40 hover:text-white/60 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </div>
    </div>
  )
} 