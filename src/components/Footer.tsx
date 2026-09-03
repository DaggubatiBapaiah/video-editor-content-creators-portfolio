import { motion } from 'framer-motion';

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Vimeo', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-primary border-t border-line px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Name */}
          <div className="md:col-span-5">
            <h3 className="font-display font-bold text-primary text-3xl md:text-5xl tracking-tight">
              ARJUN MEHTA
            </h3>
            <p className="font-body text-sm text-secondary mt-2 tracking-wide">
              VIDEO EDITOR / CONTENT CREATOR
            </p>
          </div>

          {/* Social links */}
          <div className="md:col-span-4">
            <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase block mb-4">Connect</span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-cursor="open"
                  className="font-body text-sm text-primary hover:text-accent transition-colors duration-300 group flex items-center gap-1"
                >
                  {link.label}
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <span className="font-body text-[10px] tracking-[0.2em] text-secondary uppercase block mb-4">Contact</span>
            <a
              href="mailto:hello@arjunmehta.studio"
              className="font-body text-sm text-primary hover:text-accent transition-colors duration-300 block"
            >
              hello@arjunmehta.studio
            </a>
            <p className="font-body text-sm text-secondary mt-2">Mumbai, India</p>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-16 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="font-body text-[11px] tracking-wider text-secondary uppercase">
            © 2026 Arjun Mehta Studio
          </p>
          <p className="font-body text-[11px] tracking-wider text-secondary/50 uppercase">
            Built frame by frame
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
