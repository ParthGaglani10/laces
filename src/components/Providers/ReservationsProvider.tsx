'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useNotifications } from './NotificationsProvider'

interface Reservation {
  id: string
  name: string
  size: string
  storeName: string
  storeId: string
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled'
  createdAt: number
  expiresAt: number
}

interface ReservationsContextType {
  reservations: Reservation[]
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void
  updateReservation: (id: string, status: Reservation['status']) => void
  cancelReservation: (id: string) => void
}

const ReservationsContext = createContext<ReservationsContextType | undefined>(undefined)

export function ReservationsProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const { addNotification } = useNotifications()

  // Load reservations from localStorage on mount
  useEffect(() => {
    const savedReservations = localStorage.getItem('reservations')
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations))
    }
  }, [])

  // Save reservations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  // Check for expiring reservations
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      reservations.forEach(reservation => {
        if (
          reservation.status === 'pending' &&
          reservation.expiresAt < now &&
          reservation.expiresAt > now - 60000 // Only notify once, within the last minute
        ) {
          addNotification({
            title: 'Reservation Expiring',
            message: `Your reservation for ${reservation.name} is about to expire.`,
            type: 'warning'
          })
        }
      })
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [reservations, addNotification])

  const addReservation = (
    reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>
  ) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      status: 'pending'
    }
    setReservations(prev => [newReservation, ...prev])

    addNotification({
      title: 'Reservation Created',
      message: `Your reservation for ${reservation.name} has been created.`,
      type: 'success'
    })
  }

  const updateReservation = (id: string, status: Reservation['status']) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === id
          ? { ...reservation, status }
          : reservation
      )
    )

    const reservation = reservations.find(r => r.id === id)
    if (reservation) {
      addNotification({
        title: 'Reservation Updated',
        message: `Your reservation for ${reservation.name} is now ${status}.`,
        type: 'info'
      })
    }
  }

  const cancelReservation = (id: string) => {
    const reservation = reservations.find(r => r.id === id)
    if (reservation) {
      setReservations(prev =>
        prev.map(r =>
          r.id === id
            ? { ...r, status: 'cancelled' }
            : r
        )
      )

      addNotification({
        title: 'Reservation Cancelled',
        message: `Your reservation for ${reservation.name} has been cancelled.`,
        type: 'warning'
      })
    }
  }

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservation,
        cancelReservation
      }}
    >
      {children}
    </ReservationsContext.Provider>
  )
}

export function useReservations() {
  const context = useContext(ReservationsContext)
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationsProvider')
  }
  return context
} 