import { useState, useEffect } from 'react';
import LogoSection from './sections/LogoSection.jsx';
import About from './sections/About.jsx';
import Clients from './sections/Clients.jsx';
import Contact from './sections/Contact.jsx';
import Exprience from './sections/Exprience.jsx';
import Footer from './sections/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Navbar from './sections/Navbar.jsx';
import Projects from './sections/Projects.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react'; // your GSAP loader component
import CommonNinjaWidget from './sections/CommonNinjaWidget.jsx';

const App = () => {
  return (
    <div className="min-h-screen w-full relative bg-black">
    {/* X Organizations Black Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
       background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
      }}
    />
  <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <About />
      <LogoSection />
      <Projects />
      <Exprience />
      <Clients />
      <Contact />
      <Footer />
      <SpeedInsights />
      <CommonNinjaWidget />
    </main>
    {/* Your Content/Components */}
  </div>
    
  );
};

export default App;
