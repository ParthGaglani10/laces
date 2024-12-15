'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Filter, Trash2, Store, Tag, ChevronDown } from 'lucide-react'

// Mock data for demonstration
const mockWishlist = [
  {
    id: 1,
    name: 'Air Jordan 1 High OG',
    store: 'Nike Store Downtown',
    price: 180,
    originalPrice: 180,
    image: '/products/jordan1.jpg',
    inStock: true,
    brand: 'Nike',
    category: 'Sneakers'
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 21',
    store: 'Adidas Flagship Store',
    price: 160,
    originalPrice: 180,
    image: '/products/ultraboost.jpg',
    inStock: true,
    brand: 'Adidas',
    category: 'Running'
  },
  {
    id: 3,
    name: 'New Balance 990v5',
    store: 'Foot Locker',
    price: 175,
    originalPrice: 185,
    image: '/products/nb990.jpg',
    inStock: false,
    brand: 'New Balance',
    category: 'Lifestyle'
  },
  {
    id: 4,
    name: 'Nike Air Max 90',
    store: 'Nike Store Downtown',
    price: 120,
    originalPrice: 130,
    image: '/products/airmax90.jpg',
    inStock: true,
    brand: 'Nike',
    category: 'Lifestyle'
  }
]

const filterOptions = {
  brands: ['All Brands', 'Nike', 'Adidas', 'New Balance'],
  categories: ['All Categories', 'Sneakers', 'Running', 'Lifestyle'],
  stores: ['All Stores', 'Nike Store Downtown', 'Adidas Flagship Store', 'Foot Locker'],
  availability: ['All Items', 'In Stock', 'Price Drops']
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlist)
  const [filters, setFilters] = useState({
    brand: 'All Brands',
    category: 'All Categories',
    store: 'All Stores',
    availability: 'All Items'
  })

  const filteredItems = wishlist.filter(item => {
    if (filters.brand !== 'All Brands' && item.brand !== filters.brand) return false
    if (filters.category !== 'All Categories' && item.category !== filters.category) return false
    if (filters.store !== 'All Stores' && item.store !== filters.store) return false
    if (filters.availability === 'In Stock' && !item.inStock) return false
    if (filters.availability === 'Price Drops' && item.price >= item.originalPrice) return false
    return true
  })

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 
                       flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Wishlist
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Keep track of items you want to reserve later
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-white/60" />
            <h2 className="text-lg font-medium text-white">Filters</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} className="relative">
                <select
                  value={filters[key as keyof typeof filters]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                  className="w-full h-12 pl-4 pr-10 bg-white/[0.03] text-white rounded-xl border 
                           border-white/10 focus:border-white/20 focus:outline-none appearance-none"
                >
                  {options.map((option) => (
                    <option key={option} value={option} className="bg-black">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 
                                    w-5 h-5 text-white/40 pointer-events-none" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredItems.length === 0 ? (
            <div className="text-center py-24">
              <Heart className="w-16 h-16 text-white/20 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
              <p className="text-white/60 mb-8">
                Start adding items you'd like to reserve later
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-12 px-8 font-medium 
                         text-black bg-white rounded-xl hover:bg-white/90 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative bg-white/[0.03] rounded-2xl border border-white/10 
                           overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/60 
                               hover:text-white backdrop-blur-sm transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                      <Store className="w-4 h-4" />
                      <span>{item.store}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-medium text-white">
                          ${item.price}
                        </div>
                        {item.price < item.originalPrice && (
                          <div className="flex items-center gap-1 text-sm">
                            <Tag className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">
                              Save ${item.originalPrice - item.price}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`text-sm ${item.inStock ? 'text-green-500' : 'text-red-500'}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/product/${item.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${item.name}`}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 