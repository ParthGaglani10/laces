'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Users, TrendingUp, Clock,
  ArrowUpRight, ArrowDownRight, Package,
  AlertTriangle, DollarSign, ShoppingBag,
  Truck, BarChart3
} from 'lucide-react'

// Mock data for analytics
const metrics = [
  {
    name: 'Total Revenue',
    value: '$45,234',
    change: '+12.3%',
    trend: 'up',
    icon: DollarSign
  },
  {
    name: 'Active Reservations',
    value: '234',
    change: '+5.2%',
    trend: 'up',
    icon: Calendar
  },
  {
    name: 'Store Traffic',
    value: '1,892',
    change: '+8.1%',
    trend: 'up',
    icon: Users
  },
  {
    name: 'Conversion Rate',
    value: '68.7%',
    change: '+4.3%',
    trend: 'up',
    icon: TrendingUp
  }
]

const inventoryAlerts = [
  {
    product: 'Nike Air Max 270',
    issue: 'Low Stock',
    quantity: 3,
    demand: 'High',
    action: 'Restock Needed'
  },
  {
    product: 'Jordan 1 Retro High',
    issue: 'Out of Size',
    quantity: 0,
    demand: 'High',
    action: 'Size 9, 10 Needed'
  },
  {
    product: 'Yeezy Boost 350',
    issue: 'Oversupply',
    quantity: 25,
    demand: 'Low',
    action: 'Consider Promotion'
  }
]

const salesByCategory = [
  { category: 'Running', sales: 45, growth: '+12%' },
  { category: 'Basketball', sales: 32, growth: '+8%' },
  { category: 'Lifestyle', sales: 28, growth: '+15%' },
  { category: 'Training', sales: 20, growth: '+5%' }
]

const upcomingDeliveries = [
  {
    id: 'DEL001',
    supplier: 'Nike Direct',
    items: 45,
    status: 'In Transit',
    eta: '2 days'
  },
  {
    id: 'DEL002',
    supplier: 'Adidas Wholesale',
    items: 32,
    status: 'Processing',
    eta: '5 days'
  }
]

const customerInsights = [
  { label: 'Repeat Purchase Rate', value: '64%', trend: 'up' },
  { label: 'Avg. Time Between Visits', value: '18 days', trend: 'down' },
  { label: 'Customer Satisfaction', value: '4.8/5', trend: 'up' },
  { label: 'Membership Growth', value: '+22%', trend: 'up' }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month')

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Store Analytics</h1>
          <p className="text-white/60">Track your store's performance and insights</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
          {(['day', 'week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                       ${timeRange === range
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white'
                }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <metric.icon className="w-5 h-5 text-white/60" />
              </div>
              <div className={`flex items-center gap-1 text-sm
                ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}
              >
                {metric.change}
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm text-white/60">{metric.name}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Inventory Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Inventory Alerts</h2>
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="space-y-4">
            {inventoryAlerts.map((alert) => (
              <div
                key={alert.product}
                className="p-4 bg-white/5 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{alert.product}</h3>
                  <span className="text-sm text-yellow-400">{alert.issue}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Quantity: {alert.quantity}</span>
                  <span className="text-white/60">Demand: {alert.demand}</span>
                </div>
                <div className="text-sm text-white/80">{alert.action}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Sales by Category</h2>
            <BarChart3 className="w-5 h-5 text-white/60" />
          </div>
          <div className="space-y-4">
            {salesByCategory.map((category) => (
              <div key={category.category}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">{category.category}</span>
                  <span className="text-green-400">{category.growth}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.sales}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-blue-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Upcoming Deliveries</h2>
            <Truck className="w-5 h-5 text-white/60" />
          </div>
          <div className="space-y-4">
            {upcomingDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="p-4 bg-white/5 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{delivery.supplier}</h3>
                  <span className="text-sm text-blue-400">{delivery.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{delivery.items} items</span>
                  <span className="text-white/60">ETA: {delivery.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Customer Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Customer Insights</h2>
          <Users className="w-5 h-5 text-white/60" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerInsights.map((insight) => (
            <div
              key={insight.label}
              className="p-4 bg-white/5 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">{insight.label}</span>
                {insight.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="text-xl font-medium text-white">{insight.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 