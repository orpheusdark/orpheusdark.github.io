export interface ParsedCommand {
  name: string;
  args: string[];
  flags: Record<string, string | boolean>;
  raw: string;
}

export function parseCommand(input: string): ParsedCommand {
  const raw = input.trim();
  const tokens = raw.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [];

  const name = tokens[0]?.toLowerCase() ?? '';
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i].replace(/^["']|["']$/g, '');
    if (token.startsWith('--')) {
      const eqIdx = token.indexOf('=');
      if (eqIdx !== -1) {
        flags[token.slice(2, eqIdx)] = token.slice(eqIdx + 1);
      } else {
        flags[token.slice(2)] = true;
      }
    } else if (token.startsWith('-') && token.length === 2) {
      flags[token.slice(1)] = true;
    } else {
      args.push(token);
    }
  }

  return { name, args, flags, raw };
}
