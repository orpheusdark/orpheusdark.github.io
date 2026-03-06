import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock } from 'lucide-react'

const EnterScreen = ({ onEnter, darkMode }) => {
  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('INITIALIZING...')
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)

  const loadingSteps = [
    'INITIALIZING SYSTEM...',
    'LOADING SECURITY PROTOCOLS...',
    'ESTABLISHING SECURE CONNECTION...',
    'DECRYPTING PORTFOLIO DATA...',
    'ACCESS GRANTED',
  ]

  useEffect(() => {
    let step = 0
    const interval = setInterval(() => {
      if (step < loadingSteps.length) {
        setLoadingText(loadingSteps[step])
        setProgress(((step + 1) / loadingSteps.length) * 100)
        step++
      } else {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 500)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    setExiting(true)
    setTimeout(onEnter, 800)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Scanline effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20"
              animate={{ y: ['-5%', '105vh'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Floating hex decorations */}
          {['0x1A2B', '0xFF00', '0xC0DE', '0xDEAD', '0xBEEF', '0x0042'].map((hex, i) => (
            <motion.div
              key={hex}
              className="absolute text-cyan-500 opacity-10 font-mono text-sm"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {hex}
            </motion.div>
          ))}

          {/* Main content */}
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono"
              >
                <div className="flex items-center justify-center mb-8">
                  <Shield className="text-cyan-400 w-16 h-16 animate-pulse" />
                </div>
                <motion.p
                  key={loadingText}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-cyan-400 text-lg mb-6 tracking-widest"
                >
                  {loadingText}
                </motion.p>
                {/* Progress bar */}
                <div className="w-64 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    style={{ boxShadow: '0 0 10px #00f5ff' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="flex items-center justify-center gap-3 mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="text-cyan-400 w-8 h-8" />
                  <span className="text-cyan-400 font-mono text-sm tracking-widest">SECURE CONNECTION ESTABLISHED</span>
                  <Lock className="text-cyan-400 w-8 h-8" />
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff, #bf00ff, #ff006e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Nirant Chavda
                </motion.h1>

                <p className="text-gray-400 text-xl mb-2 font-mono">
                  <span className="text-cyan-400">&gt;</span> Welcome to my Portfolio
                </p>
                <p className="text-gray-500 text-sm mb-10 tracking-widest font-mono">
                  CYBERSECURITY ENTHUSIAST · COMPUTER ENGINEERING STUDENT
                </p>

                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-4 font-mono font-bold text-lg tracking-widest text-black bg-cyan-400 rounded-sm overflow-hidden group"
                  style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
                >
                  <span className="relative z-10">[ ENTER ]</span>
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>

                <p className="text-gray-600 text-xs mt-6 font-mono tracking-wider">
                  Press ENTER or click to continue
                </p>
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-16 h-16 border-cyan-400 opacity-40`}
              style={{
                borderTopWidth: i < 2 ? '2px' : 0,
                borderBottomWidth: i >= 2 ? '2px' : 0,
                borderLeftWidth: i % 2 === 0 ? '2px' : 0,
                borderRightWidth: i % 2 === 1 ? '2px' : 0,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EnterScreen
