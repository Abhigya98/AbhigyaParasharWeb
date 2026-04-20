"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Post = {
  id: number;
  date: string;
  title: string;
  dutch: string;
  english: string;
};

type Book = {
  id: number;
  title: string;
  author: string;
  status: "reading" | "recently-finished";
  thoughts: string;
};

type Recipe = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};

type CoffeeNote = {
  id: number;
  title: string;
  note: string;
};

// Add new Dutch writing entries here
const posts: Post[] = [
  {
    id: 1,
    date: "April 2026",
    title: "Eerste poging",
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

// Add recipes here
const recipes: Recipe[] = [
  {
    id: 1,
    name: "Placeholder recipe",
    description: "Coming soon.",
    tags: [],
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
  const categories = [
    { id: "dutch", label: "Nederlands", emoji: "🇳🇱", desc: "A2-level writing practice" },
    { id: "books", label: "Books", emoji: "📚", desc: "What I'm reading & notes" },
    { id: "recipes", label: "Recipes", emoji: "🍳", desc: "Things I cook, no measurements" },
    { id: "others", label: "Others", emoji: "☕", desc: "Coffee, music, miscellaneous" },
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-[#fbfaf6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <Link
            href="/"
            className="shrink-0 text-sm text-[#4e5b66] hover:text-[#b34f24] transition-colors"
          >
            ← Abhigya Parashar
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pt-16 md:px-10">
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
          <iframe
            src="https://open.spotify.com/embed/episode/30cWGV56Dqnd4dIhs29Ojp"
            width="100%"
            height="152"
            style={{ border: "none" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Brainport Radio Spotify episode"
            className="rounded-xl"
          />
        </div>

        {/* ── Dutch writing ── */}
        <SectionDivider label="Nederlands oefenen" id="dutch" />
        <p className="mb-8 text-base text-[#6a7d8a]">
          Short paragraphs, A2 level, not proofread. Posted here to keep myself accountable.
          Each entry has the Dutch original and an English translation.
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
                <h2 className="font-display text-2xl text-[#13222f]">{post.title}</h2>
                <span className="text-sm text-[#8a9aa6]">{post.date}</span>
              </div>
              <div className="rounded-lg border-l-2 border-[#2f7c85] pl-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2f7c85] mb-2">Nederlands</p>
                <p className="text-[17px] leading-8 text-[#1e3040] font-body">{post.dutch}</p>
              </div>
              <div className="mt-5 pl-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8a9aa6] mb-2">English</p>
                <p className="text-[16px] leading-7 text-[#6a7d8a] italic">{post.english}</p>
              </div>
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
        <p className="mb-8 text-base text-[#6a7d8a]">
          Things I cook. No exact measurements, no food photography — just notes on what works.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {recipes.map((recipe, i) => (
            <motion.article
              key={recipe.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={cardVariants}
              className="rounded-lg border border-[#e4ddd3] p-5"
            >
              <h2 className="font-display text-lg text-[#13222f]">{recipe.name}</h2>
              <p className="mt-2 text-[15px] leading-6 text-[#3d4d5b]">{recipe.description}</p>
              {recipe.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#7a6a58]">{tag}</span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>

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
        <p className="mt-24 text-sm text-[#9aabb6] border-t border-[#e4ddd3] pt-6">
          More to come as the Dutch improves. Or gets worse. Hard to say.
        </p>
      </div>
    </main>
  );
}

