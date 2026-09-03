import { motion } from 'framer-motion';
import { useState } from 'react';
import { processSteps } from '@/data/content';
import RevealText from './RevealText';

const stepDescriptions: Record<string, string> = {
  '01': 'Everything starts here. Hours of raw footage, multiple angles, audio tracks and B-roll.',
  '02': 'Selecting the moments that matter. Every frame is a choice.',
  '03': 'Building the narrative spine. The story takes shape.',
  '04': 'Rhythm and pacing. Where the cut breathes.',
  '05': 'Sound design, music and SFX. Half the story is heard, not seen.',
  '06': 'Color direction. Mood, tone and visual identity.',
  '07': 'Delivery. The finished piece, ready for the world.',
};

export default function EditingProcess() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative bg-secondary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-20 max-w-4xl">
          <RevealText className="font-display font-bold text-primary text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
            {'THE CUT IS WHERE'}
            {'THE STORY HAPPENS.'}
          </RevealText>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-px bg-line">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => setHovered(step.number)}
              onMouseLeave={() => setHovered(null)}
              className="relative bg-secondary p-4 md:p-6 min-h-[160px] md:min-h-[200px] flex flex-col justify-between group cursor-default"
            >
              <span className="font-display font-bold text-accent text-sm">{step.number}</span>

              <div>
                <motion.h3
                  animate={{
                    color: hovered === step.number ? '#F4F4F0' : '#969696',
                    scale: hovered === step.number ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display font-bold text-lg md:text-xl tracking-tight"
                >
                  {step.label}
                </motion.h3>

                {/* Hover reveal */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hovered === step.number ? 1 : 0,
                    height: hovered === step.number ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-[11px] text-secondary mt-3 leading-relaxed">
                    {stepDescriptions[step.number]}
                  </p>
                </motion.div>
              </div>

              {/* Arrow connector */}
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <span className="text-secondary/40 text-xs">↓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile flow arrows */}
        <div className="md:hidden flex justify-center mt-4">
          <span className="font-body text-[10px] tracking-widest text-secondary uppercase">Scroll through the process →</span>
        </div>
      </div>
    </section>
  );
}
