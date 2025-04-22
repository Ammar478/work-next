'use client'

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface EmptyCalendarOverlayProps {
  onCreateEvent: () => void;
}

const EmptyCalendarOverlay: React.FC<EmptyCalendarOverlayProps> = ({ onCreateEvent }) => {
  const { theme } = useTheme();
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <svg 
              className="w-20 h-20 text-indigo-200 dark:text-indigo-800"
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
            </svg>
            <svg 
              className="w-12 h-12 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          No events scheduled
        </h3>
        
        <p className={`text-base mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Create your first event to get started with your calendar
        </p>
        
        <button
          onClick={onCreateEvent}
          className="px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default EmptyCalendarOverlay;