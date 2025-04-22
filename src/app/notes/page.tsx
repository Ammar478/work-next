'use client'

// src/app/notes/page.tsx
import React, { useState, useEffect } from 'react';
import { NotesGrid } from '@/components/notes/NotesGrid';
import { CreateNoteInput } from '@/components/notes/CreateNoteInput';
import { Note } from '@/types/notes';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@/context/ThemeContext';

export default function NotesPage() {
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  
  // Load notes from localStorage on first render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Error parsing stored notes:', e);
      }
    } else {
      // Demo notes for first-time users
      const demoNotes: Note[] = [
        {
          id: '1',
          title: 'Notes in Hurry',
          content: 'Wired\nGrow with Google\nProject Euphoria\nFood Area at Chandni Chowk\nSquare in Mirpurkhas',
          color: 'bg-red-300',
          isPinned: true,
          labels: ['Notes'],
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'FOCUS',
          content: 'Web Development\nSTAY CALM... Do everything slowly.',
          color: 'bg-yellow-300',
          isPinned: true,
          labels: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Habits you should develop',
          content: 'Working hard\nReading books\nReading poetry\nLearning new things\nImproving skills\nWriting diary daily',
          color: 'bg-red-300',
          isPinned: true,
          labels: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Your Bad Habits',
          content: 'Watching too much Youtube\nWatching too much movies\nWasting a lot of time watching news',
          color: 'bg-red-300',
          isPinned: false,
          labels: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          title: 'To Live Longer!',
          content: 'Have plenty of sleep\nDon\'t take stress\nIntermittent Fasting\nVery low sugar intake\nExercise',
          color: 'bg-green-300',
          isPinned: false,
          labels: ['Health'],
          createdAt: new Date().toISOString(),
        },
        {
          id: '6',
          title: 'Rules of the Game',
          content: 'RULE 1: You must not break any of the rules given below or otherwise there will be serious consequences on your life.\nRULE 2: Bed Time: 11 PM\nRULE 3: Sleep Duration: 7 hours',
          color: 'bg-blue-300',
          isPinned: false,
          labels: [],
          createdAt: new Date().toISOString(),
        },
      ];
      setNotes(demoNotes);
    }
  }, []);
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...note,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const pinNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  const addLabelToNote = (noteId: string, label: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId && !note.labels.includes(label)
          ? { ...note, labels: [...note.labels, label] }
          : note
      )
    );
  };

  const removeLabelFromNote = (noteId: string, label: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? { ...note, labels: note.labels.filter((l) => l !== label) }
          : note
      )
    );
  };

  const filterNotesByLabel = (label: string | null) => {
    setActiveLabel(label);
  };

  // Filter notes by search term and active label
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = searchTerm.trim() === '' || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLabel = activeLabel === null || note.labels.includes(activeLabel);
    
    return matchesSearch && matchesLabel;
  });

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const otherNotes = filteredNotes.filter((note) => !note.isPinned);

  // Get all unique labels from notes
  const allLabels = Array.from(
    new Set(notes.flatMap((note) => note.labels))
  );

  // Background color based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto mb-8">
          <CreateNoteInput addNote={addNote} />
        </div>
        
        {/* Labels Filter */}
        {allLabels.length > 0 && (
          <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center gap-2">
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Filter by:
            </span>
            <button
              onClick={() => filterNotesByLabel(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeLabel === null
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {allLabels.map((label) => (
              <button
                key={label}
                onClick={() => filterNotesByLabel(label)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeLabel === label
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Search input */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 search-input ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400'
                  : 'bg-white text-gray-900 border border-gray-200 placeholder-gray-500'
              }`}
            />
            <div className="absolute left-3 top-3.5">
              <svg
                className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                className="absolute right-3 top-3.5"
                onClick={() => setSearchTerm('')}
              >
                <svg
                  className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {pinnedNotes.length > 0 && (
          <div className="mb-8 fade-in">
            <h2 className={`text-sm font-medium uppercase tracking-wide mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Pinned
            </h2>
            <NotesGrid
              notes={pinnedNotes}
              pinNote={pinNote}
              deleteNote={deleteNote}
              updateNote={updateNote}
              addLabelToNote={addLabelToNote}
              removeLabelFromNote={removeLabelFromNote}
            />
          </div>
        )}

        {otherNotes.length > 0 && (
          <div className="fade-in">
            {pinnedNotes.length > 0 && (
              <h2 className={`text-sm font-medium uppercase tracking-wide mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Other Notes
              </h2>
            )}
            <NotesGrid
              notes={otherNotes}
              pinNote={pinNote}
              deleteNote={deleteNote}
              updateNote={updateNote}
              addLabelToNote={addLabelToNote}
              removeLabelFromNote={removeLabelFromNote}
            />
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className={`text-center py-12 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-medium">No notes found</p>
            <p className="mt-1">
              {searchTerm
                ? `No results for "${searchTerm}"`
                : activeLabel
                  ? `No notes with label "${activeLabel}"`
                  : 'Create your first note!'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}