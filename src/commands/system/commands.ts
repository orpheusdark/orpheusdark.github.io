import {
  registerCommand,
  getAllCommands,
  getCommandNames,
} from '../../core/executor';
import { getNode, resolvePath, pathToString } from './filesystem';
import { addLine } from '../../store/terminalStore';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// ─── BANNER ──────────────────────────────────────────────────────────────────
registerCommand({
  name: 'banner',
  description: 'Display the ASCII art banner',
  execute: () => [
    {
      type: 'output',
      text: `
███╗   ██╗██╗██████╗  █████╗ ███╗   ██╗████████╗     ██████╗██╗  ██╗ █████╗ ██╗   ██╗██████╗  █████╗ 
████╗  ██║██║██╔══██╗██╔══██╗████╗  ██║╚══██╔══╝    ██╔════╝██║  ██║██╔══██╗██║   ██║██╔══██╗██╔══██╗
██╔██╗ ██║██║██████╔╝███████║██╔██╗ ██║   ██║       ██║     ███████║███████║██║   ██║██║  ██║███████║
██║╚██╗██║██║██╔══██╗██╔══██║██║╚██╗██║   ██║       ██║     ██╔══██║██╔══██║╚██╗ ██╔╝██║  ██║██╔══██║
██║ ╚████║██║██║  ██║██║  ██║██║ ╚████║   ██║       ╚██████╗██║  ██║██║  ██║ ╚████╔╝ ██████╔╝██║  ██║
╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝        ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═════╝ ╚═╝  ╚═╝
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
 ┌──────────────────────────────────────────────────────────┐
 │  Full-Stack Developer  •  Explorer  •  Open-Source Nerd  │
 │               "Code is poetry. Ship it."                 │
 └──────────────────────────────────────────────────────────┘

`,
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
    const innerWidth = 59;
    const nameWidth = 14;
    const descWidth = innerWidth - 2 - nameWidth - 2;

    const toFixed = (value: string, width: number): string => {
      if (value.length <= width) return value.padEnd(width);
      if (width <= 3) return value.slice(0, width);
      return `${value.slice(0, width - 3)}...`;
    };

    const boxRow = (content: string): string => `│ ${toFixed(content, innerWidth)} │`;

    const lines = [
      `┌${'─'.repeat(innerWidth + 2)}┐`,
      boxRow('AVAILABLE COMMANDS'.padStart(Math.floor((innerWidth + 'AVAILABLE COMMANDS'.length) / 2))),
      `├${'─'.repeat(innerWidth + 2)}┤`,
    ];

    cmds.forEach((c) => {
      const name = toFixed(c.name, nameWidth);
      const usage = c.usage ? ` ${c.usage}` : '';
      const desc = toFixed(c.description, descWidth);
      lines.push(boxRow(`${name}  ${desc}`));
      if (usage) lines.push(boxRow(`${''.padEnd(nameWidth)}  usage: ${usage.trim()}`));
    });

    lines.push(`└${'─'.repeat(innerWidth + 2)}┘`);
    lines.push('');
    lines.push('Tip: Use ↑↓ for history, Tab for autocomplete, Ctrl+L to clear.');
    lines.push("Tip: Run 'gui' to open the GUI portfolio.");
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
        status: 'Completed',
      },
      {
        file: 'smart-helmet.txt',
        name: 'Smart Helmet',
        desc: 'IoT smart helmet with crash detection & GPS',
        tags: ['iot', 'hardware'],
        status: 'In Progress',
      },
      {
        file: 'nexus-os.txt',
        name: 'NexusOS',
        desc: 'Hobby OS kernel written in Rust',
        tags: ['systems', 'rust'],
        status: 'Active',
      },
      {
        file: 'devflow.txt',
        name: 'DevFlow',
        desc: 'Developer productivity SaaS platform',
        tags: ['saas', 'devtools'],
        status: 'Completed',
      },
    ];

    const filtered = typeFilter
      ? all.filter((p) => p.tags.some((t) => t === typeFilter))
      : all;

    if (filtered.length === 0) {
      return [{ type: 'error', text: `No projects found with type "${typeFilter}"` }];
    }

    const innerWidth = 62;
    const title = 'PROJECTS';

    const toFixed = (value: string, width: number): string => {
      if (value.length <= width) return value.padEnd(width);
      if (width <= 3) return value.slice(0, width);
      return `${value.slice(0, width - 3)}...`;
    };

    const boxRow = (content: string): string => `│ ${toFixed(content, innerWidth)} │`;

    const lines = [
      `┌${'─'.repeat(innerWidth + 2)}┐`,
      boxRow(title.padStart(Math.floor((innerWidth + title.length) / 2))),
      `├${'─'.repeat(innerWidth + 2)}┤`,
    ];

    filtered.forEach((p) => {
      lines.push(boxRow(`Project: ${p.name} (${p.status})`));
      lines.push(boxRow(`Desc   : ${p.desc}`));
      lines.push(boxRow(`Tags   : ${p.tags.join(', ')}`));
      lines.push(boxRow(`Open   : cat projects/${p.file}`));
      lines.push(`├${'─'.repeat(innerWidth + 2)}┤`);
    });

    lines[lines.length - 1] = `└${'─'.repeat(innerWidth + 2)}┘`;
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
  execute: () => {
    const width = 61;
    const title = 'FIND ME ONLINE';
    const rows = [
      'GitHub   : https://github.com/orpheusdark',
      'LinkedIn : https://linkedin.com/in/orpheusdark',
      'Dev.to   : https://dev.to/orpheusdark',
      'Website  : https://orpheusdark.github.io',
    ];

    const lines = [
      `┌${'─'.repeat(width + 2)}┐`,
      `│ ${title.padStart(Math.floor((width + title.length) / 2)).padEnd(width)} │`,
      `├${'─'.repeat(width + 2)}┤`,
      ...rows.map((row) => `│ ${row.padEnd(width)} │`),
      `└${'─'.repeat(width + 2)}┘`,
    ];

    return [{ type: 'output', text: `\n${lines.join('\n')}` }];
  },
});

// ─── GUI ─────────────────────────────────────────────────────────────────────
registerCommand({
  name: 'gui',
  description: 'Open GUI portfolio website',
  execute: () => {
    const url = 'https://orpheusdark.github.io/portfolio-gui/';
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    return [{ type: 'output', text: `Opening GUI portfolio: ${url}` }];
  },
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

  Email    : orpheusdark@duck.com
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
  execute: async (_p) => {
    if (_p.args.join(' ').toLowerCase().includes('the system') || _p.args.length === 0) {
      const progressFrames = [
        '[##..................] 10%',
        '[######..............] 30%',
        '[##########..........] 50%',
        '[##############......] 70%',
        '[##################..] 90%',
        '[####################] 100%',
      ];

      const steps = [
        'Bypassing firewall',
        'Injecting payload',
        'Accessing mainframe',
        'Downloading the internet',
        'Hacking the Gibson',
      ];

      addLine({ type: 'output', text: 'Initializing hack sequence...' });
      await sleep(300);

      for (const frame of progressFrames) {
        addLine({ type: 'output', text: frame });
        await sleep(180);
      }

      addLine({ type: 'output', text: '' });

      for (const step of steps) {
        addLine({ type: 'output', text: `> ${step}...` });
        await sleep(420);
        const latency = Math.floor(80 + Math.random() * 420);
        addLine({ type: 'output', text: `  ${step}: [DONE] (${latency}ms)` });
        await sleep(160);
      }

      addLine({ type: 'output', text: '' });
      addLine({ type: 'output', text: 'Hack complete. You are now root.' });
      await sleep(350);
      addLine({ type: 'output', text: '' });
      addLine({ type: 'output', text: 'Just kidding. This is a portfolio website.' });
      addLine({ type: 'output', text: "But if you're this curious, we should talk!" });
      addLine({ type: 'output', text: "Run 'hireme' or 'sudo hireme' for contact info." });
      return [];
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
  text: `   _  _______ ____  ____
  / |/ / ___// __ \/ __/
 /    / /___/ /_/ /\ \  
/_/|_/\___(_)____/___/  
                         
                        
        nirant@portfolio
        ───────────────
        OS: NirantOS v2.6.5
        Host: GitHub Pages
        Kernel: React 19.0.0
        Uptime: Always online
        Shell: Terminal.tsx
        Resolution: your screen
        Theme: Dark
        CPU: Caffeine-powered
        Memory: Enough for big dreams

   "Building the future,
    one commit at a time."
`,
}
  ],
});

// Expose command names for autocomplete
export { getCommandNames };
