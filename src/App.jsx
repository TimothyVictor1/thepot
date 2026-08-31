import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import FeatureGrid from "./components/FeatureGrid.jsx";
import EventsSection from "./components/EventsSection.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-potbg text-potink transition-colors">
          <Navbar onOpenChat={() => setIsChatOpen(true)} />
          <Hero onOpenChat={() => setIsChatOpen(true)} />
          <FeatureGrid />
          <EventsSection />
          <Footer />
          <ChatWidget isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
