"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, GraduationCap, BriefcaseBusiness, BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SectionBlock } from "@/components/SectionBlock";
import { SiteNav } from "@/components/SiteNav";

const trackedSections = ["work", "internships", "education", "projects", "publications", "contact"];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
  }),
};

const projectFilters = ["All", "Embedded", "Research", "Automation"] as const;
type ProjectFilter = (typeof projectFilters)[number];

const projectCards = [
  {
    title: "BLE OTA Deployment Optimizer",
    type: "Embedded",
    summary: "The update problem that was actually a scheduling problem. Redesigned the BLE OTA flow for 200-device deployments — brought update time from 2.5–4 hours down to about 25 minutes.",
    stack: ["C", "BLE", "Zigbee", "RTOS"],
  },
  {
    title: "Network Performance Monitoring Framework",
    type: "Research",
    summary: "Part of my thesis work. Built a framework to actually see what a large Zigbee network is doing — because intuition alone doesn't scale to hundreds of nodes.",
    stack: ["Python", "Validation", "WSN", "Analytics"],
  },
  {
    title: "BDD Validation Pipeline",
    type: "Automation",
    summary: "I got tired of catching regressions manually. A BDD-style test pipeline in Python that made releases less stressful for everyone involved.",
    stack: ["Python", "BDD", "C#", "CI"],
  },
  {
    title: "ESP32 Audio Visualiser",
    type: "Embedded",
    summary: "A hobby project, still in progress. An audio visualiser driven by an ESP32. I find it hard to stop tinkering with it, which is probably a good sign.",
    stack: ["ESP32", "C", "Electronics"],
  },
] as const;

export default function Home() {
  const [activeSection, setActiveSection] = useState("work");
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return projectCards;
    return projectCards.filter((card) => card.type === selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    trackedSections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <main id="top" className="min-h-screen pb-16">
      <SiteNav activeId={activeSection} />

      <div className="mx-auto flex max-w-7xl flex-col px-4 pt-10 md:px-6 md:pt-16">
        <div className="space-y-24">
          {/* Merged hero section - profile + intro + content */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 gap-12 pb-12 border-b border-[#e4ddd3] md:grid-cols-3 md:gap-16 lg:gap-20"
          >
            {/* Left: Profile photo with minimal styling */}
            <div className="relative md:col-span-1">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/Me.jpeg`}
                alt="Abhigya Parashar"
                width={280}
                height={360}
                className="w-full rounded-lg object-cover"
                priority
              />
              {/* Name & title below photo */}
              <div className="mt-4">
                <h1 className="font-display text-2xl font-bold text-ink">Abhigya Parashar</h1>
                <p className="mt-1 text-sm text-[#4e5b66]">Embedded Software Engineer at Signify</p>
              </div>
              {/* Contact info */}
              <div className="mt-4 space-y-2 text-sm text-[#425364]">
                <a href="mailto:abhigyaparashar22@gmail.com" className="flex items-center gap-2 hover:text-accent">
                  <Mail size={16} /> abhigyaparashar22@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/abhigya-parashar/" target="_blank" className="flex items-center gap-2 hover:text-accent" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://github.com/Abhigya98" target="_blank" className="flex items-center gap-2 hover:text-accent" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>
                <a href="https://scholar.google.com/citations?hl=en&user=glWXv9UAAAAJ" target="_blank" className="flex items-center gap-2 hover:text-accent" rel="noreferrer">
                  <BookOpen size={16} /> Google Scholar
                </a>
              </div>
            </div>

            {/* Right: Content flowing naturally */}
            <div className="md:col-span-2 flex flex-col justify-start">
              <div>
                <p className="mb-4 text-2xl font-medium text-[#3d4d5b]">Hi! 👋</p>
                <p className="text-lg leading-relaxed text-[#3d4d5b]">
                  I am Abhigya. I grew up in India, moved to Europe to pursue a master&apos;s in embedded systems, and now live in Eindhoven as an embedded software engineer at{" "}
                  <span className="font-medium text-[#2a3b48]">Signify</span>.
                  I develop and validate features in the indoor smart lighting arena by writing firmware in C.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[#3d4d5b]">
                  Outside of work, I tinker with electronics — there&apos;s an ESP32 audio visualiser on my desk that&apos;s been <em>almost finished</em> for a few weeks.
                  Lately, I’ve been focusing on Embedded Linux and Edge AI.
                  I&apos;m drawn to the places where technology meets real life: how it changes behaviour, how it shapes economies, and its impact on society.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[#3d4d5b]">
                  I am an avid reader, love food, coffee and art and always have an ongoing project.
                  Right now I am learning Dutch (A2). I write short paragraphs to keep practising.
                  They are full of mistakes but it is oddly satisfying to see my progress —{" "}
                  <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/for-fun`} className="underline underline-offset-2 hover:text-sea transition-colors">read them here</a>.
                </p>
                {/* Swimming paragraph + Spotify embed — embed floats right, text wraps around it */}
                <div className="mt-4 overflow-hidden">
                  <div className="float-right ml-4 mb-1 w-[340px]">
                    <iframe
                      src="https://open.spotify.com/embed/episode/30cWGV56Dqnd4dIhs29Ojp"
                      width="340"
                      height="100"
                      style={{ border: "none" }}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-xl opacity-90"
                    />
                  </div>
                  <p className="text-lg leading-relaxed text-[#3d4d5b]">
                    At 27, I am fulfilling my long awaited dream of swimming, haha.
                    That journey led to a conversation on{" "}
                    <a href="https://open.spotify.com/episode/30cWGV56Dqnd4dIhs29Ojp?si=u4ogZMUSQ9i6VYEL50pGUw" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-sea transition-colors">Brainport Radio</a>
                    {" "} with my coach (<a href="https://www.linkedin.com/posts/meagin-van-der-westhuizen-b875404b_the-courage-to-dive-in-learning-to-swim-activity-7446908227541291008-rRfa?utm_source=share&utm_medium=member_desktop&rcm=ACoAACYEqj8BU57Grn_Uq88VGlcRlWXKnrS5Lug" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-sea transition-colors">LinkedIn</a>).
                  </p>
                </div>
              </div>

              {/* Skills pills */}
              <div className="mt-8">
                <p className="mb-3 font-display text-sm uppercase tracking-[0.2em] text-[#7a8a96]">Core professional expertise</p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">Firmware Architecture</span>
                  <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">Zigbee + BLE</span>
                  <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">RTOS</span>
                  <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">Field Reliability</span>
                  <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">Over-the-Air Upgrades</span>
                </div>
              </div>

              {/* Quiet CTAs */}
              {/*
              <div className="mt-8 border-t border-[#e4ddd3] pt-6">
                <p className="mb-3 text-sm text-[#8a9aa6]">Visit a section for more details</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#work"
                    className="flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sea"
                  >
                    <BriefcaseBusiness size={15} />
                    Professional work
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/for-fun`}
                    className="flex items-center gap-2 rounded-lg border border-[#c8bfb0] bg-white px-5 py-2.5 text-sm font-medium text-[#3d4d5b] transition hover:border-sea hover:text-sea"
                  >
                    <BookOpen size={15} />
                    Personal &amp; fun stuff
                  </a>
                </div>
              </div>
              */}
            </div>
          </motion.section>

          <SectionBlock id="work" title="Work Experience">
            <div className="timeline-rail">
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-display text-xl text-ink">
                    <BriefcaseBusiness size={20} /> Embedded Software Engineer, Signify
                  </p>
                  <p className="mt-1 text-sm text-[#526271]">Feb 2023 – Present · Eindhoven, Netherlands</p>
                </div>
                <a href="https://www.signify.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/SignifyLogo.webp`}
                    alt="Signify"
                    width={80}
                    height={32}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-3 text-[#3d4d5b]">
                Developing firmware in C for EFR32-based sensor nodes in indoor smart lighting systems — Zigbee mesh with BLE connectivity, running on Micrium OS III. Some key contributions include:
              </p>
              <ul className="mt-3 space-y-2 text-[#3d4d5b] text-[15px] leading-relaxed">
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" /><span>BLE OTA optimisation that cut update time for a 200-device network from 2.5–4 hours (Zigbee OTA) to ~25 minutes — live in production.</span></li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" /><span>Platform unification across product lines, including modular component design and backward compatibility.</span></li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" /><span>Post-OTA migration handling in devices after firmware upgrades to preserve crucial data.</span></li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {["C", "Micrium OS III", "BLE", "Zigbee", "Python", "C#", "BDD", "Jenkins"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[#2f7c85] hover:underline underline-offset-2 transition-colors"
              >
                Read more →
              </a>
            </motion.article>
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-display text-xl text-ink">
                    <BriefcaseBusiness size={20} /> Software Engineer, KPIT Technologies
                  </p>
                  <p className="mt-1 text-sm text-[#526271]">Apr 2021 – Sept 2021 · Bangalore, India</p>
                </div>
                <a href="https://www.kpit.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/kpitLogo.jpg`}
                    alt="KPIT Technologies"
                    width={80}
                    height={32}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-3 text-[#3d4d5b]">
                Developed and automated test environments for a cloud-based application. Gained exposure to automotive systems and communication protocols.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Python", "pytest", "Automotive"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[#2f7c85] hover:underline underline-offset-2 transition-colors"
              >
                Read more →
              </a>
            </motion.article>
            </div>
          </SectionBlock>

          <SectionBlock id="internships" title="Internships">
            <div className="timeline-rail">
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Embedded Software Intern — Signify</h3>
                  <p className="text-sm text-[#526271]">Feb 2023 – Aug 2023 · Eindhoven, Netherlands</p>
                </div>
                <a href="https://www.signify.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/SignifyLogo.webp`}
                    alt="Signify"
                    width={80}
                    height={32}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-2 text-[#3d4d5b]">
                Built a network performance monitoring framework for large-scale Zigbee deployments — automated &ldquo;health reports&rdquo; used for quality deployement of indoor light networks. 
                Presented the research at the{" "}
                <a href="https://ieeexplore.ieee.org/abstract/document/10817217" target="_blank" rel="noreferrer" className="text-[#2f7c85] hover:underline underline-offset-2">IEEE PIMRC International Conference</a>
                {" "}in Valencia, Spain. Click on read more to know about the research and the conference.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["C#", "Zigbee", "BLE", "RTOS", "Python"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[#2f7c85] hover:underline underline-offset-2 transition-colors"
              >
                Read more →
              </a>
            </motion.article>
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Embedded Software Intern — Smart Health Global</h3>
                  <p className="text-sm text-[#526271]">Jan 2020 – Jul 2020 · Bangalore, India</p>
                </div>
                <a href="https://shgtechnologies.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/SHGLogo.jpg`}
                    alt="Smart Health Global"
                    width={80}
                    height={32}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-2 text-[#3d4d5b]">Built smart vision glasses for the visually impaired and a portable vein finder for elderly care — image processing on embedded devices at a 15-person start-up doing impactful work in underserved Indian communities.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["C", "Python", "OpenCV", "Raspberry Pi"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[#2f7c85] hover:underline underline-offset-2 transition-colors"
              >
                Read more →
              </a>
            </motion.article>
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl text-ink">Research Intern — DESE, IISc</h3>
                  <p className="text-sm text-[#526271]">Jun 2019 – Sept 2019 · Bangalore, India</p>
                </div>
                <a href="https://dese.iisc.ac.in/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/DESELogo.png`}
                    alt="IISc DESE"
                    width={80}
                    height={32}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-2 text-[#3d4d5b]">Implemented TSCH (Time Synchronized Channel Hopping) over IEEE 802.15.4 under Dr. T.V. Prabhakar. Built communication logic for robust trans-reception among constrained nodes in low-power mesh networks.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["C", "802.15.4", "TSCH", "WSN"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[#2f7c85] hover:underline underline-offset-2 transition-colors"
              >
                Read more →
              </a>
            </motion.article>
            </div>
          </SectionBlock>

          <SectionBlock id="education" title="Education">
            <div className="timeline-rail">
            <motion.article
              className="timeline-item bg-[#fffdfa]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
            >
              <p className="flex items-center gap-2 font-display text-xl text-ink">
                <GraduationCap size={20} /> MSc Embedded Systems, EIT Digital
              </p>
              <p className="mt-1 text-sm text-[#526271]">Oct 2021 – Sept 2023 · TU Eindhoven + TU Berlin</p>
              <p className="mt-4">
                EIT Digital splits you across two universities in two countries. I was in Eindhoven and Berlin.
                It&apos;s a funded programme and the students come from everywhere, which makes it interesting
                in ways the curriculum doesn&apos;t advertise.
              </p>
              <p className="mt-3">
                My thesis was joint with TU/e and Signify — monitoring large-scale Zigbee deployments.
                It&apos;s how I ended up at Signify; they offered me a job before I&apos;d finished writing.
                I got 8.95/10, which I mention only because it took a genuinely long time to get the
                network to do what I needed it to do.
              </p>
            </motion.article>
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
            >
              <h3 className="font-display text-xl text-ink">BTech Electronics and Telecommunication</h3>
              <p className="mt-1 text-sm text-[#526271]">Aug 2016 – Sept 2020 · Ramaiah Institute of Technology, Bangalore</p>
              <p className="mt-4">
                Four years in Bangalore. I didn&apos;t know exactly what I wanted to do with electronics for most of it,
                but I stayed curious. We entered a national hardware innovation challenge and got selected in the
                top 20 from over 6,000 teams — which came with INR 0.5M in product development funding.
                That felt surreal at the time.
              </p>
            </motion.article>
            </div>
          </SectionBlock>

          <SectionBlock id="projects" title="Project Highlights">
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => {
                const active = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "bg-ink text-white"
                        : "border border-[#dfd5c8] bg-white text-[#495a68] hover:bg-[#f6efe4]"
                    }`}
                    type="button"
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="border-b border-[#e8e0d4] pb-5 last:border-0"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  layout
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-ink">{project.title}</h3>
                    <span className="rounded-full border border-[#d9cfbf] px-3 py-1 text-xs text-[#7a8a96]">{project.type}</span>
                  </div>
                  <p className="mt-2 text-[#3d4d5b]">{project.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="publications" title="Publications">
            <article>
              <p className="text-[#8a9aa6] text-sm uppercase tracking-wide mb-2">Peer-Reviewed</p>
              <a
                href="https://ieeexplore.ieee.org/abstract/document/10817217"
                target="_blank"
                rel="noreferrer"
                className="font-display text-xl text-ink hover:text-sea transition-colors"
              >
                Network Performance Monitoring in Large-Scale Zigbee Deployments
              </a>
              <p className="mt-1 text-sm text-[#7a8a96]">IEEE PIMRC 2024</p>
            </article>
          </SectionBlock>

          <SectionBlock id="contact" title="Contact">
            <p className="text-lg">
              If you&apos;re working on something where hardware constraints are the interesting part, I&apos;d like to hear about it.
              I&apos;m also happy to talk about embedded systems, books, or why you should read The Undutchables if you live in the Netherlands.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a className="group flex items-center gap-2 text-ink hover:text-sea transition-colors" href="mailto:abhigyaparashar22@gmail.com">
                <Mail size={16} />
                <span className="border-b border-[#c8bfb0] group-hover:border-sea">abhigyaparashar22@gmail.com</span>
              </a>
              <a className="group flex items-center gap-2 text-ink hover:text-sea transition-colors" href="https://www.linkedin.com/in/abhigya-parashar/" target="_blank" rel="noreferrer">
                <Linkedin size={16} />
                <span className="border-b border-[#c8bfb0] group-hover:border-sea">LinkedIn</span>
              </a>
            </div>
          </SectionBlock>

          <section>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#e4ddd3] pt-6 text-sm text-[#556573]">
              <p>Designed and engineered by Abhigya Parashar.</p>
              <div className="flex gap-4">
                <a href="https://github.com/Abhigya98" target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
                <a href="https://www.linkedin.com/in/abhigya-parashar/" target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
                <a href="https://scholar.google.com/citations?user=glWXv9UAAAAJ&hl=en" target="_blank" rel="noreferrer" className="hover:text-accent">Scholar</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
