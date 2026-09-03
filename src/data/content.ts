export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client?: string;
  duration?: string;
  image: string;
  details: string[];
  metrics?: { label: string; value: string }[];
  layout: 'brand-film' | 'youtube' | 'short-form' | 'product' | 'creator';
}

export const projects: Project[] = [
  {
    id: 'nova',
    index: '01',
    title: 'NOVA',
    subtitle: 'MADE TO MOVE',
    category: 'Brand Film / Commercial',
    year: '2026',
    duration: '02:14',
    image: 'https://images.pexels.com/photos/9692675/pexels-photo-9692675.jpeg?auto=compress&cs=tinysrgb&w=1600',
    details: ['DIRECTED / EDITED', 'BRAND FILM', '02:14'],
    layout: 'brand-film',
  },
  {
    id: 'creators-edge',
    index: '02',
    title: "THE CREATOR'S EDGE",
    subtitle: 'Northstar Media',
    category: 'YouTube / Long-form',
    year: '2025',
    client: 'Northstar Media',
    duration: '48 MIN → 11 MIN',
    image: 'https://images.pexels.com/photos/8102680/pexels-photo-8102680.jpeg?auto=compress&cs=tinysrgb&w=1600',
    details: ['LONG-FORM EDIT', '48 MIN → 11 MIN', 'NORTHSTAR MEDIA'],
    layout: 'youtube',
  },
  {
    id: 'thirty-reels',
    index: '03',
    title: '30 DAYS / 30 REELS',
    subtitle: 'Short-form Content',
    category: 'Short-form Content',
    year: '2025',
    image: 'https://images.pexels.com/photos/8357670/pexels-photo-8357670.jpeg?auto=compress&cs=tinysrgb&w=1200',
    details: ['SHORT-FORM', '30-DAY CAMPAIGN', 'VERTICAL'],
    metrics: [
      { label: 'VIDEOS', value: '30' },
      { label: 'VIEWS', value: '4.8M' },
      { label: 'AVG. ENGAGEMENT', value: '12.7%' },
    ],
    layout: 'short-form',
  },
  {
    id: 'luma',
    index: '04',
    title: 'LUMA',
    subtitle: 'LIGHT IN MOTION',
    category: 'Product Film / Motion',
    year: '2024',
    duration: '01:32',
    image: 'https://images.pexels.com/photos/36779955/pexels-photo-36779955.jpeg?auto=compress&cs=tinysrgb&w=1600',
    details: ['PRODUCT FILM', 'MOTION GRAPHICS', '01:32'],
    layout: 'product',
  },
  {
    id: 'daily-cut',
    index: '05',
    title: 'THE DAILY CUT',
    subtitle: 'Creator / Social',
    category: 'Creator / Social',
    year: '2024',
    image: 'https://images.pexels.com/photos/8371391/pexels-photo-8371391.jpeg?auto=compress&cs=tinysrgb&w=1200',
    details: ['REELS', 'TIKTOK', 'SHORTS'],
    layout: 'creator',
  },
];

export interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'SHORT-FORM',
    description: 'Reels, Shorts, TikTok and social-first content engineered for retention.',
    deliverables: 'Reels / Shorts / TikTok / Social',
  },
  {
    number: '02',
    title: 'LONG-FORM',
    description: 'YouTube videos, interviews, podcasts and documentaries with narrative structure.',
    deliverables: 'YouTube / Interviews / Podcasts / Documentaries',
  },
  {
    number: '03',
    title: 'BRAND',
    description: 'Commercials, campaigns and product films with cinematic direction.',
    deliverables: 'Commercials / Campaigns / Product Films',
  },
  {
    number: '04',
    title: 'MOTION',
    description: 'Titles, motion graphics and transitions that elevate the visual language.',
    deliverables: 'Titles / Motion Graphics / Transitions',
  },
  {
    number: '05',
    title: 'CONTENT SYSTEMS',
    description: 'Recurring social content and creator packages built for scale.',
    deliverables: 'Recurring social content / Creator packages',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Arjun didn't just make the footage look better. He completely changed how the story landed.",
    name: 'Riya Kapoor',
    role: 'Creative Director, Northstar',
  },
  {
    quote: "We gave him 12 hours of footage and a rough brief. What came back felt like a finished campaign.",
    name: 'Daniel Ross',
    role: 'Founder, Luma',
  },
  {
    quote: "Every reel he cut for us outperformed our in-house content. He understands what makes people stop.",
    name: 'Sara Mendes',
    role: 'Head of Social, Orbit',
  },
];

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    year: '2020',
    role: 'Junior Editor',
    company: 'Framehouse',
    description: 'Cut social content and B-roll for early-stage brand campaigns. Learned pacing from the ground up.',
  },
  {
    year: '2022',
    role: 'Freelance Video Editor',
    company: 'Independent',
    description: 'Worked across YouTube, product launches and short-form for creators and agencies across India and abroad.',
  },
  {
    year: '2024',
    role: 'Senior Editor',
    company: 'Northstar Media',
    description: 'Led long-form editorial for a 2M-subscriber channel. Built retention frameworks and content systems.',
  },
  {
    year: '2026',
    role: 'Independent Creative',
    company: 'Arjun Mehta Studio',
    description: 'Full-cycle creative editing — from raw footage to final delivery, including color, sound and motion.',
  },
];

export const clients = ['NOVA', 'LUMA', 'NORTHSTAR', 'FRAMEHOUSE', 'ORBIT', 'KAIRO', 'AETHER'];

export const tools = [
  'PREMIERE PRO',
  'AFTER EFFECTS',
  'DAVINCI RESOLVE',
  'PHOTOSHOP',
  'AUDITION',
  'BLENDER',
];

export const processSteps = [
  { number: '01', label: 'RAW FOOTAGE' },
  { number: '02', label: 'SELECT' },
  { number: '03', label: 'STRUCTURE' },
  { number: '04', label: 'PACE' },
  { number: '05', label: 'SOUND' },
  { number: '06', label: 'COLOR' },
  { number: '07', label: 'FINAL CUT' },
];

export const timelineTracks = [
  { label: 'VIDEO', width: '85%', color: 'bg-[#F4F4F0]' },
  { label: 'AUDIO', width: '70%', color: 'bg-[#C8FF3D]' },
  { label: 'B-ROLL', width: '55%', color: 'bg-[#969696]' },
  { label: 'TEXT', width: '40%', color: 'bg-[#F4F4F0]' },
  { label: 'SFX', width: '30%', color: 'bg-[#C8FF3D]' },
];

export const shortFormTags = ['HOOK', 'CUT', 'CAPTION', 'SOUND', 'RETENTION'];
