'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  HelpCircle, Search, ChevronRight, MessageCircle, Mail, Phone,
  FileText, ShieldCheck, CreditCard, Package, RefreshCcw, Users
} from 'lucide-react'

// Mock data for demonstration
const faqCategories = [
  {
    title: 'Orders & Reservations',
    icon: Package,
    faqs: [
      {
        question: 'How do I make a reservation?',
        answer: 'To make a reservation, browse our collection and click the "Reserve" button on the product you want. Select your size and preferred store, then follow the checkout process.'
      },
      {
        question: 'How long are items held for pickup?',
        answer: "Items are typically held for 48 hours from the time of reservation. You'll receive a notification when your item is ready for pickup."
      }
    ]
  },
  {
    title: 'Returns & Exchanges',
    icon: RefreshCcw,
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'Our partner stores have different return policies. Generally, unworn items can be returned within 14-30 days with original receipt and packaging.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Contact the store where you made your purchase directly. They will guide you through their specific return process.'
      }
    ]
  },
  {
    title: 'Account & Security',
    icon: ShieldCheck,
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the top right corner. Fill in your details and verify your email address to complete registration.'
      },
      {
        question: 'How is my personal information protected?',
        answer: 'We use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for more details.'
      }
    ]
  },
  {
    title: 'Payments',
    icon: CreditCard,
    faqs: [
      {
        question: 'What payment methods are accepted?',
        answer: 'Payment methods vary by store. Most stores accept major credit cards, digital wallets, and contactless payments.'
      },
      {
        question: 'Is there a deposit required for reservations?',
        answer: 'Some stores may require a small deposit to hold high-demand items. This will be clearly indicated during the reservation process.'
      }
    ]
  }
]

const contactMethods = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageCircle,
    action: 'Start Chat',
    href: '#chat'
  },
  {
    title: 'Email',
    description: 'Get in touch via email',
    icon: Mail,
    action: 'Send Email',
    href: 'mailto:support@laces.com'
  },
  {
    title: 'Phone',
    description: 'Speak with a support representative',
    icon: Phone,
    action: 'Call Now',
    href: 'tel:+1234567890'
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const filteredFaqs = faqCategories.flatMap(category => 
    category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(faq => ({ ...faq, category: category.title }))
  )

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
              <HelpCircle className="w-5 h-5 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Help Center
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Find answers to common questions or get in touch with our support team
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white/[0.03] text-white rounded-2xl border 
                       border-white/10 focus:border-white/20 focus:outline-none text-lg"
            />
          </div>
        </motion.div>

        {searchQuery ? (
          // Search Results
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-xl font-medium text-white mb-6">Search Results</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === `${index}` ? null : `${index}`)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white/60 mb-2">{faq.category}</div>
                        <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-white/40 transition-transform ${
                          expandedFaq === `${index}` ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    {expandedFaq === `${index}` && (
                      <p className="mt-4 text-white/60">{faq.answer}</p>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {/* FAQ Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-24"
            >
              <h2 className="text-xl font-medium text-white mb-8">Popular Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.button
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.title ? null : category.title
                      )}
                      className={`text-left p-6 rounded-2xl border transition-colors ${
                        selectedCategory === category.title
                          ? 'bg-white text-black border-white'
                          : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          selectedCategory === category.title
                            ? 'bg-black/10'
                            : 'bg-white/[0.03]'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                          <p className={selectedCategory === category.title ? 'text-black/60' : 'text-white/60'}>
                            {category.faqs.length} articles
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {/* Selected Category FAQs */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto mb-24"
              >
                <h2 className="text-xl font-medium text-white mb-6">
                  {selectedCategory}
                </h2>
                <div className="space-y-4">
                  {faqCategories
                    .find(cat => cat.title === selectedCategory)
                    ?.faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === `${index}` ? null : `${index}`)}
                          className="w-full text-left p-6"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                            <ChevronRight
                              className={`w-5 h-5 text-white/40 transition-transform ${
                                expandedFaq === `${index}` ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                          {expandedFaq === `${index}` && (
                            <p className="mt-4 text-white/60">{faq.answer}</p>
                          )}
                        </button>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-medium text-white mb-8">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <Link
                      key={method.title}
                      href={method.href}
                      className="group p-6 bg-white/[0.03] rounded-2xl border border-white/10 
                               hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-white/[0.03]">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">{method.title}</h3>
                          <p className="text-white/60 mb-4">{method.description}</p>
                          <div className="flex items-center gap-2 text-sm text-white group-hover:gap-3 
                                      transition-all">
                            <span>{method.action}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
} 