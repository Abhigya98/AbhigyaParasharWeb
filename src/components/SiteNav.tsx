import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type SiteNavProps = {
  activeId: string;
};

const items = [
  { id: "work", label: "Work" },
  { id: "internships", label: "Internships" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export function SiteNav({ activeId }: SiteNavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <a href="#top" className="font-display text-lg font-bold text-ink">
          Abhigya Parashar
        </a>
        <ul className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:overflow-visible md:pb-0">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-accent text-white"
                      : "text-[#425364] hover:bg-[#efe9dc]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <Link
              href="/for-fun"
              className="block whitespace-nowrap rounded-full border border-[#d9cfbf] px-4 py-2 text-sm text-[#425364] transition hover:bg-[#efe9dc]"
            >
              For Fun ↗
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
