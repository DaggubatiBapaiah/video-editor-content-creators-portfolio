import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: string;
}

export default function Marquee({ children, className = '', speed = '40s' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex animate-marquee" style={{ animationDuration: speed }}>
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
