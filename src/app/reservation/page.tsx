'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReservations } from '@/components/Providers'
import { Clock, MapPin, X, ChevronDown, AlertCircle, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const filters = {
  status: ["All Status", "pending", "confirmed", "ready", "picked_up", "cancelled", "expired"],
  date: ["All Dates", "Today", "This Week", "This Month"]
}

export default function ReservationPage() {
  const { 
    reservations, 
    removeReservation, 
    cancelReservation, 
    confirmReservation,
    markAsReady,
    markAsPickedUp,
    getActiveReservations,
    getPendingReservations
  } = useReservations()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    status: "All Status",
    date: "All Dates"
  })

  const activeReservations = getActiveReservations()
  const pendingReservations = getPendingReservations()

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.storeName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedFilters.status === "All Status" || 
                         reservation.status === selectedFilters.status

    const matchesDate = selectedFilters.date === "All Dates" || (() => {
      const reservationDate = new Date(reservation.reservationDate)
      const today = new Date()
      
      switch (selectedFilters.date) {
        case "Today":
          return reservationDate.toDateString() === today.toDateString()
        case "This Week":
          const weekAgo = new Date(today.setDate(today.getDate() - 7))
          return reservationDate >= weekAgo
        case "This Month":
          return reservationDate.getMonth() === today.getMonth() &&
                 reservationDate.getFullYear() === today.getFullYear()
        default:
          return true
      }
    })()

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10"
      case "confirmed":
        return "text-blue-500 bg-blue-500/10"
      case "ready":
        return "text-green-500 bg-green-500/10"
      case "picked_up":
        return "text-purple-500 bg-purple-500/10"
      case "cancelled":
        return "text-red-500 bg-red-500/10"
      case "expired":
        return "text-gray-500 bg-gray-500/10"
      default:
        return "text-white/60 bg-white/5"
    }
  }

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 
                        flex items-center justify-center mx-auto mb-8"
            >
              <Clock className="w-12 h-12 text-white/40" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4">No Active Reservations</h1>
            <p className="text-white/60 mb-8">
              You haven't made any reservations yet. Browse our collection and reserve your favorite sneakers.
            </p>
            <Link
              href="/shop"
              className="inline-flex px-8 py-4 bg-white text-black rounded-xl font-medium
                       hover:bg-white/90 transition-colors"
            >
              Browse Sneakers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Your Reservations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Manage and track your sneaker reservations across all stores
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
            <div className="text-sm text-white/60 mb-2">Total Reservations</div>
            <div className="text-3xl font-bold text-white">{reservations.length}</div>
          </div>
          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
            <div className="text-sm text-white/60 mb-2">Active Reservations</div>
            <div className="text-3xl font-bold text-white">{activeReservations.length}</div>
          </div>
          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
            <div className="text-sm text-white/60 mb-2">Pending Approval</div>
            <div className="text-3xl font-bold text-white">{pendingReservations.length}</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {filteredReservations.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/[0.03] rounded-2xl p-6 border border-white/10"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Product Image */}
                <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">{item.name}</h3>
                      <div className="space-x-4 text-white/60">
                        <span>Size: US {item.size}</span>
                        <span>{item.color}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                      <button
                        onClick={() => removeReservation(item.id)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin className="w-4 h-4" />
                      <span>{item.storeName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      <span>Reserved on {new Date(item.reservationDate).toLocaleDateString()}</span>
                    </div>
                    {item.reservationTime && (
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock className="w-4 h-4" />
                        <span>Pickup at {item.reservationTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.status === 'pending' && (
                      <>
                        <button
                          onClick={() => confirmReservation(item.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm
                                   hover:bg-blue-400 transition-colors"
                        >
                          Confirm Reservation
                        </button>
                        <button
                          onClick={() => cancelReservation(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm
                                   hover:bg-red-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {item.status === 'confirmed' && (
                      <button
                        onClick={() => markAsReady(item.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm
                                 hover:bg-green-400 transition-colors"
                      >
                        Mark as Ready
                      </button>
                    )}
                    {item.status === 'ready' && (
                      <button
                        onClick={() => markAsPickedUp(item.id)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-xl text-sm
                                 hover:bg-purple-400 transition-colors"
                      >
                        Complete Pickup
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredReservations.length === 0 && (
            <div className="py-12 text-center">
              <Filter className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No reservations found</h3>
              <p className="text-white/60">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Pending Reservations Alert */}
        {pendingReservations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 
                     flex items-center gap-4"
          >
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-500">Pending Reservations</h3>
              <p className="text-sm text-yellow-500/80">
                You have {pendingReservations.length} pending reservation{pendingReservations.length !== 1 ? 's' : ''} that need{pendingReservations.length === 1 ? 's' : ''} attention
              </p>
            </div>
          </motion.div>
        )}

        {/* Browse More */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex px-8 py-4 bg-white text-black rounded-xl font-medium
                     hover:bg-white/90 transition-colors"
          >
            Browse More Sneakers
          </Link>
        </div>
      </div>
    </div>
  )
} 