'use client'

import { motion } from 'framer-motion'
import { Scale, FileText, AlertCircle, ShieldCheck, Users, Clock } from 'lucide-react'

const sections = [
  {
    title: 'Platform Usage',
    icon: Users,
    content: [
      {
        subtitle: 'Account Creation',
        text: 'You must be at least 18 years old to create an account. You are responsible for maintaining the security of your account credentials.'
      },
      {
        subtitle: 'User Conduct',
        text: 'Users must not engage in any activity that disrupts the platform or violates our community guidelines.'
      }
    ]
  },
  {
    title: 'Reservation System',
    icon: Clock,
    content: [
      {
        subtitle: 'Making Reservations',
        text: 'Reservations are subject to store availability. Users must pick up items within the specified timeframe.'
      },
      {
        subtitle: 'Cancellations',
        text: 'Reservations can be cancelled up to 24 hours before the pickup time. Repeated no-shows may result in account restrictions.'
      }
    ]
  },
  {
    title: 'Intellectual Property',
    icon: ShieldCheck,
    content: [
      {
        subtitle: 'Platform Content',
        text: 'All content on the platform, including images, text, and design elements, is protected by copyright and other intellectual property laws.'
      },
      {
        subtitle: 'User Content',
        text: 'By posting content on our platform, you grant us a non-exclusive license to use, modify, and display that content.'
      }
    ]
  },
  {
    title: 'Liability',
    icon: Scale,
    content: [
      {
        subtitle: 'Platform Services',
        text: 'We strive to maintain platform availability but cannot guarantee uninterrupted access. We are not liable for any losses resulting from platform unavailability.'
      },
      {
        subtitle: 'Store Transactions',
        text: 'L\'aces facilitates connections between users and stores. We are not responsible for store policies, product quality, or transaction disputes.'
      }
    ]
  },
  {
    title: 'Modifications',
    icon: FileText,
    content: [
      {
        subtitle: 'Terms Updates',
        text: 'We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.'
      },
      {
        subtitle: 'Service Changes',
        text: 'We reserve the right to modify, suspend, or discontinue any part of our service at any time.'
      }
    ]
  },
  {
    title: 'Termination',
    icon: AlertCircle,
    content: [
      {
        subtitle: 'Account Termination',
        text: 'We may suspend or terminate accounts that violate these terms or engage in fraudulent activity.'
      },
      {
        subtitle: 'Data Retention',
        text: 'Upon account termination, we may retain certain data as required by law or for legitimate business purposes.'
      }
    ]
  }
]

export default function TermsPage() {
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
            Terms of Service
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
            Welcome to L'aces. By accessing or using our platform, you agree to be bound by these
            Terms of Service. Please read these terms carefully before using our services.
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
                <div className="space-y-8">
                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 + itemIndex * 0.05 }}
                      className="pl-16"
                    >
                      <h3 className="text-lg font-medium text-white mb-2">{item.subtitle}</h3>
                      <p className="text-white/60">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
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
          <h2 className="text-xl font-bold text-white mb-4">Questions About Our Terms?</h2>
          <p className="text-white/60 mb-4">
            If you have any questions about these Terms of Service, please contact our legal team:
          </p>
          <ul className="space-y-2 text-white/60">
            <li>Email: legal@laces.com</li>
            <li>Phone: 1-800-LACES-LEGAL</li>
            <li>Address: 123 Sneaker Street, Fashion District, NY 10001</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
} 