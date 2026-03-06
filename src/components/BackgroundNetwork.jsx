import React, { useRef, useEffect, useCallback } from 'react'

const NODE_COUNT = 65
const CONNECTION_DISTANCE = 160
const THREAT_INTERVAL = 5000
const PULSE_SPEED = 1.8
const MAX_CONNECTION_ALPHA = 0.18

const NODE_LABELS = [
  'API Server', 'Auth Node', 'Gateway', 'Firewall',
  'DB Cluster', 'CDN Edge', 'IDS', 'SIEM',
]

const COLORS = {
  cyan: '#22d3ee',
  blue: '#3b82f6',
  purple: '#8b5cf6',
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function createNodes(width, height) {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    baseX: 0,
    baseY: 0,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 2 + 2,
    color: Math.random() > 0.45 ? COLORS.cyan : COLORS.blue,
    threatLevel: 0,
    threatTimer: 0,
    label: i < NODE_LABELS.length ? NODE_LABELS[i] : null,
    phase: Math.random() * Math.PI * 2,
    floatAmp: Math.random() * 0.4 + 0.15,
    floatFreq: Math.random() * 0.0006 + 0.0003,
    brightBoost: 0,
  }))
}

const BackgroundNetwork = ({ darkMode }) => {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const stateRef = useRef({
    nodes: [],
    pulses: [],
    mouse: { x: -9999, y: -9999 },
    mouseOffset: { x: 0, y: 0 },
    lastThreatTime: 0,
    width: 0,
    height: 0,
  })

  const initNodes = useCallback((width, height) => {
    const nodes = createNodes(width, height)
    nodes.forEach((n) => {
      n.baseX = n.x
      n.baseY = n.y
    })
    return nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const state = stateRef.current

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      state.width = canvas.width
      state.height = canvas.height
      state.nodes = initNodes(canvas.width, canvas.height)
      state.pulses = []
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      state.mouse.x = e.clientX
      state.mouse.y = e.clientY
      state.mouseOffset.x = (e.clientX / window.innerWidth - 0.5) * 25
      state.mouseOffset.y = (e.clientY / window.innerHeight - 0.5) * 15
    }
    window.addEventListener('mousemove', handleMouseMove)

    const triggerThreat = (timestamp) => {
      const nodes = state.nodes
      const threatIdx = Math.floor(Math.random() * nodes.length)
      const threatNode = nodes[threatIdx]
      threatNode.threatLevel = 1
      threatNode.threatTimer = timestamp

      // Spawn pulses from threat node to a few nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        if (i === threatIdx) continue
        const dx = nodes[i].x - threatNode.x
        const dy = nodes[i].y - threatNode.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DISTANCE) {
          state.pulses.push({
            fromIdx: threatIdx,
            toIdx: i,
            progress: 0,
            color: COLORS.purple,
          })
        }
      }
    }

    const drawGrid = () => {
      const step = 50
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.025)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < state.width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, state.height)
        ctx.stroke()
      }
      for (let y = 0; y < state.height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(state.width, y)
        ctx.stroke()
      }
    }

    const drawGlow = (x, y, radius, colorHex, alpha) => {
      const rgb = hexToRgb(colorHex)
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
      grad.addColorStop(0, `rgba(${rgb}, ${alpha})`)
      grad.addColorStop(1, `rgba(${rgb}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const draw = (timestamp) => {
      const { nodes, pulses, mouseOffset } = state

      // Trigger threat scans periodically
      if (timestamp - state.lastThreatTime > THREAT_INTERVAL + Math.random() * 3000) {
        triggerThreat(timestamp)
        state.lastThreatTime = timestamp
      }

      // Background
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, state.width, state.height)

      drawGrid()

      // Update & apply mouse offset to nodes (subtle parallax)
      const ox = mouseOffset.x
      const oy = mouseOffset.y

      for (const node of nodes) {
        // Float motion
        node.x += node.vx + Math.sin(timestamp * node.floatFreq + node.phase) * node.floatAmp
        node.y += node.vy + Math.cos(timestamp * node.floatFreq * 0.7 + node.phase) * node.floatAmp * 0.6

        // Bounce
        if (node.x < 0) { node.x = 0; node.vx = Math.abs(node.vx) }
        if (node.x > state.width) { node.x = state.width; node.vx = -Math.abs(node.vx) }
        if (node.y < 0) { node.y = 0; node.vy = Math.abs(node.vy) }
        if (node.y > state.height) { node.y = state.height; node.vy = -Math.abs(node.vy) }

        // Mouse proximity brightness
        const mdx = state.mouse.x - node.x
        const mdy = state.mouse.y - node.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        node.brightBoost = mDist < 120 ? (1 - mDist / 120) * 0.6 : 0

        // Decay threat
        if (node.threatLevel > 0) {
          node.threatLevel = Math.max(0, 1 - (timestamp - node.threatTimer) / 2200)
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i]
        const nx = ni.x + ox
        const ny = ni.y + oy
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j]
          const dx = nx - (nj.x + ox)
          const dy = ny - (nj.y + oy)
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * MAX_CONNECTION_ALPHA
            const isThreat = ni.threatLevel > 0.1 || nj.threatLevel > 0.1
            const lineColor = isThreat
              ? `rgba(139, 92, 246, ${alpha * 2})`
              : `rgba(34, 211, 238, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(nx, ny)
            ctx.lineTo(nj.x + ox, nj.y + oy)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = isThreat ? 0.9 : 0.5
            ctx.stroke()
          }
        }
      }

      // Update & draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        pulse.progress += PULSE_SPEED / 100
        if (pulse.progress >= 1) {
          // Ripple on destination node
          nodes[pulse.toIdx].brightBoost = Math.max(nodes[pulse.toIdx].brightBoost, 0.5)
          pulses.splice(i, 1)
          continue
        }
        const from = nodes[pulse.fromIdx]
        const to = nodes[pulse.toIdx]
        const px = (from.x + ox) + (to.x - from.x) * pulse.progress
        const py = (from.y + oy) + (to.y - from.y) * pulse.progress
        drawGlow(px, py, 6, pulse.color, 0.7)
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = pulse.color
        ctx.fill()
      }

      // Draw nodes
      for (const node of nodes) {
        const nx = node.x + ox
        const ny = node.y + oy
        const isThreat = node.threatLevel > 0.05
        const color = isThreat ? COLORS.purple : node.color
        const glowRadius = node.radius * (4 + node.brightBoost * 4 + node.threatLevel * 6)
        const glowAlpha = 0.25 + node.brightBoost * 0.4 + node.threatLevel * 0.5

        // Outer glow
        drawGlow(nx, ny, glowRadius, color, glowAlpha)

        // Node core
        ctx.beginPath()
        ctx.arc(nx, ny, node.radius + node.threatLevel * 2, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        // Center bright dot
        ctx.beginPath()
        ctx.arc(nx, ny, node.radius * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + node.brightBoost * 0.5})`
        ctx.fill()

        // Label
        if (node.label) {
          ctx.font = '9px "JetBrains Mono", Consolas, Monaco, monospace'
          ctx.fillStyle = `rgba(34, 211, 238, ${0.55 + node.brightBoost * 0.45})`
          ctx.fillText(node.label, nx + node.radius + 4, ny + 3)
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: darkMode ? 0.85 : 0.25 }}
    />
  )
}

export default BackgroundNetwork
