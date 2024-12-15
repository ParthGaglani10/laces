'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[85%] mx-auto text-center"
          >
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold text-white leading-[1.1] tracking-tight mb-8">
              The new standard in 
              <br />
              sneaker discovery.
            </h1>
            <p className="text-[clamp(1.1rem,2vw,1.3rem)] text-white/60 max-w-2xl mx-auto mb-12">
              Connect with authentic local retailers. Reserve your favorite pairs. 
              Experience a new way to shop for sneakers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for stores or sneakers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[3.5rem] pl-12 pr-4 bg-white/5 text-white placeholder-white/30
                         rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07]
                         focus:outline-none transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
            </div>
          </motion.div>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative w-full mt-24 h-[40vh]"
        >
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80"
            alt="Featured Sneakers"
            fill
            className="object-cover object-center brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Verified Retailers', desc: 'Every store in our network is thoroughly vetted for authenticity.' },
              { title: 'Instant Reservations', desc: 'Reserve your sneakers with just a few clicks. No waiting.' },
              { title: 'Local Pickup', desc: 'Try before you buy at your local authenticated retailer.' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.01] 
                              backdrop-blur-3xl hover:bg-white/[0.03] transition-colors duration-300">
                  <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stores Preview */}
      <section className="py-32 border-t border-white/10">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[clamp(2rem,5vw,3rem)] font-bold text-white leading-tight mb-4"
                >
                  Premium stores,
                  <br />
                  curated for you.
                </motion.h2>
                <p className="text-white/60 text-lg">Discover authenticated retailers in your area</p>
              </div>
              <Link 
                href="/stores"
                className="group inline-flex items-center text-white text-lg hover:text-white/90 transition-colors"
              >
                Browse all stores
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href="/stores" className="group block">
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=80"
                        alt={`Store ${index}`}
                        fill
                        className="object-cover brightness-90 group-hover:brightness-100 
                                 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl font-medium text-white mb-2">Premium Store {index}</h3>
                        <p className="text-white/70">New York, NY</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-6">
                Ready to elevate your sneaker game?
              </h2>
              <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
                Join our platform to discover and reserve exclusive sneakers from verified local retailers.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center h-14 px-8 bg-white text-black rounded-xl
                         font-medium hover:bg-white/90 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
