import { motion } from 'framer-motion';
import { useState } from 'react';
import { services } from '@/data/content';
import RevealText from './RevealText';

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-primary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <RevealText className="font-display font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {'WHAT I EDIT'}
          </RevealText>
        </div>

        {/* Services list */}
        <div className="border-t border-line">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group border-b border-line py-6 md:py-10 cursor-default"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-display font-bold text-accent text-sm">{service.number}</span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <motion.h3
                    animate={{
                      x: hovered === i ? 8 : 0,
                      color: hovered === i ? '#C8FF3D' : '#F4F4F0',
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight leading-[0.95]"
                  >
                    {service.title}
                  </motion.h3>
                </div>

                {/* Description */}
                <div className="md:col-span-4">
                  <p className="font-body text-sm md:text-base text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="md:col-span-3">
                  <p className="font-body text-[11px] tracking-[0.1em] text-secondary/70 uppercase leading-relaxed">
                    {service.deliverables}
                  </p>
                </div>
              </div>

              {/* Hover line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-accent origin-left mt-4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
