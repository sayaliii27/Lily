import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLily } from "../LilyContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const moods = [
  { id: "boho", emoji: "🌺", label: "Boho" },
  { id: "street", emoji: "🕶️", label: "Street Style" },
  { id: "baddie", emoji: "💅", label: "Baddie" },
  { id: "beach", emoji: "🏖️", label: "Beach Vacation" },
  { id: "soft-girl", emoji: "🌸", label: "Soft Girl" },
  { id: "cozy", emoji: "🍂", label: "Cozy" },
  { id: "casual", emoji: "👟", label: "Casual" },
  { id: "concert", emoji: "🎤", label: "Concert" },
  { id: "formal", emoji: "👔", label: "Formal Wear" },
  { id: "traditional", emoji: "🪷", label: "Traditional" },
  { id: "that-girl", emoji: "✨", label: "That Girl" },
  { id: "night-out", emoji: "🌃", label: "Night Out" },
  { id: "campus", emoji: "🎓", label: "Campus Casual" },
  { id: "girl-next-door", emoji: "🫶", label: "Girl Next Door" },
  { id: "brunch", emoji: "🛍️", label: "Brunch" },
];

const stockOutfits = [];

function OutfitStudio() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [myOutfits, setMyOutfits] = useState([]);
  const [lookbook, setLookbook] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [activeTab, setActiveTab] = useState("stock");
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const isFlow = new URLSearchParams(location.search).get("flow") === "true";

  const navigate = useNavigate();
  const { currentLook, updateLook } = useLily();

  useEffect(() => {
    if (currentLook.mood) {
      setSelectedMood(currentLook.mood.id);
    }
  }, []);

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
      setMyOutfits((prev) => [
        ...prev,
        { url: data.secure_url, id: data.public_id },
      ]);
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const saveToLookbook = (outfit) => {
    const alreadySaved = lookbook.find((o) => o.id === outfit.id);
    if (!alreadySaved) setLookbook((prev) => [...prev, outfit]);
    setSelectedOutfit(null);
  };

  const filteredOutfits = selectedMood
    ? stockOutfits.filter((o) => o.mood === selectedMood)
    : stockOutfits;

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Outfit Studio 👗</h1>
        <p className="text-gray-400 mt-1">
          Find your look, save your favourites
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "stock", label: "✨ Style Inspo" },
          { id: "mine", label: "👗 My Wardrobe" },
          {
            id: "lookbook",
            label: `🔖 Lookbook ${lookbook.length > 0 ? `(${lookbook.length})` : ""}`,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
              ${activeTab === tab.id ? "bg-pink-400 text-white border-pink-400" : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Style Inspo Tab */}
      {activeTab === "stock" && (
        <div>
          {!isFlow && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedMood(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all
        ${!selectedMood ? "bg-pink-400 text-white border-pink-400" : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"}`}
              >
                All
              </button>
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all
          ${selectedMood === mood.id ? "bg-pink-400 text-white border-pink-400" : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"}`}
                >
                  {mood.emoji} {mood.label}
                </button>
              ))}
            </div>
          )}

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

          <div className="grid grid-cols-4 gap-4">
            {filteredOutfits.map((outfit) => (
              <motion.div
                key={outfit.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedOutfit(outfit)}
                className="rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-300 hover:shadow-md transition-all"
              >
                <img
                  src={outfit.url}
                  alt={outfit.label}
                  className="w-full h-52 object-cover"
                />
                <div className="p-2 bg-white">
                  <p className="text-xs text-gray-400">{outfit.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* My Wardrobe Tab */}
      {activeTab === "mine" && (
        <div>
          <label className="flex flex-col items-center justify-center gap-2 w-full h-28 border-2 border-dashed border-pink-200 rounded-2xl cursor-pointer hover:bg-pink-50 transition-all mb-6">
            {uploading ? (
              <p className="text-pink-300 text-sm animate-pulse">
                uploading ✨
              </p>
            ) : (
              <>
                <span className="text-2xl">📸</span>
                <span className="text-pink-300 text-sm">
                  click to upload your outfit
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {myOutfits.length === 0 && (
            <div className="flex items-center justify-center h-40 bg-white rounded-3xl border border-pink-100">
              <p className="text-gray-300 text-sm">
                your wardrobe is empty — upload your first outfit 🌸
              </p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {myOutfits.map((outfit) => (
              <motion.div
                key={outfit.id}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  setSelectedOutfit({
                    id: outfit.id,
                    url: outfit.url,
                    small: outfit.url,
                  })
                }
                className="rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-300 hover:shadow-md transition-all"
              >
                <img
                  src={outfit.url}
                  alt="my outfit"
                  className="w-full h-52 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Lookbook Tab */}
      {activeTab === "lookbook" && (
        <div>
          {lookbook.length === 0 && (
            <div className="flex items-center justify-center h-48 bg-white rounded-3xl border border-pink-100">
              <p className="text-gray-300 text-sm">
                no saved looks yet — save outfits from My Wardrobe 🌸
              </p>
            </div>
          )}
          <div className="grid grid-cols-4 gap-4">
            {lookbook.map((outfit) => (
              <motion.div
                key={outfit.id}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden border-2 border-pink-100 shadow-sm"
              >
                <img
                  src={outfit.url}
                  alt="saved outfit"
                  className="w-full h-52 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Outfit Modal */}
      <AnimatePresence>
        {selectedOutfit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedOutfit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-sm w-full"
            >
              <img
                src={selectedOutfit.url}
                alt="outfit"
                className="w-full h-96 object-cover"
              />
              <div className="p-5 flex gap-3">
                <button
                  onClick={() => saveToLookbook(selectedOutfit)}
                  className="flex-1 bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold py-3 rounded-2xl transition-colors"
                >
                  🔖 Save to Lookbook
                </button>
                <button
                  onClick={() => setSelectedOutfit(null)}
                  className="px-4 py-3 rounded-2xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-colors"
                >
                  close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            if (selectedOutfit) updateLook({ outfit: selectedOutfit });
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
