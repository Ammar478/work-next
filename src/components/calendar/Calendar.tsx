'use client'

import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarSidebar } from './CalendarSidebar';
import { CalendarGrid } from './CalendarGrid';
import { EventModal } from './EventModal';
import { useCalendarNavigation } from '@/hooks/useCalendarNavigation';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { CalendarEvent } from '@/types/types';
import { useTheme } from '@/context/ThemeContext';

export const Calendar: React.FC = () => {
  const { theme } = useTheme();
  const {
    currentDate,
    view,
    layout,
    density,
    setView,
    setLayout,
    setDensity,
    goNext,
    goPrevious,
    goToday,
    getDaysToDisplay,
  } = useCalendarNavigation();
  
  const {
    events,
    selectedEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    getEventsForDateAndHour,
  } = useCalendarEvents();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  
  const handleCreateEvent = () => {
    setIsCreateMode(true);
    selectEvent(null);
    setIsModalOpen(true);
  };
  
  const handleEditEvent = (event: CalendarEvent) => {
    setIsCreateMode(false);
    selectEvent(event);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (selectedEvent) {
      selectEvent(null);
    }
  };
  
  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (isCreateMode) {
      createEvent(eventData);
    } else if (selectedEvent) {
      updateEvent({ ...eventData, id: selectedEvent.id });
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setIsModalOpen(false);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-64' : 'w-0 -ml-5'} overflow-hidden`}>
        <CalendarSidebar
          layout={layout}
          density={density}
          setLayout={setLayout}
          setDensity={setDensity}
        />
      </div>
      
      {/* Main Calendar Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          {/* Toggle sidebar button */}
          <button 
            onClick={toggleSidebar} 
            className="mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {showSidebar ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
          
          {/* Calendar Header */}
          <div className="flex-1">
            <CalendarHeader
              currentDate={currentDate}
              view={view}
              setView={setView}
              onNext={goNext}
              onPrevious={goPrevious}
              onToday={goToday}
              onCreateEvent={handleCreateEvent}
            />
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto p-4">
          <CalendarGrid
            dates={getDaysToDisplay()}
            events={events}
            getEventsForDateAndHour={getEventsForDateAndHour}
            onEventClick={handleEditEvent}
            view={view}
            density={density}
          />
        </div>
      </div>
      
      {/* Event Modal */}
      {(isModalOpen || selectedEvent) && (
        <EventModal
          isOpen={isModalOpen || !!selectedEvent}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          event={selectedEvent}
          isCreate={isCreateMode}
        />
      )}
    </div>
  );
};