import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import RevealText from './RevealText';

const metaItems = ['EDITING', 'COLOR', 'MOTION', 'SOUND DESIGN'];

const reelPosters = [
  {
    title: 'NOVA / MADE TO MOVE',
    category: 'BRAND FILM',
    image: 'https://images.pexels.com/photos/9692675/pexels-photo-9692675.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'THE CREATOR’S EDGE',
    category: 'LONG-FORM',
    image: 'https://images.pexels.com/photos/8102680/pexels-photo-8102680.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: '30 DAYS / 30 REELS',
    category: 'SHORT-FORM',
    image: 'https://images.pexels.com/photos/8357670/pexels-photo-8357670.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'LUMA / LIGHT IN MOTION',
    category: 'PRODUCT FILM',
    image: 'https://images.pexels.com/photos/36779955/pexels-photo-36779955.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'THE DAILY CUT',
    category: 'CREATOR CONTENT',
    image: 'https://images.pexels.com/photos/8371391/pexels-photo-8371391.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'MONSOON / SLOW POUR',
    category: 'CAMPAIGN',
    image: 'https://images.pexels.com/photos/14679166/pexels-photo-14679166.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'AETHER / AFTER DARK',
    category: 'MOTION STUDY',
    image: 'https://images.pexels.com/photos/19311587/pexels-photo-19311587.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

const videoSource = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const nameLetters = ['A', 'R', 'J', 'U', 'N'];

let audioCtx: AudioContext | null = null;

function playBeep(frequency = 880, duration = 0.08, type: OscillatorType = 'sine') {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // audio not available
  }
}

function ReelCard({ reel, index }: { reel: typeof reelPosters[number]; index: number }) {
  const letter = nameLetters[index % nameLetters.length];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      playBeep(440, 0.06, 'square');
      return;
    }
    playBeep(880, 0.08, 'sine');
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return (
    <article
      className="relative w-[72vw] sm:w-[48vw] md:w-[31vw] lg:w-[24vw] xl:w-[21vw] shrink-0 aspect-[16/10] overflow-hidden border border-white/10 bg-secondary group"
      data-cursor="play"
    >
      <img
        src={reel.image}
        alt={`${reel.title} poster`}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${playing ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-105'}`}
      />
      <video
        ref={videoRef}
        src={videoSource}
        poster={reel.image}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-0'}`}
        aria-label={`${reel.title} video preview`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-primary/20 pointer-events-none" />

      {/* Large letter watermark */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-display font-bold text-primary/15 text-[10rem] md:text-[14rem] leading-none tracking-tighter select-none">
          {letter}
        </span>
      </div>

      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between pointer-events-none">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-[10px] tracking-tight text-primary uppercase">ARJUN</span>
          <span className="font-body text-[9px] tracking-[0.18em] text-primary/80 uppercase">REEL 0{index + 1}</span>
        </div>
        <div>
          <p className="font-body text-[9px] tracking-[0.18em] text-primary/60 uppercase mb-1">{reel.category}</p>
          <h3 className="font-display font-bold text-primary text-lg md:text-xl tracking-tight leading-none">{reel.title}</h3>
          <span className="font-body text-[9px] tracking-[0.18em] text-accent uppercase mt-2 block">Click to play</span>
        </div>
      </div>

      <button
        type="button"
        onClick={togglePlayback}
        className="absolute inset-0 flex items-center justify-center focus:outline-none"
        aria-label={playing ? `Pause ${reel.title}` : `Play ${reel.title}`}
      >
        <span className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:bg-accent/15 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <Play size={16} className="text-accent ml-0.5" fill="currentColor" />
        </span>
      </button>

      {playing && (
        <button
          type="button"
          onClick={() => {
            setMuted((value) => !value);
            playBeep(660, 0.05, 'triangle');
          }}
          className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full border border-primary/30 bg-primary/30 backdrop-blur-sm flex items-center justify-center text-primary hover:text-accent transition-colors"
          aria-label={muted ? 'Unmute reel' : 'Mute reel'}
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>
      )}
    </article>
  );
}

export default function Showreel() {
  const reels = [...reelPosters, ...reelPosters];

  return (
    <section id="showreel" className="relative bg-primary py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <RevealText className="font-display font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {'SHOWREEL'}
          </RevealText>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-bold text-accent text-3xl md:text-5xl lg:text-6xl"
          >
            / 2026
          </motion.span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
        <motion.div
          initial={{ x: '100vw' }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-3 md:gap-5 w-max animate-reel-strip hover:[animation-play-state:paused]"
        >
          {reels.map((reel, index) => (
            <ReelCard key={`${reel.title}-${index}`} reel={reel} index={index % reelPosters.length} />
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto px-5 md:px-10 mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase">7 reels / 2026</span>
        </div>
        <div className="flex items-center gap-4">
          {metaItems.map((item) => (
            <span key={item} className="font-body text-[10px] tracking-[0.2em] text-secondary/70 uppercase">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
