import { MapPin, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { events } from "../i18n/strings.js";

export default function EventsSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="events" className="border-t border-potborder bg-potsurface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-potink sm:text-3xl">
              {t("events.title")}
            </h2>
            <p className="mt-2 text-potmuted">{t("events.subtitle")}</p>
          </div>
          <a
            href="https://www.thepot.se/karlskrona/#program"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-potaccent hover:underline"
          >
            {t("events.cta")}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <a
              key={e.id}
              href="https://www.thepot.se/karlskrona/#program"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-potborder bg-potbg transition-shadow hover:shadow-md"
            >
              <div className="relative h-36 w-full overflow-hidden bg-potborder">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-3 top-3 flex h-11 w-11 flex-col items-center justify-center rounded-lg bg-potbg/90 text-potink shadow-sm">
                  <span className="text-[10px] font-semibold uppercase leading-none text-potaccent">
                    {e.month[lang]}
                  </span>
                  <span className="font-display text-lg font-bold leading-none">
                    {e.day}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-display text-sm font-semibold leading-snug text-potink">
                  {e.title}
                </h3>
                <p className="text-xs leading-relaxed text-potmuted">
                  {e.body[lang]}
                </p>
                <div className="mt-auto flex flex-col gap-1 pt-2 text-xs text-potmuted">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {e.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {e.venue}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
