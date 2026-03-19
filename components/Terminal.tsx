"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

const BOOT_SEQUENCE = [
  { text: "Initializing system...", delay: 0 },
  { text: "Loading profile: Nirant Chavda", delay: 400 },
  { text: "Cybersecurity | Systems Thinker", delay: 700 },
  { text: 'Type "help" to see available commands.', delay: 1100 },
];

const COMMANDS: Record<string, string[]> = {
  help: [
    "┌─────────────────────────────────────┐",
    "│         Available Commands          │",
    "├─────────────────────────────────────┤",
    "│  help      → show this menu         │",
    "│  about     → who is Nirant?         │",
    "│  projects  → list key projects      │",
    "│  skills    → technical skills       │",
    "│  contact   → links & contact info   │",
    "│  clear     → clear terminal         │",
    "└─────────────────────────────────────┘",
  ],
  about: [
    "╔══════════════════════════════════════╗",
    "║  PROFILE: Nirant Chavda              ║",
    "╚══════════════════════════════════════╝",
    "",
    "  Role      → Computer Engineering Student",
    "  Focus     → Cybersecurity & Fraud Detection",
    "  Mindset   → Systems Thinker | Attacker's Eye",
    "",
    "  I don't just learn security — I obsess over",
    "  how systems break and how to build stronger.",
    "  When others see transactions, I see patterns.",
    "",
    "  Hackathons: 3+   |   Projects: 9+",
  ],
  projects: [
    "╔══════════════════════════════════════╗",
    "║  KEY PROJECTS                        ║",
    "╚══════════════════════════════════════╝",
    "",
    "  [01] RIFT-26",
    "       └─ Graph-based money muling detection",
    "          Exposes fraud rings via network analysis",
    "",
    "  [02] Smart Helmet",
    "       └─ IoT safety system with accident detection",
    "          Real-time emergency alert system",
    "",
    "  [03] GovTrack",
    "       └─ Civic transparency platform",
    "          Structures & visualizes govt data",
    "",
    "  [04] Receipt Lens",
    "       └─ AI-powered expense tracking",
    "          OCR-based receipt data extraction",
    "",
    "  [05] Pramana-AI",
    "       └─ AI decision support system",
    "          Complex multi-variable analysis",
    "",
    "  → run `projects --all` for full list",
  ],
  "projects --all": [
    "  All Projects:",
    "  ─────────────",
    "  RIFT-26, Smart Helmet, GovTrack,",
    "  Greenigma, MediReach, HealthAxis,",
    "  PeerMindHub, Receipt Lens, Pramana-AI",
  ],
  skills: [
    "╔══════════════════════════════════════╗",
    "║  SKILLS & EXPERTISE                  ║",
    "╚══════════════════════════════════════╝",
    "",
    "  Security",
    "  ─────────",
    "  Cybersecurity · Network Security",
    "  Ethical Hacking · AppSec · OSINT",
    "",
    "  Development",
    "  ────────────",
    "  Python · C# · TypeScript",
    "  Next.js · React · Tailwind CSS",
    "",
    "  Tools",
    "  ─────",
    "  Wireshark · Burp Suite · Git · Linux",
    "  Graph Theory · SQL",
    "",
    "  Certs: ISC² CC · Google Cybersecurity",
    "         EC-Council EHE · Cisco NetAcad",
  ],
  contact: [
    "╔══════════════════════════════════════╗",
    "║  CONTACT & LINKS                     ║",
    "╚══════════════════════════════════════╝",
    "",
    "  GitHub    → github.com/orpheusdark",
    "  LinkedIn  → linkedin.com/in/orpheusdark",
    "  LeetCode  → leetcode.com/u/nirantchavda",
    "  Email     → orpheusdark@duck.com",
    "",
    "  Open to: Security roles, hackathons,",
    "           research collabs & freelance.",
  ],
};

function getCommandOutput(cmd: string): string[] {
  const normalized = cmd.trim().toLowerCase();
  if (normalized === "clear") return [];
  if (normalized in COMMANDS) return COMMANDS[normalized];
  if (normalized === "") return [];
  return [
    `  bash: ${cmd}: command not found`,
    '  Type "help" for available commands.',
  ];
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (const step of BOOT_SEQUENCE) {
        await new Promise((r) => setTimeout(r, step.delay));
        if (cancelled) return;
        setLines((prev) => [...prev, { type: "system", content: step.text }]);
      }
      if (!cancelled) setBooted(true);
    };
    run();
    return () => { cancelled = true; };
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = () => {
    if (!booted) return;
    const cmd = input.trim();
    setLines((prev) => [...prev, { type: "input", content: cmd }]);

    if (cmd.toLowerCase() === "clear") {
      setTimeout(() => setLines([]), 50);
    } else {
      const output = getCommandOutput(cmd);
      if (output.length > 0) {
        setLines((prev) => [
          ...prev,
          ...output.map((line) => ({ type: "output" as const, content: line })),
        ]);
      }
    }

    if (cmd) {
      setHistory((h) => [cmd, ...h.slice(0, 49)]);
    }
    setHistoryIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? "" : history[nextIdx] ?? "");
    }
  };

  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0a0a0f] font-mono text-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      style={{ boxShadow: "0 0 40px rgba(124,58,237,0.15), 0 0 80px rgba(6,182,212,0.06)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-white/8">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-white/30 text-xs tracking-wider">
          nirant@portfolio ~ bash
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="h-80 overflow-y-auto p-4 space-y-0.5 cursor-text"
        onClick={() => inputRef.current?.focus()}
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(124,58,237,0.3) transparent" }}
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre">
            {line.type === "input" && (
              <span>
                <span className="text-violet-400">❯</span>
                <span className="text-cyan-300 ml-2">{line.content}</span>
              </span>
            )}
            {line.type === "system" && (
              <span className="text-emerald-400/80">{line.content}</span>
            )}
            {line.type === "output" && (
              <span className="text-white/65">{line.content}</span>
            )}
          </div>
        ))}

        {/* Input line */}
        {booted && (
          <div className="flex items-center leading-relaxed mt-1">
            <span className="text-violet-400">❯</span>
            <span className="text-cyan-300 ml-2">{input}</span>
            <span
              className="inline-block w-2 h-4 bg-cyan-400 ml-px rounded-sm"
              style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.08s" }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Hidden real input for capturing keystrokes */}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute w-0 h-0 pointer-events-none"
        autoComplete="off"
        spellCheck={false}
        disabled={!booted}
        aria-label="Terminal input"
      />

      {/* Click-to-focus hint */}
      <div className="px-4 py-2 border-t border-white/5 text-white/20 text-xs flex items-center gap-2">
        <span className="text-violet-400/50">⌨</span>
        <span>click terminal · type a command · press Enter</span>
      </div>
    </motion.div>
  );
}
