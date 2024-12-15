'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

const sections = [
  {
    title: 'Information We Collect',
    icon: Eye,
    content: [
      'Personal Information: Name, email address, phone number, and shipping address when you create an account or make a reservation.',
      'Usage Data: Information about how you interact with our platform, including browsing history, search queries, and device information.',
      'Location Data: Store preferences and approximate location for better service delivery.',
      'Payment Information: We do not store complete payment information, only the last four digits of payment methods for reference.'
    ]
  },
  {
    title: 'How We Use Your Information',
    icon: FileText,
    content: [
      'To process your reservations and manage your account',
      'To personalize your shopping experience and provide relevant recommendations',
      'To communicate with you about your reservations, account, and platform updates',
      'To improve our services and develop new features',
      'To prevent fraud and maintain platform security'
    ]
  },
  {
    title: 'Data Security',
    icon: Lock,
    content: [
      'Industry-standard encryption for all data transmission',
      'Regular security audits and vulnerability assessments',
      'Strict access controls and employee data handling policies',
      'Secure data storage with regular backups',
      'Immediate response protocols for potential security incidents'
    ]
  },
  {
    title: 'Your Rights',
    icon: Shield,
    content: [
      'Access your personal information',
      'Request corrections to your data',
      'Delete your account and associated data',
      'Opt-out of marketing communications',
      'Export your data in a portable format'
    ]
  }
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Last updated: December 2023
          </motion.p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <p className="text-white/60">
            At L'aces, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, and protect your personal information when you use our platform. By using our
            services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 
                               flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <ul className="space-y-4 text-white/60">
                  {section.content.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 + itemIndex * 0.05 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-white/[0.03] rounded-2xl border border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-white/60 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="space-y-2 text-white/60">
            <li>Email: privacy@laces.com</li>
            <li>Phone: 1-800-LACES</li>
            <li>Address: 123 Sneaker Street, Fashion District, NY 10001</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
} 