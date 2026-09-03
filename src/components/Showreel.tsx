import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import RevealText from './RevealText';

const metaItems = ['EDITING', 'COLOR', 'MOTION', 'SOUND DESIGN'];

export default function Showreel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.97]);
  const [hovering, setHovering] = useState(false);

  return (
    <section id="showreel" ref={ref} className="relative bg-primary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Title */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <RevealText className="font-display font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {'SHOWREEL'}
          </RevealText>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-bold text-accent text-3xl md:text-5xl lg:text-6xl"
          >
            / 2026
          </motion.span>
        </div>

        {/* Cinema screen */}
        <motion.div
          style={{ scale }}
          className="relative w-full aspect-video rounded-sm overflow-hidden group cursor-none"
          data-cursor="play"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Poster image */}
          <motion.div
            animate={{ scale: hovering ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src="https://images.pexels.com/photos/34410058/pexels-photo-34410058.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Showreel poster"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />

          {/* Letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-[3%] bg-primary" />
          <div className="absolute bottom-0 left-0 right-0 h-[3%] bg-primary" />

          {/* Center play */}
          <motion.div
            animate={{ opacity: hovering ? 0 : 1, scale: hovering ? 0.8 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/30 backdrop-blur-sm flex items-center justify-center">
              <Play size={20} className="text-primary ml-1" fill="currentColor" />
            </div>
          </motion.div>

          {/* Top metadata bar */}
          <div className="absolute top-[5%] left-4 md:left-8 right-4 md:right-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="block w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-[10px] tracking-[0.2em] text-primary/70 uppercase">Now Playing</span>
            </div>
            <span className="font-display text-xs text-primary/70 tracking-widest">01:24</span>
          </div>

          {/* Bottom metadata */}
          <div className="absolute bottom-[5%] left-4 md:left-8 right-4 md:right-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {metaItems.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="font-body text-[10px] md:text-[11px] tracking-[0.2em] text-primary/60 uppercase"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-3 flex items-center gap-2"
            >
              <span className="font-display font-bold text-primary text-lg md:text-2xl">PLAY REEL</span>
              <span className="text-accent text-lg md:text-2xl">→</span>
            </motion.div>
          </div>

          {/* Corner marks */}
          {[
            'top-4 left-4 border-t border-l',
            'top-4 right-4 border-t border-r',
            'bottom-4 left-4 border-b border-l',
            'bottom-4 right-4 border-b border-r',
          ].map((cls) => (
            <div key={cls} className={`absolute w-4 h-4 border-primary/20 ${cls}`} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
