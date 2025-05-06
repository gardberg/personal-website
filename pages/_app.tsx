import { Geist, Geist_Mono, Ballet, Fondamento, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import type { AppProps } from 'next/app';

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

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${ballet.variable} ${fondamento.variable} ${notoSerifJP.variable} antialiased`}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp; 