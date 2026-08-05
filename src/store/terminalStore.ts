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

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;
    const hex = Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function addLine(line: Omit<TerminalLine, 'id' | 'timestamp'>): void {
  setState((s) => ({
    ...s,
    lines: [
      ...s.lines,
      { ...line, id: generateUUID(), timestamp: Date.now() },
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
