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
  
  // Get category color and class
  const getCategoryClasses = (cat: string) => {
    switch (cat) {
      case 'productivity':
        return theme === 'dark' 
          ? 'bg-purple-900 bg-opacity-50 text-purple-100 border-purple-500' 
          : 'bg-purple-100 text-purple-800 border-purple-500';
      case 'hobby':
        return theme === 'dark'
          ? 'bg-blue-900 bg-opacity-50 text-blue-100 border-blue-500'
          : 'bg-blue-100 text-blue-800 border-blue-500';
      case 'personal':
        return theme === 'dark'
          ? 'bg-pink-900 bg-opacity-50 text-pink-100 border-pink-500'
          : 'bg-pink-100 text-pink-800 border-pink-500';
      default:
        return theme === 'dark'
          ? 'bg-gray-700 text-gray-200 border-gray-600'
          : 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-middle bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Create New Event
                  </h3>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Event Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add title"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setCategory('productivity')}
                        className={`py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium border ${
                          category === 'productivity' 
                            ? getCategoryClasses('productivity') 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        Productivity
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('hobby')}
                        className={`py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium border ${
                          category === 'hobby' 
                            ? getCategoryClasses('hobby') 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        Hobby
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('personal')}
                        className={`py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium border ${
                          category === 'personal' 
                            ? getCategoryClasses('personal') 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                        Personal
                      </button>
                    </div>
                  </div>
                  
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date & Time
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          id="start-date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date & Time
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          id="end-date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Add location"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (optional)
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags (optional)
                    </label>
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
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                    
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              <span className="sr-only">Remove tag</span>
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              disabled={!title.trim()}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${!title.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Create Event
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;