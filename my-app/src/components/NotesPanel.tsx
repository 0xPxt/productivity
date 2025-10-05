'use client';

import { useState } from 'react';
import { StickyNote, X } from 'lucide-react';

export default function NotesPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');

  return (
    <>
      {/* Toggle Button - Fixed to right side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[calc(50%-5rem)] -translate-y-1/2 -right-3 bg-highlight border-2 border-r-0 border-border rounded-l-lg px-6 py-3 hover:bg-border hover:right-0 transition-all duration-300 cursor-pointer z-40 shadow-md"
        aria-label="Toggle notes"
      >
        <StickyNote className="w-5 h-5 text-foreground transition-colors" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-accent/20 backdrop-blur-sm z-45"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 -right-96 h-2/3 min-h-[400px] w-96 bg-highlight border-2 border-border rounded-2xl shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? '-translate-x-[25rem]' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
            <h2 className="text-2xl font-bold text-foreground">Notes</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-border rounded transition-colors cursor-pointer"
              aria-label="Close notes"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {/* Notes Textarea - Scrollable */}
          <div className="flex-1 px-6 pb-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here..."
              className="w-full h-full px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder:text-secondary resize-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
