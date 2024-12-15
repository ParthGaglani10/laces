'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, ChevronDown, MoreVertical, Mail,
  Phone, MapPin, Calendar, ArrowUpDown
} from 'lucide-react'

// Mock data for customers
const customers = [
  {
    id: 1,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2023-10-15',
    orders: 12,
    totalSpent: 2450,
    status: 'active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    joinDate: '2023-09-20',
    orders: 8,
    totalSpent: 1850,
    status: 'active'
  },
  {
    id: 3,
    name: 'David Williams',
    email: 'david.w@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    joinDate: '2023-11-05',
    orders: 5,
    totalSpent: 980,
    status: 'inactive'
  },
  // Add more mock customers as needed
]

const statusColors = {
  active: 'bg-green-400/10 text-green-400',
  inactive: 'bg-yellow-400/10 text-yellow-400'
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' })
  const [selectedStatus, setSelectedStatus] = useState('all')

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const key = sortConfig.key as keyof typeof customers[0]
      if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Customers</h1>
        <p className="text-white/60">Manage and view customer information</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white/[0.03] text-white rounded-lg border 
                       border-white/10 focus:border-white/20 focus:outline-none focus:bg-white/[0.05]"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-11 pl-4 pr-10 bg-white/[0.03] text-white rounded-lg border appearance-none
                       border-white/10 focus:border-white/20 focus:outline-none focus:bg-white/[0.05]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-white/60">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 hover:text-white"
                  >
                    Customer
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">
                  <button
                    onClick={() => handleSort('joinDate')}
                    className="flex items-center gap-2 hover:text-white"
                  >
                    Join Date
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-medium text-white/60">
                  <button
                    onClick={() => handleSort('orders')}
                    className="flex items-center gap-2 hover:text-white"
                  >
                    Orders
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-medium text-white/60">
                  <button
                    onClick={() => handleSort('totalSpent')}
                    className="flex items-center gap-2 hover:text-white"
                  >
                    Total Spent
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{customer.name}</div>
                      <div className="text-sm text-white/60">{customer.location}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4" />
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 text-white">{customer.orders}</td>
                  <td className="p-4 text-white">${customer.totalSpent.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[customer.status as keyof typeof statusColors]}`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-white/[0.03] rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-white/60" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 