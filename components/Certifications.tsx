"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Cert {
  name: string;
  issuer: string;
  year: string;
  icon: string;
}

const certifications: Cert[] = [
  {
    name: "Certified in Cybersecurity (CC)",
    issuer: "ISC²",
    year: "2024",
    icon: "🛡️",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco NetAcad",
    year: "2024",
    icon: "🌐",
  },
  {
    name: "Introduction to Networks",
    issuer: "Cisco NetAcad",
    year: "2024",
    icon: "🔗",
  },
  {
    name: "Google Cybersecurity Certificate",
    issuer: "Google",
    year: "2024",
    icon: "🔐",
  },
  {
    name: "Ethical Hacking Essentials",
    issuer: "EC-Council",
    year: "2024",
    icon: "⚔️",
  },
];

export default function Certifications() {
  const [open, setOpen] = useState(false);

  return (
    <section id="certifications" className="py-24 bg-[#080810] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-white mb-3">
            Certifications
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500" />
        </motion.div>

        {/* Collapsible container */}
        <motion.div
          className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Toggle button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-5 text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📜</span>
              <span className="font-semibold font-poppins">
                {certifications.length} Certifications
              </span>
              <span className="text-white/40 text-sm">— click to {open ? "collapse" : "expand"}</span>
            </div>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/50"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M5 7.5l5 5 5-5" />
            </motion.svg>
          </button>

          {/* Animated list */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="cert-list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={cert.name}
                      className="flex items-center gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                    >
                      <span className="text-xl select-none">{cert.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate group-hover:text-violet-300 transition-colors">
                          {cert.name}
                        </p>
                        <p className="text-white/40 text-xs">{cert.issuer}</p>
                      </div>
                      <span className="text-white/30 text-xs font-mono shrink-0">{cert.year}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
