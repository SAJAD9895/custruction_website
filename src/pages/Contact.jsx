import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

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

const offices = [
  {
    type: 'Head Office',
    location: 'Ottapalam, Palakkad',
    address: 'Ottapalam, Palakkad District, Kerala, India',
    phone: '+91 9495 500 707',
    isMain: true,
  },
  {
    type: 'Virtual Office',
    location: 'Calicut',
    address: 'Hilite Business Park, Calicut, Kerala',
    phone: '+91 848 327 255',
    isMain: false,
  },
  {
    type: 'Virtual Office',
    location: 'Kochi',
    address: 'MG Road, Kochi, Kerala',
    phone: '+91 9037 381 707',
    isMain: false,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section className="page-hero" id="contact-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Get In Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Let's Build<br /><span style={{ color: 'var(--color-accent)' }}>Something Great</span>
          </motion.h1>
          <motion.p className="page-hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            Ready to start your project? We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <AnimatedSection className="section contact-section" id="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <motion.div className="contact-form-wrap" variants={fadeUp}>
              <h2 className="contact-form__title">Send Us a Message</h2>
              <p className="contact-form__subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              {submitted && (
                <motion.div
                  className="contact-form__success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Thank you! We'll contact you soon.
                </motion.div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className="contact-form__group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary contact-form__submit" id="contact-submit">
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="contact-info">
              <motion.div className="contact-info__card" variants={fadeUp}>
                <h3 className="contact-info__heading">Contact Information</h3>
                <p className="contact-info__desc">Reach out to us through any of the following channels. We're always ready to help.</p>
                
                <div className="contact-info__items">
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <a href="tel:+919495500707">+91 9495 500 707</a>
                      <a href="tel:+91848327255">+91 848 327 255</a>
                      <a href="tel:+919037381707">+91 9037 381 707</a>
                    </div>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <a href="mailto:concobuilders707@gmail.com">concobuilders707@gmail.com</a>
                    </div>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <h4>Business Hours</h4>
                      <span>Monday – Saturday: 9 AM – 6 PM</span>
                      <span>Sunday: Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Offices */}
      <AnimatedSection className="section offices-section" id="offices-section">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>Our Locations</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>Office Locations</motion.h2>
          </div>
          <div className="offices-grid">
            {offices.map((office, i) => (
              <motion.div key={i} className={`office-card card ${office.isMain ? 'office-card--main' : ''}`} variants={fadeUp}>
                <div className="office-card__badge">{office.type}</div>
                <h3 className="office-card__location">{office.location}</h3>
                <p className="office-card__address">{office.address}</p>
                <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="office-card__phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  {office.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Map */}
      <section className="map-section" id="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8147!2d76.3771!3d10.7731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d2e1f2d8f14b%3A0x5f4a2d5e1c8f4b7a!2sOttapalam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Conco Builders Office Location"
        />
      </section>
    </motion.main>
  )
}
