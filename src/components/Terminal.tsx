import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { parseCommand } from '../core/parser';
import { getCommand, getCommandNames } from '../core/executor';
import {
  getState,
  setState,
  subscribe,
  addLine,
  pushHistory,
  clearLines,
} from '../store/terminalStore';
import type { TerminalState } from '../store/terminalStore';
import { getNode, resolvePath, pathToString } from '../commands/system/filesystem';
import '../commands/system/commands'; // register all commands

const PROMPT_USER = 'nirant';
const PROMPT_HOST = 'portfolio';

function getPrompt(path: string[]): string {
  const p = pathToString(path);
  return `${PROMPT_USER}@${PROMPT_HOST}:${p === '/' ? '~' : p}$ `;
}

function ansiToSpan(text: string): string {
  // minimal ANSI colour support (cyan dirs)
  return text
    .replace(/\x1b\[36m(.*?)\x1b\[0m/g, '<span class="ansi-cyan">$1</span>')
    .replace(/\x1b\[[0-9;]*m/g, '');
}

const Terminal: React.FC = () => {
  const [state, setStateLocal] = useState<TerminalState>(getState());
  const [input, setInput] = useState('');
  const [histIdx, setHistIdx] = useState(-1);
  const [savedInput, setSavedInput] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Subscribe to store changes
  useEffect(() => {
    const unsub = subscribe((s) => setStateLocal({ ...s }));
    return unsub;
  }, []);

  // Show banner on mount
  useEffect(() => {
    const bannerCmd = getCommand('banner');
    if (bannerCmd) {
      const ctx = {
        state: getState(),
        setState,
      };
      const lines = bannerCmd.execute({ name: 'banner', args: [], flags: {}, raw: 'banner' }, ctx);
      (Array.isArray(lines) ? lines : []).forEach((l) => {
        addLine({ type: 'output', text: (l as { text: string }).text });
      });
    }
    addLine({ type: 'system', text: "Type 'help' for available commands." });
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.lines]);

  // Focus input on click anywhere in terminal
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Add input line to output
      addLine({ type: 'input', text: `${getPrompt(getState().currentPath)}${trimmed}` });
      pushHistory(trimmed);

      // Handle "hack the system" as a special multi-word command
      const hackTheSystem = trimmed.toLowerCase();
      let parsed = parseCommand(trimmed);
      if (hackTheSystem === 'hack the system') {
        parsed = { name: 'hack', args: ['the', 'system'], flags: {}, raw: trimmed };
      }

      const cmd = getCommand(parsed.name);
      if (!cmd) {
        addLine({
          type: 'error',
          text: `command not found: ${parsed.name}\nType 'help' to see available commands.`,
        });
        return;
      }

      const ctx = { state: getState(), setState };

      try {
        const outputs = await Promise.resolve(cmd.execute(parsed, ctx));
        outputs.forEach((out) => {
          const text = out.type === 'html' ? out.html : out.text;
          addLine({ type: out.type === 'error' ? 'error' : 'output', text });
        });
      } catch (err) {
        addLine({ type: 'error', text: `Error: ${String(err)}` });
      }
    },
    []
  );

  // Autocomplete logic
  const computeAutocomplete = useCallback((val: string): string[] => {
    const trimmed = val.trimStart();
    const tokens = trimmed.split(' ');
    if (tokens.length <= 1) {
      // complete command names
      const prefix = tokens[0].toLowerCase();
      return getCommandNames().filter((n) => n.startsWith(prefix)).sort();
    }
    // complete file/dir paths for the last token
    const lastToken = tokens[tokens.length - 1];
    const slashIdx = lastToken.lastIndexOf('/');
    const dirPart = slashIdx >= 0 ? lastToken.slice(0, slashIdx) : '';
    const filePart = slashIdx >= 0 ? lastToken.slice(slashIdx + 1) : lastToken;
    const basePath = dirPart
      ? resolvePath(getState().currentPath, dirPart) ?? getState().currentPath
      : getState().currentPath;
    const node = getNode(basePath);
    if (!node || node.type !== 'dir') return [];
    return Object.keys(node.children)
      .filter((k) => k.startsWith(filePart))
      .map((k) => {
        const fullPath = dirPart ? `${dirPart}/${k}` : k;
        const n = node.children[k];
        return n.type === 'dir' ? fullPath + '/' : fullPath;
      });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const hist = getState().history;

      if (e.key === 'Enter') {
        setAutocompleteOptions([]);
        executeCommand(input);
        setInput('');
        setHistIdx(-1);
        setSavedInput('');
        return;
      }

      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearLines();
        setAutocompleteOptions([]);
        return;
      }

      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        addLine({ type: 'input', text: `${getPrompt(getState().currentPath)}${input}^C` });
        setInput('');
        setHistIdx(-1);
        setSavedInput('');
        setAutocompleteOptions([]);
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const options = computeAutocomplete(input);
        if (options.length === 1) {
          const tokens = input.split(' ');
          tokens[tokens.length - 1] = options[0];
          setInput(tokens.join(' '));
          setAutocompleteOptions([]);
        } else if (options.length > 1) {
          setAutocompleteOptions(options);
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (hist.length === 0) return;
        const newIdx = Math.min(histIdx + 1, hist.length - 1);
        if (histIdx === -1) setSavedInput(input);
        setHistIdx(newIdx);
        setInput(hist[newIdx]);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx === -1) return;
        const newIdx = histIdx - 1;
        setHistIdx(newIdx);
        setInput(newIdx === -1 ? savedInput : hist[newIdx]);
        return;
      }

      // clear autocomplete on any other key
      setAutocompleteOptions([]);
    },
    [input, histIdx, savedInput, executeCommand, computeAutocomplete]
  );

  const themeClass = `theme-${state.theme}`;

  return (
    <div className={`terminal-wrapper ${themeClass}`} onClick={focusInput}>
      <div className="terminal-titlebar">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="titlebar-title">nirantchavda@portfolio</span>
      </div>
      <div className="terminal-body">
        {state.lines.map((line) => (
          <div key={line.id} className={`line line-${line.type}`}>
            {line.type === 'input' ? (
              <span className="line-input-text">{line.text}</span>
            ) : (
              <pre
                className="line-output-text"
                dangerouslySetInnerHTML={{ __html: ansiToSpan(line.text) }}
              />
            )}
          </div>
        ))}

        {/* Active input row */}
        <div className="input-row">
          <span className="prompt">{getPrompt(state.currentPath)}</span>
          <div className="input-container">
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
        </div>

        {/* Autocomplete hint */}
        {autocompleteOptions.length > 1 && (
          <div className="autocomplete-row">
            {autocompleteOptions.map((o) => (
              <span key={o} className="autocomplete-item">{o}</span>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
