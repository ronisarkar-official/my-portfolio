// App.jsx
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
import { SpeedInsights } from '@vercel/speed-insights/react';
import Loader from './components/Loaders.jsx'; // your GSAP loader component

function waitForAssets() {
  return new Promise((resolve) => {
    const checkImages = () =>
      new Promise((resolveImages) => {
        const imgs = Array.from(document.images || []);
        if (!imgs.length) return resolveImages();
        let done = 0;
        const mark = () => {
          done += 1;
          if (done >= imgs.length) resolveImages();
        };
        imgs.forEach((img) => {
          if (img.complete) mark();
          else {
            img.addEventListener('load', mark, { once: true });
            img.addEventListener('error', mark, { once: true });
          }
        });
      });

    const onReady = () => {
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      Promise.all([fontsReady, checkImages()]).then(() => resolve());
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady, { once: true });
      // also resolve if DOM already interactive (so fonts/images start loading)
      if (document.readyState === 'interactive') {
        // we still wait for load, but this keeps things resilient
      }
    }
  });
}

function removeInitialLoaderInstantly() {
  const el = document.getElementById('initial-loader');
  if (!el) return;
  // add removing class to animate fade-out, then remove when transition ends
  el.classList.add('removing');
  const onEnd = () => {
    el.remove();
    el.removeEventListener('transitionend', onEnd);
  };
  // If transitionend doesn't fire (rare), remove after 400ms
  el.addEventListener('transitionend', onEnd);
  setTimeout(() => {
    if (document.getElementById('initial-loader')) {
      document.getElementById('initial-loader').remove();
    }
  }, 450);
}

function App() {
  const [showApp, setShowApp] = useState(false); // toggles when loader fully finished
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // As soon as React mounts we remove the static initial loader (so React loader can take over)
    removeInitialLoaderInstantly();

    // Wait for real assets (fonts + images + load)
    let mounted = true;
    waitForAssets().then(() => {
      if (!mounted) return;
      setAssetsLoaded(true); // tells Loader to begin exit timeline
    });
    return () => {
      mounted = false;
    };
  }, []);

  // while showApp is false we show Loader; Loader will call onFinish to set showApp true
  return !showApp ? (
    <Loader assetsLoaded={assetsLoaded} onFinish={() => setShowApp(true)} />
  ) : (
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
      <div class="commonninja_component pid-fe6c3fa4-737e-4bd8-81cc-6032ebdebd7d"></div>
    </main>
  );
}

export default App;
