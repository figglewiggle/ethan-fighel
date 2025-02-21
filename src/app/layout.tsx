import type { Metadata } from "next";
import { Righteous, Roboto_Mono } from "next/font/google";
import EmotionRegistry from "@/components/EmotionRegistry";
import "./globals.css";

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethan Fighel",
  description: "Occupational Problem Solver, Rock N' Roll Enthusiast",
  icons: {
    icon: "/ethanlogo.svg",
    shortcut: "/ethanlogo.svg",
    apple: "/ethanlogo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${righteous.variable} ${robotoMono.variable}`}>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
