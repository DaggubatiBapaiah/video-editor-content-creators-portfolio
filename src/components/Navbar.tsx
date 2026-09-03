import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work', target: 'work' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderColor = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)']);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        ref={ref}
        style={{ backgroundColor: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0)', borderColor }}
        className="fixed top-0 left-0 right-0 z-[9000] backdrop-blur-md border-b transition-colors duration-300"
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-display font-bold text-sm tracking-tight text-primary">
            ARJUN MEHTA
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-body text-[13px] text-secondary hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo('contact')}
              data-cursor="open"
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-line hover:border-accent/50 transition-colors duration-300"
            >
              <span className="font-body text-[13px] text-primary group-hover:text-accent transition-colors duration-300">
                LET'S WORK
              </span>
              <span className="text-accent text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          <button
            className="md:hidden text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 z-[8999] bg-primary/95 backdrop-blur-lg border-b border-line md:hidden"
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-display text-2xl font-bold text-left text-primary hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-4 flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-primary font-body text-sm font-medium"
            >
              LET'S WORK →
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
