import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const helveticaNow = localFont({
  src: [
    {
      path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-helveticaNow",
});
