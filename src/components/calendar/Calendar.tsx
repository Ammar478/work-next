'use client'

import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarSidebar } from './CalendarSidebar';
import { CalendarGrid } from './CalendarGrid';
import { EventModal } from './EventModal';
import { useCalendarNavigation } from '@/hooks/useCalendarNavigation';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { CalendarEvent } from '@/types/types';

export const Calendar: React.FC = () => {
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

  return (
    <div className="flex h-screen bg-white">
      <CalendarSidebar
        layout={layout}
        density={density}
        setLayout={setLayout}
        setDensity={setDensity}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          setView={setView}
          onNext={goNext}
          onPrevious={goPrevious}
          onToday={goToday}
          onCreateEvent={handleCreateEvent}
        />

        <CalendarGrid
          dates={getDaysToDisplay()}
          events={events}
          getEventsForDateAndHour={getEventsForDateAndHour}
          onEventClick={handleEditEvent}
          view={view}
          density={density}
        />
      </div>

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

