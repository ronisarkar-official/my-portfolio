import React, { useState, memo } from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = memo(({ onClick = () => {} }) => (
  <ul className="flex flex-col sm:flex-row gap-4 sm:items-center">
    {navLinks.map((item) => (
      <li key={item.id} className="relative group">
        <a
          href={item.href}
          onClick={onClick}
          className="inline-block px-3 py-2 text-sm font-medium text-white/95 transition-transform transform-gpu will-change-transform group-hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30 rounded-md">
          <span className="relative z-10">{item.name}</span>
          <span className="absolute left-0 -bottom-1 h-0.5 w-full scale-x-0 transform origin-left bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
        </a>
      </li>
    ))}
  </ul>
));

const MenuIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d={open ? 'M6 18L18 6M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300"
    />
  </svg>
);

const NavbarGlass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScroll = React.useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const ticking = React.useRef(false);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  React.useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (current <= 0) {
            setVisible(true);
          } else {
            const delta = current - lastScroll.current;
            if (delta > 12) setVisible(false);
            else if (delta < -12) setVisible(true);
          }
          lastScroll.current = current;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!visible) setIsOpen(false);
  }, [visible]);

  return (
    <header
      className="fixed inset-x-0 top-1 z-50 pointer-events-auto"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(calc(-100% - 1rem))',
        transition: 'transform 280ms ease',
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <div className="w-full flex items-center justify-between gap-4 p-2 rounded-3xl backdrop-blur-sm bg-black/30 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30">
              <span className="text-white/95 text-xl font-semibold">Roni Sarkar</span>
            </a>

            <nav className="hidden sm:flex items-center gap-6">
              <NavItems />
            </nav>

            <div className="sm:hidden flex items-center">
              <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={toggle}
                className="p-2 rounded-lg bg-black/50 border border-white/6 hover:scale-105 transition-transform duration-200 text-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30">
                <MenuIcon open={isOpen} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`mt-3 sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="rounded-2xl p-4 backdrop-blur-sm bg-black/60 border border-white/6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <NavItems onClick={close} />
            
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 h-28 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>
    </header>
  );
};

export default memo(NavbarGlass);
