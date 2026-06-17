import { useState } from "react";
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

const tones = [
  { id: "aesthetic", label: "Aesthetic ✨" },
  { id: "funny", label: "Funny 😂" },
  { id: "minimal", label: "Minimal 🤍" },
  { id: "savage", label: "Savage 💅" },
  { id: "flirty", label: "Flirty 😘" },
];

const lengths = [
  { id: "oneword", label: "1-3 Words 🤏" },
  { id: "short", label: "Short 📝" },
  { id: "long", label: "Long 💬" },
];

function CaptionLab() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTone, setSelectedTone] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const location = useLocation();
  const isFlow = new URLSearchParams(location.search).get("flow") === "true";

  const navigate = useNavigate();
  const { currentLook, updateLook } = useLily();

  useEffect(() => {
    if (currentLook.mood) {
      setSelectedMood(currentLook.mood.id);
    }
  }, []);

  const generateCaptions = async () => {
    if (!selectedMood || !selectedTone || !selectedLength) return;
    setLoading(true);
    setCaptions([]);

    const mood = moods.find((m) => m.id === selectedMood);
    const tone = tones.find((t) => t.id === selectedTone);

    const lengthInstruction =
      selectedLength === "oneword"
        ? "Each caption must be 1-3 words only, super punchy."
        : selectedLength === "short"
          ? "Each caption should be 1 short sentence, under 10 words."
          : "Each caption should be 2-3 sentences, expressive and detailed.";

    const prompt = `Generate 5 unique Instagram captions for someone whose outfit vibe is "${mood.label}" and wants a "${tone.label}" tone. ${lengthInstruction}
    
Also add 1 line of relevant hashtags after each caption.
Format exactly like this for each:
CAPTION: [caption text]
HASHTAGS: [hashtags]

Make them feel real and authentic, not generic. Think like a cool girl writing her own captions.`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        },
      );
      const data = await res.json();
      const text = data.candidates[0].content.parts[0].text;

      const blocks = text.split(/\n(?=CAPTION:)/).filter(Boolean);
      const parsed = blocks
        .map((block) => {
          const captionMatch = block.match(
            /CAPTION:\s*(.+?)(?=\nHASHTAGS:|$)/s,
          );
          const hashtagMatch = block.match(/HASHTAGS:\s*(.+)/s);
          return {
            caption: captionMatch ? captionMatch[1].trim() : "",
            hashtags: hashtagMatch ? hashtagMatch[1].trim() : "",
          };
        })
        .filter((c) => c.caption);

      setCaptions(parsed);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCopy = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Caption Lab ✍️</h1>
        <p className="text-gray-400 mt-1">
          Pick your vibe, pick your tone, get your captions
        </p>
      </div>

      {/* Mood Selector */}
      {!isFlow && (
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Your Outfit Vibe
          </p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200
            ${
              selectedMood === mood.id
                ? "bg-pink-400 text-white border-pink-400"
                : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"
            }`}
              >
                {mood.emoji} {mood.label}
              </button>
            ))}
          </div>
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

      {/* Tone Selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
          Caption Tone
        </p>
        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200
                ${
                  selectedTone === tone.id
                    ? "bg-pink-400 text-white border-pink-400"
                    : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"
                }`}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Length Selector */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
          Caption Length
        </p>
        <div className="flex flex-wrap gap-2">
          {lengths.map((length) => (
            <button
              key={length.id}
              onClick={() => setSelectedLength(length.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200
                ${
                  selectedLength === length.id
                    ? "bg-pink-400 text-white border-pink-400"
                    : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"
                }`}
            >
              {length.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateCaptions}
        disabled={!selectedMood || !selectedTone || !selectedLength || loading}
        className="w-full bg-pink-400 hover:bg-pink-500 disabled:bg-pink-200 transition-colors text-white font-semibold py-4 rounded-2xl mb-8 text-sm"
      >
        {loading ? "generating your captions ✨" : "generate captions →"}
      </button>

      {/* Captions */}
      {captions.length > 0 && (
        <div className="flex flex-col gap-4">
          {captions.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm"
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                {c.caption}
              </p>
              <p className="text-pink-300 text-xs mb-3">{c.hashtags}</p>
              <button
                onClick={() => handleCopy(`${c.caption}\n\n${c.hashtags}`, i)}
                className="text-xs text-pink-400 border border-pink-200 px-3 py-1 rounded-full hover:bg-pink-50 transition-colors"
              >
                {copied === i ? "copied! ✓" : "copy"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Flow Navigation */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <button
          onClick={() => navigate("/style-planner")}
          className="bg-white text-pink-400 text-sm font-medium px-5 py-3 rounded-2xl border border-pink-200 hover:bg-pink-50 transition-colors shadow-sm"
        >
          skip →
        </button>
        <button
          onClick={() => {
            if (captions.length > 0)
              updateLook({ caption: captions[0].caption });
            navigate("/style-planner");
          }}
          className="bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition-colors shadow-sm"
        >
          next → planner
        </button>
      </div>
    </div>
  );
}

export default CaptionLab;
