'use client'

// src/app/page.tsx
import { Calendar } from '@/components/calendar/Calendar'
import { CalendarProvider } from '@/context/CalendarContext'

export default function Home() {
  return (
    <main className="min-h-screen">
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </main>
  )
}
