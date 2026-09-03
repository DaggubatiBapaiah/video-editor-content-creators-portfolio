import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'play' | 'view' | 'open';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorAttr) {
        setState(cursorAttr.dataset.cursor as CursorState);
      } else {
        setState('default');
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const label = state === 'play' ? 'PLAY' : state === 'view' ? 'VIEW' : state === 'open' ? 'OPEN' : '';
  const ringSize = state === 'default' ? 32 : state === 'play' ? 90 : state === 'view' ? 80 : 70;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ marginLeft: '-3px', marginTop: '-3px', opacity: visible ? 1 : 0 }}
      >
        <div
          className="rounded-full bg-accent transition-all duration-200"
          style={{
            width: state === 'default' ? 6 : 0,
            height: state === 'default' ? 6 : 0,
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease',
        }}
      >
        <div
          className={`rounded-full border flex items-center justify-center transition-all duration-200 ${
            state === 'default' ? 'border-[#969696]/40' : 'border-accent bg-accent/10'
          }`}
          style={{ width: ringSize, height: ringSize }}
        >
          {label && (
            <span className="font-display text-[9px] font-bold tracking-widest text-accent">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
