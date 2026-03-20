import {
  registerCommand,
  getAllCommands,
  getCommandNames,
} from '../../core/executor';
import { getNode, resolvePath, pathToString } from './filesystem';

// ─── BANNER ──────────────────────────────────────────────────────────────────
registerCommand({
  name: 'banner',
  description: 'Display the ASCII art banner',
  execute: () => [
    {
      type: 'output',
      text: `
 ███╗   ██╗██╗██████╗  █████╗ ███╗   ██╗████████╗
 ████╗  ██║██║██╔══██╗██╔══██╗████╗  ██║╚══██╔══╝
 ██╔██╗ ██║██║██████╔╝███████║██╔██╗ ██║   ██║   
 ██║╚██╗██║██║██╔══██╗██╔══██║██║╚██╗██║   ██║   
 ██║ ╚████║██║██║  ██║██║  ██║██║ ╚████║   ██║   
 ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   
  ██████╗██╗  ██╗ █████╗ ██╗   ██╗██████╗  █████╗ 
 ██╔════╝██║  ██║██╔══██╗██║   ██║██╔══██╗██╔══██╗
 ██║     ███████║███████║██║   ██║██║  ██║███████║
 ██║     ██╔══██║██╔══██║╚██╗ ██╔╝██║  ██║██╔══██║
 ╚██████╗██║  ██║██║  ██║ ╚████╔╝ ██████╔╝██║  ██║
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═════╝ ╚═╝  ╚═╝

 ┌────────────────────────────────────────────────────────┐
 │  Full-Stack Developer  •  Hacker  •  Open-Source Nerd  │
 │  "Code is poetry. Ship it."                            │
 └────────────────────────────────────────────────────────┘

 Type 'help' to see available commands.
 Type 'about' to learn more about me.`,
    },
  ],
});

// ─── HELP ─────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'help',
  description: 'List all available commands',
  aliases: ['?'],
  execute: () => {
    const cmds = getAllCommands().filter((c) => !c.name.startsWith('_'));
    const lines = [
      '┌───────────────────────────────────────────────────────────┐',
      '│                     AVAILABLE COMMANDS                    │',
      '├───────────────────────────────────────────────────────────┤',
    ];
    cmds.forEach((c) => {
      const name = c.name.padEnd(14);
      const usage = c.usage ? ` ${c.usage}` : '';
      lines.push(`│  ${name}  ${c.description.substring(0, 38).padEnd(38)}  │`);
      if (usage) lines.push(`│  ${''.padEnd(14)}  usage: ${usage.trim().substring(0, 34).padEnd(34)}  │`);
    });
    lines.push('└───────────────────────────────────────────────────────────┘');
    lines.push('');
    lines.push('Tip: Use ↑↓ for history, Tab for autocomplete, Ctrl+L to clear.');
    return [{ type: 'output', text: lines.join('\n') }];
  },
});

// ─── ABOUT ────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'about',
  description: 'Show profile information',
  execute: (_p, _ctx) => {
    const node = getNode(['about.txt']);
    if (node?.type === 'file') {
      return [{ type: 'output', text: node.content }];
    }
    return [{ type: 'error', text: 'about.txt not found' }];
  },
});

// ─── SKILLS ───────────────────────────────────────────────────────────────────
registerCommand({
  name: 'skills',
  description: 'List technical skills',
  execute: () => {
    const node = getNode(['skills.txt']);
    if (node?.type === 'file') {
      return [{ type: 'output', text: node.content }];
    }
    return [{ type: 'error', text: 'skills.txt not found' }];
  },
});

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
registerCommand({
  name: 'projects',
  description: 'List projects',
  usage: '[--type=hackathon|ai|iot|systems|saas]',
  execute: (_p) => {
    const typeFilter = typeof _p.flags['type'] === 'string'
      ? (_p.flags['type'] as string).toLowerCase()
      : null;

    const projectsNode = getNode(['projects']);
    if (!projectsNode || projectsNode.type !== 'dir') {
      return [{ type: 'error', text: 'projects directory not found' }];
    }

    const all = [
      {
        file: 'rift-26.txt',
        name: 'RIFT-26',
        desc: 'AI-powered document intelligence platform',
        tags: ['ai', 'hackathon'],
        status: '✓ Completed',
      },
      {
        file: 'smart-helmet.txt',
        name: 'Smart Helmet',
        desc: 'IoT smart helmet with crash detection & GPS',
        tags: ['iot', 'hardware'],
        status: '🔧 In Progress',
      },
      {
        file: 'nexus-os.txt',
        name: 'NexusOS',
        desc: 'Hobby OS kernel written in Rust',
        tags: ['systems', 'rust'],
        status: '🚀 Active',
      },
      {
        file: 'devflow.txt',
        name: 'DevFlow',
        desc: 'Developer productivity SaaS platform',
        tags: ['saas', 'devtools'],
        status: '✓ Completed',
      },
    ];

    const filtered = typeFilter
      ? all.filter((p) => p.tags.some((t) => t === typeFilter))
      : all;

    if (filtered.length === 0) {
      return [{ type: 'error', text: `No projects found with type "${typeFilter}"` }];
    }

    const lines = [
      '┌──────────────────────────────────────────────────────────────┐',
      '│                         PROJECTS                             │',
      '├──────────────────────────────────────────────────────────────┤',
    ];
    filtered.forEach((p) => {
      lines.push(`│  📁 ${p.name.padEnd(16)} ${p.status.padEnd(16)} │`);
      lines.push(`│     ${p.desc.padEnd(57)} │`);
      lines.push(`│     Tags: ${p.tags.join(', ').padEnd(51)} │`);
      lines.push(`│     cat projects/${p.file.padEnd(42)} │`);
      lines.push('├──────────────────────────────────────────────────────────────┤');
    });
    lines[lines.length - 1] = '└──────────────────────────────────────────────────────────────┘';
    lines.push('');
    lines.push("Run 'cat projects/<file>' for full details.");

    return [{ type: 'output', text: lines.join('\n') }];
  },
});

// ─── LS ───────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'ls',
  description: 'List directory contents',
  usage: '[path]',
  execute: (_p, ctx) => {
    const targetPath = _p.args[0]
      ? resolvePath(ctx.state.currentPath, _p.args[0])
      : ctx.state.currentPath;

    if (!targetPath) {
      return [{ type: 'error', text: 'invalid path' }];
    }

    const node = getNode(targetPath);
    if (!node) {
      return [{ type: 'error', text: `ls: ${_p.args[0] ?? '/'}: No such file or directory` }];
    }
    if (node.type === 'file') {
      return [{ type: 'output', text: targetPath[targetPath.length - 1] ?? '/' }];
    }

    const entries = Object.entries(node.children);
    if (entries.length === 0) {
      return [{ type: 'output', text: '(empty directory)' }];
    }

    const out = entries
      .map(([name, n]) => (n.type === 'dir' ? `\x1b[36m${name}/\x1b[0m` : name))
      .join('  ');

    return [{ type: 'output', text: out }];
  },
});

// ─── CD ───────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'cd',
  description: 'Change directory',
  usage: '<path>',
  execute: (_p, ctx) => {
    const target = _p.args[0];
    if (!target || target === '~') {
      ctx.setState((s) => ({ ...s, currentPath: [] }));
      return [];
    }

    const resolved = resolvePath(ctx.state.currentPath, target);
    if (!resolved) {
      return [{ type: 'error', text: `cd: ${target}: Invalid path` }];
    }

    const node = getNode(resolved);
    if (!node) {
      return [{ type: 'error', text: `cd: ${target}: No such file or directory` }];
    }
    if (node.type !== 'dir') {
      return [{ type: 'error', text: `cd: ${target}: Not a directory` }];
    }

    ctx.setState((s) => ({ ...s, currentPath: resolved }));
    return [];
  },
});

// ─── CAT ──────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'cat',
  description: 'Display file contents',
  usage: '<file>',
  execute: (_p, ctx) => {
    const file = _p.args[0];
    if (!file) {
      return [{ type: 'error', text: 'cat: missing file operand' }];
    }

    const resolved = resolvePath(ctx.state.currentPath, file);
    if (!resolved) {
      return [{ type: 'error', text: `cat: ${file}: Invalid path` }];
    }

    const node = getNode(resolved);
    if (!node) {
      return [{ type: 'error', text: `cat: ${file}: No such file or directory` }];
    }
    if (node.type !== 'file') {
      return [{ type: 'error', text: `cat: ${file}: Is a directory` }];
    }

    return [{ type: 'output', text: node.content }];
  },
});

// ─── PWD ──────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'pwd',
  description: 'Print working directory',
  execute: (_p, ctx) => [
    { type: 'output', text: pathToString(ctx.state.currentPath) },
  ],
});

// ─── CLEAR ────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'clear',
  description: 'Clear the terminal',
  aliases: ['cls'],
  execute: (_p, ctx) => {
    ctx.setState((s) => ({ ...s, lines: [] }));
    return [];
  },
});

// ─── HISTORY ──────────────────────────────────────────────────────────────────
registerCommand({
  name: 'history',
  description: 'Show command history',
  execute: (_p, ctx) => {
    if (ctx.state.history.length === 0) {
      return [{ type: 'output', text: 'No history yet.' }];
    }
    const lines = ctx.state.history
      .slice()
      .reverse()
      .map((cmd, i) => `  ${String(i + 1).padStart(3)}  ${cmd}`)
      .join('\n');
    return [{ type: 'output', text: lines }];
  },
});

// ─── DATE ─────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'date',
  description: 'Show current date and time',
  execute: () => [{ type: 'output', text: new Date().toString() }],
});

// ─── HIREME ───────────────────────────────────────────────────────────────────
registerCommand({
  name: 'hireme',
  description: 'Show contact / hire information',
  execute: () => {
    const node = getNode(['contact.txt']);
    if (node?.type === 'file') {
      return [{ type: 'output', text: node.content }];
    }
    return [{ type: 'error', text: 'contact.txt not found' }];
  },
});

// ─── SOCIAL ───────────────────────────────────────────────────────────────────
registerCommand({
  name: 'social',
  description: 'Show social media / profile links',
  execute: () => [
    {
      type: 'output',
      text: `
┌─────────────────────────────────────────────┐
│              FIND ME ONLINE                 │
├─────────────────────────────────────────────┤
│  🐙 GitHub   : github.com/nirantchavda      │
│  💼 LinkedIn : linkedin.com/in/nirantchavda │
│  🐦 Twitter  : @nirantchavda                │
│  📸 Dev.to   : dev.to/nirantchavda          │
│  🌐 Website  : nirantchavda.dev             │
└─────────────────────────────────────────────┘`,
    },
  ],
});

// ─── WHOAMI ───────────────────────────────────────────────────────────────────
registerCommand({
  name: 'whoami',
  description: 'Easter egg: who are you?',
  execute: () => [
    {
      type: 'output',
      text: `
> Identifying user...
> Scanning biometrics...
> Accessing classified database...

  ██╗   ██╗
  ╚██╗ ██╔╝
   ╚████╔╝ 
    ╚██╔╝  
     ██║   
     ╚═╝   

You are: A curious developer who types 'whoami' in a terminal.
         Respect. 🫡

The real question is: who are WE?`,
    },
  ],
});

// ─── SUDO ─────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'sudo',
  description: 'Easter egg: try sudo hireme',
  execute: (_p) => {
    const sub = _p.args[0]?.toLowerCase();
    if (sub === 'hireme') {
      return [
        {
          type: 'output',
          text: `
[sudo] password for nirant: ••••••••
Authenticating...

✅ Access granted. Root-level hire request submitted.

Dear Recruiter/Hiring Manager,

You have been elevated to SUPERUSER privileges.
This means you now have the HIGHEST priority to
reach out and hire Nirant Chavda.

  Email    : nirant@example.com
  LinkedIn : linkedin.com/in/nirantchavda

WARNING: This offer expires in 24h. Act fast! ⚡`,
        },
      ];
    }
    if (sub === 'rm' && _p.args[1] === '-rf' && _p.args[2] === '/') {
      return [
        {
          type: 'output',
          text: `Nice try. This portfolio runs in a sandbox. 😏
No files were harmed in the making of this easter egg.`,
        },
      ];
    }
    return [
      {
        type: 'error',
        text: `sudo: ${_p.args.join(' ') || '(no command)'}: Permission denied\nHint: try 'sudo hireme'`,
      },
    ];
  },
});

// ─── HACK THE SYSTEM ──────────────────────────────────────────────────────────
registerCommand({
  name: 'hack',
  description: 'Easter egg: try to hack the system',
  execute: (_p) => {
    if (_p.args.join(' ').toLowerCase().includes('the system') || _p.args.length === 0) {
      return [
        {
          type: 'output',
          text: `
Initializing hack sequence...
[████████████████████] 100%

> Bypassing firewall...         [DONE]
> Injecting payload...          [DONE]  
> Accessing mainframe...        [DONE]
> Downloading the internet...   [DONE]
> Hacking the Gibson...         [DONE]

Hack complete. You are now root.

Just kidding. This is a portfolio website. 🙃
But if you're this curious, we should talk!
Run 'hireme' or 'sudo hireme' for contact info.`,
        },
      ];
    }
    return [{ type: 'error', text: `hack: command not found. Did you mean 'hack the system'?` }];
  },
});

// ─── MATRIX (hidden) ─────────────────────────────────────────────────────────
registerCommand({
  name: 'matrix',
  description: 'Enter the Matrix',
  execute: (_p, ctx) => {
    ctx.setState((s) => ({ ...s, theme: 'matrix' }));
    return [
      {
        type: 'output',
        text: `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit. 🐇

Theme changed to MATRIX mode.
Type 'theme dark' to return to normal.`,
      },
    ];
  },
});

// ─── THEME (hidden) ──────────────────────────────────────────────────────────
registerCommand({
  name: 'theme',
  description: 'Change terminal theme',
  usage: '<dark|matrix|amber>',
  execute: (_p, ctx) => {
    const t = _p.args[0]?.toLowerCase();
    if (t === 'dark' || t === 'matrix' || t === 'amber') {
      ctx.setState((s) => ({ ...s, theme: t as 'dark' | 'matrix' | 'amber' }));
      return [{ type: 'output', text: `Theme changed to '${t}'.` }];
    }
    return [
      {
        type: 'error',
        text: `theme: unknown theme '${_p.args[0] ?? ''}'. Options: dark, matrix, amber`,
      },
    ];
  },
});

// ─── UPTIME (hidden) ─────────────────────────────────────────────────────────
registerCommand({
  name: 'uptime',
  description: 'Show portfolio uptime',
  execute: () => {
    const now = new Date();
    const launched = new Date('2024-01-01');
    const diffMs = now.getTime() - launched.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return [
      {
        type: 'output',
        text: `Portfolio has been running for ${days} days without a crash.\nLoad average: 0.42 0.42 0.42 (coffee-driven architecture)`,
      },
    ];
  },
});

// ─── NEOFETCH (hidden) ───────────────────────────────────────────────────────
registerCommand({
  name: 'neofetch',
  description: 'System information',
  execute: () => [
    {
      type: 'output',
      text: `
         .                    nirant@portfolio
        /|\\                   ───────────────
       / | \\                  OS: PortfolioOS v3.0 (Vite-based)
      /  |  \\                 Host: GitHub Pages
     /   |   \\                Kernel: React 19.0.0
    /    |    \\               Uptime: Always online
   /_____|_____\\              Shell: Terminal.tsx
                              Resolution: your screen
        [NC]                  Theme: Dark Hacker
                              CPU: Caffeine-powered
   "Building the future,     Memory: Enough for big dreams
    one commit at a time."`,
    },
  ],
});

// ─── ECHO ─────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'echo',
  description: 'Echo text back',
  usage: '<text>',
  execute: (_p) => [{ type: 'output', text: _p.args.join(' ') || '' }],
});

// Expose command names for autocomplete
export { getCommandNames };
