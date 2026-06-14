import { useState } from "react";

const moods = [
  {
    id: "boho",
    emoji: "🌺",
    label: "Boho",
    bg: "bg-amber-100",
    active: "border-amber-400",
    text: "text-amber-600",
  },
  {
    id: "street",
    emoji: "🕶️",
    label: "Street Style",
    bg: "bg-zinc-100",
    active: "border-zinc-400",
    text: "text-zinc-600",
  },
  {
    id: "baddie",
    emoji: "💅",
    label: "Baddie",
    bg: "bg-red-100",
    active: "border-red-400",
    text: "text-red-500",
  },
  {
    id: "beach",
    emoji: "🏖️",
    label: "Beach Vacation",
    bg: "bg-cyan-100",
    active: "border-cyan-400",
    text: "text-cyan-600",
  },
  {
    id: "soft-girl",
    emoji: "🌸",
    label: "Soft Girl",
    bg: "bg-pink-100",
    active: "border-pink-400",
    text: "text-pink-500",
  },
  {
    id: "cozy",
    emoji: "🍂",
    label: "Cozy",
    bg: "bg-orange-50",
    active: "border-orange-300",
    text: "text-orange-400",
  },
  {
    id: "casual",
    emoji: "👟",
    label: "Casual",
    bg: "bg-slate-100",
    active: "border-slate-400",
    text: "text-slate-600",
  },
  {
    id: "concert",
    emoji: "🎤",
    label: "Concert",
    bg: "bg-fuchsia-100",
    active: "border-fuchsia-400",
    text: "text-fuchsia-600",
  },
  {
    id: "formal",
    emoji: "👔",
    label: "Formal Wear",
    bg: "bg-blue-100",
    active: "border-blue-400",
    text: "text-blue-600",
  },
  {
    id: "traditional",
    emoji: "🪷",
    label: "Traditional",
    bg: "bg-rose-100",
    active: "border-rose-400",
    text: "text-rose-600",
  },
  {
    id: "that-girl",
    emoji: "✨",
    label: "That Girl",
    bg: "bg-orange-100",
    active: "border-orange-400",
    text: "text-orange-500",
  },
  {
    id: "night-out",
    emoji: "🌃",
    label: "Night Out",
    bg: "bg-indigo-100",
    active: "border-indigo-400",
    text: "text-indigo-600",
  },
  {
    id: "campus",
    emoji: "🎓",
    label: "Campus Casual",
    bg: "bg-teal-100",
    active: "border-teal-400",
    text: "text-teal-600",
  },
  {
    id: "girl-next-door",
    emoji: "🫶",
    label: "Girl Next Door",
    bg: "bg-lime-100",
    active: "border-lime-400",
    text: "text-lime-600",
  },
  {
    id: "brunch",
    emoji: "🛍️",
    label: "Brunch",
    bg: "bg-yellow-100",
    active: "border-yellow-400",
    text: "text-yellow-600",
  },
];

const palettes = {
  boho: ["#C4A882", "#D4B896", "#E8D5B7", "#8B6914", "#A0856C"],
  street: ["#2C2C2C", "#555555", "#888888", "#C0C0C0", "#F5F5F5"],
  baddie: ["#FF0040", "#1A1A1A", "#FF6B9D", "#C0392B", "#FFE4E8"],
  beach: ["#06B6D4", "#67E8F9", "#FDE68A", "#F97316", "#ECFEFF"],
  "soft-girl": ["#FFC8DD", "#FFAFCC", "#BDE0FE", "#CDB4DB", "#FFF0F3"],
  cozy: ["#D97706", "#F59E0B", "#FEF3C7", "#92400E", "#FFFBEB"],
  casual: ["#94A3B8", "#CBD5E1", "#F1F5F9", "#475569", "#E2E8F0"],
  concert: ["#D946EF", "#A21CAF", "#F0ABFC", "#1A1A2E", "#FAE8FF"],
  formal: ["#1E3A5F", "#2C5282", "#BEE3F8", "#2D3748", "#EBF8FF"],
  traditional: ["#BE123C", "#F43F5E", "#FDA4AF", "#FFD700", "#FFF1F2"],
  "that-girl": ["#FED7AA", "#FB923C", "#FFF7ED", "#EA580C", "#FFEDD5"],
  "night-out": ["#1A1A2E", "#16213E", "#C084FC", "#E879F9", "#F5F3FF"],
  campus: ["#0D9488", "#2DD4BF", "#CCFBF1", "#134E4A", "#F0FDFA"],
  "girl-next-door": ["#BEF264", "#A3E635", "#ECFCCB", "#4D7C0F", "#F7FEE7"],
  brunch: ["#FDE68A", "#FCA5A5", "#FBCFE8", "#C4B5FD", "#FFF9C4"],
};

function TodaysVibe() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Good morning 🌤️</h1>
        <p className="text-gray-400 mt-1">What's your vibe today?</p>
      </div>

      {/* Mood Cards */}
      <div className="grid grid-cols-3 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`${mood.bg} rounded-3xl p-6 flex flex-col items-center gap-2 border-2 transition-all duration-200 cursor-pointer
              ${selectedMood === mood.id ? `${mood.active} scale-105 shadow-md` : "border-transparent"}`}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className={`text-sm font-semibold ${mood.text}`}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Mood Response */}
      {selectedMood && (
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
          <p className="text-gray-500 text-sm">Today's vibe is locked in as</p>
          <p className="text-2xl font-bold text-pink-400 mt-1">
            {moods.find((m) => m.id === selectedMood).emoji}{" "}
            {moods.find((m) => m.id === selectedMood).label}
          </p>

          {/* Color Palette */}
          <div className="mt-5">
            <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
              Today's Color Palette
            </p>
            <div className="flex gap-2">
              {palettes[selectedMood].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full shadow-sm border border-white"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            ✨ Head to Outfit Studio to style your look!
          </p>
        </div>
      )}
    </div>
  );
}

export default TodaysVibe;
