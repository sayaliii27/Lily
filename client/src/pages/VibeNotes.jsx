import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  {
    id: "pink",
    bg: "bg-pink-100",
    border: "border-pink-300",
    text: "text-pink-600",
  },
  {
    id: "yellow",
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-600",
  },
  {
    id: "purple",
    bg: "bg-purple-100",
    border: "border-purple-300",
    text: "text-purple-600",
  },
  {
    id: "blue",
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-600",
  },
  {
    id: "green",
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-600",
  },
  {
    id: "orange",
    bg: "bg-orange-100",
    border: "border-orange-300",
    text: "text-orange-600",
  },
];

function VibeNotes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [pinned, setPinned] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addNote = () => {
    if (!body.trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      body,
      color: selectedColor,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
    setBody("");
    setSelectedColor(colors[0]);
    setShowForm(false);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setPinned((prev) => prev.filter((i) => i !== id));
  };

  const togglePin = (id) => {
    setPinned((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const pinnedNotes = notes.filter((n) => pinned.includes(n.id));
  const unpinnedNotes = notes.filter((n) => !pinned.includes(n.id));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Vibe Notes 📒</h1>
          <p className="text-gray-400 mt-1">
            Jot down outfit ideas, inspo, things to buy
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition-colors"
        >
          + new note
        </button>
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm mb-6"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title (optional)"
              className="w-full text-gray-700 font-semibold text-lg bg-transparent border-none outline-none mb-3 placeholder-gray-300"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind? outfit ideas, things to buy, inspo..."
              className="w-full text-gray-500 text-sm bg-transparent border-none outline-none resize-none mb-4 placeholder-gray-300"
              rows={4}
              autoFocus
            />

            {/* Color Picker */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xs text-gray-400">colour</p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${color.bg} border-2 transition-all
                      ${selectedColor.id === color.id ? `${color.border} scale-125` : "border-transparent"}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addNote}
                disabled={!body.trim()}
                className="bg-pink-400 hover:bg-pink-500 disabled:bg-pink-200 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl transition-colors"
              >
                save note
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-2xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50"
              >
                cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {notes.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-pink-200">
          <p className="text-4xl mb-3">📒</p>
          <p className="text-gray-400 text-sm font-medium">No notes yet</p>
          <p className="text-gray-300 text-xs mt-1">
            tap + new note to start 🌸
          </p>
        </div>
      )}

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">
            📌 Pinned
          </p>
          <div className="grid grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isPinned={true}
                onDelete={deleteNote}
                onPin={togglePin}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Notes */}
      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">
              All Notes
            </p>
          )}
          <div className="grid grid-cols-3 gap-4">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isPinned={false}
                onDelete={deleteNote}
                onPin={togglePin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NoteCard({ note, isPinned, onDelete, onPin }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`${note.color.bg} rounded-3xl p-5 border-2 ${isPinned ? note.color.border : "border-transparent"} relative group`}
    >
      {/* Actions */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onPin(note.id)}
          className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-all"
        >
          {isPinned ? "📌" : "📍"}
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-all"
        >
          ✕
        </button>
      </div>

      {note.title && (
        <p className={`font-semibold text-sm mb-2 ${note.color.text}`}>
          {note.title}
        </p>
      )}
      <p className="text-gray-600 text-xs leading-relaxed">{note.body}</p>
      <p className="text-gray-400 text-xs mt-3">{note.createdAt}</p>
    </motion.div>
  );
}

export default VibeNotes;
