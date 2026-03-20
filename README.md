# Nirant Chavda — Terminal Portfolio

A terminal-based portfolio website built with React + TypeScript + Vite that runs entirely in the browser.

## 🚀 Live Demo

Visit: [orpheusdark.github.io](https://orpheusdark.github.io)

## ⌨️ Available Commands

| Command | Description |
|---------|-------------|
| `help` | List all commands |
| `about` | Show profile info |
| `skills` | List technical skills |
| `projects` | List all projects |
| `projects --type=ai` | Filter projects by type |
| `cd projects` | Navigate to projects directory |
| `ls` | List files in current directory |
| `cat <file>` | Read a file |
| `clear` | Clear the terminal |
| `history` | Show command history |
| `hireme` | Show contact info |
| `social` | Show social links |
| `banner` | Show ASCII art banner |
| `pwd` | Print working directory |
| `date` | Show current date/time |
| `whoami` | Easter egg |
| `sudo hireme` | Secret hire mode |
| `hack the system` | Easter egg |
| `theme <dark\|matrix\|amber>` | Change terminal theme |
| `matrix` | Enter the Matrix |
| `neofetch` | System info |
| `uptime` | Portfolio uptime |
| `echo <text>` | Echo text |

## ⌨️ Keyboard Shortcuts

- `↑` / `↓` — Navigate command history
- `Tab` — Autocomplete commands and file paths
- `Ctrl + L` — Clear terminal
- `Ctrl + C` — Cancel current input

## 🏗️ Architecture

```
src/
├── core/
│   ├── parser.ts        # Command parser (name, args, flags)
│   └── executor.ts      # Command registry & types
├── commands/
│   └── system/
│       ├── commands.ts  # All command implementations
│       └── filesystem.ts # Virtual file system
├── components/
│   └── Terminal.tsx     # Main terminal UI component
├── store/
│   └── terminalStore.ts # Simple pub/sub state store
└── index.css            # Dark terminal theme CSS
```

## 🛠️ Development

```bash
npm install
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Lint code
```

## 🚢 Deployment

The site is automatically deployed to GitHub Pages on push to `main` via the workflow in `.github/workflows/deploy.yml`.

## 🎨 Themes

- `dark` (default) — Classic dark terminal with green prompt
- `matrix` — Green text on black (Matrix-style)
- `amber` — Amber/orange retro terminal

Switch themes with: `theme <name>`
