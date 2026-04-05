import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import heroImg from '../assets/images/hero.png'
import residentialImg from '../assets/images/residential.png'
import './Home.css'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Typing Effect ─── */
function TypeWriter({ texts, speed = 80, pause = 2000 }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, pause])

  return (
    <span className="typewriter">
      {displayText}
      <span className="typewriter__cursor">|</span>
    </span>
  )
}

/* ─── Section Component ─── */
function AnimatedSection({ children, className = '', ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      {...props}
    >
      {children}
    </motion.section>
  )
}

/* ─── Services Data ─── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="20" width="36" height="22" rx="2"/>
        <polygon points="24,6 42,20 6,20"/>
        <line x1="18" y1="30" x2="18" y2="42"/>
        <line x1="30" y1="30" x2="30" y2="42"/>
        <rect x="20" y="28" width="8" height="8"/>
      </svg>
    ),
    title: 'Residential Construction',
    desc: 'Custom homes, modern villas, and renovations crafted with precision and care for your dream living space.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="14" width="40" height="28" rx="2"/>
        <line x1="4" y1="22" x2="44" y2="22"/>
        <line x1="4" y1="30" x2="44" y2="30"/>
        <line x1="16" y1="14" x2="16" y2="42"/>
        <line x1="32" y1="14" x2="32" y2="42"/>
        <rect x="16" y="6" width="16" height="8" rx="1"/>
      </svg>
    ),
    title: 'Commercial Construction',
    desc: 'End-to-end commercial building solutions from planning to execution with unmatched efficiency.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 42 L12 20 L20 28 L28 16 L36 24 L42 10"/>
        <rect x="6" y="38" width="6" height="4"/>
        <rect x="16" y="34" width="6" height="8"/>
        <rect x="26" y="30" width="6" height="12"/>
        <rect x="36" y="26" width="6" height="16"/>
      </svg>
    ),
    title: 'Land Development',
    desc: 'Premium gated communities and villa projects with thoughtful planning and world-class amenities.',
  },
]

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: 'Rajesh Menon',
    location: 'Kochi',
    text: 'Conco Builders turned our dream home into reality. Their attention to detail and commitment to quality is unmatched. The project was completed on time and within budget.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    location: 'Calicut',
    text: 'We chose Conco for our commercial project and could not be happier. Professional team, transparent communication, and excellent craftsmanship throughout.',
    rating: 5,
  },
  {
    name: 'Anoop Kumar',
    location: 'Palakkad',
    text: 'Having worked with many builders, Conco stands apart in reliability and quality. Their 20+ years of experience truly shows in every aspect of construction.',
    rating: 5,
  },
]

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ─── HERO ─── */}
      <section className="hero" ref={heroRef} id="hero-section">
        <motion.div className="hero__bg" style={{ y: heroY }}>
          <img src={heroImg} alt="Modern construction site in Kerala" />
          <div className="hero__overlay" />
        </motion.div>

        {/* Floating particles */}
        <div className="hero__particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="hero__particle" style={{ '--delay': `${i * 0.8}s`, '--x': `${15 + i * 14}%` }} />
          ))}
        </div>

        <motion.div className="hero__content container" style={{ opacity: heroOpacity }}>
          <motion.span
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="hero__badge-dot" /> Trusted Since 1998
          </motion.span>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Building Dreams with<br />
            <span className="hero__title-accent">
              <TypeWriter texts={['Quality & Trust', 'Expert Craftsmanship', 'Prompt Delivery']} />
            </span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Over 350 successful projects across Kerala. Your vision, our expertise — 
            delivering excellence in every brick we lay.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link to="/contact" className="btn btn-primary btn-pulse hero__cta">
              Get Free Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Our Services
            </Link>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <div className="hero__stat">
              <span className="hero__stat-number"><Counter end={350} suffix="+" /></span>
              <span className="hero__stat-label">Projects Completed</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number"><Counter end={25} suffix="+" /></span>
              <span className="hero__stat-label">Years Experience</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number"><Counter end={100} suffix="%" /></span>
              <span className="hero__stat-label">Client Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero__scroll-indicator">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <AnimatedSection className="section about-preview" id="about-preview">
        <div className="container">
          <div className="about-preview__grid">
            <div className="about-preview__image-wrap">
              <motion.div className="about-preview__image" variants={fadeUp}>
                <img src={residentialImg} alt="Luxury home built by Conco Builders" />
                <div className="about-preview__exp-badge">
                  <span className="about-preview__exp-number"><Counter end={25} suffix="+" /></span>
                  <span className="about-preview__exp-text">Years of<br/>Excellence</span>
                </div>
              </motion.div>
            </div>
            <div className="about-preview__content">
              <motion.span className="section-label" variants={fadeUp}>About Us</motion.span>
              <motion.h2 className="section-title" variants={fadeUp}>
                Kerala's Most Trusted<br />Construction Partner
              </motion.h2>
              <motion.div className="divider" variants={fadeUp} />
              <motion.p variants={fadeUp}>
                With over two decades of experience, Conco Builders has been transforming architectural 
                visions into stunning realities across Kerala. Our founder brings 40+ years of construction 
                expertise, ensuring every project meets the highest standards of quality and craftsmanship.
              </motion.p>
              <motion.p variants={fadeUp}>
                From custom residential homes to large-scale commercial developments, we pride ourselves 
                on delivering projects on time, within budget, and beyond expectations.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/about" className="btn btn-outline">
                  Learn More About Us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── SERVICES ─── */}
      <AnimatedSection className="section services-section" id="services-section">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>What We Do</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>Our Core Services</motion.h2>
            <motion.p className="section-subtitle centered" variants={fadeUp}>
              Comprehensive construction solutions tailored to bring your vision to life with 
              uncompromising quality and expert precision.
            </motion.p>
          </div>

          <div className="services-grid">
            {services.map((service, i) => (
              <motion.div key={i} className="service-card card" variants={fadeUp}>
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
                <Link to="/services" className="service-card__link">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─── WHY CHOOSE US ─── */}
      <AnimatedSection className="section why-section" id="why-section">
        <div className="container">
          <div className="why-section__grid">
            <div className="why-section__content">
              <motion.span className="section-label" variants={fadeUp}>Why Choose Us</motion.span>
              <motion.h2 className="section-title" variants={fadeUp}>
                Built on Trust,<br />Delivered with Excellence
              </motion.h2>
              <motion.div className="divider" variants={fadeUp} />
              <motion.p variants={fadeUp}>
                When you choose Conco Builders, you're choosing a partner committed to transforming 
                your construction dreams into lasting realities.
              </motion.p>
            </div>

            <div className="why-section__features">
              {[
                { icon: '🏗️', title: 'Expert Craftsmanship', desc: '40+ years of founder experience with meticulous attention to every detail.' },
                { icon: '⏱️', title: 'On-Time Delivery', desc: 'We honor our commitments — every project, every deadline, every time.' },
                { icon: '✅', title: 'Quality Materials', desc: 'Only the finest materials sourced and tested for lasting durability.' },
                { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs. Clear, honest budgeting from start to finish.' },
              ].map((feature, i) => (
                <motion.div key={i} className="why-feature" variants={fadeUp}>
                  <div className="why-feature__icon">{feature.icon}</div>
                  <div>
                    <h4 className="why-feature__title">{feature.title}</h4>
                    <p className="why-feature__desc">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── TESTIMONIALS ─── */}
      <AnimatedSection className="section testimonials-section" id="testimonials-section">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>Testimonials</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>What Our Clients Say</motion.h2>
          </div>

          <motion.div className="testimonials-slider" variants={fadeUp}>
            <div className="testimonial-card glass-light">
              <div className="testimonial-card__stars">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#d4a853"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="testimonial-card__text">"{testimonials[activeTestimonial].text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h4 className="testimonial-card__name">{testimonials[activeTestimonial].name}</h4>
                  <span className="testimonial-card__location">{testimonials[activeTestimonial].location}</span>
                </div>
              </div>
            </div>

            <div className="testimonials-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials-dot ${i === activeTestimonial ? 'testimonials-dot--active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─── CTA BANNER ─── */}
      <section className="cta-banner" id="cta-banner">
        <div className="cta-banner__bg" />
        <div className="container cta-banner__content">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Ready to Build Your Dream?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Let's discuss your project. Get a free consultation and quote from Kerala's most trusted builders.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="cta-banner__actions"
          >
            <Link to="/contact" className="btn btn-primary btn-pulse">
              Start Your Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="tel:+919495500707" className="btn btn-secondary">
              Call Us Now
            </a>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
