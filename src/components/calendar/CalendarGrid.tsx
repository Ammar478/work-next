// src/components/calendar/CalendarGrid.tsx
'use client'
import React from 'react';
import { format, isToday, isSameDay } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';
import { CalendarView } from '@/types/types';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'productivity' | 'hobby' | 'personal';
  color?: string;
  description?: string;
  location?: string;
  tags?: string[];
  isCompleted?: boolean;
}

interface CalendarGridProps {
  dates: Date[];
  events: Event[];
  viewMode: CalendarView;
  onEventClick: (event: Event) => void;
  currentDate: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  dates,
  events,
  onEventClick
}) => {
  const { theme } = useTheme();
  
  // Generate array of hours for the day
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Dynamic classes based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const todayClass = theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50';

  // Function to calculate event position and height for rendering
  const getEventStyle = (event: Event, columnWidth: number) => {
    const startHour = new Date(event.start).getHours();
    const startMinute = new Date(event.start).getMinutes();
    const endHour = new Date(event.end).getHours();
    const endMinute = new Date(event.end).getMinutes();
    
    const startPercent = (startHour + startMinute / 60) * 60; // 60px per hour
    const durationMins = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const heightPx = (durationMins / 60) * 60; // 60px per hour
    
    return {
      top: `${startPercent}px`,
      height: `${heightPx}px`,
      width: `${columnWidth - 10}px`, // -10px for margin
    };
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity':
        return 'border-purple-500 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-40';
      case 'hobby':
        return 'border-blue-500 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-40';
      case 'personal':
        return 'border-pink-500 bg-pink-100 dark:bg-pink-900 dark:bg-opacity-40';
      default:
        return 'border-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  // Format event time
  const formatEventTime = (event: Event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  };

  const columnWidth = 100 / dates.length;

  return (
    <div className={`mt-4 rounded-lg border ${borderClass} overflow-hidden`}>
      {/* Header for days */}
      <div className={`grid ${bgClass} ${borderClass}`} style={{ gridTemplateColumns: `60px repeat(${dates.length}, 1fr)` }}>
        <div className={`p-2 ${secondaryTextClass} font-medium border-r ${borderClass}`}></div>
        {dates.map((date, index) => (
          <div 
            key={index}
            className={`p-2 text-center font-medium border-r ${borderClass} ${
              isToday(date) ? todayClass : ''
            } ${textClass}`}
          >
            <div>{format(date, 'EEE')}</div>
            <div className={`text-lg ${isToday(date) ? 'bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
              {format(date, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Time grid */}
      <div className={`relative ${bgClass}`} style={{ height: `${24 * 60}px` }}> {/* 24 hours * 60px height */}
        {/* Hour markers */}
        {hours.map((hour) => (
          <div 
            key={hour}
            className={`absolute w-full border-t ${borderClass} flex`}
            style={{ top: `${hour * 60}px` }}
          >
            <div className={`w-[60px] pr-2 text-right text-xs ${secondaryTextClass} border-r ${borderClass} -mt-2.5`}>
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          </div>
        ))}
        
        {/* Current time indicator */}
        {dates.some(date => isToday(date)) && (
          <div 
            className="absolute w-full border-t border-red-500 z-10"
            style={{ 
              top: `${new Date().getHours() * 60 + new Date().getMinutes()}px`,
              left: '60px' 
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
              className={`relative border-l ${borderClass} ${
                isToday(date) ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
            >
              {/* Events for this date */}
              {events
                .filter(event => isSameDay(new Date(event.start), date))
                .map((event) => {
                  const style = getEventStyle(event, columnWidth);
                  return (
                    <div
                      key={event.id}
                      className={`absolute left-1 cursor-pointer rounded-md p-2 border-l-4 text-xs ${getCategoryColor(event.category)} ${textClass}`}
                      style={style}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className={`text-xs ${secondaryTextClass}`}>{formatEventTime(event)}</div>
                      {event.tags && event.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {event.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-1.5 py-0.5 bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

