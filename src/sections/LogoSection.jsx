import React, { useRef, useEffect, useState } from 'react';
import { logoIconsList } from '../constants/index.js'; // your icons array

export default function LogoSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(0); // seconds
  const speed = 80; // px per second (tweak to taste; lower = slower)

  // Duplicate list once for seamless loop
  const repeated = [...logoIconsList, ...logoIconsList];

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    let ro;
    const compute = () => {
      const trackW = trackRef.current.getBoundingClientRect().width / 2; // original content width
      // guard
      if (!trackW || trackW <= 0) return;
      const computedDuration = Math.max(6, Math.round(trackW / speed)); // minimum duration 6s
      setDuration(computedDuration);
      // set CSS variable for use in CSS animation
      trackRef.current.style.setProperty('--marquee-duration', `${computedDuration}s`);
    };

    compute();

    // Recompute on resize using ResizeObserver
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => compute());
      ro.observe(trackRef.current);
      ro.observe(containerRef.current);
    } else {
      window.addEventListener('resize', compute);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', compute);
    };
  }, [speed]);



  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />
      <div
        className="marquee h-62"
        ref={containerRef}
       
        aria-label="Trusted logos carousel">
        <div
          ref={trackRef}
          className="marquee-box md:gap-12 gap-5"
          // allow CSS to read this if needed; we already set --marquee-duration in JS
          style={{ willChange: 'transform', '--marquee-duration': `${duration}s` }}>
          {repeated.map((icon, index) => (
            <div
              key={`${icon.name}-${index}`}
              className="flex-none flex-center marquee-item"
              role="img"
              aria-label={icon.name}>
              <img
                src={icon.imgPath}
                alt={icon.name}
                loading="lazy"
                width={120}
                height={80}
                className="max-h-18 object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
