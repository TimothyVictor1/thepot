import { useLanguage } from "../context/LanguageContext.jsx";

// The actual hero photograph from thepot.se (same courtyard image
// used site-wide) — not a placeholder, not a gradient standing in
// for one.
const HERO_IMAGE =
  "https://media.thepot.se/2021/01/The-Pot-Background-1-scaled.jpg";

export default function Hero({ onOpenChat }) {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden sm:min-h-[720px]">
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,17,14,0.35) 0%, rgba(20,17,14,0.55) 60%, rgba(20,17,14,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:pb-24">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--pot-hero-muted)" }}
        >
          {t("hero.eyebrow")}
        </p>
        <h1
          className="max-w-2xl font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl"
          style={{ color: "var(--pot-hero-ink)" }}
        >
          {t("hero.headline")}
        </h1>

        {/* Same button-row pattern as the real hero: a row of pill
            actions, plus one filled brand-purple call to action. */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-potink">
            {t("nav.conference")}
          </span>
          <span
            className="rounded-full border px-5 py-2.5 text-sm font-semibold"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "var(--pot-hero-ink)" }}
          >
            {t("nav.coworking")}
          </span>
          <a
            href="#events"
            className="rounded-full border px-5 py-2.5 text-sm font-semibold"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "var(--pot-hero-ink)" }}
          >
            {t("hero.ctaSecondary")}
          </a>
        </div>

        <button
          onClick={onOpenChat}
          className="mt-4 rounded-full bg-potaccent px-6 py-3 text-sm font-semibold text-potoncaccent transition-colors hover:bg-potaccenthover"
        >
          {t("hero.ctaPrimary")}
        </button>
      </div>
    </section>
  );
}
