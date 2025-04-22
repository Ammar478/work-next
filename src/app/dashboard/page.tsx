'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { format, addDays } from 'date-fns';
import { Note } from '@/types/notes';

// Weather interface
interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  location: string;
}

export default function DashboardPage() {
  const { theme } = useTheme();
  
  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  
  // Weather state
  const [weather] = useState<WeatherData>({
    temp: 24,
    condition: 'Sunny',
    icon: '☀️',
    location: 'New York'
  });
  
  // Events state (simplified for demo)
  const [events] = useState([
    {
      id: '1',
      title: 'Meeting with team',
      start: new Date(new Date().setHours(8, 0, 0, 0)),
      end: new Date(new Date().setHours(8, 30, 0, 0)),
      category: 'productivity',
      color: '#a78bfa'
    },
    {
      id: '2',
      title: 'Research design market',
      start: new Date(new Date().setHours(13, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 30, 0, 0)),
      category: 'productivity',
      color: '#a78bfa'
    },
    {
      id: '3',
      title: 'Badminton training',
      start: addDays(new Date(), 1),
      end: addDays(new Date(), 1),
      category: 'hobby',
      color: '#93c5fd'
    }
  ]);
  
  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (e) {
      console.error('Error loading notes:', e);
    }
  }, []);
  
  // Dynamic classes based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  
  // Get pinned notes
  const pinnedNotes = notes.filter(note => note.isPinned).slice(0, 3);
  
  // Get today's events
  const todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate.getDate() === today.getDate() &&
           eventDate.getMonth() === today.getMonth() &&
           eventDate.getFullYear() === today.getFullYear();
  });
  
  // Get upcoming events
  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate > today;
  }).slice(0, 3);

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <main className="container mx-auto px-4 py-6">
        {/* Page header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Dashboard</h1>
          <p className={secondaryTextClass}>Welcome back! Here's an overview of your day.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="md:col-span-2 space-y-6">
            {/* Today's schedule */}
            <div className={`${cardBgClass} rounded-xl shadow-sm border ${borderClass} p-5`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${textClass}`}>Today's Schedule</h2>
                <Link href="/calendar" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  View calendar
                </Link>
              </div>
              
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map(event => (
                    <div key={event.id} className={`p-3 rounded-lg border ${borderClass} flex items-center`}>
                      <div 
                        className="w-2 h-12 rounded-full mr-4" 
                        style={{ backgroundColor: event.color }}
                      ></div>
                      <div className="flex-1">
                        <p className={`font-medium ${textClass}`}>{event.title}</p>
                        <p className={secondaryTextClass}>
                          {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-8 ${secondaryTextClass}`}>
                  <p>No events scheduled for today</p>
                  <button className="mt-2 text-indigo-600 hover:text-indigo-500 font-medium">
                    + Add new event
                  </button>
                </div>
              )}
            </div>
            
            {/* Pinned notes */}
            <div className={`${cardBgClass} rounded-xl shadow-sm border ${borderClass} p-5`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${textClass}`}>Pinned Notes</h2>
                <Link href="/notes" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  View all notes
                </Link>
              </div>
              
              {pinnedNotes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pinnedNotes.map(note => (
                    <div
                      key={note.id}
                      className={`p-4 rounded-lg ${note.color} shadow-sm`}
                    >
                      {note.title && <h3 className={`font-medium mb-2 ${textClass}`}>{note.title}</h3>}
                      <p className={`line-clamp-3 ${secondaryTextClass}`}>{note.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-8 ${secondaryTextClass}`}>
                  <p>No pinned notes</p>
                  <Link href="/notes" className="mt-2 text-indigo-600 hover:text-indigo-500 font-medium">
                    + Create a note
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            {/* Weather card */}
            <div className={`${cardBgClass} rounded-xl shadow-sm border ${borderClass} p-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-semibold ${textClass}`}>Weather</h2>
                  <p className={secondaryTextClass}>{weather.location}</p>
                </div>
                <span className="text-4xl">{weather.icon}</span>
              </div>
              
              <div className="mt-3">
                <div className="flex items-end">
                  <span className={`text-4xl font-bold ${textClass}`}>{weather.temp}°</span>
                  <span className={`ml-2 ${secondaryTextClass}`}>{weather.condition}</span>
                </div>
              </div>
            </div>
            
            {/* Upcoming events */}
            <div className={`${cardBgClass} rounded-xl shadow-sm border ${borderClass} p-5`}>
              <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Upcoming Events</h2>
              
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className={`p-3 rounded-lg border ${borderClass}`}>
                      <div className="flex items-center">
                        <div 
                          className="w-2 h-full rounded-full mr-3" 
                          style={{ backgroundColor: event.color }}
                        ></div>
                        <div>
                          <p className={`font-medium ${textClass}`}>{event.title}</p>
                          <p className={secondaryTextClass}>
                            {format(new Date(event.start), 'MMM dd, h:mm a')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-6 ${secondaryTextClass}`}>
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
            
            {/* Quick actions */}
            <div className={`${cardBgClass} rounded-xl shadow-sm border ${borderClass} p-5`}>
              <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>Quick Actions</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/calendar"
                  className={`p-4 rounded-lg border ${borderClass} hover:border-indigo-500 transition-colors text-center`}
                >
                  <svg className="w-8 h-8 mx-auto mb-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`font-medium ${textClass}`}>Calendar</span>
                </Link>
                
                <Link 
                  href="/notes"
                  className={`p-4 rounded-lg border ${borderClass} hover:border-indigo-500 transition-colors text-center`}
                >
                  <svg className="w-8 h-8 mx-auto mb-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className={`font-medium ${textClass}`}>Notes</span>
                </Link>
                
                <Link 
                  href="/todo"
                  className={`p-4 rounded-lg border ${borderClass} hover:border-indigo-500 transition-colors text-center`}
                >
                  <svg className="w-8 h-8 mx-auto mb-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className={`font-medium ${textClass}`}>To-do</span>
                </Link>
                
                <Link 
                  href="/settings"
                  className={`p-4 rounded-lg border ${borderClass} hover:border-indigo-500 transition-colors text-center`}
                >
                  <svg className="w-8 h-8 mx-auto mb-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`font-medium ${textClass}`}>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}