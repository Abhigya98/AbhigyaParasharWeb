import { motion } from "framer-motion";

type SectionBlockProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function SectionBlock({ id, title, children }: SectionBlockProps) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="mb-6 border-b border-[#e4ddd3] pb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9aa6]">
        {title}
      </h2>
      <div className="space-y-5 text-[17px] leading-8 text-[#314250]">{children}</div>
    </motion.section>
  );
}
