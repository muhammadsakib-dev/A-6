import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";

import WorkoutProvider from "@/context/WorkoutProvider";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ToastProvider from "./components/ToastProvider";

import "./globals.css";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FITLOG",
    template: "%s | FitLog",
  },
  description: "Plan, track, and manage your workouts with FitLog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-(--color-background) text-(--color-text-primary)">
        <WorkoutProvider>
          <Navbar />
          <ToastProvider />

          <main className="flex-1">{children}</main>

          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
