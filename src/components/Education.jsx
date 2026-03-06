import React from 'react'
import { motion } from 'framer-motion'
import { education } from '../data/portfolioData'

const Education = ({ darkMode }) => {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>EDUCATION</span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Academic Journey</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-8 top-0 bottom-0 w-px ${darkMode ? 'bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent' : 'bg-gradient-to-b from-blue-400 to-transparent'}`} />

          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative pl-20 mb-10"
            >
              {/* Timeline dot */}
              <div className={`absolute left-5 top-6 w-6 h-6 rounded-full flex items-center justify-center ${
                edu.current
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50'
                  : darkMode ? 'bg-gray-700 border-2 border-cyan-500/50' : 'bg-gray-200 border-2 border-blue-400'
              }`}>
                {edu.current && <span className="w-2 h-2 rounded-full bg-black" />}
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className={`p-6 rounded-2xl ${
                  darkMode ? 'glass-card border border-white/5 hover:border-cyan-500/30' : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                } transition-all duration-200`}
              >
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {edu.current && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-600'}`}>
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{edu.institution}</h3>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>{edu.degree}</p>
                    {edu.cgpa && (
                      <p className={`text-sm mt-1 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        CGPA: <span className={darkMode ? 'text-green-400' : 'text-green-600'}>{edu.cgpa}</span>
                      </p>
                    )}
                  </div>
                  <span className={`text-xs font-mono px-3 py-1.5 rounded-lg ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
