import type {
  CodexForgeBrainCommandCategory,
  CodexForgeBrainCommandShortcut,
} from "./brain-command-types";

type KeyboardShortcutEvent = Pick<
  KeyboardEvent,
  "key" | "ctrlKey" | "metaKey" | "altKey" | "shiftKey"
>;

const SHORTCUTS: readonly CodexForgeBrainCommandShortcut[] = [
  {
    id: "shortcut.palette.ctrl-k",
    label: "Open command palette",
    description: "Open Brain command search with a control key chord.",
    category: "navigation",
    shortcut: "Ctrl+K",
    keys: ["Control", "K"],
    commandId: "brain.palette.open",
    kind: "open-panel",
  },
  {
    id: "shortcut.palette.cmd-k",
    label: "Open command palette",
    description: "Open Brain command search with a command key chord.",
    category: "navigation",
    shortcut: "Cmd+K",
    keys: ["Meta", "K"],
    commandId: "brain.palette.open",
    kind: "open-panel",
  },
  {
    id: "shortcut.help.question",
    label: "Show shortcuts",
    description: "Open Brain keyboard shortcut help.",
    category: "help",
    shortcut: "?",
    keys: ["?"],
    commandId: "brain.help.shortcuts",
    kind: "show-shortcuts",
  },
  {
    id: "shortcut.graph",
    label: "Graph",
    description: "Jump to the preserved graph surface.",
    category: "navigation",
    shortcut: "G then G",
    keys: ["G", "G"],
    sequence: ["G", "G"],
    commandId: "brain.mode.graph",
    kind: "switch-mode",
  },
  {
    id: "shortcut.memory",
    label: "Memory",
    description: "Jump to cognitive memory.",
    category: "navigation",
    shortcut: "G then M",
    keys: ["G", "M"],
    sequence: ["G", "M"],
    commandId: "brain.mode.memory",
    kind: "switch-mode",
  },
  {
    id: "shortcut.risk",
    label: "Risk",
    description: "Jump to risk posture.",
    category: "safety",
    shortcut: "G then R",
    keys: ["G", "R"],
    sequence: ["G", "R"],
    commandId: "brain.mode.risk",
    kind: "switch-mode",
  },
  {
    id: "shortcut.prediction",
    label: "Prediction",
    description: "Jump to predictive context.",
    category: "navigation",
    shortcut: "G then P",
    keys: ["G", "P"],
    sequence: ["G", "P"],
    commandId: "brain.mode.prediction",
    kind: "switch-mode",
  },
  {
    id: "shortcut.agents",
    label: "Agents",
    description: "Jump to agent runtime lanes.",
    category: "agents",
    shortcut: "G then A",
    keys: ["G", "A"],
    sequence: ["G", "A"],
    commandId: "brain.mode.agents",
    kind: "switch-mode",
  },
  {
    id: "shortcut.focus",
    label: "Focus mode",
    description: "Jump to cognitive focus mode.",
    category: "focus",
    shortcut: "G then F",
    keys: ["G", "F"],
    sequence: ["G", "F"],
    commandId: "brain.mode.focus-mode",
    kind: "switch-mode",
  },
  {
    id: "shortcut.drilldown",
    label: "Drilldown",
    description: "Jump to cognitive drilldown paths.",
    category: "focus",
    shortcut: "G then D",
    keys: ["G", "D"],
    sequence: ["G", "D"],
    commandId: "brain.mode.drilldown",
    kind: "switch-mode",
  },
  {
    id: "shortcut.runtime-health",
    label: "Runtime health",
    description: "Jump to runtime health.",
    category: "health",
    shortcut: "G then H",
    keys: ["G", "H"],
    sequence: ["G", "H"],
    commandId: "brain.mode.runtime-health",
    kind: "switch-mode",
  },
  {
    id: "shortcut.system-status",
    label: "System status",
    description: "Jump to system status.",
    category: "health",
    shortcut: "G then S",
    keys: ["G", "S"],
    sequence: ["G", "S"],
    commandId: "brain.mode.system-status",
    kind: "switch-mode",
  },
  {
    id: "shortcut.topology",
    label: "Topology",
    description: "Jump to knowledge topology.",
    category: "topology",
    shortcut: "G then T",
    keys: ["G", "T"],
    sequence: ["G", "T"],
    commandId: "brain.mode.knowledge-topology",
    kind: "switch-mode",
  },
  {
    id: "shortcut.lineage",
    label: "Lineage",
    description: "Jump to runtime lineage.",
    category: "lineage",
    shortcut: "G then L",
    keys: ["G", "L"],
    sequence: ["G", "L"],
    commandId: "brain.mode.lineage",
    kind: "switch-mode",
  },
  {
    id: "shortcut.replay",
    label: "Replay",
    description: "Jump to runtime replay.",
    category: "replay",
    shortcut: "G then E",
    keys: ["G", "E"],
    sequence: ["G", "E"],
    commandId: "brain.mode.replay",
    kind: "switch-mode",
  },
  {
    id: "shortcut.escape",
    label: "Close overlays",
    description: "Close command palette or shortcut help.",
    category: "safety",
    shortcut: "Escape",
    keys: ["Escape"],
    commandId: "brain.help.close-palette",
    kind: "close-palette",
  },
] as const;

const CATEGORY_LABELS: Record<CodexForgeBrainCommandCategory, string> = {
  navigation: "Navigation",
  focus: "Focus",
  graph: "Graph",
  replay: "Replay",
  lineage: "Lineage",
  topology: "Topology",
  recommendations: "Recommendations",
  health: "Health",
  agents: "Agents",
  files: "Files",
  memory: "Memory",
  safety: "Safety",
  help: "Help",
};

function normalizeKey(key: string): string {
  if (key.length === 1) return key.toUpperCase();
  return key;
}

function hasOnlyExpectedModifier(
  event: KeyboardShortcutEvent,
  expected: "ctrl" | "meta" | "none"
): boolean {
  if (event.altKey) return false;
  if (expected === "ctrl") return event.ctrlKey && !event.metaKey;
  if (expected === "meta") return event.metaKey && !event.ctrlKey;
  return !event.ctrlKey && !event.metaKey;
}

export function getBrainKeyboardShortcuts(): CodexForgeBrainCommandShortcut[] {
  return [...SHORTCUTS];
}

export function matchBrainKeyboardShortcut(
  event: KeyboardShortcutEvent,
  pendingKey: string | null = null
): CodexForgeBrainCommandShortcut | null {
  const key = normalizeKey(event.key);

  if (key === "K" && hasOnlyExpectedModifier(event, "ctrl")) {
    return SHORTCUTS.find((shortcut) => shortcut.shortcut === "Ctrl+K") ?? null;
  }

  if (key === "K" && hasOnlyExpectedModifier(event, "meta")) {
    return SHORTCUTS.find((shortcut) => shortcut.shortcut === "Cmd+K") ?? null;
  }

  if (key === "Escape" && hasOnlyExpectedModifier(event, "none")) {
    return SHORTCUTS.find((shortcut) => shortcut.shortcut === "Escape") ?? null;
  }

  if (key === "?" && !event.ctrlKey && !event.metaKey && !event.altKey) {
    return SHORTCUTS.find((shortcut) => shortcut.shortcut === "?") ?? null;
  }

  if (pendingKey === "G" && !event.ctrlKey && !event.metaKey && !event.altKey) {
    return (
      SHORTCUTS.find(
        (shortcut) =>
          shortcut.sequence?.length === 2 &&
          shortcut.sequence[0] === "G" &&
          shortcut.sequence[1] === key
      ) ?? null
    );
  }

  return null;
}

export function formatBrainKeyboardShortcut(
  shortcut: CodexForgeBrainCommandShortcut
): string {
  return shortcut.shortcut;
}

export function summarizeBrainKeyboardShortcuts(): Array<{
  category: CodexForgeBrainCommandCategory;
  label: string;
  shortcuts: CodexForgeBrainCommandShortcut[];
}> {
  const groups = new Map<CodexForgeBrainCommandCategory, CodexForgeBrainCommandShortcut[]>();

  for (const shortcut of SHORTCUTS) {
    const current = groups.get(shortcut.category) ?? [];
    current.push(shortcut);
    groups.set(shortcut.category, current);
  }

  return Array.from(groups.entries()).map(([category, shortcuts]) => ({
    category,
    label: CATEGORY_LABELS[category],
    shortcuts: [...shortcuts].sort((left, right) =>
      left.shortcut.localeCompare(right.shortcut, "en", { sensitivity: "base" })
    ),
  }));
}

