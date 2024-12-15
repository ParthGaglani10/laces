'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock, ChevronRight, Tag, Search } from 'lucide-react'

// Mock data for demonstration
const mockArticles = [
  {
    id: 1,
    title: 'The Evolution of Sneaker Culture',
    excerpt: 'From athletic gear to fashion statement: How sneakers became a cultural phenomenon.',
    image: '/blog/sneaker-culture.jpg',
    category: 'Culture',
    readTime: '5 min read',
    date: 'Dec 1, 2023',
    featured: true
  },
  {
    id: 2,
    title: 'Sustainable Footwear: A Step Towards the Future',
    excerpt: 'Exploring eco-friendly innovations in sneaker manufacturing and design.',
    image: '/blog/sustainable-footwear.jpg',
    category: 'Innovation',
    readTime: '7 min read',
    date: 'Nov 28, 2023',
    featured: true
  },
  {
    id: 3,
    title: 'Care Guide: Making Your Sneakers Last Longer',
    excerpt: 'Expert tips and tricks for maintaining your favorite pairs in pristine condition.',
    image: '/blog/sneaker-care.jpg',
    category: 'Guides',
    readTime: '4 min read',
    date: 'Nov 25, 2023',
    featured: false
  },
  {
    id: 4,
    title: 'The Rise of Limited Edition Collaborations',
    excerpt: 'How exclusive partnerships are reshaping the sneaker industry.',
    image: '/blog/collaborations.jpg',
    category: 'Industry',
    readTime: '6 min read',
    date: 'Nov 22, 2023',
    featured: false
  },
  {
    id: 5,
    title: 'Sneaker Photography: Capturing the Perfect Shot',
    excerpt: 'Professional tips for showcasing your collection on social media.',
    image: '/blog/photography.jpg',
    category: 'Guides',
    readTime: '5 min read',
    date: 'Nov 20, 2023',
    featured: false
  },
  {
    id: 6,
    title: 'The Psychology of Sneaker Collecting',
    excerpt: 'Understanding the passion and motivation behind building a collection.',
    image: '/blog/collecting.jpg',
    category: 'Culture',
    readTime: '8 min read',
    date: 'Nov 18, 2023',
    featured: false
  }
]

const categories = [
  { name: 'All', count: mockArticles.length },
  { name: 'Culture', count: mockArticles.filter(a => a.category === 'Culture').length },
  { name: 'Innovation', count: mockArticles.filter(a => a.category === 'Innovation').length },
  { name: 'Guides', count: mockArticles.filter(a => a.category === 'Guides').length },
  { name: 'Industry', count: mockArticles.filter(a => a.category === 'Industry').length }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredArticles = mockArticles.filter(article => article.featured)
  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch && !article.featured
  })

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
              <BookOpen className="w-5 h-5 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Blog
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Discover stories, guides, and insights about sneaker culture
          </motion.p>
        </div>

        {/* Featured Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group relative aspect-[16/10] overflow-hidden rounded-3xl"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 
                           to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <span>{article.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 
                             transition-colors">
                  {article.title}
                </h2>
                <p className="text-white/60">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                text-white/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                           border-white/10 focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-white text-black border-white'
                      : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="aspect-[16/10] relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{article.category}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-white/80 
                             transition-colors">
                  {article.title}
                </h3>
                <p className="text-white/60 mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-white group-hover:gap-3 
                             transition-all">
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 