import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Platform',   href: '#home'       },
  { label: 'Features',   href: '#features'   },
  { label: 'Prediction', href: '#prediction' },
  { label: 'Analytics',  href: '#analytics'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1));
    const io  = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,249,246,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4375e5, #6b96f5)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L13 5V11L8 14L3 11V5L8 2Z" fill="white" fillOpacity="0.9" />
                <path d="M8 5L10.6 6.5V9.5L8 11L5.4 9.5V6.5L8 5Z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-sm tracking-tight" style={{ color: '#111110', letterSpacing: '-0.02em' }}>
              InsureAI
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="px-3.5 py-2 text-sm rounded-lg transition-all duration-150 block"
                    style={{
                      color:      isActive ? '#111110' : '#6b6762',
                      background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                      fontWeight: isActive ? 500 : 400,
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#111110'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#111110' : '#6b6762'; e.currentTarget.style.background = isActive ? 'rgba(0,0,0,0.05)' : 'transparent'; }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#a8a49e' }}>
              <span className="live-dot" />
              <span>API Live</span>
            </div>
            <a href="#prediction" className="btn-sky" style={{ padding: '0.5rem 1.125rem', fontSize: '0.8125rem' }}>
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setOpen(o => !o)}
            style={{ color: '#6b6762' }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
            style={{ background: 'rgba(250,249,246,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm rounded-xl transition-colors"
                    style={{ color: '#44403c' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-2 mt-1" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <a href="#prediction" onClick={() => setOpen(false)} className="btn-sky w-full justify-center">
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
