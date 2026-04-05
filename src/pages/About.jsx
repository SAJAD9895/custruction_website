import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

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

function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const inc = end / 120
    const timer = setInterval(() => {
      start += inc
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count}{suffix}</span>
}

const timeline = [
  { year: '1998', title: 'Company Founded', desc: 'Started with a vision to build quality homes in Kerala.' },
  { year: '2005', title: 'Expanded Services', desc: 'Ventured into commercial construction and land development.' },
  { year: '2012', title: '200+ Projects', desc: 'Crossed the milestone of 200 successful project completions.' },
  { year: '2018', title: 'Modern Innovation', desc: 'Embraced modern construction technologies and sustainable practices.' },
  { year: '2024', title: '350+ Projects', desc: 'Continued growth with offices in Palakkad, Calicut, and Kochi.' },
]

const values = [
  { icon: '🎯', title: 'Our Mission', desc: 'To deliver exceptional construction services that exceed expectations through quality craftsmanship, innovative solutions, and unwavering commitment to client satisfaction.' },
  { icon: '🔭', title: 'Our Vision', desc: 'To be Kerala\'s most trusted and respected construction company, known for transforming dreams into landmark structures that stand the test of time.' },
  { icon: '💎', title: 'Our Values', desc: 'Integrity, quality, transparency, and excellence guide every decision we make. We believe in building relationships as strong as the structures we create.' },
]

export default function About() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Page Hero */}
      <section className="page-hero" id="about-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>About Us</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Our Story of<br /><span style={{ color: 'var(--color-accent)' }}>Excellence</span>
          </motion.h1>
          <motion.p className="page-hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            Two decades of building dreams, one brick at a time
          </motion.p>
        </div>
      </section>

      {/* Overview */}
      <AnimatedSection className="section about-overview" id="about-overview">
        <div className="container">
          <div className="about-overview__grid">
            <div className="about-overview__content">
              <motion.span className="section-label" variants={fadeUp}>Our Legacy</motion.span>
              <motion.h2 className="section-title" variants={fadeUp}>A Tradition of Trust and Quality Construction</motion.h2>
              <motion.div className="divider" variants={fadeUp} />
              <motion.p variants={fadeUp}>
                Founded in 1998, Conco Builders has grown from a small family business into one of Kerala's 
                most respected construction companies. With over 350 successful projects across the state, 
                we have earned a reputation for delivering exceptional quality on time and within budget.
              </motion.p>
              <motion.p variants={fadeUp}>
                Our founder brings over 40 years of hands-on construction experience, having worked on 
                projects ranging from individual homes to large-scale commercial developments. This depth 
                of knowledge is infused into every project we undertake.
              </motion.p>
              <motion.p variants={fadeUp}>
                Today, with offices in Palakkad, Calicut, and Kochi, we continue to expand our reach while 
                maintaining the personalized attention and quality craftsmanship that our clients have come 
                to expect from us.
              </motion.p>
            </div>
            <motion.div className="about-overview__stats" variants={fadeUp}>
              {[
                { number: 350, suffix: '+', label: 'Projects Completed' },
                { number: 25, suffix: '+', label: 'Years Experience' },
                { number: 40, suffix: '+', label: 'Years Founder Exp.' },
                { number: 3, suffix: '', label: 'Office Locations' },
              ].map((stat, i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat__number"><Counter end={stat.number} suffix={stat.suffix} /></span>
                  <span className="about-stat__label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection className="section about-values" id="about-values">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>What Drives Us</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>Our Foundation</motion.h2>
          </div>
          <div className="about-values__grid">
            {values.map((v, i) => (
              <motion.div key={i} className="value-card card" variants={fadeUp}>
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection className="section about-timeline" id="about-timeline">
        <div className="container">
          <div className="text-center">
            <motion.span className="section-label" variants={fadeUp} style={{ justifyContent: 'center' }}>Our Journey</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>Milestones That Define Us</motion.h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
                variants={fadeUp}
              >
                <div className="timeline__card card">
                  <span className="timeline__year">{item.year}</span>
                  <h4 className="timeline__title">{item.title}</h4>
                  <p className="timeline__desc">{item.desc}</p>
                </div>
                <div className="timeline__dot" />
              </motion.div>
            ))}
            <div className="timeline__line" />
          </div>
        </div>
      </AnimatedSection>
    </motion.main>
  )
}
