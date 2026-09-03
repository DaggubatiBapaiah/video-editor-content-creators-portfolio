import { motion } from 'framer-motion';
import { clients } from '@/data/content';
import RevealText from './RevealText';
import Marquee from './Marquee';

export default function Clients() {
  return (
    <section className="relative bg-primary py-20 md:py-28 px-5 md:px-10 border-t border-line">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <RevealText className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight">
            {'SELECTED COLLABORATIONS'}
          </RevealText>
        </div>

        {/* Client names grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-line">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-primary aspect-[3/2] flex items-center justify-center group hover:bg-secondary transition-colors duration-300"
            >
              <span className="font-display font-bold text-secondary group-hover:text-primary text-lg md:text-2xl tracking-tight transition-colors duration-300">
                {client}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-12 md:mt-16 border-y border-line py-4 md:py-6">
          <Marquee speed="30s">
            {clients.map((c) => (
              <span key={c} className="font-display font-bold text-secondary/30 text-2xl md:text-4xl mx-8 md:mx-12 tracking-tight">
                {c}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
