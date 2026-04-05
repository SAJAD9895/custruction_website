import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import residentialImg from '../assets/images/residential.png'
import heroImg from '../assets/images/hero.png'
import './Services.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.section>
  )
}

const servicesData = [
  {
    id: 'residential',
    label: 'Residential',
    title: 'Residential Construction',
    subtitle: 'Your dream home, crafted with precision',
    image: residentialImg,
    description: 'We specialize in building custom homes that reflect your personality and lifestyle. From contemporary villas to traditional Kerala-style homes, our team brings decades of expertise to create spaces where memories are made.',
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        ),
        title: 'Custom Home Design',
        desc: 'Personalized architectural designs that blend aesthetics with functionality for your unique lifestyle.',
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
        ),
        title: 'Home Renovation',
        desc: 'Transform your existing home with expert renovation services — from kitchen makeovers to complete overhauls.',
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        ),
        title: 'Modern Designs',
        desc: 'Cutting-edge contemporary designs incorporating smart home technology and sustainable building practices.',
      },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    title: 'Commercial & Industrial',
    subtitle: 'Building spaces that drive business growth',
    image: heroImg,
    description: 'From office complexes to industrial facilities, we deliver commercial construction projects that combine functionality with impressive design. Our end-to-end approach ensures seamless execution from concept to completion.',
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>
        ),
        title: 'Complete Project Management',
        desc: 'From planning and permits to construction and handover — we handle every aspect with expert precision.',
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        ),
        title: 'Quality & Safety First',
        desc: 'Rigorous quality controls and safety standards ensure every project meets the highest industry benchmarks.',
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ),
        title: 'Efficiency & Timeliness',
        desc: 'Optimized workflows and experienced teams ensure on-schedule delivery without compromising quality.',
      },
    ],
  },
  {
    id: 'land',
    label: 'Land Development',
    title: 'Land Development',
    subtitle: 'Creating premium lifestyle destinations',
    image: residentialImg,
    description: 'We transform raw land into thriving communities. Our land development expertise covers everything from gated villa projects to comprehensive township planning, creating environments where families flourish.',
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ),
        title: 'Gated Communities',
        desc: 'Secure, well-planned gated communities with modern amenities, landscaped gardens, and quality infrastructure.',
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        ),
        title: 'Villa Projects',
        desc: 'Premium villa developments featuring contemporary designs, private gardens, and world-class facilities.',
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8.2a1 1 0 01.4-.8l6-4.5a1 1 0 011.2 0l6 4.5a1 1 0 01.4.8V20"/></svg>
        ),
        title: 'Infrastructure Planning',
        desc: 'Comprehensive infrastructure including roads, drainage, utilities, and green spaces for sustainable living.',
      },
    ],
  },
]

const process = [
  { step: '01', title: 'Consultation', desc: 'We listen to your vision, requirements, and budget to create a tailored plan.' },
  { step: '02', title: 'Design & Planning', desc: 'Our architects craft detailed designs and blueprints for your approval.' },
  { step: '03', title: 'Construction', desc: 'Expert teams bring the design to life with quality materials and craftsmanship.' },
  { step: '04', title: 'Handover', desc: 'Final inspection, quality checks, and smooth handover of your completed project.' },
]

export default function Services() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section className="page-hero" id="services-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Our Services</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Comprehensive<br /><span style={{ color: 'var(--color-accent)' }}>Construction Solutions</span>
          </motion.h1>
          <motion.p className="page-hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            From concept to completion, we deliver excellence at every stage
          </motion.p>
        </div>
      </section>

      {/* Service Sections */}
      {servicesData.map((service, idx) => (
        <AnimatedSection key={service.id} className={`section service-detail ${idx % 2 !== 0 ? 'service-detail--alt' : ''}`} id={`service-${service.id}`}>
          <div className="container">
            <div className={`service-detail__grid ${idx % 2 !== 0 ? 'service-detail__grid--reverse' : ''}`}>
              <div className="service-detail__image-wrap">
                <motion.div className="service-detail__image" variants={fadeUp}>
                  <img src={service.image} alt={service.title} />
                </motion.div>
              </div>
              <div className="service-detail__content">
                <motion.span className="section-label" variants={fadeUp}>{service.label}</motion.span>
                <motion.h2 className="section-title" variants={fadeUp}>{service.title}</motion.h2>
                <motion.div className="divider" variants={fadeUp} />
                <motion.p className="service-detail__desc" variants={fadeUp}>{service.description}</motion.p>
                <div className="service-detail__features">
                  {service.features.map((feat, i) => (
                    <motion.div key={i} className="service-feature" variants={fadeUp}>
                      <div className="service-feature__icon">{feat.icon}</div>
                      <div>
                        <h4 className="service-feature__title">{feat.title}</h4>
                        <p className="service-feature__desc">{feat.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}

      {/* Process */}
      <AnimatedSection className="section services-process" id="services-process">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>How We Work</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>Our Process</motion.h2>
            <motion.p className="section-subtitle centered" variants={fadeUp}>
              A streamlined approach that ensures quality, transparency, and timely delivery
            </motion.p>
          </div>
          <div className="process-grid">
            {process.map((p, i) => (
              <motion.div key={i} className="process-card" variants={fadeUp}>
                <span className="process-card__step">{p.step}</span>
                <h3 className="process-card__title">{p.title}</h3>
                <p className="process-card__desc">{p.desc}</p>
                {i < process.length - 1 && <div className="process-card__arrow">→</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="cta-banner" id="services-cta">
        <div className="cta-banner__bg" />
        <div className="container cta-banner__content">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Let's Discuss Your Project
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Every great structure starts with a conversation. Tell us about your vision and get a free consultation.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="cta-banner__actions">
            <Link to="/contact" className="btn btn-primary btn-pulse">
              Get Free Consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
