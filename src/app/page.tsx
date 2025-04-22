'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the dashboard page
    router.push('/dashboard')
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center animate-pulse">
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
          W
        </div>
        <h1 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Loading WorkApp...
        </h1>
      </div>
    </main>
  )
}