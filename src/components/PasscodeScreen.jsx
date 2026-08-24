import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 🔐 GANTI PASSCODE DI SINI (format: DD/MM/YYYY tanpa slash → "02032026")
const CORRECT_CODE = '26112012'
const DISPLAY_HINT = '26 / 11 / 2026'

export default function PasscodeScreen({ onUnlock }) {
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [hint, setHint] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleDigit = (d) => {
    if (input.length >= 8) return
    const next = input + d
    setInput(next)
    if (next.length === 8) {
      setTimeout(() => checkCode(next), 200)
    }
  }

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1))
  }

  const checkCode = (code) => {
    if (code === CORRECT_CODE) {
      setSuccess(true)
      setTimeout(() => onUnlock(), 1400)
    } else {
      setShake(true)
      setAttempts(a => a + 1)
      setTimeout(() => {
        setShake(false)
        setInput('')
      }, 700)
    }
  }

  // Format display: DD / MM / YYYY
  const formatDisplay = (val) => {
    const d = val.padEnd(8, '_')
    return `${d[0]}${d[1]} / ${d[2]}${d[3]} / ${d[4]}${d[5]}${d[6]}${d[7]}`
  }

  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE4EF 50%, #EDE0FF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background floating hearts */}
      {['❤️','💕','🌸','✨','💖','⭐'].map((e, i) => (
        <span key={i} style={{
          position: 'absolute',
          fontSize: `${16 + i * 4}px`,
          top: `${8 + i * 14}%`,
          left: i % 2 === 0 ? `${4 + i * 4}%` : `${82 - i * 3}%`,
          animation: `sparkle ${2.5 + i * 0.5}s ${i * 0.4}s ease-in-out infinite`,
          opacity: 0,
        }}>{e}</span>
      ))}

      {/* Lock icon */}
      <motion.div
        animate={success
          ? { scale: [1, 1.4, 1], rotate: [0, 20, 0] }
          : { y: [0, -8, 0] }
        }
        transition={success
          ? { duration: 0.6 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ fontSize: '4rem', marginBottom: '1rem' }}
      >
        {success ? '🔓' : '🔒'}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          background: 'linear-gradient(135deg, #C2185B, #7B1FA2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          marginBottom: '0.4rem',
        }}
      >
        {success ? 'Berhasil! 🎉' : 'Masukkan Tanggal Spesial'}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '0.95rem',
          color: 'var(--text-light)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        {success ? 'Membuka surat untukmu... 💌' : 'Hanya untuk kamu yang tahu tanggalnya 🥺'}
      </motion.p>

      {/* Input display */}
      <motion.div
        animate={shake ? { x: [-12, 12, -10, 10, -6, 6, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '1rem 2rem',
          marginBottom: '1.5rem',
          border: shake
            ? '2px solid #FF4D7D'
            : success
            ? '2px solid #7B1FA2'
            : '2px solid rgba(201,177,255,0.5)',
          boxShadow: '0 8px 32px rgba(199,130,200,0.18)',
          minWidth: '240px',
          textAlign: 'center',
          transition: 'border-color 0.3s',
        }}
      >
        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '2rem',
          letterSpacing: '3px',
          color: success ? '#7B1FA2' : shake ? '#FF4D7D' : 'var(--text-dark)',
          transition: 'color 0.3s',
        }}>
          {formatDisplay(input)}
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--text-light)',
          fontFamily: "'Quicksand', sans-serif",
          marginTop: '0.2rem',
        }}>
          DD / MM / YYYY
        </p>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {shake && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              color: '#FF4D7D',
              fontSize: '0.9rem',
              marginBottom: '0.8rem',
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
            }}
          >
            Salah tanggalnya~ Coba lagi 😅
          </motion.p>
        )}
      </AnimatePresence>

      {/* Hint after 3 attempts */}
      <AnimatePresence>
        {attempts >= 3 && !hint && !success && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setHint(true)}
            style={{
              background: 'transparent',
              border: '1.5px dashed rgba(201,177,255,0.7)',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              color: 'var(--text-light)',
              cursor: 'pointer',
              fontFamily: "'Quicksand', sans-serif",
              marginBottom: '0.8rem',
            }}
          >
            💡 Lihat petunjuk?
          </motion.button>
        )}
        {hint && !success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '0.85rem',
              color: 'var(--purple-deep)',
              fontFamily: "'Quicksand', sans-serif",
              marginBottom: '0.8rem',
              fontStyle: 'italic',
            }}
          >
            Petunjuk: {DISPLAY_HINT} 🗓️
          </motion.p>
        )}
      </AnimatePresence>

      {/* Keypad */}
      {!success && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.6rem',
            maxWidth: '260px',
            width: '100%',
          }}
        >
          {keys.map((k, i) => (
            <motion.button
              key={i}
              whileHover={k ? { scale: 1.08 } : {}}
              whileTap={k ? { scale: 0.93 } : {}}
              onClick={() => {
                if (!k) return
                if (k === '⌫') handleDelete()
                else handleDigit(k)
              }}
              style={{
                background: k === '⌫'
                  ? 'linear-gradient(135deg, rgba(255,133,161,0.2), rgba(255,133,161,0.1))'
                  : k
                  ? 'rgba(255,255,255,0.8)'
                  : 'transparent',
                border: k
                  ? '1.5px solid rgba(201,177,255,0.4)'
                  : 'none',
                borderRadius: '16px',
                padding: '1rem',
                fontSize: k === '⌫' ? '1.1rem' : '1.4rem',
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                color: k === '⌫' ? '#FF85A1' : 'var(--text-dark)',
                cursor: k ? 'pointer' : 'default',
                boxShadow: k ? '0 4px 12px rgba(199,130,200,0.12)' : 'none',
                transition: 'all 0.2s',
                backdropFilter: k ? 'blur(8px)' : 'none',
              }}
            >
              {k}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Hearts decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: '2rem', fontSize: '1.4rem', letterSpacing: '0.8rem', opacity: 0.4 }}
      >
        ❤️ 💕 ❤️
      </motion.div>
    </motion.div>
  )
}
