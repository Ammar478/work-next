// src/hooks/useCalendarNavigation.ts
'use client'
import { useState } from 'react';
import { CalendarView, LayoutMode, DensityMode } from '../types/types';
import { addDays, subDays, addMonths, subMonths } from 'date-fns';

export const useCalendarNavigation = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('day');
  const [layout, setLayout] = useState<LayoutMode>('relax');
  const [density, setDensity] = useState<DensityMode>('relaxed');

  // Navigate to next period based on current view
  const goNext = () => {
    switch (view) {
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
        setCurrentDate(addMonths(currentDate, 1));
        break;
    }
  };

  // Navigate to previous period based on current view
  const goPrevious = () => {
    switch (view) {
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
        setCurrentDate(subMonths(currentDate, 1));
        break;
    }
  };

  // Go to today
  const goToday = () => {
    setCurrentDate(new Date());
  };

  // Get the days to display based on the current view
  const getDaysToDisplay = () => {
    const days: Date[] = [];
    
    switch (view) {
      case 'day':
        days.push(currentDate);
        break;
      case '3d':
        for (let i = 0; i < 3; i++) {
          days.push(addDays(currentDate, i));
        }
        break;
      case 'week':
        for (let i = 0; i < 7; i++) {
          days.push(addDays(currentDate, i));
        }
        break;
      case 'month':
        // Logic for month view would be more complex
        // This is a simplified version for demonstration
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let i = 1; i <= daysInMonth; i++) {
          days.push(new Date(year, month, i));
        }
        break;
    }
    
    return days;
  };

  return {
    currentDate,
    view,
    layout,
    density,
    setCurrentDate,
    // Fix the TypeScript errors by adding proper type annotations
    setView: (newView: CalendarView) => setView(newView),
    setLayout: (newLayout: LayoutMode) => setLayout(newLayout),
    setDensity: (newDensity: DensityMode) => setDensity(newDensity),
    goNext,
    goPrevious,
    goToday,
    getDaysToDisplay,
  };
};