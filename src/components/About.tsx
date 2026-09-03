import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { experience, tools } from '@/data/content';
import RevealText from './RevealText';
import FadeIn from './FadeIn';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="about" ref={ref} className="relative bg-primary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Headline */}
        <div className="mb-12 md:mb-20 max-w-5xl">
          <RevealText className="font-display font-bold text-primary text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.0]">
            {'I LIKE GOOD STORIES.'}
            {'I LIKE GOOD CUTS.'}
            {'THE TWO USUALLY GO TOGETHER.'}
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <img
                  src="https://images.pexels.com/photos/38255687/pexels-photo-38255687.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Arjun Mehta portrait"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="block w-2 h-2 rounded-full bg-accent" />
                <span className="font-body text-[10px] tracking-[0.2em] text-primary/70 uppercase">Mumbai / 2026</span>
              </div>
            </div>
          </div>

          {/* Bio + experience + tools */}
          <div className="lg:col-span-7 flex flex-col gap-10 md:gap-14">
            {/* Bio */}
            <FadeIn>
              <div className="space-y-4 max-w-xl">
                <p className="font-body text-lg text-primary leading-relaxed">
                  Arjun is a Mumbai-based video editor and content creator with 6+ years of experience working across
                  brand films, YouTube, social content and commercial projects.
                </p>
                <p className="font-body text-base text-secondary leading-relaxed">
                  He works from raw footage to final delivery, including editing, pacing, sound design, color direction
                  and motion graphics. Every project is treated as a story first — the tools are just how it gets told.
                </p>
              </div>
            </FadeIn>

            {/* Experience timeline */}
            <FadeIn delay={0.1}>
              <div>
                <span className="font-body text-[11px] tracking-[0.2em] text-secondary uppercase mb-4 block">Experience</span>
                <div className="space-y-px">
                  {experience.map((exp, i) => (
                    <motion.div
                      key={exp.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="grid grid-cols-12 gap-4 py-4 border-t border-line group"
                    >
                      <span className="col-span-2 font-display font-bold text-accent text-sm">{exp.year}</span>
                      <div className="col-span-10">
                        <div className="flex items-baseline gap-3">
                          <h4 className="font-display font-bold text-primary text-base md:text-lg">{exp.role}</h4>
                          <span className="font-body text-[11px] text-secondary">/ {exp.company}</span>
                        </div>
                        <p className="font-body text-[13px] text-secondary mt-1 leading-relaxed">{exp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Tools */}
            <FadeIn delay={0.15}>
              <div>
                <span className="font-body text-[11px] tracking-[0.2em] text-secondary uppercase mb-4 block">Tools</span>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="font-display font-bold text-primary/80 hover:text-accent text-lg md:text-xl tracking-tight transition-colors duration-300 cursor-default"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
