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
      name: 'Calendar',
      href: '/',
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
    const baseClass = 'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150'
    
    if (active) {
      return theme === 'dark'
        ? `${baseClass} bg-indigo-600 text-white`
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
      <div className="p-4 flex items-center justify-between">
        {isOpen ? (
          <div className="text-xl font-bold">WorkApp</div>
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            W
          </div>
        )}
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname?.startsWith(item.href))
            
            return (
              <li key={item.name}>
                <Link href={item.href} className={sidebarLinkClass(isActive)}>
                  <span className="mr-3">{item.icon}</span>
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="p-4">
        <Link 
          href="/profile" 
          className={`flex items-center ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            U
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs opacity-75">user@example.com</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
