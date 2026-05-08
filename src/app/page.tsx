"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, GraduationCap, BriefcaseBusiness, BookOpen, ChevronDown } from "lucide-react";
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

const projectFilters = ["All", "Embedded", "Research", "Hardware", "Automation"] as const;
type ProjectFilter = (typeof projectFilters)[number];

const projectCards = [
  {
    title: "ESP32 Audio Visualiser",
    type: "Embedded",
    summary: "A home audio visualiser using an ESP32, MAX9814 microphone, and an LED matrix. Captures ambient sound, runs FFT to extract frequency bands, and drives real-time LED patterns. Still in progress.",
    stack: ["ESP32", "C", "FFT", "LED Matrix"],
    link: "https://github.com/Abhigya98/AudioVisualiser",
    linkType: "external" as const,
  },
  {
    title: "AGAAHI — Smart Helmet",
    type: "Hardware",
    summary: "A complete two-wheeler safety system: smart helmet with alcohol and drowsiness detection, GPS/GSM accident alerts, and ignition lock. Built with TI CC3200 MCU. Top 20 of 6,000+ teams nationwide (IICDC 2019).",
    stack: ["C", "TI CC3200", "GPS", "GSM", "Sensors"],
    link: "https://github.com/Abhigya98/Aagaahi-A-smart-helmet",
    linkType: "external" as const,
  },
  {
    title: "DDoS Attack Detection & Mitigation",
    type: "Research",
    summary: "Bachelor's thesis. Developed an algorithm to detect DDoS attacks across all TCP flag flood variants, and a mitigation system that blocks malicious IPs in real time to maintain service availability.",
    stack: ["Python", "Networking", "Security"],
    link: "https://github.com/Abhigya98/Smart-Detection-and-handling-of-DDoS-attack",
    linkType: "external" as const,
  },
  {
    title: "Network Performance Monitoring Framework",
    type: "Research",
    summary: "Masters thesis. Built a framework to quantitatively measure what a large Zigbee network is doing using reliability, robustness, and responsiveness qualitative metrics.",
    stack: ["Python", "Validation", "WSN", "Analytics"],
    link: "/work",
    linkType: "internal" as const,
  },
  {
    title: "BLE OTA Deployment Optimizer",
    type: "Embedded",
    summary: "Redesigned the BLE OTA flow for 200-device deployments and brought update time from 2.5\u20134 hours down to about 25 minutes.",
    stack: ["C", "BLE", "Zigbee", "RTOS"],
    link: "/work",
    linkType: "internal" as const,
  },
  {
    title: "Platform Unification",
    type: "Embedded",
    summary: "Merged two separate firmware stacks (Zigbee and BLE) into a single unified platform, enabling one codebase to support both protocol families. Involved restructuring build systems, resolving hardware abstraction conflicts, and ensuring zero regression across 50+ product variants.",
    stack: ["C", "Zigbee", "BLE", "RTOS", "Build Systems"],
    link: "/work",
    linkType: "internal" as const,
  },
  // {
  //   title: "BDD Validation Pipeline",
  //   type: "Automation",
  //   summary: "I got tired of catching regressions manually. A BDD-style test pipeline in Python that made releases less stressful for everyone involved.",
  //   stack: ["Python", "BDD", "C#", "CI"],
  //   link: "/work",
  //   linkType: "internal" as const,
  // },
] as const;

export default function Home() {
  const [activeSection, setActiveSection] = useState("work");
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("All");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = useMemo(() => {
    const filtered = selectedFilter === "All" ? projectCards : projectCards.filter((card) => card.type === selectedFilter);
    return showAllProjects ? filtered : filtered.slice(0, 4);
  }, [selectedFilter, showAllProjects]);

  const totalFilteredCount = useMemo(() => {
    return selectedFilter === "All" ? projectCards.length : projectCards.filter((card) => card.type === selectedFilter).length;
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
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/Image_me.webp`}
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
                  I am Abhigya. I grew up in India, studied and lived there for 22 years and then moved to Europe to pursue a master&apos;s in embedded systems. Now I live in Eindhoven as an 
                  embedded software engineer at{" "}<span className="font-medium text-[#2a3b48]">Signify</span>.
                  I develop and validate features in the indoor smart lighting arena by writing firmware in C.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[#3d4d5b]">
                  Outside of work, I tinker with electronics, sensors and microcontrollers. There&apos;s an ESP32 audio visualiser on my desk that&apos;s been <em>almost finished</em> for a 
                  quite a few weeks, haha.
                  Lately, I’ve been focusing on Embedded Linux and Edge AI.
                  I&apos;m drawn to the places where technology meets real life: how it changes behaviour, its role in shaping economics, and its impact on society.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[#3d4d5b]">
                  I am an avid reader, love food, coffee and art and always have an ongoing project.
                  Right now I am learning Dutch (A2). I write short paragraphs to keep practising.
                  They are full of mistakes but it is oddly satisfying to see my progress. You can {" "}
                  <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/for-fun#dutch`} className="underline underline-offset-2 hover:text-sea transition-colors">read them here</a>.
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
                    At 27, I am fulfilling my long awaited dream of swimming, haha. Quite frustrating and rewarding at the same time.
                    Listen to the conversation on the struggles of learning how to swim as an adult on {" "}
                    <a href="https://open.spotify.com/episode/30cWGV56Dqnd4dIhs29Ojp?si=u4ogZMUSQ9i6VYEL50pGUw" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-sea transition-colors">Brainport Radio</a>
                    {" "} with my coach and me (<a href="https://www.linkedin.com/posts/meagin-van-der-westhuizen-b875404b_the-courage-to-dive-in-learning-to-swim-activity-7446908227541291008-rRfa?utm_source=share&utm_medium=member_desktop&rcm=ACoAACYEqj8BU57Grn_Uq88VGlcRlWXKnrS5Lug" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-sea transition-colors">LinkedIn</a>).
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
                Developing firmware in C for EFR32-based sensor nodes in indoor smart lighting systems having Zigbee mesh with BLE connectivity, running on Micrium OS III. Some key contributions include:
              </p>
              <ul className="mt-3 space-y-2 text-[#3d4d5b] text-[15px] leading-relaxed">
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" /><span>BLE OTA optimisation that cut update time for a 200-device network from 2.5–4 hours (Zigbee OTA) to ~25 minutes. Live in production.</span></li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" /><span>Platform unification across product lines, including modular component design and backward compatibility.</span></li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7c85]" /><span>Post-OTA migration handling in devices after firmware upgrades to preserve crucial data.</span></li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {["C", "Micrium OS III", "BLE", "Zigbee", "Python", "C#", "BDD", "Jenkins"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work#signify`}
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
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work#kpit`}
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
                Built a network performance monitoring framework for large-scale Zigbee deployments. An automated &ldquo;health reports&rdquo; used for quality deployement of indoor light networks. 
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
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work#signify-intern`}
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
                    width={120}
                    height={32}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-2 text-[#3d4d5b]">Built smart vision glasses for the visually impaired and a portable vein finder for elderly care. It involved image processing on embedded devices at a 15-person start-up doing impactful work in underserved Indian communities.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["C", "Python", "OpenCV", "Raspberry Pi"].map((tech) => (
                  <span key={tech} className="rounded-full bg-[#f0ece4] px-3 py-1 text-xs text-[#485967]">{tech}</span>
                ))}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work#shg`}
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
                    width={170}
                    height={80}
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
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work#iisc-dese`}
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
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-display text-xl text-ink">
                    <GraduationCap size={20} /> MSc Embedded Systems, EIT Digital
                  </p>
                  <p className="mt-1 text-sm text-[#526271]">Oct 2021 – Sept 2023 · TU Eindhoven + TU Berlin</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a href="https://www.tue.nl/en/" target="_blank" rel="noreferrer">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/TU_eLogo.png`}
                      alt="TU Eindhoven"
                      width={60}
                      height={28}
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </a>
                  <a href="https://www.tu.berlin/en/" target="_blank" rel="noreferrer">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/TU_berlinLogo.png`}
                      alt="TU Berlin"
                      width={60}
                      height={34}
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </a>
                  <a href="https://masterschool.eitdigital.eu/" target="_blank" rel="noreferrer">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/EIT-Digital.webp`}
                      alt="EIT Digital"
                      width={60}
                      height={38}
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </a>
                </div>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-[#3d4d5b]">
                <a href="https://www.tue.nl/en/" target="_blank" rel="noreferrer" className="font-medium text-[#2f7c85] hover:underline underline-offset-2">Eindhoven University of Technology</a> (Netherlands)
                {" "}and{" "}
                <a href="https://www.tu.berlin/en/" target="_blank" rel="noreferrer" className="font-medium text-[#2f7c85] hover:underline underline-offset-2">Technische Universität Berlin</a> (Germany).
                Specialisation in Networked Embedded Systems.
              </p>

              <ul className="mt-3 space-y-1 text-[15px] leading-7 text-[#3d4d5b] list-disc pl-5">
                <li>Merit-based <span className="font-medium">full scholarship</span> recipient (EIT Digital), focused on embedded systems with an entrepreneurship and innovation track.</li>
                <li>Thesis (TU/e and Signify): Performance monitoring and examination of Zigbee networks (Grade: <span className="font-medium">8.95/10</span>).</li>
                <li>Placed <span className="font-medium">3rd</span> in the Innovation and Entrepreneurship Challenge at Aalto University Summer School, Helsinki (Aug 2022).</li>
              </ul>

              <details className="mt-4">
                <summary className="cursor-pointer text-[14px] font-medium text-[#2f7c85] hover:text-[#c35b2d] transition-colors select-none">
                  Details
                </summary>
                <div className="mt-3 rounded-lg bg-[#f4f1ec] px-5 py-4 text-[13px] leading-6 text-[#3d4d5b] shadow-sm">
                  <p className="font-medium text-[#13222f] mb-2">Studies</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>EIT Digital is a rigorous programme that spans two countries, with a summer school in a third. Alongside the technical curriculum, we had courses on entrepreneurship, building a start-up, and sustainability. Nearly every course carried a business dimension. Pitching ideas, presenting solutions, and collaborative brainstorming were the norm.</li>
                    <li>On the technical side, I took courses in Compiler Design, Computer Architecture, System Validation, Network Design, Distributed Systems, IoT Fundamentals, Algorithms and Data Structures, among others.</li>
                  </ul>

                  <p className="font-medium text-[#13222f] mt-4 mb-2">Personal experience</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>As an international student from a very different culture and background, assimilating was not straightforward. Both Eindhoven and Berlin are notorious for their housing crises. Finding a place from outside the city is genuinely difficult, riddled with scams, and prohibitively expensive. Add to that a completely different academic system, unfamiliar exam formats, and higher expectations of independent output.</li>
                    <li>It was an unfamiliar arena. I had to learn how to navigate bureaucracy, advocate for myself, and build a support system from scratch, all while keeping up with a demanding academic schedule. It was overwhelming at times, but it forced me to grow in ways I hadn&apos;t anticipated.</li>
                    <li>Just as you begin to settle in and build a social life in one city, the programme expects you to uproot and start over in another. It&apos;s disorienting, but it forces adaptability and really pushes you out of your comfort zone.</li>
                    <li>Despite the struggles, it was deeply enriching. Meeting people from all over the world genuinely broadens how you think. My technical, social, and networking skills grew rapidly and today I see the payoff in how quickly I connect with people and how willingly I take on the unfamiliar.</li>
                  </ul>
                </div>
              </details>
            </motion.article>
            <motion.article
              className="timeline-item"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-ink">BTech Electronics and Telecommunication</h3>
                  <p className="mt-1 text-sm text-[#526271]">Aug 2016 – Sept 2020 · Ramaiah Institute of Technology, Bangalore</p>
                </div>
                <a href="https://www.msrit.edu/" target="_blank" rel="noreferrer" className="shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/RIT_logo.webp`}
                    alt="Ramaiah Institute of Technology"
                    width={120}
                    height={40}
                    className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-[#3d4d5b]">
                Built a strong foundation in electronics, communication systems, and embedded development through project-driven coursework.
              </p>

              <ul className="mt-3 space-y-1 text-[15px] leading-7 text-[#3d4d5b] list-disc pl-5">
                <li>Developed a safety hardware product using Texas Instruments MCUs and sensors; selected among the <span className="font-medium">top 20 of 6,000+ teams</span> nationwide and awarded <span className="font-medium">&#8377;0.5M</span> funding (Texas Instruments, Govt. of India, IIM Bangalore). Published at{" "}
                  <a href="https://ieeexplore.ieee.org/document/9198395" target="_blank" rel="noreferrer" className="text-[#2f7c85] hover:underline underline-offset-2">IEEE CONECCT 2020</a>.
                </li>
                <li>Bachelor&apos;s thesis: Detection and mitigation of DDoS attacks in large-scale networks.</li>
                <li>GPA: <span className="font-medium">8.96/10</span></li>
              </ul>

              <details className="mt-4">
                <summary className="cursor-pointer text-[14px] font-medium text-[#2f7c85] hover:text-[#c35b2d] transition-colors select-none">
                  Details
                </summary>
                <div className="mt-3 rounded-lg bg-[#f4f1ec] px-5 py-4 text-[13px] leading-6 text-[#3d4d5b] shadow-sm">
                  <p className="font-medium text-[#13222f] mb-2">Studies</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>From the beginning I was drawn to electronics, IoT, and embedded systems. The coursework was broad and technically demanding. Digital Signal Processing, Control Systems, Digital Logic Design (logic gates, adders, Verilog), Signals and Systems, Analog Circuit Design, Machine Learning, Antennas, Embedded Systems, Microelectronics, Linear Programming, Data Structures in C, Network Analysis, Computer Communication Networks, and Wireless Networks and Protocols.</li>
                    <li>The studies were manageable and I maintained a respectable GPA of 8.96/10, but most of my real learning happened outside the classroom.</li>
                  </ul>

                  <p className="font-medium text-[#13222f] mt-4 mb-2">Personal</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>I was an active participant in hackathons and ideathons throughout my bachelors. In March 2019, I won the university-wide Ideathon for the most innovative project with AGAAHI: A smart helmet. With the same idea, my team and I entered <span className="font-medium">IICDC 2019</span> (India Innovation Challenge Design Contest) — a nationwide competition organised by Texas Instruments, IIM Bangalore, and the Government of India.</li>
                    <li>The process taught us patent filing, pitching, documentation, and co-founder collaboration and it&apos;s where I first got interested in entrepreneurship. We made it to the final round and received a gold certificate, but were ultimately not selected for incubation as the product depended heavily on stricter government regulation. Something we couldn&apos;t influence or predict the timeline of.</li>
                    <li>This competition directly influenced my decision to apply for EIT Digital, a programme that combined business and entrepreneurship with a strong technical foundation in my field of choice.</li>
                  </ul>

                  <p className="font-medium text-[#13222f] mt-4 mb-2">AGAAHI — A Smart Helmet for Two-Wheeler Safety</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li><span className="italic">AGAAHI</span> is a Hindi word meaning &ldquo;to alert someone of danger.&rdquo; The project was inspired by the same principle.</li>
                    <li>Road safety is a critical concern in India, over 150,000 people die in road accidents each year, with two-wheeler riders being the most vulnerable. A significant number of these fatalities involve drunk driving or not following traffic rules.</li>
                    <li>We built <span className="font-medium">AGAAHI</span>: a complete safety solution for two-wheeler riders. It consisted of a smart helmet and a portable device that integrates seamlessly with the vehicle. The device would prevent the bike from starting if the rider wasn&apos;t wearing the helmet. The helmet could detect if the rider was too drunk or too drowsy to drive safely. In case of an accident, it would automatically activate a safety system, notifying emergency contacts with the rider&apos;s location, and alerting the nearest police station and hospital.</li>
                    <li>The project was well received because it was tested in real conditions, integrated into an actual two-wheeler. We were among the <span className="font-medium">top 20 teams across 6,000+</span> that received &#8377;0.5M in funding to take the prototype further.</li>
                    <li>My team and I brought the project to a logical conclusion by writing a paper, which was accepted at the{" "}
                      <a href="https://ieeexplore.ieee.org/document/9198395" target="_blank" rel="noreferrer" className="text-[#2f7c85] hover:underline underline-offset-2">IEEE CONECCT 2020 conference</a>.
                    </li>
                  </ul>
                </div>
              </details>
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
            <AnimatePresence mode="popLayout">
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="border-b border-[#e8e0d4] pb-5 last:border-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: index > 3 ? (index - 4) * 0.06 : 0 }}
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
                  {project.link && (
                    <a
                      href={project.linkType === "internal" ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${project.link}` : project.link}
                      target={project.linkType === "external" ? "_blank" : undefined}
                      rel={project.linkType === "external" ? "noreferrer" : undefined}
                      className="mt-3 inline-block text-sm text-[#2f7c85] hover:underline underline-offset-2"
                    >
                      {project.linkType === "external" ? "View on GitHub \u2192" : "Read more \u2192"}
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
            </AnimatePresence>
            {totalFilteredCount > 4 && (
              <button
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="mx-auto mt-6 flex items-center gap-1 text-sm text-[#7a8a96]/70 hover:text-[#2f7c85] transition-colors"
                type="button"
              >
                {showAllProjects ? "Show less" : `Show all ${totalFilteredCount} projects`}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${showAllProjects ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </SectionBlock>

          <SectionBlock id="publications" title="Publications">
            <p className="text-[#8a9aa6] text-sm uppercase tracking-wide mb-4">Peer-Reviewed</p>
            <div className="space-y-6">
              <article>
                <a
                  href="https://ieeexplore.ieee.org/abstract/document/10817217"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xl text-ink hover:text-sea transition-colors"
                >
                  Network Performance Monitoring in Large-Scale Zigbee Deployments
                </a>
                <p className="mt-1 text-sm text-[#7a8a96]">IEEE PIMRC 2024 &middot; Valencia, Spain</p>
                <p className="mt-2 text-[15px] text-[#3d4d5b]">Proposed a novel framework for holistically monitoring the performance of large-scale Zigbee networks, combining reliability, robustness, and responsiveness metrics. Joint work with TU Eindhoven and Signify.</p>
              </article>
              <article>
                <a
                  href="https://ieeexplore.ieee.org/document/9198395"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xl text-ink hover:text-sea transition-colors"
                >
                  AGAAHI: A Smart Helmet for Two-Wheeler Safety
                </a>
                <p className="mt-1 text-sm text-[#7a8a96]">IEEE CONECCT 2020 &middot; Bangalore, India</p>
                <p className="mt-2 text-[15px] text-[#3d4d5b]">Presented a complete safety system for two-wheeler riders: alcohol and drowsiness detection, automatic accident notification via GPS/GSM, and helmet-based ignition locking. Top 20 of 6,000+ teams in IICDC 2019.</p>
              </article>
            </div>
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
              <p></p>
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
