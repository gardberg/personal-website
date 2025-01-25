import type { Metadata } from "next";
import "@/app/globals.css";
import Link from 'next/link';

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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ekmas/cs16.css@main/css/cs16.min.css" />
      </head>
      <body
        className={`antialiased flex flex-col min-h-screen`}
      >
        <header>
          <nav className="max-w-4xl mx-auto px-4 py-4">
            <ul className="flex space-x-6 justify-center">
              <li><Link href="/" className="">home</Link></li>
              <li><Link href="/blog" className="">blog</Link></li>
              <li><Link href="/cv" className="">cv</Link></li>
              <li><Link href="/resources" className="">stuff i like</Link></li>
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
