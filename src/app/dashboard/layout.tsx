'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, Calendar, Users, BarChart3,
  Settings, LogOut, Menu, X, Bell,
  Clock, AlertCircle, CheckCircle2
} from 'lucide-react'

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    name: 'Inventory',
    href: '/dashboard/inventory',
    icon: Package,
    badge: '23'
  },
  {
    name: 'Reservations',
    href: '/dashboard/reservations',
    icon: Calendar,
    badge: '5',
    notifications: [
      { type: 'pending', message: '3 new reservations pending' },
      { type: 'ready', message: '2 orders ready for pickup' }
    ]
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
    badge: null
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null
  }
]

const recentAlerts = [
  {
    id: 1,
    type: 'pending',
    message: 'New reservation request',
    time: '2 min ago',
    icon: Clock
  },
  {
    id: 2,
    type: 'warning',
    message: 'Low stock alert: Nike Air Max',
    time: '15 min ago',
    icon: AlertCircle
  },
  {
    id: 3,
    type: 'success',
    message: 'Order picked up successfully',
    time: '1 hour ago',
    icon: CheckCircle2
  }
]

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-24 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 
                   hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-20 bottom-0 left-0 z-40 bg-black border-r border-white/10 w-72
                   ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center px-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                type="button"
                aria-expanded={showAlerts}
                aria-controls="alerts-panel"
                className={`relative p-2 rounded-lg border border-white/10 
                         text-white/60 hover:text-white transition-all duration-300 ease-in-out
                         ${showAlerts ? 'bg-white/[0.06]' : 'bg-white/[0.03]'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full" />
              </button>
              <span className="text-sm font-medium text-white/80">Dashboard Alerts</span>
            </div>
          </div>

          {/* Alerts Panel */}
          <AnimatePresence>
            {showAlerts && (
              <motion.div
                id="alerts-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 space-y-3">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] 
                               hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <alert.icon className={`w-5 h-5 mt-0.5 flex-shrink-0
                        ${alert.type === 'pending' ? 'text-blue-400' :
                          alert.type === 'warning' ? 'text-yellow-400' :
                          'text-green-400'}`}
                      />
                      <div>
                        <p className="text-sm text-white/80">{alert.message}</p>
                        <p className="text-xs text-white/40 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center h-11 gap-x-3 px-3 rounded-lg text-sm
                             transition-all relative overflow-hidden
                             ${isActive
                        ? 'text-black font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-x-3 w-full">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex items-center justify-between flex-1">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs rounded-full 
                            ${isActive ? 'bg-black/20' : 'bg-white/10'}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/60 
                         hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white/80">John Doe</div>
                <div className="text-xs text-white/40">Store Manager</div>
              </div>
              <LogOut className="w-5 h-5 text-white/40 group-hover:text-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="min-h-screen px-6">
          {children}
        </div>
      </main>
    </div>
  )
} 