import type { Metadata } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "For Fun | Abhigya Parashar",
  description:
    "Dutch writing practice, book notes, recipes, coffee opinions, and other things that don't belong on a CV.",
  openGraph: {
    title: "For Fun | Abhigya Parashar",
    description:
      "Dutch writing practice, book notes, recipes, and coffee opinions.",
    type: "website",
    url: `https://abhigya98.github.io${basePath}/for-fun`,
    images: [
      {
        url: `/img/Image_me.webp`,
        width: 600,
        height: 600,
        alt: "Abhigya Parashar - For Fun",
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": `${basePath}/feed.xml`,
    },
  },
};

export default function ForFunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
