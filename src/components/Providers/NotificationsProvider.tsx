'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: number
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications
      }}
    >
      {children}
      <NotificationsPanel notifications={notifications} onRemove={removeNotification} />
    </NotificationsContext.Provider>
  )
}

function NotificationsPanel({
  notifications,
  onRemove
}: {
  notifications: Notification[]
  onRemove: (id: string) => void
}) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 space-y-2">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-4 rounded-lg border shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-400/10 border-green-400/20 text-green-400'
                : notification.type === 'error'
                ? 'bg-red-400/10 border-red-400/20 text-red-400'
                : notification.type === 'warning'
                ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
                : 'bg-white/10 border-white/20 text-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm opacity-80">{notification.message}</div>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
} 