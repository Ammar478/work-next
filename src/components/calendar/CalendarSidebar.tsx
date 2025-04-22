// src/components/calendar/CalendarSidebar.tsx
'use client'
import React from 'react';
import { LayoutMode, DensityMode } from '../../types/types';
import Link from 'next/link';

interface CalendarSidebarProps {
  layout: LayoutMode;
  density: DensityMode;
  setLayout: (layout: LayoutMode) => void;
  setDensity: (density: DensityMode) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  layout,
  density,
  setLayout,
  setDensity,
}) => {
  return (
    <div className="w-64 p-4 border-r bg-white flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center text-white">
          C
        </div>
        <span className="text-lg font-semibold">Caleicen</span>
      </div>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <svg 
          className="w-4 h-4 absolute left-2.5 top-3 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      
      <nav className="space-y-1 mb-6">
        <a 
          href="#" 
          className="flex items-center px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-900"
        >
          <svg 
            className="w-5 h-5 mr-3 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          Calendar
        </a>
        <a 
          href="#" 
          className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg 
            className="w-5 h-5 mr-3 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          Inbox
        </a>
  <Link 
  href="/notes"
  className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
>
  <svg 
    className="w-5 h-5 mr-3 text-gray-500" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
  Notes
</Link>
        <a 
          href="#" 
          className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg 
            className="w-5 h-5 mr-3 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
          To do list
        </a>
        <a 
          href="#" 
          className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg 
            className="w-5 h-5 mr-3 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          Setting
        </a>
      </nav>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Layout</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`p-2 flex flex-col items-center justify-center text-xs rounded border ${
              layout === 'plan' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setLayout('plan')}
          >
            <svg 
              className="w-5 h-5 mb-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 10h16M4 14h16M4 18h16" 
              />
            </svg>
            Plan
          </button>
          <button
            className={`p-2 flex flex-col items-center justify-center text-xs rounded border ${
              layout === 'focus' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setLayout('focus')}
          >
            <svg 
              className="w-5 h-5 mb-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Focus
          </button>
          <button
            className={`p-2 flex flex-col items-center justify-center text-xs rounded border ${
              layout === 'relax' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setLayout('relax')}
          >
            <svg 
              className="w-5 h-5 mb-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Relax
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Density</h3>
        <div className="relative">
          <select
            value={density}
            onChange={(e) => setDensity(e.target.value as DensityMode)}
            className="block w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
          >
            <option value="relaxed">Relaxed</option>
            <option value="compact">Compact</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};