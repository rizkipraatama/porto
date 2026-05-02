import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { 
  MapPin, 
  Mail, 
  Code2, 
  Cloud, 
  Database, 
  Settings, 
  History, 
  ArrowRight, 
  ExternalLink, 
  School, 
  BadgeCheck, 
  Github,
  Linkedin,
  Monitor,
  LayoutGrid,
  Quote
} from 'lucide-react';
import { CV_DATA } from './constants';
 
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hover = true }) => (
  <motion.div 
    whileHover={hover ? { y: -5 } : {}}
    className={`glass-card p-6 rounded-[2rem] ${className}`}
  >
    {children}
  </motion.div>
);

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: '.tech-card',
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutQuad'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mb-32" id="stack" ref={sectionRef}>
      <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">Mastered Tech Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Langs */}
        <div className="tech-card md:col-span-2 opacity-0">
          <GlassCard className="h-full">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" /> Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {CV_DATA.skills.languages.map(lang => (
                <span key={lang} className="px-4 py-2 rounded-xl bg-white/80 border border-white/90 text-slate-700 font-medium shadow-sm hover:bg-white transition-colors">
                  {lang}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Cloud */}
        <div className="tech-card opacity-0">
          <GlassCard className="h-full">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Cloud className="w-6 h-6 text-primary" /> Cloud
            </h3>
            <div className="flex flex-wrap gap-3">
              {CV_DATA.skills.cloud.map(item => (
                <span key={item} className="px-3 py-1.5 rounded-lg bg-primary-container/10 text-primary font-medium text-sm">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Storage */}
        <div className="tech-card opacity-0">
          <GlassCard className="h-full">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" /> Storage
            </h3>
            <div className="flex flex-wrap gap-3">
              {CV_DATA.skills.storage.map(item => (
                <span key={item} className="px-3 py-1.5 rounded-lg bg-secondary-container/20 text-secondary font-medium text-sm">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Frameworks & Tools */}
        <div className="tech-card md:col-span-4 opacity-0">
          <div className="glass-card p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Tools & Infra</h3>
              <p className="text-sm text-slate-500">Core technologies used in production ecosystems.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {CV_DATA.skills.tools.slice(0, 4).map(tool => (
                <div key={tool} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimatedHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Split text into individual characters for anime.js
      const h1 = containerRef.current.querySelector('h1');
      if (h1 && !h1.querySelector('.letter')) {
        h1.innerHTML = h1.textContent?.replace(/\S/g, "<span class='letter inline-block relative z-10'>$&</span>") || '';
      }

      const tl = anime.timeline({ 
        loop: false,
        complete: () => {
          anime({
            targets: '.letter',
            translateY: [
              { value: -20, duration: 400, easing: 'easeOutQuad' },
              { value: 0, duration: 600, easing: 'easeInQuad' }
            ],
            rotate: {
              value: '+=360',
              duration: 1000,
              easing: 'easeInOutSine'
            },
            delay: anime.stagger(200),
            loop: true
          });
        }
      });

      tl.add({
          targets: '.letter',
          translateY: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 + 30 * i
        })
        .add({
          targets: '.hero-subtitle',
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutExpo",
          duration: 800,
          offset: '-=800'
        });
    }
  }, []);

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-8 text-center mt-12 mb-20">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 text-primary font-medium text-[10px] tracking-widest uppercase mb-4">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Available for New Projects
      </div>
      <h1 className="text-[52px] font-bold tracking-tighter text-slate-900 drop-shadow-sm">
        {CV_DATA.name}
      </h1>
      <p className="hero-subtitle text-2xl md:text-4xl font-medium text-slate-600 max-w-2xl mx-auto leading-tight opacity-0">
        {CV_DATA.role} with a focus on technical leadership, scalable architecture, and engineering excellence.
      </p>
      <div className="hero-subtitle flex flex-wrap justify-center gap-8 opacity-0 pt-4">
        <div className="flex items-center gap-2 text-slate-500 font-semibold tracking-wide">
          <MapPin className="w-5 h-5 text-primary" />
          {CV_DATA.location}
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-semibold tracking-wide">
          <Mail className="w-5 h-5 text-primary" />
          {CV_DATA.email}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('experience');
  const bgShapesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (bgShapesRef.current) {
      anime({
        targets: '.bg-shape',
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-50, 50),
        scale: () => anime.random(0.8, 1.2),
        rotate: () => anime.random(-15, 15),
        duration: () => anime.random(3000, 5000),
        delay: () => anime.random(0, 1000),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Intersection Observer for Experience, Projects, and Credentials
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('experience-container')) {
            const tl = anime.timeline({ easing: 'easeOutQuad' });
            tl.add({
              targets: '.timeline-line',
              scaleY: [0, 1],
              duration: 1500
            })
            .add({
              targets: '.experience-item',
              opacity: [0, 1],
              translateX: (el, i) => i % 2 === 0 ? [-30, 0] : [30, 0],
              delay: anime.stagger(200),
              duration: 800,
              offset: '-=1000'
            });
          }

          if (entry.target.classList.contains('project-card')) {
            anime({
              targets: '.project-card',
              translateY: [40, 0],
              opacity: [0, 1],
              rotateX: [-10, 0],
              delay: anime.stagger(150),
              duration: 1000,
              easing: 'easeOutExpo'
            });
          }

          if (entry.target.classList.contains('education-section')) {
            anime({
              targets: '.education-section',
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 800,
              easing: 'easeOutQuad'
            });
            anime({
              targets: '.edu-item',
              opacity: [0, 1],
              translateX: [-15, 0],
              delay: anime.stagger(200),
              duration: 600,
              easing: 'easeOutQuad'
            });
          }

          if (entry.target.classList.contains('certification-section')) {
            anime({
              targets: '.certification-section',
              opacity: [0, 1],
              translateX: [20, 0],
              duration: 800,
              easing: 'easeOutQuad'
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const expContainer = document.querySelector('.experience-container');
    if (expContainer) observer.observe(expContainer);
    
    document.querySelectorAll('.project-card').forEach(card => observer.observe(card));
    const eduSection = document.querySelector('.education-section');
    if (eduSection) observer.observe(eduSection);
    const certSection = document.querySelector('.certification-section');
    if (certSection) observer.observe(certSection);

    // Continuous subtle floating for certifications
    anime({
      targets: '.cert-badge',
      translateY: () => anime.random(-5, 5),
      translateX: () => anime.random(-3, 3),
      rotate: () => anime.random(-2, 2),
      duration: () => anime.random(2000, 4000),
      delay: () => anime.random(0, 1000),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-primary-fixed-dim">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl rounded-2xl border border-white/60 bg-white/40 backdrop-blur-md z-50 flex justify-between items-center px-8 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
        <div className="text-xl font-bold tracking-tighter text-slate-900">{CV_DATA.name}</div>
        <div className="hidden md:flex gap-8 items-center">
          {['experience', 'projects', 'stack', 'credentials'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-sans text-sm font-medium text-slate-600 hover:text-primary transition-all capitalize"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a 
            href={CV_DATA.downloadCvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary px-5 py-2 rounded-xl text-sm font-medium shadow-[0_4px_12px_rgba(67,67,213,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center"
          >
            Download CV
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 relative">
        {/* AnimeJS Animated Background Shapes */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <svg ref={bgShapesRef} className="w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
            <circle className="bg-shape fill-primary" cx="100" cy="100" r="150" />
            <rect className="bg-shape fill-primary" x="700" y="200" width="200" height="200" rx="40" />
            <polygon className="bg-shape fill-primary" points="400,600 500,800 300,800" />
            <circle className="bg-shape fill-primary" cx="850" cy="850" r="100" />
          </svg>
        </div>

        {/* Hero Section */}
        <section className="relative mb-32 mesh-gradient-hero py-12">
          <AnimatedHeroText />
        </section>

        {/* System Summary */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[2rem] max-w-4xl mx-auto border-white/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Quote className="w-24 h-24" />
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              System Summary
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed italic">
              "{CV_DATA.summary}"
            </p>
          </motion.div>
        </section>

        <TechStack />
 
        {/* Experience Journey */}
        <section className="mb-32" id="experience">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-slate-900 mb-16 flex items-center gap-4">
              <History className="w-8 h-8 text-primary" />
              Professional Journey
            </h2>
            <div className="experience-container space-y-12 relative before:absolute before:inset-y-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-slate-200">
              {/* AnimeJS Timeline Progress */}
              <div className="timeline-line absolute inset-y-0 left-5 md:left-1/2 -translate-x-px w-0.5 bg-primary origin-top scale-y-0 z-0" />
              
              {CV_DATA.experience.map((exp, index) => (
                <div 
                  key={index}
                  className={`experience-item opacity-0 relative flex items-center justify-between md:justify-normal ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} group`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary shadow-lg absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300" />
                  
                  <div className="w-[calc(100%-4rem)] md:w-[45%] glass-card p-8 rounded-3xl ml-16 md:ml-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">{exp.role}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary-fixed-dim text-primary font-bold text-[10px] whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-primary font-bold mb-4">{exp.company}</div>
                    <ul className="text-sm text-slate-600 space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-32" id="projects">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Selected Projects</h2>
              <p className="text-slate-500 mt-2">Open source contributions and freelance architectural designs.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 group">
              View Full Vault 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CV_DATA.projects.map((project, index) => (
              <div 
                key={index}
                className="project-card opacity-0"
              >
                <div className="glass-card rounded-[2.5rem] overflow-hidden group h-full">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  </div>
                  <div className="p-8 pt-4">
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-primary px-2 py-0.5 rounded-full bg-primary-fixed-dim">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-secondary px-2 py-0.5 rounded-full bg-secondary-container">
                        {project.tech}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                      Case Study <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12" id="credentials">
          <div className="education-section opacity-0">
            <h2 className="text-3xl font-semibold text-slate-900 mb-8">Education</h2>
            <div className="space-y-6">
              {CV_DATA.education.map((edu, index) => (
                <div key={index} className="edu-item flex gap-6 opacity-0">
                  <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center shrink-0">
                    <School className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{edu.degree}</h4>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-widest">
                      {edu.period}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="certification-section opacity-0">
            <h2 className="text-3xl font-semibold text-slate-900 mb-8">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CV_DATA.certifications.map((cert, index) => (
                <div key={index} className="cert-badge">
                  <GlassCard className="!p-4 rounded-2xl flex items-center gap-3">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-slate-700">{cert}</span>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-24 mb-12 border-t border-slate-200/30">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-slate-900 uppercase">
            {CV_DATA.name} / Portfolio
          </div>
          <div className="text-xs font-medium tracking-widest uppercase text-slate-500 text-center">
            © 2026.
          </div>
          <div className="flex gap-8">
            {[
              { icon: Linkedin, label: 'LinkedIn', url: `https://${CV_DATA.linkedin}` },
              { icon: Github, label: 'GitHub', url: `https://${CV_DATA.github}` },
              { icon: Mail, label: 'Email', url: `mailto:${CV_DATA.email}` }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: 1.2,
                    rotate: 15,
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                  });
                }}
                onMouseLeave={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: 1,
                    rotate: 0,
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                  });
                }}
                className="social-link text-slate-500 hover:text-primary transition-colors flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
              >
                <social.icon className="w-4 h-4" />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

