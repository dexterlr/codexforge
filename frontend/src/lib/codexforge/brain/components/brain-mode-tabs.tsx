"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainCommandCenterPanel,
  CodexForgeBrainCommandMode,
} from "./brain-command-center-types";

export const BRAIN_COMMAND_CENTER_MODES: readonly CodexForgeBrainCommandCenterPanel[] = [
  {
    id: "runtime-health",
    label: "Runtime Health",
    description: "Contract, readiness, required APIs, and safe next steps.",
  },
  {
    id: "system-status",
    label: "System Status",
    description: "Subsystem readiness, smoke coverage, safety posture, and cognition pipeline.",
  },
  {
    id: "memory",
    label: "Memory",
    description: "Read-only cognitive memory readiness and promoted signals.",
  },
  {
    id: "tasks",
    label: "Tasks",
    description: "Task and plan focus from the canonical graph.",
  },
  {
    id: "concepts",
    label: "Concepts",
    description: "Concept, decision, and synthesis surfaces.",
  },
  {
    id: "executions",
    label: "Executions",
    description: "Run and diff execution signals.",
  },
  {
    id: "architecture",
    label: "Architecture",
    description: "Subsystem and retrieval-oriented graph context.",
  },
  {
    id: "timeline",
    label: "Timeline",
    description: "Deterministic runtime timeline rows.",
  },
  {
    id: "replay",
    label: "Replay",
    description: "Read-only event replay, frames, lanes, and highlights.",
  },
  {
    id: "lineage",
    label: "Lineage",
    description: "Execution, memory, concept, failure, recovery, and agent lineage.",
  },
  {
    id: "risk",
    label: "Risk",
    description: "Schema, mutation, approval, and stale context risks.",
  },
  {
    id: "agents",
    label: "Agents",
    description: "Read-only agent lanes, gates, and approval boundaries.",
  },
  {
    id: "prediction",
    label: "Prediction",
    description: "Likely next files, risks, concepts, task focus, and architecture.",
  },
  {
    id: "semantic-heatmap",
    label: "Semantic Heatmap",
    description: "Read-only cognitive heatmap for memory, risk, concepts, files, agents, and prediction.",
  },
  {
    id: "knowledge-topology",
    label: "Knowledge Topology",
    description: "Deterministic read-only cluster topology with weighted relations and hotspots.",
  },
  {
    id: "recommendations",
    label: "Recommendations",
    description: "Deterministic read-only runtime recommendations and next safe action.",
  },
  {
    id: "insight-queue",
    label: "Insight Queue",
    description: "Autonomous read-only insight queue grouped by severity, kind, and status.",
  },
  {
    id: "focus-mode",
    label: "Focus Mode",
    description: "Read-only cognitive focus target, neighborhood, lenses, breadcrumbs, and inspector.",
  },
  {
    id: "drilldown",
    label: "Drilldown",
    description: "Read-only cognitive drilldown paths across memory, topology, lineage, health, agents, files, and risks.",
  },
  {
    id: "knowledge-clusters",
    label: "Knowledge Clusters",
    description: "Memory cluster summaries and high-confidence concepts.",
  },
  {
    id: "graph",
    label: "Graph",
    description: "Preserved neural graph and inspector workflow.",
  },
] as const;

export const BRAIN_COMMAND_CENTER_LEGACY_MODE_ALIASES = [
  {
    id: "risks",
    label: "Risks",
    canonicalId: "risk",
  },
  {
    id: "agent-activity",
    label: "Agent Activity",
    canonicalId: "agents",
  },
] as const;

const MODE_KEYBOARD_HINTS: Partial<Record<CodexForgeBrainCommandMode, string>> = {
  graph: "G G",
  "focus-mode": "G F",
  "runtime-health": "G H",
  "system-status": "G S",
  drilldown: "G D",
};

type BrainModeTabsProps = {
  activeMode: CodexForgeBrainCommandMode;
  onModeChange: (mode: CodexForgeBrainCommandMode) => void;
};

export function BrainModeTabs({ activeMode, onModeChange }: BrainModeTabsProps) {
  const activePanel = BRAIN_COMMAND_CENTER_MODES.find((mode) => mode.id === activeMode);

  return (
    <nav
      aria-label="Brain command center modes"
      data-codexforge-brain-mode-tabs
      style={tabsStyle}
    >
      <div style={tabsHeaderStyle}>
        <div>
          <div style={eyebrowStyle}>Mode navigation</div>
          <strong>{activePanel?.label ?? activeMode}</strong>
        </div>
        <span style={hintStyle}>Ctrl+K / Cmd+K for full command search</span>
      </div>

      <div role="tablist" aria-label="Brain modes" style={tabRailStyle}>
        {BRAIN_COMMAND_CENTER_MODES.map((mode) => {
          const active = mode.id === activeMode;
          const hint = MODE_KEYBOARD_HINTS[mode.id];

          return (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Switch Brain mode to ${mode.label}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onModeChange(mode.id)}
              title={mode.description}
              style={{
                ...tabStyle,
                borderColor: active
                  ? "rgba(125,211,252,0.62)"
                  : "rgba(255,255,255,0.10)",
                background: active
                  ? "linear-gradient(180deg, rgba(14,165,233,0.24), rgba(14,165,233,0.12))"
                  : "rgba(255,255,255,0.045)",
                color: active ? "#f0f9ff" : "rgba(226,232,240,0.78)",
              }}
              data-codexforge-brain-mode={mode.id}
              data-codexforge-brain-mode-active={active ? "true" : "false"}
              data-codexforge-brain-mode-tab
              data-codexforge-brain-mode-tab-active={active ? "true" : undefined}
            >
              <span>{mode.label}</span>
              {hint ? <kbd style={kbdStyle}>{hint}</kbd> : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const tabsStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.34)",
  minWidth: 0,
};

const tabsHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
  color: "rgba(226,232,240,0.86)",
  fontSize: 12,
};

const tabRailStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  overflowX: "auto",
  paddingBottom: 2,
};

const tabStyle: CSSProperties = {
  appearance: "none",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 8,
  padding: "8px 10px",
  minHeight: 40,
  whiteSpace: "nowrap",
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: 0,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  minWidth: 0,
};

const hintStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 8px",
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  color: "rgba(186,230,253,0.9)",
  fontSize: 10,
  fontWeight: 900,
};

const kbdStyle: CSSProperties = {
  borderRadius: 6,
  padding: "2px 5px",
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(2,6,23,0.54)",
  color: "rgba(224,242,254,0.92)",
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  fontSize: 10,
  fontWeight: 900,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
