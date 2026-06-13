import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Sidebar from "./components/Sidebar";
import TodaysVibe from "./pages/TodaysVibe";
import OutfitStudio from "./pages/OutfitStudio";
import CaptionLab from "./pages/CaptionLab";
import StylePlanner from "./pages/StylePlanner";
import VibeNotes from "./pages/VibeNotes";

function App() {
  return (
    <BrowserRouter>
      <SignedIn>
        <div className="flex min-h-screen bg-pink-50">
          <Sidebar />
          <main className="ml-64 flex-1 p-10">
            <Routes>
              <Route path="/" element={<TodaysVibe />} />
              <Route path="/outfit-studio" element={<OutfitStudio />} />
              <Route path="/caption-lab" element={<CaptionLab />} />
              <Route path="/style-planner" element={<StylePlanner />} />
              <Route path="/vibe-notes" element={<VibeNotes />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </BrowserRouter>
  );
}

export default App;
