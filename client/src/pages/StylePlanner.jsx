import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const occasions = [
  "🎓 College",
  "💼 Work",
  "🎉 Party",
  "🍽️ Dinner",
  "✈️ Travel",
  "🏋️ Gym",
  "☕ Coffee Date",
  "🛍️ Shopping",
  "💒 Wedding",
  "🎤 Concert",
];

function StylePlanner() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [plans, setPlans] = useState({});
  const [occasion, setOccasion] = useState("");
  const [note, setNote] = useState("");
  const [showForm, setShowForm] = useState(false);

  const dateKey = selectedDate ? selectedDate.toDateString() : null;

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    setOccasion("");
    setNote("");
  };

  const savePlan = () => {
    if (!dateKey || !occasion) return;
    setPlans((prev) => ({
      ...prev,
      [dateKey]: { occasion, note },
    }));
    setShowForm(false);
  };

  const deletePlan = (key) => {
    setPlans((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const tileContent = ({ date }) => {
    const key = date.toDateString();
    if (plans[key]) {
      return (
        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mx-auto mt-1" />
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Style Planner 🗓️</h1>
        <p className="text-gray-400 mt-1">
          Plan your outfits for upcoming events
        </p>
      </div>

      <div className="flex gap-6">
        {/* Calendar */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
            <style>{`
              .react-calendar { border: none; font-family: inherit; }
              .react-calendar__tile--active { background: #f9a8d4 !important; border-radius: 12px; }
              .react-calendar__tile:hover { background: #fce7f3; border-radius: 12px; }
              .react-calendar__tile--now { background: #fff0f3; border-radius: 12px; }
              .react-calendar__navigation button:hover { background: #fce7f3; border-radius: 12px; }
              .react-calendar__month-view__weekdays { color: #f9a8d4; font-size: 11px; }
            `}</style>
            <Calendar
              onClickDay={handleDateClick}
              value={selectedDate}
              tileContent={tileContent}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Add Plan Form */}
          {showForm && selectedDate && (
            <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-600 mb-4">
                📅 {selectedDate.toDateString()}
              </p>

              {/* Occasion */}
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Occasion
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all
                      ${occasion === o ? "bg-pink-400 text-white border-pink-400" : "bg-white text-gray-500 border-gray-200 hover:border-pink-300"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>

              {/* Note */}
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Outfit Note
              </p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. wear the blue dress with white sneakers..."
                className="w-full border border-gray-200 rounded-2xl p-3 text-sm text-gray-600 resize-none focus:outline-none focus:border-pink-300 mb-4"
                rows={3}
              />

              <div className="flex gap-2">
                <button
                  onClick={savePlan}
                  disabled={!occasion}
                  className="flex-1 bg-pink-400 hover:bg-pink-500 disabled:bg-pink-200 text-white text-sm font-semibold py-3 rounded-2xl transition-colors"
                >
                  Save Plan ✓
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-3 rounded-2xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50"
                >
                  cancel
                </button>
              </div>
            </div>
          )}

          {/* Saved Plans */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Upcoming Plans
            </p>
            {Object.keys(plans).length === 0 && (
              <div className="flex items-center justify-center h-32 bg-white rounded-3xl border border-pink-100">
                <p className="text-gray-300 text-sm">
                  click a date to plan your outfit 🌸
                </p>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{key}</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {plan.occasion}
                    </p>
                    {plan.note && (
                      <p className="text-xs text-gray-400 mt-1">{plan.note}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deletePlan(key)}
                    className="text-xs text-gray-300 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StylePlanner;
