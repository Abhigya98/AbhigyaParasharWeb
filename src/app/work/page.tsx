"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function WorkPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          (entry.target as HTMLDetailsElement).open = entry.isIntersecting;
        });
      },
      { threshold: 0.3 }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  const reflectionRef = useCallback((el: HTMLDetailsElement | null) => {
    if (el) observerRef.current?.observe(el);
  }, []);

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-[#fbfaf6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 md:px-10">
          <Link
            href="/"
            className="text-sm text-[#4e5b66] hover:text-[#c35b2d] transition-colors"
          >
            ← Abhigya Parashar
          </Link>
          <span className="font-display text-sm font-semibold text-[#13222f]">Work Experience</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pt-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold text-[#13222f] md:text-5xl">Work Experience</h1>
          <p className="mt-4 text-lg text-[#6a7d8a]">The full story.</p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-rail mt-12">

          {/* Signify */}
          <motion.article
            className="timeline-item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={0}
          >
            {/* Header row: title + logo */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-[#2f7c85]" />
                  <h2 className="font-display text-2xl text-[#13222f]">Embedded Software Engineer</h2>
                </div>
                <p className="mt-1 font-medium text-[#3d4d5b]">Signify (Philips Lighting)</p>
                <p className="mt-0.5 text-sm text-[#7a8a96]">Feb 2023 – Present · Eindhoven, Netherlands</p>
              </div>
              <a href="https://www.signify.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                <Image
                  src={`${basePath}/img/SignifyLogo.webp`}
                  alt="Signify"
                  width={96}
                  height={40}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["C", "Micrium OS III", "EFR32", "BLE", "Zigbee", "RTOS", "Python", "C#", "BDD", "Jenkins", "Silicon Labs Gecko SDK"].map((tech) => (
                <span key={tech} className="rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">{tech}</span>
              ))}
            </div>

            <p className="mt-5 text-[16px] leading-7 text-[#3d4d5b]">
              Developing firmware in C for EFR32-based (Silicon Labs MG12/MG24) sensor nodes used in indoor lighting systems, operating
              in a Zigbee mesh network with BLE connectivity. Work within an RTOS-based codebase (Micrium OS III) supporting
              simultaneous Zigbee and BLE stacks.
            </p>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#8a9aa6]">Key Responsibilities</p>
            <ul className="mt-2 space-y-1 text-[15px] leading-6 text-[#3d4d5b] list-disc list-inside">
              <li>Developing and maturing firmware features from prototype to market release.</li>
              <li>Validation, product testing, and unit testing across the development cycle.</li>
              <li>Resolving system-level and customer-reported issues in field deployments.</li>
              <li>Designing architectural modules supporting scalability and backward compatibility.</li>
              <li>Developing automated test setups and validation workflows using Python and BDD (C#).</li>
            </ul>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#8a9aa6]">Notable Work</p>

            <div className="mt-3 space-y-4">
              <div className="border-l-2 border-[#2f7c85] pl-4">
                <p className="font-medium text-[#13222f]">OTA Optimisation for Large-Scale Deployments</p>
                <ul className="mt-2 space-y-1 text-[15px] leading-6 text-[#3d4d5b] list-disc list-inside">
                  <li>Implemented a BLE-based firmware update path targeting large-scale field deployments.</li>
                  <li>Reduced upgrade time for a 200-device network from 2.5–4 hours (Zigbee OTA) to ~25 minutes.</li>
                  <li>Reduced operational cost and improved commissioning efficiency in field deployments.</li>
                </ul>
                <details ref={reflectionRef} className="mt-3">
                  <summary className="cursor-pointer text-[14px] italic text-[#6a7d8a] hover:text-[#c35b2d] transition-colors select-none">
                    My key reflections on this project
                  </summary>
                  <blockquote className="mt-2 border-l-2 border-[#d9cfbf] pl-4 text-[14px] italic leading-6 text-[#6a7d8a]">
                    &ldquo;My first project as a full-time engineer in Signify and I faced a steep learning curve. 
                    A shift from university projects, I learnt the importance of 
                    code-readability, documentation, and stakeholder management.
                    On the technical side, I got a deep understanding of BLE on end devices — handling edge cases, adding robustness,
                    and deliberately breaking the system to find out where it fails in the field.
                    The project spanned about a year. I had complete ownership of it, and still do — when something comes up
                    in the field, I&apos;m the first person asked.&rdquo;
                  </blockquote>
                </details>
              </div>
              <div className="border-l-2 border-[#2f7c85] pl-4">
                <p className="font-medium text-[#13222f]">Platform Unification Across Product Lines</p>
                <ul className="mt-2 space-y-1 text-[15px] leading-6 text-[#3d4d5b] list-disc list-inside">
                  <li>Worked on integrating multiple firmware platforms into a single scalable architecture.</li>
                  <li>Designed modular components supporting backward compatibility and firmware/data migration.</li>
                </ul>
                <details ref={reflectionRef} className="mt-3">
                  <summary className="cursor-pointer text-[14px] italic text-[#6a7d8a] hover:text-[#c35b2d] transition-colors select-none">
                    My key reflections on this project
                  </summary>
                  <blockquote className="mt-2 border-l-2 border-[#d9cfbf] pl-4 text-[14px] italic leading-6 text-[#6a7d8a]">
                    &ldquo;A big step-up from my first project. Maintaining separate platforms across product lines
                    carries enormous development, cloud, and maintenance cost — unifying them is the obvious win,
                    but for devices already in the field, ensuring a smooth transition without breaking backward
                    compatibility is where the real complexity lives. I learnt that dependencies don&apos;t end
                    at the device — they ripple through the entire ecosystem these devices operate in.
                    My role expanded into product design, interoperability edge cases, validation strategy,
                    and cross-team alignment to prevent unexpected field failures.
                    This project is en-route production in 2026.&rdquo;
                  </blockquote>
                </details>
              </div>
              <div className="border-l-2 border-[#2f7c85] pl-4">
                <p className="font-medium text-[#13222f]">Post-OTA Migration Handling in the Field</p>
                <ul className="mt-2 space-y-1 text-[15px] leading-6 text-[#3d4d5b] list-disc list-inside">
                  <li>Developed firmware logic to handle migration scenarios triggered after OTA upgrades in live deployments.</li>
                  <li>Ensured safe state transitions and data integrity across firmware version boundaries on constrained devices.</li>
                  <li>Addressed edge cases arising from mixed-version networks during staged rollouts.</li>
                </ul>
                <details ref={reflectionRef} className="mt-3">
                  <summary className="cursor-pointer text-[14px] italic text-[#6a7d8a] hover:text-[#c35b2d] transition-colors select-none">
                    My key reflections on this project
                  </summary>
                  <blockquote className="mt-2 border-l-2 border-[#d9cfbf] pl-4 text-[14px] italic leading-6 text-[#6a7d8a]">
                    &ldquo;A critical piece of the platform unification. After a major OTA upgrade,
                    persistent data on the external flash is often incompatible with the new firmware.
                    The default behaviour — erase everything and redeploy — means enormous commissioning
                    costs, unexplained field failures, and device crashes nobody can diagnose remotely.
                    My job was to make sure that when thousands of devices in the field upgraded,
                    their existing configuration and operational data survived the transition intact.
                    That meant designing a migration strategy around persistent memory layouts, safe
                    storage and retrieval sequences, mutex-protected access to avoid race conditions
                    under RTOS task scheduling, and deliberate fallback paths so a failed upgrade
                    never bricks a device — it stays recoverable over the air.
                    It required a deep understanding of the external drive architecture, interrupt
                    behaviour, task priorities, and every edge case where a half-written migration
                    could leave the system in an inconsistent state. Designing the test scenarios
                    was just as involved — you have to simulate partial upgrades, power loss mid-write,
                    and mixed-version networks. This was one of the most technically demanding tasks
                    I&apos;ve taken on, and it reinforced that in embedded systems at scale,
                    the upgrade path is as important as the feature itself.&rdquo;
                  </blockquote>
                </details>
              </div>
            </div>
          </motion.article>

          {/* KPIT */}
          <motion.article
            className="timeline-item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={1}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-[#2f7c85]" />
                  <h2 className="font-display text-2xl text-[#13222f]">Software Engineer</h2>
                </div>
                <p className="mt-1 font-medium text-[#3d4d5b]">KPIT Technologies</p>
                <p className="mt-0.5 text-sm text-[#7a8a96]">Apr 2021 – Sept 2021 · Bangalore, India</p>
              </div>
              <a href="https://www.kpit.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                <Image
                  src={`${basePath}/img/kpitLogo.jpg`}
                  alt="KPIT Technologies"
                  width={96}
                  height={40}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Python", "pytest", "unittest", "Automotive"].map((tech) => (
                <span key={tech} className="rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">{tech}</span>
              ))}
            </div>

            <p className="mt-5 text-[16px] leading-7 text-[#3d4d5b]">
              Developed and automated test environments for a cloud-based application using pytest and unittest.
              Gained exposure to automotive systems, including vehicle electronics and communication protocols.
            </p>

            <details ref={reflectionRef} className="mt-3">
              <summary className="cursor-pointer text-[14px] italic text-[#6a7d8a] hover:text-[#c35b2d] transition-colors select-none">
                My key reflections on this project
              </summary>
              <blockquote className="mt-2 border-l-2 border-[#d9cfbf] pl-4 text-[14px] italic leading-6 text-[#6a7d8a]">
                &ldquo;My first job out of my bachelor&apos;s — and COVID hit at the same time.
                A few months in, KPIT pushed new joiners&apos; start dates indefinitely.
                Most companies were laying off senior people, let alone hiring fresh graduates.
                Instead of onboarding, we were put through an intensive &lsquo;PACE&rsquo; training on automotive technology —
                car systems, engines, CAN protocol — which turned out to be genuinely valuable.
                But I was disheartened. This wasn&apos;t how I&apos;d imagined the start of my career.
                I wasn&apos;t sure I&apos;d have a job anytime soon, so alongside the training I started
                exploring master&apos;s programmes and applied for embedded systems in Europe.
                Eventually both came through at once — my KPIT offer letter and a fully funded
                master&apos;s in Europe. I chose the latter. My time at KPIT was short but it taught me
                corporate culture and gave me a foundation in automotive systems that I still draw on.&rdquo;
              </blockquote>
            </details>
          </motion.article>

          {/* Signify Intern */}
          <motion.article
            className="timeline-item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={2}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-[#2f7c85]" />
                  <h2 className="font-display text-2xl text-[#13222f]">Embedded Software Intern</h2>
                </div>
                <p className="mt-1 font-medium text-[#3d4d5b]">Signify (Philips Lighting)</p>
                <p className="mt-0.5 text-sm text-[#7a8a96]">Feb 2023 – Aug 2023 · Eindhoven, Netherlands</p>
              </div>
              <a href="https://www.signify.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                <Image
                  src={`${basePath}/img/SignifyLogo.webp`}
                  alt="Signify"
                  width={96}
                  height={40}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["C", "Zigbee", "BLE", "RTOS", "Python"].map((tech) => (
                <span key={tech} className="rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">{tech}</span>
              ))}
            </div>

            <p className="mt-5 text-[16px] leading-7 text-[#3d4d5b]">
              During my final year of masters, I completed a 6-month research internship that became
              the foundation for much of my work at Signify. I was handling the research challenge: how do we measure network performance in large-scale Zigbee deployments holistically.
            </p>

            <p className="mt-3 text-[16px] leading-7 text-[#3d4d5b]">
              I built a novel algorithm and a testing framework that tracks reliability, robustness, and
              responsiveness with quantitative metrics. The result: automated &ldquo;health reports&rdquo;
              for deployed networks — ensuring that SDK upgrades and firmware changes don&apos;t quietly
              degrade performance in the field. It&apos;s a tool that&apos;s is used today in the product
              validation pipeline of the team. My thesis was graded <span className="font-medium">8.95/10</span>,
              and Signify offered me a full-time role before I&apos;d finished writing it.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-5 items-start">
              <Image
                src={`${basePath}/img/paper%20presentation.jpeg`}
                alt="Presenting research at PIMRC Conference in Valencia"
                width={220}
                height={165}
                className="rounded-lg object-cover shrink-0"
              />
              <div className="text-[15px] leading-7 text-[#3d4d5b]">
                <p className="font-medium text-[#13222f]">Valencia, 2024</p>
                <p className="mt-1">
                  I presented this research at the{" "}
                  <a href="https://ieeexplore.ieee.org/abstract/document/10817217" target="_blank" rel="noreferrer" className="text-[#2f7c85] hover:underline underline-offset-2">PIMRC International Conference</a>
                  {" "}in Valencia. Unfortunately, I had to use my own funds despite presenting on behalf of Signify due to travel budget restrictions. I chose to do so because I believed in the work and wanted to contribute to the research community.
                  That conference gave me visibility, credibility, and connections that have opened
                  doors.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Smart Health Global */}
          <motion.article
            className="timeline-item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={3}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-[#2f7c85]" />
                  <h2 className="font-display text-2xl text-[#13222f]">Embedded Software Intern</h2>
                </div>
                <p className="mt-1 font-medium text-[#3d4d5b]">Smart Health Global</p>
                <p className="mt-0.5 text-sm text-[#7a8a96]">Jan 2020 – Jul 2020 · Bangalore, India</p>
              </div>
              <a href="https://shgtechnologies.com/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                <Image
                  src={`${basePath}/img/SHGLogo.jpg`}
                  alt="Smart Health Global"
                  width={96}
                  height={40}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["C", "Python", "OpenCV", "Raspberry Pi"].map((tech) => (
                <span key={tech} className="rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">{tech}</span>
              ))}
            </div>

            <p className="mt-5 text-[16px] leading-7 text-[#3d4d5b]">
              Smart Health Global was a pre-seed start-up with just 15 employees when I joined —
              incubated and state-funded, doing genuinely impactful work. Large parts of India still
              lack access to affordable healthcare, and a vision disability can mean a life of extreme
              hardship. SHG was building affordable smart vision glasses to help blind users read
              newspapers, magazines, and road signs independently.
            </p>

            <p className="mt-3 text-[15px] leading-7 text-[#3d4d5b]">
              I worked on two projects, both rooted in image processing on embedded devices:
            </p>
            <ul className="mt-2 space-y-1 text-[15px] leading-6 text-[#3d4d5b] list-disc list-inside">
              <li>
                <span className="font-medium text-[#13222f]">Smart Vision Glasses</span> — optimising
                captured image quality and performing high-accuracy OCR to convert text in images to
                natural-sounding speech for visually impaired users.
              </li>
              <li>
                <span className="font-medium text-[#13222f]">Portable Vein Finder</span> — using image
                filtering on a Raspberry Pi 3 to detect vein patterns on arms and hands from a portable
                device, helping nurses locate veins in elderly patients. The challenge deepened with
                darker skin tones and hair-covered hands, requiring adaptive filtering techniques.
              </li>
            </ul>

            <p className="mt-3 text-[15px] leading-7 text-[#3d4d5b]">
              Both projects gave me hands-on experience in product-facing embedded development — moving
              from prototype to something that could actually reach communities in need.
            </p>
          </motion.article>

          {/* IISc DESE */}
          <motion.article
            className="timeline-item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={4}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-[#2f7c85]" />
                  <h2 className="font-display text-2xl text-[#13222f]">Research Intern</h2>
                </div>
                <p className="mt-1 font-medium text-[#3d4d5b]">Department of Electronic Systems Engineering, IISc</p>
                <p className="mt-0.5 text-sm text-[#7a8a96]">Jun 2019 – Sept 2019 · Bangalore, India</p>
              </div>
              <a href="https://dese.iisc.ac.in/" target="_blank" rel="noreferrer" className="mt-1 shrink-0">
                <Image
                  src={`${basePath}/img/DESELogo.png`}
                  alt="IISc DESE"
                  width={96}
                  height={40}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["C", "802.15.4", "TSCH", "Contiki-NG", "WSN"].map((tech) => (
                <span key={tech} className="rounded-full bg-[#e8f4f5] px-3 py-1 text-xs font-medium text-[#2f7c85]">{tech}</span>
              ))}
            </div>

            <p className="mt-5 text-[16px] leading-7 text-[#3d4d5b]">
              Implemented TSCH (Time Synchronized Channel Hopping) over IEEE 802.15.4 using Nordic
              Semiconductor dev kits. Built a two-way communication channel where the core problem was
              synchronisation under extreme power constraints: both transmitter and receiver sleep most
              of the time, and the receiver must wake up at precisely the right moment to catch the
              transmitter&apos;s beacon. Miss the window, and you lose the packet. Channel hopping adds
              another layer — the frequency changes on every slot, so timing and frequency alignment
              must be locked in together.
            </p>

            <details ref={reflectionRef} className="mt-3">
              <summary className="cursor-pointer text-[14px] italic text-[#6a7d8a] hover:text-[#c35b2d] transition-colors select-none">
                My key reflections on this project
              </summary>
              <blockquote className="mt-2 border-l-2 border-[#d9cfbf] pl-4 text-[14px] italic leading-6 text-[#6a7d8a]">
                &ldquo;This internship is what pointed me toward embedded systems — and specifically
                networked embedded — for my master&apos;s. It was my first real encounter with
                timing constraints in low-power wireless: the kind where a microsecond of drift means
                a missed beacon and a dead link. It drilled into me that in constrained networks,
                correctness isn&apos;t just about logic — it&apos;s about time.&rdquo;
              </blockquote>
            </details>
          </motion.article>

        </div>
      </div>
    </main>
  );
}
