'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Users, ShoppingBag, Shield, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community First',
    description: 'Building connections between sneaker enthusiasts and trusted local retailers.'
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: 'Verified Retailers',
    description: 'Every store in our network is carefully vetted to ensure authentic products.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure Platform',
    description: 'Safe and transparent transactions between customers and stores.'
  }
]

const stats = [
  { number: '50+', label: 'Partner Stores' },
  { number: '10K+', label: 'Active Users' },
  { number: '25K+', label: 'Products Listed' }
]

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-24 pb-16 overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[85%] mx-auto text-center"
          >
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Connecting Sneaker <br />
              <span className="text-white/60">Lovers with Stores</span>
            </h1>
            <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] text-white/60 max-w-2xl mx-auto">
              We're building the future of sneaker shopping by bridging the gap between 
              passionate collectors and trusted local retailers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/10
                          hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="text-white/60 group-hover:text-white transition-colors mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1920&q=80"
                alt="Sneaker store"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Join our community of sneaker enthusiasts and discover the best local stores near you.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/stores"
                  className="inline-flex items-center px-8 py-4 bg-white text-black rounded-xl text-lg font-medium
                           hover:bg-white/90 transition-colors gap-2"
                >
                  Find Stores
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-medium
                           hover:bg-white/10 transition-colors border border-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white/[0.03] rounded-3xl p-12 border border-white/10"
            >
              <div className="text-center mb-8">
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white mb-4">
                  Stay in the Loop
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Subscribe to our newsletter for exclusive drops, special offers, and the latest from your favorite stores.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow h-12 px-6 bg-white/5 text-white placeholder-white/30
                           rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07]
                           focus:outline-none transition-all text-base"
                />
                <button 
                  className="h-12 px-8 bg-white text-black rounded-xl font-medium 
                           hover:bg-white/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>

              <p className="text-sm text-white/40 text-center mt-6">
                By subscribing, you agree to receive marketing communications from us.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 