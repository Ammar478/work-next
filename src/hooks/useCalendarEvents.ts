// src/hooks/useCalendarEvents.ts
'use client'
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CalendarEvent, Participant, EventStatus } from '../types/types';
import { useCalendarContext } from '../context/CalendarContext';
import { isSameDay } from 'date-fns';

export const useCalendarEvents = () => {
  const { state, dispatch } = useCalendarContext();
  const { events, selectedEvent } = state;

  // Get events for a specific date
  const getEventsForDate = useCallback(
    (date: Date) => {
      return events.filter((event) => {
        const eventDate = new Date(event.startTime);
        return isSameDay(eventDate, date);
      });
    },
    [events]
  );

  // Create a new event
  const createEvent = useCallback(
    (eventData: Omit<CalendarEvent, 'id'>) => {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: uuidv4(),
      };
      
      dispatch({ type: 'ADD_EVENT', payload: newEvent });
      return newEvent;
    },
    [dispatch]
  );

  // Update an existing event
  const updateEvent = useCallback(
    (event: CalendarEvent) => {
      dispatch({ type: 'UPDATE_EVENT', payload: event });
    },
    [dispatch]
  );

  // Delete an event
  const deleteEvent = useCallback(
    (eventId: string) => {
      dispatch({ type: 'DELETE_EVENT', payload: eventId });
    },
    [dispatch]
  );

  // Select an event for editing
  const selectEvent = useCallback(
    (event: CalendarEvent | null) => {
      dispatch({ type: 'SELECT_EVENT', payload: event });
    },
    [dispatch]
  );

  // Add participant to an event
  const addParticipant = useCallback(
    (eventId: string, participant: Omit<Participant, 'id'>) => {
      const event = events.find((e) => e.id === eventId);
      
      if (event) {
        const newParticipant: Participant = {
          ...participant,
          id: uuidv4(),
        };
        
        const updatedEvent: CalendarEvent = {
          ...event,
          participants: [...(event.participants || []), newParticipant],
        };
        
        updateEvent(updatedEvent);
        return newParticipant;
      }
      
      return null;
    },
    [events, updateEvent]
  );

  // Update participant status
  const updateParticipantStatus = useCallback(
    (eventId: string, participantId: string, status: EventStatus) => {
      const event = events.find((e) => e.id === eventId);
      
      if (event && event.participants) {
        const updatedParticipants = event.participants.map((p) =>
          p.id === participantId ? { ...p, status } : p
        );
        
        const updatedEvent: CalendarEvent = {
          ...event,
          participants: updatedParticipants,
        };
        
        updateEvent(updatedEvent);
      }
    },
    [events, updateEvent]
  );

  // Remove participant from an event
  const removeParticipant = useCallback(
    (eventId: string, participantId: string) => {
      const event = events.find((e) => e.id === eventId);
      
      if (event && event.participants) {
        const updatedEvent: CalendarEvent = {
          ...event,
          participants: event.participants.filter((p) => p.id !== participantId),
        };
        
        updateEvent(updatedEvent);
      }
    },
    [events, updateEvent]
  );

  // Get events for a specific hour on a specific date
  const getEventsForDateAndHour = useCallback(
    (date: Date, hour: number) => {
      return events.filter((event) => {
        const eventDate = new Date(event.startTime);
        return isSameDay(eventDate, date) && eventDate.getHours() === hour;
      });
    },
    [events]
  );

  return {
    events,
    selectedEvent,
    getEventsForDate,
    getEventsForDateAndHour,
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    addParticipant,
    updateParticipantStatus,
    removeParticipant,
  };
};