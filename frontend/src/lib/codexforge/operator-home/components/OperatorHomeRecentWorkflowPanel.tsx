"use client";

import type { CSSProperties } from "react";
import type {
  OperatorHomeNextActionPlan,
  OperatorHomeRouteRegistry,
  OperatorHomeSurface,
} from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";

type OperatorHomeRecentWorkflowPanelProps = {
  surface: OperatorHomeSurface;
  routes: OperatorHomeRouteRegistry;
  nextActionPlan: OperatorHomeNextActionPlan;
};

export function OperatorHomeRecentWorkflowPanel({
  surface,
  routes,
  nextActionPlan,
}: OperatorHomeRecentWorkflowPanelProps) {
  const rows = [
    `Route registry: ${routes.routes.length} existing launch routes.`,
    `Capability posture: ${surface.capabilities.length} command-deck capabilities.`,
    `Primary handoff: ${nextActionPlan.selected.title}.`,
    "Recent workflow stays read-only until an operator opens a review surface.",
  ];

  return (
    <section
      style={section}
      data-codexforge-operator-home-recent-workflow-panel="OperatorHomeRecentWorkflowPanel renders"
    >
      <span style={eyebrow}>Recent workflow</span>
      <h2 style={heading}>Current operating context</h2>
      <div style={rowsStyle}>
        {rows.map((row) => (
          <p key={buildOperatorHomeStableKey("workflow-row", row)} style={rowStyle}>
            {row}
          </p>
        ))}
      </div>
    </section>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const section: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.42)",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const eyebrow: CSSProperties = {
  color: "#5eead4",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  ...safeText,
};

const heading: CSSProperties = {
  fontSize: 20,
  margin: 0,
  ...safeText,
};

const rowsStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const rowStyle: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(2,6,23,0.36)",
  borderRadius: 8,
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  minWidth: 0,
  padding: 10,
  ...safeText,
};
