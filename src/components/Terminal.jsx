import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { terminalCommands } from '../data/portfolioData'

const Terminal = ({ darkMode }) => {
  const [history, setHistory] = useState([
    { type: 'system', text: "Welcome to Nirant's Portfolio Terminal v1.0.0" },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'prompt', text: '' },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory = [...history.filter(h => h.type !== 'prompt'), { type: 'input', text: `visitor@nirant:~$ ${cmd}` }]

    if (trimmed === 'clear') {
      setHistory([{ type: 'prompt', text: '' }])
      return
    }

    const response = terminalCommands[trimmed]
    if (response) {
      newHistory.push({ type: 'output', text: response })
    } else if (trimmed === '') {
      // empty command, do nothing
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${trimmed}. Type "help" for available commands.` })
    }

    newHistory.push({ type: 'prompt', text: '' })
    setHistory(newHistory)
    setCommandHistory(prev => [cmd, ...prev.filter(c => c !== cmd)])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[newIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setInput(newIndex === -1 ? '' : commandHistory[newIndex])
    }
  }

  return (
    <section id="terminal" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-xs font-mono tracking-widest mb-3 block ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>TERMINAL</span>
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interactive Shell</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ boxShadow: darkMode ? '0 0 40px rgba(0, 245, 255, 0.1)' : '0 20px 60px rgba(0,0,0,0.1)' }}
        >
          {/* Terminal header */}
          <div className={`flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className={`mx-auto font-mono text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              visitor@nirant:~
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className={`terminal-window p-4 h-80 overflow-y-auto ${darkMode ? 'bg-black/90 text-green-400' : 'bg-gray-50 text-gray-800'}`}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === 'system' && (
                  <span className={darkMode ? 'text-cyan-400 text-xs' : 'text-blue-500 text-xs'}>{line.text}</span>
                )}
                {line.type === 'input' && (
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{line.text}</span>
                )}
                {line.type === 'output' && (
                  <pre className={`whitespace-pre-wrap text-xs leading-relaxed ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    {line.text}
                  </pre>
                )}
                {line.type === 'error' && (
                  <span className="text-red-400 text-xs">{line.text}</span>
                )}
                {line.type === 'prompt' && (
                  <div className="flex items-center">
                    <span className={darkMode ? 'text-cyan-400' : 'text-blue-600'}>visitor@nirant:~$&nbsp;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`flex-1 bg-transparent outline-none font-mono text-sm ${darkMode ? 'text-green-400 caret-cyan-400' : 'text-gray-800 caret-blue-600'}`}
                      autoFocus
                      spellCheck={false}
                    />
                    <span className="terminal-cursor" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <p className={`text-center text-xs font-mono mt-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Type &apos;help&apos; to see all available commands
        </p>
      </div>
    </section>
  )
}

export default Terminal
