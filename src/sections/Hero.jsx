import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';
import Target from '../components/Target.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import Button from '../components/Button.jsx';

import { motion } from 'framer-motion';
import { fadeIn } from '../Variants.js';

const Hero = () => {
  // Combine media queries for performance
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-0">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Roni <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Building Ideas into Reality</p>
      </motion.div>

      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 25 : 30]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.2, -Math.PI, 0]} />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
            </group>

            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 10]} intensity={0.6} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space flex  sm:flex-row items-center justify-center gap-4">
        {/* Download CV Button - Black Theme */}
        <a href="https://drive.google.com/file/d/1BMmf6AVexiKXWdAdPJyGqdrF4f_RSiGB/view?usp=sharing" download>
          <div className="flex items-center gap-2 text-white bg-black hover:bg-gray-800 rounded-full px-6 py-2 border border-white/10 shadow-md shadow-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-gray-800">
            <span>Download CV</span>
            <img src="assets/download.png" alt="CV Icon" className="w-6 h-6" />
          </div>
        </a>

        {/* GitHub Link with Clean Icon */}
        <a
          href="https://github.com/ronisarkar-official"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.4-3.88-1.4-.52-1.3-1.27-1.65-1.27-1.65-1.04-.7.08-.69.08-.69 1.16.08 1.77 1.2 1.77 1.2 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.25.72-1.53-2.55-.3-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.2-3.12-.12-.3-.52-1.52.12-3.17 0 0 .98-.32 3.2 1.2a10.95 10.95 0 0 1 5.84 0c2.2-1.53 3.18-1.2 3.18-1.2.64 1.65.24 2.87.12 3.17.76.82 1.2 1.86 1.2 3.12 0 4.43-2.7 5.4-5.27 5.7.42.36.77 1.08.77 2.17v3.21c0 .31.2.67.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
        </a>

        {/* LinkedIn Link with Icon */}
        <a
          href="https://www.linkedin.com/in/ronisarkar/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-blue-300 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 
      0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
      19h-3v-10h3v10zm-1.5-11.3c-.97 
      0-1.75-.78-1.75-1.75s.78-1.75 
      1.75-1.75 1.75.78 
      1.75 1.75-.78 1.75-1.75 
      1.75zm13.5 11.3h-3v-5.6c0-3.4-4-3.1-4 
      0v5.6h-3v-10h3v1.5c1.4-2.6 
      7-2.8 7 2.5v6.0z"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
