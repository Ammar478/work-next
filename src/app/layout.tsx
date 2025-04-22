'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCalendarPage = pathname === '/calendar'
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SidebarProvider>
            {isCalendarPage ? (
              // Calendar page gets full-width layout
              <div className="h-screen flex flex-col">
                <Header />
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </div>
            ) : (
              // Standard layout with sidebar for other pages
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-auto">
                    {children}
                  </main>
                </div>
              </div>
            )}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}