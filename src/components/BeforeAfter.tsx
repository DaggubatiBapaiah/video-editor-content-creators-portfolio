import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';

const stages = ['RAW', 'COLOR', 'SOUND', 'FINAL'];

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    updatePos(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePos(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="relative bg-primary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <RevealText className="font-display font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {'FROM RAW'}
            {'TO READY'}
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-body text-secondary text-lg"
          >
            Drag to see the transformation.
          </motion.p>
        </div>

        {/* Comparison */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative w-full aspect-video rounded-sm overflow-hidden cursor-ew-resize select-none touch-none"
        >
          {/* RAW (right side) */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3379944/pexels-photo-3379944.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Raw footage"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(0.7) brightness(0.5) contrast(0.8) saturate(0.3)' }}
            />
          </div>

          {/* FINAL (left side, clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src="https://images.pexels.com/photos/3379944/pexels-photo-3379944.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Final cut"
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.15) saturate(1.2) brightness(0.95)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/10" />
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="font-body text-[10px] tracking-[0.2em] text-accent uppercase">Final Cut</span>
          </div>
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <span className="font-body text-[10px] tracking-[0.2em] text-primary/60 uppercase">Raw Footage</span>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-px bg-accent pointer-events-none"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <div className="flex gap-0.5">
                <span className="text-primary text-xs">◀</span>
                <span className="text-primary text-xs">▶</span>
              </div>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
        </div>

        {/* Stage labels */}
        <div className="mt-6 flex items-center justify-center gap-6 md:gap-12">
          {stages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 md:gap-6"
            >
              <span className={`font-body text-[11px] tracking-[0.2em] uppercase ${i === 0 ? 'text-accent' : 'text-secondary'}`}>
                {stage}
              </span>
              {i < stages.length - 1 && <span className="text-secondary/30">/</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
