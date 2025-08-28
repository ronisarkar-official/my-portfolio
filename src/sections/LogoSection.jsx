import React, { useRef, useEffect, useState, useMemo } from 'react';
import { logoIconsList } from '../constants/index.js'; // your icons array

function LogoSectionInner() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastDurationRef = useRef(0);
  const [duration, setDuration] = useState(0); // seconds
  const speed = 80; // px per second (tweak to taste; lower = slower)

  // Duplicate list once for seamless loop — memoized so it isn't recreated each render
  const repeated = useMemo(() => [...logoIconsList, ...logoIconsList], []);

  // memoize the inline style (only changes when duration changes)
  const marqueeStyle = useMemo(
    () => ({ willChange: 'transform', '--marquee-duration': `${duration}s` }),
    [duration]
  );

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    // compute reads measurements (read) then schedules writes via rAF (write) to avoid layout thrash
    const compute = () => {
      // read
      const trackRect = trackRef.current.getBoundingClientRect();
      const trackW = trackRect.width / 2; // original content width
      if (!trackW || trackW <= 0) return;

      const computedDuration = Math.max(6, Math.round(trackW / speed)); // minimum duration 6s

      // write inside rAF
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // Only update DOM/state when value actually changed
        if (trackRef.current) {
          trackRef.current.style.setProperty('--marquee-duration', `${computedDuration}s`);
        }
        if (lastDurationRef.current !== computedDuration) {
          lastDurationRef.current = computedDuration;
          setDuration(computedDuration);
        }
      });
    };

    // initial compute
    compute();

    // Recompute on resize using ResizeObserver if available
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => compute());
      ro.observe(trackRef.current);
      ro.observe(containerRef.current);
    } else {
      // fallback
      window.addEventListener('resize', compute);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', compute);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // speed is stable constant; include only if you plan to change it dynamically
  }, [speed]);

  // memoize rendered nodes so map allocation isn't repeated on every render
  const itemNodes = useMemo(
    () =>
      repeated.map((icon, index) => (
        <div
          key={`${icon.name}-${index}`}
          className="flex-none flex-center marquee-item"
          role="img"
          aria-label={icon.name}
        >
          <img
            src={icon.imgPath}
            alt={icon.name}
            loading="lazy"
            decoding="async"
            width={120}
            height={80}
            className="max-h-18 object-contain"
            draggable={false}
          />
        </div>
      )),
    [repeated]
  );

  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />
      <div
        className="marquee h-62"
        ref={containerRef}
        aria-label="Trusted logos carousel"
      >
        <div
          ref={trackRef}
          className="marquee-box md:gap-12 gap-5"
          // we also set --marquee-duration via JS for initial paint; keep inline style for React consistency
          style={marqueeStyle}
        >
          {itemNodes}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LogoSectionInner);
