// src/types/types.ts

export type EventStatus = 'pending' | 'accepted' | 'rejected';

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: EventStatus;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  participants: Participant[];
  location?: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  color?: string; // Color indicator for the event
  isLive?: boolean;
  links?: {
    type: string;
    url: string;
  }[];
  repeatDays?: ('M' | 'T' | 'W' | 'TH' | 'F' | 'S' | 'SU')[];
}

export type CalendarView = 'day' | '3d' | 'week' | 'month';
export type LayoutMode = 'plan' | 'focus' | 'relax';
export type DensityMode = 'relaxed' | 'compact';

export interface CalendarState {
  events: CalendarEvent[];
  view: CalendarView;
  currentDate: Date;
  selectedEvent: CalendarEvent | null;
  layout: LayoutMode;
  density: DensityMode;
}