import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { chatbotResponses } from '../data/portfolioData'

const Chatbot = ({ darkMode }) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Nirant's assistant. Ask me about his experience, certifications, hackathons, or skills!" }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getResponse = (query) => {
    const q = query.toLowerCase()
    if (q.includes('cert')) return chatbotResponses.certifications
    if (q.includes('hack')) return chatbotResponses.hackathons
    if (q.includes('edu') || q.includes('school') || q.includes('study') || q.includes('college')) return chatbotResponses.education
    if (q.includes('skill') || q.includes('technolog') || q.includes('know')) return chatbotResponses.skills
    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('link')) return chatbotResponses.contact
    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) return "Hello! 👋 Great to see you! How can I help you learn about Nirant?"
    if (q.includes('who') || q.includes('nirant') || q.includes('about')) return "Nirant Chavda is a cybersecurity enthusiast and computer engineering student passionate about ethical hacking, network security, and application security."
    return chatbotResponses.default
  }

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    const botMsg = { from: 'bot', text: getResponse(input) }
    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-16 right-0 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl ${
              darkMode ? 'bg-gray-900 border border-cyan-500/20' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 ${darkMode ? 'bg-black/50 border-b border-white/5' : 'bg-gray-50 border-b border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div>
                  <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nirant&apos;s Assistant</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />Online
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className={darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                    msg.from === 'user'
                      ? 'bg-cyan-500 text-black'
                      : darkMode ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`flex items-center gap-2 px-3 py-3 border-t ${darkMode ? 'border-white/5 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about certifications, skills..."
                className={`flex-1 text-sm px-3 py-2 rounded-lg outline-none ${
                  darkMode ? 'bg-white/5 text-white placeholder-gray-600 border border-white/10' : 'bg-white text-gray-900 placeholder-gray-400 border border-gray-200'
                }`}
              />
              <button
                onClick={sendMessage}
                className="p-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg"
        style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default Chatbot
