import React from 'react'
import { motion } from 'framer-motion'
import { hackathons, personalInfo } from '../data/portfolioData'
import { ExternalLink, Trophy } from 'lucide-react'

const Hackathons = ({ darkMode }) => {
  return (
    <section id="hackathons" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>HACKATHONS</span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Battle Ground</h2>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Competing, building, and winning.</p>
        </motion.div>

        <div className="grid gap-5 mb-10">
          {hackathons.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              className={`flex items-center gap-5 p-5 rounded-2xl ${
                h.highlight
                  ? darkMode
                    ? 'glass-card border border-cyan-500/20 bg-cyan-500/5'
                    : 'bg-blue-50 border border-blue-200'
                  : darkMode
                    ? 'glass-card border border-white/5'
                    : 'bg-white border border-gray-200 shadow-sm'
              } transition-all duration-200`}
            >
              <span className="text-4xl">{h.icon}</span>
              <div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{h.title}</h3>
                <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{h.org}</p>
              </div>
              {h.highlight && (
                <div className="ml-auto">
                  <Trophy className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={personalInfo.unstop}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm transition-all duration-200 ${
              darkMode
                ? 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'
                : 'border border-blue-400 text-blue-600 hover:bg-blue-50'
            }`}
          >
            View Hackathons on Unstop <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hackathons
