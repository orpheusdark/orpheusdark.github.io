export type FileNode =
  | { type: 'file'; content: string }
  | { type: 'dir'; children: Record<string, FileNode> };

export const virtualFS: FileNode = {
  type: 'dir',
  children: {
    'about.txt': {
      type: 'file',
      content: `╔══════════════════════════════════════════╗
                ║           NIRANT CHAVDA                  ║
                ║      Full-Stack Developer & Explorer     ║
                ╚══════════════════════════════════════════╝

Name    : Nirant Chavda
Role    : Full-Stack Developer | System Explorer
Based   : India
Mission : Building impactful software, one commit at a time.

I'm a passionate developer who loves turning ideas into reality
through clean code and creative problem-solving. When I'm not
coding, I'm exploring new tech, contributing to open source, or
dreaming up the next project.

Type 'skills' to see what I can do.
Type 'projects' to see what I've built.
Type 'hireme' for contact info.`,
    },
    'skills.txt': {
      type: 'file',
      content: `┌─────────────────────────────────────────┐
│              SKILL MATRIX               │
└─────────────────────────────────────────┘

Languages
  ▸ TypeScript / JavaScript  ████████████ 95%
  ▸ Python                   ██████████░░ 85%
  ▸ Go                       ████████░░░░ 70%
  ▸ Rust                     ██████░░░░░░ 55%

Frontend
  ▸ React / Next.js          ████████████ 95%
  ▸ Vue.js                   ████████░░░░ 70%
  ▸ TailwindCSS              ████████████ 90%
  ▸ Three.js / WebGL         ██████░░░░░░ 55%

Backend
  ▸ Node.js / Express        ████████████ 92%
  ▸ FastAPI / Django         ████████░░░░ 75%
  ▸ GraphQL                  ████████░░░░ 78%

DevOps & Cloud
  ▸ Docker / Kubernetes      ████████░░░░ 72%
  ▸ AWS / GCP                ███████░░░░░ 65%
  ▸ CI/CD Pipelines          ████████░░░░ 80%

Tools
  ▸ Git                      ████████████ 95%
  ▸ Linux / Bash             ████████████ 90%
  ▸ Neovim                   ████████░░░░ 80%`,
    },
    projects: {
      type: 'dir',
      children: {
        'rift-26.txt': {
          type: 'file',
          content: `╔══════════════════════════════════════════╗
║             PROJECT: RIFT-26             ║
╚══════════════════════════════════════════╝

Type    : AI / Hackathon
Status  : Completed ✓
Tags    : #AI #NLP #Python #FastAPI

Description:
  RIFT-26 is an AI-powered document intelligence platform
  that extracts, classifies, and summarizes large document
  corpora in real-time. Built during a 26-hour hackathon,
  it leverages transformer models for contextual understanding.

Tech Stack:
  ▸ Python + FastAPI (backend)
  ▸ React + TypeScript (frontend)
  ▸ HuggingFace Transformers
  ▸ PostgreSQL + Redis
  ▸ Docker

Highlights:
  ▸ Processes 1000+ pages per minute
  ▸ 94% accuracy on classification tasks
  ▸ Won Best AI Project at HackFest 2024

GitHub: github.com/nirantchavda/rift-26`,
        },
        'smart-helmet.txt': {
          type: 'file',
          content: `╔══════════════════════════════════════════╗
║          PROJECT: SMART HELMET           ║
╚══════════════════════════════════════════╝

Type    : IoT / Hardware + Software
Status  : In Progress 🔧
Tags    : #IoT #ArduinoESP32 #ReactNative #Safety

Description:
  A next-generation smart helmet for two-wheeler riders
  featuring crash detection, SOS alerts, real-time GPS
  tracking, and AR heads-up display. Connects to a
  companion mobile app for live telemetry.

Tech Stack:
  ▸ ESP32 microcontroller (firmware in C++)
  ▸ React Native (mobile app)
  ▸ Node.js + WebSocket (backend)
  ▸ Google Maps API
  ▸ Twilio (SMS alerts)

Highlights:
  ▸ < 50ms crash detection latency
  ▸ 48hr battery life on single charge
  ▸ Finalist at Smart India Hackathon 2024
  ▸ Patent application filed

GitHub: github.com/nirantchavda/smart-helmet`,
        },
        'nexus-os.txt': {
          type: 'file',
          content: `╔══════════════════════════════════════════╗
║            PROJECT: NEXUS OS             ║
╚══════════════════════════════════════════╝

Type    : Systems / Open Source
Status  : Active 🚀
Tags    : #Rust #OS #Systems #OpenSource

Description:
  NexusOS is a hobby operating system kernel written in Rust,
  exploring modern OS design principles with memory safety
  guarantees. Supports a basic shell, process management,
  and a custom VFS.

Tech Stack:
  ▸ Rust (kernel + userspace)
  ▸ x86_64 assembly (boot)
  ▸ QEMU (emulation)

Highlights:
  ▸ Custom memory allocator
  ▸ Preemptive multitasking
  ▸ 200+ GitHub stars

GitHub: github.com/nirantchavda/nexus-os`,
        },
        'devflow.txt': {
          type: 'file',
          content: `╔══════════════════════════════════════════╗
║           PROJECT: DEVFLOW               ║
╚══════════════════════════════════════════╝

Type    : SaaS / Developer Tool
Status  : Completed ✓
Tags    : #SaaS #DevTools #React #Go

Description:
  DevFlow is a developer productivity platform combining
  code review workflows, automated PR summarisation with
  LLMs, sprint tracking, and team analytics in one place.

Tech Stack:
  ▸ React + TypeScript (frontend)
  ▸ Go + Gin (backend)
  ▸ OpenAI API (PR summaries)
  ▸ PostgreSQL
  ▸ Kubernetes + Helm

Highlights:
  ▸ 500+ active teams
  ▸ 40% faster code review cycle
  ▸ YC W24 applicant (top 5%)

GitHub: github.com/nirantchavda/devflow`,
        },
      },
    },
    'contact.txt': {
      type: 'file',
      content: `╔══════════════════════════════════════════╗
║            HIRE ME / CONTACT             ║
╚══════════════════════════════════════════╝

👨‍💻 Nirant Chavda — Open to opportunities!

Email    : nirant@example.com
LinkedIn : linkedin.com/in/nirantchavda
GitHub   : github.com/nirantchavda
Twitter  : @nirantchavda

I'm available for:
  ▸ Full-time roles (Remote / Hybrid)
  ▸ Freelance projects
  ▸ Open source collaboration
  ▸ Hackathon partnerships

Response time: < 24 hours

"Let's build something remarkable together."`,
    },
  },
};

export function resolvePath(
  currentPath: string[],
  inputPath: string
): string[] | null {
  const parts = inputPath.split('/').filter(Boolean);
  let resolved = inputPath.startsWith('/') ? [] : [...currentPath];

  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (resolved.length > 0) resolved.pop();
    } else {
      resolved.push(part);
    }
  }
  return resolved;
}

export function getNode(path: string[]): FileNode | null {
  let node: FileNode = virtualFS;
  for (const seg of path) {
    if (node.type !== 'dir') return null;
    const child = node.children[seg];
    if (!child) return null;
    node = child;
  }
  return node;
}

export function pathToString(path: string[]): string {
  return '/' + path.join('/');
}
