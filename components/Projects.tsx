"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

const featuredProject: Project = {
  title: "RIFT-26 — Money Muling Detection System",
  description:
    "Detects fraud rings using graph-based analysis of accounts, IPs, and transactions. Built with network graph logic, fraud pattern detection, and risk scoring algorithms.",
  tags: ["Graph Analysis", "Fraud Detection", "Risk Scoring", "Network Security"],
  featured: true,
};

const projects: Project[] = [
  {
    title: "Smart Helmet",
    description:
      "IoT-based safety system with accident detection and emergency alerts. Monitors vital conditions in real-time.",
    tags: ["IoT", "Safety", "Embedded Systems"],
  },
  {
    title: "GovTrack",
    description:
      "Civic tech platform that structures and visualizes public government data for transparency and accountability.",
    tags: ["Civic Tech", "Data Viz", "Public Policy"],
  },
  {
    title: "Greenigma",
    description:
      "Sustainability tracking platform that gamifies eco-friendly habits and measures environmental impact.",
    tags: ["Sustainability", "Green Tech", "Analytics"],
  },
  {
    title: "MediReach",
    description:
      "Healthcare accessibility platform connecting patients in underserved areas to medical resources.",
    tags: ["Healthcare", "Accessibility", "Social Impact"],
  },
  {
    title: "HealthAxis",
    description:
      "Comprehensive health tracking system with personalized insights and trend analysis.",
    tags: ["Health Tech", "Analytics", "IoT"],
  },
  {
    title: "PeerMindHub",
    description:
      "Peer-to-peer mental health support platform with anonymous matching and resource sharing.",
    tags: ["Mental Health", "P2P", "Community"],
  },
  {
    title: "Receipt Lens",
    description:
      "AI-powered receipt data extraction tool for expense tracking and financial analysis.",
    tags: ["AI/ML", "OCR", "FinTech"],
  },
  {
    title: "Pramana-AI",
    description:
      "AI-based decision support system for complex multi-variable analysis and recommendations.",
    tags: ["AI", "Decision Systems", "ML"],
  },
];

const tagColors = [
  "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  "bg-pink-500/15 text-pink-300 border-pink-500/20",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
];

function tagColorFor(i: number) {
  return tagColors[i % tagColors.length];
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Projects
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500" />
        </motion.div>

        {/* Featured project */}
        <motion.div
          className="relative mb-10 p-px rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 rounded-3xl" />
          <div className="relative bg-[#0f0f1a] rounded-3xl p-8 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-300">
                ⭐ Featured
              </span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/orpheusdark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all"
                >
                  <span>GitHub</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white mb-3">
              {featuredProject.title}
            </h3>
            <p className="text-white/60 text-base leading-relaxed mb-5 max-w-2xl">
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${tagColorFor(i)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 overflow-hidden transition-colors duration-300 p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 rounded-2xl" />

              <div className="flex items-center justify-between">
                <span className="text-white/20 text-xs font-mono tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="text-white font-semibold font-poppins text-base mb-2 group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag, j) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${tagColorFor(j)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
