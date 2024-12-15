'use client'

import { ThemeProvider } from 'next-themes'
import { createContext, useContext, useState, useEffect } from 'react'

export type ReservationStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'ready' 
  | 'picked_up' 
  | 'cancelled' 
  | 'expired'

export type ReservationItem = {
  id: number
  name: string
  color: string
  size: string
  storeId: number
  storeName: string
  price: number
  image: string
  reservationDate: string
  reservationTime: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
  notes?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notificationPreference: 'email' | 'sms' | 'both'
}

type ReservationContextType = {
  reservations: ReservationItem[]
  addReservation: (item: Omit<ReservationItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void
  removeReservation: (id: number) => void
  updateReservation: (id: number, updates: Partial<ReservationItem>) => void
  cancelReservation: (id: number, reason?: string) => void
  confirmReservation: (id: number) => void
  markAsReady: (id: number) => void
  markAsPickedUp: (id: number) => void
  getActiveReservations: () => ReservationItem[]
  getPendingReservations: () => ReservationItem[]
}

const ReservationContext = createContext<ReservationContextType | null>(null)

export const useReservations = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservations must be used within a ReservationProvider')
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<ReservationItem[]>([])

  // Load reservations from localStorage on mount
  useEffect(() => {
    const savedReservations = localStorage.getItem('reservations')
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations))
    }
  }, [])

  // Save reservations to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (
    item: Omit<ReservationItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ) => {
    const now = new Date().toISOString()
    const newReservation: ReservationItem = {
      ...item,
      id: Date.now(),
      status: 'pending',
      createdAt: now,
      updatedAt: now
    }
    setReservations(prev => [...prev, newReservation])
  }

  const removeReservation = (id: number) => {
    setReservations(prev => prev.filter(item => item.id !== id))
  }

  const updateReservation = (id: number, updates: Partial<ReservationItem>) => {
    setReservations(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    )
  }

  const cancelReservation = (id: number, reason?: string) => {
    updateReservation(id, {
      status: 'cancelled',
      notes: reason ? `Cancelled: ${reason}` : undefined
    })
  }

  const confirmReservation = (id: number) => {
    updateReservation(id, { status: 'confirmed' })
  }

  const markAsReady = (id: number) => {
    updateReservation(id, { status: 'ready' })
  }

  const markAsPickedUp = (id: number) => {
    updateReservation(id, { status: 'picked_up' })
  }

  const getActiveReservations = () => {
    return reservations.filter(item =>
      ['pending', 'confirmed', 'ready'].includes(item.status)
    )
  }

  const getPendingReservations = () => {
    return reservations.filter(item => item.status === 'pending')
  }

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        removeReservation,
        updateReservation,
        cancelReservation,
        confirmReservation,
        markAsReady,
        markAsPickedUp,
        getActiveReservations,
        getPendingReservations
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </ReservationContext.Provider>
  )
} 