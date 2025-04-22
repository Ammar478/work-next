'use client'

import React from 'react';
import { Note } from '@/types/notes';
import { NoteCard } from './NoteCard';
import { useTheme } from '@/context/ThemeContext';

interface NotesGridProps {
  notes: Note[];
  pinNote: (id: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (note: Note) => void;
  addLabelToNote: (noteId: string, label: string) => void;
  removeLabelFromNote: (noteId: string, label: string) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  pinNote,
  deleteNote,
  updateNote,
  addLabelToNote,
  removeLabelFromNote,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onPin={() => pinNote(note.id)}
          onDelete={() => deleteNote(note.id)}
          onUpdate={updateNote}
          onAddLabel={(label) => addLabelToNote(note.id, label)}
          onRemoveLabel={(label) => removeLabelFromNote(note.id, label)}
        />
      ))}
    </div>
  );
};

