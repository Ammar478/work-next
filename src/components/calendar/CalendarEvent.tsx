// src/components/calendar/CalendarEvent.tsx
'use client'
import React from 'react';
import { format } from 'date-fns';
import { CalendarEvent as EventType } from '../../types/types';

interface CalendarEventProps {
  event: EventType;
  onClick: () => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event, onClick }) => {
  const { title, startTime, endTime, links } = event;

  const getEventColor = () => {
    if (title.toLowerCase().includes('astro')) {
      return 'bg-red-100 text-red-800 border-l-4 border-red-500';
    }
    if (title.toLowerCase().includes('jamming')) {
      return 'bg-orange-100 text-orange-800 border-l-4 border-orange-500';
    }
    if (title.toLowerCase().includes('wenzo')) {
      return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
    }
    if (title.toLowerCase().includes('mukbang')) {
      return 'bg-orange-100 text-orange-800 border-l-4 border-orange-500';
    }
    return 'bg-gray-100 text-gray-800 border-l-4 border-gray-500';
  };

  const formatTimeRange = () => {
    return `${format(new Date(startTime), 'HH:mm')} → ${format(new Date(endTime), 'HH:mm')}`;
  };

  return (
    <div
      className={`p-2 rounded-md mb-1 ${getEventColor()} cursor-pointer`}
      onClick={onClick}
    >
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs flex items-center mt-1">
        <svg 
          className="w-3 h-3 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        {formatTimeRange()}
      </div>
      
      {links && links.length > 0 && (
        <div className="mt-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="flex items-center text-xs px-2 py-1 bg-white rounded text-blue-600 hover:bg-blue-50"
              onClick={(e) => e.stopPropagation()}
            >
              <svg 
                className="w-3 h-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
              {link.type}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};