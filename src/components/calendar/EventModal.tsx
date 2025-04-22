// src/components/calendar/EventModal.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarEvent, Participant } from '../../types/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { TimePicker } from '../ui/TimePicker';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete: (eventId: string) => void;
  event: CalendarEvent | null;
  isCreate: boolean;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  isCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [eventType, setEventType] = useState<'meeting' | 'event'>('meeting');
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [newParticipantEmail, setNewParticipantEmail] = useState('');
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      
      setStartDate(format(new Date(event.startTime), 'yyyy-MM-dd'));
      setStartTime(format(new Date(event.startTime), 'HH:mm'));
      
      setEndDate(format(new Date(event.endTime), 'yyyy-MM-dd'));
      setEndTime(format(new Date(event.endTime), 'HH:mm'));
      
      setLocation(event.location?.name || '');
      setParticipants(event.participants || []);
      setRepeatDays(event.repeatDays?.map(day => day.toString()) || []);
    } else {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      
      setTitle('');
      setDescription('');
      
      setStartDate(format(now, 'yyyy-MM-dd'));
      setStartTime(format(now, 'HH:mm'));
      
      setEndDate(format(now, 'yyyy-MM-dd'));
      setEndTime(format(oneHourLater, 'HH:mm'));
      
      setLocation('');
      setParticipants([]);
      setRepeatDays([]);
    }
  }, [event, isOpen]);

const handleSave = () => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    const newEvent: Omit<CalendarEvent, 'id'> = {
      title,
      description,
      startTime: startDateTime,
      endTime: endDateTime,
      participants,
      location: location ? {
        name: location,
        address: '',
      } : undefined,
      repeatDays: repeatDays.length > 0 ? repeatDays as ('M' | 'T' | 'W' | 'TH' | 'F' | 'S' | 'SU')[] : undefined,
      links: [{ type: 'Go to Zoom link', url: '#' }],
    };
    
    onSave(newEvent);
  };

  const handleDelete = () => {
    if (event) {
      onDelete(event.id);
    }
  };

  const handleToggleRepeatDay = (day: string) => {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter(d => d !== day));
    } else {
      setRepeatDays([...repeatDays, day]);
    }
  };

  const handleAddParticipant = () => {
    if (newParticipantName && newParticipantEmail) {
      const newParticipant: Participant = {
        id: Date.now().toString(),
        name: newParticipantName,
        email: newParticipantEmail,
        status: 'pending',
      };
      
      setParticipants([...participants, newParticipant]);
      setNewParticipantName('');
      setNewParticipantEmail('');
      setShowAddParticipant(false);
    }
  };

  const handleRemoveParticipant = (participantId: string) => {
    setParticipants(participants.filter(p => p.id !== participantId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${eventType === 'meeting' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setEventType('meeting')}
            >
              Meeting
            </button>
            <button
              className={`px-3 py-1 rounded ${eventType === 'event' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setEventType('event')}
            >
              Event
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-start mb-2">
              <div className="rounded-full bg-red-500 text-white flex items-center justify-center w-10 h-10 mr-2">
               <span className="text-xs">
  {startDate ? format(new Date(startDate), 'dd') : '--'}
</span>
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${eventType === 'meeting' ? 'Meeting' : 'Event'} title`}
                className="text-lg font-medium w-full"
              />
            </div>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              className="w-full mt-2"
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Duration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <TimePicker
                    value={startTime}
                    onChange={setStartTime}
                    interval={15}
                  />
                  <span className="text-gray-500">→</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <TimePicker
                    value={endTime}
                    onChange={setEndTime}
                    interval={15}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Repeat on</h3>
            <div className="flex space-x-2">
              {['M', 'T', 'W', 'TH', 'F', 'S', 'SU'].map((day) => (
                <button
                  key={day}
                  className={`w-8 h-8 rounded-full text-xs ${
                    repeatDays.includes(day)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleToggleRepeatDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Participant</h3>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar name={participant.name} size="sm" />
                    <div>
                      <div className="text-sm">{participant.name}</div>
                      <div className="text-xs text-gray-500">{participant.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        participant.status === 'accepted'
                          ? 'success'
                          : participant.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </Badge>
                    <button
                      onClick={() => handleRemoveParticipant(participant.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {showAddParticipant ? (
                <div className="p-3 border rounded-md">
                  <div className="mb-2">
                    <Input
                      placeholder="Name"
                      value={newParticipantName}
                      onChange={(e) => setNewParticipantName(e.target.value)}
                      className="mb-2"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={newParticipantEmail}
                      onChange={(e) => setNewParticipantEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddParticipant(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddParticipant}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  className="border border-dashed border-gray-300 rounded-md p-2 w-full text-sm text-gray-500 hover:bg-gray-50"
                  onClick={() => setShowAddParticipant(true)}
                >
                  + Add participant
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
            <div className="border rounded-md p-2">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full"
              />
              {location && (
                <div className="mt-2 h-32 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-sm text-gray-500">Map preview would appear here</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between p-4 border-t">
          {!isCreate && (
            <Button variant="outline" color="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {isCreate ? 'Create' : 'Update'} {eventType}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};