'use client'

// src/components/calendar/EventDetailsModal.tsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';

interface Event {
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

interface EventDetailsModalProps {
  isOpen: boolean;
  event: Event;
  onClose: () => void;
  onUpdate: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  event,
  onClose,
  onUpdate,
  onDelete
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description || '');
  const [category, setCategory] = useState<'productivity' | 'hobby' | 'personal'>(event.category);
  const [startDate, setStartDate] = useState(format(new Date(event.start), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(new Date(event.start), 'HH:mm'));
  const [endDate, setEndDate] = useState(format(new Date(event.end), 'yyyy-MM-dd'));
  const [endTime, setEndTime] = useState(format(new Date(event.end), 'HH:mm'));
  const [location, setLocation] = useState(event.location || '');
  const [isCompleted, setIsCompleted] = useState(event.isCompleted || false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(event.tags || []);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleUpdate = () => {
    if (!title.trim()) return;
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    onUpdate({
      ...event,
      title: title.trim(),
      description: description.trim(),
      start: startDateTime,
      end: endDateTime,
      category,
      location: location.trim(),
      tags: tags.length > 0 ? tags : undefined,
      isCompleted
    });
    
    setIsEditing(false);
  };
  
  const handleDeleteEvent = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };
  
  // Get category color
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'productivity':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'hobby':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'personal':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Dynamic classes based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const inputBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className={`relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform ${bgClass} ${textClass} shadow-xl rounded-2xl`}>
          {isEditing ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium leading-6">Edit Event</h3>
                <button 
                  className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setIsEditing(false)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Event title */}
                <div>
                  <input
                    type="text"
                    placeholder="Event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                
                {/* Category selector */}
                <div className="flex space-x-2">
                  <button
                    className={`flex-1 py-2 rounded-md text-center ${
                      category === 'productivity' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                        : `border ${borderClass} text-gray-700 dark:text-gray-300`
                    }`}
                    onClick={() => setCategory('productivity')}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
                    Productivity
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-md text-center ${
                      category === 'hobby' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : `border ${borderClass} text-gray-700 dark:text-gray-300`
                    }`}
                    onClick={() => setCategory('hobby')}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                    Hobby
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-md text-center ${
                      category === 'personal' 
                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' 
                        : `border ${borderClass} text-gray-700 dark:text-gray-300`
                    }`}
                    onClick={() => setCategory('personal')}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-1"></span>
                    Personal
                  </button>
                </div>
                
                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-medium mb-1">Start</label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className={`w-24 px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">End</label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className={`w-24 px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>
                
                {/* Location */}
                <div>
                  <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                
                {/* Description */}
                <div>
                  <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add tag and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className={`flex-1 px-3 py-2 rounded-md border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Completion Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="completed"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="completed" className="ml-2 text-sm">
                    Mark as completed
                  </label>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className={`px-4 py-2 rounded-md border ${borderClass} ${
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                      disabled={!title.trim()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <button 
                  className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h2 className="text-xl font-bold mb-4">{event.title}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    {format(new Date(event.start), 'EEEE, MMMM d, yyyy')}
                    <br />
                    {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                  </p>
                </div>
                
                {event.location && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>{event.location}</p>
                  </div>
                )}
                
                {event.description && (
                  <div className="py-2">
                    <p className="whitespace-pre-line">{event.description}</p>
                  </div>
                )}
                
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleDeleteEvent}
                    className="px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30"
                  >
                    Delete
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={onClose}
                      className={`px-3 py-1.5 text-sm rounded-md border ${borderClass} ${
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;