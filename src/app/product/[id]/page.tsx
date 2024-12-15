'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReservations } from '@/components/Providers'
import { MapPin, Store, Shield, ChevronRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mock product data
const product = {
  id: 1,
  name: 'Nike Air Max Pulse',
  description: 'The Air Max Pulse brings a new beat to the streets, featuring Nike Air cushioning that adds a little bounce to your step.',
  price: 229,
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  colors: ['Black/White', 'White/Grey', 'Blue/Black'],
  image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  stores: [
    { id: 1, name: 'Downtown Store', location: 'New York', distance: '0.8 miles' },
    { id: 2, name: 'Brooklyn Store', location: 'Brooklyn', distance: '2.3 miles' },
    { id: 3, name: 'Queens Store', location: 'Queens', distance: '3.1 miles' }
  ],
  features: [
    {
      category: 'Design',
      items: [
        'Engineered mesh upper for enhanced breathability',
        'Synthetic overlays for added durability',
        'Padded collar for ankle comfort',
        'Pull tab for easy on and off'
      ]
    },
    {
      category: 'Comfort',
      items: [
        'Nike Air cushioning for responsive comfort',
        'Foam midsole for lightweight cushioning',
        'OrthoLite® sockliner for step-in comfort',
        'Breathable mesh lining'
      ]
    },
    {
      category: 'Performance',
      items: [
        'Rubber Waffle outsole for durable traction',
        'Flex grooves for natural movement',
        'Strategic support zones for stability',
        'Reinforced high-wear areas'
      ]
    },
    {
      category: 'Sustainability',
      items: [
        'Made with at least 20% recycled materials',
        'Environmentally preferred rubber compounds',
        'Sustainable manufacturing process',
        'Recycled packaging materials'
      ]
    }
  ]
}

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedStore, setSelectedStore] = useState<number | null>(null)
  const [isReserved, setIsReserved] = useState(false)
  const { addReservation } = useReservations()
  const router = useRouter()

  const handleReservation = () => {
    if (!selectedSize || !selectedStore) return

    const store = product.stores.find(s => s.id === selectedStore)
    if (!store) return

    addReservation({
      name: product.name,
      size: selectedSize,
      storeId: store.id,
      storeName: store.name,
      image: product.image,
      color: product.colors[0],
      price: product.price,
      reservationDate: new Date().toISOString(),
      reservationTime: '2:00 PM',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1234567890',
      notificationPreference: 'email'
    })

    setIsReserved(true)
    
    // Show success state for 2 seconds before redirecting
    setTimeout(() => {
      router.push('/reservation')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
                  <p className="text-white/60 leading-relaxed">{product.description}</p>
                  <div className="mt-4 text-2xl font-medium text-white">${product.price}</div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Select Size</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 rounded-xl border font-medium transition-all
                                ${selectedSize === size
                            ? 'bg-white text-black border-white'
                            : 'border-white/10 text-white hover:border-white'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Store Selection */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Select Store</h3>
                  <div className="space-y-3">
                    {product.stores.map((store) => (
                      <button
                        key={store.id}
                        onClick={() => setSelectedStore(store.id)}
                        className={`w-full p-4 rounded-xl border transition-all
                                ${selectedStore === store.id
                            ? 'bg-white text-black border-white'
                            : 'border-white/10 text-white hover:border-white'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Store className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-medium">{store.name}</div>
                              <div className="text-sm opacity-60">{store.location}</div>
                            </div>
                          </div>
                          <div className="text-sm opacity-60">{store.distance}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={handleReservation}
                  disabled={!selectedSize || !selectedStore || isReserved}
                  className={`w-full h-14 rounded-2xl font-medium transition-all
                           flex items-center justify-center gap-2
                           ${isReserved
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed'
                    }`}
                >
                  {isReserved ? (
                    <>
                      <Check className="w-5 h-5" />
                      Reserved Successfully
                    </>
                  ) : (
                    'Reserve Now'
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-24 py-24 border-t border-white/10"
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Shield className="w-6 h-6 text-white/60" />
                <h2 className="text-2xl font-medium text-white">Features & Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.features.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/[0.03] rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-lg font-medium text-white mb-6">{category.category}</h3>
                    <div className="space-y-4">
                      {category.items.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2" />
                          <p className="text-white/60 leading-relaxed">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
} 