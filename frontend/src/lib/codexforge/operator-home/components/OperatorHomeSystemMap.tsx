"use client";

import type { CSSProperties } from "react";
import type { OperatorHomeLauncher } from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";

type OperatorHomeSystemMapProps = {
  launcher: OperatorHomeLauncher;
};

export function OperatorHomeSystemMap({ launcher }: OperatorHomeSystemMapProps) {
  return (
    <section
      style={section}
      data-codexforge-operator-home-system-map="OperatorHomeSystemMap renders"
    >
      <div style={header}>
        <span style={eyebrow}>System map</span>
        <h2 style={heading}>Operator flow</h2>
        <p style={copy}>
          Home routes cognition, engineering, stabilization, creative production, memory, and history through links
          only. The map is product navigation, not Brain graph mutation.
        </p>
      </div>

      <div style={mapGrid}>
        {launcher.groups.map((group) => (
          <div key={buildOperatorHomeStableKey("system-map-group", group.id)} style={node}>
            <strong style={nodeTitle}>{group.label}</strong>
            <span style={nodeDetail}>{group.cards.map((card) => card.label).join(" / ")}</span>
          </div>
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
  gap: 12,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

const header: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
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

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  ...safeText,
};

const mapGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  minWidth: 0,
};

const node: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.14)",
  background: "rgba(2,6,23,0.42)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minHeight: 92,
  minWidth: 0,
  padding: 12,
};

const nodeTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 13,
  ...safeText,
};

const nodeDetail: CSSProperties = {
  color: "#94a3b8",
  fontSize: 12,
  lineHeight: 1.45,
  ...safeText,
};
