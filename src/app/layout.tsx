import Script from "next/script";
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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(`https://abhigya98.github.io${basePath}`),
  title: "Abhigya Parashar | Embedded Systems Engineer",
  description:
    "Portfolio of Abhigya Parashar — embedded firmware, Zigbee/BLE wireless systems, and practical engineering at Signify. MSc Embedded Systems (TU Eindhoven + TU Berlin).",
  keywords: [
    "Abhigya Parashar",
    "Embedded Systems",
    "Firmware Engineer",
    "Zigbee",
    "BLE",
    "IoT",
    "Signify",
    "TU Eindhoven",
    "TU Berlin",
    "EIT Digital",
  ],
  authors: [{ name: "Abhigya Parashar" }],
  openGraph: {
    title: "Abhigya Parashar | Embedded Systems Engineer",
    description:
      "Embedded firmware, Zigbee/BLE wireless systems, and practical engineering impact. Work, internships, education, projects, and publications.",
    type: "website",
    url: `https://abhigya98.github.io${basePath}`,
    siteName: "Abhigya Parashar",
    images: [
      {
        url: `/img/Image_me.webp`,
        width: 600,
        height: 600,
        alt: "Abhigya Parashar",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhigya Parashar | Embedded Systems Engineer",
    description:
      "Embedded firmware, Zigbee/BLE wireless systems, and practical engineering impact.",
    images: [`/img/Image_me.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9BV0JFGP8C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted'
            });
            gtag('config', 'G-9BV0JFGP8C');
          `}
        </Script>
      </head>
      <body className={`${space.variable} ${lora.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
