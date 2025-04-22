'use client'

import React, { useState } from 'react';
import { Note } from '@/types/notes';
import { useTheme } from '@/context/ThemeContext';

interface CreateNoteInputProps {
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

export const CreateNoteInput: React.FC<CreateNoteInputProps> = ({ addNote }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(theme === 'dark' ? 'bg-gray-800 dark:bg-gray-800' : 'bg-white dark:bg-gray-800');
  const [showColorPalette, setShowColorPalette] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      addNote({
        title: title.trim(),
        content: content.trim(),
        color,
        isPinned: false,
        labels: [],
      });
      setTitle('');
      setContent('');
      setColor(theme === 'dark' ? 'bg-gray-800 dark:bg-gray-800' : 'bg-white dark:bg-gray-800');
      setIsExpanded(false);
      setShowColorPalette(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const colors = [
    { value: theme === 'dark' ? 'bg-gray-800 dark:bg-gray-800' : 'bg-white dark:bg-gray-800', label: 'Default' },
    { value: 'bg-red-100 dark:bg-red-900', label: 'Red' },
    { value: 'bg-yellow-100 dark:bg-yellow-900', label: 'Yellow' },
    { value: 'bg-green-100 dark:bg-green-900', label: 'Green' },
    { value: 'bg-blue-100 dark:bg-blue-900', label: 'Blue' },
    { value: 'bg-purple-100 dark:bg-purple-900', label: 'Purple' }
  ];

  const shadowClass = theme === 'dark' ? 'shadow-lg shadow-gray-800/30' : 'shadow-lg';
  const borderClass = theme === 'dark' ? 'border border-gray-700' : 'border border-gray-200';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const placeholderClass = theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500';

  return (
    <div className={`${color} ${shadowClass} ${borderClass} rounded-lg transition-all duration-200`}>
      <div className="p-4">
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 mb-2 bg-transparent outline-none font-medium text-lg ${textClass} ${placeholderClass} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={handleKeyDown}
          className={`w-full p-2 bg-transparent outline-none resize-none ${textClass} ${placeholderClass}`}
          rows={isExpanded ? 4 : 1}
        />
        {isExpanded && (
          <div className="flex items-center justify-between mt-3 pt-1">
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <button
                  className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                  onClick={() => setShowColorPalette(!showColorPalette)}
                  aria-label="Change note color"
                >
                  <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </button>
                
                {showColorPalette && (
                  <div className={`absolute z-10 left-0 mt-2 p-2 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                    <div className="flex flex-wrap gap-2 max-w-[168px]">
                      {colors.map((colorOption) => (
                        <button
                          key={colorOption.value}
                          className={`w-7 h-7 rounded-full ${colorOption.value} ${
                            color === colorOption.value 
                              ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' 
                              : 'border border-gray-300 dark:border-gray-600'
                          }`}
                          onClick={() => {
                            setColor(colorOption.value);
                            setShowColorPalette(false);
                          }}
                          aria-label={`Set note color to ${colorOption.label}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Add reminder"
              >
                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              <button
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Add label"
              >
                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Ctrl+Enter to save
              </div>
              <button
                className={`px-3 py-1.5 rounded-md text-sm ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors`}
                onClick={() => {
                  setIsExpanded(false);
                  setShowColorPalette(false);
                }}
              >
                Close
              </button>
              <button
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};