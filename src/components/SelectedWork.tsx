import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/data/content';
import RevealText from './RevealText';
import FadeIn from './FadeIn';

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <div ref={ref} className="relative">
      {/* Index + category line */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-accent text-sm">{project.index}</span>
          <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.category}</span>
        </div>
        <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.year}</span>
      </div>

      {/* Visual */}
      <div
        data-cursor="view"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        className="relative w-full aspect-video rounded-sm overflow-hidden cursor-none group"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-primary/20"
        />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
          <motion.div
            animate={{ y: hovered ? -8 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display font-bold text-primary text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9]">
              {project.title}
            </h3>
            <p className="font-body text-sm md:text-base text-secondary mt-1 md:mt-2">{project.subtitle}</p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 right-5 md:top-8 md:right-8"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <ArrowUpRight size={20} className="text-primary" />
            </div>
          </motion.div>

          {/* Details */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
            {project.details.map((d) => (
              <span key={d} className="font-body text-[10px] tracking-[0.15em] text-primary/50 uppercase">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function YouTubeProject({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-accent text-sm">{project.index}</span>
          <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.category}</span>
        </div>
        <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.year}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
        {/* Main frame */}
        <div
          data-cursor="view"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
          className="md:col-span-8 relative aspect-video rounded-sm overflow-hidden cursor-none group"
        >
          <motion.div animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.6 }} className="absolute inset-0">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20" />

          {/* Thumbnail overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="px-2 py-1 bg-red-600 rounded text-white font-display text-[10px] font-bold">YOUTUBE</div>
            <span className="font-body text-[10px] text-primary/60 tracking-widest uppercase">11:32</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <motion.h3 animate={{ y: hovered ? -6 : 0 }} transition={{ duration: 0.4 }} className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight">
              {project.title}
            </motion.h3>
            <p className="font-body text-sm text-secondary mt-1">{project.subtitle}</p>
          </div>
        </div>

        {/* Side panels */}
        <div className="md:col-span-4 flex flex-col gap-3 md:gap-4">
          {/* Transformation stat */}
          <div className="bg-secondary rounded-sm p-5 md:p-6 flex flex-col justify-center aspect-video md:aspect-auto md:flex-1">
            <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase mb-2">Edit Transformation</span>
            <div className="font-display font-bold text-primary text-2xl md:text-3xl leading-tight">
              48 MIN
            </div>
            <div className="flex items-center gap-2 my-1">
              <div className="h-px flex-1 bg-secondary-foreground/20" />
              <span className="text-accent text-sm">→</span>
              <div className="h-px flex-1 bg-secondary-foreground/20" />
            </div>
            <div className="font-display font-bold text-accent text-2xl md:text-3xl leading-tight">
              11 MIN
            </div>
            <span className="font-body text-[10px] text-secondary mt-2">Raw footage → Final cut</span>
          </div>

          {/* Timeline fragments */}
          <div className="bg-secondary rounded-sm p-4 md:p-5 aspect-video md:aspect-auto md:flex-1 flex flex-col justify-center">
            <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase mb-3">Timeline</span>
            <div className="space-y-2">
              {[
                { w: '80%', c: 'bg-primary-foreground/60' },
                { w: '60%', c: 'bg-accent' },
                { w: '45%', c: 'bg-primary-foreground/30' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`h-2 ${t.c} rounded-sm`} style={{ width: t.w }} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              {['B-ROLL', 'TALKING', 'CAPTIONS'].map((tag) => (
                <span key={tag} className="font-body text-[8px] tracking-widest text-secondary uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortFormProject({ project, onClick }: { project: Project; onClick: () => void }) {
  const verticals = [
    'https://images.pexels.com/photos/8357670/pexels-photo-8357670.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/9413701/pexels-photo-9413701.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13929970/pexels-photo-13929970.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8371391/pexels-photo-8371391.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-accent text-sm">{project.index}</span>
          <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.category}</span>
        </div>
        <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.year}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center">
        {/* Vertical video wall */}
        <div
          data-cursor="view"
          onClick={onClick}
          className="lg:col-span-7 grid grid-cols-4 gap-2 md:gap-3 cursor-none"
        >
          {verticals.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative aspect-[9/16] rounded-sm overflow-hidden group"
            >
              <img src={src} alt={`Reel ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-colors duration-300" />
              <span className="absolute bottom-1 left-1 font-display text-[8px] text-primary/70">R{i + 1}</span>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
          <h3 className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight leading-[0.95]">
            {project.title}
          </h3>
          <p className="font-body text-sm text-secondary">{project.subtitle}</p>

          <div className="space-y-3 md:space-y-4 mt-2">
            {project.metrics?.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.1}>
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{m.label}</span>
                  <span className="font-display font-bold text-primary text-3xl md:text-5xl">{m.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductProject({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-accent text-sm">{project.index}</span>
          <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.category}</span>
        </div>
        <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.year}</span>
      </div>

      <div
        data-cursor="view"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        className="relative w-full aspect-video rounded-sm overflow-hidden cursor-none group"
      >
        <motion.div animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        </motion.div>

        {/* Experimental gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

        {/* Typography animation overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.5, x: hovered ? 10 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-5 md:left-10 -translate-y-1/2"
        >
          <div className="font-display font-bold text-primary/10 text-[15vw] md:text-[10vw] leading-none tracking-tighter">
            LIGHT
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
          <motion.div animate={{ y: hovered ? -8 : 0 }} transition={{ duration: 0.4 }}>
            <h3 className="font-display font-bold text-primary text-4xl md:text-6xl lg:text-7xl tracking-tight">
              {project.title}
            </h3>
            <p className="font-body text-sm md:text-base text-secondary mt-1 md:mt-2">{project.subtitle}</p>
          </motion.div>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 right-5 md:top-8 md:right-8"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <ArrowUpRight size={20} className="text-primary" />
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
            {project.details.map((d) => (
              <span key={d} className="font-body text-[10px] tracking-[0.15em] text-primary/50 uppercase">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorProject({ project, onClick }: { project: Project; onClick: () => void }) {
  const verticals = [
    'https://images.pexels.com/photos/8357670/pexels-photo-8357670.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8371391/pexels-photo-8371391.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13929970/pexels-photo-13929970.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];
  const tags = ['HOOK', 'CUT', 'CAPTION', 'SOUND', 'RETENTION'];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-accent text-sm">{project.index}</span>
          <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.category}</span>
        </div>
        <span className="font-body text-[11px] tracking-[0.15em] text-secondary uppercase">{project.year}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
        {/* Vertical wall */}
        <div
          data-cursor="view"
          onClick={onClick}
          className="flex gap-2 md:gap-3 justify-center cursor-none"
        >
          {verticals.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative aspect-[9/16] w-1/3 max-w-[200px] rounded-sm overflow-hidden group"
              style={{ marginTop: i === 1 ? '20px' : '0' }}
            >
              <img src={src} alt={`Creator content ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="font-display text-[9px] text-primary/80 tracking-widest">0{i + 1}</span>
                <span className="block w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tags + title */}
        <div className="flex flex-col gap-4 md:gap-6">
          <h3 className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight leading-[0.95]">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="px-3 py-1.5 border border-line rounded-full font-body text-[11px] tracking-[0.1em] text-secondary uppercase hover:border-accent/40 hover:text-primary transition-colors duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <p className="font-body text-sm text-secondary max-w-sm">
            Daily social content built for retention. Every hook, cut and caption engineered to stop the scroll.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const renderProject = (p: Project) => {
    const onClick = () => setActiveProject(p);
    switch (p.layout) {
      case 'youtube':
        return <YouTubeProject project={p} onClick={onClick} />;
      case 'short-form':
        return <ShortFormProject project={p} onClick={onClick} />;
      case 'product':
        return <ProductProject project={p} onClick={onClick} />;
      case 'creator':
        return <CreatorProject project={p} onClick={onClick} />;
      default:
        return <ProjectCard project={p} onClick={onClick} />;
    }
  };

  return (
    <section id="work" className="relative bg-primary py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-20">
          <RevealText className="font-display font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {'SELECTED WORK'}
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 font-body text-lg text-secondary"
          >
            A few cuts from the last few years.
          </motion.p>
        </div>

        {/* Projects */}
        <div className="space-y-20 md:space-y-32">
          {projects.map((p) => (
            <div key={p.id}>{renderProject(p)}</div>
          ))}
        </div>
      </div>

      {/* Case study modal */}
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-[9500] bg-primary/90 backdrop-blur-lg flex items-center justify-center p-5 md:p-10"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary rounded-lg max-w-4xl w-full p-6 md:p-10 border border-line"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="font-body text-[11px] tracking-[0.15em] text-accent uppercase">{activeProject.category}</span>
                <h3 className="font-display font-bold text-primary text-3xl md:text-5xl mt-2 tracking-tight">{activeProject.title}</h3>
                <p className="font-body text-secondary mt-2">{activeProject.subtitle}</p>
              </div>
              <button onClick={() => setActiveProject(null)} className="text-secondary hover:text-primary transition-colors">
                ✕
              </button>
            </div>
            <div className="aspect-video rounded-sm overflow-hidden mb-6">
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { l: 'Year', v: activeProject.year },
                { l: 'Duration', v: activeProject.duration || '—' },
                { l: 'Client', v: activeProject.client || activeProject.subtitle },
                { l: 'Category', v: activeProject.category },
              ].map((item) => (
                <div key={item.l}>
                  <span className="font-body text-[10px] tracking-widest text-secondary uppercase">{item.l}</span>
                  <p className="font-body text-sm text-primary mt-1">{item.v}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-secondary mt-6 leading-relaxed">
              This project involved full-cycle editing — from raw footage selection and narrative structuring to pacing,
              sound design, color direction and final delivery. Every cut was motivated by story, not just rhythm.
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
