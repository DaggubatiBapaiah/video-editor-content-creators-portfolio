import { motion } from 'framer-motion';
import { useState } from 'react';
import { testimonials } from '@/data/content';
import RevealText from './RevealText';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-secondary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <RevealText className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight">
            {'WHAT PEOPLE SAY'}
          </RevealText>
        </div>

        {/* Testimonial display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main quote */}
          <div className="lg:col-span-9">
            <div className="relative min-h-[200px] md:min-h-[280px]">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={i}
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    y: active === i ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <p className="font-display font-bold text-primary text-2xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 md:mt-8 flex items-center gap-3">
                    <span className="block w-8 h-px bg-accent" />
                    <div>
                      <p className="font-body text-sm text-primary font-medium">{t.name}</p>
                      <p className="font-body text-[11px] tracking-wider text-secondary uppercase">{t.role}</p>
                    </div>
                  </div>
                </motion.blockquote>
              ))}
            </div>
          </div>

          {/* Selector */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 lg:gap-4">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className={`h-px transition-all duration-300 ${
                      active === i ? 'w-12 bg-accent' : 'w-6 bg-secondary-foreground/20'
                    }`}
                  />
                  <span
                    className={`font-body text-[11px] tracking-wider uppercase transition-colors duration-300 ${
                      active === i ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {t.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
