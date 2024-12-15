'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-md w-full space-y-12">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/laces.jpg"
                alt="Laces"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Header */}
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white"
            >
              Welcome back
            </motion.h2>
            <p className="mt-2 text-white/60">
              Don't have an account?{' '}
              <Link href="/signup" className="text-white hover:text-white/80 transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl 
                           border border-white/10 focus:border-white/20 focus:outline-none 
                           transition-colors"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl 
                           border border-white/10 focus:border-white/20 focus:outline-none 
                           transition-colors"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 rounded border-white/10 bg-white/[0.03] text-white 
                           focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/60">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-white/60 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-white text-black rounded-xl font-medium 
                       hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              Sign in
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-white/60">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="h-12 bg-white/[0.03] text-white rounded-xl font-medium 
                         hover:bg-white/[0.06] transition-colors flex items-center 
                         justify-center gap-2 border border-white/10"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Google
              </button>
              <button
                type="button"
                className="h-12 bg-white/[0.03] text-white rounded-xl font-medium 
                         hover:bg-white/[0.06] transition-colors flex items-center 
                         justify-center gap-2 border border-white/10"
              >
                <Image src="/apple.svg" alt="Apple" width={20} height={20} />
                Apple
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1400&q=80"
          alt="Sneakers"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
      </div>
    </div>
  )
} 