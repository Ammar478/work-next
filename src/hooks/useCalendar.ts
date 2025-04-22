// src/hooks/useCalendar.ts
'use client'
import { useEffect } from 'react';
import { CalendarEvent, Participant,CalendarView } from '../types/types';
import { useCalendarContext } from '../context/CalendarContext';
import { isSameDay } from '../utils/dateUtils';

export const useCalendar = () => {
  const { state, dispatch } = useCalendarContext();
  
  useEffect(() => {
    // Initialize with some sample events
    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Meeting with Astro Founder',
        startTime: new Date(new Date().setHours(8, 45, 0, 0)),
        endTime: new Date(new Date().setHours(10, 20, 0, 0)),
        participants: [
          {
            id: '1',
            name: 'Jane Doe',
            email: 'janedoe@mail.com',
            status: 'pending',
          },
          {
            id: '2',
            name: 'John Hudges',
            email: 'johnhudges@mail.com',
            status: 'accepted',
          },
        ],
        isLive: true,
        links: [
          {
            type: 'Go to Zoom link',
            url: '#',
          },
        ],
      },
      {
        id: '2',
        title: 'Jamming with Kevin Parker',
        startTime: new Date(new Date().setHours(11, 0, 0, 0)),
        endTime: new Date(new Date().setHours(11, 45, 0, 0)),
        participants: [
          {
            id: '3',
            name: 'Kevin Parker',
            email: 'kevinparker@mail.com',
            status: 'accepted',
          },
        ],
      },
      {
        id: '3',
        title: 'Wenzo project evaluation',
        startTime: new Date(new Date().setHours(12, 30, 0, 0)),
        endTime: new Date(new Date().setHours(16, 36, 0, 0)),
        participants: [
          {
            id: '4',
            name: 'Jane Doe',
            email: 'janedoe@mail.com',
            status: 'pending',
          },
          {
            id: '5',
            name: 'Jane Doe',
            email: 'janedoe@mail.com',
            status: 'accepted',
          },
          {
            id: '6',
            name: 'Jane Doe',
            email: 'janedoe@mail.com',
            status: 'rejected',
          },
        ],
      },
      {
        id: '4',
        title: 'Mukbang kecombrang with Ashar',
        startTime: new Date(new Date().setHours(13, 45, 0, 0)),
        endTime: new Date(new Date().setHours(14, 15, 0, 0)),
        participants: [],
      },
    ];
    
    // Add sample events
    sampleEvents.forEach(event => {
      dispatch({ type: 'ADD_EVENT', payload: event });
    });
  }, [dispatch]);

  const getEventsForDay = (date: Date) => {
    return state.events.filter((event) => 
      isSameDay(new Date(event.startTime), date)
    );
  };

  const createEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    dispatch({ type: 'ADD_EVENT', payload: newEvent });
    return newEvent;
  };

  const updateEvent = (event: CalendarEvent) => {
    dispatch({ type: 'UPDATE_EVENT', payload: event });
  };

  const deleteEvent = (eventId: string) => {
    dispatch({ type: 'DELETE_EVENT', payload: eventId });
  };

  const updateEventParticipant = (
    eventId: string,
    participant: Participant
  ) => {
    const event = state.events.find((e) => e.id === eventId);
    
    if (event) {
      const updatedParticipants = event.participants.map((p) =>
        p.id === participant.id ? participant : p
      );
      
      if (!updatedParticipants.some((p) => p.id === participant.id)) {
        updatedParticipants.push(participant);
      }
      
      const updatedEvent = {
        ...event,
        participants: updatedParticipants,
      };
      
      dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });
    }
  };

  return {
    events: state.events,
    view: state.view,
    currentDate: state.currentDate,
    selectedEvent: state.selectedEvent,
    getEventsForDay,
    createEvent,
    updateEvent,
    deleteEvent,
    updateEventParticipant,
  setView: (view: CalendarView) => dispatch({ type: 'SET_VIEW', payload: view }),
setCurrentDate: (date: Date) => dispatch({ type: 'SET_CURRENT_DATE', payload: date }),
selectEvent: (event: CalendarEvent | null) => dispatch({ type: 'SELECT_EVENT', payload: event }),
  };
};
