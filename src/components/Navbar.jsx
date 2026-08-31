import { useState, useEffect } from "react";
import { Aperture, Moon, Sun, Menu, X, Languages } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar({ onOpenChat }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The real site's nav sits transparent, directly on the hero photo,
  // and only picks up a solid background once you scroll past it —
  // that's what this tracks.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    t("nav.conference"),
    t("nav.coworking"),
    t("nav.vision"),
    t("nav.content"),
    t("nav.artDesign"),
  ];

  const inkColor = scrolled ? "text-potink" : "text-white";
  const mutedColor = scrolled ? "text-potmuted" : "text-white/80";
  const borderColor = scrolled ? "border-potborder" : "border-white/30";

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300 " +
        (scrolled ? "border-b border-potborder bg-potbg/95 backdrop-blur" : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className={"flex items-center gap-2 font-display text-lg font-extrabold tracking-tight " + inkColor}>
          <Aperture className="h-6 w-6 text-potaccent" strokeWidth={1.6} />
          THE POT
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((label) => (
            <a key={label} href="#" className={"text-sm font-medium transition-colors hover:opacity-80 " + mutedColor}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className={"flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors " + borderColor + " " + mutedColor}
          >
            <Languages className="h-3.5 w-3.5" strokeWidth={1.8} />
            {lang.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={"flex h-9 w-9 items-center justify-center rounded-full border transition-colors " + borderColor + " " + mutedColor}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={1.8} /> : <Moon className="h-4 w-4" strokeWidth={1.8} />}
          </button>

          <button
            onClick={onOpenChat}
            className="hidden rounded-full bg-potaccent px-4 py-2 text-sm font-semibold text-potoncaccent transition-colors hover:bg-potaccenthover sm:block"
          >
            {t("nav.bookMeeting")}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className={"flex h-9 w-9 items-center justify-center rounded-full border transition-colors lg:hidden " + borderColor + " " + mutedColor}
          >
            {mobileOpen ? <X className="h-4 w-4" strokeWidth={1.8} /> : <Menu className="h-4 w-4" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-potborder bg-potbg px-6 py-4 lg:hidden">
          {navLinks.map((label) => (
            <a key={label} href="#" className="rounded-lg px-2 py-2 text-sm font-medium text-potmuted hover:bg-potsurface hover:text-potink">
              {label}
            </a>
          ))}
          <button onClick={onOpenChat} className="mt-2 rounded-full bg-potaccent px-4 py-2 text-sm font-semibold text-potoncaccent">
            {t("nav.bookMeeting")}
          </button>
        </nav>
      )}
    </header>
  );
}
