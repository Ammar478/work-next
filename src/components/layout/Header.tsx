'use client'

import React, { useState } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { useTheme } from '@/context/ThemeContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
  const { isOpen, toggle } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Determine the current page title based on the pathname
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/calendar') return 'Calendar'
    if (pathname === '/notes') return 'Notes'
    if (pathname === '/todo') return 'To-do List'
    if (pathname === '/settings') return 'Settings'
    return 'WorkApp'
  }

  // Dynamic classes based on theme
  const headerBgClass = theme === 'dark' 
    ? 'bg-gray-800 text-white border-b border-gray-700' 
    : 'bg-white text-gray-900 border-b border-gray-200'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality here
  }

  return (
    <header className={`${headerBgClass} h-16 px-4 flex items-center justify-between`}>
      <div className="flex items-center">
        <button 
          onClick={toggle} 
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-medium hidden md:block">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-3 py-2 text-sm leading-5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </form>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <button 
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 relative"
          aria-label="Notifications"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="ml-2">
          <button 
            className="overflow-hidden h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-gray-800 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="User profile"
          >
            U
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header