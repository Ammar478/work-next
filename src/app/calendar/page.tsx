'use client'

import React, { useState } from 'react';
import { addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';
import CreateEventModal from '@/components/calendar/CreateEventModal';
import EventDetailsModal from '@/components/calendar/EventDetailsModal';
import { CalendarAdapter, PageEvent } from '@/components/calendar/CalendarAdapter';
import { CalendarView } from '@/types/types'; // Make sure this is imported correctly

export default function CalendarPage() {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<CalendarView>('day');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PageEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Sample events data - this is your Event[] type used in the page
  const [events, setEvents] = useState<PageEvent[]>([
    {
      id: '1',
      title: 'Meeting with team',
      start: new Date(new Date().setHours(8, 0, 0, 0)),
      end: new Date(new Date().setHours(8, 30, 0, 0)),
      category: 'productivity',
      color: '#a78bfa',
      description: 'Weekly team sync',
      tags: ['Business', 'Work']
    },
    {
      id: '2',
      title: 'Research design market',
      start: new Date(new Date().setHours(13, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 30, 0, 0)),
      category: 'productivity',
      color: '#a78bfa',
      description: 'Monitoring design and technology trends',
      tags: ['Business', 'Work']
    },
    {
      id: '3',
      title: 'Take a nap',
      start: new Date(new Date().setHours(12, 0, 0, 0)),
      end: new Date(new Date().setHours(13, 0, 0, 0)),
      category: 'personal',
      color: '#6ee7b7',
      description: 'Rest time'
    },
    {
      id: '4',
      title: 'Playing Mobile Legends',
      start: new Date(new Date().setHours(11, 0, 0, 0)),
      end: new Date(new Date().setHours(12, 0, 0, 0)),
      category: 'hobby',
      color: '#93c5fd',
      tags: ['Sports', 'Games']
    },
    {
      id: '5',
      title: 'Give some feedback',
      start: new Date(new Date().setHours(15, 40, 0, 0)),
      end: new Date(new Date().setHours(16, 0, 0, 0)),
      category: 'productivity',
      color: '#a78bfa',
      tags: ['Work']
    },
    {
      id: '6',
      title: 'Badminton training',
      start: new Date(new Date().setHours(16, 30, 0, 0)),
      end: new Date(new Date().setHours(18, 0, 0, 0)),
      category: 'hobby',
      color: '#93c5fd',
      tags: ['Sports', 'Game']
    },
    {
      id: '7',
      title: 'One-on-One with 3D Team',
      start: new Date(new Date().setHours(19, 0, 0, 0)),
      end: new Date(new Date().setHours(20, 0, 0, 0)),
      category: 'productivity',
      color: '#a78bfa',
      tags: ['Business', 'Development']
    },
    {
      id: '8',
      title: 'Create Personal Project',
      start: new Date(new Date().setHours(9, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0, 0)),
      category: 'personal',
      color: '#fda4af',
      description: 'Setup the directory github project'
    },
    {
      id: '9',
      title: 'Reading Al-Qur\'an',
      start: new Date(new Date().setHours(16, 0, 0, 0)),
      end: new Date(new Date().setHours(16, 30, 0, 0)),
      category: 'personal',
      color: '#fda4af',
      tags: ['Spiritual', 'Health']
    },
    {
      id: '10',
      title: 'Reading development book',
      start: new Date(new Date().setHours(16, 0, 0, 0)),
      end: new Date(new Date().setHours(16, 30, 0, 0)),
      category: 'personal',
      color: '#fda4af',
      tags: ['Development']
    }
  ]);

  // Navigation functions
  const goToToday = () => setCurrentDate(new Date());
  
  const goToNextPeriod = () => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(addDays(currentDate, 1));
        break;
      case '3d':
        setCurrentDate(addDays(currentDate, 3));
        break;
      case 'week':
        setCurrentDate(addDays(currentDate, 7));
        break;
      case 'month':
        setCurrentDate(addDays(currentDate, 30));
        break;
    }
  };
  
  const goToPreviousPeriod = () => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(subDays(currentDate, 1));
        break;
      case '3d':
        setCurrentDate(subDays(currentDate, 3));
        break;
      case 'week':
        setCurrentDate(subDays(currentDate, 7));
        break;
      case 'month':
        setCurrentDate(subDays(currentDate, 30));
        break;
    }
  };

  // Event handling functions
  const handleEventClick = (event: PageEvent) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const handleCreateEvent = (newEvent: Omit<PageEvent, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setEvents([...events, { ...newEvent, id }]);
    setShowCreateModal(false);
  };

  const handleUpdateEvent = (updatedEvent: PageEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  // Filter events based on search term and active category
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm.trim() === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = activeCategory === null || event.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get dates to display based on view mode
  const getDatesToDisplay = () => {
    switch (viewMode) {
      case 'day':
        return [currentDate];
      case '3d':
        return [currentDate, addDays(currentDate, 1), addDays(currentDate, 2)];
      case 'week':
        const start = startOfWeek(currentDate);
        const end = endOfWeek(currentDate);
        return eachDayOfInterval({ start, end });
      case 'month':
        // Simplified month view
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return eachDayOfInterval({ start: monthStart, end: monthEnd });
    }
  };

  // Dynamic classes based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const buttonClass = theme === 'dark' 
    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
    : 'text-gray-700 hover:bg-gray-100';
  const activeButtonClass = theme === 'dark'
    ? 'bg-indigo-600 text-white'
    : 'bg-indigo-600 text-white';
  const headerTextClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <main className="container mx-auto px-4 py-6">
        {/* Category filters */}
        <div className="mt-6 mb-6 flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Filter by:
            </span>
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === null
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('productivity')}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === 'productivity'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
              Productivity
            </button>
            <button
              onClick={() => setActiveCategory('hobby')}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === 'hobby'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              Hobby
            </button>
            <button
              onClick={() => setActiveCategory('personal')}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === 'personal'
                  ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-1"></span>
              Personal
            </button>
          </div>
        </div>

        {/* Use the adapter component instead of direct components */}
        <CalendarAdapter
          currentDate={currentDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          events={filteredEvents}
          onEventClick={handleEventClick}
          onPrevious={goToPreviousPeriod}
          onNext={goToNextPeriod}
          onToday={goToToday}
          onCreateEvent={() => setShowCreateModal(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dates={getDatesToDisplay()}
        />

        {/* Create Event Modal */}
        {showCreateModal && (
          <CreateEventModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreateEvent}
            defaultDate={currentDate}
          />
        )}

        {/* Event Details Modal */}
        {showDetailsModal && selectedEvent && (
          <EventDetailsModal
            isOpen={showDetailsModal}
            event={selectedEvent}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedEvent(null);
            }}
            onUpdate={handleUpdateEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </main>
    </div>
  );
}