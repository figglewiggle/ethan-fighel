import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${montserrat.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
