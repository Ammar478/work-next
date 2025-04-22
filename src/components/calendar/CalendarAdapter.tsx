'use client'

import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarView } from '@/types/types';

// Define the interface for your page's Event type
export interface PageEvent {
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

// Props for the adapter component
interface CalendarAdapterProps {
  currentDate: Date;
  viewMode: CalendarView;
  setViewMode: (mode: CalendarView) => void;
  events: PageEvent[];
  onEventClick: (event: PageEvent) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onCreateEvent: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dates: Date[];
}

// This component adapts your page's events to the format expected by the CalendarHeader and CalendarGrid components
export const CalendarAdapter: React.FC<CalendarAdapterProps> = ({
  currentDate,
  viewMode,
  setViewMode,
  events,
  onEventClick,
  onPrevious,
  onNext,
  onToday,
  onCreateEvent,
  searchTerm,
  setSearchTerm,
  dates
}) => {
  // Create props for CalendarHeader that match its expected types
  const headerProps = {
    currentDate,
    viewMode,
    setViewMode,
    onPrevious,
    onNext,
    onToday,
    searchTerm,
    setSearchTerm,
    onCreateEvent
  };

  // Create props for CalendarGrid that match its expected types
  const gridProps = {
    dates,
    events,
    viewMode,
    onEventClick,
    currentDate
  };

  return (
    <>
      <CalendarHeader {...headerProps} />
      <CalendarGrid {...gridProps} />
    </>
  );
};