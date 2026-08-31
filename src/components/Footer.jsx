import { Aperture, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    t("nav.conference"),
    t("nav.coworking"),
    t("nav.vision"),
    t("nav.content"),
    t("nav.artDesign"),
    t("nav.karlshamn"),
  ];

  return (
    <footer className="border-t border-potborder">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-potink">
            <Aperture className="h-5 w-5 text-potaccent" strokeWidth={1.6} />
            THE POT
          </div>
          <p className="mt-3 text-sm leading-relaxed text-potmuted">
            Blekingegatan 1, Karlskrona, Sverige
          </p>
          <div className="mt-3 space-y-1.5 text-sm text-potmuted">
            <a
              href="tel:+46455349015"
              className="flex items-center gap-2 hover:text-potink"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
              0455-34 90 15
            </a>
            <a
              href="mailto:hej@thepot.se"
              className="flex items-center gap-2 hover:text-potink"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
              hej@thepot.se
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-potink">
            {t("nav.conference")}
          </p>
          <ul className="space-y-2 text-sm text-potmuted">
            {navLinks.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-potink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-potink">
            {t("footer.followUs")}
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/thepotkarlskrona" },
              { Icon: Instagram, href: "https://www.instagram.com/thepotkarlskrona" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/the-pot-karlskrona/" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-potborder text-potmuted transition-colors hover:text-potink"
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-potmuted">
            {t("footer.poweredBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
