import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TRUE BLACK — Behind Every Cup',
  description: 'An exploration of the people, processes, and decisions behind every coffee. True Black Café.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/coffee-frames/frame-000001.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/presenters/presenter1.png" type="image/png" />
      </head>
      <body className="min-h-full bg-[#15120F] text-[#F5F0E8] flex flex-col">{children}</body>
    </html>
  );
}
