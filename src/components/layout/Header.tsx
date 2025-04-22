'use client'

import React from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { useTheme } from '@/context/ThemeContext'
import { usePathname } from 'next/navigation'

const Header = () => {
  const { isOpen, toggle } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  
  // Determine the current page title based on the pathname
  const getPageTitle = () => {
    if (pathname === '/') return 'Calendar'
    if (pathname === '/notes') return 'Notes'
    if (pathname === '/todo') return 'To-do List'
    if (pathname === '/settings') return 'Settings'
    return 'Dashboard'
  }

  // Dynamic classes based on theme
  const headerBgClass = theme === 'dark' 
    ? 'bg-gray-800 text-white border-b border-gray-700' 
    : 'bg-white text-gray-900 border-b border-gray-200'
  
  const iconClass = theme === 'dark'
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-500 hover:text-gray-700'

  return (
    <header className={`${headerBgClass} py-4 px-6 flex items-center justify-between shadow-sm`}>
      <div className="flex items-center">
        <button 
          onClick={toggle} 
          className={`${iconClass} p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <h1 className="ml-4 text-xl font-semibold">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`px-4 py-2 pl-10 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                : 'bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500'
            }`}
          />
          <div className="absolute left-3 top-2.5">
            <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-md ${iconClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <button 
          className={`p-2 rounded-md ${iconClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          aria-label="Notifications"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
