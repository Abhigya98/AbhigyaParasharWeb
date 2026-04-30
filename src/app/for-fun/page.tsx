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

const mealCategories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type MealCategory = (typeof mealCategories)[number];

type Recipe = {
  id: number;
  name: string;
  meal: Exclude<MealCategory, "All">;
  description: string;
  prepTime?: string;
  tags: string[];
  ingredients?: string[];
  notes?: string;
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
    name: "Masala Oats",
    meal: "Breakfast",
    description: "My go-to weekday breakfast. Savoury Indian-style oats — quick, filling, and you can throw in whatever vegetables are about to expire.",
    prepTime: "10 min",
    tags: ["High Protein", "Quick", "Vegetarian"],
    ingredients: ["Rolled oats", "Onion", "Tomato", "Green chilli", "Turmeric", "Cumin seeds", "Salt", "Water or milk"],
    notes: "Dry-roast the oats first for a nuttier taste. Add peanuts or a fried egg on top for extra protein.",
  },
  {
    id: 2,
    name: "Egg Fried Rice",
    meal: "Lunch",
    description: "Leftover rice rescue operation. Works best with day-old rice from the fridge — the drier the better.",
    prepTime: "15 min",
    tags: ["High Protein", "Quick"],
    ingredients: ["Cooked rice (day-old)", "Eggs", "Soy sauce", "Spring onions", "Garlic", "Sesame oil", "Vegetables of choice"],
    notes: "High heat is the secret. Don't crowd the pan. Scramble eggs first, set aside, then fry everything else.",
  },
  {
    id: 3,
    name: "Dal Tadka",
    meal: "Dinner",
    description: "Comfort food. Yellow lentils with a smoky tempered spice finish. My mother's recipe, loosely followed.",
    prepTime: "35 min",
    tags: ["High Protein", "Vegetarian"],
    ingredients: ["Toor dal", "Onion", "Tomato", "Garlic", "Cumin seeds", "Mustard seeds", "Dried red chilli", "Turmeric", "Ghee", "Coriander leaves"],
    notes: "Pressure cook the dal until soft. The tadka (tempering) at the end is what makes it — hot ghee, cumin, garlic, chilli. Pour it over and cover immediately to trap the smoke.",
  },
  {
    id: 4,
    name: "Greek Yogurt Bowl",
    meal: "Breakfast",
    description: "When I want something cold and fast. High protein, barely any effort.",
    prepTime: "5 min",
    tags: ["High Protein", "Quick", "Vegetarian"],
    ingredients: ["Greek yogurt", "Honey", "Granola", "Mixed berries", "Chia seeds"],
    notes: "Frozen berries work great — they thaw into the yogurt and make it even better.",
  },
  {
    id: 5,
    name: "Chicken Stir-fry",
    meal: "Dinner",
    description: "A weeknight staple. Fast enough for after work, protein-heavy enough to feel like a real meal.",
    prepTime: "20 min",
    tags: ["High Protein", "Quick"],
    ingredients: ["Chicken breast", "Bell peppers", "Broccoli", "Soy sauce", "Oyster sauce", "Garlic", "Ginger", "Cornstarch", "Rice"],
    notes: "Velvet the chicken (coat in cornstarch + soy sauce) before cooking. It stays juicy instead of turning rubbery.",
  },
  {
    id: 6,
    name: "Peanut Butter Banana Toast",
    meal: "Snacks",
    description: "The answer to every 4pm energy crash. Sweet, salty, crunchy.",
    prepTime: "3 min",
    tags: ["Quick", "Vegetarian"],
    ingredients: ["Sourdough bread", "Peanut butter", "Banana", "Honey", "Cinnamon"],
    notes: "Toast the bread well. Use crunchy peanut butter.",
  },
  {
    id: 7,
    name: "Paneer Bhurji",
    meal: "Lunch",
    description: "Scrambled paneer — the vegetarian answer to scrambled eggs but with Indian spices. Tastes better than it sounds.",
    prepTime: "15 min",
    tags: ["High Protein", "Quick", "Vegetarian"],
    ingredients: ["Paneer (crumbled)", "Onion", "Tomato", "Green chilli", "Turmeric", "Garam masala", "Coriander leaves"],
    notes: "Crumble the paneer by hand for uneven rustic texture. Serve with roti or inside a wrap.",
  },
  {
    id: 8,
    name: "Hummus & Veggie Wrap",
    meal: "Lunch",
    description: "A portable lunch that actually tastes good cold. Perfect for taking to work.",
    prepTime: "10 min",
    tags: ["Vegetarian", "Quick"],
    ingredients: ["Tortilla wrap", "Hummus", "Cucumber", "Shredded carrots", "Mixed greens", "Feta cheese", "Lemon juice"],
    notes: "Spread hummus edge-to-edge so nothing is dry. Roll tightly and slice diagonally.",
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
            .filter((r) => mealFilter === "All" || r.meal === mealFilter)
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
                <span className="shrink-0 rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">
                  {recipe.meal}
                </span>
              </div>

              {recipe.prepTime && (
                <p className="mt-1 text-xs text-[#8a9aa6]">⏱ {recipe.prepTime}</p>
              )}

              {/* Description */}
              <p className="mt-3 text-[15px] leading-7 text-[#3d4d5b]">{recipe.description}</p>

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
                  </div>
                </details>
              )}
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {recipes.filter((r) => mealFilter === "All" || r.meal === mealFilter).length === 0 && (
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

