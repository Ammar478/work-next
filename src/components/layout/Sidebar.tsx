'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import { useTheme } from '@/context/ThemeContext'

const Sidebar = () => {
  const pathname = usePathname()
  const { isOpen } = useSidebar()
  const { theme } = useTheme()
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Notes',
      href: '/notes',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'To-do List',
      href: '/todo',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  // Define dynamic classes based on theme
  const sidebarBgClass = theme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900 border-r border-gray-200'
  
  const sidebarLinkClass = (active: boolean) => {
    const baseClass = 'flex items-center px-4 py-3 text-sm rounded-lg transition-colors duration-150'
    
    if (active) {
      return theme === 'dark'
        ? `${baseClass} bg-indigo-900 bg-opacity-50 text-white`
        : `${baseClass} bg-indigo-50 text-indigo-700`
    }
    
    return theme === 'dark'
      ? `${baseClass} text-gray-300 hover:bg-gray-800`
      : `${baseClass} text-gray-600 hover:bg-gray-100`
  }

  return (
    <aside 
      className={`${sidebarBgClass} ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-5 flex items-center justify-center md:justify-start">
        {isOpen ? (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
              W
            </div>
            <div className="ml-3 text-xl font-bold">WorkApp</div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            W
          </div>
        )}
      </div>
      
      <nav className="flex-1 pt-5 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname?.startsWith(item.href))
          
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={sidebarLinkClass(isActive)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4">
        <div
          className={`flex items-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            U
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs opacity-75">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar