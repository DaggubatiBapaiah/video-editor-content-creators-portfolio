import { motion } from 'framer-motion';
import { timelineTracks } from '@/data/content';
import RevealText from './RevealText';

export default function TimelineSection() {
  return (
    <section className="relative bg-primary py-20 md:py-32 px-5 md:px-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <RevealText className="font-display font-bold text-primary text-4xl md:text-6xl lg:text-7xl tracking-tight">
            {'EVERY FRAME'}
            {'HAS A JOB.'}
          </RevealText>
        </div>

        {/* Timeline tracks */}
        <div className="space-y-2 md:space-y-3">
          {timelineTracks.map((track, i) => (
            <motion.div
              key={track.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 md:gap-6"
            >
              {/* Track label */}
              <span className="font-body text-[10px] md:text-[11px] tracking-[0.2em] text-secondary uppercase w-12 md:w-20 shrink-0">
                {track.label}
              </span>

              {/* Track bar */}
              <div className="flex-1 h-6 md:h-8 bg-secondary rounded-sm relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: track.width }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full ${track.color} rounded-sm relative`}
                  style={{ opacity: track.color.includes('accent') ? 0.8 : 0.15 }}
                >
                  {/* Clip segments */}
                  <div className="absolute inset-0 flex gap-px px-px">
                    {[...Array(8)].map((_, j) => (
                      <div key={j} className="flex-1 border-r border-primary/30 last:border-r-0" />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Track time */}
              <span className="font-body text-[10px] text-secondary/50 hidden md:block w-12 text-right">
                0{i + 1}:{(i + 2) * 10}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Playhead */}
        <div className="relative mt-4 md:mt-6">
          <motion.div
            initial={{ left: '0%' }}
            whileInView={{ left: '85%' }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="absolute -top-32 md:-top-40 z-10"
          >
            <div className="flex flex-col items-center">
              <div className="w-px h-28 md:h-36 bg-accent" />
              <div className="w-3 h-3 bg-accent rotate-45 -mt-1.5" />
            </div>
          </motion.div>
        </div>

        {/* Bottom metadata */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <div className="flex items-center gap-3">
            <span className="block w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">Timeline / 01:24:08</span>
          </div>
          <div className="flex gap-6">
            <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">24 FPS</span>
            <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">4K</span>
            <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">ProRes 422</span>
          </div>
        </div>
      </div>
    </section>
  );
}
