import { motion } from 'framer-motion'

// ✏️ EDIT SURAT DI SINI
const LETTER_CONTENT = {
  greeting: "Hii sayangg,",
  paragraphs: [
    "Im sorry for being blind to all the issues and imperfections I have. 🌸",
    "I want to change that right now and fix myself in every way possible so I can be a better person/partner for you in your world, I want to be a safe place for you and your emotions through anything youre going through even if im not there with you now.",
    "These words might not touch your heart or sound like any romantic poem you would expect but deep down with all the sincerity and compassion I have in me. I love you dearly Franzine. 🥺",
  ],
  closing: "Forever Yours,",
  signature: "The one who will always love you ❤️",
}

export default function ApologyLetter() {
  return (
    <section style={{
      padding: 'clamp(3rem, 6vw, 6rem) 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem', animation: 'heartBeat 2s ease-in-out infinite' }}>💌</div>
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          background: 'linear-gradient(135deg, #C2185B, #7B1FA2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Maaf Ya…</h2>
      </motion.div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          maxWidth: '680px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(199,130,200,0.22), 0 4px 16px rgba(199,130,200,0.12)',
          border: '1.5px solid rgba(201,177,255,0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative corner hearts */}
        {['top:1rem;left:1rem', 'top:1rem;right:1rem', 'bottom:1rem;left:1rem', 'bottom:1rem;right:1rem'].map((pos, i) => (
          <span key={i} style={{
            position: 'absolute',
            ...Object.fromEntries(pos.split(';').map(p => p.split(':'))),
            fontSize: '1.2rem',
            opacity: 0.3,
          }}>❤️</span>
        ))}

        {/* Shimmer overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(90deg, var(--pink-deep), var(--purple-deep), var(--pink-deep))',
          borderRadius: '24px 24px 0 0',
        }} />

        {/* Letter lines decoration */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: '3.5rem', right: '3.5rem',
            top: `${80 + i * 38}px`,
            height: '1px',
            background: 'rgba(255,179,198,0.18)',
          }} />
        ))}

        {/* Greeting */}
        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
          color: 'var(--pink-deep)',
          marginBottom: '1.5rem',
          fontWeight: 600,
          position: 'relative',
          zIndex: 1,
        }}>
          {LETTER_CONTENT.greeting}
        </p>

        {/* Paragraphs */}
        {LETTER_CONTENT.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)',
              color: 'var(--text-dark)',
              lineHeight: 1.9,
              marginBottom: '1.2rem',
              fontWeight: 500,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {para}
          </motion.p>
        ))}

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          style={{ marginTop: '2rem', position: 'relative', zIndex: 1 }}
        >
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.2rem',
            color: 'var(--text-mid)',
            marginBottom: '0.3rem',
          }}>{LETTER_CONTENT.closing}</p>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5rem',
            color: 'var(--pink-deep)',
            fontWeight: 700,
          }}>{LETTER_CONTENT.signature}</p>
        </motion.div>
      </motion.div>

      {/* Decorative emoji row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem', fontSize: '1.8rem', letterSpacing: '0.6rem' }}
      >
        🌸 💕 🌸 💕 🌸
      </motion.div>
    </section>
  )
}
