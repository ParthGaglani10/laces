'use client'

import { motion } from 'framer-motion'
import { 
  Rocket, Users, Heart, Zap, Briefcase, 
  GraduationCap, Globe, ArrowRight 
} from 'lucide-react'

const values = [
  {
    title: 'Innovation First',
    icon: Rocket,
    description: "We're constantly pushing boundaries to create the best possible experience for sneaker enthusiasts."
  },
  {
    title: 'Community Driven',
    icon: Users,
    description: 'Our community is at the heart of everything we do. We build for and with our users.'
  },
  {
    title: 'Passion for Sneakers',
    icon: Heart,
    description: 'We share the same passion for sneakers as our users and strive to elevate the culture.'
  },
  {
    title: 'Fast-Paced',
    icon: Zap,
    description: 'We move quickly and adapt to changes, always staying ahead of the curve.'
  }
]

const openings = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time'
  },
  {
    title: 'Community Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Los Angeles, CA',
    type: 'Full-time'
  }
]

const benefits = [
  {
    title: 'Competitive Compensation',
    description: 'We offer top-tier salaries and equity packages.',
    icon: Briefcase
  },
  {
    title: 'Learning & Development',
    description: 'Dedicated budget for courses, conferences, and certifications.',
    icon: GraduationCap
  },
  {
    title: 'Remote-First Culture',
    description: 'Work from anywhere in the world.',
    icon: Globe
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[85%] mx-auto text-center"
          >
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Join Our Team
            </h1>
            <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] text-white/60 max-w-2xl mx-auto mb-8">
              Help us revolutionize the sneaker industry and build the future of footwear retail.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <a
                href="#openings"
                className="px-8 py-4 bg-white text-black rounded-2xl font-medium 
                         hover:bg-gray-100 transition-colors"
              >
                View Open Positions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              These are the principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 
                               flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Join us in our mission to transform the sneaker industry.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-white/[0.03] rounded-2xl border border-white/10 
                         hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-white/60">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white 
                                     transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Benefits & Perks</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We take care of our team with competitive compensation and great benefits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/[0.03] rounded-2xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 
                               flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
} 