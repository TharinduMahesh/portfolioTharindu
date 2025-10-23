// src/app/page.tsx
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar"; // Keep Navbar here
import AboutSection from "./components/AboutSection";
import Project from "./components/project";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer"; // Keep Footer here
import AchievementSection from "./components/AchievementSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mx-auto px-12 pt-20 md:pt-24 py-4 flex-grow"> {/* pt- matches Navbar height */}
        
        <HeroSection />
        <AchievementSection />
        
        {/* Add ID to AboutSection */}
        <section id="about"> {/* Wrap AboutSection in a section with an ID */}
          <AboutSection />
        </section>

        {/* Add ID to Project Section */}
        <section id="projects"> {/* Wrap Project in a section with an ID */}
          <Project />
        </section>
        
        {/* Add ID to EmailSection */}
        <section id="contact"> {/* Wrap EmailSection in a section with an ID */}
          <EmailSection />
        </section>
        
      </div>
    </main>
  );
}