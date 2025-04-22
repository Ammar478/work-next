'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';

interface Event {
  title: string;
  start: Date;
  end: Date;
  category: 'productivity' | 'hobby' | 'personal';
  color?: string;
  description?: string;
  location?: string;
  tags?: string[];
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  defaultDate: Date;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultDate
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'productivity' | 'hobby' | 'personal'>('productivity');
  const [startDate, setStartDate] = useState(format(defaultDate, 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState(format(defaultDate, 'yyyy-MM-dd'));
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSave = () => {
    if (!title.trim()) return;
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      start: startDateTime,
      end: endDateTime,
      category,
      location: location.trim(),
      tags: tags.length > 0 ? tags : undefined
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('productivity');
    setStartDate(format(new Date(), 'yyyy-MM-dd'));
    setStartTime('09:00');
    setEndDate(format(new Date(), 'yyyy-MM-dd'));
    setEndTime('10:00');
    setLocation('');
    setTags([]);
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium leading-6">Add New Event</h3>
            <button 
              className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={onClose}
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
            
            {/* Actions */}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-md border ${borderClass} ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                disabled={!title.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;