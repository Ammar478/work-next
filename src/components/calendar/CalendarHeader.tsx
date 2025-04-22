// src/components/calendar/CalendarHeader.tsx
'use client'
import React from 'react';
import { format } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';
import { CalendarView } from '@/types/types';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: CalendarView;
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
  setViewMode,
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
        return format(currentDate, 'MMMM d, yyyy');
      case '3d':
        return `${format(currentDate, 'MMM d')} - ${format(new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}`;
      case 'week':
        return `${format(currentDate, 'MMM d')} - ${format(new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return format(currentDate, 'MMMM d, yyyy');
    }
  };

  return (
    <div className="mb-6">
      {/* Title and date range */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatDateHeader()}
          </h1>
        </div>
        
        <div className="flex mt-4 sm:mt-0">
          <div className="mr-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm leading-5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onCreateEvent}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="mr-2 -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create event
          </button>
        </div>
      </div>

      {/* View options and date navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Date navigation */}
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={onPrevious}
              className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onToday}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Today
            </button>
            <button
              onClick={onNext}
              className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* View switcher */}
        <div className="flex">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('day')}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                viewMode === 'day'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:border-indigo-500'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`relative inline-flex items-center px-4 py-2 border-t border-b border-gray-300 dark:border-gray-600 text-sm font-medium ${
                viewMode === '3d'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:border-indigo-500'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              3 Days
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                viewMode === 'week'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:border-indigo-500'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                viewMode === 'month'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:border-indigo-500'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};