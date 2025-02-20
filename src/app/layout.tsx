import { Geist, Geist_Mono, Ballet, Fondamento } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ballet = Ballet({
  variable: "--font-ballet",
  display: "swap",
  subsets: ["latin"],
});

const fondamento = Fondamento({
  variable: "--font-fondamento",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ballet.variable} ${fondamento.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
