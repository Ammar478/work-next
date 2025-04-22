'use client'

import React, { useState } from 'react';
import { Note } from '@/types/notes';
import { useTheme } from '@/context/ThemeContext';

interface NoteCardProps {
  note: Note;
  onPin: () => void;
  onDelete: () => void;
  onUpdate: (note: Note) => void;
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onPin,
  onDelete,
  onUpdate,
  onAddLabel,
  onRemoveLabel,
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [selectedColor, setSelectedColor] = useState(note.color);

  const handleUpdate = () => {
    if (editTitle.trim() || editContent.trim()) {
      onUpdate({
        ...note,
        title: editTitle.trim(),
        content: editContent.trim(),
        color: selectedColor
      });
      setIsEditing(false);
    }
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && note.labels.length < 5) {
      onAddLabel(newLabel.trim());
      setNewLabel('');
      setShowLabelInput(false);
    } else {
      setShowLabelInput(false);
    }
  };

  // Available note colors
  const noteColors = [
    { value: 'bg-white dark:bg-gray-800', label: 'Default' },
    { value: 'bg-red-100 dark:bg-red-900', label: 'Red' },
    { value: 'bg-yellow-100 dark:bg-yellow-900', label: 'Yellow' },
    { value: 'bg-green-100 dark:bg-green-900', label: 'Green' },
    { value: 'bg-blue-100 dark:bg-blue-900', label: 'Blue' },
    { value: 'bg-purple-100 dark:bg-purple-900', label: 'Purple' },
  ];

  // Shadow and text classes based on theme
  const shadowClass = theme === 'dark' ? 'shadow-lg shadow-black/20' : 'shadow-md';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const borderClass = theme === 'dark' && note.color === 'bg-white' ? 'border border-gray-700' : '';

  return (
    <div className={`${note.color} ${shadowClass} ${borderClass} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg`}>
      {isEditing ? (
        <div className="p-4">
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={`w-full p-2 mb-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md outline-none font-medium ${textClass} focus:ring-2 focus:ring-indigo-500`}
          />
          <textarea
            placeholder="Take a note..."
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={`w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md outline-none resize-none ${textClass} focus:ring-2 focus:ring-indigo-500`}
            rows={6}
          />
          
          {/* Color selector */}
          <div className="mt-3 mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Note color</label>
            <div className="flex space-x-2">
              {noteColors.map((color) => (
                <button
                  key={color.value}
                  className={`w-6 h-6 rounded-full ${color.value} ${
                    selectedColor === color.value 
                      ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' 
                      : 'border border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Set note color to ${color.label}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button
              className={`px-3 py-1.5 rounded-md text-sm mr-2 ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors"
              onClick={handleUpdate}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-4">
            {note.title && (
              <h3 className={`font-medium ${textClass} mb-2`}>{note.title}</h3>
            )}
            <div className={`${secondaryTextClass} whitespace-pre-line`}>{note.content}</div>

            {note.labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {note.labels.map((label) => (
                  <span
                    key={label}
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {label}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => onRemoveLabel(label)}
                      aria-label={`Remove ${label} label`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'} px-4 py-2 flex justify-between`}>
            <div className="flex space-x-3">
              <button
                className={`p-1.5 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                onClick={onPin}
                aria-label={note.isPinned ? "Unpin note" : "Pin note"}
              >
                <svg
                  className="h-5 w-5"
                  fill={note.isPinned ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button
                className={`p-1.5 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                onClick={() => setIsEditing(true)}
                aria-label="Edit note"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <div className="relative">
                <button
                  className={`p-1.5 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                  onClick={() => setShowLabelInput(!showLabelInput)}
                  aria-label="Add label"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </button>
                {showLabelInput && (
                  <div className={`absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg ${
                    theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="p-2">
                      <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Enter label"
                        className={`w-full p-2 rounded border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          className={`px-3 py-1 text-sm mr-2 ${
                            theme === 'dark'
                              ? 'text-gray-300 hover:text-gray-100'
                              : 'text-gray-700 hover:text-gray-900'
                          }`}
                          onClick={() => setShowLabelInput(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          onClick={handleAddLabel}
                        >
                          Add
                        </button>
                      </div>
                      {note.labels.length >= 5 && (
                        <p className="text-xs text-red-500 mt-1">
                          Label limit reached (5)
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              className={`p-1.5 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
              onClick={onDelete}
              aria-label="Delete note"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};