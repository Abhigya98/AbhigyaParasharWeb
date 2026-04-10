import type { Metadata } from "next";
import { Lora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhigya Parashar | Embedded Systems Engineer",
  description:
    "Interactive portfolio of Abhigya Parashar, focused on embedded firmware, wireless systems, and practical engineering impact.",
  openGraph: {
    title: "Abhigya Parashar | Embedded Systems Engineer",
    description:
      "Embedded systems portfolio with work, internships, education, and publications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space.variable} ${lora.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
