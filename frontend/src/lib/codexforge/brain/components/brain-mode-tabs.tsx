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
    id: "risks",
    label: "Risks",
    description: "Schema, mutation, approval, and stale context risks.",
  },
  {
    id: "agent-activity",
    label: "Agent Activity",
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

type BrainModeTabsProps = {
  activeMode: CodexForgeBrainCommandMode;
  onModeChange: (mode: CodexForgeBrainCommandMode) => void;
};

export function BrainModeTabs({ activeMode, onModeChange }: BrainModeTabsProps) {
  return (
    <nav
      aria-label="Brain command center modes"
      data-codexforge-brain-mode-tabs
      style={tabsStyle}
    >
      {BRAIN_COMMAND_CENTER_MODES.map((mode) => {
        const active = mode.id === activeMode;

        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onModeChange(mode.id)}
            title={mode.description}
            style={{
              ...tabStyle,
              borderColor: active
                ? "rgba(125,211,252,0.56)"
                : "rgba(255,255,255,0.10)",
              background: active ? "rgba(14,165,233,0.20)" : "rgba(255,255,255,0.045)",
              color: active ? "#f0f9ff" : "rgba(226,232,240,0.78)",
            }}
            data-codexforge-brain-mode={mode.id}
            data-codexforge-brain-mode-active={active ? "true" : "false"}
          >
            {mode.label}
          </button>
        );
      })}
    </nav>
  );
}

const tabsStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  overflowX: "auto",
  paddingBottom: 3,
};

const tabStyle: CSSProperties = {
  appearance: "none",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 8,
  padding: "9px 11px",
  minHeight: 38,
  whiteSpace: "nowrap",
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: 0,
  cursor: "pointer",
};
