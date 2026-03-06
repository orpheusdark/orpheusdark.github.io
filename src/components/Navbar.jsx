import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certs' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'skills', label: 'Skills' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
]

const Navbar = ({ darkMode, setDarkMode }) => {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPos = window.scrollY + 100
      sections.forEach((section) => {
        if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-3 left-0 right-0 mx-auto z-50 w-[95vw] max-w-[900px] transition-all duration-300 rounded-2xl ${
        scrolled
          ? darkMode
            ? 'bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10'
            : 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg'
          : darkMode
            ? 'bg-black/40 backdrop-blur-md border border-white/5'
            : 'bg-white/60 backdrop-blur-md border border-gray-100'
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
          <Terminal className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
          <span className={`font-mono font-bold text-sm ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            NC<span className="text-gray-500">@portfolio</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? darkMode
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-sm shadow-cyan-500/20'
                    : 'bg-blue-100 text-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:text-cyan-400 hover:bg-white/5'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t px-4 pb-4 pt-2 overflow-hidden ${darkMode ? 'border-white/10' : 'border-gray-100'}`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono mb-1 transition-colors ${
                  activeSection === item.id
                    ? darkMode ? 'text-cyan-400 bg-cyan-500/10' : 'text-blue-600 bg-blue-50'
                    : darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
