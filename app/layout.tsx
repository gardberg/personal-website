import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Link from 'next/link';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "gardberg",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
      >
        <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
          <nav className="max-w-4xl mx-auto px-4">
            <ul className="flex space-x-6 justify-center">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">home</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">blog</Link></li>
              <li><Link href="/cv" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">cv</Link></li>
              <li><Link href="/resources" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">stuff i like</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
