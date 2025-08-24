import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Improved Loader.jsx
// - uses gsap.context for safe scoping & cleanup
// - honors prefers-reduced-motion
// - smoother easings and overlapping stagger
// - robust single-onFinish call
// - accessible (role, aria-live)
// - small perf tweaks (will-change, minimal re-renders)

const Loader = ({ duration = 5, onFinish = () => {}, message = 'Preparing the experience…' }) => {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const sliceRef = useRef(null);
  const progressRef = useRef(null);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const finishedRef = useRef(false);

  const [count, setCount] = useState(() => Math.max(0, Math.ceil(duration)));

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      const letters = Array.from(textRef.current.querySelectorAll('.letter'));
      const slice = sliceRef.current;
      const progressEl = progressRef.current;

      // small guard
      if (!root || !letters.length || !progressEl) return;

      // Intro timeline (looping) - subtle and overlapping for smoother motion
      const intro = gsap.timeline({ repeat: prefersReduced ? 0 : -1, repeatDelay: prefersReduced ? 0 : 0.6 });

      if (!prefersReduced) {
        intro
          .fromTo(
            letters,
            { y: 36, opacity: 0, skewX: 18 },
            { y: 0, opacity: 1, skewX: 0, stagger: 0.05, duration: 0.56, ease: 'power3.out' },
          )
          .to(letters, { skewX: -14, opacity: 0.4, duration: 0.18, stagger: 0.03, ease: 'power1.inOut' })
          .to(letters, { skewX: 0, opacity: 1, duration: 0.12, ease: 'power1.out' });

        // slice scan
        gsap.set(slice, { xPercent: -110 });
        gsap.to(slice, {
          xPercent: 110,
          duration: 1.6,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 0.8,
          delay: 0.2,
        });
      } else {
        // reduced motion fallback - ensure text is visible
        gsap.set(letters, { y: 0, opacity: 1, skewX: 0 });
      }

      // Progress tween (linear) - drives the finishing sequence
      const progressTween = gsap.fromTo(
        progressEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: Math.max(0.01, duration),
          ease: 'linear',
          onComplete: () => {
            // ensure exit runs once
            finishSequence();
          },
        },
      );

      // ensure hardware-accelerated hints
      progressEl.style.willChange = 'transform';
      root.style.willChange = 'opacity, transform, filter';

      // RAF-driven countdown for stable numbers (only updates the seconds integer)
      startRef.current = performance.now();
      const tick = (now) => {
        const elapsed = (now - startRef.current) / 1000;
        const remaining = Math.max(0, duration - elapsed);
        const next = Math.ceil(remaining);
        setCount((prev) => (prev === next ? prev : next));
        if (elapsed < duration) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setCount(0);
          // safety: if progressTween hasn't triggered finish for some reason
          // (for example browser throttling), call finishSequence after tiny delay
          setTimeout(() => finishSequence(), 30);
        }
      };

      rafRef.current = requestAnimationFrame(tick);

      // finishSequence ensures the exit animation + onFinish only run once
      const finishSequence = () => {
        if (finishedRef.current) return;
        finishedRef.current = true;

        // kill looping intro so exit is clean
        intro.kill();

        // exit animation
        const exit = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
        exit
          .to(root, { scale: 1.02, filter: 'blur(2px)', duration: 0.38 })
          .to(root, { opacity: 0, y: -26, duration: 0.5 }, '>-0.06')
          .call(() => {
            try {
              onFinish && onFinish();
            } catch (e) {
              // swallow user callback errors
              console.warn('Loader onFinish threw:', e);
            }
          });
      };

      // expose finishSequence to outer scope so RAF can call it
      // (nothing to do, function exists in closure)

      // cleanup returned by context
      return () => {
        progressTween.kill();
        gsap.killTweensOf(slice);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, rootRef);

    // cleanup on unmount
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  // In case parent changes onFinish reference often, we guard to call it only once
  useEffect(() => {
    return () => {
      // ensure raf is cleared when component unmounts
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto' }}>
      {/* subtle vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02), rgba(0,0,0,0.78))',
          pointerEvents: 'none',
        }}
      />

      {/* left countdown */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 md:left-12 text-center">
        <div
          className="select-none"
          style={{ fontSize: 'clamp(40px, 10vw, 128px)', lineHeight: 0.88, fontWeight: 800, letterSpacing: '-0.02em' }}>
          {count}
        </div>
        <div className="mt-2 text-xs opacity-60 uppercase tracking-wider">seconds</div>
      </div>

      {/* main center content */}
      <div className="flex flex-col items-center justify-center gap-5 px-6">
        <div ref={textRef} className="relative flex items-center justify-center select-none" aria-hidden>
          {/* outline/ghost text */}
          <div
            style={{
              fontSize: 'clamp(36px, 8.5vw, 112px)',
              fontWeight: 900,
              letterSpacing: '0.02em',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              color: 'transparent',
              display: 'flex',
            }}>
            {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((c, i) => (
              <span key={i} className="letter inline-block" style={{ display: 'inline-block' }}>
                {c}
              </span>
            ))}
          </div>

          {/* filled text layer + moving slice */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}>
            <div
              style={{
                fontSize: 'clamp(36px, 8.5vw, 112px)',
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: 'white',
                display: 'flex',
              }}>
              {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((c, i) => (
                <span key={i} className="letter inline-block" style={{ display: 'inline-block' }}>
                  {c}
                </span>
              ))}
            </div>

            <div
              ref={sliceRef}
              style={{
                position: 'absolute',
                left: '-10%',
                top: '20%',
                width: '32%',
                height: '60%',
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)',
                transform: 'skewX(-8deg)',
                mixBlendMode: 'overlay',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        <div className="text-sm opacity-60 uppercase tracking-widest" style={{ letterSpacing: '0.22em' }}>
          {message}
        </div>
      </div>

      {/* progress bar */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 h-2 rounded overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          ref={progressRef}
          className="h-full"
          style={{
            background: 'linear-gradient(90deg,#fff,#bfbfbf)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* small bottom-right hint */}
      <div style={{ position: 'absolute', right: 18, bottom: 14, opacity: 0.6, fontSize: 12 }}>
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: 99,
            background: '#fff',
            marginRight: 8,
          }}
        />
        <span>Syncing assets</span>
      </div>
    </div>
  );
};

export default Loader;
