import { Suspense, useState, memo, useMemo, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';

import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

/* Keep SVG outside the component to avoid recreating it every render */
const GitHubIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.92 3.18 9.09 7.59 10.56.56.1.77-.24.77-.54 0-.27-.01-1.17-.01-2.12-3.09.67-3.75-1.49-3.75-1.49-.51-1.29-1.25-1.63-1.25-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.73 2.65 1.23 3.29.94.1-.73.39-1.23.71-1.52-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.12 1.15a10.7 10.7 0 0 1 2.84-.38c.96.01 1.92.13 2.84.38 2.17-1.45 3.12-1.15 3.12-1.15.61 1.54.23 2.68.12 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.23-5.09 5.51.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.21.65.78.54A11.27 11.27 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5z" />
  </svg>
));

const Projects = memo(() => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  /* currentProject only updates when index changes */
  const currentProject = useMemo(() => myProjects[selectedProjectIndex], [selectedProjectIndex]);

  /* stable navigation handler (depends on projectCount) */
  const handleNavigation = useCallback((direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  }, []);

  /* stable callbacks for the arrow buttons to avoid recreating inline handlers */
  const goPrevious = useCallback(() => handleNavigation('previous'), [handleNavigation]);
  const goNext = useCallback(() => handleNavigation('next'), [handleNavigation]);

  /* memoize the spotlight image and logo image so they don't re-create each render */
  const SpotlightImage = useMemo(
    () => (
      <img
        src={currentProject.spotlight}
        alt={`${currentProject.title} Spotlight`}
        className="w-full h-96 object-cover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
        loading="lazy"
      />
    ),
    [currentProject.spotlight, currentProject.title],
  );

  const LogoImage = useMemo(
    () => (
      <img
        src={currentProject.logo}
        alt={`${currentProject.title} Logo`}
        className="w-10 h-10 shadow-sm"
        loading="lazy"
      />
    ),
    [currentProject.logo, currentProject.title],
  );

  /* memoize tags rendering (only changes when currentProject.tags changes) */
  const TagNodes = useMemo(
    () =>
      currentProject.tags.map((tag, index) => (
        <div key={index} className="tech-logo">
          <img src={tag.path} alt={tag.name} className="w-6 h-6" loading="lazy" />
        </div>
      )),
    [currentProject.tags],
  );

  /* memoize the DemoComputer group so the tree only re-creates when texture changes */
  const DemoComputerGroup = useMemo(
    () => (
      <group scale={2} position={[-0.45, -3, 0.2]} rotation={[0, -0.0, 0]}>
        <DemoComputer texture={currentProject.texture} />
      </group>
    ),
    [currentProject.texture],
  );

  /* memoize GitHub link block (keeps markup stable when there is a githubUrl) */
  const GitHubLink = useMemo(() => {
    if (!currentProject.githubUrl) return null;
    return (
      <a
        className="flex items-center gap-2 cursor-pointer text-white-600"
        href={currentProject.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${currentProject.title} on GitHub`}>
        <GitHubIcon />
        <p>View on GitHub</p>
      </a>
    );
  }, [currentProject.githubUrl, currentProject.title]);

  return (
    <section className="c-space my-20" id="work">
      <p className="head-text">Proof of Work</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">{SpotlightImage}</div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            {LogoImage}
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">{TagNodes}</div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p>Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="Visit site" className="w-3 h-3" loading="lazy" />
            </a>

            {GitHubLink}
          </div>

          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={goPrevious} aria-label="Previous project">
              <img src="/assets/left-arrow.png" alt="Previous" className="w-4 h-4" loading="lazy" />
            </button>
            <button className="arrow-btn" onClick={goNext} aria-label="Next project">
              <img src="/assets/right-arrow.png" alt="Next" className="w-4 h-4" loading="lazy" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={7} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <Center>
              <Suspense>{DemoComputerGroup}</Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
});

export default Projects;
