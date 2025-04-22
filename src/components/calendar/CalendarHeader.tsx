// src/components/calendar/CalendarHeader.tsx
'use client'
import React from 'react';
import { format } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';
import { CalendarView } from '@/types/types';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: CalendarView; // Match the property name with what you're passing (view or viewMode)
  setViewMode: (mode: CalendarView) => void; 
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onCreateEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onToday,
  searchTerm,
  setSearchTerm,
  onCreateEvent,
}) => {
  const { theme } = useTheme();

  // Format date based on view mode
  const formatDateHeader = () => {
    switch (viewMode) {
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      case '3d':
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + 2);
        return `${format(currentDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
      case 'week':
        return `Week of ${format(currentDate, 'MMMM d, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return format(currentDate, 'MMMM d, yyyy');
    }
  };

  const headerTextClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const buttonClass = theme === 'dark' 
    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
    : 'text-gray-700 hover:bg-gray-100';

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center space-x-4">
        <h1 className={`text-2xl font-bold ${headerTextClass}`}>
          Schedule
        </h1>
        <div className={`text-lg ${headerTextClass}`}>
          {formatDateHeader()}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`block w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' 
                : 'bg-white text-gray-900 border border-gray-300 placeholder-gray-500'
            }`}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          <button
            onClick={onPrevious}
            className={`p-2 rounded-md ${buttonClass}`}
            aria-label="Previous"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={onToday}
            className={`px-3 py-2 rounded-md text-sm font-medium ${buttonClass}`}
          >
            Today
          </button>
          <button
            onClick={onNext}
            className={`p-2 rounded-md ${buttonClass}`}
            aria-label="Next"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          onClick={onCreateEvent}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create event
        </button>
      </div>
    </div>
  );
};

