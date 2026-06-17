import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLily } from "../LilyContext";

const categories = [
  { id: "tops", label: "Tops", emoji: "👚" },
  { id: "bottoms", label: "Bottoms", emoji: "👖" },
  { id: "dresses", label: "Dresses", emoji: "👗" },
  { id: "shoes", label: "Shoes", emoji: "👟" },
  { id: "bags", label: "Bags", emoji: "👜" },
  { id: "accessories", label: "Accessories", emoji: "💍" },
  { id: "outerwear", label: "Outerwear", emoji: "🧥" },
  { id: "jewellery", label: "Jewellery", emoji: "✨" },
];

const slots = [
  { id: "top", label: "Top", emoji: "👚", accepts: ["tops", "dresses"] },
  {
    id: "bottom",
    label: "Bottom",
    emoji: "👖",
    accepts: ["bottoms", "dresses"],
  },
  { id: "outerwear", label: "Outerwear", emoji: "🧥", accepts: ["outerwear"] },
  { id: "shoes", label: "Shoes", emoji: "👟", accepts: ["shoes"] },
  { id: "bag", label: "Bag", emoji: "👜", accepts: ["bags"] },
  {
    id: "extras",
    label: "Accessories",
    emoji: "💍",
    accepts: ["accessories", "jewellery"],
  },
];

function OutfitStudio() {
  const [activeCategory, setActiveCategory] = useState("tops");
  const [wardrobe, setWardrobe] = useState({
    tops: [],
    bottoms: [],
    dresses: [],
    shoes: [],
    bags: [],
    accessories: [],
    outerwear: [],
    jewellery: [],
  });
  const [outfit, setOutfit] = useState({
    top: null,
    bottom: null,
    outerwear: null,
    shoes: null,
    bag: null,
    extras: null,
  });
  const [lookbook, setLookbook] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [visualizing, setVisualizing] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { currentLook, updateLook } = useLily();
  const isFlow = new URLSearchParams(location.search).get("flow") === "true";

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      const newPiece = {
        id: data.public_id,
        url: data.secure_url,
        category: activeCategory,
      };
      setWardrobe((prev) => ({
        ...prev,
        [activeCategory]: [...prev[activeCategory], newPiece],
      }));
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handlePieceClick = (piece) => {
    const slot = slots.find((s) => s.accepts.includes(piece.category));
    if (!slot) return;
    if (activeSlot) {
      setOutfit((prev) => ({ ...prev, [activeSlot]: piece }));
      setActiveSlot(null);
    } else {
      setOutfit((prev) => ({ ...prev, [slot.id]: piece }));
    }
  };

  const filledCount = Object.values(outfit).filter(Boolean).length;

  const saveToLookbook = () => {
    const look = {
      id: Date.now(),
      outfit,
      createdAt: new Date().toLocaleDateString(),
    };
    setLookbook((prev) => [...prev, look]);
    setVisualizing(false);
    setOutfit({ top: null, bottom: null, shoes: null, bag: null });
  };

  if (visualizing) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setVisualizing(false)}
            className="text-sm text-pink-400 border border-pink-200 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors"
          >
            ← back to studio
          </button>
          <h1 className="text-2xl font-bold text-gray-700">Your Look ✨</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-6">
            {slots.map((slot) => (
              <div key={slot.id} className="flex flex-col items-center gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {slot.label}
                </p>
                {outfit[slot.id] ? (
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-pink-100">
                    <img
                      src={outfit[slot.id].url}
                      alt={slot.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-2xl bg-pink-50 border border-dashed border-pink-200 flex items-center justify-center">
                    <span className="text-4xl opacity-30">{slot.emoji}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={saveToLookbook}
            className="flex-1 bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold py-3 rounded-2xl transition-colors"
          >
            🔖 Save to Lookbook
          </button>
          <button
            onClick={() => setVisualizing(false)}
            className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50"
          >
            edit look
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Outfit Studio 👗</h1>
          <p className="text-gray-400 mt-1">Build your look piece by piece</p>
        </div>
        {lookbook.length > 0 && (
          <div className="text-xs text-gray-400 bg-pink-50 px-3 py-2 rounded-full border border-pink-100">
            🔖 {lookbook.length} saved look{lookbook.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {isFlow && currentLook.mood && (
        <div className="flex items-center gap-3 mb-6 bg-white px-4 py-3 rounded-2xl border border-pink-100 shadow-sm w-fit">
          <span className="text-2xl">{currentLook.mood.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {currentLook.mood.label}
            </p>
            <p className="text-xs text-gray-400">your vibe today</p>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Left — Wardrobe */}
        <div className="flex-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all
                  ${activeCategory === cat.id ? "bg-pink-400 text-white border-pink-400" : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"}`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Pieces Grid */}
          <div className="grid grid-cols-4 gap-3">
            {wardrobe[activeCategory].map((piece) => (
              <motion.div
                key={piece.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => handlePieceClick(piece)}
                className="rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-300 hover:shadow-sm transition-all aspect-square"
              >
                <img
                  src={piece.url}
                  alt="piece"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            {/* Upload Button */}
            <label className="rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all aspect-square gap-1">
              {uploading ? (
                <span className="text-pink-300 text-xs animate-pulse">
                  uploading...
                </span>
              ) : (
                <>
                  <span className="text-2xl">📸</span>
                  <span className="text-xs text-pink-300">upload</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>

            {wardrobe[activeCategory].length === 0 && (
              <div className="col-span-3 flex items-center justify-center h-32 rounded-2xl bg-white border border-dashed border-pink-100">
                <p className="text-gray-300 text-xs">
                  upload your {activeCategory} to get started 🌸
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right — Outfit Builder */}
        <div className="w-52 flex-shrink-0">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">
            your outfit
          </p>

          <div className="flex flex-col gap-3 mb-4">
            {slots.map((slot) => (
              <div
                key={slot.id}
                onClick={() =>
                  setActiveSlot(activeSlot === slot.id ? null : slot.id)
                }
                className={`rounded-2xl border-2 transition-all cursor-pointer overflow-hidden
                  ${activeSlot === slot.id ? "border-pink-400 shadow-md" : outfit[slot.id] ? "border-pink-200" : "border-dashed border-gray-200"}`}
              >
                {outfit[slot.id] ? (
                  <div className="relative">
                    <img
                      src={outfit[slot.id].url}
                      alt={slot.label}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/80 px-2 py-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {slot.label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOutfit((prev) => ({ ...prev, [slot.id]: null }));
                        }}
                        className="text-xs text-gray-400 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center gap-2">
                    <span className="text-xl">{slot.emoji}</span>
                    <span className="text-xs text-gray-400">{slot.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setVisualizing(true)}
            disabled={filledCount === 0}
            className="w-full bg-pink-400 hover:bg-pink-500 disabled:bg-pink-200 text-white text-sm font-semibold py-3 rounded-2xl transition-colors"
          >
            visualize look ✨
          </button>
          {filledCount > 0 && (
            <p className="text-xs text-center text-gray-400 mt-2">
              {filledCount}/6 pieces added
            </p>
          )}
        </div>
      </div>

      {/* Flow Navigation */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <button
          onClick={() => navigate("/caption-lab?flow=true")}
          className="bg-white text-pink-400 text-sm font-medium px-5 py-3 rounded-2xl border border-pink-200 hover:bg-pink-50 transition-colors shadow-sm"
        >
          skip →
        </button>
        <button
          onClick={() => {
            if (outfit) updateLook({ outfit });
            navigate("/caption-lab?flow=true");
          }}
          className="bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition-colors shadow-sm"
        >
          next → captions
        </button>
      </div>
    </div>
  );
}

export default OutfitStudio;
