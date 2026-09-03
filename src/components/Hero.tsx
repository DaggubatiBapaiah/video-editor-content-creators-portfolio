import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[680px] w-full overflow-hidden bg-primary">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.pexels.com/photos/3379932/pexels-photo-3379932.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Cinematic film set"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-20 px-5 md:px-10"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute top-24 md:top-28 left-5 md:left-10"
        >
          <div className="flex items-center gap-3">
            <span className="block w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[11px] tracking-[0.2em] text-secondary uppercase">
              Available for select projects
            </span>
          </div>
        </motion.div>

        {/* Main typography */}
        <div className="max-w-[1600px] w-full">
          {/* Title lines */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-primary leading-[0.85] tracking-[-0.04em]
                         text-[16vw] md:text-[12vw] lg:text-[10vw] xl:text-[9.5vw]"
            >
              VIDEO EDITOR
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-baseline gap-4 md:gap-8">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-accent leading-[0.85] tracking-[-0.04em]
                         text-[10vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5vw]"
            >
              +
            </motion.span>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-primary leading-[0.85] tracking-[-0.04em]
                           text-[10vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5vw]"
              >
                CONTENT CREATOR
              </motion.h1>
            </div>
          </div>

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 md:mt-8 font-body text-lg md:text-xl text-secondary max-w-md leading-relaxed"
          >
            I turn raw footage into stories people remember.
          </motion.p>

          {/* Metadata + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['MUMBAI / INDIA', '6+ YEARS', 'AVAILABLE FOR SELECT PROJECTS'].map((item) => (
                <span key={item} className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                onClick={() => scrollTo('showreel')}
                className="group px-6 py-3 rounded-full bg-accent text-primary font-body text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  WATCH SHOWREEL
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollTo('work')}
                cursor="open"
                className="group px-6 py-3 rounded-full border border-line hover:border-primary/30 text-primary font-body text-sm transition-colors duration-300"
              >
                <span className="flex items-center gap-2">
                  VIEW SELECTED WORK
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-5 right-5 md:right-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase rotate-0">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-secondary to-transparent"
        />
      </motion.div>
    </section>
  );
}
