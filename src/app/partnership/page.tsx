'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Store, Users, TrendingUp, BarChart3, ShieldCheck, Zap,
  Building2, MapPin, Mail, Send
} from 'lucide-react'

const benefits = [
  {
    title: 'Increased Visibility',
    icon: TrendingUp,
    description: 'Get discovered by thousands of sneaker enthusiasts actively looking for their next purchase.'
  },
  {
    title: 'Efficient Inventory Management',
    icon: Store,
    description: 'Our platform helps you manage reservations and inventory in real-time, reducing overhead.'
  },
  {
    title: 'Customer Insights',
    icon: BarChart3,
    description: 'Access detailed analytics about customer preferences and shopping patterns.'
  },
  {
    title: 'Secure Platform',
    icon: ShieldCheck,
    description: 'Built with enterprise-grade security to protect your business and customer data.'
  },
  {
    title: 'Community Access',
    icon: Users,
    description: 'Connect with a passionate community of sneaker enthusiasts and build brand loyalty.'
  },
  {
    title: 'Quick Integration',
    icon: Zap,
    description: 'Easy-to-use dashboard and APIs for seamless integration with your existing systems.'
  }
]

interface FormData {
  storeName: string
  contactName: string
  email: string
  phone: string
  location: string
  storeType: string
  message: string
}

export default function PartnershipPage() {
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    storeType: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 
                     flex items-center justify-center mx-auto mb-6"
          >
            <Store className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Partner With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Join our platform and connect with thousands of sneaker enthusiasts looking for
            their next pair.
          </motion.p>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold text-white mb-12 text-center">Why Partner With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-8 bg-white/[0.03] rounded-2xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 
                               flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-4">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Partnership Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/[0.03] rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-8">Get Started</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Store Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                      text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Contact Name</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                  text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                 text-white/40 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                   text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                               border-white/10 focus:border-white/20 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Store Type</label>
                  <select
                    name="storeType"
                    value={formData.storeType}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none appearance-none"
                    required
                  >
                    <option value="" disabled className="bg-black">Select store type</option>
                    <option value="retail" className="bg-black">Retail Store</option>
                    <option value="boutique" className="bg-black">Boutique</option>
                    <option value="consignment" className="bg-black">Consignment Shop</option>
                    <option value="other" className="bg-black">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-32 px-4 py-3 bg-white/[0.03] text-white rounded-xl border 
                           border-white/10 focus:border-white/20 focus:outline-none resize-none"
                  placeholder="Tell us about your store and what you're looking for in a partnership..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-white text-black rounded-xl font-medium 
                         hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 