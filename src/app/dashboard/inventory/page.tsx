'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Search, Filter, Plus, Edit2, Trash2, MoreVertical,
  ChevronDown, Package, AlertCircle
} from 'lucide-react'

interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  stock: number
  image: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const mockProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "Sneakers",
    price: 129.99,
    stock: 15,
    image: "/products/airmax90.jpg",
    status: "In Stock"
  },
  {
    id: "PRD-002",
    name: "Adidas Ultra Boost",
    brand: "Adidas",
    category: "Running",
    price: 179.99,
    stock: 3,
    image: "/products/ultraboost.jpg",
    status: "Low Stock"
  },
  {
    id: "PRD-003",
    name: "Jordan 1 High OG",
    brand: "Nike",
    category: "Basketball",
    price: 169.99,
    stock: 0,
    image: "/products/jordan1.jpg",
    status: "Out of Stock"
  }
]

const filters = {
  brands: ["All Brands", "Nike", "Adidas", "Jordan", "New Balance"],
  categories: ["All Categories", "Sneakers", "Running", "Basketball", "Lifestyle"],
  status: ["All Status", "In Stock", "Low Stock", "Out of Stock"]
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    brand: "All Brands",
    category: "All Categories",
    status: "All Status"
  })

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedFilters.brand === "All Brands" || product.brand === selectedFilters.brand
    const matchesCategory = selectedFilters.category === "All Categories" || 
                          product.category === selectedFilters.category
    const matchesStatus = selectedFilters.status === "All Status" || product.status === selectedFilters.status

    return matchesSearch && matchesBrand && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "text-green-500 bg-green-500/10"
      case "Low Stock":
        return "text-yellow-500 bg-yellow-500/10"
      case "Out of Stock":
        return "text-red-500 bg-red-500/10"
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            Inventory
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl 
                     font-medium hover:bg-white/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </motion.button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
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

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Product</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Brand</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Stock</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/10">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 
                                    relative overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white">{product.name}</div>
                          <div className="text-sm text-white/60">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">{product.brand}</td>
                    <td className="py-4 px-6 text-white">{product.category}</td>
                    <td className="py-4 px-6 text-white">${product.price}</td>
                    <td className="py-4 px-6 text-white">{product.stock}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full 
                                   text-sm ${getStatusColor(product.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-white/60 hover:text-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-white/60 hover:text-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-white/60 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
              <p className="text-white/60">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Low Stock Alert */}
        {mockProducts.some(p => p.status === "Low Stock") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 
                     flex items-center gap-4"
          >
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-500">Low Stock Alert</h3>
              <p className="text-sm text-yellow-500/80">
                Some products are running low on stock. Consider restocking soon.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 