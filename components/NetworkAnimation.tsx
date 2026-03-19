"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  isFraud: boolean;
}

interface Edge {
  a: number;
  b: number;
  alpha: number;
  color: string;
}

const NODE_COUNT = 18;
const MAX_DIST = 110;

function randomBetween(lo: number, hi: number) {
  return lo + Math.random() * (hi - lo);
}

export default function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Build nodes
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
      const isFraud = Math.random() < 0.22;
      return {
        x: randomBetween(16, width - 16),
        y: randomBetween(16, height - 16),
        vx: randomBetween(-0.3, 0.3),
        vy: randomBetween(-0.3, 0.3),
        r: randomBetween(3, 6.5),
        color: isFraud ? "#ec4899" : Math.random() > 0.5 ? "#7c3aed" : "#06b6d4",
        alpha: randomBetween(0.6, 1),
        isFraud,
      };
    });

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < n.r || n.x > width - n.r) n.vx *= -1;
        if (n.y < n.r || n.y > height - n.r) n.vy *= -1;
      });

      // Draw edges
      const edges: Edge[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.55;
            const isFraudEdge = nodes[i].isFraud || nodes[j].isFraud;
            edges.push({
              a: i,
              b: j,
              alpha,
              color: isFraudEdge ? "#ec4899" : "#7c3aed",
            });
          }
        }
      }

      edges.forEach((e) => {
        ctx.beginPath();
        ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
        ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
        ctx.strokeStyle = e.color;
        ctx.globalAlpha = e.alpha;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((n) => {
        // Pulse for fraud nodes
        const pulse = n.isFraud ? 1 + 0.25 * Math.sin(frame * 0.06) : 1;

        ctx.globalAlpha = n.alpha;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Glow
        if (n.isFraud) {
          const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
          gradient.addColorStop(0, "rgba(236,72,153,0.35)");
          gradient.addColorStop(1, "rgba(236,72,153,0)");
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl opacity-80"
      style={{ display: "block" }}
    />
  );
}
