import React from 'react'
import { motion } from 'framer-motion'
import { certifications } from '../data/portfolioData'
import { Award } from 'lucide-react'

const Certifications = ({ darkMode }) => {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>CERTIFICATIONS</span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Credentials & Achievements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`group p-5 rounded-2xl cursor-default relative overflow-hidden ${
                darkMode ? 'glass-card border border-white/5' : 'bg-white border border-gray-200 shadow-sm'
              } transition-all duration-300 hover:shadow-lg`}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cert.color}`} />

              <div className={`inline-flex p-2 rounded-lg mb-4 bg-gradient-to-r ${cert.color}`}>
                <Award className="w-5 h-5 text-white" />
              </div>

              <h3 className={`font-semibold text-sm mb-2 leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {cert.name}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{cert.issuer}</p>
              {cert.year && (
                <span className={`mt-3 inline-block text-xs font-mono px-2 py-0.5 rounded ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                  {cert.year}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
