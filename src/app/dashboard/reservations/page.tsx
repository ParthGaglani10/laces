'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Search, Filter, Calendar, Clock, User, Package,
  CheckCircle, XCircle, ChevronDown, AlertCircle
} from 'lucide-react'

interface Reservation {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
  }
  product: {
    name: string
    image: string
    price: number
  }
  status: 'Pending' | 'Confirmed' | 'Ready' | 'Picked Up' | 'Cancelled'
  date: string
  pickupTime: string
  createdAt: string
}

const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    customer: {
      name: "John Smith",
      email: "john@example.com",
      avatar: "/avatars/user1.jpg"
    },
    product: {
      name: "Nike Air Max 90",
      image: "/products/airmax90.jpg",
      price: 129.99
    },
    status: "Ready",
    date: "2023-12-15",
    pickupTime: "2:00 PM",
    createdAt: "2023-12-14 10:30 AM"
  },
  {
    id: "RES-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/avatars/user2.jpg"
    },
    product: {
      name: "Adidas Ultra Boost",
      image: "/products/ultraboost.jpg",
      price: 179.99
    },
    status: "Pending",
    date: "2023-12-16",
    pickupTime: "3:30 PM",
    createdAt: "2023-12-14 11:45 AM"
  },
  {
    id: "RES-003",
    customer: {
      name: "Michael Chen",
      email: "michael@example.com",
      avatar: "/avatars/user3.jpg"
    },
    product: {
      name: "Jordan 1 High OG",
      image: "/products/jordan1.jpg",
      price: 169.99
    },
    status: "Picked Up",
    date: "2023-12-14",
    pickupTime: "1:00 PM",
    createdAt: "2023-12-13 09:15 AM"
  }
]

const filters = {
  status: ["All Status", "Pending", "Confirmed", "Ready", "Picked Up", "Cancelled"],
  date: ["All Dates", "Today", "Tomorrow", "This Week", "Next Week"]
}

export default function ReservationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    status: "All Status",
    date: "All Dates"
  })

  const filteredReservations = mockReservations.filter(reservation => {
    const matchesSearch = reservation.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reservation.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedFilters.status === "All Status" || 
                         reservation.status === selectedFilters.status
    // Date filtering would need more complex logic based on actual requirements

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-500/10"
      case "Confirmed":
        return "text-blue-500 bg-blue-500/10"
      case "Ready":
        return "text-green-500 bg-green-500/10"
      case "Picked Up":
        return "text-purple-500 bg-purple-500/10"
      case "Cancelled":
        return "text-red-500 bg-red-500/10"
    }
  }

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
            Reservations
          </motion.h1>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                       border-white/10 focus:border-white/20 focus:outline-none"
            />
          </div>
          {Object.entries(filters).map(([key, options]) => (
            <div key={key} className="relative">
              <select
                value={selectedFilters[key as keyof typeof selectedFilters]}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                         border-white/10 focus:border-white/20 focus:outline-none appearance-none"
              >
                {options.map((option) => (
                  <option key={option} value={option} className="bg-black">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 
                                  text-white/40 w-5 h-5 pointer-events-none" />
            </div>
          ))}
        </motion.div>

        {/* Reservations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white/[0.03] rounded-2xl border border-white/10 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 
                               relative overflow-hidden">
                    <Image
                      src={reservation.customer.avatar}
                      alt={reservation.customer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{reservation.customer.name}</div>
                    <div className="text-sm text-white/60">{reservation.customer.email}</div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/10 
                               relative overflow-hidden">
                    <Image
                      src={reservation.product.image}
                      alt={reservation.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{reservation.product.name}</div>
                    <div className="text-sm text-white/60">${reservation.product.price}</div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Reservation ID</div>
                    <div className="font-medium text-white">{reservation.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Pickup Date</div>
                    <div className="font-medium text-white">{reservation.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Pickup Time</div>
                    <div className="font-medium text-white">{reservation.pickupTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Status</div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm 
                                 ${getStatusColor(reservation.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {reservation.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {reservation.status === "Pending" && (
                    <>
                      <button className="p-2 text-green-500 hover:text-green-400 transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-400 transition-colors">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {reservation.status === "Confirmed" && (
                    <button className="px-4 py-2 bg-green-500 text-white rounded-xl 
                                   hover:bg-green-400 transition-colors text-sm">
                      Mark as Ready
                    </button>
                  )}
                  {reservation.status === "Ready" && (
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-xl 
                                   hover:bg-purple-400 transition-colors text-sm">
                      Complete Pickup
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredReservations.length === 0 && (
            <div className="py-12 text-center">
              <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No reservations found</h3>
              <p className="text-white/60">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Pending Reservations Alert */}
        {mockReservations.some(r => r.status === "Pending") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 
                     flex items-center gap-4"
          >
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-500">Pending Reservations</h3>
              <p className="text-sm text-yellow-500/80">
                You have pending reservations that need attention.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 