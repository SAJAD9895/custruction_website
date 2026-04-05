import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './Team.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.section>
  )
}

/* Avatar color palette — each person gets a unique gradient */
const avatarColors = [
  ['#1a3a5c', '#2a6a9c'],
  ['#2c5f41', '#3a9d6a'],
  ['#6b3a7d', '#9b5cbf'],
  ['#8c4a2f', '#c4723e'],
  ['#3a4f7a', '#5a7db8'],
  ['#7a3a3a', '#b85c5c'],
  ['#2a5a5a', '#3a9a9a'],
  ['#5c4a1a', '#9c7a2a'],
  ['#4a3a6b', '#7a5c9b'],
  ['#1a5c4a', '#2a9c7a'],
  ['#6b4a3a', '#9b7a5c'],
  ['#3a5c1a', '#5c9c2a'],
  ['#5c1a3a', '#9c2a5c'],
  ['#1a4a6b', '#2a7a9b'],
  ['#6b5c1a', '#9b8c2a'],
  ['#4a1a5c', '#7a2a9c'],
  ['#1a6b5c', '#2a9b8c'],
  ['#5c3a1a', '#9c5c2a'],
]

const teamMembers = [
  // Managing Partners
  { name: 'Rajakumar A T', role: 'Managing Partner', category: 'management', gender: 'male' },
  { name: 'Prajeesh C', role: 'Managing Partner', category: 'management', gender: 'male' },
  // Engineering & Technical
  { name: 'Er. Jithin', role: 'Chief Engineer (M-Tech Structural)', category: 'engineers', gender: 'male' },
  { name: 'Er. Athira', role: 'Design Engineer', category: 'engineers', gender: 'female' },
  { name: 'Er. Archana', role: 'Design Engineer', category: 'engineers', gender: 'female' },
  { name: 'Er. Vidya', role: 'Design Engineer', category: 'engineers', gender: 'female' },
  { name: 'Er. Reshma', role: 'Design Engineer', category: 'engineers', gender: 'female' },
  // Architects
  { name: 'Ar. Ajith', role: 'Architect', category: 'architects', gender: 'male' },
  { name: 'Ar. Aswani', role: 'Architect', category: 'architects', gender: 'female' },
  { name: 'Ar. Fasil', role: 'Architect', category: 'architects', gender: 'male' },
  // Visualisation
  { name: 'Er. Ajusha', role: '3D Visualiser', category: 'engineers', gender: 'female' },
  // Operations & Business
  { name: 'Prajeesh C', role: 'Sales and Marketing', category: 'operations', gender: 'male' },
  { name: 'Anjali', role: 'Accountant', category: 'operations', gender: 'female' },
  { name: 'Shabana', role: 'Digital Marketing', category: 'operations', gender: 'female' },
  // Site Supervisors
  { name: 'Er. Gokul', role: 'Site Supervisor', category: 'supervisors', gender: 'male' },
  { name: 'Er. Nidheesh', role: 'Site Supervisor', category: 'supervisors', gender: 'male' },
  { name: 'Er. Reshma S', role: 'Site Supervisor', category: 'supervisors', gender: 'female' },
  { name: 'Er. Anoop', role: 'Site Supervisor', category: 'supervisors', gender: 'male' },
]

const filters = [
  { key: 'all', label: 'All Members' },
  { key: 'management', label: 'Management' },
  { key: 'engineers', label: 'Engineers' },
  { key: 'architects', label: 'Architects' },
  { key: 'operations', label: 'Operations' },
  { key: 'supervisors', label: 'Supervisors' },
]

/* Generate initials from name */
function getInitials(name) {
  return name
    .replace(/^(Er\.|Ar\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

/* SVG avatar component with unique gradient per person */
function Avatar({ name, index, gender }) {
  const initials = getInitials(name)
  const [c1, c2] = avatarColors[index % avatarColors.length]
  const id = `grad-${index}`

  return (
    <svg viewBox="0 0 200 200" className="team-card__avatar-svg">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      {/* Decorative pattern */}
      <circle cx="160" cy="40" r="60" fill="rgba(255,255,255,0.06)" />
      <circle cx="40" cy="180" r="40" fill="rgba(255,255,255,0.04)" />
      {/* Person silhouette */}
      <circle cx="100" cy="72" r="30" fill="rgba(255,255,255,0.15)" />
      <ellipse cx="100" cy="145" rx="45" ry="35" fill="rgba(255,255,255,0.1)" />
      {/* Initials */}
      <text x="100" y="115" textAnchor="middle" fill="white" fontSize="44" fontWeight="700" fontFamily="'Inter', sans-serif" dominantBaseline="central">
        {initials}
      </text>
    </svg>
  )
}

/* Modal */
function ProfileModal({ member, index, onClose }) {
  if (!member) return null
  const [c1, c2] = avatarColors[index % avatarColors.length]

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-card"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
          <div className="modal-avatar">
            <Avatar name={member.name} index={index} gender={member.gender} />
          </div>
        </div>

        <div className="modal-body">
          <h3 className="modal-name">{member.name}</h3>
          <span className="modal-role">{member.role}</span>
          <div className="modal-divider" />
          <div className="modal-details">
            <div className="modal-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
              <span>Department: {filters.find(f => f.key === member.category)?.label || member.category}</span>
            </div>
            <div className="modal-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Conco Builders, Kerala</span>
            </div>
            <div className="modal-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span>+91 9495 500 707</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = activeFilter === 'all'
    ? teamMembers
    : teamMembers.filter(m => m.category === activeFilter)

  const handleCardClick = (member, idx) => {
    setSelectedMember(member)
    setSelectedIndex(idx)
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section className="page-hero" id="team-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Our People
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Professional<br /><span style={{ color: 'var(--color-accent)' }}>Team</span>
          </motion.h1>
          <motion.p className="page-hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            At Conco Builders, our team of skilled professionals is committed to delivering excellence in every project, making us the leading choice for construction in Kerala.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <AnimatedSection className="section team-section" id="team-section">
        <div className="container">
          {/* Filters */}
          <motion.div className="team-filters" variants={fadeUp}>
            {filters.map(f => (
              <button
                key={f.key}
                className={`team-filter ${activeFilter === f.key ? 'team-filter--active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
                id={`filter-${f.key}`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div className="team-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((member, i) => {
                const globalIndex = teamMembers.indexOf(member)
                return (
                  <motion.div
                    key={`${member.name}-${member.role}`}
                    className="team-card card"
                    variants={fadeUp}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => handleCardClick(member, globalIndex)}
                    id={`team-card-${globalIndex}`}
                  >
                    <div className="team-card__image">
                      <Avatar name={member.name} index={globalIndex} gender={member.gender} />
                      <div className="team-card__overlay">
                        <span className="team-card__view">View Profile</span>
                      </div>
                    </div>
                    <div className="team-card__info">
                      <h3 className="team-card__name">{member.name}</h3>
                      <span className="team-card__role">{member.role}</span>
                    </div>
                    <div className="team-card__category-tag">
                      {filters.find(f => f.key === member.category)?.label}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="team-empty">
              <p>No team members found in this category.</p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection className="section team-stats-section" id="team-stats">
        <div className="container">
          <div className="team-stats-grid">
            {[
              { icon: '👷', number: '18+', label: 'Team Members' },
              { icon: '🎓', number: '5+', label: 'Design Engineers' },
              { icon: '📐', number: '3', label: 'Architects' },
              { icon: '🏗️', number: '4', label: 'Site Supervisors' },
            ].map((stat, i) => (
              <motion.div key={i} className="team-stat-card" variants={fadeUp}>
                <span className="team-stat-card__icon">{stat.icon}</span>
                <span className="team-stat-card__number">{stat.number}</span>
                <span className="team-stat-card__label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            index={selectedIndex}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  )
}
