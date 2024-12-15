'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, MessageSquare, Calendar, Heart, Share2, Filter, 
  MapPin, Clock, ChevronDown, Search 
} from 'lucide-react'

// Mock data for demonstration
const mockDiscussions = [
  {
    id: 1,
    title: "What's your favorite Air Jordan colorway of all time?",
    author: {
      name: 'Michael Chen',
      avatar: '/avatars/user1.jpg'
    },
    category: 'Discussion',
    replies: 48,
    likes: 156,
    timeAgo: '2 hours ago',
    preview: 'The Chicago colorway will always be iconic, but I\'m curious to hear about other favorites...'
  },
  {
    id: 2,
    title: 'Tips for camping out for limited releases',
    author: {
      name: 'Sarah Johnson',
      avatar: '/avatars/user2.jpg'
    },
    category: 'Guide',
    replies: 35,
    likes: 92,
    timeAgo: '5 hours ago',
    preview: 'After years of experience, here are my top tips for making the most of release day...'
  }
]

const mockEvents = [
  {
    id: 1,
    title: 'NYC Sneaker Exchange',
    image: '/events/sneaker-exchange.jpg',
    date: 'Mar 15, 2024',
    time: '11:00 AM - 6:00 PM',
    location: 'Brooklyn, NY',
    attendees: 234,
    featured: true
  },
  {
    id: 2,
    title: 'Sneaker Photography Workshop',
    image: '/events/workshop.jpg',
    date: 'Mar 20, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Los Angeles, CA',
    attendees: 45,
    featured: true
  }
]

const mockSpotlight = [
  {
    id: 1,
    title: 'Collection Showcase',
    author: {
      name: 'David Park',
      avatar: '/avatars/user3.jpg'
    },
    image: '/spotlight/collection.jpg',
    likes: 892,
    comments: 124,
    timeAgo: '1 day ago'
  },
  {
    id: 2,
    title: 'Custom Air Force 1',
    author: {
      name: 'Emma Wilson',
      avatar: '/avatars/user4.jpg'
    },
    image: '/spotlight/custom.jpg',
    likes: 567,
    comments: 89,
    timeAgo: '2 days ago'
  }
]

const categories = [
  { name: 'All', count: 156 },
  { name: 'Discussion', count: 84 },
  { name: 'Guide', count: 32 },
  { name: 'Review', count: 28 },
  { name: 'News', count: 12 }
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

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
              <Users className="w-5 h-5 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Community
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Connect with fellow sneaker enthusiasts
          </motion.p>
        </div>

        {/* Featured Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-white/60" />
              <h2 className="text-xl font-medium text-white">Upcoming Events</h2>
            </div>
            <Link
              href="/community/events"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              View All Events
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {mockEvents.map((event) => (
              <Link
                key={event.id}
                href={`/community/events/${event.id}`}
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 
                             to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-medium text-white mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Community Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-xl font-medium text-white mb-8">Community Spotlight</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mockSpotlight.map((post) => (
              <div
                key={post.id}
                className="bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white">{post.author.name}</div>
                      <div className="text-sm text-white/60">{post.timeAgo}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-4">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <button className="ml-auto">
                      <Share2 className="w-4 h-4 hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discussions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-white">Recent Discussions</h2>
            <Link
              href="/community/new"
              className="px-4 py-2 bg-white text-black rounded-xl font-medium 
                     hover:bg-white/90 transition-colors"
            >
              Start Discussion
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 
                               text-white/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] text-white rounded-xl border 
                           border-white/10 focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>
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

          {/* Discussion List */}
          <div className="space-y-4">
            {mockDiscussions.map((discussion) => (
              <Link
                key={discussion.id}
                href={`/community/discussion/${discussion.id}`}
                className="block p-6 bg-white/[0.03] rounded-2xl border border-white/10 
                         hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={discussion.author.avatar}
                    alt={discussion.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-white">{discussion.author.name}</span>
                      <span className="text-sm text-white/60">{discussion.timeAgo}</span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{discussion.title}</h3>
                    <p className="text-white/60 mb-4">{discussion.preview}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                      <span className="px-2 py-1 bg-white/[0.03] rounded-full">
                        {discussion.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 