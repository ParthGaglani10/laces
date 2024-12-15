'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star, Store, SlidersHorizontal, X } from 'lucide-react'

const filters = {
  sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  brands: ['Nike', 'Adidas', 'New Balance', 'Jordan', 'Puma'],
  colors: ['Black', 'White', 'Grey', 'Blue', 'Red'],
  price: ['Under $100', '$100-$200', '$200-$300', 'Over $300']
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSort, setSelectedSort] = useState('Popular')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Running', 'Basketball', 'Lifestyle', 'Limited Edition']
  const sortOptions = ['Popular', 'Latest', 'Price: High to Low', 'Price: Low to High']

  const products = [
    {
      id: 1,
      name: 'Air Max Pulse',
      category: 'Running',
      price: 229,
      rating: 4.8,
      reviews: 128,
      stores: 5,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80'
    },
    {
      id: 2,
      name: 'Jordan 1 Retro High',
      category: 'Basketball',
      price: 299,
      rating: 4.9,
      reviews: 256,
      stores: 3,
      image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80'
    },
    {
      id: 3,
      name: 'Yeezy Boost 350',
      category: 'Lifestyle',
      price: 349,
      rating: 4.7,
      reviews: 189,
      stores: 2,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'
    },
    {
      id: 4,
      name: 'Nike Dunk Low',
      category: 'Lifestyle',
      price: 179,
      rating: 4.6,
      reviews: 145,
      stores: 6,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    },
    {
      id: 5,
      name: 'New Balance 550',
      category: 'Lifestyle',
      price: 159,
      rating: 4.5,
      reviews: 92,
      stores: 4,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'
    },
    {
      id: 6,
      name: 'Air Jordan 4',
      category: 'Limited Edition',
      price: 399,
      rating: 4.9,
      reviews: 167,
      stores: 2,
      image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80'
    },
    {
      id: 7,
      name: 'Adidas Ultra Boost',
      category: 'Running',
      price: 249,
      rating: 4.7,
      reviews: 203,
      stores: 7,
      image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80'
    },
    {
      id: 8,
      name: 'Nike LeBron XX',
      category: 'Basketball',
      price: 279,
      rating: 4.6,
      reviews: 88,
      stores: 3,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    },
    {
      id: 9,
      name: 'Air Force 1 Low',
      category: 'Lifestyle',
      price: 149,
      rating: 4.8,
      reviews: 312,
      stores: 8,
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80'
    },
    {
      id: 10,
      name: 'Travis Scott x AJ1',
      category: 'Limited Edition',
      price: 599,
      rating: 5.0,
      reviews: 76,
      stores: 1,
      image: 'https://images.unsplash.com/photo-1556048219-bb6978360b84?w=800&q=80'
    },
    {
      id: 11,
      name: 'Nike ZoomX',
      category: 'Running',
      price: 289,
      rating: 4.7,
      reviews: 143,
      stores: 4,
      image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80'
    },
    {
      id: 12,
      name: 'Adidas Forum Low',
      category: 'Lifestyle',
      price: 169,
      rating: 4.5,
      reviews: 97,
      stores: 5,
      image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80'
    },
    {
      id: 13,
      name: 'Puma MB.01',
      category: 'Basketball',
      price: 199,
      rating: 4.6,
      reviews: 64,
      stores: 3,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80'
    },
    {
      id: 14,
      name: 'Off-White x Dunk',
      category: 'Limited Edition',
      price: 499,
      rating: 4.9,
      reviews: 82,
      stores: 2,
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80'
    },
    {
      id: 15,
      name: 'New Balance 2002R',
      category: 'Lifestyle',
      price: 189,
      rating: 4.7,
      reviews: 108,
      stores: 4,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80'
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[85%] mx-auto text-center"
          >
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Discover Premium Sneakers
            </h1>
            <p className="text-[clamp(1.1rem,2vw,1.25rem)] text-white/60 max-w-2xl mx-auto mb-8">
              Browse and reserve the latest releases from verified local retailers.
            </p>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 px-6 bg-white/5 text-white placeholder-white/40
                         rounded-xl border border-white/10 focus:border-white/20 focus:outline-none
                         focus:bg-white/[0.07] transition-all text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Navigation */}
      <div className="sticky top-20 z-40">
        {/* Navigation Bar */}
        <section className="bg-black/80 backdrop-blur-xl border-t border-b border-white/10">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort & Filter */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Sort by: {selectedSort}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 
                                  rounded-lg overflow-hidden">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedSort(option)
                            setShowSortDropdown(false)
                          }}
                          className="w-full px-4 py-2 text-sm text-left text-white/60 hover:text-white 
                                   hover:bg-white/5 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    showFilters || activeFilters.length > 0
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      showFilters ? 'bg-black text-white' : 'bg-black/90 text-white'
                    }`}>
                      {activeFilters.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative bg-black/95 backdrop-blur-xl border-b border-white/10"
            >
              <div className="container py-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-medium text-white">Filters</h3>
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => setActiveFilters([])}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {Object.entries(filters).map(([category, options]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 group cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters.includes(option)}
                              onChange={() => toggleFilter(option)}
                              className="w-4 h-4 rounded border border-white/20 bg-transparent
                                       checked:bg-white checked:border-white focus:ring-0
                                       focus:ring-offset-0 transition-colors"
                            />
                            <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/product/${product.id}`} className="group block">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover brightness-90 group-hover:brightness-100 
                               transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between text-white/90 mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-white/60">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                          <Store className="w-4 h-4" />
                          <span>{product.stores} stores</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 group-hover:text-white/90 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">{product.category}</span>
                      <span className="text-white font-medium">${product.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-white mb-6">
                Never Miss a Drop
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Get notified about new releases and exclusive offers from our verified retailers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow h-12 px-4 bg-white/5 text-white placeholder-white/30
                           rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07]
                           focus:outline-none transition-all"
                />
                <button className="h-12 px-8 bg-white text-black rounded-xl font-medium 
                                 hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 