import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  cursor?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  cursor = 'open',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  return (
    <motion.button
      ref={ref}
      data-cursor={cursor}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.button>
  );
}
