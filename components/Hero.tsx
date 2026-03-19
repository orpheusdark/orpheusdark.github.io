"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const ORB_COUNT = 8;

interface Orb {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

function generateOrbs(): Orb[] {
  const colors = [
    "rgba(124,58,237,0.25)",
    "rgba(6,182,212,0.2)",
    "rgba(236,72,153,0.18)",
    "rgba(124,58,237,0.15)",
    "rgba(6,182,212,0.15)",
  ];
  return Array.from({ length: ORB_COUNT }, (_, i) => ({
    id: i,
    x: `${10 + ((i * 83) % 80)}%`,
    y: `${5 + ((i * 67) % 80)}%`,
    size: 150 + (i * 73) % 250,
    color: colors[i % colors.length],
    duration: 6 + (i * 1.3) % 8,
    delay: (i * 0.7) % 4,
  }));
}

const orbs = generateOrbs();

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080810]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full pointer-events-none blur-3xl"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: orb.color,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Top label */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium tracking-wide">
              Computer Engineering Student
              <span
                className="inline-block w-0.5 h-4 bg-violet-400 rounded"
                style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
              />
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-poppins leading-tight tracking-tight text-white"
          >
            I design systems that
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              detect patterns,
            </span>{" "}
            risks,
            <br />
            and hidden connections.
          </motion.h1>

          {/* Name */}
          <motion.p
            variants={itemVariants}
            className="text-white/40 text-base sm:text-lg tracking-[0.25em] uppercase font-medium"
          >
            Nirant Chavda
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-white/60 text-base sm:text-lg leading-relaxed"
          >
            Building secure systems and exploring real-world challenges.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="px-7 py-3 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="px-7 py-3 rounded-xl font-semibold text-white border border-white/20 hover:border-cyan-400/60 hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M10 4v12M5 11l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
