import React, { useState, useEffect } from 'react'
import EnterScreen from './components/EnterScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Hackathons from './components/Hackathons'
import Skills from './components/Skills'
import Terminal from './components/Terminal'
import Chatbot from './components/Chatbot'
import CodingProfiles from './components/CodingProfiles'
import Contact from './components/Contact'
import BackgroundCanvas from './components/BackgroundCanvas'

function App() {
  const [entered, setEntered] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorDotPos, setCursorDotPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX - 10, y: e.clientY - 10 })
      setTimeout(() => setCursorDotPos({ x: e.clientX - 3, y: e.clientY - 3 }), 50)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  if (!entered) {
    return <EnterScreen onEnter={() => setEntered(true)} darkMode={darkMode} />
  }

  return (
    <div className={`${darkMode ? 'dark bg-black text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Cursor */}
      <div className="custom-cursor hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="custom-cursor-dot hidden md:block" style={{ left: cursorDotPos.x, top: cursorDotPos.y }} />

      {/* Scroll Progress */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background */}
      <BackgroundCanvas darkMode={darkMode} />

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="relative z-10">
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Education darkMode={darkMode} />
        <Certifications darkMode={darkMode} />
        <Hackathons darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Terminal darkMode={darkMode} />
        <CodingProfiles darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>

      <Chatbot darkMode={darkMode} />
    </div>
  )
}

export default App
