"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Post = {
  id: number;
  date: string;
  title: string;
  dutch: string;
  english: string;
  images?: string[];
};

type Book = {
  id: number;
  title: string;
  author: string;
  status: "reading" | "recently-finished";
  thoughts: string;
};

const mealCategories = ["All", "Breakfast", "Brunch", "Lunch", "Dinner", "Snacks"] as const;
type MealCategory = (typeof mealCategories)[number];

type NutritionSlice = { label: string; value: number };

type Recipe = {
  id: number;
  name: string;
  meal: Exclude<MealCategory, "All">[];
  description: string;
  prepTime?: string;
  tags: string[];
  ingredients?: string[];
  notes?: string;
  inspirationUrl?: string;
  macros?: { calories: number; protein: number; carbs: number; fat: number; fibre: number };
  calorieBreakdown?: NutritionSlice[];
  proteinBreakdown?: NutritionSlice[];
};

type CoffeeNote = {
  id: number;
  title: string;
  note: string;
};

// Add new Dutch writing entries here (newest first by date)
const posts: Post[] = [
  {
    id: 4,
    date: "April 21, 2026",
    title: "De Veena",
    dutch:
      "Vandag hebben we onze laatste les voor A1 nederlands. Voor deze les, heb ik enn muziek instrument gebracht. Het is de Veena.\n\nDit instrument uit India is bijna 3000 jaar oud. De eerste vermeldingen van de veena zijn in boeken van de eerste century BCE. Het instrument is ook te zien in Hindu en Buddhist tempels.\n\nDe Veena is een groot instrument. 100-120cm. Het is gemaakt van hout. Mensen spellen dit met vijf strings. De muziek is heel mooi, rustig en zoet om naar te luisteren. Het is een deel van de Indian Klassike muziek.\n\nVorig jaar, ging ik naar het muziekmuseum in Bangalore, India. Dat is een leuk en groot museum met vier verdiepingen. Ik heb daar deze kleine model gekocht. Ik denk altijd aan India wanneer ik dit model zie.",
    english:
      "Today we have our last lesson for A1 Dutch. For this lesson, I brought a music instrument. It is the Veena.\n\nThis instrument from India is almost 3000 years old. The first mentions of the veena are in books from the first century BCE. The instrument can also be seen in Hindu and Buddhist temples.\n\nThe Veena is a large instrument. 100-120cm. It is made of wood. People play it with five strings. The music is very beautiful, calm and sweet to listen to. It is a part of Indian Classical music.\n\nLast year, I went to the music museum in Bangalore, India. It is a nice and large museum with four floors. I bought this small model there. I always think of India when I see this model.",
  },
  {
    id: 3,
    date: "April 18, 2026",
    title: "Amsterdam Coffee Festival 2026",
    images: [
      "/img/AMS_Koffie_2026/AMS_Koffie_2026_1.webp",
      "/img/AMS_Koffie_2026/AMS_Koffie_2026_2.webp",
      "/img/AMS_Koffie_2026/AMS_Koffie_2026_3.webp",
      "/img/AMS_Koffie_2026/AMS_Koffie_2026_4.webp",
      "/img/AMS_Koffie_2026/AMS_Koffie_2026_5.webp",
    ],
    dutch:
      "Wat een super cafeïne-rijke dag! Vandaag, ben ik naar Amsterdam Coffee Festival geweest met mijn vriend en een vriendin. In de ochtend had ik het koud, maar rond de middag, hadden we een prettig dag. Het feestje was in een grote hal met hoog plafond en een industriële sfeer. Het feestje had meer dan 50 lokale en internationale koffie roasters. Mijn favoriete roasters zijn Rum Baba, Steen Coffee, Keen en natuurlijk Sprouts.\n\nWe zagen ook dat het feestje veel chai-stands had. Dat was nieuw en onverwacht. Ik heb een heel prettig en rustig Chinese tea stand gevonden. Ik heb \"Snowy Chrysanthemum\" thee van \"Yin Cha\" gekocht. Het was een beetje zoet, maar heel rustgevend. Ik heb een cadeautje gekocht voor moeder van mijn vriend voor haar verjaardag. Ik hoop ze vindt de thee leuk.\n\nAlle barista's van alle stands zijn beleefd en knowledgeable. Mijn favoriete koffie was \"Pink California\" van Rum Baba. Het had de smaak van zoet candy met aardbei. Het was heel lekker! We gingen ook naar de Keen stand, waar we \"de Keen koffie experience\" hadden. We probeerden drie soorten filter koffie. Ik vond alle drie heel lekker. De koffie was goed voor de zomer. We praatten over fermentatie, smaakprofielen en roast types. Ik vind dit super interessant!\n\nRond 18.00 uur, waren we moe maar super cafeïnerijk. Daarna zijn we naar Madras Diaries gegaan voor het dinner met meer vrienden. Ik vond het leuk dat de dag eindigde met Indiaas eten. Ik hou van de Amsterdam koffie feestje. Ik wil volgende jaar ook de feestje gaan. Hier zijn een paar foto's.",
    english:
      "What a super caffeine-rich day! Today, I went to Amsterdam Coffee Festival with my boyfriend and a friend. In the morning I was cold, but around midday, we had a pleasant day. The festival was in a large hall with high ceilings and an industrial atmosphere. The festival had more than 50 local and international coffee roasters. My favourite roasters are Rum Baba, Steen Coffee, Keen and of course Sprouts.\n\nWe also saw that the festival had many chai stands. That was new and unexpected. I found a very pleasant and calm Chinese tea stand. I bought \"Snowy Chrysanthemum\" tea from \"Yin Cha\". It was a little sweet, but very calming. I bought a gift for my boyfriend's mother for her birthday. I hope she likes the tea.\n\nAll baristas from all stands are polite and knowledgeable. My favourite coffee was \"Pink California\" from Rum Baba. It had the taste of sweet candy with strawberry. It was very tasty! We also went to the Keen stand, where we had \"the Keen coffee experience\". We tried three types of filter coffee. I found all three very tasty. The coffee was good for summer. We talked about fermentation, flavour profiles and roast types. I find this super interesting!\n\nAround 18:00, we were tired but super caffeinated. After that we went to Madras Diaries for dinner with more friends. I liked that the day ended with Indian food. I love the Amsterdam coffee festival. I want to go to the festival again next year. Here are a few photos.",
  },
  {
    id: 2,
    date: "April 6, 2026",
    title: "Beslissing om naar Nederland te komen",
    dutch:
      "Dit schrijven is voor mijn Nederlandse huiswerkoefening. Waarom kom jij naar Nederland?\n\nGoedemiddag,\n\nVandaag zal ik vertellen hoe ik heb besloten om in Nederland te wonen.\n\nNa mijn bachelor werkte ik in India. Maar ik verveelde me. Het was coronatijd en alles was gesloten. Ik was altijd thuis. Daarom besloot ik om een master in Europa te studeren.\n\nMijn eerste jaar was in Berlijn. Voor mijn tweede jaar kwam ik in september 2022 naar Nederland. Ik vond Eindhoven erg rustig en modern. Mijn studie ging snel en ik heb mijn diploma gehaald in september 2023. Daarna werkte ik bij Signify in Eindhoven.\n\nIk vind de Nederlanders heel direct, maar ook beleefd. Ik hou van Nederlandse steden. Ik vind ze schattig. Ik vind het heel leuk dat er hier zoveel musea zijn. Ik wil ze allemaal zien.\n\nHet is nu bijna 3,5 jaar in Nederland. Ik heb al mijn vrienden hier. Ik heb mijn vriend hier ontmoet. Ik heb samen met hem een appartement gekocht. Nu ben ik begonnen met Nederlands leren, voelt Eindhoven eindelijk als thuis voor mij.",
    english:
      "This writing is for my Dutch homework exercise. Why did you come to the Netherlands?\n\nGood afternoon,\n\nToday I will tell how I decided to live in the Netherlands.\n\nAfter my bachelor I worked in India. But I was bored. It was corona time and everything was closed. I was always at home. That's why I decided to study a master's in Europe.\n\nMy first year was in Berlin. For my second year I came to the Netherlands in September 2022. I found Eindhoven very quiet and modern. My studies went quickly and I got my diploma in September 2023. After that I worked at Signify in Eindhoven.\n\nI find Dutch people very direct, but also polite. I love Dutch cities. I find them charming. I really like that there are so many museums here. I want to see them all.\n\nIt has now been almost 3.5 years in the Netherlands. I have all my friends here. I met my boyfriend here. I bought an apartment together with him. Now that I have started learning Dutch, Eindhoven finally feels like home to me.",
  },
  {
    id: 1,
    date: "March 25, 2026",
    title: "Kennismaken",
    dutch:
      "Ik heet Abhigya. Ik kom uit India, maar ik woon nu in Eindhoven. Ik leer Nederlands omdat mijn partner Nederlands is en omdat ik hier wil leven, niet alleen bestaan. Het is moeilijk, maar ook leuk. Ik maak veel fouten, maar dat is oké.",
    english:
      "My name is Abhigya. I come from India, but I live in Eindhoven now. I am learning Dutch because my partner is Dutch and because I want to live here, not just exist here. It is difficult, but also fun. I make a lot of mistakes, but that is okay.",
  },
];

// Add books here
const books: Book[] = [
  {
    id: 1,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    status: "reading",
    thoughts: "Coming soon.",
  },
  {
    id: 2,
    title: "The Undutchables",
    author: "Colin White & Laurie Boucke",
    status: "reading",
    thoughts: "Coming soon.",
  },
];

// Add recipes here (newest first)
const recipes: Recipe[] = [
  {
    id: 1,
    name: "Savoury Oats",
    meal: ["Breakfast"],
    description: "High protein savoury breakfast. Especially good if taking iron earlier (to avoid dairy).",
    tags: ["High Protein", "Quick", "Savoury"],
    ingredients: ["60g fine oats", "1 tsp nutritional yeast flakes", "1/4 tsp miso", "1 tsp soya sauce light", "30g peas", "15g frozen spinach", "1 boiled egg","1/4 tsp lemon juice", "1 tbsp seed mix", "1/2 tsp chilli oil"],
    notes: "Optional: cheese / cottage cheese / tahini. Protein: 1 boiled egg or vegan chicken.",
    macros: { calories: 422, protein: 20, carbs: 40, fat: 16, fibre: 7 },
    calorieBreakdown: [
      { label: "Oats", value: 228 },
      { label: "Egg", value: 78 },
      { label: "Seed mix", value: 55 },
      { label: "Peas", value: 24 },
      { label: "Chilli oil", value: 20 },
      { label: "Nutritional yeast", value: 10 },
      { label: "Other", value: 7 },
    ],
    proteinBreakdown: [
      { label: "Oats", value: 8 },
      { label: "Egg", value: 6.3 },
      { label: "Seed mix", value: 2 },
      { label: "Peas", value: 1.6 },
      { label: "Nutritional yeast", value: 1.5 },
      { label: "Spinach", value: 0.4 },
    ],
  },
  {
    id: 2,
    name: "Tomato Mushroom Lentil Pasta",
    meal: ["Lunch", "Dinner"],
    description: "High protein lunch recipe. Makes 10 servings. Great for meal prep.",
    tags: ["High Protein", "Savoury", "Vegan", "Meal Prep"],
    ingredients: ["500g dried pasta", "600g chopped chestnut mushrooms", "2 onions, finely chopped", "8 cloves garlic, minced", "100g walnut pieces", "7 large sun-dried tomatoes, finely chopped", "1 tsp smoked paprika", "1 tbsp tomato paste", "2* 400g can of brown lentils, cooked and drained", "1 × 400g tin plum tomatoes", "3 tbsp nutritional yeast","Salt, pepper, extra virgin olive oil", "Parmesan for topping"],
    inspirationUrl: "https://youtube.com/shorts/jVP3rDU6Ciw",
    macros: { calories: 394, protein: 17, carbs: 59, fat: 10, fibre: 6 },
    calorieBreakdown: [
      { label: "Pasta", value: 185 },
      { label: "Walnuts", value: 65 },
      { label: "Lentils", value: 53 },
      { label: "Olive oil", value: 24 },
      { label: "Sun-dried tomatoes", value: 18 },
      { label: "Mushrooms", value: 13 },
      { label: "Onions", value: 12 },
      { label: "Parmesan", value: 8 },
      { label: "Other", value: 16 },
    ],
    proteinBreakdown: [
      { label: "Pasta", value: 6.5 },
      { label: "Lentils", value: 4.3 },
      { label: "Mushrooms", value: 1.8 },
      { label: "Walnuts", value: 1.5 },
      { label: "Nutritional yeast", value: 0.8 },
      { label: "Parmesan", value: 0.7 },
      { label: "Onions", value: 0.4 },
      { label: "Other", value: 1 },
    ],
  },
  {
    id: 3,
    name: "Fruity Mango Spinach Couscous Salad",
    meal: ["Lunch", "Brunch"],
    description: "Fresh salad. Looks very pretty. Great for guests. Serves 8.",
    tags: ["Pretty", "Salad", "Fresh"],
    ingredients: [
      "— Lime Maple Vinaigrette —",
      "1/3 cup olive oil",
      "2 tbsp maple syrup",
      "2 tbsp apple cider vinegar",
      "2 tbsp balsamic vinegar",
      "1 lime, zested and juiced",
      "1/4 tsp salt",
      "— Salad —",
      "200g small couscous",
      "1/2 cup pecans",
      "340g can of corn",
      "1 large mango, peeled and sliced",
      "3 cups baby arugula",
      "3 cups baby spinach",
      "2 large cucumbers, sliced",
      "1 ripe avocado, sliced",
      "1 cup fresh blackberries",
      "1 cup fresh blueberries",
      "Feta",
      "400g brown lentils, cooked and drained",
      "400g chickpeas, cooked and drained",
    ],
    notes: "Grill the sliced corn and mango beforehand. The salad tastes better the longer it marinates.",
    inspirationUrl: "https://www.youtube.com/watch?v=LJ4JfYDJBzY",
    macros: { calories: 447, protein: 14, carbs: 52, fat: 20, fibre: 7 },
    calorieBreakdown: [
      { label: "Couscous", value: 88 },
      { label: "Olive oil", value: 75 },
      { label: "Chickpeas", value: 49 },
      { label: "Pecans", value: 48 },
      { label: "Lentils", value: 33 },
      { label: "Feta", value: 33 },
      { label: "Avocado", value: 30 },
      { label: "Corn", value: 29 },
      { label: "Mango", value: 17 },
      { label: "Berries", value: 16 },
      { label: "Maple syrup", value: 13 },
      { label: "Other", value: 16 },
    ],
    proteinBreakdown: [
      { label: "Couscous", value: 3 },
      { label: "Chickpeas", value: 2.8 },
      { label: "Lentils", value: 2.8 },
      { label: "Feta", value: 1.8 },
      { label: "Corn", value: 1 },
      { label: "Pecans", value: 0.6 },
      { label: "Greens", value: 0.5 },
      { label: "Other", value: 1.5 },
    ],
  },
  {
    id: 4,
    name: "Bean Sandwich",
    meal: ["Lunch", "Brunch"],
    description: "Quick, protein-packed and filling.",
    tags: ["High Protein", "Sandwich", "Quick"],
    ingredients: [
      "— Filling —",
      "100g white beans (mashed)",
      "1/2 white onion",
      "2 cloves garlic",
      "1 tbsp nutritional yeast",
      "1/2 cucumber",
      "150g canned corn",
      "— Spices —",
      "1 tsp bukunu",
      "1 tsp mint",
      "1 tsp pav bhaji masala / jeera",
      "1 tsp chilli powder",
      "1/4 tsp honey",
      "1/2 tsp balsamic vinegar",
      "— Sandwich —",
      "2 slices bread",
      "2 tbsp hummus (spread on bread)",
      "20g spinach",
      "2 slices gouda cheese",
    ],
    notes: "Mash the beans, mix the filling, spread hummus on bread, layer spinach, filling, and cheese.",
    macros: { calories: 659, protein: 32, carbs: 90, fat: 17, fibre: 6 },
    calorieBreakdown: [
      { label: "Bread", value: 180 },
      { label: "Gouda", value: 144 },
      { label: "Corn", value: 114 },
      { label: "White beans", value: 110 },
      { label: "Hummus", value: 50 },
      { label: "Onion", value: 24 },
      { label: "Nutritional yeast", value: 17 },
      { label: "Other", value: 20 },
    ],
    proteinBreakdown: [
      { label: "Gouda", value: 10 },
      { label: "White beans", value: 7 },
      { label: "Bread", value: 6 },
      { label: "Corn", value: 3 },
      { label: "Nutritional yeast", value: 2.5 },
      { label: "Hummus", value: 2 },
      { label: "Spinach", value: 0.6 },
      { label: "Other", value: 0.7 },
    ],
  },
  {
    id: 5,
    name: "Egg Sandwich",
    meal: ["Dinner"],
    description: "Quick, good protein. Makes 2 slices of open sandwich per person.",
    tags: ["High Protein", "Quick"],
    ingredients: [
      "2 slices sourdough bread",
      "2 tbsp pikant hummus (spread on bread)",
      "10–20g salad greens (lettuce / arugula / spinach) as base",
      "2 slices gouda cheese",
      "2 boiled eggs, sliced",
      "Salt, pepper",
      "1 tsp balsamic glaze on top",
    ],
    macros: { calories: 563, protein: 32, carbs: 44, fat: 27, fibre: 3 },
    calorieBreakdown: [
      { label: "Bread", value: 200 },
      { label: "Eggs", value: 156 },
      { label: "Gouda", value: 144 },
      { label: "Hummus", value: 50 },
      { label: "Other", value: 13 },
    ],
    proteinBreakdown: [
      { label: "Eggs", value: 12.6 },
      { label: "Gouda", value: 10 },
      { label: "Bread", value: 7 },
      { label: "Hummus", value: 2 },
      { label: "Greens", value: 0.4 },
    ],
  },
  {
    id: 6,
    name: "Goat Cheese Salad",
    meal: ["Brunch", "Dinner"],
    description: "Super quick and tasty. Serves 1.",
    tags: ["Quick", "Salad"],
    ingredients: [
      "100g arugula",
      "3 tbsp cottage cheese light",
      "4 macadamia nuts",
      "3 almonds",
      "10 dried cranberries",
      "1 small mandarin",
      "Half a small purple onion",
      "20g cooked tempeh",
      "3 sun-dried tomatoes",
      "1 tsp balsamic glaze",
    ],
    macros: { calories: 337, protein: 16, carbs: 35, fat: 14, fibre: 5 },
    calorieBreakdown: [
      { label: "Macadamia nuts", value: 86 },
      { label: "Mandarin", value: 40 },
      { label: "Sun-dried tomatoes", value: 38 },
      { label: "Tempeh", value: 38 },
      { label: "Cranberries", value: 33 },
      { label: "Cottage cheese", value: 32 },
      { label: "Arugula", value: 25 },
      { label: "Almonds", value: 23 },
      { label: "Other", value: 22 },
    ],
    proteinBreakdown: [
      { label: "Cottage cheese", value: 5.4 },
      { label: "Tempeh", value: 3.8 },
      { label: "Arugula", value: 2.6 },
      { label: "Macadamia nuts", value: 1 },
      { label: "Sun-dried tomatoes", value: 1 },
      { label: "Almonds", value: 0.8 },
      { label: "Mandarin", value: 0.6 },
      { label: "Other", value: 0.3 },
    ],
  },
];

// Add coffee notes here
const coffeeNotes: CoffeeNote[] = [
  {
    id: 1,
    title: "Placeholder",
    note: "Coming soon.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

const PIE_COLORS = [
  "#2f7c85", "#b34f24", "#5b8c5a", "#8a6fad", "#c4883f",
  "#d4726a", "#4a90a4", "#7d6b5d", "#a3b86c", "#c26f8a",
  "#6a9fb5", "#d4a84b",
];

function PieChart({ slices, title, unit, colorMap }: { slices: NutritionSlice[]; title: string; unit: string; colorMap: Record<string, string> }) {
  const total = slices.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const r = 48;

  let cumulative = 0;
  const paths = slices.map((slice, i) => {
    const fraction = slice.value / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const largeArc = fraction > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return <path key={i} d={d} fill={colorMap[slice.label] ?? PIE_COLORS[i % PIE_COLORS.length]} />;
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8a9aa6]">{title}</p>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{paths}</svg>
      <ul className="space-y-0.5 text-[11px] text-[#4e5b66]">
        {slices.map((slice, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: colorMap[slice.label] ?? PIE_COLORS[i % PIE_COLORS.length] }} />
            {slice.label} — {Math.round(slice.value)}{unit} ({Math.round((slice.value / total) * 100)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionDivider({ label, id }: { label: string; id?: string }) {
  return (
    <div id={id} className="mt-20 mb-8 flex items-center gap-4 scroll-mt-20">
      <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9aa6]">
        {label}
      </span>
      <div className="flex-1 border-t border-[#e4ddd3]" />
    </div>
  );
}

export default function ForFun() {
  const [showSpotify, setShowSpotify] = useState(false);
  const [mealFilter, setMealFilter] = useState<MealCategory>("All");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const categories = [
    { id: "dutch", label: "Nederlands", emoji: "🇳🇱", desc: "A2-level writing practice" },
    { id: "books", label: "Books", emoji: "📚", desc: "What I'm reading & notes" },
    { id: "recipes", label: "Recipes", emoji: "🍳", desc: "Things I cook, no measurements" },
    { id: "others", label: "Others", emoji: "☕", desc: "Coffee, music, miscellaneous" },
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Floating nav widget */}
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 rounded-full border border-[#e4ddd3] bg-white/95 px-2 py-2 shadow-lg backdrop-blur sm:gap-2 sm:px-3">
        <a
          href="#"
          title="Back to top"
          className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#4e5b66] transition hover:bg-[#f0ece4] hover:text-[#b34f24] sm:text-sm"
        >
          <span>↑</span>
          <span className="hidden sm:inline">Top</span>
        </a>
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            title={cat.label}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#4e5b66] transition hover:bg-[#e8f4f5] hover:text-[#2f7c85] sm:text-sm"
          >
            <span>{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </a>
        ))}
      </nav>

      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-[#fbfaf6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <Link
            href="/"
            className="shrink-0 text-sm text-[#4e5b66] hover:text-[#b34f24] transition-colors"
          >
            ← Abhigya Parashar
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pt-16 md:px-10">
        {/* Page intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold text-[#13222f] md:text-5xl">For Fun</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3d4d5b]">
            Things that don&apos;t belong on a CV.
          </p>
        </motion.div>

        {/* Thumbnail grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={`#${cat.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-[#e4ddd3] bg-white p-6 text-center shadow-sm transition hover:border-[#2f7c85] hover:shadow-md"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="font-display text-sm font-semibold text-[#13222f] group-hover:text-[#2f7c85]">
                {cat.label}
              </span>
              <span className="text-xs leading-snug text-[#6a7d8a]">{cat.desc}</span>
            </motion.a>
          ))}
        </div>

        {/* Spotify embed */}
        <div className="mt-12 border-t border-[#e4ddd3] pt-8">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9aa6]">Brainport Radio — learning to swim, starting late</p>
          {showSpotify ? (
            <iframe
              src="https://open.spotify.com/embed/episode/30cWGV56Dqnd4dIhs29Ojp"
              width="100%"
              height="152"
              style={{ border: "none" }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              title="Brainport Radio Spotify episode"
              className="rounded-xl"
            />
          ) : (
            <button
              onClick={() => setShowSpotify(true)}
              className="flex w-full items-center gap-3 rounded-xl border border-[#e4ddd3] bg-white px-5 py-4 text-left transition hover:border-[#2f7c85] hover:shadow-sm"
            >
              <span className="text-2xl">🎧</span>
              <span className="text-sm text-[#4e5b66]">Click to load Spotify player</span>
            </button>
          )}
        </div>

        {/* ── Dutch writing ── */}
        <SectionDivider label="Nederlands oefenen" id="dutch" />
        <p className="mb-8 text-base text-[#6a7d8a]">
          Short paragraphs, A2 level, not proofread. 
        </p>
        <div className="space-y-16">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={cardVariants}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <h2 className="font-display text-2xl text-[#13222f]">
                  <span className="text-[#8a9aa6] mr-1">{post.id}.</span> {post.title}
                </h2>
                <span className="text-sm text-[#8a9aa6]">{post.date}</span>
              </div>
              <div className="rounded-lg border-l-2 border-[#2f7c85] pl-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2f7c85] mb-2">Nederlands</p>
                <div className="space-y-4 text-[17px] leading-8 text-[#1e3040] font-body">
                  {post.dutch.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="mt-5 pl-5">
                <details className="group">
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-[#8a9aa6] mb-2 select-none">
                    English translation
                  </summary>
                  <div className="mt-3 space-y-4 text-[16px] leading-7 text-[#6a7d8a] italic">
                    {post.english.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </details>
              </div>
              {post.images && post.images.length > 0 && (
                <div className="mt-5 pl-5">
                  <details>
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-[#8a9aa6] select-none">
                      Photos
                    </summary>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {post.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={`${basePath}${img}`}
                          alt={`${post.title} photo ${idx + 1}`}
                          width={200}
                          height={150}
                          className="rounded-md object-cover w-full h-auto"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* ── Books ── */}
        <SectionDivider label="What I'm reading" id="books" />
        <p className="mb-8 text-base text-[#6a7d8a]">
          Reviews and notes on books I&apos;m currently reading or recently finished.
        </p>
        <div className="space-y-8">
          {books.map((book, i) => (
            <motion.article
              key={book.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={cardVariants}
              className="border-b border-[#e4ddd3] pb-8 last:border-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl text-[#13222f]">{book.title}</h2>
                  <p className="text-sm text-[#6a7d8a]">{book.author}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  book.status === "reading"
                    ? "bg-[#e8f4f5] text-[#2f7c85]"
                    : "bg-[#f0ece4] text-[#7a6a58]"
                }`}>
                  {book.status === "reading" ? "Reading now" : "Recently finished"}
                </span>
              </div>
              <p className="mt-3 text-[16px] leading-7 text-[#3d4d5b]">{book.thoughts}</p>
            </motion.article>
          ))}
        </div>

        {/* ── Recipes ── */}
        <SectionDivider label="Recipes" id="recipes" />
        <p className="mb-6 text-base text-[#6a7d8a]">
          Things I cook. No exact measurements, no food photography — just notes on what works.
        </p>

        {/* Meal category filter pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {mealCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setMealFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                mealFilter === cat
                  ? "bg-[#2f7c85] text-white"
                  : "border border-[#d9cfbf] bg-[#faf7f1] text-[#495a68] hover:border-[#2f7c85] hover:text-[#2f7c85]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe cards grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {recipes
            .filter((r) => mealFilter === "All" || r.meal.includes(mealFilter as Exclude<MealCategory, "All">))
            .map((recipe, i) => (
            <motion.article
              key={recipe.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={cardVariants}
              className="flex flex-col rounded-xl border border-[#e4ddd3] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Header: name + meal badge + time */}
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-[#13222f]">{recipe.name}</h2>
                <div className="flex shrink-0 gap-1.5">
                  {recipe.meal.map((m) => (
                    <span key={m} className="rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {recipe.prepTime && (
                <p className="mt-1 text-xs text-[#8a9aa6]">⏱ {recipe.prepTime}</p>
              )}

              {/* Description */}
              <p className="mt-3 text-[15px] leading-7 text-[#3d4d5b]">{recipe.description}</p>

              {/* Macros */}
              {recipe.macros && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#6a7d8a]">
                  <span>{recipe.macros.calories} kcal</span>
                  <span className="text-[#d9cfbf]">|</span>
                  <span>P {recipe.macros.protein}g</span>
                  <span className="text-[#d9cfbf]">|</span>
                  <span>C {recipe.macros.carbs}g</span>
                  <span className="text-[#d9cfbf]">|</span>
                  <span>F {recipe.macros.fat}g</span>
                  <span className="text-[#d9cfbf]">|</span>
                  <span>Fibre {recipe.macros.fibre}g</span>
                </div>
              )}

              {/* Tags */}
              {recipe.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#7a6a58]">{tag}</span>
                  ))}
                </div>
              )}

              {/* Expandable ingredients & notes */}
              {(recipe.ingredients || recipe.notes) && (
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-[#8a9aa6] select-none hover:text-[#2f7c85] transition-colors">
                    Ingredients &amp; Notes
                  </summary>
                  <div className="mt-3 space-y-3">
                    {recipe.ingredients && (
                      <ul className="space-y-1 text-[14px] text-[#3d4d5b]">
                        {recipe.ingredients.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {recipe.notes && (
                      <p className="text-[14px] leading-6 italic text-[#6a7d8a]">{recipe.notes}</p>
                    )}
                    {(recipe.calorieBreakdown || recipe.proteinBreakdown) && (() => {
                      const allLabels = Array.from(new Set([
                        ...(recipe.calorieBreakdown ?? []).map((s) => s.label),
                        ...(recipe.proteinBreakdown ?? []).map((s) => s.label),
                      ]));
                      const colorMap: Record<string, string> = {};
                      allLabels.forEach((label, i) => { colorMap[label] = PIE_COLORS[i % PIE_COLORS.length]; });
                      return (
                        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {recipe.calorieBreakdown && (
                            <PieChart slices={recipe.calorieBreakdown} title="Calories by ingredient" unit=" kcal" colorMap={colorMap} />
                          )}
                          {recipe.proteinBreakdown && (
                            <PieChart slices={recipe.proteinBreakdown} title="Protein by ingredient" unit="g" colorMap={colorMap} />
                          )}
                        </div>
                      );
                    })()}
                    {recipe.inspirationUrl && (
                      <a
                        href={recipe.inspirationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[#2f7c85] hover:underline underline-offset-2 transition-colors"
                      >
                        Inspiration video →
                      </a>
                    )}
                  </div>
                </details>
              )}
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {recipes.filter((r) => mealFilter === "All" || r.meal.includes(mealFilter as Exclude<MealCategory, "All">)).length === 0 && (
          <p className="mt-6 text-center text-sm text-[#8a9aa6]">No recipes in this category yet.</p>
        )}

        {/* ── Others ── */}
        <SectionDivider label="Others" id="others" />
        <p className="mb-8 text-base text-[#6a7d8a]">
          Beans, brews, and opinions. I take it seriously but not that seriously.
        </p>
        <div className="space-y-8">
          {coffeeNotes.map((entry, i) => (
            <motion.article
              key={entry.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={cardVariants}
              className="border-b border-[#e4ddd3] pb-8 last:border-0"
            >
              <h2 className="font-display text-xl text-[#13222f]">{entry.title}</h2>
              <p className="mt-2 text-[16px] leading-7 text-[#3d4d5b]">{entry.note}</p>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-24 flex items-center justify-between border-t border-[#e4ddd3] pt-6">
          <p className="text-sm text-[#9aabb6]">
            More to come as the Dutch improves. Or gets worse. Hard to say.
          </p>
          <a
            href={`${basePath}/feed.xml`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-xs text-[#8a9aa6] hover:text-[#2f7c85] transition-colors"
          >
            RSS Feed
          </a>
        </div>
      </div>
    </main>
  );
}

