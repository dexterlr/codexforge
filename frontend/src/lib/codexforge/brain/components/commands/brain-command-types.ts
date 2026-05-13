import type { CodexForgeBrainCommandMode } from "../brain-command-center-types";

export type CodexForgeBrainCommandKind =
  | "switch-mode"
  | "open-panel"
  | "focus-target"
  | "open-drilldown"
  | "inspect-health"
  | "inspect-recommendation"
  | "inspect-insight"
  | "inspect-topology"
  | "inspect-lineage"
  | "inspect-replay"
  | "inspect-agent"
  | "inspect-file"
  | "inspect-memory"
  | "inspect-risk"
  | "show-shortcuts"
  | "close-palette";

export type CodexForgeBrainCommandCategory =
  | "navigation"
  | "focus"
  | "graph"
  | "replay"
  | "lineage"
  | "topology"
  | "recommendations"
  | "health"
  | "agents"
  | "files"
  | "memory"
  | "safety"
  | "help";

export type CodexForgeBrainCommandSafety =
  | "read-only"
  | "approval-required"
  | "unavailable";

export type CodexForgeBrainCommand = {
  id: string;
  label: string;
  description: string;
  category: CodexForgeBrainCommandCategory;
  kind: CodexForgeBrainCommandKind;
  safety: CodexForgeBrainCommandSafety;
  shortcut?: string;
  targetMode?: CodexForgeBrainCommandMode;
  targetId?: string;
  keywords?: string[];
  disabledReason?: string;
};

export type CodexForgeBrainCommandGroup = {
  id: CodexForgeBrainCommandCategory;
  label: string;
  commands: CodexForgeBrainCommand[];
};

export type CodexForgeBrainCommandShortcut = {
  id: string;
  label: string;
  description: string;
  category: CodexForgeBrainCommandCategory;
  shortcut: string;
  keys: string[];
  sequence?: string[];
  commandId?: string;
  kind: CodexForgeBrainCommandKind;
};

export type CodexForgeBrainCommandSearchResult = {
  command: CodexForgeBrainCommand;
  score: number;
  matchedText: string;
};

export type CodexForgeBrainCommandRegistryTarget = {
  id: string;
  label: string;
  kind?: string;
  description?: string;
};

export type CodexForgeBrainCommandRegistryInput = {
  activeMode?: CodexForgeBrainCommandMode;
  selectedNodeId?: string | null;
  graphNodeCount?: number;
  graphEdgeCount?: number;
  focusTargets?: CodexForgeBrainCommandRegistryTarget[];
  recommendations?: CodexForgeBrainCommandRegistryTarget[];
  insights?: CodexForgeBrainCommandRegistryTarget[];
  agents?: CodexForgeBrainCommandRegistryTarget[];
  files?: CodexForgeBrainCommandRegistryTarget[];
};

export type CodexForgeBrainCommandPaletteState = {
  isOpen: boolean;
  query: string;
  selectedCommandId?: string;
  history: string[];
};

