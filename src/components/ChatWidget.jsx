import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import { Aperture, X, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

/**
 * Mötesstrategen (via Gemini, temporarily) writes plain Markdown —
 * **bold**, `* bullet` lines — same as any chat model does by default.
 * The widget has no reason to show those characters literally, so this
 * renders the handful of patterns that actually show up in booking
 * replies (bold, bullets) without pulling in a full Markdown library
 * for a few dozen lines of chat text.
 */
function renderInline(text, keyPrefix) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

function MessageText({ text }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const bulletMatch = line.match(/^\s*[*-]\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span aria-hidden="true">•</span>
              <span>{renderInline(bulletMatch[1], i)}</span>
            </div>
          );
        }
        return (
          <div key={i}>
            {line.length ? renderInline(line, i) : "\u00A0"}
          </div>
        );
      })}
    </>
  );
}

/**
 * ── Backend wiring ──────────────────────────────────────────────────────
 *
 * Two things to fix before this goes live on thepot.se:
 *
 * 1. CORS on the n8n Webhook node is currently open to any origin, so
 *    this could be developed and tested from anywhere. Lock it to the
 *    real domain(s) before launch.
 *
 * 2. POT_TOKEN below ships inside this client bundle, so it's readable
 *    by anyone once deployed (browser network tab, page source). That's
 *    true of any secret placed in frontend code — not a flaw specific
 *    to this widget. It does the same job the backend's own timestamp
 *    check does: a basic filter against casual spam and replay, not
 *    real access control. The actual protections (rate limiting, PII
 *    tokenisation, a human confirming every booking by email) all live
 *    server-side and don't depend on this value staying secret.
 * ──────────────────────────────────────────────────────────────────────
 */
const WEBHOOK_URL = "https://rtimvic.app.n8n.cloud/webhook/thepot-chat";
const POT_TOKEN =
  "64338df113c1508ba38f50024e1c1ca51c36d2b9127766cc13b5090709f20496";

const LOCATIONS = ["karlskrona", "karlshamn"];

export default function ChatWidget({ isOpen, onOpenChange }) {
  const { t } = useLanguage();

  const [location, setLocation] = useState("karlskrona");
  const [messages, setMessages] = useState(() => [
    { role: "assistant", text: t("widget.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const sessionIdRef = useRef(
    "web-" + Math.random().toString(36).slice(2) + Date.now().toString(36)
  );
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    if (isOpen) {
      setHasOpenedOnce(true);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsSending(true);
    setError(null);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pot-token": POT_TOKEN,
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: text,
          location,
          timestamp: Date.now(),
        }),
      });

      const data = await res.json().catch(() => null);
      const reply = data?.output ?? data?.reply;

      if (!res.ok || !reply) {
        throw new Error(data?.reply || t("widget.networkError"));
      }

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setError(err.message || t("widget.genericError"));
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, location, t]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => onOpenChange(true)}
          aria-label={t("widget.launcherLabel")}
          className={
            "group fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-potaccent shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-potaccent/40" +
            (hasOpenedOnce ? "" : " pot-launcher-pulse")
          }
        >
          {/* Circular text ring — this badge occupies the exact spot
              thepot.se's own "Are you a Next Leveler?" quiz badge sits
              in; this is that same idea, doing the same job, for the
              bot instead. */}
          <svg
            viewBox="0 0 100 100"
            className="pot-badge-spin absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              id="pot-badge-circle"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
            <text fill="white" fontSize="8.6" letterSpacing="1.5">
              <textPath href="#pot-badge-circle" startOffset="0%">
                {t("widget.badgeRing")} • {t("widget.badgeRing")} •
              </textPath>
            </text>
          </svg>
          <Aperture
            className="h-6 w-6 text-potoncaccent transition-transform group-hover:rotate-45"
            strokeWidth={1.75}
          />
        </button>
      )}

      {isOpen && (
        <div className="pot-panel-in fixed inset-0 z-50 flex flex-col border-0 bg-potbg sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-96 sm:rounded-4xl sm:border sm:border-potborder">
          {/* Header */}
          <div className="flex items-start gap-3 border-b border-potborder p-4">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-potaccent">
              <Aperture className="h-5 w-5 text-potoncaccent" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="font-display text-[15px] font-bold leading-tight text-potink">
                {t("widget.title")}
              </p>
              <p className="text-xs leading-tight text-potmuted">
                {t("widget.subtitle")}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              aria-label={t("widget.closeLabel")}
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-potmuted transition-colors hover:text-potink focus:outline-none focus-visible:ring-2 focus-visible:ring-potaccent/40"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Location toggle */}
          <div className="flex gap-2 border-b border-potborder p-3">
            {LOCATIONS.map((loc) => {
              const active = location === loc;
              return (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  aria-pressed={active}
                  className={
                    "flex-1 rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-potaccent/30 " +
                    (active
                      ? "border-potaccent bg-potaccent text-potoncaccent"
                      : "border-potborder text-potmuted hover:bg-potsurface")
                  }
                >
                  {loc}
                </button>
              );
            })}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={
                    "max-w-[80%] space-y-1 px-4 py-2.5 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "rounded-2xl rounded-br-md bg-potaccent text-potoncaccent"
                      : "rounded-2xl rounded-bl-md bg-potsurface text-potink")
                  }
                >
                  <MessageText text={m.text} />
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-potsurface px-4 py-3">
                  <span className="pot-dot h-1.5 w-1.5 rounded-full bg-potmuted" style={{ animationDelay: "0ms" }} />
                  <span className="pot-dot h-1.5 w-1.5 rounded-full bg-potmuted" style={{ animationDelay: "150ms" }} />
                  <span className="pot-dot h-1.5 w-1.5 rounded-full bg-potmuted" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="px-4 pb-1">
              <p className="text-xs leading-snug text-red-500">{error}</p>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-potborder p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              placeholder={t("widget.placeholder")}
              className="flex-1 rounded-full border-0 bg-potsurface px-4 py-2.5 text-sm text-potink placeholder-potmuted focus:outline-none focus-visible:ring-2 focus-visible:ring-potaccent/30 disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
              disabled={isSending || !input.trim()}
              aria-label={t("widget.sendLabel")}
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-potaccent text-potoncaccent transition-opacity hover:bg-potaccenthover focus:outline-none focus-visible:ring-2 focus-visible:ring-potaccent/40 disabled:opacity-40"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
