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
  const [color, setColor] = useState(theme === 'dark' ? 'bg-gray-800' : 'bg-white');

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
      setColor(theme === 'dark' ? 'bg-gray-800' : 'bg-white');
      setIsExpanded(false);
    }
  };

  const colors = [
    theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    'bg-red-300 dark:bg-red-900',
    'bg-yellow-300 dark:bg-yellow-900',
    'bg-green-300 dark:bg-green-900',
    'bg-blue-300 dark:bg-blue-900',
    'bg-purple-300 dark:bg-purple-900',
  ];

  const shadowClass = theme === 'dark' ? 'shadow-lg shadow-gray-800/30' : 'shadow-md';
  const borderClass = theme === 'dark' ? 'border border-gray-700' : '';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const placeholderClass = theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500';

  return (
    <div className={`${color} ${shadowClass} ${borderClass} rounded-lg p-4 transition-all duration-200`}>
      {isExpanded && (
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 mb-2 bg-transparent outline-none font-medium ${textClass} ${placeholderClass}`}
        />
      )}
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        className={`w-full p-2 bg-transparent outline-none resize-none ${textClass} ${placeholderClass}`}
        rows={isExpanded ? 4 : 1}
      />
      {isExpanded && (
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-2">
            {colors.map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border transition-colors ${
                  c === color 
                    ? 'border-indigo-500 dark:border-indigo-400' 
                    : 'border-gray-300 dark:border-gray-600'
                } ${c}`}
                onClick={() => setColor(c)}
                aria-label={`Set note color to ${c.replace('bg-', '')}`}
              />
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsExpanded(false)}
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
  );
};