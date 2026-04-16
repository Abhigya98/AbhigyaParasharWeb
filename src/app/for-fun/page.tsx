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

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function ForFun() {
  return (
    <main className="min-h-screen pb-24">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-[#fbfaf6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 md:px-10">
          <Link
            href={`${basePath}/`}
            className="text-sm text-[#4e5b66] hover:text-[#c35b2d] transition-colors"
          >
            ← Abhigya Parashar
          </Link>
          <span className="font-display text-sm font-semibold text-[#13222f]">For Fun</span>
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
            A page for things that don&apos;t belong on a CV. Right now that means my Dutch writing practice —
            short paragraphs, A1 level, not proofread. I&apos;m posting them here to keep myself accountable
            and because mistakes are less embarrassing when you name them first.
          </p>
          <p className="mt-3 text-base text-[#6a7d8a]">
            Each entry has the Dutch original and an English translation, in case you&apos;re curious what I was trying to say.
          </p>

          {/* Spotify embed */}
          <div className="mt-8 border-t border-[#e4ddd3] pt-8">
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9aa6]">Brainport Radio — learning to swim, starting late</p>
            <iframe
              src="https://open.spotify.com/embed/episode/30cWGV56Dqnd4dIhs29Ojp"
              width="100%"
              height="152"
              style={{ border: "none" }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>

          {/* Section divider */}
          <div className="mt-12 mb-8 flex items-center gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9aa6]">
              Nederlands oefenen
            </span>
            <div className="flex-1 border-t border-[#e4ddd3]" />
          </div>
        </motion.div>

        {/* Posts */}
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

              {/* Dutch */}
              <div className="rounded-lg border-l-2 border-[#2f7c85] pl-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2f7c85] mb-2">Nederlands</p>
                <p className="text-[17px] leading-8 text-[#1e3040] font-body">{post.dutch}</p>
              </div>

              {/* English */}
              <div className="mt-5 pl-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8a9aa6] mb-2">English</p>
                <p className="text-[16px] leading-7 text-[#6a7d8a] italic">{post.english}</p>
              </div>
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
