'use client'

import { motion } from 'framer-motion'
import {
  Package, Calendar, Users, TrendingUp, Clock,
  DollarSign, ShoppingBag, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

const stats = [
  {
    name: "Total Reservations",
    value: "1,234",
    change: "+12.3%",
    trend: "up",
    icon: Calendar
  },
  {
    name: "Active Customers",
    value: "856",
    change: "+5.7%",
    trend: "up",
    icon: Users
  },
  {
    name: "Available Items",
    value: "432",
    change: "-2.1%",
    trend: "down",
    icon: Package
  },
  {
    name: "Revenue",
    value: "$45.2K",
    change: "+8.4%",
    trend: "up",
    icon: DollarSign
  }
]

const recentReservations = [
  {
    id: "RES-001",
    customer: "John Smith",
    item: "Nike Air Max 90",
    status: "Ready for Pickup",
    time: "2 hours ago"
  },
  {
    id: "RES-002",
    customer: "Sarah Johnson",
    item: "Adidas Ultra Boost",
    status: "Reserved",
    time: "3 hours ago"
  },
  {
    id: "RES-003",
    customer: "Michael Chen",
    item: "Jordan 1 High",
    status: "Picked Up",
    time: "5 hours ago"
  }
]

const popularItems = [
  {
    name: "Nike Air Jordan 1",
    reservations: 45,
    trend: "+15%"
  },
  {
    name: "Adidas Yeezy 350",
    reservations: 38,
    trend: "+12%"
  },
  {
    name: "Nike Dunk Low",
    reservations: 32,
    trend: "+8%"
  }
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            Dashboard Overview
          </motion.h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm
                    ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.name}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Reservations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Reservations</h2>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] 
                           border border-white/10"
                >
                  <div>
                    <div className="text-white font-medium mb-1">{reservation.customer}</div>
                    <div className="text-sm text-white/60">{reservation.item}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/80 mb-1">{reservation.status}</div>
                    <div className="flex items-center gap-1 text-sm text-white/40">
                      <Clock className="w-4 h-4" />
                      <span>{reservation.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Popular Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Popular Items</h2>
            <div className="space-y-4">
              {popularItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] 
                           border border-white/10"
                >
                  <div>
                    <div className="text-white font-medium mb-1">{item.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-white/60">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{item.reservations} reservations</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-green-500 text-sm">{item.trend}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 