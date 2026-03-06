import React from 'react'
import { motion } from 'framer-motion'
import { codingProfiles } from '../data/portfolioData'
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa'
import { SiLeetcode, SiTryhackme } from 'react-icons/si'
import { ExternalLink } from 'lucide-react'

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  code: FaCode,
  shield: SiTryhackme,
  trophy: FaCode,
}

const CodingProfiles = ({ darkMode }) => {
  return (
    <section id="coding-profiles" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>PROFILES</span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Find Me Online</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {codingProfiles.map((profile, i) => {
            const Icon = iconMap[profile.icon] || FaCode
            return (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group p-5 rounded-2xl flex flex-col items-center gap-3 text-center transition-all duration-200 ${
                  darkMode ? 'glass-card border border-white/5 hover:border-cyan-500/30' : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${profile.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.name}</p>
                  <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{profile.stat}</p>
                </div>
                <ExternalLink className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CodingProfiles
