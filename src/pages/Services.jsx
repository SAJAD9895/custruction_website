import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import heroImg from '../assets/images/hero.png'
import residentialImg from '../assets/images/residential.png'
import './Services.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

function AnimatedSection({ children, className = '', id = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section 
      ref={ref} 
      className={className} 
      id={id}
      initial="hidden" 
      animate={inView ? 'visible' : 'hidden'} 
      variants={stagger}
    >
      {children}
    </motion.section>
  )
}

const servicesItems = [
  {
    title: 'Residential Construction',
    description: 'Conco Builders specializes in delivering high-quality, innovative residential construction solutions, offering custom home building, remodeling, and renovation services that cater to the unique needs and preferences of each homeowner, ensuring exceptional craftsmanship, sustainability, and customer satisfaction every step of the way.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    )
  },
  {
    title: 'Commercial & Industrial Construction',
    description: 'We excel in commercial and industrial construction, providing comprehensive services from project planning and design to execution and completion, ensuring that each project meets the highest standards of quality and efficiency. Our experienced team is dedicated to delivering tailored solutions that enhance operational performance and drive business success.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>
    )
  },
  {
    title: 'Land Development',
    description: 'Conco Builders leads in land development and the creation of gated community villas, transforming raw land into luxurious, secure living spaces with top-notch amenities. Our expert team handles every aspect of development, ensuring a seamless process and exceptional quality in every project.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    )
  },
  {
    title: 'Renovation & Remodeling',
    description: 'Conco Builders specializes in renovation and remodeling, revitalizing homes with modern designs and superior craftsmanship. Our dedicated team ensures a seamless transformation, enhancing functionality and aesthetic appeal to meet the unique vision of each homeowner.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    )
  },
  {
    title: 'Interior & Exterior Designing',
    description: 'We offer exceptional interior and exterior designing services, creating stylish and functional spaces that reflect the unique tastes and lifestyles of our clients. Our skilled designers and artisans work together to deliver stunning results that enhance the beauty and value of every property.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
    )
  },
  {
    title: 'Landscaping',
    description: 'Conco Builders provides top-tier landscaping services, transforming outdoor spaces into beautiful, functional, and sustainable environments. Our expert team designs and implements customized landscaping solutions that enhance the aesthetic appeal and value of every property.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 1.5"/><path d="M14 14l3 3"/></svg>
    )
  }
]

export default function Services() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Page Hero */}
      <section className="page-hero" id="services-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Expert Solutions</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Our <span style={{ color: 'var(--color-accent)' }}>Services</span>
          </motion.h1>
          <motion.p className="page-hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            Quality craftsmanship and prompt delivery since 1998
          </motion.p>
        </div>
      </section>

      {/* Services Grid Section */}
      <AnimatedSection className="section services-grid-section" id="services-grid">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>Comprehensive Offerings</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>Expert Construction Services</motion.h2>
            <motion.p className="section-subtitle centered" variants={fadeUp}>
              Providing end-to-end solutions for all your construction and design needs.
            </motion.p>
          </div>

          <div className="services-new-grid">
            {servicesItems.map((service, i) => (
              <motion.div key={i} className="service-new-card card" variants={fadeUp}>
                <div className="service-new-card__icon">
                  {service.icon}
                </div>
                <h3 className="service-new-card__title">{service.title}</h3>
                <p className="service-new-card__desc">{service.description}</p>
                <div className="service-new-card__action">
                  <Link to="/contact" className="btn btn-primary btn-pulse glow-btn">
                    Get Quote
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Additional CTA Section */}
      <section className="services-cta-banner" id="budget-cta">
        <div className="services-cta-banner__bg" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="services-cta-banner__overlay" />
        </div>
        <div className="container services-cta-banner__content">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }}
          >
            Your Dream Home Within Your Budget
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Discover how to design your dream home while staying within your budget, balancing luxury and affordability seamlessly.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.4, duration: 0.7 }}
            className="services-cta-banner__actions"
          >
            <Link to="/contact" className="btn btn-primary btn-pulse">
              View Packages
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Preview (Quick Links) */}
      <AnimatedSection className="section services-summary" id="services-summary">
        <div className="container">
          <div className="services-summary__grid">
            <div className="services-summary__content">
              <motion.span className="section-label" variants={fadeUp}>Quality First</motion.span>
              <motion.h2 className="section-title" variants={fadeUp}>Committed to Excellence</motion.h2>
              <motion.p variants={fadeUp}>
                At Conco Builders, we believe that every brick laid is a promise of quality. Our integrated approach ensures that from landscaping to interior design, your project receives the attention it deserves.
              </motion.p>
              <motion.div variants={fadeUp} style={{ marginTop: 'var(--space-xl)' }}>
                <Link to="/about" className="btn btn-outline">Learn More About Us</Link>
              </motion.div>
            </div>
            <div className="services-summary__image-wrap">
              <motion.div className="services-summary__image card" variants={fadeUp}>
                <img src={residentialImg} alt="Luxury construction service" />
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </motion.main>
  )
}
