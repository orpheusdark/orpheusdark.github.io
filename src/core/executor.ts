import type { ParsedCommand } from './parser';
import type { TerminalState } from '../store/terminalStore';

export type OutputLine =
  | { type: 'output'; text: string }
  | { type: 'error'; text: string }
  | { type: 'html'; html: string };

export interface CommandContext {
  state: TerminalState;
  setState: (updater: (s: TerminalState) => TerminalState) => void;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (
    parsed: ParsedCommand,
    ctx: CommandContext
  ) => OutputLine[] | Promise<OutputLine[]>;
}

const registry = new Map<string, Command>();

export function registerCommand(cmd: Command): void {
  registry.set(cmd.name, cmd);
  (cmd.aliases ?? []).forEach((alias) => registry.set(alias, cmd));
}

export function getCommand(name: string): Command | undefined {
  return registry.get(name.toLowerCase());
}

export function getAllCommands(): Command[] {
  const seen = new Set<string>();
  const cmds: Command[] = [];
  for (const cmd of registry.values()) {
    if (!seen.has(cmd.name)) {
      seen.add(cmd.name);
      cmds.push(cmd);
    }
  }
  return cmds.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCommandNames(): string[] {
  return [...new Set(registry.keys())];
}
