import React from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa'
import { SiLeetcode, SiTryhackme } from 'react-icons/si'
import { ExternalLink } from 'lucide-react'

const Contact = ({ darkMode }) => {
  const socials = [
    { icon: FaLinkedin, url: personalInfo.linkedin, label: 'LinkedIn', color: '#0077b5' },
    { icon: FaGithub, url: personalInfo.github, label: 'GitHub', color: darkMode ? '#fff' : '#333' },
    { icon: SiLeetcode, url: personalInfo.leetcode, label: 'LeetCode', color: '#ffa116' },
    { icon: FaCode, url: personalInfo.unstop, label: 'Unstop', color: '#7c3aed' },
    { icon: SiTryhackme, url: personalInfo.tryhackme, label: 'TryHackMe', color: '#ef4444' },
  ]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>CONTACT</span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Let&apos;s Connect</h2>
          <p className={`text-base ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Open to opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`p-8 rounded-2xl mb-8 ${darkMode ? 'glass-card neon-border' : 'bg-white border border-gray-200 shadow-md'}`}
        >
          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl mb-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
            Connect on LinkedIn
            <ExternalLink className="w-4 h-4" />
          </motion.a>

          <div className={`text-sm font-mono mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            or reach out via
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            {socials.map(({ icon: Icon, url, label, color }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                title={label}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  darkMode ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{ color }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-xs font-mono ${darkMode ? 'text-gray-700' : 'text-gray-400'}`}
        >
          Built with React + Vite + Tailwind + Framer Motion
          <br />© 2025 Nirant Chavda. All rights reserved.
        </motion.p>
      </div>
    </section>
  )
}

export default Contact
