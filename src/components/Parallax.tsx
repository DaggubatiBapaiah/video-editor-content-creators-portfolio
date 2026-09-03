import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export default function Parallax({ children, className = '', speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
