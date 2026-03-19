"use client";

import { motion } from "framer-motion";

const coreSkills = [
  { label: "Cybersecurity", color: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-300" },
  { label: "Network Security", color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300" },
  { label: "AppSec", color: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300" },
  { label: "Ethical Hacking", color: "from-violet-500/20 to-cyan-600/10 border-violet-500/30 text-violet-300" },
  { label: "C#", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300" },
  { label: "Web Development", color: "from-cyan-500/20 to-violet-600/10 border-cyan-500/30 text-cyan-300" },
  { label: "Problem Solving", color: "from-pink-500/20 to-violet-600/10 border-pink-500/30 text-pink-300" },
];

const techStack = [
  { name: "Python", icon: "🐍" },
  { name: "C#", icon: "🔷" },
  { name: "TypeScript", icon: "📘" },
  { name: "Next.js", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Git", icon: "🌿" },
  { name: "Linux", icon: "🐧" },
  { name: "Wireshark", icon: "🔍" },
  { name: "Burp Suite", icon: "🛡️" },
  { name: "SQL", icon: "🗄️" },
  { name: "Graph Theory", icon: "🕸️" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 bg-[#080810] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-pink-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-white mb-3">
            Skills &amp; Expertise
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500" />
        </motion.div>

        {/* Core skills */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase font-medium mb-6 text-center">
            Core Skills
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {coreSkills.map((skill, i) => (
              <motion.span
                key={skill.label}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm border bg-gradient-to-br cursor-default select-none ${skill.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.12, y: -3 }}
                animate={{
                  y: [0, -(4 + (i * 3) % 6), 0],
                }}
              >
                {skill.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase font-medium mb-6 text-center">
            Technical Stack
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/8 transition-all cursor-default group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <span className="text-2xl select-none group-hover:scale-110 transition-transform">
                  {tech.icon}
                </span>
                <span className="text-white/60 text-xs font-medium text-center group-hover:text-white/90 transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
