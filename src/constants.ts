import { Category } from './types';

export const TUTORIAL_CATEGORIES: Category[] = [
  {
    id: 'fundamentals',
    title: '1. ZÁKLADY',
    color: '#D2B48C', // Beige
    slides: [
      { id: 's1', title: 'Prečo vidíme svet tak rozdielne?', imageUrl: '/tutorial/intro_1.webp' },
      { id: 's2', title: 'Vývoj, ktorý sa nikdy nezastaví', imageUrl: '/tutorial/intro_2.webp' },
      { id: 's3', title: 'Rebríček hodnôt, nie inteligencie', imageUrl: '/tutorial/intro_3.webp' },
      { id: 's4', title: 'Súlad s vaším svetom', imageUrl: '/tutorial/intro_4.webp' },
    ],
  },
  {
    id: 'why-sd',
    title: '2. VÝHODY',
    color: '#FF4500', // OrangeRed
    slides: [
      { id: 'wh1', title: 'Osobnostný rozvoj', imageUrl: '/tutorial/why_1.webp' },
      { id: 'wh2', title: 'Firemná kultúra', imageUrl: '/tutorial/why_2.webp' },
      { id: 'wh3', title: 'Spoločenské zmeny', imageUrl: '/tutorial/why_3.webp' },
      { id: 'wh4', title: 'Rozhodovanie a lídership', imageUrl: '/tutorial/why_4.webp' },
      { id: 'wh5', title: 'Komunikácia a konflikty', imageUrl: '/tutorial/why_5.webp' },
    ],
  },
  {
    id: 'v-memes',
    title: '3. FAREBNÉ ÚROVNE',
    color: '#1E90FF', // DodgerBlue
    slides: [
      { id: 'st1', title: 'Béžová (Inštinktívna)', imageUrl: '/tutorial/stages_1.webp' },
      { id: 'st2', title: 'Fialová (Magická / Kmeňová)', imageUrl: '/tutorial/stages_2.webp' },
      { id: 'st3', title: 'Červená (Mocenská / Egocentrická)', imageUrl: '/tutorial/stages_3.webp' },
      { id: 'st4', title: 'Modrá (Poriadková / Autoritatívna)', imageUrl: '/tutorial/stages_4.webp' },
      { id: 'st5', title: 'Oranžová (Výkonová / Strategická)', imageUrl: '/tutorial/stages_5.webp' },
      { id: 'st6', title: 'Zelená (Komunitná / Pluralistická)', imageUrl: '/tutorial/stages_6.webp' },
      { id: 'st7', title: 'Žltá (Integrálna / Systémová)', imageUrl: '/tutorial/stages_7.webp' },
      { id: 'st8', title: 'Tyrkysová (Holistická / Globálna)', imageUrl: '/tutorial/stages_8.webp' },
      { id: 'st9', title: 'Korálová (Prichádzajúca)', imageUrl: '/tutorial/stages_9.webp' },
    ],
  },
  {
    id: 'use-cases',
    title: '4. VYUŽITIE V PRAXI',
    color: '#32CD32', // LimeGreen
    slides: [
      { id: 'u1', title: 'Osobné vzťahy', imageUrl: '/tutorial/use_1.webp' },
      { id: 'u2', title: 'Pracovný kolektív', imageUrl: '/tutorial/use_2.webp' },
      { id: 'u3', title: 'Výchova detí', imageUrl: '/tutorial/use_3.webp' },
      { id: 'u4', title: 'Spoločenský dialóg', imageUrl: '/tutorial/use_4.webp' },
      { id: 'u5', title: 'Riešenie konfliktov', imageUrl: '/tutorial/use_5.webp' },
      { id: 'u6', title: 'Politika a správa vecí verejných', imageUrl: '/tutorial/use_6.webp' },
      { id: 'u7', title: 'Marketing a obchod', imageUrl: '/tutorial/use_7.webp' },
      { id: 'u8', title: 'Vzdelávanie a školstvo', imageUrl: '/tutorial/use_8.webp' },
      { id: 'u9', title: 'Ekologické myslenie', imageUrl: '/tutorial/use_9.webp' },
    ],
  },
  {
    id: 'network-security',
    title: '5. SIEŤOVÁ BEZPEČNOSŤ',
    color: '#0066CC', // Blue
    slides: [
      {
        id: 'n1',
        title: 'Sieťový skill: Plné práva a dohľad',
        description: 'Pridaj mu sieťový skill aj spätne a získaj prehľad o pripojených zariadeniach.',
        imageUrl: '/tutorial/use_1.webp',
      },
      {
        id: 'n2',
        title: 'Aktuálna sieťová aktivita',
        description: 'Sprav poriadnu analýzu aktuálnej aktivity na sieti a odhaľ podozrivé spojenia.',
        imageUrl: '/tutorial/use_2.webp',
      },
      {
        id: 'n3',
        title: 'Posledná 1,5 hodiny',
        description: 'Zameraj sa na podozrivé aktivity počas posledných 90 minút.',
        imageUrl: '/tutorial/use_3.webp',
      },
      {
        id: 'n4',
        title: 'Prehľad pripojených zariadení',
        description: 'Získaj prehľad o všetkých pripojených zariadeniach a ich bezpečnostnom stave.',
        imageUrl: '/tutorial/use_4.webp',
      },
    ],
  },
];

export const UI_STRINGS = {
  sk: {
    next: 'Ďalej',
    prev: 'Späť',
    finish: 'Dokončiť',
    close: 'Zavrieť',
    skip: 'Preskočiť tutoriál',
    category: 'Kategória',
  },
  en: {
    next: 'Next',
    prev: 'Back',
    finish: 'Finish',
    close: 'Close',
    skip: 'Skip Tutorial',
    category: 'Category',
  },
  de: {
    next: 'Weiter',
    prev: 'Zurück',
    finish: 'Abschließen',
    close: 'Schließen',
    skip: 'Tutorial überspringen',
    category: 'Kategorie',
  },
};
