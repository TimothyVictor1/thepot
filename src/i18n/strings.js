// Nav labels, hero, and CTA copy follow The Pot's real site structure.
// Feature and event descriptions below are written fresh for this
// redesign rather than copied from thepot.se — only facts (names,
// dates, times, venues, address, phone) are carried over as-is.

export const strings = {
  sv: {
    nav: {
      conference: "Konferens & mötesrum",
      coworking: "Co-working",
      vision: "Vision",
      content: "Innehåll",
      artDesign: "Art and Design",
      karlshamn: "The Pot Karlshamn",
      bookMeeting: "Boka möte",
    },
    hero: {
      eyebrow: "Karlskrona & Karlshamn",
      headline: "En plats där dina möten faktiskt blir av.",
      subhead:
        "Boka rum, jobba i lugn och ro eller haka på nästa event — allt under samma tak.",
      ctaPrimary: "Boka mötesrum",
      ctaSecondary: "Se vad som händer",
    },
    features: {
      title: "Allt du behöver, under ett tak",
      items: {
        vision: {
          title: "Vision",
          body: "En mötesplats för dig som vill bygga broar mellan Karlskrona och världen.",
        },
        book: {
          title: "Boka",
          body: "Mötesrum, studios, kontor och öppna ytor — allt med snabbt wifi och bra teknik.",
        },
        content: {
          title: "Innehåll",
          body: "Värdskap, ett nätverk av föreläsare och en streamingstudio för dig som vill göra mer än boka ett rum.",
        },
        coworking: {
          title: "Co-working",
          body: "Mitt i Karlskrona, granne med centralstationen — nära allt.",
        },
        event: {
          title: "Event",
          body: "Konserter, mingel och event i lokaler som växer med vad du planerar.",
        },
        app: {
          title: "Appen",
          body: "Boka rum, se din access och håll koll på huset direkt i mobilen.",
        },
      },
    },
    events: {
      title: "Händer på The Pot",
      subtitle: "Kommande program i Karlskrona och Karlshamn.",
      cta: "Se hela programmet",
    },
    footer: {
      followUs: "Följ oss",
      poweredBy: "Byggd med hjälp av Mötesstrategen — fråga den vad som helst.",
    },
    widget: {
      launcherLabel: "Öppna chatt med Mötesstrategen",
      closeLabel: "Stäng chatten",
      title: "Mötesstrategen",
      subtitle: "The Pot, Karlskrona & Karlshamn",
      greeting:
        "Hej! Jag är Mötesstrategen. Fråga mig om rum, priser eller tillgänglighet — eller berätta vad du vill boka.",
      placeholder: "Skriv ett meddelande…",
      sendLabel: "Skicka meddelande",
      genericError: "Något gick fel. Kontrollera din uppkoppling och försök igen.",
      networkError: "Kunde inte nå The Pot just nu. Försök igen om en stund.",
      languageNote:
        "Det här styr bara den här menyn — Mötesstrategen svarar alltid på det språk du skriver på.",
      badgeRing: "FRÅGA MÖTESSTRATEGEN",
    },
  },

  en: {
    nav: {
      conference: "Conference & Meeting Rooms",
      coworking: "Co-working",
      vision: "Vision",
      content: "Content",
      artDesign: "Art and Design",
      karlshamn: "The Pot Karlshamn",
      bookMeeting: "Book a meeting",
    },
    hero: {
      eyebrow: "Karlskrona & Karlshamn",
      headline: "A place where your meetings actually happen.",
      subhead:
        "Book a room, get work done, or catch what's on — all under one roof.",
      ctaPrimary: "Book a room",
      ctaSecondary: "See what's on",
    },
    features: {
      title: "Everything you need, in one place",
      items: {
        vision: {
          title: "Vision",
          body: "A meeting place for people building bridges between Karlskrona and the world.",
        },
        book: {
          title: "Book",
          body: "Meeting rooms, studios, offices and open spaces — with fast wifi and solid tech.",
        },
        content: {
          title: "Content",
          body: "Hosting, a network of speakers, and a streaming studio for more than just a booked room.",
        },
        coworking: {
          title: "Co-working",
          body: "Right in the heart of Karlskrona, next to the central station — close to everything.",
        },
        event: {
          title: "Events",
          body: "Concerts, mingling and events in spaces that scale to what you're planning.",
        },
        app: {
          title: "The app",
          body: "Book a room, check your access, and keep track of the building from your phone.",
        },
      },
    },
    events: {
      title: "What's on at The Pot",
      subtitle: "Upcoming events in Karlskrona and Karlshamn.",
      cta: "See the full programme",
    },
    footer: {
      followUs: "Follow us",
      poweredBy: "Built with help from Mötesstrategen — ask it anything.",
    },
    widget: {
      launcherLabel: "Open chat with Mötesstrategen",
      closeLabel: "Close the chat",
      title: "Mötesstrategen",
      subtitle: "The Pot, Karlskrona & Karlshamn",
      greeting:
        "Hi! I'm Mötesstrategen. Ask me about rooms, pricing or availability — or tell me what you'd like to book.",
      placeholder: "Type a message…",
      sendLabel: "Send message",
      genericError: "Something went wrong. Check your connection and try again.",
      networkError: "Couldn't reach The Pot right now. Try again in a moment.",
      languageNote:
        "This only changes this menu — Mötesstrategen always replies in whatever language you write in.",
      badgeRing: "ASK MÖTESSTRATEGEN",
    },
  },
};

// Static seed data for the events section, captured from thepot.se's
// live programme. Descriptions are written fresh for this redesign;
// swap this for a live feed (the site's own WP Tribe Events API) when
// this goes to production.
export const events = [
  {
    id: "phil-collins",
    date: "2026-10-10",
    day: "10",
    month: { sv: "okt", en: "Oct" },
    time: "19:00–20:30",
    venue: "The Pot Karlshamn",
    title: "The Phil Collins Tribute Band",
    image: "https://media.thepot.se/2026/06/Phil-Collins-reklam-1920-x-1080-px.jpg",
    body: {
      sv: "Elva musiker hyllar Phil Collins låtskatt, helt live.",
      en: "An eleven-piece band brings Phil Collins' songbook to the stage, live.",
    },
  },
  {
    id: "valter-nilsson",
    date: "2026-10-10",
    day: "10",
    month: { sv: "okt", en: "Oct" },
    time: "19:00–23:00",
    venue: "The Pot Karlskrona",
    title: "Valter Nilsson — Klubb Kontakt",
    image: "https://media.thepot.se/2026/05/Valter-16x9-A.jpg",
    body: {
      sv: "Klubb Kontakt öppnar med en intim spelning av Valter Nilsson.",
      en: "Klubb Kontakt opens with an intimate show from Valter Nilsson.",
    },
  },
  {
    id: "ludwig-hart",
    date: "2026-10-22",
    day: "22",
    month: { sv: "okt", en: "Oct" },
    time: "19:30–21:00",
    venue: "The Pot Karlshamn",
    title: "Ludwig Hart — Unplugged",
    image:
      "https://media.thepot.se/2026/03/1920x1080_LudwigHart_pressbild.png",
    body: {
      sv: "En akustisk kväll med Ludwig Hart, förlängd efter stor efterfrågan.",
      en: "An acoustic evening with Ludwig Hart, extended by popular demand.",
    },
  },
  {
    id: "omojliga-mojligt",
    date: "2026-11-04",
    day: "4",
    month: { sv: "nov", en: "Nov" },
    time: "13:00–17:00",
    venue: "The Pot Karlskrona",
    title: "Att göra det omöjliga möjligt",
    image:
      "https://media.thepot.se/2026/08/1920x1080_SoMe_Mjallby_261104_Hemsida.png",
    body: {
      sv: "Ett samtal om att bygga en kultur där människor växer och tar ansvar.",
      en: "A conversation about building a culture where people grow and take ownership.",
    },
  },
  {
    id: "terra-klubb-kontakt",
    date: "2026-11-05",
    day: "5",
    month: { sv: "nov", en: "Nov" },
    time: "18:30–23:00",
    venue: "The Pot Karlskrona",
    title: "Terra — Klubb Kontakt",
    image: "https://media.thepot.se/2026/05/Terra-16x9-A-scaled.jpg",
    body: {
      sv: "Klubb Kontakt fortsätter med Terra på scen.",
      en: "Klubb Kontakt continues with Terra.",
    },
  },
  {
    id: "william-sundman-saaf",
    date: "2026-11-06",
    day: "6",
    month: { sv: "nov", en: "Nov" },
    time: "19:30–21:30",
    venue: "The Pot Karlskrona",
    title: "Live i Vardagsrummet — William Sundman Sääf",
    image: "https://media.thepot.se/2026/08/WSS-16x9-Text.jpg",
    body: {
      sv: "Från Parkscenen till en intim akustisk kväll i Vardagsrummet.",
      en: "From the Park Stage to an intimate acoustic evening.",
    },
  },
  {
    id: "de-clair",
    date: "2026-11-13",
    day: "13",
    month: { sv: "nov", en: "Nov" },
    time: "19:30–21:30",
    venue: "The Pot Karlshamn",
    title: "de clair.",
    image: "https://media.thepot.se/2026/08/de-clair.-16x9-Clean.jpg",
    body: {
      sv: "Albumaktuella de clair. spelar Navet på The Pot Karlshamn.",
      en: "Album-fresh de clair. play Navet at The Pot Karlshamn.",
    },
  },
  {
    id: "nassim-al-fakir",
    date: "2026-11-29",
    day: "29",
    month: { sv: "nov", en: "Nov" },
    time: "15:00–16:00",
    venue: "The Pot Karlshamn",
    title: "Nassim Al Fakir",
    image: "https://media.thepot.se/2026/08/Nassim_1920x1080.jpg",
    body: {
      sv: "En musikalisk julshow för hela familjen i Navet.",
      en: "A musical Christmas show for the whole family in Navet.",
    },
  },
];
