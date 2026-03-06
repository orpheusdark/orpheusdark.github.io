import React from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa'
import { SiLeetcode, SiTryhackme } from 'react-icons/si'
import { personalInfo } from '../data/portfolioData'
import { ChevronDown } from 'lucide-react'

const Hero = ({ darkMode }) => {
  const socialLinks = [
    { icon: FaLinkedin, url: personalInfo.linkedin, label: 'LinkedIn', color: '#0077b5' },
    { icon: FaGithub, url: personalInfo.github, label: 'GitHub', color: '#ffffff' },
    { icon: SiLeetcode, url: personalInfo.leetcode, label: 'LeetCode', color: '#ffa116' },
    { icon: FaCode, url: personalInfo.unstop, label: 'Unstop', color: '#7c3aed' },
    { icon: SiTryhackme, url: personalInfo.tryhackme, label: 'TryHackMe', color: '#ef4444' },
  ]

  return (
    <section id="hero" className={`min-h-screen flex flex-col items-center justify-center relative px-6 ${darkMode ? 'grid-bg' : 'grid-bg-light'}`}>
      {/* Background glow */}
      {darkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border ${
            darkMode ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' : 'border-blue-300 text-blue-600 bg-blue-50'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-4 tracking-tight"
        >
          <span className={darkMode ? 'text-white' : 'text-gray-900'}>Nirant </span>
          <span style={{
            background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Chavda
          </span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-xl md:text-2xl font-mono mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <span className="text-cyan-400">&gt;&nbsp;</span>
          <TypeAnimation
            sequence={[
              'Cybersecurity', 2000,
              'Ethical Hacking', 2000,
              'Application Security', 2000,
              'Network Security', 2000,
            ]}
            repeat={Infinity}
            className={darkMode ? 'text-cyan-400' : 'text-blue-600'}
          />
          <span className="terminal-cursor" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className={`text-base md:text-lg mb-10 ${darkMode ? 'text-gray-500' : 'text-gray-500'} font-mono tracking-widest`}
        >
          Computer Engineering Student
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-4 mb-10"
        >
          {socialLinks.map(({ icon: Icon, url, label, color }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              title={label}
              className={`p-3 rounded-xl transition-all duration-200 ${
                darkMode ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
              style={{ color }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-xl font-mono font-medium text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-200"
            style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
          >
            View Skills
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 rounded-xl font-mono font-medium text-sm border transition-all duration-200 ${
              darkMode ? 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-400 text-blue-600 hover:bg-blue-50'
            }`}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={darkMode ? 'text-gray-600' : 'text-gray-400'}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
