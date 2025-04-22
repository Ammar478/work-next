'use client'
import React, { useState } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  interval?: number; // in minutes
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  interval = 15,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const generateTimeOptions = () => {
    const options = [];
    const minutes = 24 * 60;
    
    for (let i = 0; i < minutes; i += interval) {
      const hour = Math.floor(i / 60);
      const minute = i % 60;
      
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      
      options.push(`${formattedHour}:${formattedMinute}`);
    }
    
    return options;
  };
  
  const handleTimeSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border rounded-md"
        placeholder="Select time"
      />
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-1">
            {generateTimeOptions().map((time) => (
              <div
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`px-3 py-1 cursor-pointer hover:bg-gray-100 rounded ${
                  time === value ? 'bg-indigo-100 text-indigo-800' : ''
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};