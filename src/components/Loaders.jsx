import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';


const LETTERS = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

export default function Loader({ duration = 5, onFinish = () => {}, message = 'Preparing the experience…' }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const sliceRef = useRef(null);
  const shineRef = useRef(null);
  const progressRef = useRef(null);
  const barShineRef = useRef(null);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const finishedRef = useRef(false);
  const percentRef = useRef(0);

  // state only used for visible badge (coalesced updates)
  const [percent, setPercent] = useState(0);

  // memoized styles so we don't create new objects every render
  const styles = useMemo(
    () => ({
      rootInline: {
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      },
      vignette: {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02), rgba(0,0,0,0.86))',
        pointerEvents: 'none',
      },
      filledLayer: {
        fontSize: 'clamp(34px, 7.2vw, 80px)',
        fontWeight: 900,
        letterSpacing: '0.02em',
        color: 'white',
        display: 'flex',
        position: 'relative',
      },
      shine: {
        position: 'absolute',
        left: '-22%',
        top: '-10%',
        width: '40%',
        height: '120%',
        background:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0) 100%)',
        transform: 'skewX(-18deg)',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        filter: 'blur(6px)',
      },
      slice: {
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
      },
      progressBarWrapper: {
        height: 10,
        borderRadius: 9999,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.06)',
        position: 'relative',
      },
      progressFill: {
        height: '100%',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg,#ffffff,#cfcfcf)',
      },
      barShine: {
        position: 'absolute',
        top: '-25%',
        left: '-10%',
        width: '10%',
        height: '150%',
        background:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)',
        transform: 'skewX(-12deg)',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        filter: 'blur(6px)',
      },
      badge: {
        minWidth: 54,
        textAlign: 'center',
        padding: '8px 10px',
        borderRadius: 10,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        fontSize: 34,
        fontWeight: 800,
        boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
      },
    }),
    [],
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      const lettersEls = textRef.current ? Array.from(textRef.current.querySelectorAll('.letter')) : [];
      const slice = sliceRef.current;
      const shine = shineRef.current;
      const progressEl = progressRef.current;
      const barShine = barShineRef.current;

      if (!root || !progressEl) return;

      // keep references to created tweens so we can kill them explicitly
      let intro = null;
      let sliceTween = null;
      let shineTween = null;
      let barShineTween = null;
      let progressTween = null;

      // Intro timeline (only if motion allowed)
      if (!prefersReduced && lettersEls.length) {
        intro = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
        intro
          .fromTo(
            lettersEls,
            { y: 22, opacity: 0, skewX: 10 },
            { y: 0, opacity: 1, skewX: 0, stagger: 0.035, duration: 0.46, ease: 'power3.out' },
          )
          .to(lettersEls, { skewX: -6, opacity: 0.78, duration: 0.14, stagger: 0.02, ease: 'power1.inOut' })
          .to(lettersEls, { skewX: 0, opacity: 1, duration: 0.1, ease: 'power1.out' });

        if (slice) {
          gsap.set(slice, { xPercent: -120 });
          sliceTween = gsap.to(slice, {
            xPercent: 120,
            duration: 1.45,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 0.6,
            delay: 0.18,
          });
        }

        if (shine) {
          gsap.set(shine, { xPercent: -140 });
          shineTween = gsap.to(shine, {
            xPercent: 160,
            duration: 1.1,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 0.7,
            delay: 0.24,
          });
        }

        if (barShine) {
          gsap.set(barShine, { xPercent: -160 });
          barShineTween = gsap.to(barShine, {
            xPercent: 260,
            duration: 1.2,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 0.6,
            delay: 0.2,
          });
        }
      } else if (lettersEls.length) {
        // static fallback
        gsap.set(lettersEls, { y: 0, opacity: 1, skewX: 0 });
      }

      // drive progress fill via GSAP (so visual and JS progress are in sync)
      progressEl.style.willChange = 'transform';
      root.style.willChange = 'opacity, transform';

      const safeDuration = Math.max(0.01, duration);
      progressTween = gsap.fromTo(
        progressEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: safeDuration,
          ease: 'linear',
          onComplete: () => {
            // brief pause so UI shows 100%
            gsap.delayedCall(0.06, finishSequence);
          },
        },
      );

      // RAF-driven integer percentage updates (coalesced)
      startRef.current = performance.now();

      const tick = (now) => {
        const elapsed = (now - (startRef.current || now)) / 1000;
        const progress = Math.min(1, Math.max(0, elapsed / safeDuration));
        const next = Math.round(progress * 100);

        if (percentRef.current !== next) {
          percentRef.current = next;
          // update visible badge (React will batch if needed)
          setPercent(next);
        }

        if (elapsed < safeDuration && !finishedRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // ensure final state
          percentRef.current = 100;
          setPercent(100);
        }
      };

      rafRef.current = requestAnimationFrame(tick);

      function finishSequence() {
        if (finishedRef.current) return;
        finishedRef.current = true;

        // gracefully stop looping intro
        if (intro && typeof intro.kill === 'function') intro.kill();

        const exit = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
        exit
          .to(root, { scale: 1.02, filter: 'blur(2px)', duration: 0.28 })
          .to(root, { opacity: 0, y: -18, duration: 0.42 }, '>-0.05')
          .call(() => {
            try {
              onFinish && onFinish();
            } catch (e) {
              // eslint-disable-next-line no-console
              console.warn('Loader onFinish threw:', e);
            }
          });
      }

      // cleanup for this context
      return () => {
        try {
          if (progressTween && typeof progressTween.kill === 'function') progressTween.kill();
          if (sliceTween && typeof sliceTween.kill === 'function') sliceTween.kill();
          if (shineTween && typeof shineTween.kill === 'function') shineTween.kill();
          if (barShineTween && typeof barShineTween.kill === 'function') barShineTween.kill();
          if (intro && typeof intro.kill === 'function') intro.kill();
        } catch (e) {
          // ignore cleanup errors
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, rootRef);

    // revert GSAP context on unmount or deps change
    return () => ctx.revert();
  }, [duration, onFinish]);

  // ensure RAF cleared on unmount (defensive)
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white px-4"
      style={styles.rootInline}>
      <div aria-hidden style={styles.vignette} />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-5 py-12">
        <div ref={textRef} className="relative flex items-center justify-center select-none w-full" aria-hidden>
          <div
            className="flex justify-center"
            style={{
              fontSize: 'clamp(34px, 7.2vw, 80px)',
              fontWeight: 900,
              letterSpacing: '0.02em',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              color: 'transparent',
            }}>
            {LETTERS.map((c, i) => (
              <span key={i} className="letter inline-block mx-0.5" style={{ display: 'inline-block' }}>
                {c}
              </span>
            ))}
          </div>

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
            <div style={styles.filledLayer}>
              {LETTERS.map((c, i) => (
                <span key={i} className="letter inline-block mx-0.5" style={{ display: 'inline-block' }}>
                  {c}
                </span>
              ))}

              <div ref={shineRef} aria-hidden style={styles.shine} />
            </div>

            <div ref={sliceRef} aria-hidden style={styles.slice} />
          </div>
        </div>

        <div className="text-sm opacity-60 uppercase tracking-widest text-center" style={{ letterSpacing: '0.22em' }}>
          {message}
        </div>

        <div className="w-full flex justify-center mt-2">
          <div className="w-full max-w-2xl px-4" style={{ boxSizing: 'border-box' }}>
            <div style={styles.progressBarWrapper}>
              <div ref={progressRef} style={styles.progressFill} />
              <div ref={barShineRef} aria-hidden style={styles.barShine} />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          zIndex: 60,
        }}>
        <div
          role="status"
          aria-label={`Loading ${percent} percent`}
          aria-live="polite"
          aria-atomic="true"
          style={styles.badge}>
          {percent}%
        </div>
      </div>

      <style>{`\n        @media (prefers-reduced-motion: reduce) {\n          .letter { transition: none !important; }\n        }\n      `}</style>
    </div>
  );
}
