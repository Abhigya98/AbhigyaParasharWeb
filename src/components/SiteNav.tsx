"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type SiteNavProps = {
  activeId: string;
};

const items = [
  { id: "work", label: "Work", dropdown: [{ label: "Work experience in detail", href: "/work" }] },
  { id: "internships", label: "Internships" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteNav({ activeId }: SiteNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <a href="#top" className="font-display text-lg font-bold text-ink">
          Abhigya Parashar
        </a>
        <ul className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:overflow-visible md:pb-0">
          {items.map((item) => {
            const active = activeId === item.id;
            const hasDropdown = "dropdown" in item && item.dropdown;
            return (
              <li
                key={item.id}
                ref={hasDropdown ? dropdownRef : undefined}
                className="relative"
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (hasDropdown) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === item.id ? null : item.id);
                    }
                  }}
                  className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-accent text-white"
                      : "text-[#425364] hover:bg-[#efe9dc]"
                  }`}
                >
                  {item.label}
                  {hasDropdown && <span className="ml-1 text-[10px]">▾</span>}
                </a>
                {hasDropdown && openDropdown === item.id && (
                  <div className="absolute left-0 top-full mt-1 min-w-[200px] rounded-lg border border-[#e7e2d9] bg-white py-1 shadow-lg z-50">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-[#425364] hover:bg-[#f6efe4] transition"
                    >
                      {item.label}
                    </a>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-[#2f7c85] hover:bg-[#f6efe4] transition"
                      >
                        {sub.label} →
                      </Link>
                    ))}
                  </div>
                )}
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
