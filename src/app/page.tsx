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
    summary: "Firmware update path design for large Zigbee + BLE deployments, reducing update windows dramatically.",
    stack: ["C", "BLE", "Zigbee", "RTOS"],
  },
  {
    title: "Network Performance Monitoring Framework",
    type: "Research",
    summary: "Metrics-based framework to evaluate reliability and responsiveness in large-scale wireless sensor networks.",
    stack: ["Python", "Validation", "WSN", "Analytics"],
  },
  {
    title: "BDD Validation Pipeline",
    type: "Automation",
    summary: "Automated test pipeline to detect regressions in firmware integrations and release candidates.",
    stack: ["Python", "BDD", "C#", "CI"],
  },
  {
    title: "Smart Hospital Embedded Prototype",
    type: "Embedded",
    summary: "Embedded C and image-processing driven prototype work for assistive and hospital smart-system workflows.",
    stack: ["Embedded C", "Image Processing", "Prototyping"],
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

      <div className="mx-auto flex max-w-7xl flex-col px-4 pt-10 md:px-10 md:pt-16">
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
                src="/img/Me.jpeg"
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
                <h2 className="font-display text-5xl leading-tight text-ink lg:text-6xl">
                  Building embedded systems <span className="text-sea">that work in the field.</span>
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-[#3d4d5b]">
                  I develop firmware for wireless sensor systems at commercial scale. My focus is practical reliability—making
                  architecture decisions that hold up outside the lab.
                </p>
                <p className="mt-5 text-base leading-relaxed text-[#6a7d8a] italic border-t border-[#e4ddd3] pt-5">
                  Outside the firmware: 99 books read, 67 waiting. Currently{" "}
                  <a href="https://www.goodreads.com/user/show/22750463-abhigya-parashar" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-sea transition-colors">Sapiens and The Undutchables</a>
                  {" "}— the latter because my partner is Dutch, I live in Eindhoven, and A1 classes are humbling.
                  The Psychology of Money changed how I think about decisions; Siddhartha changed something harder to name.
                  When I&apos;m not reading, I&apos;m half-assembling an ESP32 audio visualiser or turning old containers into flower vases.
                  I find it difficult to throw things away without first asking what they could become.
                </p>
              </div>

              {/* Skills & Metrics in clean horizontal flow */}
              <div className="mt-10 space-y-8">
                <div>
                  <p className="mb-3 font-display text-sm uppercase tracking-[0.2em] text-[#7a8a96]">Core expertise</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">
                      Firmware Architecture
                    </span>
                    <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">
                      Zigbee + BLE
                    </span>
                    <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">
                      RTOS
                    </span>
                    <span className="rounded-full border border-[#d9cfbf] bg-[#faf7f1] px-4 py-2 text-sm text-[#495a68]">
                      Field Reliability
                    </span>
                  </div>
                </div>

                {/* Stats with subtle accent lines */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-baseline gap-4 border-l-2 border-sea pl-5">
                    <p className="font-display text-3xl font-bold text-ink">~25 min</p>
                    <p className="text-sm text-[#5a6c7a]">200-device OTA updates (vs. 2.5–4 hours)</p>
                  </div>
                  <div className="flex items-baseline gap-4 border-l-2 border-accent pl-5">
                    <p className="font-display text-3xl font-bold text-ink">2 Countries</p>
                    <p className="text-sm text-[#5a6c7a]">MSc track: TU Eindhoven + TU Berlin</p>
                  </div>
                  <div className="flex items-baseline gap-4 border-l-2 border-[#a8d5c9] pl-5">
                    <p className="font-display text-3xl font-bold text-ink">Top 20</p>
                    <p className="text-sm text-[#5a6c7a]">Selected from 6,000+ in innovation challenge</p>
                  </div>
                </div>
              </div>
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
              <p className="flex items-center gap-2 font-display text-xl text-ink">
                <BriefcaseBusiness size={20} /> Embedded Software Engineer, Signify
              </p>
              <p className="mt-1 text-sm text-[#526271]">Feb 2023 - Present | Eindhoven, Netherlands</p>
              <p className="mt-4">
                I develop firmware in C for EFR32 sensor nodes running Zigbee mesh and BLE on Micrium OS III. I own
                feature delivery end to end: design and implementation.
              </p>
              <p className="mt-3">
                I also lead validation and field issue closure to ensure releases perform reliably outside the lab.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Built BLE-based OTA flow reducing 200-device update time from 2.5-4 hours to about 25 minutes.</li>
                <li>Contributed to platform unification across product lines with modular architecture and migration support.</li>
                <li>Automated test workflows with Python and BDD-style validation.</li>
              </ul>
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
              <h3 className="font-display text-xl text-ink">Research Intern, ZEN Lab (IISc)</h3>
              <p className="text-sm text-[#526271]">Indian Institute of Science, Bangalore</p>
              <p className="mt-3">
                Worked on low-power wireless sensor networking and TSCH implementation over IEEE 802.15.4 MAC.
              </p>
              <p className="mt-3">
                Developed communication logic to improve robust trans-reception among constrained network nodes.
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
              <h3 className="font-display text-xl text-ink">Embedded Software Engineering Intern, SHG</h3>
              <p className="text-sm text-[#526271]">Smart Health Global, Bangalore</p>
              <p className="mt-3">
                Built healthcare-focused embedded solutions with embedded C and image processing,
                including assistive systems for visually impaired users.
              </p>
              <p className="mt-3">
                Also contributed to smart hospital workflow prototypes where reliability and practicality were key.
              </p>
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
              <p className="mt-1 text-sm text-[#526271]">Oct 2021 - Sept 2023 | TU Eindhoven + TU Berlin</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Merit-based full scholarship recipient.</li>
                <li>Thesis with TU/e and Signify on Zigbee network performance (Grade: 8.95/10).</li>
                <li>3rd place, Innovation and Entrepreneurship challenge at Aalto Summer School (Aug 2022).</li>
              </ul>
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
              <p className="mt-1 text-sm text-[#526271]">Aug 2016 - Sept 2020 | Ramaiah Institute of Technology</p>
              <p className="mt-3">
                Built a project-driven foundation across electronics and communications. Selected in the top 20 of
                6000+ teams in a national hardware innovation challenge.
              </p>
              <p className="mt-3">
                Awarded INR 0.5M product-development funding.
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
              Open to technical collaboration and embedded systems discussions—especially where reliability and scale matter.
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
            <div className="border-b border-[#e4ddd3] pb-3 mb-6">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9aa6]">At a glance</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="font-display text-lg font-semibold text-ink">IEEE Published</p>
                <p className="mt-1 text-sm text-[#546472]">PIMRC 2024 research publication on large-scale Zigbee monitoring.</p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-ink">Industry Scale</p>
                <p className="mt-1 text-sm text-[#546472]">Firmware decisions validated against deployment constraints, not only lab conditions.</p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-ink">Cross-Functional</p>
                <p className="mt-1 text-sm text-[#546472]">Experience across embedded architecture, validation pipelines, and field issue analysis.</p>
              </div>
            </div>
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
