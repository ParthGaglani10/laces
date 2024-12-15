'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'Browse Stores', href: '/stores' },
    { name: 'Latest Releases', href: '/shop' },
    { name: 'Featured Products', href: '/shop' },
    { name: 'My Reservations', href: '/account' }
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Shipping', href: '/shipping' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Partner With Us', href: '/partner' },
    { name: 'Store Locator', href: '/stores' },
    { name: 'Terms & Conditions', href: '/terms' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' }
]

const contactInfo = [
  { icon: MapPin, text: 'New York, NY 10001' },
  { icon: Phone, text: '+1 (555) 123-4567' },
  { icon: Mail, text: 'contact@laces.com' }
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="block mb-6">
              <Image
                src="/laces.jpg"
                alt="Laces"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 mb-8 pr-4">
              Your trusted platform connecting sneaker enthusiasts with authentic retailers. 
              Discover and reserve the latest releases from verified stores.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                           hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-6">Shop</h3>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-6">Support</h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400">
                  <item.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Laces. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 