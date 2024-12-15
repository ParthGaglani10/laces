'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Shield, ArrowRight } from 'lucide-react'

const partnerStores = [
  {
    id: 1,
    name: 'Downtown Sneakers',
    location: 'San Francisco',
    area: 'Financial District',
    rating: 4.8,
    reviews: 128,
    partneredSince: '2022',
    availableModels: 156,
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=80',
    description: 'Premium sneaker boutique featuring exclusive releases and limited editions.',
    verifiedPartner: true
  },
  {
    id: 2,
    name: 'SoHo Kicks',
    location: 'New York',
    area: 'SoHo',
    rating: 4.9,
    reviews: 256,
    partneredSince: '2021',
    availableModels: 203,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    description: 'Curated collection of designer sneakers in the heart of SoHo.',
    verifiedPartner: true
  },
  {
    id: 3,
    name: 'Sunset Footwear',
    location: 'Los Angeles',
    area: 'Venice Beach',
    rating: 4.7,
    reviews: 184,
    partneredSince: '2023',
    availableModels: 98,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    description: 'West coast sneaker culture meets modern streetwear.',
    verifiedPartner: true
  },
  {
    id: 4,
    name: 'Michigan Avenue Shoes',
    location: 'Chicago',
    area: 'Magnificent Mile',
    rating: 4.6,
    reviews: 142,
    partneredSince: '2022',
    availableModels: 167,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Luxury sneaker destination with personalized shopping experience.',
    verifiedPartner: true
  }
]

export default function Stores() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const locations = ['San Francisco', 'New York', 'Los Angeles', 'Chicago']

  const filteredStores = partnerStores.filter(store => {
    const matchesSearch = searchQuery === '' || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.area.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = !selectedLocation || store.location === selectedLocation
    
    return matchesSearch && matchesLocation
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-[85%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-tight mb-4">
                Find Your Perfect <span className="text-white/60">Sneaker Store</span>
              </h1>
              <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] text-white/60 max-w-2xl mx-auto">
                Connect with our curated network of premium retailers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search by store name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 px-6 bg-white/5 text-white placeholder-white/40
                           rounded-xl border border-white/10 focus:border-white/20 focus:outline-none
                           focus:bg-white/[0.07] transition-all text-base"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(selectedLocation === location ? null : location)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedLocation === location
                        ? 'bg-white text-black font-medium scale-105'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={`/store/${store.id}`} className="group block h-full">
                  <div className="relative bg-white/[0.03] rounded-3xl overflow-hidden border border-white/10
                              hover:bg-white/[0.05] transition-all duration-500 h-full flex flex-col">
                    <div className="relative w-full aspect-[2/1] overflow-hidden">
                      <Image
                        src={store.image}
                        alt={store.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {store.verifiedPartner && (
                        <div className="absolute top-6 right-6 px-4 py-2 bg-white text-black
                                     text-sm font-medium rounded-xl flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Verified Partner
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-medium text-white mb-2 group-hover:text-white/90">
                            {store.name}
                          </h2>
                          <p className="text-white/60 line-clamp-2">{store.description}</p>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <div className="flex items-center gap-1 text-white mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{store.rating}</span>
                          </div>
                          <span className="text-sm text-white/60">({store.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/60">
                          <MapPin className="w-4 h-4" />
                          <span>{store.area}, {store.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white group-hover:translate-x-1 transition-transform shrink-0">
                          <span>{store.availableModels} models</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
} 