import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Challapalli Sai Sudhanv | Software Engineer Portfolio",
  description: "Personal engineering portfolio of Challapalli Sai Sudhanv - Full Stack, AI, and Backend Developer. Designing clean architectures and scalable software systems.",
  keywords: [
    "Challapalli Sai Sudhanv",
    "Sai Sudhanv",
    "Software Engineer",
    "Full Stack Developer",
    "AI Developer",
    "Backend Developer",
    "Next.js 15 Portfolio",
    "n8n Workflow Automation",
    "Gemini AI Solutions"
  ],
  authors: [{ name: "Challapalli Sai Sudhanv" }],
  openGraph: {
    title: "Challapalli Sai Sudhanv | Software Engineer Portfolio",
    description: "Personal engineering portfolio of Challapalli Sai Sudhanv - Full Stack, AI, and Backend Developer. Designing clean architectures and scalable software systems.",
    url: "https://saisudhanv.dev",
    siteName: "Sai Sudhanv Portfolio",
    images: [
      {
        url: "https://saisudhanv.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Challapalli Sai Sudhanv Portfolio Thumbnail"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Challapalli Sai Sudhanv | Software Engineer Portfolio",
    description: "Full Stack, AI, and Backend Developer portfolio.",
    images: ["https://saisudhanv.dev/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030014] text-slate-100">
        {children}
      </body>
    </html>
  );
}
