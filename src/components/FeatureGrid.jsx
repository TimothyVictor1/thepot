import {
  Compass,
  CalendarCheck,
  Presentation,
  Users,
  PartyPopper,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const ICONS = {
  vision: Compass,
  book: CalendarCheck,
  content: Presentation,
  coworking: Users,
  event: PartyPopper,
  app: Smartphone,
};

export default function FeatureGrid() {
  const { t } = useLanguage();
  const keys = ["vision", "book", "content", "coworking", "event", "app"];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 font-display text-2xl font-bold text-potink sm:text-3xl">
        {t("features.title")}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => {
          const Icon = ICONS[key];
          return (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-potborder bg-potsurface p-6 transition-colors"
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-potaccent transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <Icon
                className="mb-4 h-6 w-6 text-potaccent"
                strokeWidth={1.6}
              />
              <h3 className="font-display text-lg font-semibold text-potink">
                {t(`features.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-potmuted">
                {t(`features.items.${key}.body`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
