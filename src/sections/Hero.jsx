// components/Hero.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../Variants.js';

/* Static SVGs memoized so they aren't recreated every render */
const GitHubIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.4-3.88-1.4-.52-1.3-1.27-1.65-1.27-1.65-1.04-.7.08-.69.08-.69 1.16.08 1.77 1.2 1.77 1.2 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.25.72-1.53-2.55-.3-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.2-3.12-.12-.3-.52-1.52.12-3.17 0 0 .98-.32 3.2 1.2a10.95 10.95 0 0 1 5.84 0c2.2-1.53 3.18-1.2 3.18-1.2.64 1.65.24 2.87.12 3.17.76.82 1.2 1.86 1.2 3.12 0 4.43-2.7 5.4-5.27 5.7.42.36.77 1.08.77 2.17v3.21c0 .31.2.67.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
));

const LinkedInIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden>
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.3h-3v-5.6c0-3.4-4-3.1-4 0v5.6h-3v-10h3v1.5c1.4-2.6 7-2.8 7 2.5v6.0z" />
  </svg>
));

const TwitterIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden>
    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.932 4.932 0 002.163-2.723 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.822 4.822 0 001.523 6.574 4.9 4.9 0 01-2.229-.616v.06a4.926 4.926 0 003.946 4.827 4.902 4.902 0 01-2.224.085 4.93 4.93 0 004.604 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646a9.935 9.935 0 002.411-2.533z" />
  </svg>
));

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      aria-label="Hero section — Roni Sarkar">
      {/* Decorative gradient blobs (pure CSS, lightweight) */}

      <motion.div
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.6 }}
        className="z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-0 text-center">
        <div className=" backdrop-blur-md  p-8 sm:p-12 ">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="inline-block mr-3 font-generalsans text-white/90">Hi, I’m</span>
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600"
              aria-label="Roni Sarkar">
              Roni Sarkar
            </span>

            <span
              className="ml-2 inline-block origin-bottom-right"
              aria-hidden
              title="waving hand"
              style={{ display: 'inline-block' }}>
              <span className="waving-hand inline-block">👋</span>
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-100/85 max-w-2xl mx-auto">
            Full-Stack Developer — I build fast, accessible and maintainable web apps. React · Next.js · Node · Tailwind
            CSS
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg font-medium text-sm sm:text-base bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg transform-gpu hover:scale-[1.03] transition will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              aria-label="View projects">
              View Work
            </a>

            <a
              href="https://drive.google.com/file/d/1LUALqh7wvyjfcw2xyT4ofS5aQALpxD6l/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/10 text-white text-sm hover:scale-[1.02] transition transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Download CV (opens in a new tab)">
              <img src="/assets/download.png" alt="" className="w-5 h-5" aria-hidden />
              <span>Download CV</span>
            </a>
          </div>

          {/* Social + small CTA panel */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <nav
              className="inline-flex items-center gap-2 bg-white/4 backdrop-blur-[6px] px-3  rounded-full border border-white/10 shadow-sm"
              aria-label="Social links">
              <a
                href="https://github.com/ronisarkar-official"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label="Open GitHub profile (opens in new tab)">
                <GitHubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/ronisarkar/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label="Open LinkedIn profile (opens in new tab)">
                <LinkedInIcon />
              </a>
              <a
                href="https://x.com/ronisarkarDev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label="Open Twitter profile (opens in new tab)">
                <TwitterIcon />
              </a>
            </nav>
          </div>
        </div>
      </motion.div>

      {/* small accessibility + perf helper styles, reduced motion respect */}
      <style>{`
        .waving-hand {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 1.6s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          45% { transform: rotate(14deg); }
          60% { transform: rotate(-4deg); }
          100% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .waving-hand, .pointer-events-none, .transform-gpu {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default memo(Hero);
