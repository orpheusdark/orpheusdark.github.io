import React from 'react'
import { motion } from 'framer-motion'
import { about } from '../data/portfolioData'

const About = ({ darkMode }) => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            ABOUT ME
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Who am I?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`p-6 rounded-2xl ${darkMode ? 'glass-card neon-border' : 'glass-card-light border border-gray-200 shadow-md'}`}>
              <p className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {about.description}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {about.highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className={`p-5 rounded-2xl cursor-default transition-all duration-200 ${
                  darkMode ? 'glass-card hover:border-cyan-500/30 border border-white/5' : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-3">{h.icon}</div>
                <h3 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{h.title}</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
