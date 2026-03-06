import React, { useState, useEffect } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const BackgroundCanvas = ({ darkMode }) => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const options = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.5 } },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: { value: darkMode ? '#00f5ff' : '#0066cc' },
      links: {
        color: darkMode ? '#00f5ff' : '#0066cc',
        distance: 150,
        enable: true,
        opacity: darkMode ? 0.15 : 0.1,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: { enable: true, area: 1200 },
        value: 60,
      },
      opacity: { value: darkMode ? 0.4 : 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  if (!init) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        className="w-full h-full"
      />
    </div>
  )
}

export default BackgroundCanvas
