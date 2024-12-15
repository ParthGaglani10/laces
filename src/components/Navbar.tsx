'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Store, ShoppingBag, Bell, User, ChevronDown,
  Heart, Search, Menu, X, Home, Calendar,
  Newspaper, Users, HelpCircle, Info
} from 'lucide-react'

const mainNavigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop', href: '/shop', icon: ShoppingBag },
  { name: 'Stores', href: '/stores', icon: Store },
  { name: 'New Releases', href: '/releases', icon: Calendar }
]

const dropdownMenus = {
  discover: {
    label: 'Discover',
    items: [
      { name: 'Blog', href: '/blog', icon: Newspaper },
      { name: 'Community', href: '/community', icon: Users },
      { name: 'Support', href: '/support', icon: HelpCircle },
      { name: 'About', href: '/about', icon: Info }
    ]
  }
}

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleDropdownClick = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="relative">
        {/* Main Navbar */}
        <nav className="container h-20">
          <div className="flex items-center justify-between h-full gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-8 h-8">
                <Image
                  src="/laces.jpg"
                  alt="Laces"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 flex-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
                             ${isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Discover Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownClick('discover')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
                           ${openDropdown === 'discover'
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                    }`}
                >
                  <span>Discover</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200
                                      ${openDropdown === 'discover' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === 'discover' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full pt-2 right-0"
                    >
                      <div className="w-48 bg-black border border-white/10 rounded-lg overflow-hidden">
                        {dropdownMenus.discover.items.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors
                                     ${isActive
                                  ? 'text-white bg-white/10'
                                  : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                                }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Reservations */}
              <Link
                href="/reservation"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-white/60 
                         hover:text-white rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden lg:inline">Reservations</span>
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Notifications */}
              <Link
                href="/notifications"
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                </div>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-black 
                         rounded-lg hover:bg-white/90 transition-colors ml-2"
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">Account</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 lg:hidden text-white/60 hover:text-white rounded-lg 
                         hover:bg-white/[0.03] transition-colors ml-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 border-t border-white/10 bg-black"
            >
              <div className="container py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for sneakers or stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-lg 
                             border border-white/10 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden fixed inset-x-0 top-20 bg-black border-t border-white/10"
            >
              <div className="container py-4">
                <nav className="space-y-1">
                  {mainNavigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                ${isActive
                            ? 'text-white bg-white/10'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                  {dropdownMenus.discover.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                ${isActive
                            ? 'text-white bg-white/10'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 