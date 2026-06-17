import { createContext, useContext, useState } from "react";

const LilyContext = createContext();

export function LilyProvider({ children }) {
  const [currentLook, setCurrentLook] = useState({
    mood: null,
    outfit: null,
    caption: null,
    date: null,
    occasion: null,
  });

  const [savedLooks, setSavedLooks] = useState([]);

  const updateLook = (updates) => {
    setCurrentLook((prev) => ({ ...prev, ...updates }));
  };

  const saveCompleteLook = () => {
    if (!currentLook.mood) return;
    setSavedLooks((prev) => [...prev, { ...currentLook, id: Date.now() }]);
    setCurrentLook({
      mood: null,
      outfit: null,
      caption: null,
      date: null,
      occasion: null,
    });
  };

  return (
    <LilyContext.Provider
      value={{ currentLook, updateLook, savedLooks, saveCompleteLook }}
    >
      {children}
    </LilyContext.Provider>
  );
}

export function useLily() {
  return useContext(LilyContext);
}
