'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ruler, ArrowRight, ArrowLeftRight } from 'lucide-react'

type SizeType = 'US' | 'UK' | 'EU' | 'CM'
type Gender = 'mens' | 'womens'

interface SizeChart {
  US: string[]
  UK: string[]
  EU: string[]
  CM: string[]
}

const sizeCharts: Record<Gender, SizeChart> = {
  mens: {
    US: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    UK: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    EU: ['40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '46'],
    CM: ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30', '31']
  },
  womens: {
    US: ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    UK: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5'],
    EU: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5'],
    CM: ['22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28']
  }
}

export default function SizeGuidePage() {
  const [gender, setGender] = useState<Gender>('mens')
  const [fromSize, setFromSize] = useState<{ type: SizeType; value: string }>({
    type: 'US',
    value: '9'
  })
  const [convertedSizes, setConvertedSizes] = useState<Record<SizeType, string>>({
    US: '',
    UK: '',
    EU: '',
    CM: ''
  })

  const handleConversion = () => {
    const sizeIndex = sizeCharts[gender][fromSize.type].indexOf(fromSize.value)
    if (sizeIndex === -1) return

    setConvertedSizes({
      US: sizeCharts[gender].US[sizeIndex],
      UK: sizeCharts[gender].UK[sizeIndex],
      EU: sizeCharts[gender].EU[sizeIndex],
      CM: sizeCharts[gender].CM[sizeIndex]
    })
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 
                     flex items-center justify-center mx-auto mb-6"
          >
            <Ruler className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Size Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60"
          >
            Convert between different size measurements
          </motion.p>
        </div>

        {/* Converter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 md:p-8 mb-8"
        >
          <div className="space-y-6">
            {/* Gender Selection */}
            <div>
              <label className="block text-sm text-white/60 mb-4">Gender</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGender('mens')}
                  className={`h-12 rounded-xl font-medium border transition-colors
                           ${gender === 'mens'
                      ? 'bg-white text-black border-transparent'
                      : 'bg-transparent text-white border-white/10 hover:bg-white/[0.03]'
                    }`}
                >
                  Men's
                </button>
                <button
                  onClick={() => setGender('womens')}
                  className={`h-12 rounded-xl font-medium border transition-colors
                           ${gender === 'womens'
                      ? 'bg-white text-black border-transparent'
                      : 'bg-transparent text-white border-white/10 hover:bg-white/[0.03]'
                    }`}
                >
                  Women's
                </button>
              </div>
            </div>

            {/* Size Input */}
            <div>
              <label className="block text-sm text-white/60 mb-4">From</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Type</label>
                  <select
                    value={fromSize.type}
                    onChange={(e) => setFromSize({ ...fromSize, type: e.target.value as SizeType })}
                    className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  >
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="EU">EU</option>
                    <option value="CM">CM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Size</label>
                  <select
                    value={fromSize.value}
                    onChange={(e) => setFromSize({ ...fromSize, value: e.target.value })}
                    className="w-full h-12 px-4 bg-white/[0.03] text-white rounded-xl border 
                             border-white/10 focus:border-white/20 focus:outline-none"
                  >
                    {sizeCharts[gender][fromSize.type].map((size: string) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConversion}
              className="w-full h-12 bg-white text-black rounded-xl font-medium 
                       hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span>Convert</span>
            </button>

            {/* Results */}
            {Object.entries(convertedSizes).length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(convertedSizes).map(([type, size]) => (
                  <div key={type} className="text-center">
                    <div className="text-sm text-white/60 mb-1">{type}</div>
                    <div className="text-xl font-medium text-white">{size}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Size Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6">Full Size Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">US</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">UK</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">EU</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">CM</th>
                </tr>
              </thead>
              <tbody>
                {sizeCharts[gender].US.map((_, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 px-6 text-white">{sizeCharts[gender].US[index]}</td>
                    <td className="py-4 px-6 text-white">{sizeCharts[gender].UK[index]}</td>
                    <td className="py-4 px-6 text-white">{sizeCharts[gender].EU[index]}</td>
                    <td className="py-4 px-6 text-white">{sizeCharts[gender].CM[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 