import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SpellPage from "./components/pages/SpellPage";
import PerkPage from "./components/pages/PerkPage";
import HomePage from "./components/pages/HomePage";
import { useMode } from "./contexts/ModeContext";

function App() {
  const { mode, setMode } = useMode();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/spells")) {
      setMode('spell');
    } else if (location.pathname.startsWith("/perks")) {
      setMode('perk');
    } else {
      // For the home page, default to spell mode for the background
      setMode('spell');
    }
  }, [location.pathname, setMode]);

  const bgImage = mode === 'perk' 
    ? "bg-[url('../public/images/bg_perk.webp')]" 
    : "bg-[url('../public/images/bg_spell.webp')]"; // Default to spell background

  return (
    // The key={mode} is crucial. It forces a full re-render when the mode changes,
    // solving the stale UI issue during navigation.
    <div key={mode} className={`bg-cover bg-center bg-fixed ${bgImage} min-w-[54rem] min-h-screen flex flex-col`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spells" element={<SpellPage />} />
        <Route path="/perks" element={<PerkPage />} />
      </Routes>
    </div>
  );
}

export default App;
