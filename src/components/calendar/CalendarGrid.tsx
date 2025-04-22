'use client'

import React from 'react';
import { format, isToday, isSameDay } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';
import { CalendarView } from '@/types/types';
import { PageEvent } from './CalendarAdapter';

interface CalendarGridProps {
  dates: Date[];
  events: PageEvent[];
  viewMode: CalendarView;
  onEventClick: (event: PageEvent) => void;
  currentDate: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  dates,
  events,
  viewMode,
  onEventClick,
  currentDate
}) => {
  const { theme } = useTheme();
  
  // Generate array of hours for the day
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Today highlight class
  const todayClass = theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-indigo-600 text-white';

  // Category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity':
        return theme === 'dark' 
          ? 'border-purple-400 bg-purple-900 bg-opacity-50 text-purple-100' 
          : 'border-purple-500 bg-purple-100 text-purple-800';
      case 'hobby':
        return theme === 'dark'
          ? 'border-blue-400 bg-blue-900 bg-opacity-50 text-blue-100'
          : 'border-blue-500 bg-blue-100 text-blue-800';
      case 'personal':
        return theme === 'dark'
          ? 'border-pink-400 bg-pink-900 bg-opacity-50 text-pink-100'
          : 'border-pink-500 bg-pink-100 text-pink-800';
      default:
        return theme === 'dark'
          ? 'border-gray-500 bg-gray-700 text-gray-200'
          : 'border-gray-300 bg-gray-100 text-gray-800';
    }
  };

  // Function to calculate event position and height for rendering
  const getEventStyle = (event: PageEvent, date: Date) => {
    const startHour = new Date(event.start).getHours();
    const startMinute = new Date(event.start).getMinutes();
    const endHour = new Date(event.end).getHours();
    const endMinute = new Date(event.end).getMinutes();
    
    const startPercent = (startHour + startMinute / 60) * 60; // 60px per hour
    const durationMins = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const heightPx = Math.max((durationMins / 60) * 60, 30); // Minimum 30px height
    
    return {
      top: `${startPercent}px`,
      height: `${heightPx}px`,
      width: `calc(100% - 8px)`,
      left: '4px'
    };
  };

  // Format event time
  const formatEventTime = (event: PageEvent) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      {/* Header for days */}
      <div className="grid" style={{ gridTemplateColumns: `60px repeat(${dates.length}, 1fr)` }}>
        <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700"></div>
        {dates.map((date, index) => {
          const isCurrentDay = isToday(date);
          return (
            <div 
              key={index}
              className={`p-3 text-center font-medium border-b border-r border-gray-200 dark:border-gray-700 ${
                isCurrentDay ? (theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50') : ''
              }`}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {format(date, 'EEE')}
              </div>
              <div className="text-lg flex justify-center">
                <span className={`${isCurrentDay ? 'w-8 h-8 rounded-full flex items-center justify-center ' + todayClass : ''}`}>
                  {format(date, 'd')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Time grid */}
      <div className="relative" style={{ height: `${24 * 60}px` }}> {/* 24 hours * 60px height */}
        {/* Hour markers */}
        {hours.map((hour) => (
          <div 
            key={hour}
            className="absolute w-full border-t border-gray-200 dark:border-gray-700 flex"
            style={{ top: `${hour * 60}px` }}
          >
            <div className="w-[60px] pr-2 text-right text-xs text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 -mt-2.5">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          </div>
        ))}
        
        {/* Current time indicator */}
        {dates.some(date => isToday(date)) && (
          <div 
            className="absolute z-10 border-t border-red-500"
            style={{ 
              top: `${new Date().getHours() * 60 + new Date().getMinutes()}px`,
              left: '60px',
              right: '0'
            }}
          >
            <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full bg-red-500"></div>
          </div>
        )}

        {/* Date columns */}
        <div 
          className="absolute top-0 left-[60px] right-0 bottom-0 grid"
          style={{ gridTemplateColumns: `repeat(${dates.length}, 1fr)` }}
        >
          {dates.map((date, dateIndex) => (
            <div 
              key={dateIndex}
              className={`relative border-l border-gray-200 dark:border-gray-700 ${
                isToday(date) ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50') : ''
              }`}
            >
              {/* Events for this date */}
              {events
                .filter(event => isSameDay(new Date(event.start), date))
                .map((event) => {
                  const style = getEventStyle(event, date);
                  return (
                    <div
                      key={event.id}
                      className={`absolute cursor-pointer rounded-md p-2 border-l-4 ${getCategoryColor(event.category)} hover:opacity-90 transition-opacity shadow-sm hover:shadow-md`}
                      style={style}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="font-medium truncate text-sm">{event.title}</div>
                      <div className="text-xs opacity-80">{formatEventTime(event)}</div>
                      {event.tags && event.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {event.tags.slice(0, 1).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-1.5 py-0.5 bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                          {event.tags.length > 1 && (
                            <span className="px-1.5 py-0.5 bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30 rounded text-xs">
                              +{event.tags.length - 1}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

              {/* Empty state for no events */}
              {events
                .filter(event => isSameDay(new Date(event.start), date))
                .length === 0 && viewMode === 'day' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <div className="text-center p-4">
                    <svg className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No events scheduled</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Background grid lines for each hour - for better visual separation */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <div 
              key={`grid-${hour}`}
              className="absolute w-full border-t border-gray-100 dark:border-gray-800"
              style={{ top: `${hour * 60}px`, left: '60px', right: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Empty state for no dates */}
      {dates.length === 0 && (
        <div className="h-60 flex items-center justify-center">
          <div className="text-center p-6">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No dates to display</p>
            <p className="text-gray-500 dark:text-gray-400">Select a date range to view your calendar</p>
          </div>
        </div>
      )}
    </div>
  );
};