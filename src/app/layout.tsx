// src/app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Corrected import for Geist
import { GeistMono } from "geist/font/mono"; // Corrected import for Geist
import "./globals.css";
import AIChatbot from "./components/AIChatbot";

// Import your components for the global layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Note: I'm updating the Geist import to the standard method (v1.2.0+)

// Update Metadata
export const metadata: Metadata = {
  title: "Tharindu Mahesh - Portfolio", // Updated Title
  description: "I'm a passionate software engineer specializing in full-stack web development.", // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 
        Apply Geist fonts and the general body styling.
        Added overflow-x-hidden for the definitive mobile overflow fix.
      */}
      <body
        className={`${GeistSans.className} ${GeistMono.className} bg-[#121212] text-white overflow-x-hidden`}
      >
        <Navbar />

        {/* 
          This is the critical content wrapper.
          Fix 1: pt-20/md:pt-24 to clear the fixed Navbar height.
          Fix 2: Responsive px-4 for mobile padding.
        */}
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 pt-20 md:pt-24 py-4 min-h-screen flex flex-col">
          <div className="flex-grow">
            {children} {/* Renders your Home, About, Projects, etc. pages */}
          </div>
          <Footer />
        </div>
        <AIChatbot /> 
      </body>
    </html>
  );
}