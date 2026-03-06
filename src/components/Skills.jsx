import React from 'react'
import { motion } from 'framer-motion'
import { skills, languages } from '../data/portfolioData'

const Skills = ({ darkMode }) => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>SKILLS</span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Technical Arsenal</h2>
        </motion.div>

        <div className="space-y-5 mb-16">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{skill.icon}</span>
                  <span className={`font-mono font-medium text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                </div>
                <span className={`font-mono text-xs ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>{skill.level}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                <motion.div
                  className="h-full rounded-full progress-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Languages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`p-4 rounded-xl text-center ${
                  darkMode ? 'glass-card border border-white/5' : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lang.name}</h4>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{lang.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
