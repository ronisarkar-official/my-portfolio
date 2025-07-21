import LogoSection from './sections/LogoSection.jsx';
import About from './sections/About.jsx';
import Clients from './sections/Clients.jsx';
import Contact from './sections/Contact.jsx';
import Exprience from './sections/Exprience.jsx';
import Footer from './sections/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Navbar from './sections/Navbar.jsx';
import Projects from './sections/Projects.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
  return (
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
    </main>
  );
};

export default App;
