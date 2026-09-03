import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CreativeStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <section ref={ref} className="relative bg-primary h-screen min-h-[600px] flex items-center justify-center overflow-hidden px-5 md:px-10">
      {/* Background texture */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/19311587/pexels-photo-19311587.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-primary text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-[-0.04em]"
        >
          GOOD EDITING
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-accent text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-[-0.04em]"
        >
          IS INVISIBLE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 md:mt-12 font-body text-lg md:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          You don't notice the cut.
          <br />
          You feel the story.
        </motion.p>
      </motion.div>
    </section>
  );
}
