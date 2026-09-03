import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function RevealText({ children, className = '', delay = 0, stagger = 0.08 }: RevealTextProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const childVariants: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lines = Array.isArray(children) ? children : [children];

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block" variants={childVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
