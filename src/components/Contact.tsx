import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import RevealText from './RevealText';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="contact" ref={ref} className="relative bg-primary py-20 md:py-32 px-5 md:px-10 overflow-hidden">
      {/* Moving background texture */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-125">
        <img
          src="https://images.pexels.com/photos/16967829/pexels-photo-16967829.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary z-0" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Headline */}
        <div className="mb-10 md:mb-16 max-w-5xl">
          <RevealText className="font-display font-bold text-primary text-4xl md:text-6xl lg:text-8xl tracking-tight leading-[0.9]">
            {'HAVE FOOTAGE?'}
            {"LET'S MAKE"}
            {'SOMETHING OUT OF IT.'}
          </RevealText>
        </div>

        {/* CTA + info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* CTA */}
          <div className="md:col-span-6">
            <MagneticButton
              onClick={() => scrollTo('contact')}
              className="group px-8 md:px-12 py-5 md:py-6 rounded-full bg-accent text-primary"
            >
              <span className="flex items-center gap-3 font-display font-bold text-lg md:text-2xl tracking-tight">
                START A PROJECT
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </MagneticButton>
          </div>

          {/* Contact info */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div>
              <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase block mb-2">Email</span>
              <a
                href="mailto:hello@arjunmehta.studio"
                data-cursor="open"
                className="font-body text-sm md:text-base text-primary hover:text-accent transition-colors duration-300"
              >
                hello@arjunmehta.studio
              </a>
            </div>
            <div>
              <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase block mb-2">Location</span>
              <p className="font-body text-sm md:text-base text-primary">Mumbai, India</p>
              <p className="font-body text-[11px] text-secondary mt-1">Available worldwide</p>
            </div>
            <div>
              <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase block mb-2">Response</span>
              <p className="font-body text-sm md:text-base text-primary">Within 48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
