import type { CodexForgeBrainCommandMode } from "../brain-command-center-types";
import type {
  CodexForgeBrainCommand,
  CodexForgeBrainCommandCategory,
  CodexForgeBrainCommandGroup,
  CodexForgeBrainCommandKind,
  CodexForgeBrainCommandRegistryInput,
  CodexForgeBrainCommandRegistryTarget,
  CodexForgeBrainCommandSafety,
} from "./brain-command-types";

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

const CATEGORY_ORDER: readonly CodexForgeBrainCommandCategory[] = [
  "navigation",
  "focus",
  "graph",
  "replay",
  "lineage",
  "topology",
  "recommendations",
  "health",
  "agents",
  "files",
  "memory",
  "safety",
  "help",
] as const;

const PHASE_6G_MODE_DEFINITIONS: ReadonlyArray<{
  mode: CodexForgeBrainCommandMode;
  label: string;
  description: string;
  shortcut?: string;
  keywords: string[];
}> = [
  {
    mode: "graph",
    label: "Jump to Graph",
    description: "Open the preserved graph and inspector navigation surface.",
    shortcut: "G then G",
    keywords: ["nodes", "edges", "inspector", "overview"],
  },
  {
    mode: "memory",
    label: "Jump to Memory",
    description: "Open cognitive memory clusters and promoted memory signals.",
    shortcut: "G then M",
    keywords: ["clusters", "memory", "signals"],
  },
  {
    mode: "risk",
    label: "Jump to Risk",
    description: "Open risk posture and approval boundary inspection.",
    shortcut: "G then R",
    keywords: ["risks", "approval", "safety", "boundaries"],
  },
  {
    mode: "prediction",
    label: "Jump to Prediction",
    description: "Open predictive context, likely files, risks, and task focus.",
    shortcut: "G then P",
    keywords: ["predictive context", "next files", "forecast"],
  },
  {
    mode: "agents",
    label: "Jump to Agents",
    description: "Open read-only agent runtime lanes and review gates.",
    shortcut: "G then A",
    keywords: ["agent runtime", "review", "handoff"],
  },
  {
    mode: "replay",
    label: "Jump to Replay",
    description: "Open read-only runtime replay frames and lanes.",
    shortcut: "G then E",
    keywords: ["events", "frames", "playback"],
  },
  {
    mode: "lineage",
    label: "Jump to Lineage",
    description: "Open execution, memory, and agent lineage views.",
    shortcut: "G then L",
    keywords: ["handoff", "execution", "memory lineage"],
  },
  {
    mode: "semantic-heatmap",
    label: "Jump to Semantic Heatmap",
    description: "Open cognitive weight and hotspot heatmap inspection.",
    keywords: ["heatmap", "hotspots", "semantic"],
  },
  {
    mode: "knowledge-topology",
    label: "Jump to Knowledge Topology",
    description: "Open deterministic cluster topology and weighted relations.",
    shortcut: "G then T",
    keywords: ["topology", "clusters", "relations"],
  },
  {
    mode: "recommendations",
    label: "Jump to Recommendations",
    description: "Open read-only runtime recommendations and next attention.",
    keywords: ["recommendations", "next action", "attention"],
  },
  {
    mode: "insight-queue",
    label: "Jump to Insight Queue",
    description: "Open autonomous read-only insight queue grouped by severity.",
    keywords: ["insights", "queue", "severity"],
  },
  {
    mode: "runtime-health",
    label: "Jump to Runtime Health",
    description: "Open runtime health, diagnostics, contract, and readiness.",
    shortcut: "G then H",
    keywords: ["health", "diagnostics", "contract"],
  },
  {
    mode: "system-status",
    label: "Jump to System Status",
    description: "Open subsystem readiness, smoke coverage, and safety posture.",
    shortcut: "G then S",
    keywords: ["status", "subsystems", "smoke", "coverage"],
  },
  {
    mode: "focus-mode",
    label: "Jump to Focus Mode",
    description: "Open cognitive focus target, lenses, and neighborhood highlights.",
    shortcut: "G then F",
    keywords: ["focus", "lenses", "target"],
  },
  {
    mode: "drilldown",
    label: "Jump to Drilldown",
    description: "Open read-only drilldown paths across cognitive surfaces.",
    shortcut: "G then D",
    keywords: ["drilldown", "paths", "navigation"],
  },
] as const;

const LEGACY_PANEL_DEFINITIONS: ReadonlyArray<{
  mode: CodexForgeBrainCommandMode;
  label: string;
  description: string;
  category: CodexForgeBrainCommandCategory;
  keywords: string[];
}> = [
  {
    mode: "tasks",
    label: "Open Tasks Panel",
    description: "Inspect task and plan focus from the canonical graph.",
    category: "navigation",
    keywords: ["tasks", "plans", "work"],
  },
  {
    mode: "concepts",
    label: "Open Concepts Panel",
    description: "Inspect concept, decision, and synthesis surfaces.",
    category: "navigation",
    keywords: ["concepts", "decisions", "synthesis"],
  },
  {
    mode: "executions",
    label: "Open Executions Panel",
    description: "Inspect run and diff execution signals.",
    category: "navigation",
    keywords: ["runs", "diffs", "execution"],
  },
  {
    mode: "architecture",
    label: "Open Architecture Panel",
    description: "Inspect subsystem and retrieval-oriented graph context.",
    category: "graph",
    keywords: ["architecture", "subsystems", "retrieval"],
  },
  {
    mode: "timeline",
    label: "Open Timeline Panel",
    description: "Inspect deterministic runtime timeline rows.",
    category: "replay",
    keywords: ["timeline", "runtime", "events"],
  },
  {
    mode: "knowledge-clusters",
    label: "Open Knowledge Clusters Panel",
    description: "Inspect memory cluster summaries and high-confidence concepts.",
    category: "memory",
    keywords: ["knowledge clusters", "memory", "concepts"],
  },
] as const;

function categoryRank(category: CodexForgeBrainCommandCategory): number {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

function compareText(left: string, right: string): number {
  return left.localeCompare(right, "en", { sensitivity: "base" });
}

function compareCommands(
  left: CodexForgeBrainCommand,
  right: CodexForgeBrainCommand
): number {
  return (
    categoryRank(left.category) - categoryRank(right.category) ||
    compareText(left.label, right.label) ||
    compareText(left.id, right.id)
  );
}

function buildCommand(input: {
  id: string;
  label: string;
  description: string;
  category: CodexForgeBrainCommandCategory;
  kind: CodexForgeBrainCommandKind;
  safety?: CodexForgeBrainCommandSafety;
  shortcut?: string;
  targetMode?: CodexForgeBrainCommandMode;
  targetId?: string;
  keywords?: string[];
  disabledReason?: string;
}): CodexForgeBrainCommand {
  return {
    id: input.id,
    label: input.label,
    description: input.description,
    category: input.category,
    kind: input.kind,
    safety: input.safety ?? "read-only",
    shortcut: input.shortcut,
    targetMode: input.targetMode,
    targetId: input.targetId,
    keywords: input.keywords ?? [],
    disabledReason: input.disabledReason,
  };
}

function hasGraphData(input?: CodexForgeBrainCommandRegistryInput): boolean {
  return (input?.graphNodeCount ?? 0) > 0;
}

function describeTarget(target: CodexForgeBrainCommandRegistryTarget): string {
  if (target.description?.trim()) {
    return target.description.trim();
  }

  return target.kind ? `${target.kind} target ${target.label}` : target.label;
}

function sortTargets(
  targets: readonly CodexForgeBrainCommandRegistryTarget[] | undefined
): CodexForgeBrainCommandRegistryTarget[] {
  return [...(targets ?? [])].sort(
    (left, right) =>
      compareText(left.label, right.label) ||
      compareText(left.kind ?? "", right.kind ?? "") ||
      compareText(left.id, right.id)
  );
}

export function buildBrainModeCommands(): CodexForgeBrainCommand[] {
  const canonical = PHASE_6G_MODE_DEFINITIONS.map((definition) =>
    buildCommand({
      id: `brain.mode.${definition.mode}`,
      label: definition.label,
      description: definition.description,
      category: "navigation",
      kind: "switch-mode",
      safety: "read-only",
      shortcut: definition.shortcut,
      targetMode: definition.mode,
      keywords: ["mode", "jump", ...definition.keywords],
    })
  );

  const legacyPanels = LEGACY_PANEL_DEFINITIONS.map((definition) =>
    buildCommand({
      id: `brain.panel.${definition.mode}`,
      label: definition.label,
      description: definition.description,
      category: definition.category,
      kind: "open-panel",
      safety: "read-only",
      targetMode: definition.mode,
      keywords: ["panel", "open", ...definition.keywords],
    })
  );

  return [...canonical, ...legacyPanels].sort(compareCommands);
}

export function buildBrainFocusCommands(
  input: CodexForgeBrainCommandRegistryInput = {}
): CodexForgeBrainCommand[] {
  const targets = sortTargets(input.focusTargets).slice(0, 8);
  const selectedTarget =
    targets.find((target) => target.id === input.selectedNodeId) ?? targets[0] ?? null;
  const commands: CodexForgeBrainCommand[] = [
    buildCommand({
      id: "brain.focus.open-selected",
      label: "Open Selected Focus Target",
      description: selectedTarget
        ? `Open focus mode for ${selectedTarget.label}.`
        : "Open focus mode for the selected graph node.",
      category: "focus",
      kind: "focus-target",
      safety: selectedTarget ? "read-only" : "unavailable",
      targetMode: "focus-mode",
      targetId: selectedTarget?.id,
      keywords: ["focus", "selected", "target", selectedTarget?.kind ?? ""],
      disabledReason: selectedTarget ? undefined : "Select a graph node to focus.",
    }),
    buildCommand({
      id: "brain.drilldown.open-selected",
      label: "Open Drilldown for Selected Target",
      description: selectedTarget
        ? `Open drilldown paths for ${selectedTarget.label}.`
        : "Open drilldown paths for the selected graph node.",
      category: "focus",
      kind: "open-drilldown",
      safety: selectedTarget ? "read-only" : "unavailable",
      targetMode: "drilldown",
      targetId: selectedTarget?.id,
      keywords: ["drilldown", "selected", "paths", selectedTarget?.kind ?? ""],
      disabledReason: selectedTarget ? undefined : "Select a graph node to drill down.",
    }),
  ];

  for (const target of targets) {
    commands.push(
      buildCommand({
        id: `brain.focus.target.${target.id}`,
        label: `Focus ${target.label}`,
        description: `Jump to read-only focus mode for ${describeTarget(target)}.`,
        category: "focus",
        kind: "focus-target",
        safety: "read-only",
        targetMode: "focus-mode",
        targetId: target.id,
        keywords: ["focus", "target", target.kind ?? "", target.id],
      }),
      buildCommand({
        id: `brain.drilldown.target.${target.id}`,
        label: `Drill Into ${target.label}`,
        description: `Open read-only drilldown navigation for ${describeTarget(target)}.`,
        category: "focus",
        kind: "open-drilldown",
        safety: "read-only",
        targetMode: "drilldown",
        targetId: target.id,
        keywords: ["drilldown", "path", target.kind ?? "", target.id],
      })
    );
  }

  return commands.sort(compareCommands);
}

export function buildBrainInspectionCommands(
  input: CodexForgeBrainCommandRegistryInput = {}
): CodexForgeBrainCommand[] {
  const graphUnavailable = hasGraphData(input) ? undefined : "Graph data is not loaded yet.";
  const commands: CodexForgeBrainCommand[] = [
    buildCommand({
      id: "brain.inspect.graph",
      label: "Inspect Graph Overview",
      description: "Open the preserved graph view and graph inspector context.",
      category: "graph",
      kind: "open-panel",
      safety: "read-only",
      targetMode: "graph",
      keywords: ["graph", "nodes", "edges", "inspector"],
    }),
    buildCommand({
      id: "brain.inspect.memory",
      label: "Inspect Memory Signals",
      description: "Open memory clusters and promoted memory context.",
      category: "memory",
      kind: "inspect-memory",
      safety: "read-only",
      targetMode: "memory",
      keywords: ["memory", "clusters", "signals"],
    }),
    buildCommand({
      id: "brain.memory.review-promotion-gate",
      label: "Review Memory Promotion Gate",
      description: "Open /memory-inbox mentally as the explicit approval gate for memory.promoted request previews; read-only command, no mutation.",
      category: "memory",
      kind: "inspect-memory",
      safety: "read-only",
      targetMode: "memory",
      keywords: ["memory promotion gate", "approval", "memory.promoted", "inbox"],
    }),
    buildCommand({
      id: "brain.memory.copy-promotion-review-prompt",
      label: "Copy Memory Promotion Review Prompt",
      description: "Copy-only prompt pattern for reviewing promotion gate approval, policy, event preview, and blocked execution bridge.",
      category: "memory",
      kind: "inspect-memory",
      safety: "read-only",
      targetMode: "memory",
      keywords: ["copy", "memory promotion review prompt", "no mutation"],
    }),
    buildCommand({
      id: "brain.inspect.risk",
      label: "Inspect Risk Posture",
      description: "Open schema, mutation, approval, and stale context risks.",
      category: "safety",
      kind: "inspect-risk",
      safety: "read-only",
      targetMode: "risk",
      keywords: ["risk", "approval", "safety"],
    }),
    buildCommand({
      id: "brain.inspect.agent-runtime",
      label: "Inspect Agent Runtime",
      description: "Open read-only agent lanes, gates, and approval boundaries.",
      category: "agents",
      kind: "inspect-agent",
      safety: "read-only",
      targetMode: "agents",
      keywords: ["agents", "runtime", "review", "handoff"],
    }),
    buildCommand({
      id: "brain.inspect.file-prediction",
      label: "Inspect File Prediction Surface",
      description: "Open predictive file, risk, and context signals without changing Files UX.",
      category: "files",
      kind: "inspect-file",
      safety: "read-only",
      targetMode: "prediction",
      keywords: ["files", "prediction", "context"],
    }),
    buildCommand({
      id: "brain.inspect.replay",
      label: "Inspect Replay Frames",
      description: "Open event replay, graph frames, lanes, and highlights.",
      category: "replay",
      kind: "inspect-replay",
      safety: "read-only",
      targetMode: "replay",
      keywords: ["replay", "frames", "events"],
    }),
    buildCommand({
      id: "brain.inspect.lineage",
      label: "Inspect Runtime Lineage",
      description: "Open execution, memory, concept, failure, recovery, and agent lineage.",
      category: "lineage",
      kind: "inspect-lineage",
      safety: "read-only",
      targetMode: "lineage",
      keywords: ["lineage", "execution", "memory", "agent"],
    }),
    buildCommand({
      id: "brain.inspect.heatmap",
      label: "Inspect Semantic Heatmap",
      description: "Open the cognitive heatmap for weighted semantic signals.",
      category: "topology",
      kind: "inspect-topology",
      safety: "read-only",
      targetMode: "semantic-heatmap",
      keywords: ["heatmap", "semantic", "topology"],
    }),
    buildCommand({
      id: "brain.inspect.topology",
      label: "Inspect Knowledge Topology",
      description: "Open cluster topology, weighted relations, and hotspots.",
      category: "topology",
      kind: "inspect-topology",
      safety: "read-only",
      targetMode: "knowledge-topology",
      keywords: ["knowledge", "topology", "clusters"],
    }),
    buildCommand({
      id: "brain.inspect.recommendations",
      label: "Inspect Recommendations",
      description: "Open deterministic read-only runtime recommendations.",
      category: "recommendations",
      kind: "inspect-recommendation",
      safety: "read-only",
      targetMode: "recommendations",
      keywords: ["recommendations", "next action", "attention"],
    }),
    buildCommand({
      id: "brain.inspect.insights",
      label: "Inspect Insight Queue",
      description: "Open read-only insights grouped by severity, kind, and status.",
      category: "recommendations",
      kind: "inspect-insight",
      safety: "read-only",
      targetMode: "insight-queue",
      keywords: ["insight", "queue", "severity"],
    }),
    buildCommand({
      id: "brain.inspect.runtime-health",
      label: "Inspect Runtime Health",
      description: "Open health score, diagnostics, contract, and safe next steps.",
      category: "health",
      kind: "inspect-health",
      safety: "read-only",
      targetMode: "runtime-health",
      keywords: ["health", "diagnostics", "contract"],
    }),
    buildCommand({
      id: "brain.inspect.system-status",
      label: "Inspect System Status",
      description: "Open subsystem readiness, smoke coverage, and safety posture.",
      category: "health",
      kind: "inspect-health",
      safety: "read-only",
      targetMode: "system-status",
      keywords: ["system", "status", "subsystems", "smoke"],
    }),
    buildCommand({
      id: "brain.safety.approval-boundary",
      label: "Review Approval Boundary",
      description: "Discover commands that require explicit approval outside Phase 6G.",
      category: "safety",
      kind: "open-panel",
      safety: "approval-required",
      targetMode: "system-status",
      keywords: ["approval", "boundary", "safety"],
      disabledReason: "Approval-gated actions are discoverable only in this phase.",
    }),
    buildCommand({
      id: "brain.help.shortcuts",
      label: "Show Keyboard Shortcuts",
      description: "Open keyboard shortcut help for Brain navigation.",
      category: "help",
      kind: "show-shortcuts",
      safety: "read-only",
      shortcut: "?",
      keywords: ["help", "keyboard", "shortcuts"],
    }),
    buildCommand({
      id: "brain.help.close-palette",
      label: "Close Command Palette",
      description: "Close overlays and return to the Brain command center.",
      category: "help",
      kind: "close-palette",
      safety: "read-only",
      shortcut: "Escape",
      keywords: ["close", "escape", "overlay"],
    }),
  ];

  if (graphUnavailable) {
    commands.push(
      buildCommand({
        id: "brain.inspect.graph-data-unavailable",
        label: "Graph Data Unavailable",
        description: "Graph-dependent commands remain disabled until graph data loads.",
        category: "graph",
        kind: "open-panel",
        safety: "unavailable",
        targetMode: "graph",
        keywords: ["graph", "unavailable", "loading"],
        disabledReason: graphUnavailable,
      })
    );
  }

  for (const recommendation of sortTargets(input.recommendations).slice(0, 5)) {
    commands.push(
      buildCommand({
        id: `brain.recommendation.${recommendation.id}`,
        label: `Open Recommendation: ${recommendation.label}`,
        description: `Open recommendations with ${describeTarget(recommendation)} in context.`,
        category: "recommendations",
        kind: "inspect-recommendation",
        safety: "read-only",
        targetMode: "recommendations",
        targetId: recommendation.id,
        keywords: ["recommendation", recommendation.kind ?? "", recommendation.id],
      })
    );
  }

  for (const insight of sortTargets(input.insights).slice(0, 5)) {
    commands.push(
      buildCommand({
        id: `brain.insight.${insight.id}`,
        label: `Open Insight: ${insight.label}`,
        description: `Open insight queue with ${describeTarget(insight)} in context.`,
        category: "recommendations",
        kind: "inspect-insight",
        safety: "read-only",
        targetMode: "insight-queue",
        targetId: insight.id,
        keywords: ["insight", insight.kind ?? "", insight.id],
      })
    );
  }

  return commands.sort(compareCommands);
}

export function buildBrainCommandRegistry(
  input: CodexForgeBrainCommandRegistryInput = {}
): CodexForgeBrainCommand[] {
  const byId = new Map<string, CodexForgeBrainCommand>();

  for (const command of [
    ...buildBrainModeCommands(),
    ...buildBrainFocusCommands(input),
    ...buildBrainInspectionCommands(input),
  ]) {
    byId.set(command.id, command);
  }

  return Array.from(byId.values()).sort(compareCommands);
}

export function groupBrainCommands(
  commands: readonly CodexForgeBrainCommand[]
): CodexForgeBrainCommandGroup[] {
  const groups = new Map<CodexForgeBrainCommandCategory, CodexForgeBrainCommand[]>();

  for (const command of [...commands].sort(compareCommands)) {
    const current = groups.get(command.category) ?? [];
    current.push(command);
    groups.set(command.category, current);
  }

  return Array.from(groups.entries())
    .sort(([left], [right]) => categoryRank(left) - categoryRank(right))
    .map(([category, groupCommands]) => ({
      id: category,
      label: CATEGORY_LABELS[category],
      commands: groupCommands,
    }));
}
