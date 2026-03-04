import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Sportstech sTread Pro - Premium Treadmill",
  description: "Discover the sTread Pro. German engineering, 21.5 inch screen, and LED lighting.",
};

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-none"><Navbar /></div>
      <div className="flex-1 relative min-h-0"><Hero /></div>
    </main>
  );
}
