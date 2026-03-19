"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "9+", label: "Projects Built", icon: "🚀" },
  { value: "3+", label: "Hackathons", icon: "🏆" },
  { value: "100%", label: "Security Focused", icon: "🔐" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="py-28 bg-[#080810] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-white mb-3">
            About Me
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            className="space-y-5 text-white/70 text-base leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p>
              I&apos;m not just learning Computer Engineering —{" "}
              <span className="text-white font-medium">
                I&apos;m obsessed with understanding how systems break, and how to build them stronger.
              </span>
            </p>
            <p>
              My focus lies at the intersection of{" "}
              <span className="text-violet-400 font-medium">cybersecurity</span>,{" "}
              <span className="text-cyan-400 font-medium">fraud detection</span>, and real-world
              problem solving. When I look at a system, I see its attack surface, its failure
              points, the hidden connections that malicious actors exploit.
            </p>
            <p>
              This obsession drove me to build{" "}
              <span className="text-pink-400 font-semibold">RIFT-26</span> — a money muling
              detection system that uses graph-based analysis to uncover fraud rings. When others
              see transactions, I see patterns.
            </p>
            <p>
              I&apos;ve competed in hackathons, shipped products under pressure, and learned that
              the best security comes from{" "}
              <span className="text-white font-medium">thinking like an attacker.</span>
            </p>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-colors group"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-3xl select-none">{stat.icon}</span>
                <div>
                  <div className="text-2xl font-bold font-poppins bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
