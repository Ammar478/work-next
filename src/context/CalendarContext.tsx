'use client'

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { CalendarState, CalendarEvent, CalendarView, LayoutMode, DensityMode } from '@/types/types';

type CalendarAction =
  | { type: 'SET_VIEW'; payload: CalendarView }
  | { type: 'SET_CURRENT_DATE'; payload: Date }
  | { type: 'ADD_EVENT'; payload: CalendarEvent }
  | { type: 'UPDATE_EVENT'; payload: CalendarEvent }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'SELECT_EVENT'; payload: CalendarEvent | null }
  | { type: 'SET_LAYOUT'; payload: LayoutMode }
  | { type: 'SET_DENSITY'; payload: DensityMode };

const initialState: CalendarState = {
  events: [],
  view: 'day',
  currentDate: new Date(),
  selectedEvent: null,
  layout: 'plan',
  density: 'relaxed',
};

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };
    case 'SET_CURRENT_DATE':
      return { ...state, currentDate: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case 'SELECT_EVENT':
      return { ...state, selectedEvent: action.payload };
    case 'SET_LAYOUT':
      return { ...state, layout: action.payload };
    case 'SET_DENSITY':
      return { ...state, density: action.payload };
    default:
      return state;
  }
}

type CalendarContextType = {
  state: CalendarState;
  dispatch: React.Dispatch<CalendarAction>;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}

// Helper functions to create properly typed action dispatchers
export const calendarActions = {
  setView: (view: CalendarView) => ({ type: 'SET_VIEW' as const, payload: view }),
  setCurrentDate: (date: Date) => ({ type: 'SET_CURRENT_DATE' as const, payload: date }),
  addEvent: (event: CalendarEvent) => ({ type: 'ADD_EVENT' as const, payload: event }),
  updateEvent: (event: CalendarEvent) => ({ type: 'UPDATE_EVENT' as const, payload: event }),
  deleteEvent: (eventId: string) => ({ type: 'DELETE_EVENT' as const, payload: eventId }),
  selectEvent: (event: CalendarEvent | null) => ({ type: 'SELECT_EVENT' as const, payload: event }),
  setLayout: (layout: LayoutMode) => ({ type: 'SET_LAYOUT' as const, payload: layout }),
  setDensity: (density: DensityMode) => ({ type: 'SET_DENSITY' as const, payload: density }),
};
