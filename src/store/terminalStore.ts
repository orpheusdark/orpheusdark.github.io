export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
  timestamp: number;
}

export interface TerminalState {
  lines: TerminalLine[];
  history: string[];
  historyIndex: number;
  currentPath: string[];
  theme: 'dark' | 'matrix' | 'amber';
}

export const initialState: TerminalState = {
  lines: [],
  history: [],
  historyIndex: -1,
  currentPath: [],
  theme: 'dark',
};

let _state: TerminalState = { ...initialState };
const listeners: Array<(s: TerminalState) => void> = [];

export function getState(): TerminalState {
  return _state;
}

export function setState(updater: (s: TerminalState) => TerminalState): void {
  _state = updater(_state);
  listeners.forEach((fn) => fn(_state));
}

export function subscribe(fn: (s: TerminalState) => void): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function addLine(line: Omit<TerminalLine, 'id' | 'timestamp'>): void {
  setState((s) => ({
    ...s,
    lines: [
      ...s.lines,
      { ...line, id: crypto.randomUUID(), timestamp: Date.now() },
    ],
  }));
}

export function clearLines(): void {
  setState((s) => ({ ...s, lines: [] }));
}

export function pushHistory(cmd: string): void {
  if (!cmd.trim()) return;
  setState((s) => ({
    ...s,
    history: [cmd, ...s.history.filter((h) => h !== cmd)].slice(0, 100),
    historyIndex: -1,
  }));
}
