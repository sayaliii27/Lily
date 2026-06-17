import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLily } from "../LilyContext";

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

const tags = {
  boho: ["flowy fits", "earthy tones", "layered jewellery"],
  street: ["oversized", "sneakers", "caps"],
  baddie: ["bodycon", "bold lips", "chrome nails"],
  beach: ["co-ords", "sun hat", "sandals"],
  "soft-girl": ["pastel tones", "hair bow", "blush"],
  cozy: ["oversized knit", "warm tones", "fuzzy socks"],
  casual: ["denim", "clean basics", "white sneakers"],
  concert: ["statement look", "glitter", "boots"],
  formal: ["blazer", "neutral tones", "minimal jewellery"],
  traditional: ["ethnic wear", "jhumkas", "bindi"],
  "that-girl": ["matching set", "clean girl", "gold hoops"],
  "night-out": ["dark tones", "heels", "bold outfit"],
  campus: ["comfy chic", "tote bag", "fresh fit"],
  "girl-next-door": ["effortless", "natural look", "simple jewellery"],
  brunch: ["sundress", "minimal makeup", "cute bag"],
};

function TodaysVibe() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [hoveredMood, setHoveredMood] = useState(null);
  const navigate = useNavigate();
  const { updateLook } = useLily();

  const selected = moods.find((m) => m.id === selectedMood);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Good morning 🌤️</h1>
        <p className="text-gray-400 mt-1">
          Hover to preview · Click to lock in your vibe
        </p>
      </div>

      <div className="flex gap-6">
        {/* Mood Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-4">
            {moods.map((mood) => (
              <div
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                onMouseEnter={() => setHoveredMood(mood.id)}
                onMouseLeave={() => setHoveredMood(null)}
                className={`relative ${mood.bg} rounded-3xl p-6 flex flex-col items-center gap-2 border-2 transition-all duration-200 cursor-pointer
                  ${selectedMood === mood.id ? `${mood.active} scale-105 shadow-md` : "border-transparent hover:scale-105 hover:shadow-sm"}`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className={`text-sm font-semibold ${mood.text}`}>
                  {mood.label}
                </span>

                {/* Hover Palette Tooltip */}
                {hoveredMood === mood.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-100 z-10 flex gap-1.5">
                    {palettes[mood.id].map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-56 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col gap-4 h-fit sticky top-6"
            >
              <div className="text-5xl">{selected.emoji}</div>
              <div>
                <p className="text-lg font-bold text-gray-700">
                  {selected.label}
                </p>
                <p className="text-xs text-gray-400">today's vibe ✨</p>
              </div>

              {/* Palette */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                  colour palette
                </p>
                <div className="flex gap-2 flex-wrap">
                  {palettes[selected.id].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                  style notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags[selected.id].map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-pink-50 text-pink-400 px-3 py-1 rounded-full border border-pink-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  updateLook({ mood: selected });
                  navigate("/outfit-studio?flow=true");
                }}
                className="mt-2 w-full bg-pink-400 hover:bg-pink-500 transition-colors text-white text-sm font-semibold py-3 rounded-2xl"
              >
                style my outfit →
              </button>
              <button
                onClick={() => {
                  updateLook({ mood: selected });
                  navigate("/caption-lab?flow=true");
                }}
                className="mt-2 w-full bg-white hover:bg-pink-50 transition-colors text-pink-400 text-sm font-medium py-2 rounded-2xl border border-pink-200"
              >
                skip to captions →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TodaysVibe;
