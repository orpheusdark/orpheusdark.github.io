"use client";

import { motion } from "framer-motion";

interface Achievement {
  icon: string;
  title: string;
  description: string;
  tag?: string;
}

const achievements: Achievement[] = [
  {
    icon: "🥈",
    title: "2nd Prize – Creato Hackathon",
    description:
      "Competed against top engineering teams. Built under pressure and delivered a working solution that earned recognition for technical depth and innovation.",
    tag: "Hackathon",
  },
  {
    icon: "🌍",
    title: "Social Impact Award – CREATO 2023",
    description:
      "Recognized for building technology with meaningful social impact — proof that engineering can drive real change in people's lives.",
    tag: "Award",
  },
  {
    icon: "🛡️",
    title: "RIFT '26 Participant",
    description:
      "Participated in the RIFT '26 hackathon, building the money muling detection system that uses graph analysis to expose fraud rings.",
    tag: "Hackathon",
  },
];

const tagStyles: Record<string, string> = {
  Hackathon: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  Award: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-violet-600/6 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-white mb-3">
            Achievements
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title}
                className="flex gap-6 items-start group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Icon bubble */}
                <div className="hidden sm:flex items-center justify-center w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 group-hover:border-violet-500/40 text-2xl transition-colors z-10 relative">
                  {item.icon}
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 p-6 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-semibold font-poppins text-lg leading-snug">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          tagStyles[item.tag] ?? "bg-white/10 text-white/50 border-white/15"
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
